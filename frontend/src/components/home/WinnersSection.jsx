import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { heroAnimationStyles } from '../sections/heroAnimations';

const winnersData = [
  {
    id: 1,
    category: 'Grand Prix',
    title: "L'Écho du Silence",
    director: 'Sarah Lambert',
    year: 2026,
    duration: '18min',
    genre: 'Drame Psychologique',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
    synopsis:
      'Dans un monde où la parole est devenue une ressource rare et payante, une jeune musicienne tente de composer une symphonie silencieuse pour sauver son frère.',
    juryQuote:
      'Une maîtrise technique époustouflante et une narration qui vous prend aux tripes dès la première seconde.',
    rating: 5,
  },
  // ... (les autres éléments gardés identiques)
];

export function WinnersSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative w-full py-20 overflow-hidden">
      <style>{heroAnimationStyles}</style>
      {/* truncated for brevity */}
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
                    ? 'bg-brand-primary border-brand-primary text-slate-900 shadow-lg scale-105'
                    : 'bg-slate-800/30 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-500 hover:text-white'
                }
              `}
            >
              <span
                className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${index === activeIndex ? 'text-slate-900' : 'text-brand-primary'}`}
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
