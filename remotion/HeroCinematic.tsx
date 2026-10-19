import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export interface HeroCinematicProps extends Record<string, unknown> {
  accentColor: string;
  secondaryColor: string;
  emeraldColor: string;
  backgroundColor: string;
  gridSpacing: number;
  speed: number;
}

interface Point2D {
  x: number;
  y: number;
}

/**
 * Computes exact 2D coordinates along a multi-segment orthogonal polyline
 * parameterized by normalized progress t in [0, 1].
 */
function interpolatePolyline(points: Point2D[], t: number): Point2D {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1 || t <= 0) return points[0];
  if (t >= 1) return points[points.length - 1];

  const lengths: number[] = [];
  let totalLength = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    const segLen = Math.hypot(dx, dy);
    lengths.push(segLen);
    totalLength += segLen;
  }

  let targetDist = t * totalLength;
  for (let i = 0; i < lengths.length; i++) {
    const segLen = lengths[i];
    if (targetDist <= segLen || i === lengths.length - 1) {
      const localT = segLen > 0 ? targetDist / segLen : 0;
      return {
        x: points[i].x + (points[i + 1].x - points[i].x) * localT,
        y: points[i].y + (points[i + 1].y - points[i].y) * localT,
      };
    }
    targetDist -= segLen;
  }

  return points[points.length - 1];
}

const BUS_PATH_1: Point2D[] = [
  { x: 160, y: 300 },
  { x: 520, y: 300 },
  { x: 520, y: 540 },
  { x: 720, y: 540 },
];

const BUS_PATH_2: Point2D[] = [
  { x: 1760, y: 300 },
  { x: 1400, y: 300 },
  { x: 1400, y: 540 },
  { x: 1200, y: 540 },
];

const BUS_PATH_3: Point2D[] = [
  { x: 240, y: 820 },
  { x: 560, y: 820 },
  { x: 560, y: 900 },
  { x: 960, y: 900 },
];

const BUS_PATH_4: Point2D[] = [
  { x: 1680, y: 820 },
  { x: 1360, y: 820 },
  { x: 1360, y: 900 },
  { x: 960, y: 900 },
];

