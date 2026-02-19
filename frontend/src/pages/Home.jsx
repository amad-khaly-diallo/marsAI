import React from "react";
import { Link } from "react-router-dom";
import {
  ManifestoSection,
  CTASection,
  HeroCamera,
} from "../components/home";
import { StatsSection as ProjectorStatsSection } from "../components/sections/StatsSection";
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
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden pb-20">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-90 contrast-110 saturate-105"
          src="/video/video4.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          fetchPriority="high"
          aria-label="Vidéo de présentation du festival"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center mt-10 justify-center px-6 text-center">
          <h1
            className="mt-8 max-w-5xl text-5xl font-black leading-[1.1] tracking-tight md:text-7xl lg:text-8xl animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            Des films IA qui marquent  
            
            <br />
            <span className="text-white/80">en 60 secondes</span>
          </h1>

          <p
            className="mt-7 max-w-2xl text-base leading-8 text-white/85 md:text-lg animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Une sélection courte, percutante et cinématographique.
            <br className="hidden md:block" />
            Découvrez les films, les auteurs et l'expérience MarsAI.
          </p>

          {/* CTA Buttons */}
          <div
            className="mt-10 flex flex-wrap justify-center gap-4 animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            {ctas.map((cta) => (
              <Link
                key={cta.to}
                to={cta.to}
                className={
                  cta.variant === "primary"
                    ? "group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-8 py-4 text-base font-black text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                    : "rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 text-base font-black backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/10 hover:border-white/50"
                }
                aria-label={cta.label}
              >
                <span className={cta.variant === "primary" ? "relative z-10" : ""}>
                  {cta.label}
                </span>
                {cta.variant === "primary" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </Link>
            ))}
          </div>

          {/* Stats Cards */}
          <div
            className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 animate-fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            {statsCards.map((card) => (
              <div
                key={card.value}
                className={`group rounded-2xl border backdrop-blur-lg transition-all ${
                  card.colorClass === "cyan"
                    ? "border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    : card.colorClass === "violet"
                    ? "border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 hover:border-violet-400/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                    : "border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 hover:border-fuchsia-400/40 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]"
                } px-6 py-5`}
              >
                <div
                  className={`text-3xl font-black ${
                    card.colorClass === "cyan"
                      ? "text-cyan-400"
                      : card.colorClass === "violet"
                      ? "text-violet-400"
                      : "text-fuchsia-400"
                  }`}
                >
                  {card.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-white/70">
                  {card.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="mt-10 flex flex-col items-center gap-2">
            <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/70 backdrop-blur">
              Découvrir
            </div>
            <div className="h-8 w-8 rounded-full border border-white/20 bg-white/10 text-white/70 flex items-center justify-center animate-bounce">
              ↓
            </div>
          </div>
        </div>
      </section>

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
