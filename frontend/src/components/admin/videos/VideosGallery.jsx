import { useEffect, useMemo, useState } from 'react';
import { SectionHeader, ErrorAlert } from '../common';
import MyMoviesGrid from '../my-movies/MyMoviesGrid';
import MyMovieModal from '../my-movies/MyMovieModal';

const PAGE_SIZE = 9;

export default function VideosGallery() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(null);
  const [savingReviewId, setSavingReviewId] = useState(null);
  const [savingFlagId, setSavingFlagId] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/films', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json().catch(() => []);
      if (!res.ok) throw new Error(data.error || 'Erreur de chargement.');
      setMovies(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((movies.length || 0) / PAGE_SIZE)),
    [movies.length],
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
      setActiveIndex(null);
    }
  }, [currentPage, totalPages]);

  const paginatedMovies = useMemo(() => {
    if (!movies.length) return [];
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return movies.slice(start, end);
  }, [movies, currentPage]);

  const handleSaveReview = async (id, payload) => {
    if (
      payload.rating !== null &&
      (Number.isNaN(payload.rating) ||
        payload.rating < 1 ||
        payload.rating > 10)
    ) {
      setError('La note doit être un nombre entre 1 et 10.');
      return;
    }
    setSavingReviewId(id);
    try {
      const res = await fetch(`/api/admin/films/${id}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error ||
            data.message ||
            "Impossible d'enregistrer votre note/commentaire.",
        );
      setMovies((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, my_rating: payload.rating, my_comment: payload.comment }
            : m,
        ),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingReviewId(null);
    }
  };

  const handleUpdateFlag = async (id, flag) => {
    setSavingFlagId(id);
    try {
      const res = await fetch(`/api/admin/films/${id}/flag`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ flag }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error ||
            data.message ||
            'Impossible de mettre à jour votre flag personnel.',
        );
      setMovies((prev) =>
        prev.map((m) => (m.id === id ? { ...m, my_flag: flag } : m)),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingFlagId(null);
    }
  };

  const currentMovie =
    activeIndex !== null &&
    activeIndex >= 0 &&
    activeIndex < paginatedMovies.length
      ? paginatedMovies[activeIndex]
      : null;

  const goNext = () => {
    if (!paginatedMovies.length) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      const next = prev + 1;
      return next >= paginatedMovies.length ? prev : next;
    });
  };

  const goPrev = () => {
    if (!paginatedMovies.length) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      const next = prev - 1;
      return next < 0 ? prev : next;
    });
  };

  return (
    <div className="space-y-4 relative">
      <SectionHeader
        title="Toutes les vidéos"
        subtitle="Liste complète des films du festival, avec pagination et possibilité de les noter."
      />
      <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
        {error && (
          <ErrorAlert
            message={error}
            className="mb-4"
          />
        )}
        {loading && (
          <div className="text-center py-8 text-sm text-brand-muted">
            Chargement...
          </div>
        )}
        {!loading && !movies.length && !error && (
          <div className="text-center py-8 text-sm text-brand-muted">
            Aucun film pour le moment.
          </div>
        )}
        {!loading && !!movies.length && (
          <>
            <MyMoviesGrid
              movies={paginatedMovies}
              onSelect={(index) => setActiveIndex(index)}
            />
            <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-brand-muted">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  setActiveIndex(null);
                }}
                className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800/80"
              >
                Précédent
              </button>
              <span>
                Page{' '}
                <span className="font-semibold text-slate-100">
                  {currentPage}
                </span>{' '}
                / {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  setActiveIndex(null);
                }}
                className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800/80"
              >
                Suivant
              </button>
            </div>
          </>
        )}
      </div>
      <MyMovieModal
        movie={currentMovie}
        isOpen={currentMovie !== null}
        onClose={() => setActiveIndex(null)}
        onNext={goNext}
        onPrev={goPrev}
        onSaveReview={handleSaveReview}
        onUpdateFlag={handleUpdateFlag}
        savingReview={savingReviewId}
        savingFlag={savingFlagId}
      />
    </div>
  );
}

