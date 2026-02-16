import React from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../components/sections/HeroSection";
import { WinnersSection } from "../components/sections/WinnersSection";
import { ManifestoSection } from "../components/sections/ManifestoSection";
import { ProgramSection } from "../components/sections/ProgramSection";
import VideoSelectionSection from "../components/sections/VideoSelectionSectionNew";
import { LocationSection } from "../components/sections/LocationSection";
import { StatsSection } from "../components/sections/StatsSection";
import { CTASection } from "../components/sections/CTASection";
import HeroCamera from "../components/sections/HeroCamera";
import { HOME_STYLES } from "../constants/homeStyles";
import { CookieBanner } from "../components/home/CookieBanner";

function SmallLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white/85 backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-white/70" />
      {children}
    </span>
  );
}

function InfoRow({ k, v }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
      <div className="text-xs font-semibold text-white/60">{k}</div>
      <div className="text-sm font-extrabold text-white">{v}</div>
    </div>
  );
}

/** * Page d'accueil du festival marsAI
 * Structure refactorisée avec sections modulaires et composants réutilisables
 */
export default function Home() {
  return (
    <div className="relative min-h-screen text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>
      {/* Sections */}
      {/* HERO fullscreen avec vidéo d'annonce */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Vidéo d'annonce */}
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

        {/* Overlay amélioré */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

        {/* Contenu centré avec animations */}
        <div className="relative z-10 flex h-full flex-col items-center mt-10 justify-center px-6 text-center">
          <div className="animate-fadeInUp">
            <SmallLabel>
              🎬 Marseille — Festival de courts-métrages IA
            </SmallLabel>
          </div>

          <h1
            className="mt-8 max-w-5xl text-5xl font-black leading-[1.1] tracking-tight md:text-7xl lg:text-8xl animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            Raconter{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              l'impossible
            </span>
            <br />
            <span className="text-white/80">en 60 secondes</span>
          </h1>

          <p
            className="mt-7 max-w-2xl text-base leading-8 text-white/85 md:text-lg animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Le premier festival dédié aux courts-métrages créés par intelligence
            artificielle.
            <br className="hidden md:block" />
            Une nouvelle ère de la création cinématographique commence ici.
          </p>

          <div
            className="mt-10 flex flex-wrap justify-center gap-4 animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/participer"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-8 py-4 text-base font-black text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
              aria-label="Participer au festival"
            >
              <span className="relative z-10">🚀 Participer au festival</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            <Link
              to="/catalogue"
              className="rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 text-base font-black backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/10 hover:border-white/50"
              aria-label="Découvrir les films"
            >
              📺 Voir les films
            </Link>
          </div>

          <div
            className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 animate-fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="group rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 px-6 py-5 backdrop-blur-lg transition-all hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <div className="text-3xl font-black text-cyan-400">60s</div>
              <div className="mt-1 text-sm font-semibold text-white/70">
                Format ultra-court
              </div>
            </div>
            <div className="group rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 px-6 py-5 backdrop-blur-lg transition-all hover:border-violet-400/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <div className="text-3xl font-black text-violet-400">100%</div>
              <div className="mt-1 text-sm font-semibold text-white/70">
                Créé par IA
              </div>
            </div>
            <div className="group rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 px-6 py-5 backdrop-blur-lg transition-all hover:border-fuchsia-400/40 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]">
              <div className="text-3xl font-black text-fuchsia-400">2026</div>
              <div className="mt-1 text-sm font-semibold text-white/70">
                Première édition
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <div className="text-xs font-bold uppercase tracking-wider text-white/50">
              Découvrir
            </div>
            <svg
              className="w-6 h-6 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>
      {/* Ordre optimisé des sections pour meilleur flow utilisateur */}
      {/* 1. Vision et mission du festival */}
      <ManifestoSection />
      {/* 2. Preuves sociales et statistiques */}
      <StatsSection />
      {/* 3. Catalogue interactif - Expérience immersive */}
      <HeroCamera />
      {/* 4. Programme détaillé */}
      <ProgramSection />
      {/* 5. Localisation */}
      <LocationSection />
      {/* 6. Appel à l'action final */}
      <CTASection />
      <CookieBanner /> {/* Affichage du bandeau de cookies */}
      <style>{HOME_STYLES}</style>
      <style>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
