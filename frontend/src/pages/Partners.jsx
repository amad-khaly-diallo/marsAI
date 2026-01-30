import React from "react";
import { Link } from "react-router-dom";

const Partners = () => {
  // Données de test (Mocks)
  const partners = [
    { id: 1, name: "La Plateforme_" },
    { id: 2, name: "Mobile Film Festival" },
    { id: 3, name: "Mairie de Marseille" },
    { id: 4, name: "Région Sud" },
    { id: 5, name: "CNC" },
    { id: 6, name: "Adobe" },
    { id: 7, name: "Nvidia" },
    { id: 8, name: "RunwayML" },
  ];

  return (
    // CONTENEUR PRINCIPAL : Utilise 'bg-mars-dark' défini dans tailwind.config.js
    <div className="min-h-screen bg-mars-dark text-white font-inter">
      {/* HEADER SIMPLE AVEC RETOUR ACCUEIL */}
      <div className="p-6">
        <Link
          to="/"
          className="text-gray-400 hover:text-white transition-colors"
        >
          &larr; Retour à l'accueil
        </Link>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* TITRE DE LA PAGE : Utilise 'font-monument' et 'text-mars-blue' */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-monument uppercase text-mars-blue mb-6 tracking-wider">
            Nos Partenaires
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Ils soutiennent l'innovation culturelle et technologique du festival
            marsAI.
          </p>
        </div>

        {/* GRILLE DES PARTENAIRES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group relative bg-[#2A2A2A] rounded-xl p-8 h-40 flex items-center justify-center 
                         border border-transparent hover:border-mars-blue hover:shadow-[0_0_15px_rgba(41,51,211,0.5)] 
                         transition-all duration-300 cursor-pointer"
            >
              {/* Simulation de Logo (Texte) */}
              <span className="text-center font-bold text-gray-400 group-hover:text-white transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
