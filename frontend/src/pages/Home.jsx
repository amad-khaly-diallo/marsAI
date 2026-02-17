import React from "react";
import {
  HeroSection,
  ManifestoSection,
  ProgramSection,
  LocationSection,
  StatsSection,
  CTASection,
  HeroCamera,
} from "../components/home";
// import { HomePhase2 } from "../components/home/HomePhase2";
import { HOME_STYLES } from "../constants/homeStyles";
import { CookieBanner } from "../components/ui/CookieBanner";
import { heroAnimationStyles } from "../components/sections/heroAnimations";

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
      {/* HERO (moved to component) */}
      <HeroSection />
      {/* Ordre optimisé des sections pour meilleur flow utilisateur */}
      {/* 1. Vision et mission du festival */}
      <ManifestoSection />
      {/* 2. Preuves sociales et statistiques */}
      <StatsSection />
      {/* 3. Catalogue interactif - Expérience immersive */}
      <HeroCamera />
      {/* 4. Programme détaillé */}
      <ProgramSection />
      {/* <HomePhase2 /> Nouvelle section pour la phase 2 du festival */}
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
      <style>{heroAnimationStyles}</style>
    </div>
  );
}
