# Guide d'Intégration HeroCamera

## 📦 Fichiers livrés

```
src/components/sections/
├── HeroCamera.jsx              # Version autonome (données intégrées)
├── HeroCameraWithAPI.jsx       # Version API (données du backend)
└── HEROCAMERA_GUIDE.md         # Documentation complète
```

## 🚀 Installation Rapide

### Option 1: Version démo (HeroCamera.jsx)

```jsx
// src/pages/Home.jsx
import { HeroCamera } from '../components/sections/HeroCamera';

export default function Home() {
  return (
    <main>
      <HeroCamera />
      {/* Autres sections */}
    </main>
  );
}
```

**Avantages:**
- ✅ Fonctionnel immédiatement
- ✅ Pas de dépendance API
- ✅ Parfait pour les démos
- ✅ Données en dur (DEMO_MOVIES)

### Option 2: Version API (HeroCameraWithAPI.jsx)

```jsx
// src/pages/Home.jsx
import { HeroCameraWithAPI } from '../components/sections/HeroCameraWithAPI';

export default function Home() {
  return (
    <main>
      <HeroCameraWithAPI />
      {/* Autres sections */}
    </main>
  );
}
```

**Avantages:**
- ✅ Données dynamiques du backend
- ✅ Scalable pour production
- ✅ Gestion erreurs/loading
- ✅ Format API flexible

## 📡 Endpoints API requis

Pour la version API, implémentez ces endpoints dans votre backend:

### 1. GET /api/genres

**Réponse:**
```json
[
  {
    "name": "Tous",
    "icon": "🎬",
    "color": "from-violet-600 to-fuchsia-600",
    "glow": "text-violet-400"
  },
  {
    "name": "Fiction",
    "icon": "🎭",
    "color": "from-blue-600 to-cyan-600",
    "glow": "text-blue-400"
  },
  // ... 5 genres total
]
```

### 2. GET /api/movies

**Query params:**
- `genre` (optionnel): nom du genre (ex: "Fiction")
- `limit` (optionnel): nombre de films (défaut: 3)

**Réponse:**
```json
[
  {
    "id": 1,
    "title": "L'Éveil Numérique",
    "filmmaker_name": "Sophie Laurent",
    "duration": 60,
    "genre": "Fiction",
    "thumbnail_url": "https://...",
    "video_url": "https://..."
  },
  // ... autres films
]
```

## 🎨 Format des données

### Genres
```typescript
interface Genre {
  name: string;              // "Fiction", "Documentaire", etc.
  icon: string;             // Emoji: "🎭", "📹", etc.
  color: string;            // Gradient Tailwind: "from-X-600 to-Y-600"
  glow: string;             // Couleur texte: "text-X-400"
}
```

### Films
```typescript
interface Film {
  id: number;
  title: string;
  filmmaker_name: string;
  duration: number;         // en secondes
  genre: string;           // doit matcher un nom de genre
  thumbnail_url: string;   // image cover
  video_url: string;       // lien vidéo
  // optionnel:
  synopsis?: string;
}
```

## 🔧 Personnalisation

### Adapter les endpoints API

```jsx
// HeroCameraWithAPI.jsx - ligne ~50
const fetchGenres = async () => {
  try {
    // ❌ Changer ça:
    // const response = await fetch('/api/genres');
    
    // ✅ Vers votre URL:
    const response = await fetch(`${process.env.REACT_APP_API_URL}/genres`);
    
    const data = await response.json();
    setGenres(data);
  } catch (err) {
    // ...
  }
};
```

### Adapter les clés de films

```jsx
// Si vos films ont des clés différentes:
const movies = data.map(m => ({
  id: m.film_id,              // Si 'id' s'appelle 'film_id'
  title: m.name,              // Si 'title' s'appelle 'name'
  filmmaker_name: m.director, // Si différent
  video_url: m.video_link,    // Adapter les noms
  // ...
}));
```

### Couleurs Tailwind personnalisées

```jsx
// Ajouter dans tailwind.config.js:
module.exports = {
  theme: {
    colors: {
      // Vos couleurs
    },
    extend: {
      colors: {
        // Nouvelles couleurs
      }
    }
  }
};
```

## ⚡ Performance

### Optimisations déjà appliquées:
- ✅ CSS transforms GPU-accelerated
- ✅ Animations sur transform/opacity (performant)
- ✅ Lazy loading d'images thumbnail
- ✅ Pas de librairies externes lourdes
- ✅ Debouncing automatique (animation check)

### Optimisations recommandées:

1. **Lazy load des vidéos:**
```jsx
<video
  src={selectedMovie.video_url}
  preload="none"  // Charger à la demande
  controls
  autoPlay
/>
```

2. **Image optimization:**
```jsx
<img
  src={movie.thumbnail_url}
  alt={movie.title}
  loading="lazy"
  decoding="async"
/>
```

3. **Cache API:**
```jsx
const [moviesCache, setMoviesCache] = useState({});

const fetchMoviesByGenre = async (genreName) => {
  if (moviesCache[genreName]) {
    setMovies(moviesCache[genreName]);
    return;
  }
  // Fetch...
};
```

## 🎯 États et transitions

