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

interface NodeData {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  accent: string;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({
  accentColor = '#3f87f5',
  secondaryColor = '#cdb30c',
  emeraldColor = '#10b981',
  backgroundColor = '#14171f',
  gridSpacing = 80,
  speed = 1.0,
}) => {
  const frame = useCurrentFrame();
  const totalFrames = 300;
  // Normalized loop phase from 0 to 1
  const phase = (frame / totalFrames) * speed;
  const loopAngle = phase * Math.PI * 2;

  // Architectural system nodes positioned away from the central text zone
  const nodes: NodeData[] = useMemo(
    () => [
      { id: 'n1', label: 'EVENT_BUS_EDA', sub: 'AWS_SQS :: STEP_FN', x: 220, y: 220, accent: accentColor },
      { id: 'n2', label: 'UBL_21_ENGINE', sub: 'XMLDSIG :: SHA256', x: 200, y: 840, accent: emeraldColor },
      { id: 'n3', label: 'MCP_PROTOCOL', sub: 'AI_AGENT_GATEWAY', x: 380, y: 520, accent: secondaryColor },
      { id: 'n4', label: 'KARDEX_ACID', sub: 'VALUED_INVENTORY', x: 1700, y: 240, accent: secondaryColor },
      { id: 'n5', label: 'TRANSIT_GTCV', sub: 'POSTGRES_PARTITION', x: 1720, y: 860, accent: accentColor },
      { id: 'n6', label: 'SPATIAL_INDEX', sub: 'POSTGIS_GIST_P95', x: 1540, y: 540, accent: emeraldColor },
    ],
    [accentColor, secondaryColor, emeraldColor],
  );

  // Generate continuous sinusoidal wave ribbons
  const wavePoints = useMemo(() => {
    const width = 1920;
    const steps = 64;
    const dx = width / steps;

    // Wave A: Primary Classic Blue Flow
    const ptsA: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const x = i * dx;
      // Exact integer periodic harmonics for seamless 300-frame loop
      const y =
        660 +
        Math.sin(x * 0.0032 + loopAngle) * 38 +
        Math.sin(x * 0.0075 + loopAngle * 2) * 14;
      ptsA.push([x, y]);
    }

    // Wave B: Secondary Deep Architectural Flow
    const ptsB: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const x = i * dx;
      const y =
        420 +
        Math.cos(x * 0.0028 - loopAngle) * 32 +
        Math.sin(x * 0.0062 - loopAngle * 2) * 12;
      ptsB.push([x, y]);
    }

    // Wave C: Low Carrier Wave (Bottom anchor)
    const ptsC: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const x = i * dx;
      const y =
        940 +
        Math.sin(x * 0.0041 + loopAngle * 3) * 22 +
        Math.cos(x * 0.0019 + loopAngle) * 10;
      ptsC.push([x, y]);
    }

