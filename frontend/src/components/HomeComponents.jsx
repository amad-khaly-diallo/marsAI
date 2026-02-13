import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCountUp } from "../hooks/useCountUp";

/**
 * Élément de navigation actif/inactif
 */
export function NavItem({ to, children }) {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold transition",
        active
          ? "bg-white/20 text-white"
          : "text-white/80 hover:bg-white/15 hover:text-white",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

/**
 * Diviseur horizontal
 */
export function Divider() {
  return <div className="h-px w-full bg-white/10" />;
}

/**
 * Petit label avec icône pointée
 */
export function SmallLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white/85 backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-white/70" />
      {children}
    </span>
  );
}

/**
 * Ligne d'information avec clé/valeur
 */
export function InfoRow({ k, v }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
      <div className="text-xs font-semibold text-white/60">{k}</div>
      <div className="text-sm font-extrabold text-white">{v}</div>
    </div>
  );
}

/**
 * Carte de statistique avec gradient et compteur
 */
export function StatCard({
  icon,
  title,
  subtitle,
  value,
  prefix,
  gradient,
  revealed,
  isLarge = false,
  isActive = false,
  index = 0,
  total = 1,
}) {
  const [count, ref] = useCountUp(value, 4000, true, revealed);

  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/80 to-black/40 border-2 ${
      isActive ? 'border-violet-500/80 shadow-2xl shadow-violet-500/30' : 'border-white/10 shadow-lg shadow-black/50'
    } ${isLarge ? 'p-8 flex flex-col justify-center items-start' : 'p-4'} backdrop-blur-xl transition-all duration-300 h-full`}>
      {/* Barre d'accent en haut */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient} ${
        isActive ? 'shadow-2xl' : 'shadow-lg'
      }`} style={{
        boxShadow: isActive ? `0 0 16px 0 rgba(147, 51, 234, 0.6)` : `0 0 8px 0 rgba(147, 51, 234, 0.3)`
      }} />
      
      {/* Glow effect seulement sur l'élément actif */}
      {isActive && isLarge && (
        <div className={`absolute -bottom-12 -right-12 w-80 h-80 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-15 group-hover:opacity-25 transition-opacity duration-500`} />
      )}
      
      {/* Effet de brillance léger sur hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-cyan-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header avec titre et numérotation */}
        <div className={`${isLarge ? 'mb-6' : 'mb-3'} pb-2 border-b border-white/5`}>
          <div className="flex justify-between items-start mb-2">
            <div className={`${isLarge ? 'text-xl' : 'text-sm'} font-bold text-white/95 uppercase tracking-wider`}>
              {title}
            </div>
            {isLarge && (
              <div className="text-xs text-white/30 font-mono uppercase tracking-wider">
                {index + 1}/{total}
              </div>
            )}
          </div>
          <div className={`${isLarge ? 'text-base' : 'text-xs'} text-white/40 font-mono`}>
            {subtitle}
          </div>
        </div>
        
        {/* Chiffre principal avec animations */}
        <div ref={ref} className={`flex-1 flex items-center ${isLarge ? 'py-4' : 'py-2'} relative`}>
          {/* Scanlines overlay */}
          {isActive && isLarge && (
            <div className="absolute inset-0 scanline-overlay pointer-events-none" />
          )}
          
          <div className={`${isLarge ? 'text-8xl leading-tight' : 'text-5xl'} font-black bg-gradient-to-br ${gradient} bg-clip-text text-transparent tracking-tight drop-shadow-2xl ${
            revealed ? 'animate-countUp' : ''
          }`}>
            {prefix}{count.toLocaleString("fr-FR")}
          </div>
        </div>
        {/* Footer avec indicateur */}
        <div className={`${isLarge ? 'mt-8 pt-4' : 'mt-3 pt-2'} border-t border-white/5 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <div className={`${isLarge ? 'w-3 h-3' : 'w-2 h-2'} rounded-full ${
              isActive ? 'bg-gradient-to-r ' + gradient + ' shadow-lg' : 'bg-white/20'
            } ${isActive ? 'animate-pulse' : ''}`} style={{
              boxShadow: isActive ? `0 0 12px 0 rgba(147, 51, 234, 0.6)` : 'none'
            }} />
            <div className={`${isLarge ? 'text-xs' : 'text-[10px]'} text-white/40 uppercase tracking-widest font-mono`}>
              {isActive ? 'LIVE' : 'READY'}
            </div>
          </div>
          <div className={`${isLarge ? 'text-xs' : 'text-[10px]'} text-white/30 font-mono uppercase tracking-wider`}>
            {value.toLocaleString("fr-FR")}
          </div>
        </div>
      </div>
      
      {/* Grain d'écran subtil */}
      <div className="grain-overlay absolute inset-0" />
      
      {/* Grille de fond très légère */}
      <div className="absolute inset-0 opacity-3 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
    </div>
  );
}

/**
 * Section de programme (Projections, Talks, Ateliers)
 */
export function ProgramCard({ title, description }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
      <div className="text-sm font-extrabold">{title}</div>
      <p className="mt-2 text-sm leading-7 text-white/70">{description}</p>
    </div>
  );
}

/**
 * Barre d'analytique avec gradient
 */
export function AnalyticsBar({
  label,
  percentage,
  colorFrom,
  colorTo,
  textColor,
  index,
}) {
  return (
    <div className="group">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 sm:mb-1.5 gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-cyan-400 font-mono">
            [{index + 1}]
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wide font-mono">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[9px] sm:text-xs text-cyan-400 font-mono">
            ▓▓▓
          </div>
          <span
            className={`text-xs sm:text-sm font-black text-${textColor}-400 font-mono`}
            style={{ textShadow: `0 0 10px rgba(0, 255, 255, 0.5)` }}
          >
            {percentage}%
          </span>
        </div>
      </div>
      <div className="relative h-2 sm:h-2.5 bg-black/60 border border-cyan-400/30 overflow-hidden rounded">
        {/* Barre de progression avec effet néon */}
        <div
          className={`h-full bg-gradient-to-r from-${colorFrom}-500 to-${colorTo}-500 relative transition-all duration-500`}
          style={{
            width: `${percentage}%`,
            boxShadow: `0 0 15px rgba(0, 255, 255, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)`,
          }}
        >
          {/* Effet glitch */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-glitch opacity-30" />
        </div>
        {/* Segments background */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-cyan-400/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Bouton de lien personnalisé
 */
export function LinkButton({
  to,
  className = "",
  variant = "primary",
  children,
}) {
  const baseClasses =
    "rounded-full px-6 py-3 text-sm font-extrabold transition";
  const variants = {
    primary: "bg-white text-black hover:bg-white/90",
    secondary: "border border-white/20 bg-white/10 hover:bg-white/20",
    tertiary: "text-white/70 hover:text-white",
  };

  return (
    <Link
      to={to}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
