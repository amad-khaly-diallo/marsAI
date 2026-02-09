import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";


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

function Card({ title, text }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur transition hover:border-white/20">
      <div className="text-sm font-extrabold text-white">{title}</div>
      <p className="mt-2 text-sm leading-7 text-white/70">{text}</p>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/10" />;
}
export default function AProposPage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen text-white">
      {/* Background cohérent avec Home */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* HERO ABOUT */}
      <section className="px-6 pt-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[36px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_25px_90px_rgba(0,0,0,.18)] backdrop-blur md:p-10">
            <SmallLabel>{t("about.badge")}</SmallLabel>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">
              {t("about.heroTitle.part1")}{" "}
              <span className="text-white/85">
                {t("about.heroTitle.highlight")}
              </span>
              {t("about.heroTitle.part2")}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
              {t("about.hero.paragraph")}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <InfoRow k="Format" v="≈ 60 sec" />
              <InfoRow k="Accès" v="Ouvert" />
              <InfoRow k="Ville" v="Marseille" />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/programme"
                className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-black hover:bg-white/90"
              >
                {t("about.hero.cta.program")}
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold hover:bg-white/20"
              >
                {t("about.hero.cta.contact")}
              </Link>
            </div>
          </div>

          <div className="h-10" />
        </div>
      </section>

      {/* MANIFESTE / INTENTION */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-7 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur">
              <div className="text-xs font-semibold text-white/60">
                {t("about.manifesto.label")}
              </div>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
                {t("about.manifesto.title.part1")}{" "}
                <span className="text-white/80">
                  {t("about.manifesto.title.highlight")}
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                {t("about.manifesto.body")}
              </p>

              <Divider />

              <div className="mt-5 grid gap-3">
                <InfoRow k="Ce qu’on regarde" v="Direction / Récit / Image / Son" />
                <InfoRow k="Durée" v="1 minute" />
                <InfoRow k="Esprit" v="Ciné • Éditorial • Moderne" />
              </div>
            </div>

            <div className="grid gap-6">
              <Card
                title="Pour qui ?"
                text="Professionnels, étudiants, passionnés. L’événement est pensé pour être accueillant, lisible, et ouvert."
              />
              <Card
                title="Sur place"
                text="Projections, talks et ateliers. Une programmation courte mais complète : regarder, comprendre, expérimenter."
              />
              <Card
                title="Ambition"
                text="Créer un rendez-vous culturel à Marseille, avec une identité forte et une expérience simple, bien produite."
              />
            </div>
          </div>
        </div>
      </section>

      {/* MARSEILLE + MAP */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-7 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur">
              <div className="text-xs font-semibold text-white/60">
                {t("about.location.label")}
              </div>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
                {t("about.location.title")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                {t("about.location.body")}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold hover:bg-white/20"
                >
                  {t("about.location.cta.info")}
                </Link>
                <Link
                  to="/programme"
                  className="rounded-full px-6 py-3 text-sm font-extrabold text-white/70 hover:text-white"
                >
                  {t("about.location.cta.program")}
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
                  Tu peux remplacer le point par l’adresse exacte plus tard.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section id="partenaires" className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur">
            <div className="text-xs font-semibold text-white/60">
              {t("about.partners.label")}
            </div>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
              {t("about.partners.title")}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
              {t("about.partners.body")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-black hover:bg-white/90"
              >
                {t("about.partners.cta.contact")}
              </Link>
              <Link
                to="/programme"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold hover:bg-white/20"
              >
                {t("about.partners.cta.program")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
