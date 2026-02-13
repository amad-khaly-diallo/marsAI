import React, { useState, useEffect, useRef } from 'react';
import { useAudioContext } from '../../hooks/useAudioContext';

// Import des images
import imgTout from '../../assets/images/tout.png';
import imgFilm from '../../assets/images/film.png';
import imgIa from '../../assets/images/ia.png';
import imgVisiteur from '../../assets/images/visiteur.png';

// Import des projecteurs
import projectorFilms from '../../assets/images/projector-films.png';
import projectorCountries from '../../assets/images/projector-countries.png';
import projectorProfessionals from '../../assets/images/projector-professionals.png';
import projectorVisitors from '../../assets/images/projector-visitors.png';

// Styles CSS pour les animations
const cardInsertionStyles = `
  @keyframes cardInsertion {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) rotateY(0deg) translateZ(160px) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) rotateY(0deg) translateZ(80px) scale(0.8);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) rotateY(0deg) translateZ(0px) scale(0.3);
    }
  }

  @keyframes slotPulse {
    0%, 100% {
      box-shadow: inset 0 0 10px rgba(234, 179, 8, 0.3), 0 0 15px rgba(234, 179, 8, 0.5);
    }
    50% {
      box-shadow: inset 0 0 20px rgba(234, 179, 8, 0.6), 0 0 30px rgba(234, 179, 8, 0.8);
    }
  }

  @keyframes hologramGlitch {
    0%, 100% {
      opacity: 1;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3);
    }
    50% {
      opacity: 0.8;
      text-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5);
    }
  }

  @keyframes hologramFloat {
    0%, 100% {
      transform: translateY(-5px);
    }
    50% {
      transform: translateY(5px);
    }
  }

  @keyframes hologramScan {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 10px;
    }
  }

  .card-inserting {
    animation: cardInsertion 1s ease-in forwards;
  }

  .slot-active {
    animation: slotPulse 0.8s ease-in-out;
  }

  .hologram-effect {
    animation: hologramFloat 3s ease-in-out infinite;
    position: relative;
  }

  .hologram-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 255, 255, 0.15) 0px,
      rgba(0, 255, 255, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    animation: hologramScan 0.15s linear infinite;
    pointer-events: none;
  }

  .hologram-title {
    animation: hologramGlitch 2s ease-in-out infinite;
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3);
  }
`;

// Inyectar estilos
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = cardInsertionStyles;
  document.head.appendChild(styleElement);
}

// Données de démo pour les films
const DEMO_MOVIES = [
  {
    id: 1,
    title: "L'Éveil Numérique",
    filmmaker_name: "Sophie Laurent",
    duration: 60,
    genre: "Fiction",
    synopsis: "Dans un futur proche, une IA prend conscience. Une réflexion poétique sur l'humanité à l'ère du numérique.",
    status: "selected",
    thumbnail_url: "https://picsum.photos/seed/film1/800/450",
    video_url: "/video/video4.mp4"
  },
  {
    id: 2,
    title: "Dernier Métro",
    filmmaker_name: "Marc Dubois",
    duration: 60,
    genre: "Fiction",
    synopsis: "Une rencontre fugace dans le dernier métro de la nuit. L'histoire de deux solitudes qui se croisent.",
    status: "approved",
    thumbnail_url: "https://picsum.photos/seed/film2/800/450",
    video_url: "/video/video4.mp4"
  },
  {
    id: 3,
    title: "Pixels & Poussière",
    filmmaker_name: "Léa Chen",
    duration: 60,
    genre: "Animation",
    synopsis: "Une exploration visuelle entre le monde réel et virtuel. Les frontières s'effacent dans un ballet hypnotique.",
    status: "selected",
    thumbnail_url: "https://picsum.photos/seed/film3/800/450",
    video_url: "/video/video4.mp4"
  },
  {
    id: 4,
    title: "Marseille 2026",
    filmmaker_name: "Ahmed Kader",
    duration: 60,
    genre: "Documentaire",
    synopsis: "Portrait sensible d'une ville en mutation. Entre tradition et modernité, la cité phocéenne se réinvente.",
    status: "approved",
    thumbnail_url: "https://picsum.photos/seed/film4/800/450",
    video_url: "/video/video4.mp4"
  },
  {
    id: 5,
    title: "Rires Artificiels",
    filmmaker_name: "Emma Russo",
    duration: 60,
    genre: "Clip",
    synopsis: "Quand un stand-up comedian découvre que son meilleur public est... une IA. Absurde et touchant.",
    status: "approved",
    thumbnail_url: "https://picsum.photos/seed/film5/800/450",
    video_url: "/video/video4.mp4"
  },
  {
    id: 6,
    title: "Néon Rouge",
    filmmaker_name: "Vincent Park",
    duration: 60,
    genre: "Fiction",
    synopsis: "Dans les rues nocturnes de la ville, un mystérieux signal rouge guide vers l'inconnu. Tension maximale.",
    status: "selected",
    thumbnail_url: "https://picsum.photos/seed/film6/800/450",
    video_url: "/video/video4.mp4"
  }
];

