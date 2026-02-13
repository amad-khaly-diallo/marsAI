import React, { useState, useEffect, useRef } from 'react';

// Import des images SD
import sdScifi from '../../assets/images/sd_scifi.png';
import sdAction from '../../assets/images/sd_action.png';
import sdDrama from '../../assets/images/sd_drama.png';
import sdComedy from '../../assets/images/sd_comedy.png';

// Données des films
const DEMO_MOVIES = [
  {
    id: 1,
    title: "L'Éveil Numérique",
    filmmaker: "Sophie Laurent",
    duration: 60,
    genre: "Fiction",
    thumbnail: "https://picsum.photos/seed/film1/400/600",
    video: "/video/video4.mp4"
  },
  {
    id: 2,
    title: "Rêves de Silicone",
    filmmaker: "Marc Dubois",
    duration: 45,
    genre: "Fiction",
    thumbnail: "https://picsum.photos/seed/film2/400/600",
    video: "/video/video4.mp4"
  },
  {
    id: 3,
    title: "Connexions",
    filmmaker: "Lisa Chen",
    duration: 55,
    genre: "Documentaire",
    thumbnail: "https://picsum.photos/seed/film3/400/600",
    video: "/video/video4.mp4"
  },
  {
    id: 4,
    title: "Horizons Artificiels",
    filmmaker: "Jean Martin",
    duration: 50,
    genre: "Animation",
    thumbnail: "https://picsum.photos/seed/film4/400/600",
    video: "/video/video4.mp4"
  },
  {
    id: 5,
    title: "Nuit Digitale",
    filmmaker: "Emma Dubois",
    duration: 58,
    genre: "Fiction",
    thumbnail: "https://picsum.photos/seed/film5/400/600",
    video: "/video/video4.mp4"
  },
  {
    id: 6,
    title: "Mémoires d'IA",
    filmmaker: "Thomas Chen",
    duration: 52,
    genre: "Documentaire",
    thumbnail: "https://picsum.photos/seed/film6/400/600",
    video: "/video/video4.mp4"
  },
  {
    id: 7,
    title: "Synthèse Créative",
    filmmaker: "Marie Laurent",
    duration: 48,
    genre: "Animation",
    thumbnail: "https://picsum.photos/seed/film7/400/600",
    video: "/video/video4.mp4"
  },
  {
    id: 8,
    title: "Code & Cinéma",
    filmmaker: "Alex Martin",
    duration: 60,
    genre: "Clip",
    thumbnail: "https://picsum.photos/seed/film8/400/600",
    video: "/video/video4.mp4"
  },
];

