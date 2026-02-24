import { useState } from "react";
import {
  Trophy,
  Play,
  Star,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const winnersData = [
  {
    id: 1,
    category: "Grand Prix",
    title: "L'Écho du Silence",
    director: "Sarah Lambert",
    year: 2026,
    duration: "18min",
    genre: "Drame Psychologique",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    synopsis:
      "Dans un monde où la parole est devenue une ressource rare et payante, une jeune musicienne tente de composer une symphonie silencieuse pour sauver son frère.",
    juryQuote:
      "Une maîtrise technique époustouflante et une narration qui vous prend aux tripes dès la première seconde.",
    rating: 5,
  },
  {
    id: 2,
    category: "Science-Fiction",
    title: "Neon Nights",
    director: "Marc Dubois",
    year: 2026,
    duration: "14min",
    genre: "Cyberpunk",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
    synopsis:
      "2084. Un détective privé enquête sur un trafic de souvenirs synthétiques dans les bas-fonds d'une métropole inondée par les néons et la pluie acide.",
    juryQuote:
      "Visuellement, c'est ce qu'on a vu de plus beau cette année. Un univers digne de Blade Runner.",
    rating: 5,
  },
  {
    id: 3,
    category: "Documentaire",
    title: "Roots of Tomorrow",
    director: "Elena Rodriguez",
    year: 2026,
    duration: "24min",
    genre: "Écologie",
    image:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop",
    synopsis:
      "L'histoire inspirante d'une communauté isolée en Amazonie qui utilise la technologie drone pour reboiser sa forêt ancestrale et lutter contre les exploitants illégaux.",
    juryQuote: "Un film nécessaire, puissant et porteur d'espoir.",
    rating: 4,
  },
  {
    id: 4,
    category: "Comédie",
    title: "Panique au Bureau",
    director: "Julien Morel",
    year: 2026,
    duration: "10min",
    genre: "Satire",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2000&auto=format&fit=crop",
    synopsis:
      "Lorsqu'une IA prend le contrôle de la machine à café d'une grande entreprise, la productivité s'effondre et les employés doivent réapprendre à se parler.",
    juryQuote:
      "Hilarant du début à la fin, avec un message subtil sur notre dépendance technologique.",
    rating: 4,
  },
  {
    id: 5,
    category: "Animation",
    title: "Le Rêve de Papier",
    director: "Kenji Sato",
    year: 2026,
    duration: "8min",
    genre: "Poétique",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    synopsis:
      "Un petit garçon en origami part à l'aventure dans une bibliothèque géante pour retrouver sa page manquante.",
    juryQuote:
      "Une poésie visuelle incroyable, réalisée entièrement en stop-motion.",
    rating: 5,
  },
];

export function WinnersSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const length = winnersData.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const getCardStyle = (index) => {
    if (index === activeIndex) {
      return "z-30 scale-100 opacity-100 translate-x-0 cursor-default";
    }

    const prevIndex = (activeIndex - 1 + length) % length;
    const nextIndex = (activeIndex + 1) % length;

    if (index === prevIndex) {
      return "z-10 scale-90 opacity-60 -translate-x-[20%] md:-translate-x-[60%] hover:opacity-90 hover:scale-95 cursor-pointer brightness-75 hover:brightness-100";
    } else if (index === nextIndex) {
      return "z-10 scale-90 opacity-60 translate-x-[20%] md:translate-x-[60%] hover:opacity-90 hover:scale-95 cursor-pointer brightness-75 hover:brightness-100";
    } else {
      return "z-0 scale-50 opacity-0 translate-y-10 pointer-events-none";
    }
  };

  const laurierMaskStyle = {
    maskImage: "url(/images/laurier.svg)",
    WebkitMaskImage: "url(/images/laurier.svg)",
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };

  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="mb-12 px-4 flex justify-center items-center gap-1 md:gap-3 overflow-hidden relative leading-none">
        <div
          className="w-16 md:w-24 lg:w-32 h-24 md:h-32 bg-brand-primary opacity-90 -translate-y-2 scale-x-[-1]"
          style={laurierMaskStyle}
        />

        <div className="text-center z-10 shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-brand-primary uppercase tracking-[0.3em] mb-2 drop-shadow-lg leading-tight">
            Grand Prix
          </h2>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-2">
            MarsAI
          </h1>

          <div className="inline-block relative">
            <span className="text-2xl md:text-3xl font-light text-slate-400 tracking-widest">
              2026
            </span>
          </div>
        </div>

        <div
          className="w-16 md:w-24 lg:w-32 h-24 md:h-32 bg-brand-primary opacity-90 -translate-y-2"
          style={laurierMaskStyle}
        />
      </div>

      <div className="relative w-full max-w-5xl mx-auto h-[750px] md:h-[650px] flex items-center justify-center perspective-1000">
        {winnersData.map((film, index) => {
          const prevIndex = (activeIndex - 1 + length) % length;
          const nextIndex = (activeIndex + 1) % length;

          return (
            <div
              key={film.id}
              onClick={() => {
                if (index === prevIndex) prevSlide();
                if (index === nextIndex) nextSlide();
              }}
              className={`absolute top-0 w-[90%] md:w-[70%] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${getCardStyle(index)}`}
            >              <div className="relative w-full h-[40vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-80"></div>

                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-slate-900/80 backdrop-blur text-white font-bold px-3 py-1 rounded-lg text-xs md:text-sm uppercase tracking-widest border border-white/10 shadow-lg">
                  <Trophy className="w-3 h-3 md:w-4 md:h-4 inline mr-2 text-brand-primary" />
                  {film.category}
                </div>
              </div>

              <div className="relative -mt-20 px-4 md:px-8 z-20">
                <div className="bg-slate-900/95 backdrop-blur-xl border-2 border-white rounded-2xl p-6 md:p-8 shadow-2xl">
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-start text-left">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight line-clamp-1">
                        {film.title}
                      </h2>

                      <div className="flex flex-wrap items-center gap-2 text-slate-400 text-xs md:text-sm mb-4 font-medium">
                        <span className="text-white font-bold">
                          {film.director}
                        </span>{" "}
                        • <span>{film.year}</span> •{" "}
                        <span>{film.duration}</span>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                        {film.synopsis}
                      </p>

                      <button className="bg-brand-primary hover:bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,200,0,0.2)] text-sm">
                        <Play className="w-4 h-4 fill-current" /> Voir le
                        trailer
                      </button>
                    </div>

                    <div className="hidden lg:block w-1/3 border-l border-white/10 pl-6">
                      <h3 className="text-brand-primary font-bold uppercase text-[10px] tracking-widest mb-2">
                        L'avis du Jury
                      </h3>
                      <p className="italic text-slate-400 font-light text-sm mb-3 line-clamp-3">
                        "{film.juryQuote}"
                      </p>
                      <div className="flex gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < film.rating ? "fill-current" : "text-slate-800"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

jnuh        <div className="flex justify-center gap-4 mb-8 -mt-10 z-40 relative">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-brand-primary hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-brand-primary hover:text-slate-900 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center z-40 relative">
        <div className="flex flex-col items-center mb-6 text-slate-500">
          <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
            Navigation Rapide
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {winnersData.map((item, index) => (
            <button
              key={item.category}
              onClick={() => goToSlide(index)}
              className={`
                px-2 py-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center
                ${
                  index === activeIndex
                    ? "bg-brand-primary border-brand-primary text-slate-900 shadow-lg scale-105"
                    : "bg-slate-800/30 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-500 hover:text-white"
                }
              `}
            >
              <span
                className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${index === activeIndex ? "text-slate-900" : "text-brand-primary"}`}
              >
                {item.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
