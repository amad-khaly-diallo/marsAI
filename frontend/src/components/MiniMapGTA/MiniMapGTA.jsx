import React, { useState } from "react";

export default function MiniMapMarseille() {
  const [activePoi, setActivePoi] = useState(null);
  const poiMap = {
    festival: {
      name: "marsAI Festival",
      description: "Point central du festival IA – projections et rencontres.",
      x: 200,
      y: 150,
    },
    mairie: {
      name: "Mairie de Marseille",
      description: "Hôtel de Ville – repère historique et administratif.",
      x: 170,
      y: 210,
    },
    vieuxPort: {
      name: "Vieux-Port",
      description: "Cœur maritime de Marseille – cafés et quais animés.",
      x: 120,
      y: 65,
    },
    notreDame: {
      name: "Notre-Dame de la Garde",
      description: "La Bonne Mère – point de vue emblématique.",
      x: 320,
      y: 50,
    },
    gare: {
      name: "Gare Saint-Charles",
      description: "Arrivées & départs – hub principal.",
      x: 54,
      y: 194,
    },
    hopital: {
      name: "Hôpital",
      description: "Services médicaux et urgences.",
      x: 320,
      y: 240,
    },
    musee: {
      name: "Musée",
      description: "Culture & expositions temporaires.",
      x: 280,
      y: 258,
    },
  };
  const activePoiData = activePoi ? poiMap[activePoi] : null;
  const mapSize = 400;
  const togglePoi = (id) => {
    setActivePoi((current) => (current === id ? null : id));
  };
  const handlePoiKeyDown = (id) => (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePoi(id);
    }
  };

  return (
    <div className="relative inline-block">
      <div className="relative h-80 w-80">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fond gris sombre */}
          <rect width="400" height="400" fill="#1a1f2e" />

          {/* Littoral en haut - Vieux Port */}
          <path
            d="M 0 40 Q 50 25 100 30 Q 150 35 200 25 Q 250 30 300 40 L 320 50 Q 350 60 400 50 L 400 0 L 0 0 Z"
            fill="rgba(30, 144, 255, 0.4)"
          />

          {/* Eau - Méditerranée (droite) */}
          <rect x="320" y="80" width="80" height="320" fill="rgba(25, 130, 200, 0.3)" />

          {/* Eau - Baie (bas) */}
          <polygon points="0,350 150,340 200,360 250,345 400,360 400,400 0,400" fill="rgba(30, 144, 255, 0.35)" />

          {/* Parcs/Espaces verts */}
          <rect x="30" y="80" width="50" height="50" fill="rgba(52, 168, 83, 0.35)" />
          <circle cx="280" cy="120" r="30" fill="rgba(52, 168, 83, 0.3)" />
          <polygon points="180,300 230,290 240,340 170,345" fill="rgba(52, 168, 83, 0.28)" />

          {/* Blocs urbains (remplissage) */}
          <rect x="90" y="95" width="24" height="16" fill="rgba(120, 120, 120, 0.25)" />
          <rect x="135" y="105" width="20" height="12" fill="rgba(120, 120, 120, 0.22)" />
          <rect x="200" y="105" width="18" height="14" fill="rgba(120, 120, 120, 0.22)" />
          <rect x="250" y="165" width="22" height="16" fill="rgba(120, 120, 120, 0.2)" />
          <rect x="70" y="230" width="26" height="18" fill="rgba(120, 120, 120, 0.2)" />
          <rect x="150" y="230" width="28" height="16" fill="rgba(120, 120, 120, 0.2)" />
          <rect x="210" y="230" width="22" height="14" fill="rgba(120, 120, 120, 0.2)" />
          <rect x="260" y="290" width="24" height="18" fill="rgba(120, 120, 120, 0.2)" />

          {/* ===== ROUTES PRINCIPALES ÉPAISSES (style GTA) ===== */}
          
          {/* Boulevard côtier (E-W principal) */}
          <line x1="0" y1="80" x2="400" y2="80" stroke="#d0d0d0" strokeWidth="5" opacity="0.85" />
          
          {/* Avenue Cannebière (axe principal N-S) */}
          <line x1="120" y1="30" x2="120" y2="380" stroke="#c8c8c8" strokeWidth="4" opacity="0.8" />
          
          {/* Boulevard majeur E-W 2 */}
          <line x1="20" y1="200" x2="380" y2="200" stroke="#c0c0c0" strokeWidth="3.5" opacity="0.75" />
          
          {/* Avenue N-S secondaire */}
          <line x1="240" y1="40" x2="240" y2="370" stroke="#b8b8b8" strokeWidth="3" opacity="0.7" />
          
          {/* Rue E-W 3 */}
          <line x1="20" y1="280" x2="320" y2="280" stroke="#b0b0b0" strokeWidth="2.5" opacity="0.65" />

          {/* ===== ROUTES SECONDAIRES (GRILLE URBAINE DENSE) ===== */}
          
          {/* Lignes verticales */}
          <line x1="60" y1="30" x2="60" y2="320" stroke="#8a8a8a" strokeWidth="1.2" opacity="0.6" />
          <line x1="90" y1="35" x2="90" y2="330" stroke="#8a8a8a" strokeWidth="1" opacity="0.5" />
          <line x1="180" y1="40" x2="180" y2="340" stroke="#8a8a8a" strokeWidth="1.2" opacity="0.6" />
          <line x1="210" y1="50" x2="210" y2="340" stroke="#8a8a8a" strokeWidth="1" opacity="0.5" />
          <line x1="300" y1="50" x2="300" y2="340" stroke="#8a8a8a" strokeWidth="1.2" opacity="0.55" />
          <line x1="40" y1="100" x2="40" y2="300" stroke="#8a8a8a" strokeWidth="1" opacity="0.5" />
          <line x1="160" y1="50" x2="160" y2="360" stroke="#8a8a8a" strokeWidth="1" opacity="0.5" />
          <line x1="270" y1="50" x2="270" y2="350" stroke="#8a8a8a" strokeWidth="1" opacity="0.5" />
          <line x1="340" y1="80" x2="340" y2="310" stroke="#8a8a8a" strokeWidth="0.9" opacity="0.45" />

          {/* Lignes horizontales */}
          <line x1="20" y1="130" x2="320" y2="130" stroke="#8a8a8a" strokeWidth="1.2" opacity="0.6" />
          <line x1="30" y1="250" x2="320" y2="250" stroke="#8a8a8a" strokeWidth="1.2" opacity="0.6" />
          <line x1="20" y1="160" x2="300" y2="160" stroke="#8a8a8a" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="185" x2="300" y2="185" stroke="#8a8a8a" strokeWidth="1" opacity="0.5" />
          <line x1="30" y1="320" x2="300" y2="320" stroke="#8a8a8a" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="220" x2="320" y2="220" stroke="#8a8a8a" strokeWidth="1" opacity="0.5" />
          <line x1="40" y1="300" x2="320" y2="300" stroke="#8a8a8a" strokeWidth="0.9" opacity="0.45" />

          {/* ===== ROUTES COURBES (LITTORAL ET ZONES ORGANIQUES) ===== */}
          <path d="M 20 110 Q 50 100 80 120" stroke="#8a8a8a" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 280 100 Q 310 80 330 110" stroke="#8a8a8a" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 340 180 Q 320 220 300 260" stroke="#8a8a8a" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M 50 280 Q 100 300 150 290" stroke="#8a8a8a" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M 200 310 Q 240 330 280 320" stroke="#8a8a8a" strokeWidth="1" fill="none" opacity="0.45" />

          {/* ===== RONDS-POINTS (intersections) ===== */}
          <circle cx="120" cy="80" r="4" fill="none" stroke="#a5a5a5" strokeWidth="1" opacity="0.7" />
          <circle cx="120" cy="200" r="4" fill="none" stroke="#a5a5a5" strokeWidth="1" opacity="0.7" />
          <circle cx="240" cy="200" r="4" fill="none" stroke="#a5a5a5" strokeWidth="1" opacity="0.7" />
          <circle cx="60" cy="130" r="3" fill="none" stroke="#9a9a9a" strokeWidth="0.8" opacity="0.6" />
          <circle cx="180" cy="160" r="3" fill="none" stroke="#9a9a9a" strokeWidth="0.8" opacity="0.6" />

          {/* ===== PETITES RUELLES (grille fine) ===== */}
          <line x1="90" y1="100" x2="90" y2="180" stroke="#7a7a7a" strokeWidth="0.8" opacity="0.45" />
          <line x1="150" y1="90" x2="150" y2="240" stroke="#7a7a7a" strokeWidth="0.8" opacity="0.45" />
          <line x1="210" y1="80" x2="210" y2="300" stroke="#7a7a7a" strokeWidth="0.8" opacity="0.45" />
          <line x1="330" y1="120" x2="330" y2="260" stroke="#7a7a7a" strokeWidth="0.7" opacity="0.4" />

          <line x1="50" y1="145" x2="150" y2="145" stroke="#7a7a7a" strokeWidth="0.8" opacity="0.45" />
          <line x1="80" y1="175" x2="280" y2="175" stroke="#7a7a7a" strokeWidth="0.8" opacity="0.45" />
          <line x1="60" y1="235" x2="280" y2="235" stroke="#7a7a7a" strokeWidth="0.8" opacity="0.45" />
          <line x1="100" y1="300" x2="300" y2="300" stroke="#7a7a7a" strokeWidth="0.7" opacity="0.4" />

          {/* ===== LANDMARKS MARSEILLE ===== */}
          
          {/* Notre-Dame de la Garde (triangle doré en haut) */}
          <polygon points="320,45 315,60 325,60" fill="rgba(255, 200, 100, 0.9)" />
          <circle cx="320" cy="42" r="2" fill="rgba(255, 220, 150, 0.9)" />
          
          {/* Vieux Port (rectangle bleu au centre-haut) */}
          <rect x="100" y="50" width="60" height="30" fill="rgba(50, 150, 220, 0.5)" stroke="rgba(100, 180, 255, 0.7)" strokeWidth="1" />
          <text x="125" y="70" fontSize="8" fill="rgba(150, 200, 255, 0.7)" fontWeight="bold">PORT</text>
          
          {/* Fort Saint-Jean (petit carré) */}
          <rect x="95" y="75" width="12" height="12" fill="none" stroke="rgba(255, 150, 100, 0.7)" strokeWidth="1" />

          {/* Docks (petits quais) */}
          <rect x="105" y="40" width="8" height="6" fill="rgba(180, 200, 220, 0.5)" />
          <rect x="118" y="40" width="8" height="6" fill="rgba(180, 200, 220, 0.5)" />
          <rect x="131" y="40" width="8" height="6" fill="rgba(180, 200, 220, 0.5)" />
          <rect x="144" y="40" width="8" height="6" fill="rgba(180, 200, 220, 0.5)" />

          {/* Mairie (bâtiment) */}
          <g
            id="mairieMarker"
            transform="translate(170, 210)"
            role="button"
            tabIndex="0"
            onClick={() => togglePoi("mairie")}
            onKeyDown={handlePoiKeyDown("mairie")}
            style={{ cursor: "pointer" }}
          >
            <rect x="-7" y="-6" width="14" height="10" fill="rgba(120, 200, 255, 0.85)" stroke="rgba(160, 220, 255, 0.9)" strokeWidth="0.6" />
            <rect x="-6" y="-2" width="2" height="6" fill="rgba(230, 250, 255, 0.9)" />
            <rect x="-2" y="-2" width="2" height="6" fill="rgba(230, 250, 255, 0.9)" />
            <rect x="2" y="-2" width="2" height="6" fill="rgba(230, 250, 255, 0.9)" />
            <rect x="5" y="-2" width="1" height="6" fill="rgba(230, 250, 255, 0.9)" />
            <polygon points="-7,-6 0,-10 7,-6" fill="rgba(160, 220, 255, 0.9)" />
          </g>

          {/* ===== MARQUEUR FESTIVAL marsAI ===== */}
          
          {/* Étoile/badge spécial pour le festival */}
          <g
            id="festivalMarker"
            transform="translate(200, 150)"
            role="button"
            tabIndex="0"
            onClick={() => togglePoi("festival")}
            onKeyDown={handlePoiKeyDown("festival")}
            style={{ cursor: "pointer" }}
          >
            {/* Glow pulsant violet */}
            <circle cx="0" cy="0" r="15" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" opacity="0.8" />
            
            {/* Étoile festival */}
            <polygon
              points="0,-12 3,-5 10,-3 5,2 7,10 0,6 -7,10 -5,2 -10,-3 -3,-5"
              fill="rgba(168, 85, 247, 0.9)"
              stroke="rgba(200, 150, 255, 1)"
              strokeWidth="0.5"
            />
            
            {/* Texte "AI" */}
            <text x="0" y="5" fontSize="6" fill="white" fontWeight="bold" textAnchor="middle">AI</text>
          </g>

          {/* Autres icônes */}
          
          {/* Gare SNCF (carré orange) */}
          <g
            id="gareMarker"
            role="button"
            tabIndex="0"
            onClick={() => togglePoi("gare")}
            onKeyDown={handlePoiKeyDown("gare")}
            style={{ cursor: "pointer" }}
          >
            <rect x="50" y="190" width="8" height="8" fill="rgba(255, 180, 100, 0.8)" stroke="rgba(255, 200, 120, 0.9)" strokeWidth="0.5" />
          </g>
          
          {/* Hôpital (croix rouge) */}
          <g
            id="hopitalMarker"
            role="button"
            tabIndex="0"
            onClick={() => togglePoi("hopital")}
            onKeyDown={handlePoiKeyDown("hopital")}
            style={{ cursor: "pointer" }}
          >
            <line x1="320" y1="230" x2="320" y2="250" stroke="rgba(255, 100, 100, 0.8)" strokeWidth="1.2" />
            <line x1="310" y1="240" x2="330" y2="240" stroke="rgba(255, 100, 100, 0.8)" strokeWidth="1.2" />
          </g>
          
          {/* Musée (triangle jaune) */}
          <g
            id="museeMarker"
            role="button"
            tabIndex="0"
            onClick={() => togglePoi("musee")}
            onKeyDown={handlePoiKeyDown("musee")}
            style={{ cursor: "pointer" }}
          >
            <polygon points="280,250 276,265 284,265" fill="rgba(255, 200, 80, 0.75)" />
          </g>

          {/* Vieux Port - zone cliquable */}
          <g
            id="vieuxPortMarker"
            role="button"
            tabIndex="0"
            onClick={() => togglePoi("vieuxPort")}
            onKeyDown={handlePoiKeyDown("vieuxPort")}
            style={{ cursor: "pointer" }}
          >
            <rect x="100" y="50" width="60" height="30" fill="transparent" />
          </g>

          {/* Notre-Dame - zone cliquable */}
          <g
            id="notreDameMarker"
            role="button"
            tabIndex="0"
            onClick={() => togglePoi("notreDame")}
            onKeyDown={handlePoiKeyDown("notreDame")}
            style={{ cursor: "pointer" }}
          >
            <circle cx="320" cy="50" r="10" fill="transparent" />
          </g>

          {/* Point joueur - Centre (blanc) */}
          <g id="playerMarker" transform="translate(120, 200)">
            {/* Cercle glow */}
            <circle cx="0" cy="0" r="7" fill="none" stroke="rgba(255, 255, 150, 0.5)" strokeWidth="1" opacity="0.8" />
            
            {/* Carré blanc principal */}
            <rect x="-5" y="-5" width="10" height="10" fill="white" stroke="rgba(200, 200, 255, 0.8)" strokeWidth="0.5" />
            
            {/* Centre jaune */}
            <rect x="-3" y="-3" width="6" height="6" fill="rgba(255, 255, 150, 0.95)" />
            
            {/* Flèche Nord */}
            <polygon points="0,-10 -2,-5 2,-5" fill="white" opacity="0.9" />
          </g>

          {/* ===== RADAR TOURNANT (coin supérieur droit) ===== */}
          <g id="radarCorner" transform="translate(350, 50)">
            {/* Fond radar */}
            <circle cx="0" cy="0" r="35" fill="rgba(20, 25, 40, 0.85)" stroke="rgba(100, 200, 100, 0.6)" strokeWidth="1.5" />
            
            {/* Grille concentrique */}
            <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(100, 200, 100, 0.2)" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="20" fill="none" stroke="rgba(100, 200, 100, 0.2)" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="12" fill="none" stroke="rgba(100, 200, 100, 0.2)" strokeWidth="0.5" />
            
            {/* Lignes de croisement */}
            <line x1="-30" y1="0" x2="30" y2="0" stroke="rgba(100, 200, 100, 0.2)" strokeWidth="0.5" />
            <line x1="0" y1="-30" x2="0" y2="30" stroke="rgba(100, 200, 100, 0.2)" strokeWidth="0.5" />
            
            {/* Balayage radar animé */}
            <g id="radarSweep">
              <defs>
                <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(100, 255, 100, 0)" />
                  <stop offset="50%" stopColor="rgba(100, 255, 100, 0.4)" />
                  <stop offset="100%" stopColor="rgba(100, 255, 100, 0.8)" />
                </linearGradient>
              </defs>
              <path
                d="M 0 0 L 0 -30 A 30 30 0 0 1 21.2 -21.2 Z"
                fill="url(#sweepGradient)"
                opacity="0.7"
              />
            </g>
            
            {/* Points de détection (blips) */}
            <circle cx="15" cy="-8" r="1.5" fill="rgba(100, 255, 100, 0.9)" className="radarBlip" />
            <circle cx="-10" cy="12" r="1.5" fill="rgba(100, 255, 100, 0.9)" className="radarBlip" />
            <circle cx="8" cy="18" r="1.5" fill="rgba(255, 200, 100, 0.9)" className="radarBlip" />
            <circle cx="-18" cy="-6" r="1.5" fill="rgba(255, 100, 100, 0.9)" className="radarBlip" />
            
            {/* Centre du radar - Position joueur (carré blanc lumineux) */}
            <rect x="-2.5" y="-2.5" width="5" height="5" fill="white" stroke="rgba(255, 255, 150, 0.8)" strokeWidth="0.5" />
            <rect x="-1.5" y="-1.5" width="3" height="3" fill="rgba(255, 255, 150, 0.95)" />
          </g>

          {/* ===== GRILLE HUD (anneaux) ===== */}
          <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(150, 150, 150, 0.25)" strokeWidth="0.8" opacity="0.5" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="rgba(150, 150, 150, 0.2)" strokeWidth="0.6" opacity="0.4" />
          <circle cx="200" cy="200" r="50" fill="none" stroke="rgba(150, 150, 150, 0.15)" strokeWidth="0.4" opacity="0.3" />
        </svg>

        {activePoiData && (
          <div
            className="absolute z-30 w-44 rounded-md bg-black/80 text-white/90 text-[10px] shadow-lg border border-white/10 px-2 py-2"
            style={{
              left: `${(activePoiData.x / mapSize) * 100}%`,
              top: `${(activePoiData.y / mapSize) * 100}%`,
              transform: "translate(-50%, -115%)",
              pointerEvents: "auto",
            }}
          >
            <div className="text-[11px] font-semibold text-white">
              {activePoiData.name}
            </div>
            <div className="text-white/70 leading-snug">
              {activePoiData.description}
            </div>
          </div>
        )}

        {/* Textes overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none z-10">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-white/70">MAP</span>
            <span className="text-sm font-bold text-white/90">N</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-[9px] text-white/50 space-y-1 font-light">
              <div>■ Gare</div>
              <div>+ Hôp</div>
              <div>△ Musée</div>
              <div>⌂ Mairie</div>
              <div>★ marsAI</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                marsAI
              </div>
              <span className="text-xs font-extrabold text-white">MARSEILLE</span>
            </div>
          </div>
        </div>

        {/* Border HUD */}
        <div className="absolute inset-0 border-2 border-gray-500/40 pointer-events-none" 
          style={{
            boxShadow: "0 0 20px rgba(100, 180, 255, 0.15), inset 0 0 12px rgba(0, 0, 0, 0.4)"
          }}
        />
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { r: 15; opacity: 0.6; }
          50% { r: 20; opacity: 0.2; }
        }
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blipPulse {
          0%, 100% { opacity: 1; r: 1.5; }
          50% { opacity: 0.5; r: 2; }
        }
        #festivalMarker circle {
          animation: glow 2s ease-in-out infinite;
        }
        #radarSweep {
          transform-origin: center;
          animation: radarSpin 4s linear infinite;
        }
        .radarBlip {
          animation: blipPulse 1.5s ease-in-out infinite;
        }
        #festivalMarker:hover polygon,
        #mairieMarker:hover rect,
        #gareMarker:hover rect,
        #hopitalMarker:hover line,
        #museeMarker:hover polygon {
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.35));
        }
      `}</style>
    </div>
  );
}
