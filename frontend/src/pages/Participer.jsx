import { useState } from "react";
import FilmmakerForm from "../components/forms/FilmmakerForm";
import MovieForm from "../components/forms/MovieForm";
import AIDeclarationForm from "../components/forms/AIDeclarationForm";
import CollaboratorsForm from "../components/forms/CollaboratorsForm";

export default function Participer() {
  const [filmmaker, setFilmmaker] = useState({});
  const [movie, setMovie] = useState({});
  const [aiDeclaration, setAiDeclaration] = useState({});
  const [collaborators, setCollaborators] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { filmmaker, movie, aiDeclaration, collaborators };
    // TODO: intégrer avec l'API backend de soumission
    console.log("Soumission film", payload);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 space-y-2">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-primary-soft">
          Appel à films
        </p>
        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
          Soumettre un court-métrage généré par IA
        </h1>
        <p className="max-w-2xl text-sm text-brand-muted">
          Remplissez le formulaire ci-dessous pour proposer votre film à la
          sélection du festival marsAI.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FilmmakerForm value={filmmaker} onChange={setFilmmaker} />
        <MovieForm value={movie} onChange={setMovie} />
        <AIDeclarationForm
          value={aiDeclaration}
          onChange={setAiDeclaration}
        />
        <CollaboratorsForm
          value={collaborators}
          onChange={setCollaborators}
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-soft-md hover:bg-brand-accent"
          >
            Envoyer la soumission
          </button>
        </div>
      </form>
    </div>
  );
}

