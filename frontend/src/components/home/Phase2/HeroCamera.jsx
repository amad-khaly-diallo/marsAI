import React, { useState, useEffect, useRef, useMemo } from 'react';

// Import des animations globales pour HeroCamera
import { heroAnimationStyles } from '../../sections/heroAnimations';
import { getYouTubeThumbnail, getYouTubeEmbed } from '../../../utils/youtube';
import { resolveMediaUrl } from '../../../utils/media';

// Import des images SD
import sdScifi from '../../../assets/images/sd_scifi.png';
import sdAction from '../../../assets/images/sd_action.png';
import sdDrama from '../../../assets/images/sd_drama.png';
import sdComedy from '../../../assets/images/sd_comedy.png';

// Hook pour détecter le mode mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Données des films
const DEMO_MOVIES = [
  {
    id: 1,
    title: "L'Éveil Numérique",
    filmmaker: 'Sophie Laurent',
    duration: 60,
    genre: 'Fiction',
    thumbnail: 'https://picsum.photos/seed/film1/400/600',
    video: '/video/video4.mp4',
  },
  {
    id: 2,
    title: 'Rêves de Silicone',
    filmmaker: 'Marc Dubois',
    duration: 45,
    genre: 'Fiction',
    thumbnail: 'https://picsum.photos/seed/film2/400/600',
    video: '/video/video4.mp4',
  },
  {
    id: 3,
    title: 'Connexions',
    filmmaker: 'Lisa Chen',
    duration: 55,
    genre: 'Documentaire',
    thumbnail: 'https://picsum.photos/seed/film3/400/600',
    video: '/video/video4.mp4',
  },
  {
    id: 4,
    title: 'Horizons Artificiels',
    filmmaker: 'Jean Martin',
    duration: 50,
    genre: 'Animation',
    thumbnail: 'https://picsum.photos/seed/film4/400/600',
    video: '/video/video4.mp4',
  },
  {
    id: 5,
    title: 'Nuit Digitale',
    filmmaker: 'Emma Dubois',
    duration: 58,
    genre: 'Fiction',
    thumbnail: 'https://picsum.photos/seed/film5/400/600',
    video: '/video/video4.mp4',
  },
  {
    id: 6,
    title: "Mémoires d'IA",
    filmmaker: 'Thomas Chen',
    duration: 52,
    genre: 'Documentaire',
    thumbnail: 'https://picsum.photos/seed/film6/400/600',
    video: '/video/video4.mp4',
  },
  {
    id: 7,
    title: 'Synthèse Créative',
    filmmaker: 'Marie Laurent',
    duration: 48,
    genre: 'Animation',
    thumbnail: 'https://picsum.photos/seed/film7/400/600',
    video: '/video/video4.mp4',
  },
  {
    id: 8,
    title: 'Code & Cinéma',
    filmmaker: 'Alex Martin',
    duration: 60,
    genre: 'Clip',
    thumbnail: 'https://picsum.photos/seed/film8/400/600',
    video: '/video/video4.mp4',
  },
];

const MAX_VISIBLE_MOVIES = 8;
const GRID_COLUMNS = 4;

const GENRES = [
  {
    name: 'Tous',
    icon: '⭐',
    color: 'from-violet-500 to-fuchsia-600',
    image: sdScifi,
  },
  {
    name: 'Fiction',
    icon: '🎭',
    color: 'from-cyan-500 to-violet-500',
    image: sdScifi,
  },
  {
    name: 'Documentaire',
    icon: '📹',
    color: 'from-violet-500 to-cyan-500',
    image: sdDrama,
  },
  {
    name: 'Animation',
    icon: '✨',
    color: 'from-cyan-400 to-violet-600',
    image: sdComedy,
  },
  {
    name: 'Clip',
    icon: '🎵',
    color: 'from-violet-600 to-cyan-400',
    image: sdAction,
  },
];

