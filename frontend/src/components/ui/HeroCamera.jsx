import React, { useState, useEffect, useRef } from "react";

// Import des animations globales pour HeroCamera
import { heroAnimationStyles } from "../sections/heroAnimations";

// Import des images SD
import sdScifi from "../../assets/images/sd_scifi.png";
import sdAction from "../../assets/images/sd_action.png";
import sdDrama from "../../assets/images/sd_drama.png";
import sdComedy from "../../assets/images/sd_comedy.png";

// Données des films
const DEMO_MOVIES = [
  {
    id: 1,
    title: "L'Éveil Numérique",
    filmmaker: "Sophie Laurent",
    duration: 60,
    genre: "Fiction",
    thumbnail: "https://picsum.photos/seed/film1/400/600",
    video: "/video/video4.mp4",
  },
  {
    id: 2,
    title: "Rêves de Silicone",
    filmmaker: "Marc Dubois",
    duration: 45,
    genre: "Fiction",
    thumbnail: "https://picsum.photos/seed/film2/400/600",
    video: "/video/video4.mp4",
  },
  {
    id: 3,
    title: "Connexions",
    filmmaker: "Lisa Chen",
    duration: 55,
    genre: "Documentaire",
    thumbnail: "https://picsum.photos/seed/film3/400/600",
    video: "/video/video4.mp4",
  },
  {
    id: 4,
    title: "Horizons Artificiels",
    filmmaker: "Jean Martin",
    duration: 50,
    genre: "Animation",
    thumbnail: "https://picsum.photos/seed/film4/400/600",
    video: "/video/video4.mp4",
  },
  {
    id: 5,
    title: "Nuit Digitale",
    filmmaker: "Emma Dubois",
    duration: 58,
    genre: "Fiction",
    thumbnail: "https://picsum.photos/seed/film5/400/600",
    video: "/video/video4.mp4",
  },
  {
    id: 6,
    title: "Mémoires d'IA",
    filmmaker: "Thomas Chen",
    duration: 52,
    genre: "Documentaire",
    thumbnail: "https://picsum.photos/seed/film6/400/600",
    video: "/video/video4.mp4",
  },
  {
    id: 7,
    title: "Synthèse Créative",
    filmmaker: "Marie Laurent",
    duration: 48,
    genre: "Animation",
    thumbnail: "https://picsum.photos/seed/film7/400/600",
    video: "/video/video4.mp4",
  },
  {
    id: 8,
    title: "Code & Cinéma",
    filmmaker: "Alex Martin",
    duration: 60,
    genre: "Clip",
    thumbnail: "https://picsum.photos/seed/film8/400/600",
    video: "/video/video4.mp4",
  },
];

const GENRES = [
  {
    name: "Tous",
    icon: "⭐",
    color: "from-violet-500 to-fuchsia-600",
    image: sdScifi,
  },
  {
    name: "Fiction",
    icon: "🎭",
    color: "from-cyan-500 to-violet-500",
    image: sdScifi,
  },
  {
    name: "Documentaire",
    icon: "📹",
    color: "from-violet-500 to-cyan-500",
    image: sdDrama,
  },
  {
    name: "Animation",
    icon: "✨",
    color: "from-cyan-400 to-violet-600",
    image: sdComedy,
  },
  {
    name: "Clip",
    icon: "🎵",
    color: "from-violet-600 to-cyan-400",
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
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0]);
  const [carouselPage, setCarouselPage] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getGenreMovies = () => {
    if (!selectedGenre || selectedGenre.name === "Tous") return DEMO_MOVIES;
    return DEMO_MOVIES.filter((m) => m.genre === selectedGenre.name);
  };

  const getCarouselMovies = () => {
    const movies = getGenreMovies();
    const start = carouselPage * 3;
    return movies.slice(start, start + 3);
  };

  const nextPage = () => {
    const movies = getGenreMovies();
    const maxPage = Math.max(0, Math.ceil(movies.length / 3) - 1);
    setCarouselPage((p) => Math.min(maxPage, p + 1));
  };

  const prevPage = () => {
    setCarouselPage((p) => Math.max(0, p - 1));
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <style>{heroStyles + heroAnimationStyles}</style>
      <div className="mb-6 flex items-center gap-4 overflow-x-auto">
        {GENRES.map((g) => (
          <button
            key={g.name}
            onClick={() => {
              setSelectedGenre(g);
              setCarouselPage(0);
            }}
            className={`rounded-full px-4 py-2 text-sm font-bold transition mr-2 ${
              selectedGenre.name === g.name
                ? "bg-white text-black"
                : "bg-white/6 text-white/80"
            }`}
          >
            {g.icon} {g.name}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button
            onClick={prevPage}
            className="rounded-full bg-white/6 px-3 py-2"
          >
            ◀
          </button>
          <button
            onClick={nextPage}
            className="rounded-full bg-white/6 px-3 py-2"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {getCarouselMovies().map((m, i) => (
          <div
            key={m.id}
            className="rounded-2xl overflow-hidden border border-white/10 bg-black/30 p-3 card-levitating"
          >
            <img
              src={m.thumbnail}
              alt={m.title}
              className="w-full h-48 object-cover rounded-lg crisp backface-hidden"
            />
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold hologram-title">
                  {m.title}
                </div>
                <div className="text-xs text-white/60">
                  {m.filmmaker} • {m.duration}s
                </div>
              </div>
              <button
                onClick={() => setSelectedMovie(m)}
                className="rounded-full bg-white px-3 py-2 text-sm font-bold text-black"
              >
                Voir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal simple */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="bg-black rounded-xl overflow-hidden w-full max-w-3xl">
            <div className="p-4 flex justify-between items-center border-b border-white/10">
              <div className="text-lg font-bold">{selectedMovie.title}</div>
              <button
                onClick={() => setSelectedMovie(null)}
                className="text-white/60"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <video
                src={selectedMovie.video}
                controls
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
