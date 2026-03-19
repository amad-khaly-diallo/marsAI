import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageBackground } from '../components/home';
import {
  Phase1Hero,
  FestivalDescription,
  Phase1Chronology,
  Phase1Map,
  NewsletterSection,
} from '../components/home/Phase1';
import {
  CTASection,
  HeroCamera,
  StatsSection as ProjectorStatsSection,
  ManifestoSection,
  ProgramSection,
} from '../components/home/Phase2';
import { Phase3Winners, PostFestivalPresentation } from '../components/home/Phase3';
import { HOME_STYLES } from '../constants/homeStyles';
import { CookieBanner } from '../components/ui/CookieBanner';
import { heroAnimationStyles } from '../components/sections/heroAnimations';
import api from '../services/api';
import { useFestivalPhase } from '../hooks/useFestivalPhase';
import { getHomePhase1, getHomePhase2, getHomePhase3 } from '../services/query';
import { getLocalized } from '../utils/sanity';
import { FestivalCountdown } from '../components/sections/FestivalCountdown';
import { useFestivalCountdown } from '../hooks/useFestivalCountdown';

/**
 * Page d'accueil – 3 phases :
 * Phase 1 : Hero vidéo + description festival + newsletter
 * Phase 2 : HeroCamera (films sélectionnés), stats, manifeste, CTA
 * Phase 3 : Grand Prix / Palmarès (winners)
 */
export default function Home() {
  const { i18n } = useTranslation();
  const [phase1, setPhase1] = useState(null);
  const [phase2, setPhase2] = useState(null);
  const [phase3, setPhase3] = useState(null);

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const [data1, data2, data3] = await Promise.all([
          getHomePhase1(),
          getHomePhase2(),
          getHomePhase3(),
        ]);
        setPhase1(data1);
        setPhase2(data2);
        setPhase3(data3);
        // console.log('Données phase 1 :', data1);
        // console.log('Données phase 2 :', data2);
        // console.log('Données phase 3 :', data3);
      } catch (error) {
        console.error('Erreur lors du chargement des phases home:', error);
      }
    };
    fetchPhases();
  }, []);

  const [searchParams] = useSearchParams();
  const phaseParam = parseInt(searchParams.get('phase'), 10);
  const fallback = [1, 2, 3].includes(phaseParam) ? phaseParam : 1;

  const { phase: apiPhase, loading: phaseLoading } = useFestivalPhase();
  const { phase: countdownPhase, remaining } = useFestivalCountdown();

  // states must be declared unconditionally at top level
  const [phase2Movies, setPhase2Movies] = useState([]);
  const [phase3Winners, setPhase3Winners] = useState([]);
  const [phase3Loading, setPhase3Loading] = useState(false);

  // determine phase after states
  const phase =
    !phaseLoading && apiPhase
      ? Number(apiPhase.replace('phase', ''))
      : fallback;
  const isFestivalEnded =
    countdownPhase === 'ended' ||
    (countdownPhase === 'phase3' &&
      typeof remaining?.totalSeconds === 'number' &&
      remaining.totalSeconds <= 0);

  // effects must be declared before any early return so hooks order remains stable
  useEffect(() => {
    if (phase !== 2) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await api.get('/movies');
        if (!cancelled) setPhase2Movies(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setPhase2Movies([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [phase]);

  const phase1Title =
    getLocalized(phase1?.heroTitle, i18n) ||
    'Un festival pour raconter fort, en une minute.';
  const phase1Subtitle =
    getLocalized(phase1?.heroSubtitle, i18n) ||
    "1 minute pour créer. 1 minute pour choquer. 1 minute pour marquer.";
  const phase1CtaLabel =
    getLocalized(phase1?.heroCtaLabel, i18n) || 'Participer au projet';
  const phase1CtaLink = phase1?.heroCtaLink || '/participer';

  const phase2Title =
    getLocalized(phase2?.heroTitle, i18n) || 'Un festival AI, en une minute.';
  const phase2Subtitle =
    getLocalized(phase2?.heroSubtitle, i18n) ||
    "Un second souffle pour le festival : plus de films, plus de participants, plus d'ambition. Découvrez les chiffres clés du festival et rejoignez l'aventure !";
  const phase2CtaLabel =
    getLocalized(phase2?.heroCtaLabel, i18n) || 'Découvrir les films';
  const phase2CtaLink = phase2?.heroCtaLink || '/catalogue';

  const phase3Prix =
    getLocalized(phase3?.prix, i18n) || 'Grand Prix';
  const phase3Title =
    getLocalized(phase3?.title, i18n) || 'MarsAI';

  useEffect(() => {
    if (phase !== 3) return;
    let cancelled = false;
    setPhase3Loading(true);
    (async () => {
      try {
        const data = await api.get('/movies/winners');
        if (!cancelled) setPhase3Winners(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setPhase3Winners([]);
      } finally {
        if (!cancelled) setPhase3Loading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [phase]);

  if (phaseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Chargement phase...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      <PageBackground />

      {/* ——— Phase 1 : Hero + Description + Newsletter ——— */}
      {phase === 1 && (
        <>
          <Phase1Hero
            videoSrc="/video/video4.mp4"
            title={phase1Title}
            subtitle={phase1Subtitle}
            ctaLabel={phase1CtaLabel}
            ctaTo={phase1CtaLink}
            timer={<FestivalCountdown />}
          />
          <FestivalDescription phase1={phase1} />
          <Phase1Chronology phase1={phase1} />
          <Phase1Map
            badge={getLocalized(phase1?.mapBadge, i18n) || 'Lieu du festival'}
            title={getLocalized(phase1?.mapTitle, i18n) || 'Où nous trouver'}
            subtitle={
              getLocalized(phase1?.mapSubtitle, i18n) ||
              'La Plateforme (ex Dock des Suds) — 4000 m² au centre de Marseille.'
            }
            captionGta={
              getLocalized(phase1?.mapCaptionGta, i18n) || 'Vue style radar'
            }
            captionReal={
              getLocalized(phase1?.mapCaptionReal, i18n) || 'Marseille, France'
            }
          />
          <NewsletterSection
            title={
              getLocalized(phase1?.newsletterTitle, i18n) || 'Restez informé'
            }
            subtitle={
              getLocalized(phase1?.newsletterSubtitle, i18n) ||
              "Inscrivez-vous pour recevoir les infos du festival : programmation, appels à films et événements."
            }
          />
        </>
      )}
      {/* ——— Phase 2 : Camera, stats, manifeste, CTA ——— */}
      {phase === 2 && (
        <>
          <Phase1Hero
            videoSrc="/video/video4.mp4"
            title={phase2Title}
            subtitle={phase2Subtitle}
            ctaLabel={phase2CtaLabel}
            ctaTo={phase2CtaLink}
            timer={<FestivalCountdown />}
          />
          <HeroCamera moviesFromApi={phase2Movies} />
          <ProjectorStatsSection phase2={phase2} />
          <CTASection />
        </>
      )}

      {/* ——— Phase 3 : Grand Prix / Palmarès ——— */}
      {phase === 3 && (
        <>
          {isFestivalEnded && <PostFestivalPresentation />}
          <Phase3Winners
            winnersFromApi={phase3Winners}
            loading={phase3Loading}
            grandPrixLabel={phase3Prix}
            festivalTitle={phase3Title}
          />
        </>
      )}

      <CookieBanner />

      <style>{HOME_STYLES}</style>
      <style>{heroAnimationStyles}</style>
    </div>
  );
}