// Styles CSS pour les animations - Style Cyber Maîtrisé
const heroStyles = `
  @keyframes cardInsert {
    0% {
      transform: translate(var(--start-x), var(--start-y)) rotateY(var(--start-rotation)) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(0, -10px) rotateY(0deg) scale(0.15);
      opacity: 0;
    }
  }

  .card-inserting {
    animation: cardInsert 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    z-index: 9999 !important;
    pointer-events: none;
  }

  @keyframes scanlineMove {
    0% { transform: translateY(0); }
    100% { transform: translateY(300px); }
  }

  @keyframes particleRise {
    0% { 
      transform: translateY(0) translateX(var(--x-drift, 0)); 
      opacity: 0; 
    }
    20% { opacity: 0.4; }
    80% { opacity: 0.4; }
    100% { 
      transform: translateY(-120px) translateX(var(--x-drift, 0)); 
      opacity: 0; 
    }
  }

  @keyframes cardCoverflow {
    0%, 100% {
      transform: translate(var(--card-x, 0), calc(var(--card-y, 0) - 5px));
    }
    50% {
      transform: translate(var(--card-x, 0), calc(var(--card-y, 0) + 5px));
    }
  }

  .card-levitating {
    animation: cardCoverflow 2.5s ease-in-out infinite;
  }

  @keyframes holoFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes holoGlow {
    0%, 100% { 
      box-shadow: 0 0 15px rgba(34, 211, 238, 0.4), 0 0 30px rgba(139, 92, 246, 0.2);
    }
    50% { 
      box-shadow: 0 0 25px rgba(34, 211, 238, 0.6), 0 0 40px rgba(139, 92, 246, 0.3);
    }
  }

  @keyframes coneParticle {
    0% { 
      transform: translateY(0) translateX(var(--cone-x));
      opacity: 0;
    }
    20% { opacity: 0.6; }
    80% { opacity: 0.6; }
    100% { 
      transform: translateY(180px) translateX(calc(var(--cone-x) * 2.5)) scale(1.5);
      opacity: 0;
    }
  }

  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }

  @keyframes ledPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  @keyframes expand {
    0% {
      width: 0;
      opacity: 1;
    }
    50% {
      width: 100%;
      opacity: 1;
    }
    100% {
      width: 100%;
      opacity: 0;
    }
  }

  @keyframes clap {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-18deg); }
    60% { transform: rotate(0deg); }
    100% { transform: rotate(0deg); }
  }

  .animate-clap {
    animation: clap 0.6s ease-out forwards;
  }

  .clap-stripes {
    background: repeating-linear-gradient(
      135deg,
      rgba(0,0,0,0.8) 0px,
      rgba(0,0,0,0.8) 8px,
      rgba(255,255,255,0.9) 8px,
      rgba(255,255,255,0.9) 16px
    );
    opacity: 0.9;
  }

  .clap-grid {
    background-image:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 18px 18px;
    opacity: 0.35;
  }
`;

// Helper: Calculate coverflow position (kept for future use)
// eslint-disable-next-line no-unused-vars
function calculateCoverflowPosition(index, totalCards, radius = 250) {
  const angle = (360 / totalCards) * index;
  const angleRad = (angle * Math.PI) / 180;

  const x = Math.sin(angleRad) * radius;
  // eslint-disable-next-line no-unused-vars
  const z = Math.cos(angleRad) * radius;
  const rotationY = -angle;

  return { x, y: 0, rotation: rotationY, scale: 1 };
}

/** Normalise un film API (table movie) vers le format attendu par HeroCamera */
function normalizeApiMovie(m) {
  const filmmaker =
    m.filmmaker &&
    typeof m.filmmaker === 'object' &&
    (m.filmmaker.first_name !== null || m.filmmaker.last_name !== null)
      ? [m.filmmaker.first_name, m.filmmaker.last_name]
          .filter(Boolean)
          .join(' ') || '—'
      : '—';
  const thumbnail = getYouTubeThumbnail(m.youtube_url) || '';
  return {
    id: m.id,
    title: m.original_title || m.english_title || 'Sans titre',
    filmmaker,
    duration: m.duration ?? 0,
    thumbnail,
    video: null,
    youtube_url: m.youtube_url || null,
    video_url: m.video_url || null,
  };
}

