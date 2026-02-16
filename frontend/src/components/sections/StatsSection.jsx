import React from "react";
import { StatCard, AnalyticsBar } from "./HomeComponents";
import {
  STATS_DATA,
  ANALYTICS_DATA,
  HOME_TEXTS,
} from "../../constants/homeConstants";
import { useAudioContext } from "../../hooks/useAudioContext";

// Import des images de roulettes
import imgFilm from "../../assets/images/film.png";
import imgIa from "../../assets/images/ia.png";
import imgVisiteur from "../../assets/images/visiteur.png";
import imgPays from "../../assets/images/pays.png";
import imgTout from "../../assets/images/tout.png";

// Catégories de statistiques avec leurs chiffres clés spécifiques
const FILM_GENRES = [
  {
    name: "TOUS",
    icon: "⭐",
    color: "from-violet-500 to-fuchsia-600",
    projectorImage: null,
    stats: [
      {
        icon: "🔗",
        title: "Visiteurs",
        subtitle: "Au festival",
        value: 1950,
        prefix: "",
        gradient: "from-violet-600 to-purple-700",
      },
      {
        icon: "💡",
        title: "Professionnels IA",
        subtitle: "Experts mobilisés",
        value: 39,
        prefix: "+",
        gradient: "from-fuchsia-600 to-pink-700",
      },
      {
        icon: "🎬",
        title: "Films soumis",
        subtitle: "Sélection mondiale",
        value: 390,
        prefix: "+",
        gradient: "from-amber-500 to-orange-700",
      },
      {
        icon: "🌍",
        title: "Pays représentés",
        subtitle: "Portée mondiale",
        value: 78,
        prefix: "+",
        gradient: "from-cyan-500 to-blue-700",
      },
    ],
    analytics: [
      {
        id: 1,
        label: "COURTS",
        percentage: 65,
        gradient: "from-cyan-500 to-blue-600",
      },
      {
        id: 2,
        label: "DOCS",
        percentage: 42,
        gradient: "from-fuchsia-500 to-pink-600",
      },
      {
        id: 3,
        label: "EXPO",
        percentage: 28,
        gradient: "from-purple-500 to-violet-600",
      },
      {
        id: 4,
        label: "ANIMS",
        percentage: 55,
        gradient: "from-amber-500 to-orange-600",
      },
    ],
  },
  {
    name: "Visiteurs",
    icon: "🔗",
    color: "from-violet-500 to-purple-600",
    projectorImage: "projector-visitors.png",
    stats: [
      {
        icon: "🔗",
        title: "Visiteurs",
        subtitle: "Au festival",
        value: 1950,
        prefix: "",
        gradient: "from-violet-600 to-purple-700",
      },
    ],
    analytics: [
      {
        id: 1,
        label: "COURTS",
        percentage: 65,
        gradient: "from-cyan-500 to-blue-600",
      },
      {
        id: 2,
        label: "DOCS",
        percentage: 42,
        gradient: "from-fuchsia-500 to-pink-600",
      },
      {
        id: 3,
        label: "EXPO",
        percentage: 28,
        gradient: "from-purple-500 to-violet-600",
      },
      {
        id: 4,
        label: "ANIMS",
        percentage: 55,
        gradient: "from-amber-500 to-orange-600",
      },
    ],
  },
  {
    name: "Professionnels IA",
    icon: "💡",
    color: "from-fuchsia-500 to-pink-600",
    projectorImage: "projector-professionals.png",
    stats: [
      {
        icon: "💡",
        title: "Professionnels IA",
        subtitle: "Experts mobilisés",
        value: 39,
        prefix: "+",
        gradient: "from-fuchsia-600 to-pink-700",
      },
    ],
    analytics: [
      {
        id: 1,
        label: "COURTS",
        percentage: 65,
        gradient: "from-cyan-500 to-blue-600",
      },
      {
        id: 2,
        label: "DOCS",
        percentage: 42,
        gradient: "from-fuchsia-500 to-pink-600",
      },
      {
        id: 3,
        label: "EXPO",
        percentage: 28,
        gradient: "from-purple-500 to-violet-600",
      },
      {
        id: 4,
        label: "ANIMS",
        percentage: 55,
        gradient: "from-amber-500 to-orange-600",
      },
    ],
  },
  {
    name: "Films soumis",
    icon: "🎬",
    color: "from-amber-500 to-orange-600",
    projectorImage: "projector-films.png",
    stats: [
      {
        icon: "🎬",
        title: "Films soumis",
        subtitle: "Sélection mondiale",
        value: 390,
        prefix: "+",
        gradient: "from-amber-500 to-orange-700",
      },
    ],
    analytics: [
      {
        id: 1,
        label: "COURTS",
        percentage: 65,
        gradient: "from-cyan-500 to-blue-600",
      },
      {
        id: 2,
        label: "DOCS",
        percentage: 42,
        gradient: "from-fuchsia-500 to-pink-600",
      },
      {
        id: 3,
        label: "EXPO",
        percentage: 28,
        gradient: "from-purple-500 to-violet-600",
      },
      {
        id: 4,
        label: "ANIMS",
        percentage: 55,
        gradient: "from-amber-500 to-orange-600",
      },
    ],
  },
  {
    name: "Pays représentés",
    icon: "🌍",
    color: "from-cyan-500 to-blue-600",
    projectorImage: "projector-countries.png",
    stats: [
      {
        icon: "🌍",
        title: "Pays représentés",
        subtitle: "Portée mondiale",
        value: 78,
        prefix: "+",
        gradient: "from-cyan-500 to-blue-700",
      },
    ],
    analytics: [
      {
        id: 1,
        label: "COURTS",
        percentage: 65,
        gradient: "from-cyan-500 to-blue-600",
      },
      {
        id: 2,
        label: "DOCS",
        percentage: 42,
        gradient: "from-fuchsia-500 to-pink-600",
      },
      {
        id: 3,
        label: "EXPO",
        percentage: 28,
        gradient: "from-purple-500 to-violet-600",
      },
      {
        id: 4,
        label: "ANIMS",
        percentage: 55,
        gradient: "from-amber-500 to-orange-600",
      },
    ],
  },
];