const GENRES = [
  { name: "Tous", icon: "⭐", color: "from-violet-500 to-fuchsia-600", image: sdScifi },
  { name: "Fiction", icon: "🎭", color: "from-cyan-500 to-violet-500", image: sdScifi },
  { name: "Documentaire", icon: "📹", color: "from-violet-500 to-cyan-500", image: sdDrama },
  { name: "Animation", icon: "✨", color: "from-cyan-400 to-violet-600", image: sdComedy },
  { name: "Clip", icon: "🎵", color: "from-violet-600 to-cyan-400", image: sdAction }
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
      transform: translateY(0) translateX(var(--cone-x)) scale(0.5);
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
`;

// Helper: Calculate coverflow position
function calculateCoverflowPosition(index, totalCards, radius = 250) {
  const angle = (360 / totalCards) * index;
  const angleRad = (angle * Math.PI) / 180;
  
  const x = Math.sin(angleRad) * radius;
  const z = Math.cos(angleRad) * radius;
  const rotationY = -angle;
  
  return { x, y: 0, rotation: rotationY, scale: 1 };
}

export default function HeroCamera() {
  const [animationState, setAnimationState] = useState('IDLE');
  const [cameraOn, setCameraOn] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [insertingGenre, setInsertingGenre] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardStartPos, setCardStartPos] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [carouselRotation, setCarouselRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(0);
  const [carouselPage, setCarouselPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoFullscreen, setVideoFullscreen] = useState(false);
  
  const cardRefs = useRef({});

  // Filtrer les films selon le genre
  const getGenreMovies = () => {
    if (!selectedGenre) return [];
    if (selectedGenre.name === "Tous") return DEMO_MOVIES;
    return DEMO_MOVIES.filter(m => m.genre === selectedGenre.name);
  };

  // Obtenir 3 films pour le carousel
  const getCarouselMovies = () => {
    const movies = getGenreMovies();
    const start = carouselPage * 3;
    return movies.slice(start, start + 3);
  };

  // Navigation carrousel - Rotation 3D
  const rotateCarousel = (direction) => {
    if (isAnimating) return;
    const angleStep = 360 / GENRES.length;
    setCarouselRotation(prev => 
      direction === 'next' ? prev - angleStep : prev + angleStep
    );
  };

  // Navigation entre les films
  const nextFilm = () => {
    const movies = getGenreMovies();
    if (movies.length > 0) {
      if ((selectedFilmIndex + 1) % 3 === 0 && selectedFilmIndex + 1 < movies.length) {
        setCarouselPage(prev => prev + 1);
      }
      setSelectedFilmIndex(prev => (prev + 1) % movies.length);
    }
  };

  const prevFilm = () => {
    const movies = getGenreMovies();
    if (movies.length > 0) {
      if (selectedFilmIndex % 3 === 0 && selectedFilmIndex > 0) {
        setCarouselPage(prev => Math.max(0, prev - 1));
      }
      setSelectedFilmIndex(prev => (prev - 1 + movies.length) % movies.length);
    }
  };

  // Navigation 2D dans la grille
  const navigateUp = () => {
    const movies = getGenreMovies();
    if (movies.length === 0) return;
    
    // Déterminer le nombre de colonnes basé sur le nombre de films
    const cols = movies.length <= 3 ? 3 :
                 movies.length <= 4 ? 4 :
                 movies.length <= 6 ? 3 : 4;
    
    const newIndex = selectedFilmIndex - cols;
    if (newIndex >= 0) {
      setSelectedFilmIndex(newIndex);
    }
  };

  const navigateDown = () => {
    const movies = getGenreMovies();
    if (movies.length === 0) return;
    
    const cols = movies.length <= 3 ? 3 :
                 movies.length <= 4 ? 4 :
                 movies.length <= 6 ? 3 : 4;
    
    const newIndex = selectedFilmIndex + cols;
    if (newIndex < movies.length) {
      setSelectedFilmIndex(newIndex);
    }
  };

  const navigateLeft = () => {
    const movies = getGenreMovies();
    if (movies.length === 0) return;
    
    const cols = movies.length <= 3 ? 3 :
                 movies.length <= 4 ? 4 :
                 movies.length <= 6 ? 3 : 4;
    
    // Ne pas aller à gauche si on est déjà sur la première colonne de la ligne
    if (selectedFilmIndex % cols !== 0) {
      setSelectedFilmIndex(selectedFilmIndex - 1);
    }
  };

  const navigateRight = () => {
    const movies = getGenreMovies();
    if (movies.length === 0) return;
    
    const cols = movies.length <= 3 ? 3 :
                 movies.length <= 4 ? 4 :
                 movies.length <= 6 ? 3 : 4;
    
    // Ne pas aller à droite si on est déjà sur la dernière colonne ou le dernier film
    if ((selectedFilmIndex + 1) % cols !== 0 && selectedFilmIndex + 1 < movies.length) {
      setSelectedFilmIndex(selectedFilmIndex + 1);
    }
  };

  const playFilm = () => {
    const movies = getGenreMovies();
    if (movies.length > 0 && selectedGenre) {
      setSelectedMovie(movies[selectedFilmIndex]);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setVideoFullscreen(false);
  };

  // Toggle fullscreen pour la vidéo
  const toggleVideoFullscreen = () => {
    setVideoFullscreen(!videoFullscreen);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.log('Erreur fullscreen:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // Détecter les changements fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Support clavier
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!cameraOn || !selectedGenre) return;
      
      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          navigateUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          navigateDown();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigateLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateRight();
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedMovie) {
            closeModal();
          } else {
            playFilm();
          }
          break;
        case 'Escape':
          e.preventDefault();
          closeModal();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [cameraOn, selectedGenre, selectedFilmIndex, selectedMovie]);

  // Handler click sur genre de la télécommande
  const handleCardClick = (genre, index) => {
    if (!cameraOn || isAnimating) return;
    
    setIsAnimating(true);
    setAnimationState('INSERTING');
    setInsertingGenre(genre);
    setSelectedFilmIndex(0); // Reset à la première film
    setCarouselPage(0); // Reset à la première page
    
    // Simuler une animation rapide
    setTimeout(() => {
      setSelectedGenre(genre);
      setAnimationState('READY');
      setIsAnimating(false);
    }, 300);
  };

  // Gestion des transitions d'état
  useEffect(() => {
    let timeout;

    switch (animationState) {
      case 'INSERTING':
        timeout = setTimeout(() => {
          setAnimationState('POWERING_ON');
        }, 800);
        break;

      case 'POWERING_ON':
        timeout = setTimeout(() => {
          setSelectedGenre(insertingGenre);
          setAnimationState('PROJECTING');
        }, 500);
        break;

      case 'PROJECTING':
        timeout = setTimeout(() => {
          setAnimationState('READY');
          setIsAnimating(false);
        }, 600);
        break;

      case 'READY':
        break;

      default:
        break;
    }

    return () => clearTimeout(timeout);
  }, [animationState, insertingGenre]);

  const toggleCamera = () => {
    if (cameraOn) {
      setCameraOn(false);
      setAnimationState('IDLE');
      setSelectedGenre(null);
      setInsertingGenre(null);
      setCardStartPos(null);
      setCarouselIndex(0);
    } else {
      setCameraOn(true);
      setAnimationState('IDLE');
    }
  };

  const handleReset = () => {
    if (isAnimating) return;
    setAnimationState('IDLE');
    setSelectedGenre(null);
    setInsertingGenre(null);
    setCardStartPos(null);
    setCarouselIndex(0);
  };

  const isCameraOn = cameraOn;
  const showHologram = cameraOn && (animationState === 'PROJECTING' || animationState === 'READY');

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#050510] via-[#0a0a1a] to-[#050510]" style={{ minHeight: '100vh' }}>
      <style>{heroStyles}</style>
      
      {/* Titre minimaliste */}
      <div className="relative z-10 text-center pt-20 pb-8 px-4">
        <h2 className="text-2xl md:text-3xl font-light text-white/90 tracking-wide">
          Catalogue Films
        </h2>
        <div className="mt-2 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>

      {/* SECTION PRINCIPALE: Projecteur + Carrousel 3D - Wrapper plein écran */}
      <div className="relative z-20" style={{ minHeight: 'auto' }}>
        <div className="relative flex items-center justify-center" style={{ perspective: '2000px', paddingTop: '40px', paddingBottom: '60px', minHeight: 'auto' }}>
          {/* Conteneur centré */}
          <div className="relative mx-auto" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative flex items-center gap-0">
                {/* TÉLÉ PRINCIPALE */}
                <div className="relative">
                  {/* Cadre de la télé - Style moderne ultra-fin */}
                  <div className="relative" style={{
                    width: '1000px',
                    height: '600px'
                  }}>
                    {/* Bordure ultra-fine */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-900 to-black" style={{
                      padding: '8px',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 2px rgba(255,255,255,0.1)'
                    }}>
                      {/* Écran de la télé */}
                      <div className="relative w-full h-full rounded-lg overflow-hidden bg-black" style={{
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9)'
                      }}>
                        {/* Mode OFF - Écran noir avec reflet */}
                        {!isCameraOn && (
                          <div className="relative w-full h-full bg-gradient-to-br from-gray-900/50 to-black flex items-center justify-center">
                            <div className="text-gray-700/30 text-6xl font-bold">MARS.AI</div>
                            {/* Reflet sur écran éteint */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                          </div>
                        )}

                        {/* Mode ON - Affichage du contenu */}
                        {isCameraOn && (
                          <div className="relative w-full h-full bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-[#0a1628] animate-fadeIn">
                            {/* Animation de démarrage */}
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-white animate-pulse" style={{
                                animation: 'expand 0.5s ease-out forwards'
                              }} />
                            </div>
                            {!selectedGenre && (
                              <div className="w-full h-full flex flex-col items-center justify-center p-12">
                                <div className="text-9xl mb-6 animate-pulse">📺</div>
                                <h3 className="text-5xl font-bold mb-4" style={{
                                  background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent'
                                }}>MARS.AI TV</h3>
                                <p className="text-cyan-400/70 text-xl">Sélectionnez un genre avec la télécommande</p>
                                <div className="mt-8 flex gap-3">
                                  {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-cyan-400/40 animate-pulse" style={{
                                      animationDelay: `${i * 0.2}s`
                                    }} />
                                  ))}
                                </div>
                              </div>
                            )}
                            {selectedGenre && (() => {
                              const movies = getGenreMovies();
                              const carouselMovies = getCarouselMovies();
                              const currentMovie = movies[selectedFilmIndex];
                              
                              // Si une vidéo est sélectionnée, afficher le lecteur vidéo
                              if (selectedMovie) {
                                return (
                                  <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-[#0a1628] p-6">
                                    {/* En-tête avec boutons de contrôle */}
                                    <div className="flex items-center justify-between mb-4">
                                      <div>
                                        <h3 className="text-2xl font-bold text-white">{selectedMovie.title}</h3>
                                        <p className="text-sm text-cyan-400/70 mt-1">{selectedMovie.filmmaker} • {selectedMovie.duration}s</p>
                                      </div>
                                      <div className="flex gap-2">
                                        {/* Bouton agrandir/réduire */}
                                        <button
                                          onClick={toggleVideoFullscreen}
                                          className="w-10 h-10 rounded-lg border border-cyan-400/40 bg-black/60 text-cyan-400 hover:bg-cyan-400/20 transition-all flex items-center justify-center"
                                          title={videoFullscreen ? "Réduire" : "Agrandir"}
                                        >
                                          {videoFullscreen ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                                            </svg>
                                          ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0-4h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                            </svg>
                                          )}
                                        </button>
                                        
                                        {/* Bouton retour */}
                                        <button
                                          onClick={closeModal}
                                          className="w-10 h-10 rounded-lg border border-red-400/40 bg-black/60 text-red-400 hover:bg-red-400/20 transition-all flex items-center justify-center"
                                          title="Retour"
                                        >
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                    
                                    {/* Lecteur vidéo */}
                                    <div className="flex-1 flex items-center justify-center">
                                      <div className="w-full rounded-lg overflow-hidden border border-cyan-400/30" style={{
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.7)'
                                      }}>
                                        <video 
                                          className="w-full h-full bg-black" 
                                          src={selectedMovie.video} 
                                          controls 
                                          autoPlay
                                          style={{
                                            maxHeight: '450px'
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              
                              return (
                                <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-[#0a1628] p-8">
                                  {/* Header avec MarsAI et Film sélectionnés */}
                                  <div className="flex items-center justify-between mb-6">
                                    <div>
                                      <h2 className="text-3xl font-bold text-white">MarsAI</h2>
                                      <p className="text-xs text-cyan-400/60">Festival de courts-métrages IA</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-gray-400">Film sélectionnés 2026</p>
                                    </div>
                                  </div>
                                  
                                  {/* Grille de tous les films avec taille adaptative */}
                                  <div className="flex-1 flex flex-col items-center justify-center px-6">
                                    {/* Calcul dynamique de la taille */}
                                    <div className={`grid gap-4 mb-8 w-full ${
                                      movies.length <= 3 ? 'grid-cols-3 max-w-4xl' :
                                      movies.length <= 4 ? 'grid-cols-4 max-w-5xl' :
                                      movies.length <= 6 ? 'grid-cols-3 max-w-5xl' :
                                      'grid-cols-4 max-w-6xl'
                                    }`}>
                                      {movies.map((movie, idx) => {
                                        const isSelected = idx === selectedFilmIndex;
                                        // Calculer la taille dynamiquement
                                        const cardSize = movies.length <= 3 ? { width: '260px', height: '340px' } :
                                                        movies.length <= 4 ? { width: '220px', height: '300px' } :
                                                        movies.length <= 6 ? { width: '200px', height: '280px' } :
                                                        { width: '180px', height: '250px' };
                                        return (
                                          <div
                                            key={movie.id}
                                            className={`relative group cursor-pointer transition-all duration-300 ${
                                              isSelected ? 'scale-105 z-10' : 'scale-100 opacity-80 hover:opacity-100'
                                            }`}
                                            onClick={() => setSelectedFilmIndex(idx)}
                                            style={{
                                              width: cardSize.width,
                                              height: cardSize.height
                                            }}
                                          >
                                            {/* Carte film 3D avec effets améliorés */}
                                            <div className={`relative w-full h-full rounded-xl overflow-hidden border-2 transition-all ${
                                              isSelected ? 'border-cyan-400 shadow-cyan-400/60' : 'border-cyan-400/20'
                                            }`} style={{
                                              boxShadow: isSelected 
                                                ? '0 0 30px rgba(34, 211, 238, 0.6), 0 15px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(34, 211, 238, 0.1)'
                                                : '0 8px 20px rgba(0,0,0,0.5), 0 0 10px rgba(34, 211, 238, 0.1)'
                                            }}>
                                              <img
                                                src={movie.thumbnail}
                                                alt={movie.title}
                                                className="w-full h-full object-cover"
                                              />
                                              
                                              {/* Overlay gradient */}
                                              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                              
                                              {/* Titre du film */}
                                              <div className="absolute bottom-3 left-3 right-3">
                                                <h4 className="text-sm font-bold text-white truncate">{movie.title}</h4>
                                              </div>
                                              
                                              {/* Badge SÉLECTIONNÉ */}
                                              {isSelected && (
                                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-cyan-500 text-white text-[10px] font-bold animate-pulse">
                                                  ▶ SÉLECTIONNÉ
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                    
                                    {/* Info film et bouton lecture */}
                                    <div className="text-center">
                                      <p className="text-gray-400 text-sm mb-4">
                                        Film {selectedFilmIndex + 1} / {movies.length} - {selectedGenre.name.toUpperCase()}
                                      </p>
                                      <button
                                        onClick={playFilm}
                                        className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                                      >
                                        {currentMovie.title}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                            {/* Reflet sur écran allumé - Ne pas afficher si vidéo en lecture */}
                            {!selectedMovie && (
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/3 via-transparent to-transparent pointer-events-none" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pied de la télé */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-transparent via-gray-800 to-transparent rounded-full" />
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-3 bg-gradient-to-b from-gray-900 to-transparent rounded-t-lg" />
                    
                    {/* LED d'alimentation en bas */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full transition-all ${
                        cameraOn ? 'bg-cyan-400 animate-pulse' : 'bg-gray-700'
                      }`} style={{
                        boxShadow: cameraOn ? '0 0 10px rgba(34, 211, 238, 0.8)' : 'none'
                      }} />
                      <span className="text-[10px] text-gray-600 font-mono">{cameraOn ? 'ON' : 'STANDBY'}</span>
                    </div>
                  </div>
                </div>

                {/* TÉLÉCOMMANDE */}
                <div className="relative" style={{
                  width: '240px',
                  height: '600px'
                }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl border border-gray-700/50 flex flex-col" style={{
                    boxShadow: '0 10px 30px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)'
                  }}>
                    {/* Bouton Power - En haut */}
                    <div className="px-6 pt-6 pb-4">
                      <button
                        onClick={toggleCamera}
                        className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all cursor-pointer ${
                          cameraOn
                            ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-red-500/50'
                            : 'bg-gradient-to-br from-green-600 to-green-700 text-white shadow-green-500/50'
                        }`}
                        style={{
                          boxShadow: cameraOn ? '0 4px 15px rgba(239, 68, 68, 0.5)' : '0 4px 15px rgba(34, 197, 94, 0.5)'
                        }}
                      >
                        ⏻ {cameraOn ? 'OFF' : 'ON'}
                      </button>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mx-6 mb-4" />

                    {/* PAVÉ DIRECTIONNEL - Position haute */}
                    <div className="px-6 pb-4">
                      <p className="text-xs text-gray-500 uppercase mb-3 text-center tracking-wider">Navigation</p>
                      <div className="relative w-44 h-44 mx-auto">
                        {/* Haut */}
                        <button
                          onClick={navigateUp}
                          disabled={!cameraOn || !selectedGenre}
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-t-xl bg-gradient-to-b from-gray-700 to-gray-800 text-white text-2xl font-bold hover:from-cyan-600 hover:to-cyan-700 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                          }}
                          title="Naviguer vers le haut"
                        >
                          ▲
                        </button>
                        
                        {/* Bas */}
                        <button
                          onClick={navigateDown}
                          disabled={!cameraOn || !selectedGenre}
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-b-xl bg-gradient-to-b from-gray-700 to-gray-800 text-white text-2xl font-bold hover:from-cyan-600 hover:to-cyan-700 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                          }}
                          title="Naviguer vers le bas"
                        >
                          ▼
                        </button>
                        
                        {/* Gauche */}
                        <button
                          onClick={navigateLeft}
                          disabled={!cameraOn || !selectedGenre}
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-l-xl bg-gradient-to-r from-gray-700 to-gray-800 text-white text-2xl font-bold hover:from-cyan-600 hover:to-cyan-700 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                          }}
                          title="Naviguer vers la gauche"
                        >
                          ◀
                        </button>
                        
                        {/* Droite */}
                        <button
                          onClick={navigateRight}
                          disabled={!cameraOn || !selectedGenre}
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-r-xl bg-gradient-to-r from-gray-700 to-gray-800 text-white text-2xl font-bold hover:from-cyan-600 hover:to-cyan-700 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                          }}
                          title="Naviguer vers la droite"
                        >
                          ▶
                        </button>
                        
                        {/* OK au centre */}
                        <button
                          onClick={selectedMovie ? closeModal : playFilm}
                          disabled={!cameraOn || !selectedGenre}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white text-lg font-bold hover:from-green-400 hover:to-green-500 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                          style={{
                            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.5)'
                          }}
                        >
                          OK
                        </button>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mx-6 mb-4" />

                    {/* Boutons de genres - Position centrale */}
                    <div className="px-6 pb-4">
                      <p className="text-xs text-gray-500 uppercase mb-3 text-center tracking-wider">Genres</p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {GENRES.slice(1).map((genre, idx) => (
                          <button
                            key={genre.name}
                            onClick={() => cameraOn && handleCardClick(genre, idx + 1)}
                            disabled={!cameraOn || isAnimating}
                            className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                              selectedGenre?.name === genre.name
                                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white scale-105 border-2 border-cyan-300'
                                : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 border border-gray-700'
                            } disabled:opacity-30 disabled:cursor-not-allowed`}
                            style={{
                              boxShadow: selectedGenre?.name === genre.name
                                ? '0 0 15px rgba(34, 211, 238, 0.5)'
                                : 'none'
                            }}
                          >
                            <div className="text-xl">{genre.icon}</div>
                            <div className="text-[9px]">{genre.name}</div>
                          </button>
                        ))}
                      </div>
                      {/* Bouton Tous */}
                      <button
                        onClick={() => cameraOn && handleCardClick(GENRES[0], 0)}
                        disabled={!cameraOn || isAnimating}
                        className={`w-full mt-2.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          selectedGenre?.name === "Tous"
                            ? 'bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white scale-105 border-2 border-violet-300'
                            : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 border border-gray-700'
                        } disabled:opacity-30 disabled:cursor-not-allowed`}
                        style={{
                          boxShadow: selectedGenre?.name === "Tous"
                            ? '0 0 15px rgba(168, 85, 247, 0.5)'
                            : 'none'
                        }}
                      >
                        <div className="text-lg">{GENRES[0].icon}</div>
                        <div>Tous</div>
                      </button>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mx-6 mb-4" />

                    {/* Boutons média - Position basse */}
                    <div className="px-6 pb-4">
                      <p className="text-xs text-gray-500 uppercase mb-3 text-center tracking-wider">Média</p>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={prevFilm}
                          disabled={!cameraOn || !selectedGenre}
                          className="w-14 h-14 rounded-xl bg-gray-800/80 text-violet-400 hover:bg-violet-600 hover:text-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xl border border-gray-700"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                          }}
                        >
                          🔀
                        </button>
                        <button
                          onClick={playFilm}
                          disabled={!cameraOn || !selectedGenre}
                          className="w-14 h-14 rounded-xl bg-gray-800/80 text-gray-400 hover:bg-cyan-600 hover:text-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xl border border-gray-700"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                          }}
                        >
                          ⏸
                        </button>
                        <button
                          onClick={nextFilm}
                          disabled={!cameraOn || !selectedGenre}
                          className="w-14 h-14 rounded-xl bg-gray-800/80 text-violet-400 hover:bg-violet-600 hover:text-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xl border border-gray-700"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                          }}
                        >
                          🎬
                        </button>
                      </div>
                    </div>

                    {/* Bouton Retour - Toujours en bas */}
                    {selectedMovie && (
                      <div className="px-6 pb-4">
                        <button
                          onClick={closeModal}
                          className="w-full py-3 rounded-xl bg-gradient-to-br from-red-600/80 to-red-700/80 text-white text-sm font-semibold hover:from-red-500 hover:to-red-600 transition-all cursor-pointer shadow-lg"
                          style={{
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                          }}
                        >
                          ⬅️ Retour
                        </button>
                      </div>
                    )}

                    {/* Spacer pour pousser les éléments vers le haut si pas de modal */}
                    <div className="flex-1" />

                    {/* Détails de la télécommande */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-gray-700" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Reflet circulaire au sol - Style de l'image */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-20">
            {/* Cercle lumineux principal */}
            <div className="relative w-[1000px] h-40">
              {/* Ellipse large */}
              <div className="absolute inset-0 rounded-full" style={{
                background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.3) 0%, rgba(34, 211, 238, 0.15) 30%, transparent 70%)',
                transform: 'perspective(400px) rotateX(75deg)',
                filter: 'blur(20px)'
              }} />
              
              {/* Point lumineux central */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full" style={{
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0.4) 40%, transparent 70%)',
                filter: 'blur(10px)',
                boxShadow: '0 0 60px rgba(34, 211, 238, 0.6)'
              }} />
              
              {/* Anneau extérieur */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/20" style={{
                transform: 'perspective(400px) rotateX(75deg)',
                boxShadow: 'inset 0 0 30px rgba(34, 211, 238, 0.2)'
              }} />
            </div>
          </div>
          {/* Fin conteneur 3D unifié */}
        </div>
        {/* Fin wrapper perspective */}
      </div>
      {/* Fin section principale */}
    </div>
  );
}