export default function HeroCamera({ moviesFromApi }) {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [powerOnAnim, setPowerOnAnim] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [showClap, setShowClap] = useState(false);
  const [manuallyToggled, setManuallyToggled] = useState(false);

  const normalizedApiMovies = useMemo(() => {
    if (
      !moviesFromApi ||
      !Array.isArray(moviesFromApi) ||
      moviesFromApi.length === 0
    )
      return [];
    return moviesFromApi.map(normalizeApiMovie);
  }, [moviesFromApi]);

  // Quand la TV est allumée par défaut, choisir automatiquement un genre
  // une fois que les films API sont disponibles (ou tomber sur le 1er genre démo).
  useEffect(() => {
    if (!cameraOn) return;
    if (selectedGenre) return;
    setSelectedGenre(
      normalizedApiMovies.length > 0 ? { name: 'Tous' } : GENRES[0],
    );
  }, [cameraOn, selectedGenre, normalizedApiMovies]);

  const getGenreMovies = () => {
    if (normalizedApiMovies.length > 0) return normalizedApiMovies;
    if (!selectedGenre) return [];
    if (selectedGenre.name === 'Tous') return DEMO_MOVIES;
    return DEMO_MOVIES.filter((m) => m.genre === selectedGenre.name);
  };

  useEffect(() => {
    if (!cameraOn) {
      setSelectedGenre(null);
      setSelectedFilmIndex(0);
      setSelectedMovie(null);
    }
  }, [cameraOn]);

  useEffect(() => {
    if (!isMobile || cameraOn) return;

    setCameraOn(true);
    setSelectedGenre(
      normalizedApiMovies.length > 0 ? { name: 'Tous' } : GENRES[0],
    );
    setSelectedFilmIndex(0);
    setSelectedMovie(null);
    setPowerOnAnim(false);
    setIsBooting(false);
    setShowClap(false);
  }, [isMobile, cameraOn, normalizedApiMovies]);

  const toggleCamera = () => {
    setManuallyToggled(true);
    setCameraOn((p) => {
      const next = !p;
      if (next) {
        setSelectedGenre(
          normalizedApiMovies.length > 0 ? { name: 'Tous' } : GENRES[0],
        );
        setSelectedFilmIndex(0);
        setSelectedMovie(null);
        setPowerOnAnim(true);
        setIsBooting(true);
        setShowClap(true);
        window.setTimeout(() => {
          setPowerOnAnim(false);
          setIsBooting(false);
          setShowClap(false);
        }, 750);
      } else {
        setIsBooting(false);
      }
      return next;
    });
  };

  const nextFilm = () => {
    const movies = getGenreMovies();
    if (movies.length > 0) {
      setSelectedFilmIndex((prev) => (prev + 1) % movies.length);
    }
  };

  const prevFilm = () => {
    const movies = getGenreMovies();
    if (movies.length > 0) {
      setSelectedFilmIndex(
        (prev) => (prev - 1 + movies.length) % movies.length,
      );
    }
  };

  const navigateUp = () => {
    const movies = getGenreMovies();
    if (movies.length === 0) return;
    const nextIndex = selectedFilmIndex - GRID_COLUMNS;
    if (nextIndex >= 0) setSelectedFilmIndex(nextIndex);
  };

  const navigateDown = () => {
    const movies = getGenreMovies();
    if (movies.length === 0) return;
    const nextIndex = selectedFilmIndex + GRID_COLUMNS;
    if (nextIndex < movies.length) setSelectedFilmIndex(nextIndex);
  };

  const navigateLeft = () => {
    const movies = getGenreMovies();
    if (movies.length === 0) return;
    const prev = selectedFilmIndex - 1;
    if (prev >= 0) setSelectedFilmIndex(prev);
  };

  const navigateRight = () => {
    const movies = getGenreMovies();
    if (movies.length === 0) return;
    const next = selectedFilmIndex + 1;
    if (next < movies.length) setSelectedFilmIndex(next);
  };

  const playFilm = () => {
    const movies = getGenreMovies();
    if (movies.length > 0) setSelectedMovie(movies[selectedFilmIndex]);
  };

  const closeMovie = () => setSelectedMovie(null);

  const movies = getGenreMovies();
  const totalMovies = movies.length;
  const currentMovie =
    totalMovies && selectedFilmIndex >= 0 && selectedFilmIndex < totalMovies
      ? movies[selectedFilmIndex]
      : null;
  const currentPage =
    totalMovies > 0 ? Math.floor(selectedFilmIndex / MAX_VISIBLE_MOVIES) : 0;
  const totalPages =
    totalMovies > 0 ? Math.ceil(totalMovies / MAX_VISIBLE_MOVIES) : 0;

  useEffect(() => {
    if (!sectionRef.current || isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (manuallyToggled) {
            return;
          }

          if (entry.isIntersecting && !cameraOn) {
            setCameraOn(true);
            setSelectedGenre(
              normalizedApiMovies.length > 0 ? { name: 'Tous' } : GENRES[0],
            );
            setSelectedFilmIndex(0);
            setSelectedMovie(null);
            setPowerOnAnim(true);
            setIsBooting(true);
            setShowClap(true);
            window.setTimeout(() => {
              setPowerOnAnim(false);
              setIsBooting(false);
              setShowClap(false);
            }, 750);
          } else if (!entry.isIntersecting && cameraOn) {
            setCameraOn(false);
            setIsBooting(false);
            setSelectedGenre(null);
            setSelectedFilmIndex(0);
            setSelectedMovie(null);
          }
        });
      },
      {
        threshold: 0.35,
      },
    );

    const el = sectionRef.current;
    observer.observe(el);

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraOn, manuallyToggled, normalizedApiMovies.length]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#050510] via-[#0a0a1a] to-[#050510] py-12"
    >
      <style>{heroStyles + heroAnimationStyles}</style>

      <div className="relative flex flex-col items-center justify-center w-full px-3">
        <div
          className={`relative flex gap-0 flex-wrap justify-center w-full ${isMobile ? 'flex-col items-center' : 'items-center'}`}
        >
          {/* TV Desktop / iPhone Mobile */}
          <div
            className={`relative ${isMobile ? 'w-full flex justify-center' : ''}`}
          >
            {isMobile ? (
              /* iPhone pour mobile */
              <div
                className="relative mx-auto"
                style={{
                  width: 'clamp(280px, 84vw, 370px)',
                  height: 'clamp(560px, 118vw, 760px)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-[56px] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 border-[10px] border-slate-500"
                  style={{
                    boxShadow:
                      '0 20px 45px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.55), inset 0 0 0 5px rgba(0,0,0,0.12)',
                  }}
                >
                  {/* iPhone classique: écouteur + caméra */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
                    <div className="h-1.5 w-16 rounded-full bg-slate-700/80 border border-white/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-800 border border-white/20" />
                  </div>

                  {/* Écran iPhone */}
                  <div
                    className="relative mx-auto mt-8 h-[calc(100%-5.4rem)] w-[calc(100%-1.4rem)] rounded-[42px] overflow-hidden bg-black"
                    style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.95)' }}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/8 via-transparent to-transparent" />
                    </div>
                    {cameraOn && powerOnAnim && (
                      <div className="absolute inset-0 pointer-events-none z-20">
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 bg-white/90"
                          style={{
                            animation: 'expand 0.55s ease-out forwards',
                          }}
                        />
                        <div className="absolute inset-0 bg-white/5 animate-pulse" />
                      </div>
                    )}
                    {!cameraOn && (
                      <div className="relative w-full h-full bg-gradient-to-br from-gray-900/60 to-black flex items-center justify-center">
                        <div className="text-gray-700/30 text-4xl font-bold">
                          MARS.AI
                        </div>
                      </div>
                    )}

                    {cameraOn && isBooting && (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-black px-4">
                        {showClap ? (
                          <div className="relative w-32 h-24 scale-75">
                            <div className="absolute -inset-2 rounded-2xl bg-cyan-500/10 blur-xl" />
                            <div
                              className="absolute left-1/2 top-0 h-7 w-32 -translate-x-1/2 rounded-t-xl bg-gradient-to-r from-slate-200 to-slate-400 origin-bottom animate-clap"
                              style={{
                                boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
                              }}
                            >
                              <div className="absolute inset-0 rounded-t-xl clap-stripes" />
                            </div>
                            <div className="absolute left-1/2 top-5 h-2 w-10 -translate-x-1/2 rounded-full bg-black/70" />
                            <div
                              className="absolute inset-0 rounded-xl border border-white/15 bg-gradient-to-br from-slate-800 via-slate-900 to-black"
                              style={{
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.7)',
                              }}
                            >
                              <div className="absolute inset-0 rounded-xl clap-grid" />
                              <div className="absolute top-2 left-3 text-[9px] font-bold text-white/80 tracking-widest">
                                MARS.AI
                              </div>
                              <div className="absolute bottom-2 left-3 text-[8px] text-white/55">
                                TAKE 01
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="text-4xl font-black text-white/10 tracking-[0.3em] select-none">
                              MARS.AI
                            </div>
                            <div className="mt-3 h-1 w-40 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 opacity-70" />
                            <div className="mt-4 text-xs text-white/40">
                              Démarrage…
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {cameraOn && !isBooting && selectedMovie && (
                      <div className="w-full h-full flex flex-col p-4 bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-[#0a1628]">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1 min-w-0 mr-2">
                            <h3 className="text-lg font-bold text-white truncate">
                              {selectedMovie.title}
                            </h3>
                            <p className="text-xs text-cyan-400/70 truncate">
                              {selectedMovie.filmmaker} •{' '}
                              {selectedMovie.duration}s
                            </p>
                          </div>
                          <button
                            onClick={closeMovie}
                            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs hover:bg-white/20"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex-1 rounded-lg overflow-hidden border border-cyan-400/30 min-h-0">
                          {selectedMovie.video_url ? (
                            <video
                              className="w-full h-full bg-black object-contain"
                              src={resolveMediaUrl(selectedMovie.video_url)}
                              controls
                              autoPlay
                            />
                          ) : selectedMovie.youtube_url ? (
                            <iframe
                              src={
                                getYouTubeEmbed(selectedMovie.youtube_url) +
                                '?autoplay=1'
                              }
                              className="w-full h-full bg-black"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={selectedMovie.title}
                            />
                          ) : (
                            <video
                              className="w-full h-full bg-black object-contain"
                              src={selectedMovie.video}
                              controls
                              autoPlay
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {cameraOn &&
                      !isBooting &&
                      selectedGenre &&
                      !selectedMovie && (
                        <div className="w-full h-full flex flex-col p-4 bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-[#0a1628] overflow-y-auto">
                          <div className="flex items-center justify-between mb-3 flex-shrink-0">
                            <div>
                              <h2 className="text-xl font-bold text-white">
                                MarsAI
                              </h2>
                              <p className="text-[10px] text-cyan-400/60">
                                Festival IA
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400">Sélection</p>
                            </div>
                          </div>

                          {(() => {
                            const visibleCount = Math.min(
                              totalMovies,
                              MAX_VISIBLE_MOVIES,
                            );
                            if (!visibleCount) return null;

                            const pageStart = currentPage * MAX_VISIBLE_MOVIES;
                            const pageEnd = Math.min(
                              pageStart + MAX_VISIBLE_MOVIES,
                              totalMovies,
                            );
                            const pageMovies = movies.slice(pageStart, pageEnd);

                            return (
                              <>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                  {pageMovies.map((movie, idx) => {
                                    const globalIndex = pageStart + idx;
                                    const isSelected =
                                      globalIndex === selectedFilmIndex;
                                    return (
                                      <div
                                        key={movie.id}
                                        className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 ${
                                          isSelected
                                            ? 'border-cyan-400 shadow-lg shadow-cyan-400/40'
                                            : 'border-cyan-400/20 opacity-80'
                                        }`}
                                        style={{ aspectRatio: '2/3' }}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Sélectionner ${movie.title}`}
                                        onClick={() =>
                                          setSelectedFilmIndex(globalIndex)
                                        }
                                        onDoubleClick={() => {
                                          setSelectedFilmIndex(globalIndex);
                                          setSelectedMovie(movie);
                                        }}
                                        onKeyDown={(event) => {
                                          if (
                                            event.key === 'Enter' ||
                                            event.key === ' '
                                          ) {
                                            event.preventDefault();
                                            setSelectedFilmIndex(globalIndex);
                                          }
                                        }}
                                      >
                                        <img
                                          src={movie.thumbnail}
                                          alt={movie.title}
                                          className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                        <div className="absolute bottom-1 left-1 right-1 text-[10px] font-bold text-white truncate">
                                          {movie.title}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                {totalPages > 1 && (
                                  <div className="text-[10px] text-cyan-200 text-center flex-shrink-0">
                                    Page {currentPage + 1} / {totalPages}
                                  </div>
                                )}
                                <div className="mt-3 text-center flex-shrink-0">
                                  <button
                                    onClick={playFilm}
                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm active:scale-95"
                                  >
                                    ▶ Lancer
                                  </button>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                  </div>

                  {/* Bouton Home iPhone classique */}
                  <button
                    type="button"
                    aria-label="Bouton principal iPhone"
                    className="absolute bottom-2 left-1/2 z-30 h-10 w-10 -translate-x-1/2 rounded-full border border-white/40 bg-slate-100/90 shadow-inner shadow-black/20"
                    onClick={() => setSelectedMovie(null)}
                  >
                    <span className="sr-only">Accueil</span>
                  </button>
                </div>
              </div>
            ) : (
              /* TV pour desktop */
              <div
                className="relative"
                style={{
                  width: 'clamp(720px, 70vw, 1000px)',
                  height: 'clamp(520px, 55vw, 720px)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900 via-black to-slate-950"
                  style={{
                    padding: '10px',
                    boxShadow:
                      '0 30px 80px rgba(0,0,0,0.85), inset 0 0 20px rgba(255,255,255,0.05)',
                  }}
                >
                  <div
                    className="absolute -inset-1 rounded-[20px]"
                    style={{
                      background:
                        'linear-gradient(120deg, rgba(34,211,238,0.25), rgba(168,85,247,0.25), rgba(59,130,246,0.25))',
                      filter: 'blur(18px)',
                      opacity: 0.6,
                    }}
                  />
                  <div
                    className="relative w-full h-full rounded-xl overflow-hidden bg-black"
                    style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.9)' }}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/6 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
                    </div>
                    {cameraOn && powerOnAnim && (
                      <div className="absolute inset-0 pointer-events-none z-20">
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 bg-white/90"
                          style={{
                            animation: 'expand 0.55s ease-out forwards',
                          }}
                        />
                        <div className="absolute inset-0 bg-white/5 animate-pulse" />
                      </div>
                    )}
                    {!cameraOn && (
                      <div className="relative w-full h-full bg-gradient-to-br from-gray-900/60 to-black flex items-center justify-center">
                        <div className="text-gray-700/30 text-6xl font-bold">
                          MARS.AI
                        </div>
                      </div>
                    )}

                    {cameraOn && isBooting && (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-black">
                        {showClap ? (
                          <div className="relative w-44 h-32">
                            {/* Ombre */}
                            <div className="absolute -inset-2 rounded-2xl bg-cyan-500/10 blur-xl" />
                            {/* Clap top */}
                            <div
                              className="absolute left-1/2 top-0 h-9 w-44 -translate-x-1/2 rounded-t-xl bg-gradient-to-r from-slate-200 to-slate-400 origin-bottom animate-clap"
                              style={{
                                boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
                              }}
                            >
                              <div className="absolute inset-0 rounded-t-xl clap-stripes" />
                            </div>
                            {/* Hinge */}
                            <div className="absolute left-1/2 top-7 h-2 w-12 -translate-x-1/2 rounded-full bg-black/70" />
                            {/* Clap body */}
                            <div
                              className="absolute inset-0 rounded-xl border border-white/15 bg-gradient-to-br from-slate-800 via-slate-900 to-black"
                              style={{
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.7)',
                              }}
                            >
                              <div className="absolute inset-0 rounded-xl clap-grid" />
                              <div className="absolute top-3 left-4 text-[11px] font-bold text-white/80 tracking-widest">
                                MARS.AI
                              </div>
                              <div className="absolute bottom-3 left-4 text-[10px] text-white/55">
                                TAKE 01
                              </div>
                              <div className="absolute bottom-3 right-4 text-[10px] text-white/55">
                                SCENE 01
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="text-6xl font-black text-white/10 tracking-[0.3em] select-none">
                              MARS.AI
                            </div>
                            <div className="mt-4 h-1 w-56 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 opacity-70" />
                            <div className="mt-6 text-sm text-white/40">
                              Démarrage…
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {cameraOn && !isBooting && selectedMovie && (
                      <div className="w-full h-full flex flex-col p-6 bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-[#0a1628]">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white">
                              {selectedMovie.title}
                            </h3>
                            <p className="text-sm text-cyan-400/70">
                              {selectedMovie.filmmaker} •{' '}
                              {selectedMovie.duration}s
                            </p>
                          </div>
                          <button
                            onClick={closeMovie}
                            className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                          >
                            Fermer
                          </button>
                        </div>
                        <div className="flex-1 rounded-lg overflow-hidden border border-cyan-400/30 min-h-0">
                          {selectedMovie.video_url ? (
                            <video
                              className="w-full h-full bg-black"
                              src={resolveMediaUrl(selectedMovie.video_url)}
                              controls
                              autoPlay
                            />
                          ) : selectedMovie.youtube_url ? (
                            <iframe
                              src={
                                getYouTubeEmbed(selectedMovie.youtube_url) +
                                '?autoplay=1'
                              }
                              className="w-full h-full bg-black"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={selectedMovie.title}
                            />
                          ) : (
                            <video
                              className="w-full h-full bg-black"
                              src={selectedMovie.video}
                              controls
                              autoPlay
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {cameraOn &&
                      !isBooting &&
                      selectedGenre &&
                      !selectedMovie && (
                        <div className="w-full h-full flex flex-col p-8 bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-[#0a1628]">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h2 className="text-2xl font-bold text-white">
                                MarsAI
                              </h2>
                              <p className="text-xs text-cyan-400/60">
                                Festival de courts-métrages IA
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-400">
                                Films sélectionnés
                              </p>
                            </div>
                          </div>

                          {(() => {
                            const visibleCount = Math.min(
                              totalMovies,
                              MAX_VISIBLE_MOVIES,
                            );
                            if (!visibleCount) return null;

                            const cols = Math.min(GRID_COLUMNS, visibleCount);
                            const cardSize = {
                              width: '190px',
                              height: '260px',
                            };

                            const pageStart = currentPage * MAX_VISIBLE_MOVIES;
                            const pageEnd = Math.min(
                              pageStart + MAX_VISIBLE_MOVIES,
                              totalMovies,
                            );
                            const pageMovies = movies.slice(pageStart, pageEnd);

                            return (
                              <>
                                <div
                                  className="grid gap-5 place-items-start w-full"
                                  style={{
                                    gridTemplateColumns: `repeat(${cols}, ${cardSize.width})`,
                                    justifyContent: 'start',
                                  }}
                                >
                                  {pageMovies.map((movie, idx) => {
                                    const globalIndex = pageStart + idx;
                                    const isSelected =
                                      globalIndex === selectedFilmIndex;
                                    return (
                                      <div
                                        key={movie.id}
                                        className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer hover:scale-105 ${
                                          isSelected
                                            ? 'border-cyan-400 shadow-cyan-400/60'
                                            : 'border-cyan-400/20 opacity-80'
                                        }`}
                                        style={{
                                          width: cardSize.width,
                                          height: cardSize.height,
                                        }}
                                        onClick={() =>
                                          setSelectedFilmIndex(globalIndex)
                                        }
                                        onDoubleClick={() => {
                                          setSelectedFilmIndex(globalIndex);
                                          setSelectedMovie(movie);
                                        }}
                                      >
                                        <img
                                          src={movie.thumbnail}
                                          alt={movie.title}
                                          className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                        <div className="absolute bottom-2 left-2 right-2 text-sm font-bold text-white truncate">
                                          {movie.title}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                {totalPages > 1 && (
                                  <div className="mt-3 text-xs text-cyan-200 text-right">
                                    Page {currentPage + 1} / {totalPages}
                                  </div>
                                )}
                              </>
                            );
                          })()}

                          <div className="mt-6 text-center">
                            <button
                              onClick={playFilm}
                              className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold"
                            >
                              Lancer: {currentMovie ? currentMovie.title : ''}
                            </button>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Télécommande - Cachée sur mobile car les controls sont directement sur l'iPhone */}
          <div
            className={`relative ${isMobile ? 'hidden' : 'block'}`}
            style={{
              width: 'clamp(180px, 20vw, 240px)',
              height: 'clamp(420px, 45vw, 600px)',
            }}
          >
            <div
              className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-slate-700/60"
              style={{
                boxShadow:
                  '0 18px 40px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="absolute inset-2 rounded-[22px] border border-white/5 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 40%)',
                }}
              />
              <div className="px-4 pt-4 pb-3">
                <button
                  onClick={toggleCamera}
                  className={`w-full py-2 px-3 rounded-lg font-bold text-sm transition-all text-white ${
                    !cameraOn
                      ? 'bg-gradient-to-br from-green-600 to-green-700 shadow-[0_0_16px_rgba(34,197,94,0.3)]'
                      : 'bg-gradient-to-br from-red-600 to-red-700 shadow-[0_0_16px_rgba(239,68,68,0.3)]'
                  }`}
                >
                  ⏻ {cameraOn ? 'OFF' : 'ON'}
                </button>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mx-4 mb-3" />

              <div className="px-4 mb-3">
                {normalizedApiMovies.length > 0 ? (
                  <p className="text-[11px] text-gray-300 uppercase mb-2 text-center tracking-wider">
                    Films sélectionnés
                  </p>
                ) : (
                  <>
                    <p className="text-[11px] text-gray-300 uppercase mb-2 text-center tracking-wider">
                      Genres
                    </p>
                    <button
                      onClick={() => cameraOn && setSelectedGenre(GENRES[0])}
                      disabled={!cameraOn}
                      className={`w-full mb-2 py-2 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                        selectedGenre?.name === 'Tous'
                          ? 'bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-[0_0_14px_rgba(168,85,247,0.3)]'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/60'
                      }`}
                    >
                      <span className="text-sm">{GENRES[0].icon}</span>{' '}
                      <span>Tous</span>
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      {GENRES.slice(1).map((genre) => (
                        <button
                          key={genre.name}
                          onClick={() => cameraOn && setSelectedGenre(genre)}
                          disabled={!cameraOn}
                          className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-0.5 ${
                            selectedGenre?.name === genre.name
                              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/60'
                          }`}
                        >
                          <span className="text-base">{genre.icon}</span>
                          <span className="text-[9px] leading-tight">
                            {genre.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mx-4 mb-3" />

              <div className="px-4 mb-2">
                <p className="text-[10px] text-gray-400 uppercase mb-2 text-center tracking-wider">
                  Navigation
                </p>
                <div className="relative w-32 h-32 mx-auto">
                  <button
                    onClick={navigateUp}
                    disabled={!cameraOn || !selectedGenre}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-t-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white shadow-md text-xs"
                  >
                    ▲
                  </button>
                  <button
                    onClick={navigateDown}
                    disabled={!cameraOn || !selectedGenre}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-b-lg bg-gradient-to-b from-gray-700 to-gray-800 text-white shadow-md text-xs"
                  >
                    ▼
                  </button>
                  <button
                    onClick={navigateLeft}
                    disabled={!cameraOn || !selectedGenre}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-l-lg bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-md text-xs"
                  >
                    ◀
                  </button>
                  <button
                    onClick={navigateRight}
                    disabled={!cameraOn || !selectedGenre}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-r-lg bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-md text-xs"
                  >
                    ▶
                  </button>
                  <button
                    onClick={playFilm}
                    disabled={!cameraOn || !selectedGenre}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold shadow-[0_0_12px_rgba(34,197,94,0.3)] text-xs"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contrôles mobiles pour iPhone */}
        {isMobile && (
          <div className="mt-6 flex flex-col gap-4 items-center w-full max-w-sm mx-auto px-4">
            <p className="text-[11px] text-white/70 text-center rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              Interface tactile iPhone active · Touchez une affiche puis LIRE
            </p>

            {cameraOn && normalizedApiMovies.length === 0 && (
              <div
                className="w-full"
                role="group"
                aria-label="Choix du genre de films"
              >
                <p className="text-xs text-gray-300 uppercase mb-2 text-center tracking-wider">
                  Genres de films
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedGenre(GENRES[0])}
                    aria-pressed={selectedGenre?.name === 'Tous'}
                    aria-label="Genre Tous"
                    className={`min-h-11 py-2 px-2 rounded-lg text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/80 ${
                      selectedGenre?.name === 'Tous'
                        ? 'bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-[0_0_16px_rgba(168,85,247,0.4)]'
                        : 'bg-gray-800/50 text-gray-300'
                    }`}
                  >
                    <span className="text-lg">{GENRES[0].icon}</span>
                    <span className="text-[10px]">Tous</span>
                  </button>
                  {GENRES.slice(1).map((genre) => (
                    <button
                      key={genre.name}
                      onClick={() => setSelectedGenre(genre)}
                      aria-pressed={selectedGenre?.name === genre.name}
                      aria-label={`Genre ${genre.name}`}
                      className={`min-h-11 py-2 px-2 rounded-lg text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 ${
                        selectedGenre?.name === genre.name
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_16px_rgba(34,211,238,0.4)]'
                          : 'bg-gray-800/50 text-gray-300'
                      }`}
                    >
                      <span className="text-lg">{genre.icon}</span>
                      <span className="text-[10px]">{genre.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {cameraOn && selectedGenre && !selectedMovie && (
              <div className="w-full flex items-center justify-center gap-3">
                <button
                  onClick={prevFilm}
                  aria-label="Film précédent"
                  className="min-h-11 min-w-11 p-3 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                >
                  ◀
                </button>
                <button
                  onClick={playFilm}
                  aria-label="Lire le film sélectionné"
                  className="min-h-11 px-6 py-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold shadow-[0_0_16px_rgba(34,197,94,0.4)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300/80"
                >
                  ▶ LIRE
                </button>
                <button
                  onClick={nextFilm}
                  aria-label="Film suivant"
                  className="min-h-11 min-w-11 p-3 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
