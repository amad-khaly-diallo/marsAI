import {
  MapPin,
  MessageCircle,
  Users,
  GraduationCap,
  Music,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLocalized } from '../../../utils/sanity';

/**
 * Phase 1 – Description du festival.
 * Texte piloté par le document homePhase1 (Sanity).
 */
export default function FestivalDescription({ phase1 }) {
  const { i18n } = useTranslation();

  const festivalBadge =
    getLocalized(phase1?.festivalBadge, i18n) || 'Présentation';
  const festivalTitle =
    getLocalized(phase1?.festivalTitle, i18n) || 'Le festival';
  const festivalIntro =
    getLocalized(phase1?.festivalIntro, i18n) ||
    "MarsAI réunit créateurs et public autour du film court généré ou co-créé avec l'IA. Première édition à Marseille en 2026 à La Plateforme — un rendez-vous unique pour découvrir et récompenser la création audiovisuelle assistée par l'intelligence artificielle.";

  const selectionTitle =
    getLocalized(phase1?.selectionTitle, i18n) || 'Format de la sélection';
  const selectionItems = phase1?.selectionItems || [];

  const venueTitle = getLocalized(phase1?.venueTitle, i18n) || 'Le lieu';
  const venueName = getLocalized(phase1?.venueName, i18n) || 'La Plateforme';
  const venueExName =
    getLocalized(phase1?.venueExName, i18n) || 'ex Dock des Suds';
  const venuePoints = phase1?.venuePoints || [];

  const conferencesTitle =
    getLocalized(phase1?.conferencesTitle, i18n) ||
    'Deux journées de conférences gratuites';
  const conferencesSubtitle =
    getLocalized(phase1?.conferencesSubtitle, i18n) ||
    "De débats engagés, de confrontations d'idées, d'interrogations stimulantes.";
  const conferencesAudienceLabel =
    getLocalized(phase1?.conferencesAudienceLabel, i18n) || 'Publics ciblés';
  const conferencesAudiences = phase1?.conferencesAudiences || [];

  const alsoTitle = getLocalized(phase1?.alsoTitle, i18n) || '… Mais aussi';
  const alsoItems = phase1?.alsoItems || [];

  const nightIntroLabel =
    getLocalized(phase1?.nightIntroLabel, i18n) || '… Et enfin !';
  const nightTitle = getLocalized(phase1?.nightTitle, i18n) || 'marsAI Night';
  const nightTagline =
    getLocalized(phase1?.nightTagline, i18n) ||
    'Fête Électro mêlant IA et futurs souhaitables';
  const nightType =
    getLocalized(phase1?.nightType, i18n) || 'Grande cérémonie de clôture';
  const nightDate = getLocalized(phase1?.nightDate, i18n) || 'Samedi 13 Juin';
  const nightTime = getLocalized(phase1?.nightTime, i18n) || 'à partir de 19h';

  return (
    <section className="relative py-16 md:py-24 px-4" id="le-festival">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Intro */}
        <div>
          <div className="inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1.5 mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
              {festivalBadge}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {festivalTitle}
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
            {festivalIntro}
          </p>
        </div>

        {/* Format de la sélection */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-tight">
            {selectionTitle}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectionItems.map((item, index) => (
              <li
                key={item._key || index}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/20 text-brand-primary">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <p className="text-slate-200 text-sm md:text-base pt-1.5">
                  {getLocalized(item?.text, i18n)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Le lieu - La Plateforme */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-tight">
            {venueTitle}
          </h3>
          <p className="text-brand-primary font-semibold text-lg md:text-xl">
            {venueName}{' '}
            <span className="text-slate-400 font-normal">({venueExName})</span>
          </p>
          <ul className="mt-4 space-y-2 text-slate-300 text-sm md:text-base">
            {venuePoints.map((point, i) => (
              <li key={i} className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-brand-primary/80" />
                <span>{getLocalized(point, i18n)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Conférences + Publics ciblés */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {conferencesTitle}
          </h3>
          <p className="text-slate-400 italic text-sm md:text-base mb-6">
            {conferencesSubtitle}
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-3">
            {conferencesAudienceLabel}
          </p>
          <ul className="flex flex-wrap gap-2">
            {conferencesAudiences.map((audience, index) => (
              <li key={audience?._key || index}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                  <Users className="h-3.5 w-3.5 text-brand-primary" />
                  {getLocalized(audience, i18n)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mais aussi */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
            {alsoTitle}
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {alsoItems.map((item, index) => (
              <div
                key={item?._key || index}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/20 text-brand-primary mb-3">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-white mb-1">
                  {getLocalized(item?.title, i18n)}
                </h4>
                <p className="text-sm text-slate-400 leading-snug">
                  {getLocalized(item?.detail, i18n)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* marsAI Night */}
        <div className="rounded-2xl border-2 border-brand-primary/40 bg-gradient-to-br from-brand-primary/10 to-transparent p-6 md:p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-primary mb-2">
            {nightIntroLabel}
          </p>
          <h3 className="text-2xl md:text-4xl font-black text-white mb-2">
            {nightTitle}
          </h3>
          <p className="text-slate-300 text-sm md:text-base mb-1">
            {nightTagline}
          </p>
          <p className="text-white font-semibold mb-3">{nightType}</p>
          <p className="text-brand-primary font-bold text-lg">
            {nightDate} — {nightTime}
          </p>
          <div className="mt-4 flex justify-center">
            <Music className="h-8 w-8 text-brand-primary/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
