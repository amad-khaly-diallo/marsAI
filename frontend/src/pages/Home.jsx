import React from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { ManifestoSection } from "../components/sections/ManifestoSection";
import { ProgramSection } from "../components/sections/ProgramSection";
import { LocationSection } from "../components/sections/LocationSection";
import { StatsSection } from "../components/sections/StatsSection";
import { CTASection } from "../components/sections/CTASection";
import { HOME_STYLES } from "../constants/homeStyles";

/**
 * Page d'accueil du festival marsAI
 * Structure refactorisée avec sections modulaires et composants réutilisables
 */
export default function Home() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Backgrounds globaux */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* Sections */}
      <HeroSection />
      <ManifestoSection />
      <ProgramSection />
      <LocationSection />
      <StatsSection />
      <CTASection />

      {/* Styles personnalisés */}
      <style>{HOME_STYLES}</style>
    </div>
  );
}
