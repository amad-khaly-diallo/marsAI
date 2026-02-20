import { useState } from "react";
import { Trophy, Play, Star, ChevronDown } from "lucide-react";
import { winnersData } from "./winnersData";

function DetailCard({ film }) {
  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl h-full flex flex-col justify-between">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start text-left">
        <div className="flex-1">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight line-clamp-1 md:line-clamp-2">
            {film.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-slate-300 text-xs md:text-sm mb-6 font-medium">
            <span className="bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap">{film.director}</span>
            <span className="bg-slate-800 px-3 py-1 rounded-full text-brand-primary font-bold">{film.year}</span>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6 line-clamp-3 md:line-clamp-4">
            {film.synopsis}
          </p>
          <button className="w-full md:w-auto bg-brand-white hover:bg-white text-slate-900 px-6 py-3 rounded-full font-bold transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,200,0,0.2)] text-sm">
            <Play className="w-4 h-4 fill-current" /> Voir le trailer
          </button>
        </div>
        <div className="w-full md:w-1/3 bg-white/5 rounded-xl p-4 border border-white/5 hidden lg:block">
          <h3 className="text-brand-white font-bold uppercase text-xs tracking-widest mb-2">L'avis du Jury</h3>
          <p className="italic text-slate-300 font-light text-sm mb-3 line-clamp-4">"{film.juryQuote}"</p>
          <div className="flex gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < film.rating ? "fill-current" : "text-slate-700"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Phase 3 – Section Grand Prix / Palmarès (gagnants).
 */
export default function Phase3Winners() {
  const [activeCategory, setActiveCategory] = useState("Grand Prix");

  const currentIndex = winnersData.findIndex((m) => m.category === activeCategory);
  const selectedFilm = winnersData[currentIndex];
  const dataLength = winnersData.length;
  const prevFilm = winnersData[(currentIndex - 1 + dataLength) % dataLength];
  const nextFilm = winnersData[(currentIndex + 1) % dataLength];

  const handleCategoryChange = (category) => setActiveCategory(category);

  return (
    <section className="min-h-screen bg-brand-bg text-slate-200 font-sans pb-20 overflow-x-hidden" id="phase3-winners">
      <div className="pt-8 pb-6 text-center px-4">
        <h2 className="text-xl md:text-2xl font-bold text-brand-primary uppercase tracking-[0.3em] mb-2 drop-shadow-lg">
          Grand Prix
        </h2>
        <div className="inline-block relative">
          <span className="text-2xl md:text-3xl font-light text-slate-400 tracking-widest border-white/10 py-1 px-8">
            2026
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
          MarsAI
        </h1>
      </div>

      <main className="max-w-4xl mx-auto px-4 mb-24 relative mt-10 min-h-[80vh]">
        <div className="relative w-full h-full flex justify-center items-start">
          <div
            className="absolute top-8 md:top-12 w-full z-10 opacity-60 scale-90 blur-[1px] brightness-50 transition-all duration-700 ease-in-out cursor-pointer hover:brightness-100 hover:scale-95 hover:blur-0 hover:z-20 hover:opacity-100 -translate-x-[65%]"
            onClick={() => handleCategoryChange(prevFilm.category)}
          >
            <div className="relative w-full h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden shadow-xl border border-white/10 group">
              <img src={prevFilm.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/10" />
              <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur text-white font-bold px-3 py-1 rounded text-xs uppercase tracking-widest shadow-lg border border-white/10">
                {prevFilm.category}
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg md:text-xl font-bold">{prevFilm.title}</h3>
              </div>
            </div>
          </div>

          <div
            className="absolute top-8 md:top-12 w-full z-10 opacity-60 scale-90 blur-[1px] brightness-50 transition-all duration-700 ease-in-out cursor-pointer hover:brightness-100 hover:scale-95 hover:blur-0 hover:z-20 hover:opacity-100 translate-x-[65%]"
            onClick={() => handleCategoryChange(nextFilm.category)}
          >
            <div className="relative w-full h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden shadow-xl border border-white/10 group">
              <img src={nextFilm.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/10" />
              <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur text-white font-bold px-3 py-1 rounded text-xs uppercase tracking-widest shadow-lg border border-white/10">
                {nextFilm.category}
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg md:text-xl font-bold">{nextFilm.title}</h3>
              </div>
            </div>
          </div>

          <div key={selectedFilm.id} className="relative z-30 w-full transition-all duration-700 ease-in-out">
            <div className="relative w-full h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden shadow-2xl shadow-black border border-slate-700/50 group">
              <img
                src={selectedFilm.image}
                alt={selectedFilm.title}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent" />
              <div className="absolute top-6 left-6 bg-brand-primary/90 backdrop-blur text-slate-900 font-black px-4 py-2 rounded-lg text-sm uppercase tracking-widest shadow-lg flex items-center gap-2">
                <Trophy className="w-4 h-4" /> {selectedFilm.category}
              </div>
            </div>
            <div className="relative -mt-24 md:-mt-32 px-2 md:px-10 z-30">
              <DetailCard film={selectedFilm} />
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-4xl mx-auto px-4 text-center relative z-40 mt-12">
        <div className="flex flex-col items-center mb-8 text-slate-500">
          <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Explorer les catégories</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {winnersData.map((item) => (
            <button
              key={item.category}
              onClick={() => handleCategoryChange(item.category)}
              className={`group relative px-2 py-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                activeCategory === item.category
                  ? "bg-brand-primary border-brand-primary text-slate-900 shadow-lg scale-105 z-10"
                  : "bg-slate-800/30 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-500 hover:text-white opacity-70 hover:opacity-100"
              }`}
            >
              <span
                className={`text-xs md:text-sm font-bold uppercase tracking-wider ${
                  activeCategory === item.category ? "text-slate-900" : "text-brand-primary group-hover:text-white"
                }`}
              >
                {item.category}
              </span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
