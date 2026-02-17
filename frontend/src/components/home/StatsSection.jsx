import React from "react";
import { StatCard, AnalyticsBar } from "./HomeComponents";
import { STATS_DATA, ANALYTICS_DATA } from "../../constants/homeConstants";
import { useAudioContext } from "../../hooks/useAudioContext";
import { useTranslation } from "react-i18next";
import { heroAnimationStyles } from "../sections/heroAnimations";

// Import des images de roulettes
import imgFilm from "../../assets/images/film.png";
import imgIa from "../../assets/images/ia.png";
import imgVisiteur from "../../assets/images/visiteur.png";
import imgPays from "../../assets/images/pays.png";
import imgTout from "../../assets/images/tout.png";

export function StatsSection() {
  const { t } = useTranslation();
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

  // (le reste de la section reste inchangé — contenu inchangé pour la copie)

  return (
    <section className="px-4 pb-12">
      <style>{heroAnimationStyles}</style>
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
            {t("home.stats.title")}
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-white/70">
            {t("home.stats.desc")}
          </p>
        </div>

        {/* Stats Container (abrégé pour la copie) */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative flex flex-col lg:flex-row gap-3 items-center lg:items-start justify-center lg:justify-start">
            <div className="flex-shrink-0 flex flex-col items-center gap-2 relative w-full lg:w-auto px-4 lg:px-0">
              {/* CameraButton simplifié pour copie */}
              <div className="relative w-24 h-24 flex items-center justify-center animate-fadeIn">
                <img
                  src={imgTout}
                  alt="roulette"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {STATS_DATA.map((s, i) => (
                  <StatCard
                    key={i}
                    {...s}
                    isLarge={i === 0}
                    revealed={statsRevealed}
                  />
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                {ANALYTICS_DATA.map((a, idx) => (
                  <AnalyticsBar key={idx} {...a} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
