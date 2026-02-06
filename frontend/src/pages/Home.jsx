import React from "react";
import { Link, useLocation } from "react-router-dom";

/* ---------- Helpers ---------- */

function NavItem({ to, children }) {
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

function Divider() {
  return <div className="h-px w-full bg-white/10" />;
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

/* ---------- Page ---------- */

export default function Home() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background global (plus doux) */}
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

        {/* Overlay plus “ciné” */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/25" />

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20">
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

            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white/20"
              >
                Connexion
              </Link>
            </div>
          </div>
        </header>

        {/* Texte centré (moins “headline IA”) */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <SmallLabel>Marseille — Festival de courts (1 minute)</SmallLabel>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Un festival pour raconter fort,{" "}
            <span className="text-white/90">en une minute.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
            Projections, talks et ateliers. Une programmation courte, précise, et une direction artistique
            pensée comme une expérience — pas comme un produit.
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
          </div>

          <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <InfoRow k="Format" v="≈ 60 sec" />
            <InfoRow k="Accès" v="Ouvert" />
            <InfoRow k="Ville" v="Marseille" />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/60">
            ↓ Découvrir
          </div>
        </div>
      </section>

      {/* SECTION éditoriale (moins “features IA”) */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="text-xs font-semibold text-white/60">Manifeste</div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                La technologie n’est pas le sujet. <span className="text-white/80">L’intention l’est.</span>
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/70 md:text-base">
                marsAI met en avant la réalisation, l’écriture, le montage et la direction artistique.
                L’IA peut faire partie du processus — mais ce qui compte, c’est la forme finale : une idée
                lisible, une image tenue, un son travaillé.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/a-propos"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold hover:bg-white/20"
                >
                  À propos
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full px-6 py-3 text-sm font-extrabold text-white/70 hover:text-white"
                >
                  Contact →
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_18px_60px_rgba(0,0,0,.18)] backdrop-blur-xl">
              <div className="text-xs font-semibold text-white/60">En bref</div>
              <div className="mt-4 grid gap-3">
                <InfoRow k="Projections" v="Sélection courte" />
                <InfoRow k="Talks" v="Intervenants & retours" />
                <InfoRow k="Ateliers" v="Workshops" />
                <InfoRow k="Ambiance" v="Éditorial / ciné" />
              </div>

              <Divider />

              <div className="mt-5 text-sm text-white/70">
                Une expérience pensée comme un rendez-vous culturel — pas un produit tech.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMME (sobriété) */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-white/60">Programme</div>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
                Projections • Talks • Ateliers
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
                Une structure simple : regarder, comprendre, expérimenter.
              </p>
            </div>
            <Link
              to="/programme"
              className="hidden md:inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-extrabold hover:bg-white/20"
            >
              Voir le programme →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <div className="text-sm font-extrabold">Projections</div>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Courts au format 1 minute. Un rythme, une idée, une tenue visuelle.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <div className="text-sm font-extrabold">Talks</div>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Créateurs, producteurs, retours d’expérience et discussions.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <div className="text-sm font-extrabold">Ateliers</div>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Expérimentation : écriture, montage, direction artistique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marseille + mini map */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-7 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur">
              <div className="text-xs font-semibold text-white/60">Lieu</div>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
                Marseille, comme décor et énergie
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Une ville qui inspire des récits forts : lumière, contrastes, énergie. L’événement s’ancre
                ici — et invite à regarder autrement.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold hover:bg-white/20"
                >
                  Infos pratiques
                </Link>
                <Link
                  to="/a-propos"
                  className="rounded-full px-6 py-3 text-sm font-extrabold text-white/70 hover:text-white"
                >
                  En savoir plus →
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-3 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur">
              <div className="overflow-hidden rounded-[26px] border border-white/10 bg-black/20">
                <iframe
                  title="Carte Marseille"
                  className="h-[360px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=5.305%2C43.266%2C5.430%2C43.335&layer=mapnik&marker=43.2965%2C5.3698"
                />
              </div>
              <div className="px-4 py-4">
                <div className="text-sm font-extrabold">Marseille</div>
                <div className="mt-1 text-sm text-white/65">
                  Tu pourras remplacer le point par l’adresse exacte plus tard.
                </div>
              </div>
            </div>
          </div>

          {/* CTA final discret */}
          <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur">
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <div className="text-xl font-extrabold">Prêt à découvrir marsAI ?</div>
                <div className="mt-1 text-sm text-white/70">
                  La programmation arrive — reste proche.
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:justify-end">
                <Link
                  to="/programme"
                  className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-black hover:bg-white/90"
                >
                  Voir la programmation
                </Link>
                <Link
                  to="/login"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold hover:bg-white/20"
                >
                  Connexion
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
