/**
 * HeroCamera - Version API Intégrée
 * 
 * Utilise les données réelles de l'API au lieu des données de démo
 * 
 * Dépendances API:
 * - GET /api/genres
 * - GET /api/movies?genre=:name
 * 
 * À utiliser à la place de HeroCamera.jsx si vous avez une API
 */

import React, { useState, useEffect } from 'react';

export function HeroCameraWithAPI() {
  // États
  const [selectedGenreIdx, setSelectedGenreIdx] = useState(0);
  const [isInserting, setIsInserting] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [hologramVisible, setHologramVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rotation, setRotation] = useState(0);

  // Données depuis API
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les genres au montage
  useEffect(() => {
    fetchGenres();
  }, []);

  // Récupérer genres depuis API
  const fetchGenres = async () => {
    try {
      // Adapter l'URL selon votre backend
      const response = await fetch('/api/genres');
      if (!response.ok) throw new Error('Erreur chargement genres');
      
      const data = await response.json();
      // Format attendu: [{ name, icon, color, glow }, ...]
      setGenres(data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur genres:', err);
      setError('Impossible de charger les genres');
      setLoading(false);
    }
  };

  // Récupérer films pour un genre
  const fetchMoviesByGenre = async (genreName) => {
    try {
      // Adapter selon votre API
      const query = genreName === "Tous" ? '' : `?genre=${genreName}`;
      const response = await fetch(`/api/movies${query}`);
      if (!response.ok) throw new Error('Erreur chargement films');
      
      const data = await response.json();
      // Limiter à 3 films
      setMovies(data.slice(0, 3));
    } catch (err) {
      console.error('Erreur films:', err);
      setMovies([]);
    }
  };

  // Rotation des cartes
  useEffect(() => {
    if (!isInserting && isCameraOn) {
      setRotation(selectedGenreIdx * -72);
    }
  }, [selectedGenreIdx, isInserting, isCameraOn]);

  // Clic carte SD
  const handleCardClick = (genreIdx) => {
    if (isInserting) return;

    if (genreIdx === selectedGenreIdx && isCameraOn) {
      // Réinsérer
      setIsCameraOn(false);
      setHologramVisible(false);
      setTimeout(() => insertCard(genreIdx), 300);
    } else {
      insertCard(genreIdx);
    }
  };

  // Insertion carte
  const insertCard = (genreIdx) => {
    setSelectedGenreIdx(genreIdx);
    setIsInserting(true);

    // Charger films du genre
    if (genres.length > 0) {
      fetchMoviesByGenre(genres[genreIdx].name);
    }

    setTimeout(() => {
      setIsInserting(false);
      setIsCameraOn(true);
      setHologramVisible(true);
    }, 1200);
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-cyan-400 text-center">
          <div className="text-4xl mb-4">⚙️</div>
          <p>Chargement de l'interface...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-red-400 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (genres.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-yellow-400 text-center">
          <div className="text-4xl mb-4">🎬</div>
          <p>Aucun genre disponible</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-violet-950/10 to-black">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Contenu */}
      <div className="relative z-10 h-screen w-full flex flex-col items-center justify-center px-4">
        
        {/* Titre */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent mb-4">
            Découvrez les films
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Sélectionnez un genre et explorez les créations de notre festival
          </p>
        </div>

        {/* Scène 3D Principal */}
        <div className="relative w-full h-96 flex items-center justify-center" style={{ perspective: '1200px' }}>
          
          {/* Carrousel 3D des cartes SD */}
          <div
            className="absolute"
            style={{
              width: '500px',
              height: '300px',
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              transition: isInserting ? 'none' : 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {genres.map((genre, idx) => {
              const angle = idx * 72;
              return (
                <div
                  key={idx}
                  className={`absolute cursor-pointer transition-all duration-300 ${
                    isInserting && idx === selectedGenreIdx ? 'camera-insert' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${angle}deg) translateZ(220px)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-60px',
                    marginTop: '-80px',
                  }}
                  onClick={() => handleCardClick(idx)}
                >
                  {/* Carte SD */}
                  <div
                    className={`relative w-32 h-40 rounded-2xl cursor-pointer transition-all duration-300 transform ${
                      selectedGenreIdx === idx && !isInserting
                        ? 'ring-4 ring-cyan-400 shadow-2xl shadow-cyan-500/70 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, #111827 0%, #0f172a 100%)`,
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Haut couleur */}
                    <div
                      className={`w-full h-6 rounded-t-xl opacity-90`}
                      style={{
                        background: `linear-gradient(90deg, ${genre.color})`,
                      }}
                    />

                    {/* Contenu */}
                    <div className="flex-1 flex flex-col items-center justify-center h-32 px-3 gap-2">
                      <span className="text-4xl drop-shadow-lg">{genre.icon}</span>
                      <span className="text-sm font-bold text-white text-center uppercase tracking-wider drop-shadow-lg">
                        {genre.name}
                      </span>
                    </div>

                    {/* Bas */}
                    <div
                      className="w-full h-1 rounded-b-xl opacity-60"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${genre.glow}, transparent)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Caméra au centre */}
          <div className="absolute z-20 flex items-center justify-center" style={{ perspective: '1500px' }}>
            <div className="relative">
              {/* Boîtier caméra */}
              <div className="relative w-64 h-48 rounded-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-black border-4 border-gray-600 shadow-2xl">
                
                {/* LED indicatrice */}
                <div className="absolute top-4 right-6 w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/80 animate-pulse" />

                {/* Détails texturés */}
                <div className="absolute inset-0 rounded-3xl p-4">
                  {/* Grille ventilation top */}
                  <div className="absolute top-3 left-4 right-4 flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-1 h-3 bg-gray-600 rounded-sm" />
                    ))}
                  </div>

                  {/* Détail boutton éject */}
                  <div className="absolute top-6 right-4 w-6 h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-sm shadow-md" />
                </div>

                {/* Écran principal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-32 rounded-2xl bg-black border-2 border-gray-700 shadow-inner overflow-hidden">
                  {isCameraOn ? (
                    // Écran actif avec hologramme
                    <div className="w-full h-full bg-gradient-to-b from-black via-cyan-950/40 to-black flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2 drop-shadow-lg">🎬</div>
                        <div className="text-xs text-cyan-400 font-bold">STREAMING</div>
                        <div className="text-[10px] text-cyan-300 mt-1">HOLOGRAM MODE</div>
                      </div>
                    </div>
                  ) : (
                    // Écran noir
                    <div className="w-full h-full bg-black" />
                  )}
                </div>

                {/* Objectif/Lentille */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-gray-600 via-gray-800 to-black border-3 border-gray-500 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-black flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black/80 border border-blue-500/30" />
                  </div>
                </div>

                {/* Fente d'insertion SD */}
                <div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-sm border-2 border-gray-700 transition-all duration-300 z-40 ${
                    isInserting ? 'slot-glow' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hologramme projeté vers le bas */}
        {hologramVisible && movies.length > 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 z-30 hologram-appear">
            {/* Cône de projection */}
            <div className="relative w-full">
              {/* Scan effect */}
              <div className="absolute inset-0 h-1 bg-gradient-to-b from-cyan-400 via-transparent to-transparent opacity-60 scan-line pointer-events-none" />

              {/* Cartes miniatures */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-3xl backdrop-blur-sm border border-cyan-400/30 w-fit mx-auto">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="group hologram-card cursor-pointer"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    {/* Miniature film */}
                    <div className="relative w-32 h-24 rounded-xl overflow-hidden border border-cyan-400/50 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/60 transition-all duration-300">
                      <img
                        src={movie.thumbnail_url || movie.thumbnail}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                      {/* Bouton play */}
                      <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </button>

                      {/* Info */}
                      <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-gradient-to-t from-black to-transparent">
                        <h4 className="text-xs font-bold text-cyan-300 line-clamp-1 hologram-title">
                          {movie.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Label */}
              <div className="text-center mt-4 text-cyan-400 font-semibold text-sm">
                ✨ {genres[selectedGenreIdx]?.name}
              </div>
            </div>
          </div>
        )}

        {/* Contrôles cartes visibles */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-8 items-center text-white/60 text-sm">
          <span>← Swipe →</span>
        </div>
      </div>

      {/* Modal vidéo */}
      {selectedMovie && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-cyan-500/50 shadow-2xl shadow-cyan-500/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center text-white transition-all duration-300"
            >
              ✕
            </button>

            {/* Vidéo */}
            <div className="relative aspect-video bg-black">
              <video
                src={selectedMovie.video_url || selectedMovie.video}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>

            {/* Infos */}
            <div className="p-6 bg-gradient-to-br from-black via-cyan-950/20 to-black">
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                {selectedMovie.title}
              </h2>
              <p className="text-white/80 mb-4">
                Réalisateur: <span className="text-cyan-300">{selectedMovie.filmmaker_name || selectedMovie.filmmaker}</span>
              </p>
              <div className="flex gap-4 text-sm text-white/70">
                <span>⏱️ {selectedMovie.duration}s</span>
                <span>🎬 {selectedMovie.genre}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
