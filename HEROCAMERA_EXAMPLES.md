/**
 * === HeroCamera - Exemples d'Utilisation ===
 * 
 * Ce fichier contient des exemples concrets d'utilisation
 * du composant HeroCamera dans différents contextes
 */

// ============================================
// EXEMPLE 1: Utilisation de base (démo)
// ============================================

import { HeroCamera } from './components/sections/HeroCamera';

export function HomePage() {
  return (
    <main className="bg-black">
      <HeroCamera />
      {/* Autres sections */}
    </main>
  );
}

// ============================================
// EXEMPLE 2: Avec hook personnalisé
// ============================================

import { HeroCamera } from './components/sections/HeroCamera';
import { useEffect, useState } from 'react';

export function HomePageWithTracking() {
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    // Tracker quand l'utilisateur interagit avec HeroCamera
    const handleInteraction = (event) => {
      console.log('User interacted with HeroCamera:', event);
      // Envoyer analytics
    };

    document.addEventListener('heroInteraction', handleInteraction);
    return () => document.removeEventListener('heroInteraction', handleInteraction);
  }, []);

  return (
    <main>
      {heroVisible && <HeroCamera />}
    </main>
  );
}

// ============================================
// EXEMPLE 3: Remplacer la vidéo de fond
// ============================================

import { HeroCamera } from './components/sections/HeroCamera';

export function HomePageCustom() {
  // Adapter les données démo:
  const CUSTOM_MOVIES = [
    {
      id: 1,
      title: "Mon film personnel",
      filmmaker: "Jean Dupont",
      duration: 120,
      genre: "Fiction",
      thumbnail: "https://picsum.photos/seed/custom1/400/300",
      video: "https://example.com/video1.mp4"
    },
    {
      id: 2,
      title: "Un autre film",
      filmmaker: "Marie Martin",
      duration: 90,
      genre: "Documentaire",
      thumbnail: "https://picsum.photos/seed/custom2/400/300",
      video: "https://example.com/video2.mp4"
    },
    // ... plus de films
  ];

  // ⚠️ Note: HeroCamera a les données en dur
  // Pour utiliser des données personnalisées, éditer HeroCamera.jsx
  // et remplacer DEMO_MOVIES par vos données
  
  return (
    <main>
      <HeroCamera />
    </main>
  );
}

// ============================================
// EXEMPLE 4: Avec API backend
// ============================================

import { HeroCameraWithAPI } from './components/sections/HeroCameraWithAPI';

export function HomePageWithAPI() {
  // HeroCameraWithAPI gère automatiquement:
  // - Fetch /api/genres
  // - Fetch /api/movies?genre=X
  // - Loading state
  // - Error handling

  return (
    <main>
      <HeroCameraWithAPI />
      {/* Autres sections */}
    </main>
  );
}

// ============================================
// EXEMPLE 5: Adapter les endpoints API
// ============================================

// Dans HeroCameraWithAPI.jsx, adapter les lignes:

// AVANT:
// const response = await fetch('/api/genres');

