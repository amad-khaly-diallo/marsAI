import React from "react";
import {
  ManifestoSection,
  CTASection,
  HeroCamera,
  HeroSection,
  PageBackground,
} from "../components/home";
import { StatsSection as ProjectorStatsSection } from "../components/home/StatsSection";
import { HOME_STYLES } from "../constants/homeStyles";
import { CookieBanner } from "../components/ui/CookieBanner";
import { heroAnimationStyles } from "../components/sections/heroAnimations";

/**
 * Page d'accueil du festival marsAI
 * Structure refactorisée avec sections modulaires
 */
export default function Home() {
  // Données pour les cartes de stats du hero
  const statsCards = [
    { value: "60s", label: "Format ultra-court", colorClass: "cyan" },
    { value: "100%", label: "Créé par IA", colorClass: "violet" },
    { value: "2026", label: "Première édition", colorClass: "fuchsia" },
  ];

  const ctas = [
    {
      to: "/participer",
      label: "🚀 Participer au festival",
      variant: "primary",
    },
    { to: "/catalogue", label: "📺 Voir les films", variant: "secondary" },
  ];

  return (
    <div className="relative min-h-screen text-white">
      <PageBackground />

      <HeroSection
        title={
          <>
            Des films IA qui marquent
            <br />
            <span className="text-white/80">en 60 secondes</span>
          </>
        }
        subtitle={
          <>
            Une sélection courte, percutante et cinématographique.
            <br className="hidden md:block" />
            Découvrez les films, les auteurs et l'expérience MarsAI.
          </>
        }
        ctas={ctas}
        statsCards={statsCards}
        videoSrc="/video/video4.mp4"
      />

      {/* Content Sections */}
      <HeroCamera />
      <ProjectorStatsSection />
      <ManifestoSection />
      <CTASection />

      {/* Footer */}
      <CookieBanner />

      {/* Styles */}
      <style>{HOME_STYLES}</style>
      <style>{heroAnimationStyles}</style>
    </div>
  );
}
