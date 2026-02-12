import { useState } from "react";
import { useTranslation } from "react-i18next";
import FilmmakerForm from "../components/forms/FilmmakerForm";
import MovieForm from "../components/forms/MovieForm";
import AIDeclarationForm from "../components/forms/AIDeclarationForm";
import CollaboratorsForm from "../components/forms/CollaboratorsForm";
import MovieAssetsForm from "../components/forms/MovieAssetsForm";
import MovieTagsForm from "../components/forms/MovieTagsForm";
import SubmissionStepper from "../components/participer/SubmissionStepper";
import SubmitButton from "../components/ui/SubmitButton";

export default function Participer() {
  const { t } = useTranslation();
  const [filmmaker, setFilmmaker] = useState({});
  const [movie, setMovie] = useState({});
  const [movieVideo, setMovieVideo] = useState(null);
  const [aiDeclaration, setAiDeclaration] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const [assets, setAssets] = useState({
    stills: [],
    subtitle: null,
  });
  const [tags, setTags] = useState([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [filmmakerId, setFilmmakerId] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [aiSaved, setAiSaved] = useState(false);
  const [collaboratorsSaved, setCollaboratorsSaved] = useState(false);
  const [assetsTagsSaved, setAssetsTagsSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateFilmmaker = (f) => {
    if (!f.first_name || !f.first_name.trim() || !f.last_name || !f.last_name.trim()) {
      return t("error.filmmaker.namePair.required");
    }
    if (!f.birth_date) {
      return t("error.filmmaker.birthDate.required");
    }
    if (!f.email || !emailRegex.test(f.email)) {
      return t("error.filmmaker.email.invalid");
    }
    if (f.mobile && f.mobile.trim().length > 0 && !/^[0-9+().\s-]{6,20}$/.test(f.mobile)) {
      return t("error.filmmaker.mobile.invalid");
    }
    if (f.city && f.city.length > 80) {
      return t("error.filmmaker.city.tooLong");
    }
    if (f.country && f.country.length > 80) {
      return t("error.filmmaker.country.tooLong");
    }
    return null;
  };

  const validateMovie = (m) => {
    if (!m.original_title || !m.original_title.trim()) {
      return t("error.movie.originalTitle.required");
    }
    if (!m.english_title || !m.english_title.trim()) {
      return t("error.movie.englishTitle.required");
    }
    const durationNumber = Number(m.duration);
    if (!Number.isFinite(durationNumber) || durationNumber <= 0 || durationNumber > 1.5) {
      return t("error.movie.duration.range");
    }
    if (m.youtube_url && m.youtube_url.length > 0) {
      try {
        // Valide au moins que c'est une URL
        // eslint-disable-next-line no-new
        new URL(m.youtube_url);
      } catch {
        return t("error.movie.youtube.invalid");
      }
    }
    return null;
  };

  const validateAiDeclaration = (d) => {
    if (!d.artwork_type) {
      return t("error.ai.artworkType.required");
    }
    if (!d.methodology || d.methodology.trim().length < 30) {
      return t("error.ai.methodology.min");
    }
    return null;
  };

  const validateCollaborators = (list) => {
    if (!Array.isArray(list)) return null;
    for (const collab of list) {
      const hasAnyField =
        (collab.first_name && collab.first_name.trim()) ||
        (collab.last_name && collab.last_name.trim()) ||
        (collab.role && collab.role.trim()) ||
        (collab.email && collab.email.trim());
      if (!hasAnyField) {
        // Ligne vide : on la laissera simplement ne rien envoyer
        continue;
      }
      if (!collab.first_name || !collab.first_name.trim() || !collab.last_name || !collab.last_name.trim()) {
        return t("error.collaborators.name.required");
      }
      if (!collab.role || !collab.role.trim()) {
        return t("error.collaborators.role.required");
      }
      if (collab.email && collab.email.trim().length > 0 && !emailRegex.test(collab.email)) {
        return t("error.collaborators.email.invalid");
      }
    }
    return null;
  };

  const handleSubmitFilmmaker = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateFilmmaker(filmmaker);
    if (validationError) {
      setError(validationError);
      return;
    }
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

    const validationError = validateMovie(movie);
    if (validationError) {
      setError(validationError);
      return;
    }
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

    const validationError = validateAiDeclaration(aiDeclaration);
    if (validationError) {
      setError(validationError);
      return;
    }
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

    const validationError = validateCollaborators(collaborators);
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    try {
      if (!collaborators.length) {
        setCollaboratorsSaved(true);
        return;
      }

      await Promise.all(
        collaborators.map((collab) =>
          fetch(`/api/movies/${movieId}/collaborators`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(collab),
          }).then(async (res) => {
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
              throw new Error(
                data.error || "Erreur lors de l'enregistrement des collaborateurs"
              );
            }
            return data;
          })
        )
      );
      setCollaboratorsSaved(true);
    } catch (err) {
      setError(t("error.collaborators.saveFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitAssetsTags = async (e) => {
    e.preventDefault();
    if (!movieId) return;
    setError(null);
    setSubmitting(true);

    try {
      const requests = [];

      const stillFiles = Array.isArray(assets.stills) ? assets.stills : [];

      if (stillFiles.length > 0 || assets.subtitle) {
        const formData = new FormData();

        stillFiles.forEach((file) => {
          if (!file.type.startsWith("image/")) {
            throw new Error(t("error.assets.still.invalidType"));
          }
          formData.append("stills", file);
        });

        if (assets.subtitle) {
          const name = assets.subtitle.name || "";
          if (!name.toLowerCase().endsWith(".srt")) {
            throw new Error(t("error.assets.subtitle.invalidType"));
          }
          formData.append("subtitle", assets.subtitle);
        }

        requests.push(
          fetch(`/api/movies/${movieId}/assets`, {
            method: "POST",
            body: formData,
          })
        );
      }

      const cleanTags =
        (tags || []).map((t) => t.trim()).filter((t) => t.length > 0) || [];

      cleanTags.forEach((label) => {
        requests.push(
          fetch(`/api/movies/${movieId}/tags`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label }),
          })
        );
      });

      if (requests.length > 0) {
        const responses = await Promise.all(requests);
        for (const res of responses) {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(
              data.error ||
                data.message ||
                t("error.assetsTags.saveFailed")
            );
          }
        }
      }

      setAssetsTagsSaved(true);
      setCurrentStep(5);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const finished =
    filmmakerId && movieId && aiSaved && assetsTagsSaved && collaboratorsSaved;

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

      {currentStep === 1 && (
        <form onSubmit={handleSubmitFilmmaker} className="space-y-4">
          <FilmmakerForm
            value={filmmaker}
            onChange={setFilmmaker}
            hasError={!!error}
          />
          <div className="flex justify-end pt-2">
            <SubmitButton loading={submitting}>
              {t("participate.saveFilmmaker")}
            </SubmitButton>
          </div>
          {error && (
            <p className="mt-2 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}
        </form>
      )}

      {currentStep === 2 && (
        <form onSubmit={handleSubmitMovie} className="mt-4 space-y-4">
          <MovieForm
            value={movie}
            onChange={setMovie}
            onVideoChange={setMovieVideo}
            hasError={!!error}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-xs text-brand-muted hover:text-brand-primary-soft"
            >
              {t("participate.backStep", { step: 1 })}
            </button>
            <SubmitButton loading={submitting}>
              {t("participate.saveMovie")}
            </SubmitButton>
          </div>
          {error && (
            <p className="mt-2 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}
        </form>
      )}

      {currentStep === 3 && (
        <form onSubmit={handleSubmitAIDeclaration} className="mt-4 space-y-4">
          <AIDeclarationForm
            value={aiDeclaration}
            onChange={setAiDeclaration}
            hasError={!!error}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="text-xs text-brand-muted hover:text-brand-primary-soft"
            >
              {t("participate.backStep", { step: 2 })}
            </button>
            <SubmitButton loading={submitting}>
              {t("participate.saveAi")}
            </SubmitButton>
          </div>
          {error && (
            <p className="mt-2 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}
        </form>
      )}

      {currentStep === 4 && (
        <form onSubmit={handleSubmitAssetsTags} className="mt-4 space-y-4">
          <MovieAssetsForm
            value={assets}
            onChange={setAssets}
            hasError={!!error}
          />
          <MovieTagsForm
            value={tags}
            onChange={setTags}
            hasError={!!error}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="text-xs text-brand-muted hover:text-brand-primary-soft"
            >
              {t("participate.backStep", { step: 3 })}
            </button>
            <SubmitButton loading={submitting}>
              {t("participate.saveAssetsTags")}
            </SubmitButton>
          </div>
          {error && (
            <p className="mt-2 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}
        </form>
      )}

      {currentStep === 5 && (
        <form
          onSubmit={handleSubmitCollaborators}
          className="mt-4 space-y-4"
        >
          <CollaboratorsForm
            value={collaborators}
            onChange={setCollaborators}
            hasError={!!error}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="text-xs text-brand-muted hover:text-brand-primary-soft"
            >
              {t("participate.backStep", { step: 4 })}
            </button>
            <SubmitButton loading={submitting}>
              {t("participate.finalize")}
            </SubmitButton>
          </div>
          {error && (
            <p className="mt-2 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}
        </form>
      )}

      {finished && (
        <p className="mt-6 rounded-md border border-emerald-500/60 bg-emerald-950/40 px-3 py-3 text-sm text-emerald-200">
          {t("participate.finished")}
        </p>
      )}
    </div>
  );
}

