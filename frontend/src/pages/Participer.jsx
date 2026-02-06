import { useState } from "react";
import FilmmakerForm from "../components/forms/FilmmakerForm";
import MovieForm from "../components/forms/MovieForm";
import AIDeclarationForm from "../components/forms/AIDeclarationForm";
import CollaboratorsForm from "../components/forms/CollaboratorsForm";
import SubmissionStepper from "../components/participer/SubmissionStepper";
import SubmitButton from "../components/ui/SubmitButton";

export default function Participer() {
  const [filmmaker, setFilmmaker] = useState({});
  const [movie, setMovie] = useState({});
  const [movieVideo, setMovieVideo] = useState(null);
  const [aiDeclaration, setAiDeclaration] = useState({});
  const [collaborators, setCollaborators] = useState([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [filmmakerId, setFilmmakerId] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [aiSaved, setAiSaved] = useState(false);
  const [collaboratorsSaved, setCollaboratorsSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitFilmmaker = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/filmmakers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filmmaker),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la création du réalisateur");
      }
      setFilmmakerId(data.id);
      setCurrentStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitMovie = async (e) => {
    e.preventDefault();
    if (!filmmakerId) return;
    setError(null);
    setSubmitting(true);
    try {
      const payload = { ...movie, filmmaker_id: filmmakerId };
      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      if (movieVideo) {
        formData.append("video", movieVideo);
      }
      const res = await fetch("/api/movies/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la création du film");
      }
      setMovieId(data.movie_id);
      setCurrentStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitAIDeclaration = async (e) => {
    e.preventDefault();
    if (!movieId) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/movies/${movieId}/ai-declaration`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiDeclaration),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'enregistrement de la déclaration IA");
      }
      setAiSaved(true);
      setCurrentStep(4);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitCollaborators = async (e) => {
    e.preventDefault();
    if (!movieId) return;
    setError(null);
    setSubmitting(true);
    try {
      if (collaborators.length > 0) {
        await Promise.all(
          collaborators.map((collab) =>
            fetch(`/api/movies/${movieId}/collaborators`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(collab),
            })
          )
        );
      }
      setCollaboratorsSaved(true);
    } catch (err) {
      setError("Erreur lors de l'enregistrement des collaborateurs");
    } finally {
      setSubmitting(false);
    }
  };

  const finished = filmmakerId && movieId && aiSaved && collaboratorsSaved;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-4 space-y-2">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-primary-soft">
          Appel à films
        </p>
        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
          Soumettre un court-métrage généré par IA
        </h1>
        <p className="max-w-2xl text-sm text-brand-muted">
          Remplissez les étapes ci-dessous. Chaque étape enregistre vos
          informations dans la base avant de passer à la suivante.
        </p>
      </header>

      <SubmissionStepper
        currentStep={currentStep}
        filmmakerId={filmmakerId}
        movieId={movieId}
        aiSaved={aiSaved}
        collaboratorsSaved={collaboratorsSaved}
      />

      {error && (
        <p className="mb-4 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
          {error}
        </p>
      )}

      {currentStep === 1 && (
        <form onSubmit={handleSubmitFilmmaker} className="space-y-4">
          <FilmmakerForm value={filmmaker} onChange={setFilmmaker} />
          <div className="flex justify-end pt-2">
            <SubmitButton loading={submitting}>
              Enregistrer le réalisateur
            </SubmitButton>
          </div>
        </form>
      )}

      {currentStep === 2 && (
        <form onSubmit={handleSubmitMovie} className="mt-4 space-y-4">
          <MovieForm
            value={movie}
            onChange={setMovie}
            onVideoChange={setMovieVideo}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-xs text-brand-muted hover:text-brand-primary-soft"
            >
              ← Retour à l&apos;étape 1
            </button>
            <SubmitButton loading={submitting}>
              Enregistrer le film
            </SubmitButton>
          </div>
        </form>
      )}

      {currentStep === 3 && (
        <form onSubmit={handleSubmitAIDeclaration} className="mt-4 space-y-4">
          <AIDeclarationForm
            value={aiDeclaration}
            onChange={setAiDeclaration}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="text-xs text-brand-muted hover:text-brand-primary-soft"
            >
              ← Retour à l&apos;étape 2
            </button>
            <SubmitButton loading={submitting}>
              Enregistrer la déclaration IA
            </SubmitButton>
          </div>
        </form>
      )}

      {currentStep === 4 && (
        <form
          onSubmit={handleSubmitCollaborators}
          className="mt-4 space-y-4"
        >
          <CollaboratorsForm
            value={collaborators}
            onChange={setCollaborators}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="text-xs text-brand-muted hover:text-brand-primary-soft"
            >
              ← Retour à l&apos;étape 3
            </button>
            <SubmitButton loading={submitting}>
              Finaliser la soumission
            </SubmitButton>
          </div>
        </form>
      )}

      {finished && (
        <p className="mt-6 rounded-md border border-emerald-500/60 bg-emerald-950/40 px-3 py-3 text-sm text-emerald-200">
          Votre film et toutes les informations associées ont été enregistrés.
          Merci pour votre soumission à marsAI !
        </p>
      )}
    </div>
  );
}

