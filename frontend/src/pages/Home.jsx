import React from "react";
import { Link } from "react-router-dom"; // Import pour la navigation sans rechargement

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* TITRE */}
      <h2 className="text-4xl md:text-6xl font-bold font-monument text-mars-blue mb-6 uppercase">
        Bienvenue sur le Festival marsAI
      </h2>

      {/* DESCRIPTION */}
      <p className="mb-10 text-lg md:text-xl text-gray-300 max-w-2xl font-inter">
        Découvrez le premier festival mondial de courts-métrages générés par IA
        !
      </p>

      {/* GROUPE DE BOUTONS */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Bouton 1 : Participer */}
        <Link
          to="/submission"
          className="bg-mars-blue hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-900/50"
        >
          Participer au concours
        </Link>

        {/* Bouton 2 : Voir les Partenaires (NOUVEAU) */}
        <Link
          to="/partners"
          className="bg-transparent border-2 border-white hover:border-mars-blue hover:text-mars-blue text-white px-8 py-4 rounded-full font-bold transition-all duration-300"
        >
          Nos Partenaires
        </Link>
      </div>
    </div>
  );
}
