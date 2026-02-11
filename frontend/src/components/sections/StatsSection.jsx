import React from "react";
import { StatCard, AnalyticsBar } from "../HomeComponents";
import { STATS_DATA, ANALYTICS_DATA, HOME_TEXTS } from "../../constants/homeConstants";
import { useAudioContext } from "../../hooks/useAudioContext";

export function StatsSection() {
  const [statsRevealed, setStatsRevealed] = React.useState(false);
  const [statsFlash, setStatsFlash] = React.useState(false);
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

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            <span className="text-xs font-semibold text-white/80">
              Résultats & Projections
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
            {HOME_TEXTS.STATS_TITLE}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
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

          <div className="relative flex flex-col lg:flex-row gap-0 items-center lg:items-stretch">
            {/* Camera Button */}
            <CameraButton
              statsRevealed={statsRevealed}
              statsFlash={statsFlash}
              onToggle={handleStatsReveal}
            />

            {/* Stats Panel */}
            <StatsPanel
              statsRevealed={statsRevealed}
              statsData={STATS_DATA}
              analyticsData={ANALYTICS_DATA}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CameraButton({ statsRevealed, statsFlash, onToggle }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-4 relative w-full md:w-auto px-4 md:px-0">
      {/* Camera image button */}
      <button
        type="button"
        onClick={onToggle}
        className={`relative w-full sm:w-56 md:w-64 h-64 sm:h-72 md:h-80 flex items-center justify-center rounded-3xl bg-black border-2 transition-all cursor-pointer group overflow-hidden ${
          statsRevealed
            ? "border-green-400/60 shadow-xl shadow-green-500/40"
            : "border-white/10 hover:border-violet-400/50 hover:shadow-2xl hover:shadow-violet-500/30"
        }`}
        aria-label="Révéler les chiffres"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {statsFlash && (
          <div className="absolute inset-0 rounded-3xl bg-white pointer-events-none animate-ultraFlash" />
        )}

        <img
          src={
            statsRevealed
              ? require("../../assets/images/allumer.png")
              : require("../../assets/images/éteint.png")
          }
          alt={statsRevealed ? "Caméra allumée" : "Caméra éteinte"}
          className="w-full h-full object-cover transition-all duration-500 relative z-10"
        />

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
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-500 cursor-pointer border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 group ${
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
            statsRevealed ? "bg-green-500/60 opacity-100" : "bg-red-500/60 opacity-100"
          }`}
        />

        <span
          className={`absolute left-1.5 text-[9px] font-extrabold transition-all duration-500 ${
            statsRevealed ? "text-red-200 opacity-20" : "text-red-50 opacity-100"
          }`}
        >
          OFF
        </span>
        <span
          className={`absolute right-1.5 text-[9px] font-extrabold transition-all duration-500 ${
            statsRevealed ? "text-green-50 opacity-100" : "text-green-200 opacity-20"
          }`}
        >
          ON
        </span>

        <div
          className={`relative h-6 w-6 transform rounded-full bg-white shadow-xl transition-all duration-500 flex items-center justify-center group-hover:shadow-2xl ${
            statsRevealed ? "translate-x-8" : "translate-x-1"
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

function StatsPanel({ statsRevealed, statsData, analyticsData }) {
  return (
    <>
      {/* Light beam effect */}
      {statsRevealed && (
        <div
          className="absolute left-1/2 sm:left-40 md:left-52 top-[36%] -translate-y-1/2 md:-translate-y-0 md:top-auto md:bottom-0 w-[calc(100%-6rem)] sm:w-[calc(100%-10rem)] md:w-[calc(100%-13rem)] h-12 sm:h-16 md:h-20 md:w-12 md:h-full pointer-events-none z-20 overflow-visible"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="h-full w-full animate-beamExpand origin-left md:origin-bottom"
            style={{
              background:
                window.innerWidth >= 768
                  ? "linear-gradient(90deg, rgba(147, 51, 234, 0.5) 0%, rgba(147, 51, 234, 0.3) 30%, rgba(147, 51, 234, 0.15) 60%, transparent 100%)"
                  : "linear-gradient(180deg, rgba(147, 51, 234, 0.5) 0%, rgba(147, 51, 234, 0.3) 30%, rgba(147, 51, 234, 0.15) 60%, transparent 100%)",
              clipPath:
                window.innerWidth >= 768
                  ? "polygon(0% 45%, 100% 0%, 100% 100%, 0% 55%)"
                  : "polygon(45% 0%, 0% 100%, 100% 100%, 55% 0%)",
              filter: "blur(25px)",
            }}
          />
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
        className={`relative flex-1 rounded-3xl p-4 sm:p-6 min-h-[320px] transition-all duration-700 overflow-hidden w-full md:flex-1 ${
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
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
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
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 h-full">
          {/* Stats cards */}
          <div className="flex-1">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 transition-all duration-700 ${
                statsRevealed
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8 pointer-events-none"
              }`}
              aria-hidden={!statsRevealed}
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
                />
              ))}
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
      <div className="relative bg-black/90 border-2 border-cyan-400/60 rounded-lg p-3 md:p-4 backdrop-blur-xl h-full flex flex-col overflow-hidden shadow-2xl shadow-cyan-500/50">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scanline" />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-magenta-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-magenta-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

        {/* Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 pb-2 border-b border-cyan-400/30 gap-2">
          <div>
            <h3
              className="text-xs sm:text-sm font-black text-cyan-400 uppercase tracking-widest"
              style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.8)" }}
            >
              ≡ DISTRIBUTION
            </h3>
            <div className="text-[9px] text-magenta-400 font-mono mt-0.5">
              SYS.ANALYTICS_v2.1
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/20 border border-cyan-400 rounded">
            <div
              className="w-1.5 h-1.5 bg-cyan-400 animate-pulse"
              style={{ boxShadow: "0 0 8px rgba(0, 255, 255, 0.8)" }}
            />
            <span className="text-[10px] font-bold text-cyan-300 font-mono">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Analytics bars */}
        <div className="space-y-2 md:space-y-3 flex-1 relative z-10">
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
        <div className="relative z-10 mt-4 pt-3 border-t border-cyan-400/30">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-cyan-500/10 border border-cyan-400/40 p-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-cyan-400/20 text-2xl font-mono">
                ≡
              </div>
              <p className="text-[8px] text-cyan-300 uppercase tracking-wider font-mono mb-1">
                AVG_RATE
              </p>
              <p
                className="text-base font-black text-cyan-400 font-mono"
                style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.8)" }}
              >
                47.5%
              </p>
            </div>
            <div className="bg-magenta-500/10 border border-magenta-400/40 p-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-magenta-400/20 text-2xl font-mono">
                ▲
              </div>
              <p className="text-[8px] text-magenta-300 uppercase tracking-wider font-mono mb-1">
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
