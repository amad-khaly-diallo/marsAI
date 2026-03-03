import React from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalized } from '../../utils/sanity';

const JuryHeader = ({ pageData }) => {
  const { t, i18n } = useTranslation();

  const tag =
    getLocalized(pageData?.tag, i18n) ||
    t('jury.tag', 'Rencontrez le jury');
  const title =
    getLocalized(pageData?.title, i18n) ||
    t('jury.title', 'Jury du Festival');
  const festivalName = pageData?.festivalName || 'marsAI';
  const description =
    getLocalized(pageData?.description, i18n) ||
    t(
      'jury.description',
      "Découvrez les experts d'exception qui évaluent vos créations générées par l'intelligence artificielle.",
    );

  return (
    <>
      <header className="text-center mt-28 md:mt-20 mb-12 z-10 relative px-4 flex flex-col items-center animate-[fadeIn_1s_each-out]">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-[1.5px] w-6 bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-white uppercase font-medium">
            {tag}
          </span>
          <div className="h-[1.5px] w-6 bg-pink-500 shadow-[0_0_8px_#ec4899]"></div>
        </div>

        <h1 className="flex flex-col items-center leading-none tracking-tighter italic uppercase">
          <span className="text-3xl md:text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent mb-1 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
            {title}
          </span>

          <span
            className="text-5xl md:text-8xl font-black text-white relative 
                           [paint-order:stroke_fill] 
                           [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:3.5px_black]
                           drop-shadow-[0_0_30px_rgba(59,130,246,0.9)]"
          >
            {festivalName}
          </span>
        </h1>

        <div className="mt-8 h-[4px] md:h-[5px] w-40 md:w-72 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full shadow-[0_0_25px_rgba(59,130,246,0.6)]"></div>

        <div className="mt-8 text-center">
          <p className="text-gray-300 text-xs md:text-lg font-medium max-w-2xl mx-auto leading-relaxed px-4 p-4">
            {description}
          </p>
          <p className="text-blue-400 text-[9px] md:text-xs mt-3 tracking-[0.3em] font-mono opacity-80">
            MARSEILLE // 2026
          </p>
        </div>
      </header>
    </>
  );
};

export default JuryHeader;