export const HeroCinematic: React.FC<HeroCinematicProps> = ({
  accentColor = '#3f87f5', // Azul Clásico oficial por defecto
  secondaryColor = '#cdb30c', // Oro Leonel Hacha Salazar
  emeraldColor = '#10b981', // Status operacional
  backgroundColor = '#14171f', // Dark canvas 100% sólido
  gridSpacing = 64,
}) => {
  const frame = useCurrentFrame();

  // Exact divisors of 300 frames (150 and 100) guarantee a mathematically seamless loop at frame 300 -> 0
  const packetPos1 = interpolate(frame % 150, [0, 149], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const packetPos2 = interpolate((frame + 75) % 150, [0, 149], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const packetPos3 = interpolate((frame + 25) % 100, [0, 99], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const packetPos4 = interpolate((frame + 75) % 100, [0, 99], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pos1 = interpolatePolyline(BUS_PATH_1, packetPos1);
  const pos2 = interpolatePolyline(BUS_PATH_2, packetPos2);
  const pos3 = interpolatePolyline(BUS_PATH_3, packetPos3);
  const pos4 = interpolatePolyline(BUS_PATH_4, packetPos4);

  // Dash offset of 1.0px/frame over 300 frames = 300px, exact multiple of dasharray (4+6=10)
  const dashOffsetForward = -frame;
  const dashOffsetReverse = frame;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* SVG DEFINITIONS & ARCHITECTURAL GRID */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <pattern
            id="arch-matrix-grid"
            width={gridSpacing}
            height={gridSpacing}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`}
              fill="none"
              stroke="#1b2230"
              strokeWidth="0.8"
            />
            {/* Precision crosshairs at lattice intersections */}
            <path
              d="M -3 0 L 3 0 M 0 -3 L 0 3"
              stroke="#2e384d"
              strokeWidth="1"
            />
          </pattern>
        </defs>
      </svg>

      {/* LAYER 1: Deep Architectural Cartesian Lattice & Datum Guides */}
      <svg
        width="1920"
        height="1080"
        style={{ position: 'absolute', inset: 0, opacity: 0.95 }}
      >
        <rect width="100%" height="100%" fill="url(#arch-matrix-grid)" />

        {/* Structural Stage Boundary Lines */}
        <line x1="320" y1="0" x2="320" y2="1080" stroke="#1c2536" strokeDasharray="4 8" strokeWidth="1" />
        <line x1="1600" y1="0" x2="1600" y2="1080" stroke="#1c2536" strokeDasharray="4 8" strokeWidth="1" />
        <line x1="0" y1="540" x2="1920" y2="540" stroke="#172030" strokeDasharray="2 12" strokeWidth="1" />

        {/* Subtle Architectural Margin Ticks */}
        {Array.from({ length: 15 }, (_, i) => (
          <g key={i}>
            <line x1={i * 128 + 64} y1="0" x2={i * 128 + 64} y2="8" stroke="#334155" strokeWidth="1.2" />
            <line x1={i * 128 + 64} y1="1072" x2={i * 128 + 64} y2="1080" stroke="#334155" strokeWidth="1.2" />
          </g>
        ))}

        {/* Architectural Engineering Datum Coordinates */}
        <text
          x="160"
          y="280"
          fill="#475569"
          fontSize="12"
          fontFamily="'Victor Mono', monospace"
          letterSpacing="0.1em"
        >
          SYS.ARCH // NODE_01 [AWS.US-EAST-1 · SA-EAST-1]
        </text>
        <text
          x="1360"
          y="280"
          fill="#475569"
          fontSize="12"
          fontFamily="'Victor Mono', monospace"
          letterSpacing="0.1em"
        >
          PROTO // REST · GRAPHQL · SOAP · EDA
        </text>
        <text
          x="240"
          y="930"
          fill="#475569"
          fontSize="12"
          fontFamily="'Victor Mono', monospace"
          letterSpacing="0.1em"
        >
          LATENCY // &lt;35ms [ACID &amp; IDEMPOTENT]
        </text>
        <text
          x="1380"
          y="930"
          fill="#475569"
          fontSize="12"
          fontFamily="'Victor Mono', monospace"
          letterSpacing="0.1em"
        >
          SECURITY // TLS 1.3 · X.509 SHA-256
        </text>
      </svg>

      {/* LAYER 2: Orthogonal Technical Bus Rails & 2D Multi-Segment Signal Pulses (Zero Blur) */}
      <svg
        width="1920"
        height="1080"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {/* Orthogonal Technical Bus Rails */}
        <path
          d="M 160 300 L 520 300 L 520 540 L 720 540"
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={dashOffsetForward}
          strokeOpacity="0.7"
        />
        <path
          d="M 1760 300 L 1400 300 L 1400 540 L 1200 540"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={dashOffsetReverse}
          strokeOpacity="0.7"
        />
        <path
          d="M 240 820 L 560 820 L 560 900 L 960 900"
          fill="none"
          stroke={emeraldColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={dashOffsetForward}
          strokeOpacity="0.6"
        />
        <path
          d="M 1680 820 L 1360 820 L 1360 900 L 960 900"
          fill="none"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={dashOffsetReverse}
          strokeOpacity="0.6"
        />

        {/* Static Architectural Terminal Nodes at Bus Endpoints */}
        <circle cx={160} cy={300} r="3.5" fill="#14171f" stroke="#3f87f5" strokeWidth="1.5" />
        <circle cx={720} cy={540} r="3.5" fill="#14171f" stroke="#3f87f5" strokeWidth="1.5" />
        <circle cx={1760} cy={300} r="3.5" fill="#14171f" stroke={accentColor} strokeWidth="1.5" />
        <circle cx={1200} cy={540} r="3.5" fill="#14171f" stroke={accentColor} strokeWidth="1.5" />
        <circle cx={240} cy={820} r="3.5" fill="#14171f" stroke={emeraldColor} strokeWidth="1.5" />
        <circle cx={1680} cy={820} r="3.5" fill="#14171f" stroke={secondaryColor} strokeWidth="1.5" />
        <circle cx={960} cy={900} r="4.5" fill="#14171f" stroke="#f8fafc" strokeWidth="1.5" />

        {/* Crisp 100% Solid Concentric Signal Nodes Traversing Full 2D Bus Paths */}
        <g transform={`translate(${pos1.x}, ${pos1.y})`}>
          <circle r="7" fill="#14171f" stroke="#3f87f5" strokeWidth="1.5" />
          <circle r="3.5" fill="#60a5fa" />
        </g>
        <g transform={`translate(${pos2.x}, ${pos2.y})`}>
          <circle r="7" fill="#14171f" stroke="#60a5fa" strokeWidth="1.5" />
          <circle r="3.5" fill="#93c5fd" />
        </g>
        <g transform={`translate(${pos3.x}, ${pos3.y})`}>
          <circle r="7" fill="#14171f" stroke="#10b981" strokeWidth="1.5" />
          <circle r="3.5" fill="#34d399" />
        </g>
        <g transform={`translate(${pos4.x}, ${pos4.y})`}>
          <circle r="7" fill="#14171f" stroke="#cdb30c" strokeWidth="1.5" />
          <circle r="3.5" fill="#facc15" />
        </g>
      </svg>

      {/* LAYER 3: Non-Destructive Deep Vignette & Contrast Control */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(20, 23, 31, 0.75) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
