import React, { useMemo, useState } from 'react';
import './MiniMapGTA.css';

const MAP_W = 1000;
const MAP_H = 500;

const POIS = {
  festival: {
    id: 'festival',
    name: 'marsAI Festival',
    description: 'Point central du festival IA – projections et rencontres.',
    x: 500,
    y: 270,
    type: 'festival',
  },
  mairie: {
    id: 'mairie',
    name: 'Mairie de Marseille',
    description: 'Hôtel de Ville – repère historique et administratif.',
    x: 420,
    y: 210,
    type: 'mairie',
  },
  vieuxPort: {
    id: 'vieuxPort',
    name: 'Vieux-Port',
    description: 'Cœur maritime de Marseille – cafés et quais animés.',
    x: 320,
    y: 150,
    type: 'port',
  },
  notreDame: {
    id: 'notreDame',
    name: 'Notre-Dame de la Garde',
    description: 'La Bonne Mère – point de vue emblématique.',
    x: 640,
    y: 105,
    type: 'nd',
  },
  gare: {
    id: 'gare',
    name: 'Gare Saint-Charles',
    description: 'Arrivées & départs – hub principal.',
    x: 280,
    y: 275,
    type: 'gare',
  },
  hopital: {
    id: 'hopital',
    name: 'Hôpital',
    description: 'Services médicaux et urgences.',
    x: 705,
    y: 305,
    type: 'hopital',
  },
  musee: {
    id: 'musee',
    name: 'Musée',
    description: 'Culture & expositions temporaires.',
    x: 610,
    y: 360,
    type: 'musee',
  },
};

const MAIN_ROADS = [
  [80, 130, 940, 130, 8],
  [100, 260, 950, 260, 7],
  [130, 360, 900, 360, 6],
  [250, 70, 250, 430, 7],
  [500, 60, 500, 450, 6],
  [740, 80, 740, 430, 5],
  [120, 180, 420, 90, 5],
  [420, 90, 700, 140, 5],
];

const SECONDARY_ROADS = [
  [170, 90, 170, 430],
  [330, 90, 330, 430],
  [420, 110, 420, 430],
  [580, 90, 580, 450],
  [660, 100, 660, 430],
  [820, 120, 820, 430],
  [90, 200, 900, 200],
  [90, 230, 920, 230],
  [90, 300, 930, 300],
  [110, 330, 920, 330],
  [150, 390, 910, 390],
];

const ALLEYS = [
  [205, 145, 205, 255],
  [365, 180, 365, 305],
  [540, 170, 540, 335],
  [690, 175, 690, 330],
  [790, 155, 790, 270],
  [205, 175, 365, 175],
  [365, 285, 540, 285],
  [540, 315, 690, 315],
];

const PARKS = [
  { x: 110, y: 100, w: 130, h: 95 },
  { x: 790, y: 95, w: 120, h: 110 },
  { x: 90, y: 375, w: 150, h: 85 },
  { x: 640, y: 390, w: 185, h: 70 },
];