// Genres de films avec leurs images de caméra
const FILM_GENRES = [
  { 
    name: "Tous", 
    icon: "⭐", 
    color: "from-violet-500 to-fuchsia-600", 
    glow: "violet",
    image: imgTout,
    projector: projectorCountries,
    bgColor: "from-purple-600 to-purple-900",
    glowColor: "purple-500"
  },
  { 
    name: "Fiction", 
    icon: "🎬", 
    color: "from-cyan-500 to-blue-600", 
    glow: "cyan",
    image: imgFilm,
    projector: projectorFilms,
    bgColor: "from-blue-600 to-blue-900",
    glowColor: "blue-500"
  },
  { 
    name: "Documentaire", 
    icon: "📽️", 
    color: "from-amber-500 to-orange-600", 
    glow: "amber",
    image: imgIa,
    projector: projectorProfessionals,
    bgColor: "from-orange-600 to-red-900",
    glowColor: "orange-500"
  },
  { 
    name: "Animation", 
    icon: "🎨", 
    color: "from-purple-500 to-pink-600", 
    glow: "purple",
    image: imgFilm,
    projector: projectorFilms,
    bgColor: "from-purple-600 to-pink-900",
    glowColor: "purple-500"
  },
  { 
    name: "Clip", 
    icon: "🎵", 
    color: "from-orange-500 to-red-600", 
    glow: "orange",
    image: imgVisiteur,
    projector: projectorVisitors,
    bgColor: "from-red-600 to-red-900",
    glowColor: "red-500"
  }
];

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
      const response = await fetch('/api/movies');
      
      // Vérifier si la réponse est OK
      if (!response.ok) {
        console.warn(`API retourned ${response.status}, utilisant les données de démo`);
        setMovies(DEMO_MOVIES);
        setLoading(false);
        return;
      }
      
      // Vérifier si la réponse est du JSON valide
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('API ne retourne pas du JSON, utilisant les données de démo');
        setMovies(DEMO_MOVIES);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      const approvedMovies = data.filter(movie => 
        movie.status === 'approved' || movie.status === 'selected'
      );
      
      if (approvedMovies.length > 0) {
        setMovies(approvedMovies);
      } else {
        setMovies(DEMO_MOVIES);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des films:', error);
      setMovies(DEMO_MOVIES);
    } finally {
      setLoading(false);
    }
  };

  // Faire tourner la roulette
  const rotateWheel = (direction) => {
    if (isRotating) return;
    
    setIsRotating(true);
    setIsCameraActive(false);
    
    const newIndex = direction === 'next' 
      ? (selectedGenreIndex + 1) % FILM_GENRES.length
      : (selectedGenreIndex - 1 + FILM_GENRES.length) % FILM_GENRES.length;
    
    setSelectedGenreIndex(newIndex);
    
    setTimeout(() => setIsRotating(false), 500);
  };

  // Sélectionner une carte SD
  const selectCard = (index) => {
    console.log('Card clicked:', index, 'Current:', selectedGenreIndex, 'Inserting:', isCardInserting);
    
    if (isCardInserting) {
      console.log('Already inserting, ignoring');
      return;
    }
    
    if (index === selectedGenreIndex) {
      // Si c'est la même carte, insérer directement
      console.log('Same card, inserting');
      insertCard();
      return;
    }
    
    // Changer la sélection et insérer
    console.log('Different card, changing index to', index);
    setSelectedGenreIndex(index);
    
    // Après la rotation, déclencher l'insertion
    setTimeout(() => {
      console.log('Timeout: now inserting');
      insertCard();
    }, 500);
  };

  // Insérer la carte SD
  const insertCard = () => {
    console.log('insertCard called, isCardInserting:', isCardInserting);
    
    if (isCardInserting) {
      console.log('Already inserting, ignoring insertCard');
      return;
    }
    
    console.log('Starting card insertion animation');
    playCameraSound();
    setIsCardInserting(true);
    
    // Animation d'insertion de carte SD
    setTimeout(() => {
      console.log('Card insertion complete, showing videos');
      setIsCameraActive(true);
      setIsCardInserting(false);
      
      const selectedGenre = FILM_GENRES[selectedGenreIndex].name;
      const filtered = selectedGenre === "Tous" 
        ? movies 
        : movies.filter(movie => movie.genre === selectedGenre);
      
      console.log('Filtered movies:', filtered);
      setFilteredMovies(filtered);
    }, 1000);
  };

  // Activer la caméra et afficher les vidéos du genre sélectionné
  const activateCamera = () => {
    insertCard();
  };

  if (loading || movies.length === 0) return null;

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-violet-950/20 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent mb-4">
            PAYS REPRÉSENTÉS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto" />
        </div>

        {/* Roulette des genres */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-8 mb-8">
            {/* Bouton Précédent */}
            <button
              onClick={() => rotateWheel('prev')}
              disabled={isRotating}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white hover:scale-110 disabled:opacity-50 transition-all duration-300 shadow-xl shadow-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/75"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Caméra avec cartes SD orbitantes en 3D */}
            <div className="relative w-96 h-96" style={{ perspective: '1200px' }}>
              {/* Conteneur de rotation 3D */}
              <div 
                className="absolute inset-0 transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${selectedGenreIndex * -72}deg)`,
                  pointerEvents: 'auto'
                }}
              >
                {/* Cartes SD qui orbitent en 3D - Cliquables */}
                {FILM_GENRES.map((genre, index) => {
                  const angle = index * 72;
                  const isSelected = index === selectedGenreIndex;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute top-1/2 left-1/2 cursor-pointer z-30 ${
                        isCardInserting && isSelected 
                          ? 'card-inserting' 
                          : 'opacity-100'
                      }`}
                      onClick={() => {
                        console.log('Clicked card:', index);
                        selectCard(index);
                      }}
                      style={{
                        transformStyle: 'preserve-3d',
                        pointerEvents: 'auto',
                        transform: isCardInserting && isSelected
                          ? 'translate(-50%, -50%) rotateY(0deg) translateZ(160px) scale(1)'
                          : `
                            translate(-50%, -50%)
                            rotateY(${angle}deg)
                            translateZ(160px)
                            rotateY(-${angle + selectedGenreIndex * -72}deg)
                          `,
                      }}
                    >
                      {/* Carte SD Noir Sci-Fi */}
                      <div 
                        className={`w-24 h-32 rounded-xl ${isSelected ? 'ring-4 ring-cyan-400 shadow-2xl shadow-cyan-500/70 scale-110' : ''} transition-all duration-300 hover:scale-105 overflow-hidden`}
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: 'rotateX(10deg)',
                        }}
                      >
                        {/* Corps noir de la carte */}
                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-black via-black/95 to-black p-2 border border-gray-800 flex flex-col items-center justify-between shadow-2xl relative">
                          
                          {/* Haut de la carte - bande de couleur genre */}
                          <div 
                            className={`w-full h-3 rounded-t-lg flex gap-0 p-0`}
                            style={{
                              background: `linear-gradient(90deg, ${genre.glow} 0%, ${genre.glow}80 50%, ${genre.glow} 100%)`,
                            }}
                          />
                          
                          {/* Contenu central - Texte du genre */}
                          <div className="flex-1 flex flex-col items-center justify-center w-full gap-2 px-1">
                            <span className="text-2xl filter drop-shadow-lg">{genre.icon}</span>
                            <span className="text-[9px] text-white font-black uppercase tracking-wider text-center drop-shadow-lg"
                              style={{
                                textShadow: `0 0 8px ${genre.glow}80, 0 0 4px ${genre.glow}40`
                              }}
                            >
                              {genre.name}
                            </span>
                          </div>
                          
                          {/* Bas de la carte - lueur subtile */}
                          <div 
                            className="w-full h-1 rounded-b-lg opacity-60"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${genre.glow}, transparent)`
                            }}
                          />
                          
                          {/* Accents lumineux de sci-fi */}
                          <div className="absolute top-2 left-1 w-0.5 h-3 bg-white/40 rounded-full blur-sm"></div>
                          <div className="absolute bottom-2 right-2 w-1 h-2 bg-white/30 rounded-full blur-sm"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Caméra au centre créée en CSS */}
              <div className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none">
                <div className="relative" style={{ transform: 'translateZ(20px)' }}>
                  {/* Corps de la caméra */}
                  <div className="relative w-56 h-40">
                    {/* Base principale */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-black rounded-3xl shadow-2xl border-2 border-gray-600">
                      {/* Détails de la caméra */}
                      <div className="absolute top-4 left-4 w-5 h-5 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
                      <div className="absolute top-4 right-4 w-8 h-3 bg-gray-600 rounded" />
                      <div className="absolute bottom-4 left-4 right-4 h-2 bg-gray-700 rounded" />
                      <div className="absolute top-1/3 left-1/3 w-20 h-3 bg-gray-600 rounded" />
                    </div>
                    
                    {/* Objectif */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-gray-600 via-gray-800 to-black border-4 border-gray-500 shadow-inner flex items-center justify-center z-20">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-900 via-purple-900 to-black border-2 border-blue-700/50 shadow-lg">
                        <div className="w-full h-full rounded-full bg-gradient-to-tl from-white/30 to-transparent" />
                      </div>
                    </div>

                    {/* Fente pour carte SD (s'illumine pendant l'insertion) */}
                    <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-sm border-2 border-gray-700 transition-all duration-300 z-5 ${
                      isCardInserting ? 'slot-active border-yellow-500' : ''
                    }`}>
                      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent ${isCardInserting ? 'animate-pulse' : ''}`} />
                    </div>
                    
                    {/* Bouton play sur l'objectif */}
                    <button
                      onClick={activateCamera}
                      disabled={isCardInserting}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl hover:scale-110 disabled:scale-100 disabled:opacity-70 transition-all duration-300 shadow-xl shadow-yellow-500/50 cursor-pointer border-4 border-yellow-300 z-20 pointer-events-auto"
                    >
                      {isCardInserting ? (
                        <span className="animate-spin">⏳</span>
                      ) : (
                        <span className="ml-1">▶️</span>
                      )}
                    </button>
                  </div>

                  {/* Poignée supérieure */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-8 bg-gradient-to-br from-gray-600 to-gray-900 rounded-t-2xl border-2 border-gray-600 border-b-0 shadow-lg" />
                </div>
              </div>
            </div>

            {/* Bouton Suivant */}
            <button
              onClick={() => rotateWheel('next')}
              disabled={isRotating}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white hover:scale-110 disabled:opacity-50 transition-all duration-300 shadow-xl shadow-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/75"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Vidéos filtrées avec effet hologramme */}
        {isCameraActive && filteredMovies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie, index) => (
              <VideoCard
                key={movie.id}
                movie={movie}
                index={index}
                onClick={() => setSelectedMovie(movie)}
                isHologram={true}
              />
            ))}
          </div>
        )}

        {/* Modal vidéo */}
        {selectedMovie && (
          <VideoModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </section>
  );
}

