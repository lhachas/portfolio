import React, { useMemo } from 'react';
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
  speed = 1.0,
}) => {
  const frame = useCurrentFrame();
  const totalFrames = 300; // 10s loop at 30 fps
  const phase = (frame / totalFrames) * speed;
  const loopAngle = phase * Math.PI * 2;

  // Generate continuous sinusoidal wave ribbons with strict integer periodic harmonics
  const wavePoints = useMemo(() => {
    const width = 1920;
    const steps = 96;
    const dx = width / steps;

    // Wave 1: Primary Harmonic Stream (Center-lower field)
    const pts1: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const x = i * dx;
      const y =
        620 +
        Math.sin(x * 0.0033 + loopAngle) * 44 +
        Math.sin(x * 0.0066 + loopAngle * 2) * 18;
      pts1.push([x, y]);
    }

    // Wave 2: Counter-Harmonic Depth Carrier (Upper-mid field)
    const pts2: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const x = i * dx;
      const y =
        410 +
        Math.cos(x * 0.0028 - loopAngle) * 36 +
        Math.sin(x * 0.0056 - loopAngle * 2) * 14;
      pts2.push([x, y]);
    }

    // Wave 3: Sub-Bass Architectural Foundation Wave in Brand Gold (Lower field)
    const pts3: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const x = i * dx;
      const y =
        860 +
        Math.sin(x * 0.0038 + loopAngle * 3) * 26 +
        Math.cos(x * 0.0019 + loopAngle) * 14;
      pts3.push([x, y]);
    }

    // Wave 4: Upper Resonant Micro-Stream
    const pts4: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const x = i * dx;
      const y =
        200 +
        Math.sin(x * 0.0042 + loopAngle * 2) * 20 +
        Math.cos(x * 0.0021 - loopAngle) * 12;
      pts4.push([x, y]);
    }

    const toSvgPath = (pts: [number, number][]) =>
      pts.reduce(
        (acc, [x, y], idx) =>
          idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`,
        '',
      );

    const toClosedArea = (pts: [number, number][], baseY: number) => {
      const line = toSvgPath(pts);
      return `${line} L 1920 ${baseY} L 0 ${baseY} Z`;
    };

    return {
      path1: toSvgPath(pts1),
      area1: toClosedArea(pts1, 1080),
      path2: toSvgPath(pts2),
      area2: toClosedArea(pts2, 1080),
      path3: toSvgPath(pts3),
      path4: toSvgPath(pts4),
    };
  }, [loopAngle]);

  // Packets animating along bus rails with physical easing curves
  const packetPos1 = interpolate(frame % 150, [0, 150], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const packetPos2 = interpolate((frame + 75) % 150, [0, 150], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const packetPos3 = interpolate((frame + 35) % 150, [0, 150], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const packetPos4 = interpolate((frame + 110) % 150, [0, 150], [0, 1], {
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
      {/* SVG DEFINITIONS & GRADIENTS */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="waveAreaGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.10" />
            <stop offset="50%" stopColor="#1e3a8a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#14171f" stopOpacity="0.00" />
          </linearGradient>

          <linearGradient id="waveAreaGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.06" />
            <stop offset="100%" stopColor="#14171f" stopOpacity="0.00" />
          </linearGradient>

          <linearGradient id="waveStrokeGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="45%" stopColor={accentColor} />
            <stop offset="75%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Architectural Coordinate Matrix Pattern */}
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
        style={{ position: 'absolute', inset: 0, opacity: 0.9 }}
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
      </svg>

      {/* LAYER 2: Luminous Harmonic Wave Ribbons & Flow Fields */}
      <svg
        width="1920"
        height="1080"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {/* Closed Area Gradient Under Wave 1 */}
        <path d={wavePoints.area1} fill="url(#waveAreaGrad1)" />

        {/* Closed Area Gradient Under Wave 2 */}
        <path d={wavePoints.area2} fill="url(#waveAreaGrad2)" />

        {/* Wave 4: Upper Resonant Micro-Stream */}
        <path
          d={wavePoints.path4}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeDasharray="4 6"
        />

        {/* Wave 2: Counter-Harmonic Depth Carrier */}
        <path
          d={wavePoints.path2}
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="1.6"
          strokeOpacity="0.55"
          strokeDasharray="6 4"
        />

        {/* Wave 1: Primary Luminous Harmonic Wave */}
        <path
          d={wavePoints.path1}
          fill="none"
          stroke="url(#waveStrokeGrad1)"
          strokeWidth="2.8"
          strokeOpacity="0.9"
          style={{ filter: 'drop-shadow(0 0 10px rgba(63, 135, 245, 0.4))' }}
        />

        {/* Wave 3: Sub-Bass Architectural Wave in Gold */}
        <path
          d={wavePoints.path3}
          fill="none"
          stroke={secondaryColor}
          strokeWidth="1.6"
          strokeOpacity="0.6"
          strokeDasharray="10 5"
        />

        {/* Orthogonal Technical Bus Rails (Clean Architectural Data Flow) */}
        <path
          d="M 160 320 L 480 320 L 480 640 L 720 640"
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={-frame * 1.2}
          strokeOpacity="0.65"
        />
        <path
          d="M 1760 320 L 1440 320 L 1440 640 L 1200 640"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={frame * 1.2}
          strokeOpacity="0.65"
        />
        <path
          d="M 280 820 L 560 820 L 560 920 L 960 920"
          fill="none"
          stroke={emeraldColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={-frame * 1.2}
          strokeOpacity="0.55"
        />
        <path
          d="M 1640 820 L 1360 820 L 1360 920 L 960 920"
          fill="none"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeDashoffset={frame * 1.2}
          strokeOpacity="0.55"
        />

        {/* Micro Signal Pulses Traversing Bus Rails */}
        <circle
          cx={160 + (480 - 160) * packetPos1}
          cy={320}
          r="4.5"
          fill="#60a5fa"
          style={{ filter: 'drop-shadow(0 0 6px #3f87f5)' }}
        />
        <circle
          cx={1760 - (1760 - 1440) * packetPos2}
          cy={320}
          r="4.5"
          fill="#93c5fd"
          style={{ filter: 'drop-shadow(0 0 6px #60a5fa)' }}
        />
        <circle
          cx={280 + (560 - 280) * packetPos3}
          cy={820}
          r="4.5"
          fill="#34d399"
          style={{ filter: 'drop-shadow(0 0 6px #10b981)' }}
        />
        <circle
          cx={1640 - (1640 - 1360) * packetPos4}
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
            'radial-gradient(ellipse at center, transparent 45%, rgba(20, 23, 31, 0.75) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