function Marker({ poi, active, isMissionTarget, onClick, onKeyDown }) {
  return (
    <g
      role="button"
      tabIndex="0"
      onClick={() => onClick(poi.id)}
      onKeyDown={onKeyDown(poi.id)}
      className={`mini-marker ${active ? 'is-active' : ''} ${isMissionTarget ? 'is-mission-target' : ''}`}
      aria-label={poi.name}
      transform={`translate(${poi.x}, ${poi.y})`}
    >
      <circle r="14" fill="transparent" />

      {poi.type === 'festival' && (
        <>
          <circle r="16" className="marker-festival-ring" />
          <polygon
            points="0,-11 3.2,-3.2 11,0 3.2,3.2 0,11 -3.2,3.2 -11,0 -3.2,-3.2"
            className="marker-festival-core"
          />
          <circle r="2.3" fill="#ffe9a8" />
        </>
      )}

      {poi.type === 'mairie' && (
        <>
          <rect
            x="-8"
            y="-6"
            width="16"
            height="12"
            rx="1.5"
            className="marker-mairie"
          />
          <polygon points="-9,-6 0,-12 9,-6" className="marker-mairie-roof" />
        </>
      )}

      {poi.type === 'port' && (
        <rect
          x="-9"
          y="-5"
          width="18"
          height="10"
          rx="2"
          className="marker-port"
        />
      )}

      {poi.type === 'nd' && (
        <>
          <polygon points="0,-10 -6,7 6,7" className="marker-nd" />
          <circle cy="-2" r="1.6" fill="#fff1bb" />
        </>
      )}

      {poi.type === 'gare' && (
        <>
          <rect
            x="-8"
            y="-8"
            width="16"
            height="16"
            rx="2"
            className="marker-gare"
          />
          <line x1="-6" y1="0" x2="6" y2="0" className="marker-gare-line" />
        </>
      )}

      {poi.type === 'hopital' && (
        <>
          <circle r="8" className="marker-hopital" />
          <line x1="0" y1="-4" x2="0" y2="4" className="marker-hopital-cross" />
          <line x1="-4" y1="0" x2="4" y2="0" className="marker-hopital-cross" />
        </>
      )}

      {poi.type === 'musee' && (
        <polygon points="0,-8 -7,7 7,7" className="marker-musee" />
      )}
    </g>
  );
}