// Carte vidéo compacte
function VideoCard({ movie, onClick, index, isHologram = false }) {
  return (
    <div
      className={`group relative cursor-pointer animate-fadeIn hover:scale-105 transition-all duration-300 ${isHologram ? 'hologram-effect' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      {/* Glow externe - plus intensif avec hologramme */}
      <div className={`absolute -inset-1 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60 ${
        isHologram 
          ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 group-hover:opacity-80' 
          : 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600'
      }`} />
      
      {/* Carte principale */}
      <div className={`relative h-full overflow-hidden rounded-xl border transition-all duration-500 shadow-xl ${
        isHologram
          ? 'bg-gradient-to-br from-black via-cyan-950/20 to-black border-cyan-500/50 group-hover:border-cyan-400/80'
          : 'bg-gradient-to-br from-black via-violet-950/30 to-black border-white/10 group-hover:border-violet-500/50'
      }`}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={movie.thumbnail_url}
            alt={movie.title}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
              isHologram ? 'brightness-110' : ''
            }`}
          />
          
          {/* Overlay - Plus transparent avec hologramme pour voir l'effet scan */}
          <div className={`absolute inset-0 opacity-70 group-hover:opacity-90 transition-opacity ${
            isHologram
              ? 'bg-gradient-to-t from-black via-cyan-900/30 to-transparent'
              : 'bg-gradient-to-t from-black via-black/50 to-transparent'
          }`} />
          
          {/* Bouton play */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ${
              isHologram
                ? 'bg-gradient-to-br from-cyan-400 to-blue-600'
                : 'bg-gradient-to-br from-violet-500 to-fuchsia-600'
            }`}>
              <svg className="w-8 h-8 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Badge statut */}
          {movie.status === 'selected' && (
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-sm ${
              isHologram
                ? 'bg-gradient-to-r from-cyan-500/80 to-blue-500/80'
                : 'bg-gradient-to-r from-amber-500/80 to-yellow-500/80'
            }`}>
              <span className="text-xs font-black text-white">⭐ Sélectionné</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className={`text-lg font-black mb-2 line-clamp-1 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text ${
            isHologram
              ? 'hologram-title text-white'
              : 'text-white group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-fuchsia-300'
          }`}>
            {movie.title}
          </h3>
          
          <div className={`flex items-center justify-between text-sm ${
            isHologram
              ? 'text-cyan-200/70'
              : 'text-white/70'
          }`}>
            <span className="font-semibold">{movie.filmmaker_name}</span>
            <span className="font-bold">{movie.duration}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal vidéo
function VideoModal({ movie, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-violet-950/90 to-black/95 backdrop-blur-2xl" />
      
      <div 
        className="relative w-full max-w-6xl bg-gradient-to-br from-[#0f0f1e] to-[#1a0f1e] rounded-3xl border-2 border-violet-500/30 overflow-hidden shadow-2xl shadow-violet-500/50 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-xl border border-red-500/30 flex items-center justify-center text-white hover:scale-110 hover:rotate-90 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video */}
        <div className="relative aspect-video bg-black">
          {movie.video_url ? (
            <video className="w-full h-full" controls autoPlay src={movie.video_url}>
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white/60 text-lg">Vidéo non disponible</p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent mb-4">
            {movie.title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30">
              <div className="text-sm text-white/60 mb-1">Réalisateur</div>
              <div className="font-bold text-white">{movie.filmmaker_name}</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-fuchsia-500/30">
              <div className="text-sm text-white/60 mb-1">Genre</div>
              <div className="font-bold text-white">{movie.genre}</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
              <div className="text-sm text-white/60 mb-1">Durée</div>
              <div className="font-bold text-white">{movie.duration}s</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
              <div className="text-sm text-white/60 mb-1">Statut</div>
              <div className="font-bold text-white">{movie.status === 'selected' ? '⭐ Sélectionné' : '✓ Approuvé'}</div>
            </div>
          </div>

          {movie.synopsis && (
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-sm text-white/60 mb-2 uppercase tracking-wider font-bold">Synopsis</div>
              <p className="text-white/90 leading-relaxed">{movie.synopsis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
