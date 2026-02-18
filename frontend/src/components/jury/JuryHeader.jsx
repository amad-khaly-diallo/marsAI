import React from 'react';

const JuryHeader = () => {
  return (
    <header className="text-center mt-24 mb-6 z-10 relative px-4">
      <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 uppercase tracking-tight">
        Jury du <span className="text-orange-500">Festival marsAI</span>
      </h1>
      
      <div className="h-[3px] w-20 bg-orange-500 mx-auto rounded-full mb-4 shadow-[0_0_15px_rgba(249,115,22,0.6)]"></div>
      
      <p className="text-gray-300 text-xs md:text-lg font-medium max-w-2xl mx-auto leading-relaxed px-4 p-4">
        Découvrez les experts d'exception qui évaluent vos créations générées par l'intelligence artificielle.
      </p>
    </header>
  );
};

export default JuryHeader;