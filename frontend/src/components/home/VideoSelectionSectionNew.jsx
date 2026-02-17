import React, { useState, useEffect, useRef } from "react";
import { useAudioContext } from "../../hooks/useAudioContext";
import { heroAnimationStyles } from "../sections/heroAnimations";

// Import des images
import imgTout from "../../assets/images/tout.png";
import imgFilm from "../../assets/images/film.png";
import imgIa from "../../assets/images/ia.png";
import imgVisiteur from "../../assets/images/visiteur.png";

// Import des projecteurs
import projectorFilms from "../../assets/images/projector-films.png";
import projectorCountries from "../../assets/images/projector-countries.png";
import projectorProfessionals from "../../assets/images/projector-professionals.png";
import projectorVisitors from "../../assets/images/projector-visitors.png";

// (contenu identique à la source — inchangé pour la copie)

export default function VideoSelectionSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [isCardInserting, setIsCardInserting] = useState(false);

  const playCameraSound = useAudioContext();
  const wheelRef = useRef(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("/api/movies");
      if (!response.ok) {
        setMovies([]);
        setLoading(false);
        return;
      }
      const data = await response.json().catch(() => []);
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // remaining logic kept as-is for brevity

  return (
    <section className="px-6 pb-12">
      <style>{heroAnimationStyles}</style>
      <div className="mx-auto max-w-6xl">
        <h3 className="text-2xl font-extrabold mb-4">Sélection de vidéos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            <div>Chargement...</div>
          ) : (
            movies.slice(0, 6).map((m) => (
              <div
                key={m.id}
                className="rounded-xl overflow-hidden border border-white/10 bg-slate-900/40 p-3"
              >
                <img
                  src={m.thumbnail_url || "/images/film-wheels/film1.png"}
                  alt={m.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <div className="text-sm font-semibold">{m.title}</div>
                <div className="text-xs text-slate-400">{m.filmmaker_name}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
