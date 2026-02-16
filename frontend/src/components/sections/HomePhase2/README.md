# HomePhase2 - Page des Films en Compétition

## 📋 Description

La **Phase 2** du site marsAI présente tous les films approuvés et sélectionnés pour le festival. Cette page remplace la page d'accueil initiale une fois que les films sont soumis et validés.

## 🎯 Fonctionnalités

### ✨ Affichage des Films
- **Grille responsive** : 1-4 colonnes selon la taille d'écran
- **Cartes interactives** : Hover effects et animations
- **Thumbnails** : Miniatures des films avec play overlay
- **Badges de statut** : Différenciation visuelle (Approuvé/Sélectionné)

### 🎬 Lecteur Vidéo Modal
- **Lecture en plein écran** : Modal avec lecteur vidéo intégré
- **Contrôles natifs** : Play, pause, volume, plein écran
- **Fermeture intuitive** : Click outside ou bouton close
- **Auto-play** : Lecture automatique à l'ouverture

### 🔍 Système de Filtrage
- **Tous** : Affiche tous les films (approuvés + sélectionnés)
- **Approuvés** : Films validés par l'équipe
- **Sélectionnés** : Films en compétition officielle
- **Compteurs dynamiques** : Nombre de films par catégorie

### 📊 Informations Affichées
**Sur les cartes :**
- Titre du film
- Nom du réalisateur
- Durée
- Genre
- Statut (badge coloré)
- Thumbnail/miniature

**Dans le modal :**
- Lecteur vidéo HD
- Titre et réalisateur
- Synopsis complet
- Durée, genre, année, pays
- Informations de production

## 🛣️ Route d'Accès

```
URL : /films
Composant : HomePhase2
```

## 🔌 API Utilisée

```javascript
GET /api/movies
```

**Filtrage côté client :**
```javascript
status === 'approved' || status === 'selected'
```

## 🎨 Design System

### Couleurs par Statut
```javascript
approved: {
  bg: 'violet-500/20',
  text: 'violet-400',
  border: 'violet-500/30'
}

selected: {
  bg: 'fuchsia-500/20',
  text: 'fuchsia-400',
  border: 'fuchsia-500/30'
}
```

### États
- **Loading** : Spinner animé + message
- **Error** : Message d'erreur + bouton retry
- **Empty** : Message "Aucun film" avec icône
- **Loaded** : Grille de films

## 📱 Responsive Design

| Breakpoint | Colonnes | Padding |
|------------|----------|---------|
| Mobile     | 1        | px-6    |
| Tablet     | 2        | px-6    |
| Desktop    | 3        | px-6    |
| Large      | 4        | px-6    |

## 🚀 Utilisation

### Navigation depuis le Header
Ajoutez un lien dans le menu de navigation :

```jsx
<Link to="/films">Films</Link>
```

### Passage de Phase 1 à Phase 2
Dans votre logique de routing (App.js) :

```javascript
// Phase 1 : Avant les films
<Route path="/" element={<Home />} />

// Phase 2 : Après validation des films
<Route path="/" element={<HomePhase2 />} />
<Route path="/about" element={<Home />} /> // Archive phase 1
```

### Switch Automatique (Optionnel)
```javascript
const hasApprovedFilms = movies.some(m => 
  m.status === 'approved' || m.status === 'selected'
);

return hasApprovedFilms ? <HomePhase2 /> : <Home />;
```

## 🔧 Configuration Backend Requise

### Structure Movie Object
```javascript
{
  id: number,
  title: string,
  synopsis: string,
  filmmaker_name: string,
  duration: number,
  genre: string,
  production_year: number,
  country: string,
  status: 'approved' | 'selected' | 'pending' | 'rejected',
  video_url: string,
  thumbnail_url: string
}
```

### Route API à Créer/Vérifier
```javascript
// backend/Routes/movies.js
router.get('/', MovieController.list);
```

## 🎯 Prochaines Améliorations

### Court Terme
- [ ] Pagination ou infinite scroll
- [ ] Recherche par titre/réalisateur
- [ ] Tri (date, popularité, titre)
- [ ] Partage sur réseaux sociaux

### Moyen Terme
- [ ] Système de votes
- [ ] Commentaires et discussions
- [ ] Favoris/Watchlist
- [ ] Statistiques de visionnage

### Long Terme
- [ ] Playlists personnalisées
- [ ] Recommandations IA
- [ ] Live streaming des projections
- [ ] Chat en direct pendant les événements

## 📄 Exemple d'Intégration dans le Header

```jsx
// components/Header/HeaderNavLinks.jsx
export function HeaderNavLinks() {
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/films">Films</Link> {/* NOUVEAU */}
      <Link to="/participer">Participer</Link>
      <Link to="/a-propos">À propos</Link>
    </nav>
  );
}
```

## 🐛 Gestion des Erreurs

### Pas de films
```javascript
filteredMovies.length === 0
→ Affiche message "Aucun film pour le moment"
```

### Erreur API
```javascript
catch (err)
→ Affiche message d'erreur + bouton "Réessayer"
```

### Vidéo non disponible
```javascript
!movie.video_url
→ Affiche "Vidéo non disponible" dans le modal
```

## 💡 Conseils d'Utilisation

1. **Performance** : Les thumbnails sont lazy-loaded naturellement
2. **SEO** : Ajoutez des meta tags pour chaque film
3. **Accessibilité** : Tous les boutons ont des aria-labels
4. **Mobile** : Testez la lecture vidéo sur iOS/Android

---

**Route d'accès** : [http://localhost:3000/films](http://localhost:3000/films)
