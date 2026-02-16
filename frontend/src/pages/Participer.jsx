import { useState } from "react";
import { useTranslation } from "react-i18next";
import SubmissionStepper from "../components/participer/SubmissionStepper";
import FilmmakerStep from "../components/participer/FilmmakerStep";
import MovieStep from "../components/participer/MovieStep";
import AIDeclarationStep from "../components/participer/AIDeclarationStep";
import AssetsTagsStep from "../components/participer/AssetsTagsStep";
import CollaboratorsStep from "../components/participer/CollaboratorsStep";
import useParticiper from "../hooks/useParticiper";

export default function Participer() {
  const { t } = useTranslation();
  const [restoreMsg, setRestoreMsg] = useState(null);

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
    finished,
    handleSubmitFilmmaker,
    handleSubmitMovie,
    handleSubmitAIDeclaration,
    handleSubmitCollaborators,
    handleSubmitAssetsTags,
    // draft helpers
    hasDraft,
    loadDraft,
    clearDraft,
  } = useParticiper();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-4 space-y-2">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-primary-soft">
          {t("participate.badge")}
        </p>
        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
          {t("participate.title")}
        </h1>
        <p className="max-w-2xl text-sm text-brand-muted">
          {t("participate.subtitle")}
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

      {hasDraft && (
        <div className="mb-4 flex items-center gap-3 rounded-md border border-yellow-500/40 bg-yellow-950/10 px-3 py-2 text-sm text-yellow-300">
          <div className="flex-1 text-xs">{t("participate.draftFound")}</div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                const ok = loadDraft();
                if (ok) {
                  // quick visual confirmation
                  setRestoreMsg("ok");
                  setTimeout(() => setRestoreMsg(null), 3000);
                } else {
                  setRestoreMsg("fail");
                  setTimeout(() => setRestoreMsg(null), 3000);
                }
              }}
              className="rounded-md bg-yellow-500/80 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-yellow-400"
            >
              {t("participate.resumeDraft")}
            </button>
            <button
              type="button"
              onClick={() => clearDraft()}
              className="rounded-md border border-yellow-600/30 px-3 py-1 text-xs text-yellow-200 hover:border-yellow-400"
            >
              {t("participate.clearDraft")}
            </button>
          </div>
          {restoreMsg === "ok" && (
            <div className="ml-4 rounded bg-emerald-800/30 px-2 py-1 text-xs text-emerald-200">
              Brouillon restauré
            </div>
          )}
          {restoreMsg === "fail" && (
            <div className="ml-4 rounded bg-red-800/20 px-2 py-1 text-xs text-red-200">
              Impossible de restaurer le brouillon — videz-le puis réessayez
            </div>
          )}
        </div>
      )}

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
        <p className="mt-6 rounded-md border border-emerald-500/60 bg-emerald-950/40 px-3 py-3 text-sm text-emerald-200">
          {t("participate.finished")}
        </p>
      )}
    </div>
  );
}
