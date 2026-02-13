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
}) {
  const [count, ref] = useCountUp(value, 4000, true, revealed);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient.bg} border ${gradient.border} flex items-center justify-center`}
        >
          <svg
            className={`w-5 h-5 ${gradient.text}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {icon}
          </svg>
        </div>
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
      <div ref={ref}>
        <div
          className={`text-3xl font-black text-transparent bg-clip-text ${gradient.textGradient}`}
        >
          {prefix}
          {count.toLocaleString("fr-FR")}
        </div>
        <p className="text-xs text-white/60 mt-1">{subtitle}</p>
      </div>
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
