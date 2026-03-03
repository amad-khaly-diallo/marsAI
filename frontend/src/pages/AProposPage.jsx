import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SmallLabel, InfoRow, Divider } from '../components/ui';
import { getAboutPage } from '../services/query';

export default function AProposPage() {
  const { t, i18n } = useTranslation();
  const [pageData, setPageData] = useState(null);

  const getLocalized = (field) => {
    if (!field) return null;
    const lang = (i18n.language || 'fr').startsWith('en') ? 'en' : 'fr';
    return field[lang] || field.fr || field.en || null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAboutPage();
        setPageData(data);
        // console.log('About page data:', data);
      } catch (error) {
        console.error('Erreur chargement page À propos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      <CinematicBackground />

      {/* HERO ABOUT */}
      <section className="px-6 pt-32 pb-12">
        <div className="mx-auto max-w-6xl">
          <GlassCard className="rounded-[36px] p-8 md:p-10">
            <SmallLabel>
              {getLocalized(pageData?.heroBadge) || t('about.badge')}
            </SmallLabel>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">
              {getLocalized(pageData?.heroTitlePart1) ||
                t('about.heroTitle.part1')}{' '}
              <span className="text-white/85">
                {getLocalized(pageData?.heroTitleHighlight) ||
                  t('about.heroTitle.highlight')}
              </span>
              {getLocalized(pageData?.heroTitlePart2) ||
                t('about.heroTitle.part2')}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
              {getLocalized(pageData?.heroParagraph) ||
                t('about.hero.paragraph')}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <InfoRow
                label={
                  getLocalized(pageData?.heroInfoFormatLabel) || 'Format'
                }
                value={
                  getLocalized(pageData?.heroInfoFormatValue) || '≈ 60 sec'
                }
              />
              <InfoRow
                label={
                  getLocalized(pageData?.heroInfoAccessLabel) || 'Accès'
                }
                value={
                  getLocalized(pageData?.heroInfoAccessValue) || 'Ouvert'
                }
              />
              <InfoRow
                label={getLocalized(pageData?.heroInfoCityLabel) || 'Ville'}
                value={
                  getLocalized(pageData?.heroInfoCityValue) || 'Marseille'
                }
              />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <ActionButton
                  to={pageData?.heroCtaProgramLink || '/programme'}
                  label={
                    getLocalized(pageData?.heroCtaProgramLabel) ||
                    t('about.hero.cta.program')
                  }
                variant="primary"
              />
              <ActionButton
                  to={pageData?.heroCtaContactLink || '/contact'}
                  label={
                    getLocalized(pageData?.heroCtaContactLabel) ||
                    t('about.hero.cta.contact')
                  }
                variant="secondary"
              />
            </div>
          </GlassCard>
          <div className="h-10" />
        </div>
      </section>

      {/* MANIFESTE / INTENTION */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <GlassCard className="p-7">
              <div className="text-xs font-semibold text-white/60">
                {getLocalized(pageData?.manifestoLabel) ||
                  t('about.manifesto.label')}
              </div>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
                {getLocalized(pageData?.manifestoTitlePart1) ||
                  t('about.manifesto.title.part1')}{' '}
                <span className="text-white/80">
                  {getLocalized(pageData?.manifestoTitleHighlight) ||
                    t('about.manifesto.title.highlight')}
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                {getLocalized(pageData?.manifestoBody) ||
                  t('about.manifesto.body')}
              </p>

              <Divider />

              <div className="mt-5 grid gap-3">
                {(pageData?.manifestoInfoRows || []).map((row, index) => (
                  <InfoRow
                    key={row._key || index}
                    label={getLocalized(row?.label)}
                    value={getLocalized(row?.value)}
                  />
                ))}
              </div>
            </GlassCard>

            <div className="grid gap-6">
              {(pageData?.manifestoCards || []).map((card, index) => (
                <ContentCard
                  key={card._key || index}
                  title={getLocalized(card?.title)}
                  text={getLocalized(card?.text)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARSEILLE + MAP */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <GlassCard className="p-7">
              <div className="text-xs font-semibold text-white/60">
                {getLocalized(pageData?.locationLabel) ||
                  t('about.location.label')}
              </div>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
                {getLocalized(pageData?.locationTitle) ||
                  t('about.location.title')}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                {getLocalized(pageData?.locationBody) ||
                  t('about.location.body')}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <ActionButton
                  to={pageData?.locationCtaInfoLink || '/contact'}
                  label={
                    getLocalized(pageData?.locationCtaInfoLabel) ||
                    t('about.location.cta.info')
                  }
                  variant="secondary"
                />
                <ActionButton
                  to={pageData?.locationCtaProgramLink || '/programme'}
                  label={
                    getLocalized(pageData?.locationCtaProgramLabel) ||
                    t('about.location.cta.program')
                  }
                  variant="text"
                />
              </div>
            </GlassCard>

            <GlassCard className="p-3">
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
                <div className="text-sm font-extrabold">
                  {getLocalized(pageData?.locationMapTitle) || 'Marseille'}
                </div>
                <div className="mt-1 text-sm text-white/65">
                  {getLocalized(pageData?.locationMapAddress) ||
                    "La Plateforme, 8 Rue d'Hozier, 13002 Marseille"}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

    </div>
  );
}

/* =========================================
   COMPOSANTS INTERNES RÉUTILISABLES
========================================= */

const CinematicBackground = () => (
  <>
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
    <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
      <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
      <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
    </div>
  </>
);

const GlassCard = ({ children, className = '' }) => (
  <div
    className={`rounded-[32px] border border-white/10 bg-white/[0.05] shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur ${className}`}
  >
    {children}
  </div>
);

const ContentCard = ({ title, text }) => (
  <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur transition hover:border-white/20">
    <div className="text-sm font-extrabold text-white">{title}</div>
    <p className="mt-2 text-sm leading-7 text-white/70">{text}</p>
  </div>
);

const ActionButton = ({ to, label, variant = 'primary' }) => {
  const baseStyles =
    'rounded-full px-6 py-3 text-sm font-extrabold transition-colors';

  const variants = {
    primary: 'bg-white text-black hover:bg-white/90 border border-transparent',
    secondary:
      'border border-white/20 bg-white/10 text-white hover:bg-white/20',
    text: 'text-white/70 hover:text-white px-4',
  };

  return (
    <Link to={to} className={`${baseStyles} ${variants[variant]}`}>
      {label}
    </Link>
  );
};
