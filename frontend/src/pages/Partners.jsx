import React from 'react';

// Mock data des partenaires
const partnersData = [
  {
    id: 1,
    name: "CineVision Pro",
    logoUrl: "https://via.placeholder.com/200x100/1e293b/60a5fa?text=CineVision+Pro",
    websiteUrl: "https://cinevision.example.com"
  },
  {
    id: 2,
    name: "FilmTech Studios",
    logoUrl: "https://via.placeholder.com/200x100/1e293b/60a5fa?text=FilmTech",
    websiteUrl: "https://filmtech.example.com"
  },
  {
    id: 3,
    name: "Digital Arts Media",
    logoUrl: "https://via.placeholder.com/200x100/1e293b/60a5fa?text=Digital+Arts",
    websiteUrl: "https://digitalartsmed.example.com"
  },
  {
    id: 4,
    name: "Mars Production",
    logoUrl: "https://via.placeholder.com/200x100/1e293b/60a5fa?text=Mars+Prod",
    websiteUrl: "https://marsproduction.example.com"
  },
  {
    id: 5,
    name: "Creative Vision",
    logoUrl: "https://via.placeholder.com/200x100/1e293b/60a5fa?text=Creative+Vision",
    websiteUrl: "https://creativevision.example.com"
  },
  {
    id: 6,
    name: "Stellar Films",
    logoUrl: "https://via.placeholder.com/200x100/1e293b/60a5fa?text=Stellar+Films",
    websiteUrl: "https://stellarfilms.example.com"
  },
  {
    id: 7,
    name: "Golden Frame",
    logoUrl: "https://via.placeholder.com/200x100/1e293b/60a5fa?text=Golden+Frame",
    websiteUrl: "https://goldenframe.example.com"
  },
  {
    id: 8,
    name: "Urban Cinema",
    logoUrl: "https://via.placeholder.com/200x100/1e293b/60a5fa?text=Urban+Cinema",
    websiteUrl: "https://urbancinema.example.com"
  }
];

const Partners = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos Partenaires
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ils nous font confiance et contribuent au succès du festival
          </p>
        </div>

        {/* Grid de partenaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {partnersData.map((partner) => (
            <a
              key={partner.id}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-slate-800 rounded-xl p-8 h-full flex flex-col items-center justify-center
                            border border-slate-700 shadow-lg
                            transition-all duration-300 ease-in-out
                            hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/20
                            hover:-translate-y-2 cursor-pointer">
                {/* Logo Container */}
                <div className="mb-6 overflow-hidden">
                  <img
                    src={partner.logoUrl}
                    alt={`Logo ${partner.name}`}
                    className="w-48 h-24 object-contain
                             transition-transform duration-300 ease-in-out
                             group-hover:scale-110
                             filter brightness-90 group-hover:brightness-100"
                  />
                </div>

                {/* Partner Name */}
                <h3 className="text-gray-100 font-semibold text-center text-lg
                             transition-colors duration-300
                             group-hover:text-blue-400">
                  {partner.name}
                </h3>

                {/* Hover Indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-blue-500 text-sm flex items-center gap-2">
                    Visiter le site
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Call to Action optionnel */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 text-lg mb-6">
            Vous souhaitez devenir partenaire ?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                           px-8 py-3 rounded-lg
                           transition-all duration-300
                           hover:shadow-lg hover:shadow-blue-600/50
                           hover:scale-105">
            Contactez-nous
          </button>
        </div>
      </div>
    </div>
  );
};

export default Partners;
