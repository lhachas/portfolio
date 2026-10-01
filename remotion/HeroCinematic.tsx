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

export const HeroCinematic: React.FC<HeroCinematicProps> = ({
  accentColor = '#3f87f5', // Azul Clásico oficial por defecto
  secondaryColor = '#cdb30c', // Oro Leonel Hacha Salazar
  emeraldColor = '#10b981', // Status operacional
  backgroundColor = '#14171f', // Dark canvas 100% sólido
  gridSpacing = 64,
}) => {
  const frame = useCurrentFrame();

  // Packet positions traversing orthogonal architectural bus rails
  const packetPos1 = interpolate(frame % 120, [0, 120], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const packetPos2 = interpolate((frame + 60) % 120, [0, 120], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const packetPos3 = interpolate((frame + 30) % 150, [0, 150], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const packetPos4 = interpolate((frame + 90) % 150, [0, 150], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

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
          SYS.ARCH // NODE_01 [AWS.SA-EAST-1]
        </text>
        <text
          x="1360"
          y="280"
          fill="#475569"
          fontSize="12"
          fontFamily="'Victor Mono', monospace"
          letterSpacing="0.1em"
        >
          PROTO // REST·SOAP·EDA·DDoSExt
        </text>
        <text
          x="240"
          y="930"
          fill="#475569"
          fontSize="12"
          fontFamily="'Victor Mono', monospace"
          letterSpacing="0.1em"
        >
          LATENCY // &lt;35ms [ACID GUARANTEED]
        </text>
        <text
          x="1380"
          y="930"
          fill="#475569"
          fontSize="12"
          fontFamily="'Victor Mono', monospace"
          letterSpacing="0.1em"
        >
          SECURITY // TLS 1.3 / X.509 SHA-256
        </text>
      </svg>

      {/* LAYER 2: Orthogonal Technical Bus Rails & Micro Signal Pulses (Zero Chaotic Waves) */}
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
          strokeDashoffset={-frame * 1.2}
          strokeOpacity="0.65"
        />
        <path
          d="M 1760 300 L 1400 300 L 1400 540 L 1200 540"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={frame * 1.2}
          strokeOpacity="0.65"
        />
        <path
          d="M 240 820 L 560 820 L 560 900 L 960 900"
          fill="none"
          stroke={emeraldColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={-frame * 1.2}
          strokeOpacity="0.55"
        />
        <path
          d="M 1680 820 L 1360 820 L 1360 900 L 960 900"
          fill="none"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={frame * 1.2}
          strokeOpacity="0.55"
        />

        {/* Micro Signal Pulses Traversing Bus Rails */}
        <circle
          cx={160 + (520 - 160) * packetPos1}
          cy={300}
          r="4.5"
          fill="#60a5fa"
          style={{ filter: 'drop-shadow(0 0 6px #3f87f5)' }}
        />
        <circle
          cx={1760 - (1760 - 1400) * packetPos2}
          cy={300}
          r="4.5"
          fill="#93c5fd"
          style={{ filter: 'drop-shadow(0 0 6px #60a5fa)' }}
        />
        <circle
          cx={240 + (560 - 240) * packetPos3}
          cy={820}
          r="4.5"
          fill="#34d399"
          style={{ filter: 'drop-shadow(0 0 6px #10b981)' }}
        />
        <circle
          cx={1680 - (1680 - 1360) * packetPos4}
          cy={820}
          r="4.5"
          fill="#facc15"
          style={{ filter: 'drop-shadow(0 0 6px #cdb30c)' }}
        />
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
