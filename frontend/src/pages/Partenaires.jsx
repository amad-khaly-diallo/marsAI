import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

import marsai from '../assets/images/marsai.png'; 
import mobilefilm from '../assets/images/mobilefilm.png';
import laplateforme from '../assets/images/laplateforme.png';
import bannerImg from '../assets/images/banner.jpg'; 

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
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#070819] text-white min-h-screen bg-gradient-to-b from-sky-dark to-sky-light pb-20">
      
      
      
      <div className="w-full bg-[#0a0b2e] shadow-2xl relative z-10">
        <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
        
          <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
            <img 
              src={bannerImg} 
              alt="Bannière MarsAI" 
              className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${loaded ? 'scale-105' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0b2e]"></div>
          </div>

          
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-left space-y-6">
            
            <h1 className={`text-4xl md:text-6xl font-extrabold transition-all duration-1000 ease-out
              ${loaded 
                ? 'text-white translate-y-0 opacity-100 [text-shadow:_0_0_30px_#000080,_0_0_60px_rgba(0,0,128,0.9)]' 
                : 'text-transparent translate-y-10 opacity-0'
              }
            `}>
              {t("partners.title", "Nos Partenaires")}
            </h1>
            
            <div className={`h-1 bg-primary rounded-full transition-all duration-1000 delay-300 ${loaded ? 'w-24' : 'w-0'}`}></div>

            <p className={`text-gray-300 text-lg md:text-xl leading-relaxed transition-all duration-1000 delay-500
               ${loaded 
                 ? 'translate-y-0 opacity-100 [text-shadow:_0_0_15px_rgba(0,0,128,0.6)]' 
                 : 'translate-y-10 opacity-0'
               }
            `}>
              {t(
                "partners.subtitle",
                "Ils soutiennent l'innovation et la créativité. Découvrez les organisations qui rendent le festival MarsAI possible."
              )}
            </p>

            <div className={`transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button className="mt-6 px-10 py-3 bg-blue-900/40 hover:bg-blue-800 border border-blue-500/30 rounded-full text-white transition-all shadow-[0_0_20px_rgba(0,0,128,0.4)] hover:shadow-[0_0_30px_rgba(0,0,128,0.7)]">
                  En savoir plus
                </button>
            </div>

          </div>

        </div>
      </div>
     
      <div className="max-w-6xl mx-auto px-6 mt-20 space-y-20">

        <section>
          <h2 className="text-3xl font-bold text-navy mb-10 border-l-4 border-primary pl-4">
            {t("partners.official", "Partenaires Officiels")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainPartners.map((partner) => (
              <div key={partner.id} className="group relative border-white/80 rounded-2xl flex items-center justify-center p-8 shadow-glass hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-full max-w-full opacity-80 group-hover:opacity-100 transition-opacity group-hover:grayscale-0" 
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-navy mb-10 border-l-4 border-accent pl-4">
            {t("partners.techTitle", "Technologies & Outils")}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techPartners.map((partner) => (
              <div key={partner.id} className="group h-32 backdrop-blur-sm border border-blue-900 rounded-xl flex items-center justify-center p-6 hover:bg-white/20 transition-colors duration-300">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-full max-w-full opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all" 
                />
              </div>
            ))}
          </div>
        </section>
        
        <div className="bg-gradient-to-r from-navy to-sky-dark rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/30 rounded-full blur-3xl -translate-x-10 -translate-y-10"></div>
          
          <h3 className="text-3xl font-bold mb-6 relative z-10">Devenir Partenaire ?</h3>
          <p className="mb-8 text-white/90 text-lg max-w-xl mx-auto relative z-10">
            {t(
              "partners.ctaText",
              "Rejoignez l'aventure MarsAI et associez votre marque à l'avenir du cinéma et de l'intelligence artificielle."
            )}
          </p>
          <button className="bg-primary hover:bg-accent text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-900/50 relative z-10 text-lg">
            {t("partners.ctaButton", "Nous Contacter")}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Partners;