    const toSvgPath = (pts: [number, number][]) =>
      pts.reduce(
        (acc, [x, y], idx) => (idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`),
        '',
      );

    return {
      pathA: toSvgPath(ptsA),
      pathB: toSvgPath(ptsB),
      pathC: toSvgPath(ptsC),
    };
  }, [loopAngle]);

  // Packets animating along bus lines
  const packetPos1 = interpolate(frame % 150, [0, 150], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const packetPos2 = interpolate((frame + 75) % 150, [0, 150], [0, 1], {
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
        fontFamily: "'Victor Mono', monospace",
      }}
    >
      {/* LAYER 1: Deep Architectural Cartesian Lattice & Markers */}
      <svg
        width="1920"
        height="1080"
        style={{ position: 'absolute', inset: 0, opacity: 0.85 }}
      >
        <defs>
          <pattern
            id="arch-grid"
            width={gridSpacing}
            height={gridSpacing}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`}
              fill="none"
              stroke="#1f2636"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="1.5" fill="#334155" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#arch-grid)" />

        {/* Center stage exclusion boundary marks (subtle geometric crosshairs) */}
        <line x1="480" y1="120" x2="480" y2="960" stroke="#1e293b" strokeDasharray="4 8" strokeWidth="1" />
        <line x1="1440" y1="120" x2="1440" y2="960" stroke="#1e293b" strokeDasharray="4 8" strokeWidth="1" />
        <line x1="120" y1="540" x2="1800" y2="540" stroke="#1a2230" strokeDasharray="2 12" strokeWidth="1" />

        {/* Precision Coordinate Ticks */}
        <text x="500" y="140" fill="#475569" fontSize="11" letterSpacing="0.1em">
          SYS_STAGE :: 1920x1080 [SA-EAST-1]
        </text>
        <text x="1260" y="140" fill="#475569" fontSize="11" letterSpacing="0.1em">
          BUS_PROTOCOL :: REST / SOAP / MCP / EDA
        </text>
        <text x="500" y="940" fill="#475569" fontSize="11" letterSpacing="0.1em">
          LATENCY_P95 &lt; 40ms | 100% ACID
        </text>
        <text x="1260" y="940" fill="#475569" fontSize="11" letterSpacing="0.1em">
          ENCRYPTION :: X.509 SHA-256 XMLDSig
        </text>
      </svg>

      {/* LAYER 2: Mathematical Sinusoidal Harmonic Wave Ribbons */}
      <svg
        width="1920"
        height="1080"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {/* Wave B (Depth - Darker Blue) */}
        <path
          d={wavePoints.pathB}
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="1.5"
          strokeOpacity="0.45"
          strokeDasharray="6 4"
        />

        {/* Wave A (Primary Classic Blue Flow) */}
        <path
          d={wavePoints.pathA}
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeOpacity="0.75"
        />

        {/* Wave C (Lower Foundation Harmonic in Gold) */}
        <path
          d={wavePoints.pathC}
          fill="none"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeDasharray="12 6"
        />

        {/* Bus Trace Interconnections between System Nodes */}
        <path
          d="M 220 250 L 220 480 L 380 480 L 380 520"
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeOpacity="0.6"
        />
        <path
          d="M 380 560 L 380 720 L 200 720 L 200 840"
          fill="none"
          stroke="#0d9488"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeOpacity="0.6"
        />
        <path
          d="M 1700 270 L 1700 460 L 1540 460 L 1540 540"
          fill="none"
          stroke="#cdb30c"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeOpacity="0.6"
        />
        <path
          d="M 1540 580 L 1540 760 L 1720 760 L 1720 860"
          fill="none"
          stroke="#3f87f5"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeOpacity="0.6"
        />

        {/* Moving Packets traversing Left Bus Trace */}
        <circle
          cx={220 + (380 - 220) * packetPos1}
          cy={250 + (520 - 250) * packetPos1}
          r="4"
          fill={accentColor}
          style={{ filter: 'drop-shadow(0 0 4px #3f87f5)' }}
        />
        {/* Moving Packets traversing Right Bus Trace */}
        <circle
          cx={1700 + (1540 - 1700) * packetPos2}
          cy={270 + (540 - 270) * packetPos2}
          r="4"
          fill={secondaryColor}
          style={{ filter: 'drop-shadow(0 0 4px #cdb30c)' }}
        />
      </svg>

      {/* LAYER 3: Distributed System Nodes (Solid Architectural Badges) */}
      {nodes.map((node, i) => {
        // Subtle micro-breathing scale
        const nodePulse = 1 + Math.sin(loopAngle + i * 1.2) * 0.03;
        return (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: node.x,
              top: node.y,
              transform: `translate(-50%, -50%) scale(${nodePulse})`,
              backgroundColor: '#161a24',
              border: `1.5px solid ${node.accent}`,
              borderRadius: '8px',
              padding: '8px 14px',
              boxShadow: '0 4px 0 #0a0d14',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              minWidth: '150px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: node.accent,
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                }}
              >
                {node.label}
              </span>
            </div>
            <span
              style={{
                fontSize: '9.5px',
                color: '#94a3b8',
                letterSpacing: '0.05em',
                paddingLeft: '12px',
              }}
            >
              {node.sub}
            </span>
          </div>
        );
      })}

      {/* LAYER 4: Peripheral Edge Telemetry Cards */}
      <div
        style={{
          position: 'absolute',
          top: '36px',
          left: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 14px',
          borderRadius: '9999px',
          backgroundColor: '#161a24',
          border: '1px solid #2d3748',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: emeraldColor,
          }}
        />
        <span style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 600, letterSpacing: '0.08em' }}>
          ARCH_STATE :: 100% OPERATIONAL
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '36px',
          right: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 14px',
          borderRadius: '9999px',
          backgroundColor: '#161a24',
          border: '1px solid #2d3748',
        }}
      >
        <span style={{ fontSize: '11px', color: accentColor, fontWeight: 600, letterSpacing: '0.08em' }}>
          NODE.JS · JAVA 21 · SPRING BOOT · AWS
        </span>
      </div>

      {/* LAYER 5: Gentle Vignette Framing (Pure non-destructive edge falloff) */}
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
