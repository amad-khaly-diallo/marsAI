import React from 'react';
import marsai from '../assets/images/marsai.png'; 
import mobilefilm from '../assets/images/mobilefilm.png';
import laplateforme from '../assets/images/laplateforme.png';




const mainPartners = [
  { id: 1, name: "La plateforme", logo: laplateforme },
  { id: 2, name: "Mobile Film festival", logo: mobilefilm },
  { id: 3, name: "MarsAI", logo: marsai },
  
];

const techPartners = [
  { id: 4, name: "Gemini", logo: "images/gemini-logo.png" },
  { id: 5, name: "Vision 8K", logo: "images/vision-8k-logo.png" },
  { id: 6, name: "Audio Pro", logo: "images/audio-pro-logo.png" },
  { id: 7, name: "Sora video", logo: "images/sora-video-logo.png" },
];

const Partners = () => {
  return (
    <div className="bg-[#070819] text-white min-h-screen bg-gradient-to-b from-sky-dark to-sky-light py-16 px-6">
      
      
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-4">
          Nos Partenaires
        </h1>
        <p className="text-body text-lg max-w-2xl mx-auto">
          Ils soutiennent l'innovation et la créativité. Découvrez les organisations 
          qui rendent le festival MarsAI possible.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-20">

        <section>
          <h2 className="text-2xl font-bold text-navy mb-8 border-l-4 border-primary pl-4">
            Partenaires Officiels
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainPartners.map((partner) => (
              <div key={partner.id} className="group relative   border-white/80 rounded-2xl flex items-center justify-center p-8 shadow-glass hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-full max-w-full opacity-80 group-hover:opacity-100 transition-opacity  group-hover:grayscale-0" 
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy mb-8 border-l-4 border-accent pl-4">
            Technologies & Outils
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techPartners.map((partner) => (
              // Carte Glassmorphism (Petite)
              <div key={partner.id} className="group h-24 backdrop-blur-sm border border-blue-900 rounded-xl flex items-center justify-center p-6 hover:bg-white/20 transition-colors duration-300">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-full max-w-full opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all" 
                />
              </div>
            ))}
          </div>
        </section>

        
        <div className="bg-gradient-to-r from-navy to-sky-dark rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/40 rounded-full blur-2xl -translate-x-10 -translate-y-10"></div>
          
          <h3 className="text-2xl font-bold mb-4 relative z-10">Devenir Partenaire ?</h3>
          <p className="mb-8 text-white/80 max-w-lg mx-auto relative z-10">
            Rejoignez l'aventure MarsAI et associez votre marque à l'avenir du cinéma et de l'intelligence artificielle.
          </p>
          <button className="bg-primary hover:bg-accent text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg relative z-10">
            Nous Contacter
          </button>
        </div>

      </div>
    </div>
  );
};

export default Partners;
