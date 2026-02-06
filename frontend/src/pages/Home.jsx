import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* ---------------- Helpers ---------------- */

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavItem({ to, children }) {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={cx(
        "rounded-full px-4 py-2 text-sm font-semibold transition",
        active
          ? "bg-white/20 text-white"
          : "text-white/80 hover:bg-white/15 hover:text-white"
      )}
    >
      {children}
    </Link>
  );
}

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

/* ---------------- Countdown ---------------- */

function getTimeLeft(targetDate) {
  const now = Date.now();
  const target = targetDate.getTime();
  const diff = Math.max(0, target - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { diff, days, hours, minutes, seconds };
}

function TimeBox({ label, value }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="min-w-[64px] rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-center">
      <div className="text-lg font-extrabold text-white">{v}</div>
      <div className="text-[11px] font-semibold text-white/60">{label}</div>
    </div>
  );
}

function Countdown({ target }) {
  const [left, setLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const t = setInterval(() => setLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  const done = left.diff <= 0;

  return (
    <div className="mt-10 w-full max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.08] px-5 py-5 backdrop-blur">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <div className="text-xs font-semibold text-white/60">
            {done ? "C’est parti !" : "Début du festival dans"}
          </div>
          <div className="mt-1 text-lg font-extrabold text-white">
            {done ? "Le festival a commencé" : "Compte à rebours"}
          </div>
        </div>

        {!done ? (
          <div className="flex items-center gap-2">
            <TimeBox label="Jours" value={left.days} />
            <TimeBox label="Heures" value={left.hours} />
            <TimeBox label="Min" value={left.minutes} />
            <TimeBox label="Sec" value={left.seconds} />
          </div>
        ) : (
          <Link
            to="/programme"
            className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-black hover:bg-white/90"
          >
            Voir la programmation →
          </Link>
        )}
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function Home() {
  // ✅ CHANGE ICI LA DATE/HEURE DU FESTIVAL
  // Exemple : 2026-03-20 18:00 (heure locale)
  const FESTIVAL_DATE = useMemo(() => new Date("2026-03-20T18:00:00"), []);

  return (
    <div className="relative min-h-screen text-white">
      {/* Background global (moins sombre, cohérent) */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* HERO fullscreen */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Vidéo */}
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-110 saturate-115"
          src="/video/video4.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/25" />

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
            <Link to="/" className="text-lg font-extrabold tracking-tight">
              mars<span className="text-white/70">AI</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 backdrop-blur">
              <NavItem to="/">Accueil</NavItem>
              <NavItem to="/a-propos">À propos</NavItem>
              <NavItem to="/programme">Films</NavItem>
              <NavItem to="/contact">Contact</NavItem>
            </nav>

            <Link
              to="/login"
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white/20"
            >
              Connexion
            </Link>
          </div>
        </header>

        {/* Hero content */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
          <SmallLabel>Marseille — Festival de courts (1 minute)</SmallLabel>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Un festival pour raconter fort,{" "}
            <span className="text-white/90">en une minute.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
            Projections, talks et ateliers. Une programmation courte, précise, pensée comme une expérience.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/programme"
              className="rounded-full bg-white px-7 py-3 text-sm font-extrabold text-black transition hover:bg-white/90"
            >
              Voir la programmation
            </Link>

            <Link
              to="/a-propos"
              className="rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-extrabold backdrop-blur transition hover:bg-white/20"
            >
              Lire le manifeste
            </Link>

            <Link
              to="/contact"
              className="rounded-full px-6 py-3 text-sm font-extrabold text-white/75 transition hover:text-white"
            >
              Contact →
            </Link>
          </div>

          <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <InfoRow k="Format" v="≈ 60 sec" />
            <InfoRow k="Accès" v="Ouvert" />
            <InfoRow k="Ville" v="Marseille" />
          </div>

          {/* ✅ FESTIVAL TIMER */}
          <Countdown target={FESTIVAL_DATE} />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/60">
            ↓ Découvrir
          </div>
        </div>
      </section>

      {/* Section dessous (pour éviter une page vide) */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur">
          <div className="text-xs font-semibold text-white/60">En bref</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
            Projections • Talks • Ateliers
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
            Une structure simple : regarder, comprendre, expérimenter.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/programme"
              className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-black hover:bg-white/90"
            >
              Voir la programmation
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold hover:bg-white/20"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
