import React, { useState, useEffect } from "react";

// Données de démo (à supprimer une fois les vrais films ajoutés)
const DEMO_MOVIES = [
  {
    id: 1,
    title: "L'Écho du Silence",
    filmmaker_name: "Marie Dubois",
    duration: 60,
    genre: "Drame",
    synopsis: "Une minute pour capturer l'essence d'un moment suspendu dans le temps.",
    status: "selected",
    thumbnail_url: "https://picsum.photos/seed/movie1/640/360",
    video_url: "/video/video4.mp4"
  },
  {
    id: 2,
    title: "Fragments Numériques",
    filmmaker_name: "Alex Martin",
    duration: 58,
    genre: "Expérimental",
    synopsis: "Exploration visuelle de la frontière entre réel et virtuel.",
    status: "approved",
    thumbnail_url: "https://picsum.photos/seed/movie2/640/360",
    video_url: "/video/video4.mp4"
  },
  {
    id: 3,
    title: "Lumière Urbaine",
    filmmaker_name: "Sophie Chen",
    duration: 59,
    genre: "Documentaire",
    synopsis: "Marseille à travers le prisme d'une caméra qui danse.",
    status: "selected",
    thumbnail_url: "https://picsum.photos/seed/movie3/640/360",
    video_url: "/video/video4.mp4"
  },
  {
    id: 4,
    title: "Rêve Mécanique",
    filmmaker_name: "Thomas Blanc",
    duration: 60,
    genre: "Science-fiction",
    synopsis: "Quand la technologie rencontre l'humanité en 60 secondes.",
    status: "approved",
    thumbnail_url: "https://picsum.photos/seed/movie4/640/360",
    video_url: "/video/video4.mp4"
  },
  {
    id: 5,
    title: "Chorégraphie du Chaos",
    filmmaker_name: "Léa Rousseau",
    duration: 57,
    genre: "Danse",
    synopsis: "Un mouvement, une émotion, une minute d'intensité pure.",
    status: "selected",
    thumbnail_url: "https://picsum.photos/seed/movie5/640/360",
    video_url: "/video/video4.mp4"
  },
  {
    id: 6,
    title: "Horizon Parallèle",
    filmmaker_name: "David Laurent",
    duration: 60,
    genre: "Animation",
    synopsis: "Voyage visuel dans un univers où tout est possible.",
    status: "approved",
    thumbnail_url: "https://picsum.photos/seed/movie6/640/360",
    video_url: "/video/video4.mp4"
  }
];