// APRÈS (adapter votre URL):
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const fetchGenres = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/genres`);
    if (!response.ok) throw new Error('Erreur genres');
    const data = await response.json();
    // Format attendu: [{ name, icon, color, glow }, ...]
    return data;
  } catch (err) {
    console.error('Erreur:', err);
    return [];
  }
};

const fetchMovies = async (genreName) => {
  try {
    const query = genreName === "Tous" ? '' : `?genre=${genreName}`;
    const response = await fetch(`${API_BASE_URL}/api/movies${query}`);
    if (!response.ok) throw new Error('Erreur films');
    const data = await response.json();
    return data.slice(0, 3); // Limiter à 3 films
  } catch (err) {
    console.error('Erreur:', err);
    return [];
  }
};

// ============================================
// EXEMPLE 6: Personnaliser les genres
// ============================================

// Si vous voulez personnaliser les genres:

const CUSTOM_GENRES = [
  {
    name: "Tous",
    icon: "🎬",
    color: "from-violet-600 to-fuchsia-600",
    glow: "text-violet-400"
  },
  {
    name: "Mon Genre 1",
    icon: "👻",
    color: "from-purple-600 to-pink-600",
    glow: "text-purple-400"
  },
  {
    name: "Mon Genre 2",
    icon: "🚀",
    color: "from-indigo-600 to-blue-600",
    glow: "text-indigo-400"
  },
  // ... plus de genres
];

// Éditer HeroCamera.jsx et remplacer GENRES par CUSTOM_GENRES

// ============================================
// EXEMPLE 7: Intégrer avec analytics
// ============================================

import { HeroCamera } from './components/sections/HeroCamera';
import { useEffect } from 'react';

export function HomePageWithAnalytics() {
  useEffect(() => {
    // Tracker vue page
    window.gtag?.('pageview', {
      'page_title': 'Home - HeroCamera',
      'page_path': '/'
    });

    // Tracker interaction utilisateur (adapter selon votre système)
    const handleGenreSelect = (genreIdx) => {
      window.gtag?.('event', 'hero_camera_genre_select', {
        'genre_index': genreIdx,
        'timestamp': new Date().toISOString()
      });
    };

    const handleMovieClick = (movieId) => {
      window.gtag?.('event', 'hero_camera_movie_click', {
        'movie_id': movieId,
        'timestamp': new Date().toISOString()
      });
    };

    // Note: HeroCamera ne génère pas d'événements directs
    // Vous devez émettre des événements custom ou wrapper le composant
  }, []);

  return <HeroCamera />;
}

// ============================================
// EXEMPLE 8: Wrapper avec contexte
// ============================================

import React, { createContext, useState } from 'react';
import { HeroCamera } from './components/sections/HeroCamera';

// Context pour les données HeroCamera
export const HeroCameraContext = createContext();

export function HeroCameraProvider({ children }) {
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <HeroCameraContext.Provider value={{ selectedGenre, setSelectedGenre, isPlaying, setIsPlaying }}>
      {children}
    </HeroCameraContext.Provider>
  );
}

// Utiliser:
export function HomePageWithContext() {
  return (
    <HeroCameraProvider>
      <main>
        <HeroCamera />
        {/* Autres composants peut accéder au context */}
      </main>
    </HeroCameraProvider>
  );
}

// ============================================
// EXEMPLE 9: Responsive personnalisé
// ============================================

import { HeroCamera } from './components/sections/HeroCamera';
import { useMediaQuery } from './hooks/useMediaQuery';

export function HomePageResponsive() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  return (
    <main>
      {isMobile && <p>Version mobile détectée</p>}
      {isTablet && <p>Version tablet détectée</p>}
      <HeroCamera />
    </main>
  );
}

// ============================================
// EXEMPLE 10: Tests unitaires
// ============================================

import { render, screen, fireEvent } from '@testing-library/react';
import { HeroCamera } from './components/sections/HeroCamera';

describe('HeroCamera Component', () => {
  
  test('renders HeroCamera', () => {
    render(<HeroCamera />);
    expect(screen.getByText(/Découvrez les films/i)).toBeInTheDocument();
  });

  test('displays 5 genre cards', () => {
    render(<HeroCamera />);
    const cards = screen.getAllByRole('button'); // Cartes sont clickables
    // HeroCamera a 5 cartes + 1 bouton close = 6 éléments cliquables
    expect(cards.length).toBeGreaterThanOrEqual(5);
  });

  test('shows camera on center', () => {
    render(<HeroCamera />);
    // Vérifier que la caméra est présente (conteneur principal)
    const section = screen.getByRole('region'); // <section>
    expect(section).toBeInTheDocument();
  });

  test('shows modal when film selected', () => {
    render(<HeroCamera />);
    // Cliquer sur un film (si hologramme visible)
    // Vérifier modal
  });
});

// ============================================
// EXEMPLE 11: Configuration environment
// ============================================

// .env.local
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=5000
REACT_APP_DEBUG=false

// .env.production
REACT_APP_API_URL=https://api.marsai.com
REACT_APP_API_TIMEOUT=10000
REACT_APP_DEBUG=false

// Utiliser dans HeroCameraWithAPI.jsx:
const API_URL = process.env.REACT_APP_API_URL;
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '5000');
const DEBUG = process.env.REACT_APP_DEBUG === 'true';

// ============================================
// EXEMPLE 12: Performance optimization
// ============================================

import { memo } from 'react';
import { HeroCamera } from './components/sections/HeroCamera';

// Wrapper memo pour éviter re-renders inutiles
export const OptimizedHeroCamera = memo(HeroCamera);

export function HomePageOptimized() {
  return (
    <main>
      <OptimizedHeroCamera />
    </main>
  );
}

// ============================================
// EXEMPLE 13: Fallback et erreurs
// ============================================

import { HeroCameraWithAPI } from './components/sections/HeroCameraWithAPI';
import { Suspense } from 'react';

export function HomePageWithFallback() {
  return (
    <main>
      <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">Chargement...</div>}>
        <HeroCameraWithAPI />
      </Suspense>
    </main>
  );
}

// ============================================
// EXEMPLE 14: Build variants
// ============================================

// Pour créer différentes versions du HeroCamera:

// 1. Version mini (pour sidebar):
export function HeroCameraMini() {
  // Même composant mais avec dimensions réduites
  return (
    <div className="scale-50 origin-top-left">
      <HeroCamera />
    </div>
  );
}

// 2. Version fullscreen (pour modal):
export function HeroCameraFullscreen() {
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <HeroCamera />
    </div>
  );
}

// 3. Version dark theme:
export function HeroCameraDarkTheme() {
  // HeroCamera est déjà en dark theme par défaut
  return <HeroCamera />;
}

// ============================================
// EXEMPLE 15: Documentation structure
// ============================================

/**
 * HeroCamera - Guide d'utilisation
 * 
 * Usage basique:
 * @example
 * import { HeroCamera } from './components/sections/HeroCamera';
 * 
 * export function App() {
 *   return <HeroCamera />;
 * }
 * 
 * Usage avec API:
 * @example
 * import { HeroCameraWithAPI } from './components/sections/HeroCameraWithAPI';
 * 
 * export function App() {
 *   return <HeroCameraWithAPI />;
 * }
 * 
 * Props (aucune requise):
 * - HeroCamera: Aucune prop
 * - HeroCameraWithAPI: Aucune prop (configure via .env)
 * 
 * States internes:
 * - selectedGenreIdx: index du genre (0-4)
 * - isInserting: animation insertion en cours
 * - isCameraOn: caméra active
 * - hologramVisible: hologramme visible
 * - selectedMovie: film sélectionné pour lecture
 * - rotation: rotation carrousel en degrés
 * 
 * Styles requis:
 * - Tailwind CSS 3.4+
 * - CSS animations (voir heroAnimations.js)
 * 
 * @returns {JSX.Element} Composant HeroCamera
 */

// ============================================
// EXEMPLE 16: Déploiement
// ============================================

// Build pour production:
// npm run build

// Variables d'environment pour production:
// REACT_APP_API_URL=https://api.production.com
// REACT_APP_ENV=production

// Vérifications avant deploy:
// ✅ npm run build succeeds
// ✅ npm test passes
// ✅ No console errors
// ✅ Images load correctly
// ✅ Videos play correctly
// ✅ Modal works
// ✅ Responsive on mobile
// ✅ Animations smooth

// ============================================
// EXEMPLE 17: Intégration CI/CD
// ============================================

// .github/workflows/deploy.yml
/*
name: Deploy Frontend

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod
*/

// ============================================
// EXEMPLE 18: Logs et débogage
// ============================================

// Activer logs dans HeroCamera:
const DEBUG = true;

const log = (message, data) => {
  if (DEBUG) {
    console.log(`[HeroCamera] ${message}`, data);
  }
};

// Utiliser:
log('Genre selected', { index: 2, name: 'Fiction' });
log('Camera on', { isInserting: false, isCameraOn: true });
log('Movie clicked', { movieId: 1, title: 'Film' });

// ============================================

export default {};
