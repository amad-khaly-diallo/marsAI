import React from "react";
import { SmallLabel, InfoRow, LinkButton } from "../ui";
import { NAV_ROUTES } from "../../constants/homeConstants";
import { useTranslation } from "react-i18next";
import { heroAnimationStyles } from "../sections/heroAnimations";

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <style>{heroAnimationStyles}</style>
      {/* Vidéo */}
      <video
        className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-110 saturate-115"
        src="/video/video4.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        fetchPriority="high"
        aria-label="Vidéo de présentation du festival"
      />

      {/* Overlay cinéma */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/25" />

      {/* Contenu centré */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <SmallLabel>{t("home.hero.label")}</SmallLabel>

        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          {t("home.hero.title")}{" "}
          <span className="text-white/90">en une minute.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
          {t("home.hero.subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <LinkButton to={NAV_ROUTES.PROGRAM} variant="primary">
            Voir la programmation
          </LinkButton>
          <LinkButton to={NAV_ROUTES.ABOUT} variant="secondary">
            Lire le manifeste
          </LinkButton>
        </div>

        <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 animate-fadeIn">
          <InfoRow k="Format" v="≈ 60 sec" />
          <InfoRow k="Accès" v="Ouvert" />
          <InfoRow k="Ville" v="Marseille" />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/60 animate-bounce">
          ↓ Découvrir
        </div>
      </div>
    </section>
  );
}