export function VideoSelectionSection() {
  const [movies, setMovies] = useState(DEMO_MOVIES); // Utilise les données de démo
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      // Filtrer seulement les films approuvés/sélectionnés
      const approvedMovies = data.filter(m => m.status === 'approved' || m.status === 'selected');
      // Si des films réels existent, les utiliser, sinon garder les démos
      if (approvedMovies.length > 0) {
        setMovies(approvedMovies.slice(0, 6));
      }
    } catch (err) {
      console.error('Erreur chargement films:', err);
      // En cas d'erreur, on garde les données de démo
    }
  };

  if (loading) {
    return null;
  }

  return (
    <section className="relative px-6 py-32 overflow-hidden">
      {/* Background complexe avec patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
        
        {/* Gradient overlays multiples */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-950/20 via-transparent to-violet-950/20" />
        
        {/* Orbes lumineux animés */}
        <div className="absolute top-1/4 left-[5%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 right-[10%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/15 blur-[140px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-[10%] left-[30%] h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        
        {/* Lignes diagonales décoratives */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header ultra-premium */}
        <div className="mb-20 text-center">
          {/* Décorations supérieures */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-violet-500 to-violet-500" />
            <div className="relative inline-flex items-center gap-3 rounded-full border-2 border-violet-500/50 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-violet-600/20 px-6 py-3 backdrop-blur-xl shadow-2xl shadow-violet-500/30">
              {/* Glow interne */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-xl" />
              
              {/* Icône animée */}
              <div className="relative flex items-center justify-center">
                <span className="absolute h-6 w-6 animate-ping rounded-full bg-fuchsia-400 opacity-75" style={{ animationDuration: '2s' }} />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-500 shadow-lg shadow-fuchsia-500/50" />
              </div>
              
              <span className="relative text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200 uppercase tracking-widest">
                ✨ Sélection Officielle 2026
              </span>
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent via-fuchsia-500 to-fuchsia-500" />
          </div>

          {/* Titre principal avec effets */}
          <div className="relative inline-block mb-6">
            {/* Glow derrière le titre */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-violet-500/30 scale-150" />
            
            <h2 className="relative text-5xl md:text-7xl font-black tracking-tight leading-none">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 mb-2">
                Films en
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-violet-300 to-white">
                Compétition
              </span>
            </h2>
          </div>

          {/* Description avec cadre décoratif */}
          <div className="relative mx-auto max-w-3xl">
            <p className="text-lg leading-8 text-white/90 font-medium px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
              Découvrez les créations qui repoussent les limites de la narration en <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">une minute</span>. 
              Chaque film est une expérience unique, une vision artistique condensée.
            </p>
          </div>

          {/* Statistiques */}
          <div className="flex items-center justify-center gap-8 mt-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-violet-600/0 blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative flex items-center gap-2 text-sm">
                <span className="text-violet-400 font-black text-2xl">{movies.length}</span>
                <span className="text-white/60 uppercase tracking-wider">Films</span>
              </div>
            </div>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-fuchsia-600/0 blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative flex items-center gap-2 text-sm">
                <span className="text-fuchsia-400 font-black text-2xl">60s</span>
                <span className="text-white/60 uppercase tracking-wider">Max</span>
              </div>
            </div>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-600/0 blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative flex items-center gap-2 text-sm">
                <span className="text-purple-400 font-black text-2xl">∞</span>
                <span className="text-white/60 uppercase tracking-wider">Créativité</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid vidéos avec effets 3D ultra-premium */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {movies.map((movie, index) => (
            <VideoCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => setSelectedMovie(movie)}
              index={index}
            />
          ))}
        </div>

        {/* CTA ultra-premium redesigné */}
        <div className="relative text-center">
          {/* Décorations */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </div>
          
          <a
            href="/films"
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-2xl p-[2px] transition-all duration-500 hover:scale-105 hover:-translate-y-1"
          >
            {/* Gradient border animé */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-fuchsia-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-spin-slow" style={{ animationDuration: '3s' }} />
            
            {/* Contenu du bouton */}
            <div className="relative flex items-center gap-4 rounded-[14px] bg-black px-12 py-6 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-violet-950 group-hover:to-fuchsia-950">
              {/* Glow interne */}
              <div className="absolute inset-0 rounded-[14px] bg-gradient-to-r from-violet-500/0 via-fuchsia-500/0 to-violet-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
              
              {/* Texte */}
              <span className="relative text-lg font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200 group-hover:from-violet-200 group-hover:to-fuchsia-200">
                Voir tous les films
              </span>
              
              {/* Icône animée */}
              <div className="relative flex items-center justify-center">
                <div className="absolute h-8 w-8 rounded-full bg-fuchsia-500/20 animate-ping group-hover:animate-none" />
                <svg 
                  className="relative h-6 w-6 text-white transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              {/* Particules décoratives */}
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>

          {/* Texte descriptif sous le bouton */}
          <p className="mt-6 text-sm text-white/60 font-medium">
            <span className="text-violet-400">+{movies.length}</span> films d'exception vous attendent
          </p>
        </div>
      </div>

      {/* Modal vidéo */}
      {selectedMovie && (
        <VideoModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </section>
  );
}

// Carte vidéo ultra-premium avec effets 3D
function VideoCard({ movie, onClick, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow externe ultra-puissant */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 opacity-0 blur-xl transition-all duration-700 group-hover:opacity-70 group-hover:-inset-2 group-hover:blur-2xl" />
      
      {/* Carte principale avec transformation 3D */}
      <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-black via-violet-950/50 to-black border border-white/10 transition-all duration-700 group-hover:border-violet-500/60 group-hover:scale-[1.03] group-hover:-translate-y-3 group-hover:rotate-[0.5deg] shadow-2xl">
        {/* Container de l'image avec parallax */}
        <div className="relative aspect-video overflow-hidden">
          {/* Image */}
          <img
            src={movie.thumbnail_url}
            alt={movie.title}
            className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-115"
          />
          
          {/* Overlay gradient ultra-complexe */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-transparent to-fuchsia-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-tl from-fuchsia-900/20 via-transparent to-violet-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Effet scanline cinéma */}
          <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
          }} />
          
          {/* Effet de grain filmique */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }} />

          {/* Numéro du film en style ultra-moderne */}
          <div className="absolute top-4 left-4 flex items-center justify-center">
            <div className="relative">
              {/* Glow derrière */}
              <div className="absolute inset-0 text-6xl font-black text-violet-500/30 blur-lg">
                {String(index + 1).padStart(2, '0')}
              </div>
              {/* Numéro principal */}
              <span className="relative text-6xl font-black text-white/15 group-hover:text-white/25 transition-colors leading-none" style={{
                textShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Badge de statut ultra-premium */}
          <div className="absolute top-4 right-4">
            <div className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-2xl border-2 transition-all duration-500 shadow-2xl ${
              movie.status === 'selected' 
                ? 'bg-gradient-to-r from-amber-500/40 via-yellow-500/40 to-amber-500/40 border-amber-400/70 shadow-amber-500/60' 
                : 'bg-gradient-to-r from-violet-500/40 via-fuchsia-500/40 to-violet-500/40 border-violet-400/70 shadow-violet-500/60'
            }`}>
              {/* Glow interne pulsant */}
              <div className={`absolute inset-0 rounded-full blur-md opacity-50 animate-pulse ${
                movie.status === 'selected' ? 'bg-amber-400' : 'bg-violet-400'
              }`} style={{ animationDuration: '2s' }} />
              
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  movie.status === 'selected' ? 'bg-amber-300' : 'bg-violet-300'
                }`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  movie.status === 'selected' ? 'bg-amber-400 shadow-lg shadow-amber-400' : 'bg-violet-400 shadow-lg shadow-violet-400'
                }`} />
              </span>
              <span className="relative text-xs font-black uppercase tracking-widest text-white drop-shadow-lg">
                {movie.status === 'selected' ? '⭐ Sélectionné' : '✓ Approuvé'}
              </span>
            </div>
          </div>

          {/* Bouton play central ultra-premium */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
            {/* Cercles concentriques animés multiples */}
            <div className="absolute h-40 w-40 rounded-full border-[3px] border-white/15 animate-ping" style={{ animationDuration: '2.5s' }} />
            <div className="absolute h-36 w-36 rounded-full border-[2px] border-white/25 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
            <div className="absolute h-32 w-32 rounded-full border-[2px] border-white/35 animate-pulse" style={{ animationDuration: '1.5s' }} />
            
            {/* Bouton principal avec effet 3D profond */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-700 shadow-2xl shadow-fuchsia-500/70 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:shadow-fuchsia-500/90">
              {/* Glow interne multicouche */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 blur-xl opacity-80" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/20" />
              
              {/* Cercle interne décoratif */}
              <div className="absolute inset-4 rounded-full border-2 border-white/30" />
              
              {/* Icône play */}
              <svg className="relative z-10 h-12 w-12 text-white translate-x-1 drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              
              {/* Particules scintillantes */}
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white animate-ping" style={{ animationDuration: '1s' }} />
              <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-fuchsia-300 animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Barre de progression animée sophistiquée */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-black/60 via-black/80 to-black/60 backdrop-blur-sm">
            <div className="relative h-full overflow-hidden">
              {/* Barre de progression */}
              <div 
                className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 transition-all duration-1000 ease-out relative"
                style={{ width: isHovered ? '100%' : '0%' }}
              >
                {/* Effet brillant qui se déplace */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Effet de vignette cinématique */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] pointer-events-none" />
        </div>

        {/* Section info ultra-redesignée */}
        <div className="relative p-6 space-y-4 bg-gradient-to-b from-black/50 to-black">
          {/* Ligne décorative supérieure avec animation */}
          <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
          
          {/* Titre avec effet de texte premium */}
          <h3 className="text-xl font-black text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-200 group-hover:via-fuchsia-200 group-hover:to-violet-200 transition-all duration-500 drop-shadow-lg">
            {movie.title}
          </h3>
          
          {/* Filmmaker avec icône stylée */}
          <div className="flex items-center gap-2.5 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-violet-400/30">
              <svg className="h-4 w-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="font-bold text-white/90">{movie.filmmaker_name}</span>
          </div>

          {/* Tags ultra-stylés */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Genre */}
            <span className="group/tag inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500/25 to-fuchsia-500/25 px-3.5 py-1.5 text-xs font-black text-violet-200 border border-violet-400/40 shadow-lg shadow-violet-500/20 transition-all hover:scale-105 hover:shadow-violet-500/40">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              <span className="uppercase tracking-wide">{movie.genre}</span>
            </span>
            
            {/* Durée */}
            <span className="group/tag inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-500/25 to-violet-500/25 px-3.5 py-1.5 text-xs font-black text-fuchsia-200 border border-fuchsia-400/40 shadow-lg shadow-fuchsia-500/20 transition-all hover:scale-105 hover:shadow-fuchsia-500/40">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="uppercase tracking-wide">{movie.duration}s</span>
            </span>
          </div>

          {/* Synopsis stylisé */}
          <p className="text-sm leading-relaxed text-white/70 line-clamp-2 group-hover:text-white/95 transition-colors duration-500">
            {movie.synopsis}
          </p>

          {/* Call to action avec effet premium */}
          <div className="pt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-violet-400 font-black text-sm group-hover:text-fuchsia-300 transition-all duration-500">
              <span className="uppercase tracking-wider">Regarder</span>
              <svg className="h-4 w-4 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            
            {/* Indicateur de durée */}
            <div className="flex items-center gap-1.5 text-white/50 text-xs font-bold">
              <div className="h-1 w-1 rounded-full bg-violet-400 animate-pulse" />
              <span>60s max</span>
            </div>
          </div>
        </div>

        {/* Décorations d'angles animées */}
        <div className="absolute top-0 left-0 h-24 w-24 border-t-[3px] border-l-[3px] border-violet-500/0 group-hover:border-violet-500/60 rounded-tl-2xl transition-all duration-700" />
        <div className="absolute top-0 right-0 h-24 w-24 border-t-[3px] border-r-[3px] border-fuchsia-500/0 group-hover:border-fuchsia-500/60 rounded-tr-2xl transition-all duration-700 transition-delay-100" />
        <div className="absolute bottom-0 left-0 h-24 w-24 border-b-[3px] border-l-[3px] border-fuchsia-500/0 group-hover:border-fuchsia-500/60 rounded-bl-2xl transition-all duration-700 transition-delay-200" />
        <div className="absolute bottom-0 right-0 h-24 w-24 border-b-[3px] border-r-[3px] border-violet-500/0 group-hover:border-violet-500/60 rounded-br-2xl transition-all duration-700 transition-delay-300" />
      </div>
    </div>
  );
}

// Modal vidéo ultra-premium
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
      {/* Backdrop avec blur et gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-violet-950/90 to-black/95 backdrop-blur-2xl" />
      
      {/* Effets de fond lumineux */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div 
        className="relative w-full max-w-6xl bg-gradient-to-br from-[#0f0f1e] to-[#1a0f1e] rounded-[2rem] border-2 border-violet-500/30 overflow-hidden shadow-2xl shadow-violet-500/50 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Effet de bordure brillante */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-violet-500/20 opacity-50 blur-xl pointer-events-none" />

        {/* Close button amélioré */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-xl border border-red-500/30 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-lg hover:shadow-red-500/50 group"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video player */}
        <div className="relative aspect-video bg-black border-b-2 border-violet-500/20">
          {movie.video_url ? (
            <video
              className="w-full h-full"
              controls
              autoPlay
              src={movie.video_url}
            >
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-900/30 to-fuchsia-900/30">
              <div className="text-center">
                <svg className="w-24 h-24 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-white/60 text-lg">Vidéo non disponible</p>
              </div>
            </div>
          )}
        </div>

        {/* Movie info - Améliorée */}
        <div className="relative p-8 md:p-10 bg-gradient-to-b from-transparent via-black/20 to-black/40">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent mb-3">
                {movie.title}
              </h2>
              {movie.filmmaker_name && (
                <div className="flex items-center gap-2 text-white/80 text-lg">
                  <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Réalisé par <span className="font-bold text-white">{movie.filmmaker_name}</span></span>
                </div>
              )}
            </div>
          </div>

          {movie.synopsis && (
            <div className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xs font-black text-violet-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Synopsis
              </h3>
              <p className="text-white/90 leading-relaxed text-lg">{movie.synopsis}</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movie.duration && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-600/10 border border-violet-500/20">
                <p className="text-xs text-violet-300 mb-2 font-semibold uppercase tracking-wider">Durée</p>
                <p className="text-white font-black text-2xl">{movie.duration}s</p>
              </div>
            )}
            {movie.genre && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-fuchsia-600/10 border border-fuchsia-500/20">
                <p className="text-xs text-fuchsia-300 mb-2 font-semibold uppercase tracking-wider">Genre</p>
                <p className="text-white font-black text-lg">{movie.genre}</p>
              </div>
            )}
            {movie.production_year && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20">
                <p className="text-xs text-cyan-300 mb-2 font-semibold uppercase tracking-wider">Année</p>
                <p className="text-white font-black text-2xl">{movie.production_year}</p>
              </div>
            )}
            {movie.country && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20">
                <p className="text-xs text-amber-300 mb-2 font-semibold uppercase tracking-wider">Pays</p>
                <p className="text-white font-black text-lg">{movie.country}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
