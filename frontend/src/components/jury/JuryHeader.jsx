import React from 'react';
import bannerBg from "../../assets/images/jury-bn.png";

const JuryHeader = () => {
  return (
    <>
      {/* Section arrière-plan de la bannière exclusive du jury */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 pointer-events-none">
        <img 
          src={bannerBg} 
          className="w-full h-full object-cover opacity-30 blur-s" 
          alt="Banner" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#070819]"></div>
      </div>

      {/* Section de texte d'en-tête */}
      <header className="text-center mt-24 mb-6 z-10 relative px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 uppercase tracking-tight">
          Jury du <span className="text-orange-500">Festival marsAI</span>
        </h1>
        <div className="h-[3px] w-20 bg-orange-500 mx-auto rounded-full mb-4 shadow-[0_0_15px_rgba(249,115,22,0.6)]"></div>
        <p className="text-gray-300 text-xs md:text-lg font-medium max-w-2xl mx-auto leading-relaxed px-4 p-4">
          Découvrez les experts d'exception qui évaluent vos créations générées par l'intelligence artificielle.
        </p>
      </header>
    </>
  );
};

export default JuryHeader;