function SVGDefs() {
  return (
    <defs>
      <linearGradient id="mini-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0d111b" />
        <stop offset="100%" stopColor="#121a2a" />
      </linearGradient>

      <linearGradient id="mini-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2d7dcc" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#145099" stopOpacity="0.5" />
      </linearGradient>

      <radialGradient id="mini-park" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#48b56d" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#256f42" stopOpacity="0.25" />
      </radialGradient>

      <pattern
        id="mini-grid"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M20 0 L0 0 0 20"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.8"
        />
      </pattern>

      <linearGradient id="radar-sweep" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(100,255,100,0)" />
        <stop offset="50%" stopColor="rgba(100,255,100,0.35)" />
        <stop offset="100%" stopColor="rgba(100,255,100,0.8)" />
      </linearGradient>

      <filter id="mini-glow">
        <feGaussianBlur stdDeviation="2" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

export default function MiniMapMarseille() {
  const [activePoi, setActivePoi] = useState(null);
  const [missionState, setMissionState] = useState('idle'); // idle, active, reached
  const [missionTarget, setMissionTarget] = useState(null);

  const PLAYER_X = 380;
  const PLAYER_Y = 255;

  const poiList = useMemo(() => Object.values(POIS), []);
  const activeData = activePoi ? POIS[activePoi] : null;

  // Mission distance calculation
  const missionDistance = useMemo(() => {
    if (!missionTarget) return null;
    const targetPoi = POIS[missionTarget];
    if (!targetPoi) return null;
    const dx = targetPoi.x - PLAYER_X;
    const dy = targetPoi.y - PLAYER_Y;
    return Math.hypot(dx, dy);
  }, [missionTarget]);

  // Mission completion check
  const isReached = useMemo(() => {
    return missionDistance !== null && missionDistance < 45;
  }, [missionDistance]);

  const tooltipPosition = useMemo(() => {
    if (!activeData) return null;

    const xPercent = (activeData.x / MAP_W) * 100;
    const yPercent = (activeData.y / MAP_H) * 100;
    const showBelow = activeData.y < 125;

    return {
      left: `clamp(100px, ${xPercent}%, calc(100% - 100px))`,
      top: `${yPercent}%`,
      transform: showBelow ? 'translate(-50%, 14%)' : 'translate(-50%, -120%)',
    };
  }, [activeData]);

  const togglePoi = (id) => {
    if (missionState === 'reached') {
      setMissionState('idle');
      setMissionTarget(null);
    } else {
      setMissionTarget(id);
      setMissionState('active');
      setActivePoi(null);
    }
  };

  // Auto-complete mission when reached
  React.useEffect(() => {
    if (isReached && missionState === 'active') {
      setMissionState('reached');
    }
  }, [isReached, missionState]);

  const wantedLevel = useMemo(() => {
    if (!missionTarget || missionState === 'idle') return 1;
    const riskByType = {
      festival: 4,
      hopital: 3,
      gare: 2,
      mairie: 2,
      port: 3,
      musee: 2,
      nd: 1,
    };
    const target = POIS[missionTarget];
    return riskByType[target?.type] || 1;
  }, [missionTarget, missionState]);

  // Dynamic objective text based on mission state
  const objectiveText = useMemo(() => {
    if (missionState === 'idle') return 'mars.ai';
    if (missionState === 'reached' && missionTarget) {
      return `${POIS[missionTarget].name} ✓`;
    }
    if (missionState === 'active' && missionTarget) {
      const target = POIS[missionTarget];
      return `${target.name} (${Math.round(missionDistance)}m)`;
    }
    return 'mars.ai';
  }, [missionState, missionTarget, missionDistance]);

  const onPoiKeyDown = (id) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      togglePoi(id);
    }
  };

  return (
    <div className="mini-map-shell relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950/70">
      <svg
        className="mini-map-svg h-full w-full"
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <SVGDefs />

        <rect width={MAP_W} height={MAP_H} fill="url(#mini-bg)" />
        <rect
          width={MAP_W}
          height={MAP_H}
          fill="url(#mini-grid)"
          opacity="0.23"
        />

        <path
          d="M0,70 C130,25 260,55 380,48 C540,39 660,62 820,55 C900,52 950,60 1000,50 L1000,0 L0,0 Z"
          fill="url(#mini-water)"
        />
        <path
          d="M760,80 C900,115 960,210 1000,255 L1000,500 L760,500 Z"
          fill="url(#mini-water)"
          opacity="0.8"
        />

        {PARKS.map((park) => (
          <rect
            key={`${park.x}-${park.y}`}
            x={park.x}
            y={park.y}
            width={park.w}
            height={park.h}
            fill="url(#mini-park)"
            rx="8"
          />
        ))}

        {MAIN_ROADS.map(([x1, y1, x2, y2, width], idx) => (
          <g key={`main-road-${idx}`}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="mini-road-main"
              strokeWidth={width}
            />
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="mini-road-main-glow"
              strokeWidth={Math.max(width / 3, 2)}
            />
          </g>
        ))}

        {SECONDARY_ROADS.map(([x1, y1, x2, y2], idx) => (
          <line
            key={`sec-road-${idx}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className="mini-road-secondary"
          />
        ))}

        {ALLEYS.map(([x1, y1, x2, y2], idx) => (
          <line
            key={`alley-${idx}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className="mini-road-alley"
          />
        ))}

        <g transform="translate(640,105)">
          <polygon points="0,-12 -7,8 7,8" className="landmark-nd" />
        </g>

        <rect
          x="286"
          y="132"
          width="68"
          height="32"
          rx="4"
          className="landmark-port"
        />
        <text
          x="320"
          y="152"
          textAnchor="middle"
          className="landmark-port-label"
        >
          PORT
        </text>

        {poiList.map((poi) => (
          <Marker
            key={poi.id}
            poi={poi}
            active={activePoi === poi.id}
            isMissionTarget={missionTarget === poi.id}
            onClick={togglePoi}
            onKeyDown={onPoiKeyDown}
          />
        ))}

        <g transform="translate(380,255)">
          <circle r="11" className="mini-player-ring" />
          <rect
            x="-5"
            y="-5"
            width="10"
            height="10"
            className="mini-player-core"
          />
          <polygon points="0,-13 -3,-7 3,-7" fill="#fff" />
        </g>

        <g className="mini-radar-wrap" transform="translate(900,90)">
          <circle r="44" className="mini-radar-bg" />
          <circle r="34" className="mini-radar-grid" />
          <circle r="24" className="mini-radar-grid" />
          <line x1="-36" y1="0" x2="36" y2="0" className="mini-radar-grid" />
          <line x1="0" y1="-36" x2="0" y2="36" className="mini-radar-grid" />

          <g className="mini-radar-sweep">
            <path
              d="M0,0 L0,-36 A36,36 0 0 1 25.4,-25.4 Z"
              fill="url(#radar-sweep)"
            />
          </g>

          <circle cx="12" cy="-8" r="1.8" className="mini-radar-blip" />
          <circle cx="-14" cy="11" r="1.8" className="mini-radar-blip" />
          <circle cx="8" cy="16" r="1.8" className="mini-radar-blip warm" />
          <rect
            x="-3"
            y="-3"
            width="6"
            height="6"
            className="mini-radar-center"
          />
        </g>
      </svg>

      {activeData && (
        <div
          className="mini-poi-tooltip pointer-events-auto absolute z-20 w-[min(82vw,14rem)] rounded-md border border-white/10 bg-black/80 px-3 py-2 text-[11px] text-white/90 shadow-lg backdrop-blur"
          style={tooltipPosition || undefined}
        >
          <div className="text-[12px] font-semibold text-white">
            {activeData.name}
          </div>
          <div className="mt-0.5 leading-snug text-white/70">
            {activeData.description}
          </div>
        </div>
      )}

      <div className="mini-overlay-scanlines pointer-events-none absolute inset-0 z-[11]" />
      <div className="mini-overlay-vignette pointer-events-none absolute inset-0 z-[11]" />

      <div
        className={`mini-mission-card pointer-events-auto absolute left-3 top-10 z-20 rounded-md border px-2.5 py-2 text-[10px] backdrop-blur-sm cursor-pointer transition-all ${
          missionState === 'idle'
            ? 'border-cyan-300/25 bg-black/55 text-cyan-100'
            : missionState === 'active'
              ? 'border-yellow-400/50 bg-yellow-900/30 text-yellow-100'
              : 'border-green-400/50 bg-green-900/40 text-green-100'
        }`}
        onClick={() => {
          if (missionState === 'reached' || missionState === 'active') {
            setMissionState('idle');
            setMissionTarget(null);
          }
        }}
      >
        <div className="mini-mission-title">OBJECTIF ACTUEL</div>
        <div className="mini-mission-value">{objectiveText}</div>
        {missionState === 'active' && missionDistance !== null && (
          <div className="mt-1.5 space-y-1">
            <div className="text-[9px] text-white/60">
              Distance: {Math.round(missionDistance)}m
            </div>
            <div className="h-1.5 w-32 rounded-full bg-black/50 border border-white/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-200"
                style={{
                  width: `${Math.max(0, Math.min(100, (1 - missionDistance / 550) * 100))}%`,
                }}
              />
            </div>
          </div>
        )}
        {missionState === 'reached' && (
          <div className="mt-1 text-[9px] font-semibold text-green-300">
            Mission accomplie!
          </div>
        )}
      </div>

      <div className="mini-wanted pointer-events-none absolute right-3 top-10 z-20 flex items-center gap-1 rounded-md border border-amber-300/20 bg-black/50 px-2 py-1.5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <span
            key={`wanted-${idx}`}
            className={`mini-star ${idx < wantedLevel ? 'is-on' : ''}`}
          >
            ★
          </span>
        ))}
      </div>

      <div className="mini-hud pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3">
        <div className="mini-hud-top flex items-start justify-between">
          <span className="text-[10px] font-bold tracking-wider text-white/70">
            MARS.AI // MAP
          </span>
          <span className="text-sm font-black text-white/85">N</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="mini-hud-legend space-y-1 text-[9px] text-white/55">
            <div>■ Gare</div>
            <div>✚ Hôpital</div>
            <div>△ Musée</div>
            <div>⌂ Mairie</div>
            <div>★ Festival</div>
          </div>
          <div className="mini-hud-brand text-right">
            <div className="mini-hud-brand-title text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
              marsAI
            </div>
            <div className="mini-hud-brand-sub text-[10px] font-bold tracking-wider text-white/80">
              MARSEILLE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