export function StatsSection() {
  const [statsRevealed, setStatsRevealed] = React.useState(false);
  const [statsFlash, setStatsFlash] = React.useState(false);
  const [selectedGenreIndex, setSelectedGenreIndex] = React.useState(0);
  const [isRotating, setIsRotating] = React.useState(false);
  const playCameraSound = useAudioContext();

  const handleStatsReveal = () => {
    const nextState = !statsRevealed;
    setStatsRevealed(nextState);
    if (nextState) {
      playCameraSound();
    }
    setStatsFlash(true);
    window.setTimeout(() => setStatsFlash(false), 1200);
  };

  const rotateGenre = (direction) => {
    if (isRotating) return;

    setIsRotating(true);
    const newIndex =
      direction === "next"
        ? (selectedGenreIndex + 1) % FILM_GENRES.length
        : (selectedGenreIndex - 1 + FILM_GENRES.length) % FILM_GENRES.length;

    setSelectedGenreIndex(newIndex);
    setTimeout(() => setIsRotating(false), 500);
  };

  // Calculer les stats filtrées selon le genre
  const currentGenre = FILM_GENRES[selectedGenreIndex];
  const filteredStats = currentGenre.stats;
  const filteredAnalytics = currentGenre.analytics;

  return (
    <section className="px-4 pb-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="text-xs font-semibold text-white/80">
              Résultats & Projections
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            {HOME_TEXTS.STATS_TITLE}
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-white/70">
            {HOME_TEXTS.STATS_DESC}
          </p>
        </div>

        {/* Stats Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Background effects when revealed */}
          {statsRevealed && (
            <>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 -z-10 pointer-events-none transition-all duration-700"
                style={{
                  width: "400px",
                  height: "400px",
                  background:
                    "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.2) 30%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <div
                className="absolute inset-0 -z-10 pointer-events-none transition-all duration-700 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.25) 0%, transparent 50%)",
                }}
              />
            </>
          )}

          <div className="relative flex flex-col lg:flex-row gap-3 items-center lg:items-start justify-center lg:justify-start">
            {/* Camera Button with Genre Selector */}
            <CameraButton
              statsRevealed={statsRevealed}
              statsFlash={statsFlash}
              onToggle={handleStatsReveal}
              selectedGenre={currentGenre}
              selectedGenreIndex={selectedGenreIndex}
              onRotateGenre={rotateGenre}
              isRotating={isRotating}
            />

            {/* Stats Panel */}
            <StatsPanel
              statsRevealed={statsRevealed}
              statsData={filteredStats}
              analyticsData={filteredAnalytics}
              currentGenre={currentGenre}
              selectedGenreIndex={selectedGenreIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CameraButton({
  statsRevealed,
  statsFlash,
  onToggle,
  selectedGenre,
  selectedGenreIndex,
  onRotateGenre,
  isRotating,
}) {
  const FILM_GENRES_LOCAL = [
    {
      name: "TOUS",
      icon: "⭐",
      color: "from-violet-500 to-fuchsia-600",
      image: imgTout,
    },
    {
      name: "Visiteurs",
      icon: "🔗",
      color: "from-violet-500 to-purple-600",
      image: imgVisiteur,
    },
    {
      name: "Professionnels IA",
      icon: "💡",
      color: "from-fuchsia-500 to-pink-600",
      image: imgIa,
    },
    {
      name: "Films soumis",
      icon: "🎬",
      color: "from-amber-500 to-orange-600",
      image: imgFilm,
    },
    {
      name: "Pays représentés",
      icon: "🌍",
      color: "from-cyan-500 to-blue-600",
      image: imgPays,
    },
  ];

  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2 relative w-full lg:w-auto px-4 lg:px-0">
      {/* Roulette de film 35mm - visible seulement quand caméra allumée */}
      {statsRevealed && (
        <div
          className="relative w-24 h-24 flex items-center justify-center animate-fadeIn"
          style={{ perspective: "1500px" }}
        >
          {/* Image de roulette qui tourne - uniquement pour Film et IA */}
          {FILM_GENRES_LOCAL[selectedGenreIndex].image && (
            <img
              src={FILM_GENRES_LOCAL[selectedGenreIndex].image}
              alt={FILM_GENRES_LOCAL[selectedGenreIndex].name}
              className={`w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 ${isRotating ? "animate-spin" : ""}`}
              style={{
                filter:
                  "drop-shadow(0 8px 30px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.3))",
              }}
            />
          )}

          {/* Boutons de navigation */}
          <button
            onClick={() => !isRotating && onRotateGenre("prev")}
            disabled={isRotating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 border border-violet-400 text-white text-xs font-bold hover:shadow-lg hover:shadow-violet-500/50 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center"
          >
            ‹
          </button>

          <button
            onClick={() => !isRotating && onRotateGenre("next")}
            disabled={isRotating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 w-5 h-5 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 border border-fuchsia-400 text-white text-xs font-bold hover:shadow-lg hover:shadow-fuchsia-500/50 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center"
          >
            ›
          </button>
        </div>
      )}

      {/* Étiquette */}
      {statsRevealed && (
        <div className="px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur animate-fadeIn">
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {selectedGenre.name}
          </span>
        </div>
      )}

      {/* Camera image button */}
      <button
        type="button"
        onClick={onToggle}
        className={`relative w-full sm:w-36 lg:w-40 h-36 sm:h-40 lg:h-44 flex items-center justify-center rounded-xl bg-black border-2 transition-all cursor-pointer group overflow-hidden ${
          statsRevealed
            ? "border-green-400/40 shadow-lg shadow-green-500/20"
            : "border-white/10 hover:border-violet-400/50 hover:shadow-2xl hover:shadow-violet-500/30"
        }`}
        aria-label="Révéler les chiffres"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {statsRevealed && selectedGenre.projectorImage ? (
          (() => {
            try {
              const imageSrc = require(
                `../../assets/images/${selectedGenre.projectorImage}`,
              );
              return (
                <img
                  src={imageSrc}
                  alt={`Projecteur ${selectedGenre.name}`}
                  className="w-full h-full object-cover transition-all duration-500 relative z-10"
                />
              );
            } catch (e) {
              return (
                <img
                  src={require("../../assets/images/allumer.png")}
                  alt="Caméra allumée"
                  className="w-full h-full object-cover transition-all duration-500 relative z-10"
                />
              );
            }
          })()
        ) : (
          <img
            src={
              statsRevealed
                ? require("../../assets/images/allumer.png")
                : require("../../assets/images/éteint.png")
            }
            alt={statsRevealed ? "Caméra allumée" : "Caméra éteinte"}
            className="w-full h-full object-cover transition-all duration-500 relative z-10"
          />
        )}

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-bold text-white">CLICK</span>
          </div>
        </div>
      </button>

      {/* Toggle switch */}
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-500 cursor-pointer border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 group ${
          statsRevealed
            ? "bg-gradient-to-r from-green-600/60 to-emerald-600/60 border-green-400 focus:ring-green-500/50 shadow-lg shadow-green-500/50"
            : "bg-gradient-to-r from-red-600/60 to-rose-600/60 border-red-400 focus:ring-red-500/50 shadow-lg shadow-red-500/30"
        }`}
        aria-label={statsRevealed ? "Éteindre la caméra" : "Allumer la caméra"}
        role="switch"
        aria-checked={statsRevealed}
      >
        <div
          className={`absolute inset-0 rounded-full blur-md transition-all duration-500 -z-10 ${
            statsRevealed
              ? "bg-green-500/60 opacity-100"
              : "bg-red-500/60 opacity-100"
          }`}
        />

        <span
          className={`absolute left-1.5 text-[9px] font-extrabold transition-all duration-500 ${
            statsRevealed
              ? "text-red-200 opacity-20"
              : "text-red-50 opacity-100"
          }`}
        >
          OFF
        </span>
        <span
          className={`absolute right-1.5 text-[9px] font-extrabold transition-all duration-500 ${
            statsRevealed
              ? "text-green-50 opacity-100"
              : "text-green-200 opacity-20"
          }`}
        >
          ON
        </span>

        <div
          className={`relative h-5 w-5 transform rounded-full bg-white shadow-xl transition-all duration-500 flex items-center justify-center group-hover:shadow-2xl ${
            statsRevealed ? "translate-x-6" : "translate-x-0.5"
          }`}
        >
          <div
            className={`relative w-2 h-2 rounded-full transition-all duration-500 ${
              statsRevealed
                ? "bg-green-500 shadow-lg shadow-green-500/80"
                : "bg-red-500 shadow-lg shadow-red-500/80"
            }`}
          >
            {statsRevealed && (
              <div className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping" />
            )}
            {!statsRevealed && (
              <div className="absolute inset-0 rounded-full bg-red-400 opacity-60 animate-ping" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

function StatsPanel({
  statsRevealed,
  statsData,
  analyticsData,
  currentGenre,
  selectedGenreIndex,
}) {
  const [showParticles, setShowParticles] = React.useState(false);

  // Générer des particules pour le faisceau
  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 8; i++) {
      particles.push({
        id: i,
        tx: (Math.random() - 0.5) * 30 + "px",
        delay: i * 0.15 + "s",
      });
    }
    return particles;
  };

  const particles = React.useMemo(() => generateParticles(), []);

  return (
    <>
      {/* Glow de base cinématique du projecteur */}
      {statsRevealed && (
        <div
          className="absolute -left-40 md:left-0 top-1/2 md:top-1/3 -translate-y-1/2 md:-translate-y-0 w-screen md:w-96 h-96 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 20% 50%, rgba(147, 51, 234, 0.5) 0%, rgba(147, 51, 234, 0.25) 30%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      )}

      {/* Light beam effect - Faisceau cinématique ultra-réaliste DESKTOP */}
      {statsRevealed && window.innerWidth >= 768 && (
        <div
          className="absolute left-0 top-1/3 w-0 h-0 pointer-events-none z-20"
          style={{
            borderLeft: "250px solid transparent",
            borderRight: "0px solid transparent",
            borderTop: "200px solid rgba(200, 150, 255, 0.7)",
            borderBottom: "200px solid rgba(200, 150, 255, 0.7)",
            filter: "blur(12px)",
            animation: "beamPulse 1.5s ease-in-out infinite",
          }}
        />
      )}

      {/* Couche 2 : Bord du faisceau (soft glow) DESKTOP */}
      {statsRevealed && window.innerWidth >= 768 && (
        <div
          className="absolute left-0 top-1/3 w-0 h-0 pointer-events-none z-19"
          style={{
            borderLeft: "320px solid transparent",
            borderRight: "0px solid transparent",
            borderTop: "250px solid rgba(167, 139, 250, 0.3)",
            borderBottom: "250px solid rgba(167, 139, 250, 0.3)",
            filter: "blur(45px)",
          }}
        />
      )}

      {/* Light beam effect - Faisceau cinématique MOBILE */}
      {statsRevealed && window.innerWidth < 768 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 w-0 h-0 pointer-events-none z-20"
          style={{
            borderLeft: "150px solid transparent",
            borderRight: "150px solid transparent",
            borderTop: "0px solid transparent",
            borderBottom: "300px solid rgba(200, 150, 255, 0.7)",
            filter: "blur(12px)",
            animation: "beamPulse 1.5s ease-in-out infinite",
          }}
        />
      )}

      {/* Couche 2 : Bord du faisceau (soft glow) MOBILE */}
      {statsRevealed && window.innerWidth < 768 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 w-0 h-0 pointer-events-none z-19"
          style={{
            borderLeft: "180px solid transparent",
            borderRight: "180px solid transparent",
            borderTop: "0px solid transparent",
            borderBottom: "380px solid rgba(167, 139, 250, 0.3)",
            filter: "blur(45px)",
          }}
        />
      )}

      {/* Particules de poussière */}
      {statsRevealed && (
        <div className="absolute inset-0 pointer-events-none z-21">
          {particles.map((particle) => {
            const particleStyle = {
              position: "absolute",
              left: window.innerWidth >= 768 ? "80px" : "50%",
              top: window.innerWidth >= 768 ? "40%" : "30%",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "rgba(167, 139, 250, 0.8)",
              animation: `particleFloat 2.5s ease-out ${particle.delay} forwards`,
              "--tx": particle.tx,
              boxShadow: "0 0 12px rgba(147, 51, 234, 0.8)",
            };
            return (
              <div
                key={particle.id}
                className="particle"
                style={particleStyle}
              />
            );
          })}
        </div>
      )}

      {/* Flash effect */}
      {statsRevealed && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none transition-all duration-500 z-30"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(147, 51, 234, 0.3) 35%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}

      {/* Main panel */}
      <div
        className={`relative flex-1 rounded-lg p-2 sm:p-3 lg:max-w-3xl transition-all duration-700 overflow-hidden w-full ${
          statsRevealed
            ? "bg-white/[0.05] border border-white/10 shadow-2xl shadow-violet-500/30"
            : "bg-black/98 border border-black/50"
        }`}
      >
        {/* Film grain */}
        {statsRevealed && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay animate-grain"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
              backgroundSize: "200px 200px",
            }}
          />
        )}

        {/* Vignette */}
        {statsRevealed && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.3) 100%)",
            }}
          />
        )}

        {/* Content layout */}
        <div className="flex flex-col lg:flex-row gap-2 md:gap-4 h-full">
          {/* Stats cards */}
          <div className="flex-1">
            <div
              className={`h-full transition-all duration-700 ${
                statsRevealed
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8 pointer-events-none"
              }`}
              aria-hidden={!statsRevealed}
            >
              {/* Grid layout adaptatif selon le nombre de cartes */}
              <div
                className={`grid gap-2 ${
                  statsData.length === 1 ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {statsData.map((stat, index) => (
                  <StatCard
                    key={index}
                    icon={stat.icon}
                    title={stat.title}
                    subtitle={stat.subtitle}
                    value={stat.value}
                    prefix={stat.prefix}
                    revealed={statsRevealed}
                    gradient={stat.gradient}
                    isLarge={statsData.length === 1}
                    isActive={statsRevealed}
                    index={selectedGenreIndex}
                    total={FILM_GENRES.length}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Analytics panel */}
          <AnalyticsPanel
            statsRevealed={statsRevealed}
            analyticsData={analyticsData}
          />
        </div>
      </div>
    </>
  );
}

function AnalyticsPanel({ statsRevealed, analyticsData }) {
  return (
    <div
      className={`flex-1 transition-all duration-700 delay-150 ${
        statsRevealed
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8 pointer-events-none"
      }`}
      aria-hidden={!statsRevealed}
    >
      <div className="relative bg-black/90 border-2 border-cyan-400/40 rounded-lg p-1.5 md:p-2 backdrop-blur-xl h-full flex flex-col overflow-hidden shadow-lg shadow-cyan-500/20">
        {/* Grille réduite et plus légère */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Scanline effect réduit */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scanline opacity-50" />
        </div>

        {/* Corner decorations subtils */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-400/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-magenta-400/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-magenta-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

        {/* Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 pb-2 border-b border-cyan-400/20 gap-2">
          <div>
            <h3
              className="text-xs font-black text-cyan-400/90 uppercase tracking-widest"
              style={{ textShadow: "0 0 8px rgba(0, 255, 255, 0.5)" }}
            >
              ≡ DISTRIBUTION
            </h3>
            <div className="text-[9px] text-magenta-400/70 font-mono mt-0.5">
              SYS.ANALYTICS_v2.1
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/10 border border-cyan-400/40 rounded">
            <div
              className="w-1.5 h-1.5 bg-cyan-400 animate-pulse"
              style={{ boxShadow: "0 0 6px rgba(0, 255, 255, 0.5)" }}
            />
            <span className="text-[10px] font-bold text-cyan-300/80 font-mono">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Analytics bars */}
        <div className="space-y-1.5 md:space-y-2 flex-1 relative z-10">
          {analyticsData.map((item, index) => (
            <AnalyticsBar
              key={index}
              label={item.label}
              percentage={item.percentage}
              colorFrom={item.colorFrom}
              colorTo={item.colorTo}
              textColor={item.textColor}
              index={index}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-2 pt-2 border-t border-cyan-400/30">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-cyan-500/10 border border-cyan-400/40 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-cyan-400/20 text-xl font-mono">
                ≡
              </div>
              <p className="text-[8px] text-cyan-300 uppercase tracking-wider font-mono mb-0.5">
                AVG_RATE
              </p>
              <p
                className="text-sm font-black text-cyan-400 font-mono"
                style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.8)" }}
              >
                47.5%
              </p>
            </div>
            <div className="bg-magenta-500/10 border border-magenta-400/40 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-magenta-400/20 text-xl font-mono">
                ▲
              </div>
              <p className="text-[8px] text-magenta-300 uppercase tracking-wider font-mono mb-0.5">
                TOP_CAT
              </p>
              <p
                className="text-xs font-black text-magenta-400 font-mono uppercase"
                style={{ textShadow: "0 0 10px rgba(255, 0, 255, 0.8)" }}
              >
                Courts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
