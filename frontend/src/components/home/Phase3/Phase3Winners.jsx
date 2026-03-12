import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getYouTubeThumbnail } from '../../../utils/youtube';
import { winnersData } from './winnersData';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80';

/**
 * Transforme un gagnant API (movie + winner) en format affichage Phase3.
 * Reçoit les textes traduits en paramètre pour rester une fonction pure.
 */
function mapWinnerToFilm(m, { defaultCategory, defaultTitle }) {
  const director =
    m.filmmaker && typeof m.filmmaker === 'object'
      ? [m.filmmaker.first_name, m.filmmaker.last_name]
          .filter(Boolean)
          .join(' ') || '—'
      : '—';
  return {
    id: m.id,
    category: m.winner_category || defaultCategory,
    title: m.original_title || m.english_title || defaultTitle,
    director,
    year: 2026,
    duration: m.duration !== null ? `${m.duration} min` : '',
    image: getYouTubeThumbnail(m.youtube_url) || PLACEHOLDER_IMAGE,
    synopsis: m.synopsis_original || m.synopsis_english || '',
    juryQuote: '',
    rating: 5,
    movieId: m.id,
  };
}

/* ── Winner Spotlight — cinematic featured card ────────── */
function WinnerSpotlight({ film }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-5 rounded-2xl lg:rounded-3xl overflow-hidden border border-white/[0.07] bg-[#0a0a16]/90 backdrop-blur-xl shadow-[0_8px_80px_rgba(41,51,211,0.08)]">
        {/* ── Film image ── */}
        <div className="relative lg:col-span-3 h-[45vh] sm:h-[50vh] lg:h-[68vh]">
          <img
            src={film.image}
            alt={film.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a16] hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/40 to-transparent lg:via-transparent lg:from-transparent" />

          {/* Category badge */}
          <div className="absolute top-5 left-5 md:top-7 md:left-7">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#C6A55C] to-[#DFC88A] text-[#0a0a16] font-bold px-4 py-2 rounded-lg text-[11px] uppercase tracking-[0.15em] shadow-[0_4px_24px_rgba(198,165,92,0.4)]">
              <Award className="w-3.5 h-3.5" />
              {film.category}
            </div>
          </div>

          {/* Ambient glow */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-brand-primary/15 rounded-full blur-[50px] pointer-events-none" />
        </div>

        {/* ── Film info ── */}
        <div className="lg:col-span-2 p-7 md:p-10 lg:p-12 flex flex-col justify-center relative">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-primary/[0.06] blur-[90px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-white mb-5 leading-[1.08] tracking-tight">
              {film.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 mb-7">
              <span className="text-[13px] text-white/70 font-medium bg-white/[0.06] px-3.5 py-1.5 rounded-full border border-white/[0.07]">
                {film.director}
              </span>
              <span className="text-[13px] text-[#C6A55C] font-semibold bg-[#C6A55C]/10 px-3.5 py-1.5 rounded-full border border-[#C6A55C]/20">
                {film.year}
              </span>
              {film.duration && (
                <span className="text-[13px] text-white/40 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/[0.05]">
                  {film.duration}
                </span>
              )}
            </div>

            <p className="text-[15px] text-white/50 leading-[1.7] mb-8 line-clamp-4">
              {film.synopsis || t('phase3.noSynopsis')}
            </p>

            {film.juryQuote && (
              <div className="mb-8 pl-4 border-l-2 border-[#C6A55C]/30">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C6A55C]/70 font-semibold mb-2">
                  {t('phase3.juryOpinion')}
                </p>
                <p className="text-sm italic text-white/40 leading-relaxed line-clamp-3">
                  «&nbsp;{film.juryQuote}&nbsp;»
                </p>
                <div className="flex gap-0.5 mt-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < (film.rating || 0)
                          ? 'fill-[#C6A55C] text-[#C6A55C]'
                          : 'text-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {(film.movieId || film.id) && (
              <Link
                to={`/watch/${film.movieId ?? film.id}`}
                className="group inline-flex items-center gap-3 bg-white text-[#0a0a16] hover:bg-[#C6A55C] px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(198,165,92,0.25)]"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0a0a16]/10 group-hover:bg-[#0a0a16]/20 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                {t('phase3.watchFilm')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Phase 3 – Section Grand Prix / Palmarès (gagnants).
 * Si winnersFromApi est fourni (depuis la DB), on l'utilise ; sinon fallback sur winnersData (démo).
 */
export default function Phase3Winners({
  winnersFromApi = null,
  loading = false,
  grandPrixLabel = 'Grand Prix',
  festivalTitle = 'MarsAI',
}) {
  const { t } = useTranslation();

  const dataSource = useMemo(() => {
    if (winnersFromApi !== null && Array.isArray(winnersFromApi)) {
      return winnersFromApi.map((m) =>
        mapWinnerToFilm(m, {
          defaultCategory: t('phase3.grandPrix'),
          defaultTitle: t('phase3.untitled'),
        }),
      );
    }
    return winnersData;
  }, [winnersFromApi, t]);

  const [activeIndex, setActiveIndex] = useState(0);
  const dataLength = dataSource.length;
  const selectedFilm = dataSource[activeIndex];

  const goPrev = () => setActiveIndex((i) => (i - 1 + dataLength) % dataLength);
  const goNext = () => setActiveIndex((i) => (i + 1) % dataLength);

  if (loading) {
    return (
      <section
        className="min-h-screen flex items-center justify-center"
        id="phase3-winners"
      >
        <div className="text-center">
          <div className="mx-auto h-14 w-14 rounded-full border-2 border-[#C6A55C] border-t-transparent animate-spin mb-6" />
          <p className="text-white/40 text-sm tracking-wider">{t('phase3.loading')}</p>
        </div>
      </section>
    );
  }

  if (dataSource.length === 0) {
    return (
      <section
        className="min-h-screen flex items-center justify-center"
        id="phase3-winners"
      >
        <div className="text-center px-4">
          <Award className="w-10 h-10 text-[#C6A55C] mx-auto mb-4" />
          <h2 className="text-sm font-semibold text-[#C6A55C] uppercase tracking-[0.35em] mb-3">
            {grandPrixLabel}
          </h2>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {festivalTitle}
          </h1>
          <p className="text-white/35">{t('phase3.noWinners')}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden pb-28"
      id="phase3-winners"
    >
      {/* ── Background ambient glow ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-[15%] w-[550px] h-[550px] rounded-full bg-brand-primary/[0.05] blur-[140px]" />
        <div className="absolute bottom-32 right-[10%] w-[450px] h-[450px] rounded-full bg-[#C6A55C]/[0.035] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-brand-primary/[0.02] blur-[160px]" />
      </div>

      {/* ── Hero header ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-20 text-center px-4"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="block h-px w-10 bg-gradient-to-r from-transparent to-[#C6A55C]/50" />
          <span className="text-[10px] md:text-[11px] font-semibold text-[#C6A55C] uppercase tracking-[0.45em]">
            {grandPrixLabel}
          </span>
          <span className="block h-px w-10 bg-gradient-to-l from-transparent to-[#C6A55C]/50" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-bold text-white uppercase tracking-[-0.04em] leading-[0.85] mb-6"
        >
          {festivalTitle}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="inline-flex items-center gap-4"
        >
          <span className="block h-px w-10 bg-white/15" />
          <span className="text-base md:text-lg font-light text-white/25 tracking-[0.35em]">
            2026
          </span>
          <span className="block h-px w-10 bg-white/15" />
        </motion.div>
      </motion.div>

      {/* ── Winner Spotlight ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 mb-14">
        <AnimatePresence mode="wait">
          {selectedFilm && (
            <WinnerSpotlight key={selectedFilm.id} film={selectedFilm} />
          )}
        </AnimatePresence>
      </div>

      {/* ── Navigation ── */}
      {dataLength > 1 && (
        <div className="relative z-10 flex items-center justify-center gap-5 mb-20 px-4">
          <button
            onClick={goPrev}
            className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
          </button>

          <div className="flex items-center gap-2">
            {dataSource.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Winner ${idx + 1}`}
                className={`rounded-full transition-all duration-500 ease-out ${
                  activeIndex === idx
                    ? 'w-9 h-2 bg-gradient-to-r from-[#C6A55C] to-[#DFC88A]'
                    : 'w-2 h-2 bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
          </button>
        </div>
      )}

      {/* ── Category grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto px-4 md:px-8"
      >
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="block h-px flex-1 max-w-[60px] bg-white/[0.08]" />
          <span className="text-[10px] md:text-[11px] font-semibold text-white/25 uppercase tracking-[0.3em]">
            {t('phase3.exploreCategories')}
          </span>
          <span className="block h-px flex-1 max-w-[60px] bg-white/[0.08]" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {dataSource.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-500 hover:-translate-y-1 ${
                activeIndex === idx
                  ? 'border-[#C6A55C]/40 shadow-[0_0_30px_rgba(198,165,92,0.12)]'
                  : 'border-white/[0.05] hover:border-white/[0.1]'
              }`}
            >
              <div className="relative h-24 md:h-28 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    activeIndex === idx
                      ? 'scale-110 brightness-75'
                      : 'brightness-[0.25] group-hover:brightness-[0.4] group-hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/50 to-transparent" />
              </div>

              <div className="relative px-3 py-3 bg-[#0a0a16]/80 text-center">
                <span
                  className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                    activeIndex === idx
                      ? 'text-[#C6A55C]'
                      : 'text-white/30 group-hover:text-white/60'
                  }`}
                >
                  {item.category}
                </span>
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C6A55C] to-[#DFC88A] transition-opacity duration-500 ${
                  activeIndex === idx ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