```
┌─────────────────────────────────────────────┐
│           IDLE                              │
│  selectedGenreIdx: 0                        │
│  isInserting: false                         │
│  isCameraOn: false                          │
│  hologramVisible: false                     │
└─────────────────────────────────────────────┘
            ↓ [Clic carte SD]
┌─────────────────────────────────────────────┐
│           INSERTING (1.2s)                  │
│  isInserting: true                          │
│  Animation: carte vers caméra               │
│  Animation: fente s'illumine                │
└─────────────────────────────────────────────┘
            ↓ [Après 1.2s]
┌─────────────────────────────────────────────┐
│           ACTIVE                            │
│  isCameraOn: true                           │
│  hologramVisible: true                      │
│  Affichage: 3 films du genre                │
│  Animation: hologramme apparaît             │
└─────────────────────────────────────────────┘
            ↓ [Clic film]
┌─────────────────────────────────────────────┐
│           PLAYING                           │
│  selectedMovie: film sélectionné            │
│  Modal: ouverte avec vidéo                  │
└─────────────────────────────────────────────┘
            ↓ [Clic close]
┌─────────────────────────────────────────────┐
│           ACTIVE (retour)                   │
│  selectedMovie: null                        │
│  Reste: isCameraOn, hologramVisible actifs  │
└─────────────────────────────────────────────┘
```

## 🌐 Intégration Backend

### Node/Express exemple:

```javascript
// routes/genres.js
app.get('/api/genres', (req, res) => {
  const genres = [
    { name: "Tous", icon: "🎬", color: "from-violet-600 to-fuchsia-600", glow: "text-violet-400" },
    { name: "Fiction", icon: "🎭", color: "from-blue-600 to-cyan-600", glow: "text-blue-400" },
    // ...
  ];
  res.json(genres);
});

// routes/movies.js
app.get('/api/movies', async (req, res) => {
  const { genre } = req.query;
  
  let query = {};
  if (genre && genre !== "Tous") {
    query.genre = genre;
  }
  
  const movies = await Movie.find(query).limit(3);
  res.json(movies);
});
```

## 🧪 Tests

### Test manuel:

1. **Charger page:** Vérifier HeroCamera visible
2. **Clic carte:** Animation insertion (1.2s)
3. **Écran caméra:** Passe de noir à cyan
4. **Hologramme:** Apparaît avec 3 films
5. **Clic film:** Modal ouvre
6. **Clic close:** Modal ferme
7. **Clic carte différente:** Réinsère, change films

### Tests edge cases:

- ✅ API lente (afficher loading)
- ✅ API erreur (afficher message)
- ✅ Aucun film (masquer hologramme)
- ✅ Clic rapide cartes (pas de bug)
- ✅ Recharge page (état reset)

## 🐛 Débogage

### Console logs:

Ajouter dans HeroCamera.jsx/HeroCameraWithAPI.jsx:

```javascript
const handleCardClick = (genreIdx) => {
  console.log('🎬 Card clicked:', genreIdx, GENRES[genreIdx].name);
  // ...
};

const insertCard = (genreIdx) => {
  console.log('📥 Inserting card...');
  // ...
  console.log('✅ Camera on! Films:', movies);
};
```

### React DevTools:

1. Inspecteur props: Vérifier selectedGenreIdx, isInserting, isCameraOn
2. Hook values: Voir état du composant
3. Breakpoints: Pause sur setState

### Erreurs courantes:

| Erreur | Cause | Solution |
|--------|-------|----------|
| Hologramme noir | Pas de films | Vérifier API films |
| Caméra ne s'illumine pas | CSS manquant | Vérifier HeroCamera.jsx styles |
| Cartes immobiles | Animation bloquée | Vérifier isInserting state |
| Vidéo ne joue pas | URL incorrecte | Vérifier video_url format |

## 📱 Responsive Design

```css
/* Desktop */
@media (min-width: 1024px) {
  .carousel { width: 500px; }
  .camera { width: 256px; }
  .hologram { grid-cols: 3; }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .carousel { width: 400px; }
  .camera { width: 200px; }
  .hologram { grid-cols: 3; gap: 3; }
}

/* Mobile */
@media (max-width: 767px) {
  .carousel { width: 300px; }
  .camera { width: 160px; }
  .hologram { grid-cols: 1; }
}
```

## 🎓 Concepts avancés

### 3D Perspective CSS

```css
perspective: 1200px;        /* Distance observateur */
transform-style: preserve-3d; /* Espace 3D pour enfants */
transform: rotateY(angle)deg translateZ(distance)px;
```

### Animations GPU

```css
/* Performant (GPU) */
transform: translateZ(0) rotateY(angle);
opacity: 0.5;

/* Lent (CPU) */
left: 100px;
background-color: blue;
```

### Event Delegation

```javascript
onClick={(e) => {
  e.stopPropagation();  // Pas de propagation parent
}}
```

## 📚 Ressources

- [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [React Hooks](https://react.dev/reference/react/hooks)
- [Tailwind CSS](https://tailwindcss.com)
- [Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

## 🎬 Cas d'usage

### Galerie films:
```
HeroCamera → Sélectionner genre → Voir 3 films → Cliquer pour watch
```

### Festivals:
```
Showcaser 5 catégories → Parcourir films sélectionnés → Voter
```

### Streaming:
```
Accueil → Genre → Films tendance → Lecteur vidéo
```

---

**Prêt à intégrer?** 
1. Choisir version (démo ou API)
2. Adapter endpoints API
3. Adapter format données
4. Tester sur navigateur
5. Déployer! 🚀

**Questions?** Consulter HEROCAMERA_GUIDE.md
