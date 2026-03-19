import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SubmissionStepper from '../components/participer/SubmissionStepper';
import FilmmakerStep from '../components/participer/FilmmakerStep';
import MovieStep from '../components/participer/MovieStep';
import AIDeclarationStep from '../components/participer/AIDeclarationStep';
import AssetsTagsStep from '../components/participer/AssetsTagsStep';
import CollaboratorsStep from '../components/participer/CollaboratorsStep';
import useParticiper from '../hooks/useParticiper';
import { getParticiperPage } from '../services/query';
import { getLocalized } from '../utils/sanity';
import { trackEvent } from '../components/G-Analytics/GoogleAnalytics';

export default function Participer() {
  const { t, i18n } = useTranslation();
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    const fetchPageData = async () => {
      const data = await getParticiperPage();
      setPageData(data);
    };
    fetchPageData();
  }, []);



  const navigate = useNavigate();

  const {
    filmmaker,
    setFilmmaker,
    movie,
    setMovie,
    movieVideo,
    setMovieVideo,
    aiDeclaration,
    setAiDeclaration,
    collaborators,
    setCollaborators,
    assets,
    setAssets,
    tags,
    setTags,
    currentStep,
    setCurrentStep,
    filmmakerId,
    movieId,
    aiSaved,
    collaboratorsSaved,
    assetsTagsSaved,
    submitting,
    error,
    movieUploadProgress,
    assetsUploadProgress,
    finished,
    handleSubmitFilmmaker,
    handleSubmitMovie,
    handleSubmitAIDeclaration,
    handleSubmitCollaborators,
    handleSubmitAssetsTags,
  } = useParticiper();

  // Quand tout est terminé, afficher un popup de succès puis rediriger vers l'accueil.
  useEffect(() => {
    if (!finished) return;
    trackEvent('submit_funnel_completed', {
      funnel_name: 'film_submission',
      final_step: currentStep,
    });
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000);
    return () => clearTimeout(timer);
  }, [finished, navigate, currentStep]);

  // Début de funnel (arrivée sur la page participer)
  useEffect(() => {
    trackEvent('submit_funnel_started', {
      funnel_name: 'film_submission',
    });
  }, []);

  // Vue d'étape de funnel
  useEffect(() => {
    trackEvent('submit_step_view', {
      funnel_name: 'film_submission',
      step_number: currentStep,
      step_name: `step_${currentStep}`,
    });
  }, [currentStep]);

  // Abandon de funnel (sortie de la page sans soumission finale)
  useEffect(() => {
    return () => {
      if (!finished) {
        trackEvent('submit_funnel_abandoned', {
          funnel_name: 'film_submission',
          last_step: currentStep,
          has_filmmaker: Boolean(filmmakerId),
          has_movie: Boolean(movieId),
        });
      }
    };
  }, [finished, currentStep, filmmakerId, movieId]);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-32 pb-20">
      <header className="mb-4 space-y-2">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-primary-soft">
          {getLocalized(pageData?.tag, i18n)}
        </p>

        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
          {getLocalized(pageData?.title, i18n)}
        </h1>

        <p className="max-w-2xl text-sm text-brand-muted">
          {getLocalized(pageData?.description, i18n)}
        </p>
      </header>

      <SubmissionStepper
        currentStep={currentStep}
        filmmakerId={filmmakerId}
        movieId={movieId}
        aiSaved={aiSaved}
        assetsTagsSaved={assetsTagsSaved}
        collaboratorsSaved={collaboratorsSaved}
      />

      {currentStep === 1 && (
        <>
          <FilmmakerStep
            value={filmmaker}
            onChange={setFilmmaker}
            onSubmit={handleSubmitFilmmaker}
            submitting={submitting}
            error={error}
          />

          {filmmakerId && (
            <div className="mt-3 rounded-md border border-emerald-500/40 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-200">
              Réalisateur enregistré
            </div>
          )}
        </>
      )}

      {currentStep === 2 && (
        <>
          <MovieStep
            value={movie}
            onChange={setMovie}
            onVideoChange={setMovieVideo}
            onBack={() => setCurrentStep(1)}
            onSubmit={handleSubmitMovie}
            submitting={submitting}
            error={error}
            uploadProgress={movieUploadProgress}
          />

          {movieId && (
            <div className="mt-3 rounded-md border border-emerald-500/40 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-200">
              Film enregistré (ID: {movieId})
            </div>
          )}
        </>
      )}

      {currentStep === 3 && (
        <>
          <AIDeclarationStep
            value={aiDeclaration}
            onChange={setAiDeclaration}
            onBack={() => setCurrentStep(2)}
            onSubmit={handleSubmitAIDeclaration}
            submitting={submitting}
            error={error}
          />

          {aiSaved && (
            <div className="mt-3 rounded-md border border-emerald-500/40 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-200">
              Déclaration IA enregistrée
            </div>
          )}
        </>
      )}

      {currentStep === 4 && (
        <>
          <AssetsTagsStep
            assets={assets}
            onAssetsChange={setAssets}
            tags={tags}
            onTagsChange={setTags}
            onBack={() => setCurrentStep(3)}
            onSubmit={handleSubmitAssetsTags}
            submitting={submitting}
            error={error}
            uploadProgress={assetsUploadProgress}
          />

          {assetsTagsSaved && (
            <div className="mt-3 rounded-md border border-emerald-500/40 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-200">
              Assets & tags enregistrés
            </div>
          )}
        </>
      )}

      {currentStep === 5 && (
        <>
          <CollaboratorsStep
            value={collaborators}
            onChange={setCollaborators}
            onBack={() => setCurrentStep(4)}
            onSubmit={handleSubmitCollaborators}
            submitting={submitting}
            error={error}
          />

          {collaboratorsSaved && (
            <div className="mt-3 rounded-md border border-emerald-500/40 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-200">
              Collaborateurs enregistrés
            </div>
          )}
        </>
      )}

      {finished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-xl border border-emerald-500/60 bg-slate-950/90 px-6 py-5 text-sm shadow-soft-lg">
            <h2 className="mb-2 text-base font-semibold text-emerald-300">
              {t('participate.successTitle')}
            </h2>
            <p className="mb-4 text-sm text-emerald-100">
              {t('participate.successMessage')}
            </p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900 shadow-soft-md hover:bg-emerald-300"
            >
              {t('participate.goHome')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
