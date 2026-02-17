import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import defaultAvatar from "../assets/images/avatar.jpg";

const Jury = () => {
  const { t } = useTranslation();
  
  const [juryMembers, setJuryMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const radius = 250; 

  const imagesContext = require.context('../assets/images', false, /\.(png|jpe?g|svg)$/);

  const getAssetImage = (imageName) => {
    if (!imageName) return defaultAvatar;
    try {
      return imagesContext(`./${imageName}`);
    } catch (err) {
      return defaultAvatar;
    }
  };

  useEffect(() => {
    const fetchJury = async () => {
      try {
        const response = await fetch('/api/jury'); 
        if (!response.ok) throw new Error('Erreur chargement');
        const data = await response.json();
        setJuryMembers(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchJury();
  }, []);

  const nextMember = () => setActiveIndex((prev) => (prev + 1) % juryMembers.length);
  const prevMember = () => setActiveIndex((prev) => (prev - 1 + juryMembers.length) % juryMembers.length);
  const handleAvatarClick = (index) => setActiveIndex(index);

  if (loading) return <div className="text-white text-center py-20 bg-[#070819] min-h-screen">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center py-20 bg-[#070819] min-h-screen">Erreur: {error}</div>;
  if (juryMembers.length === 0) return null;

  const activeMember = juryMembers[activeIndex];
  const angleStep = 360 / juryMembers.length;

  return (
    <div className="w-full min-h-screen bg-[#070819] text-white bg-gradient-to-b from-sky-dark to-sky-light py-4 px-2 flex flex-col items-center justify-start overflow-hidden font-sans">
      
      <div className="text-center mt-24 mb-4 z-10 relative">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 drop-shadow-lg">
          {t("jury.mainTitle", "RENCONTREZ NOTRE")}
          <span className="text-orange-500"> {t("jury.titleHighlight", "JURY EXCEPTIONNEL")}</span>
        </h1>
        <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full mb-3 shadow-[0_0_15px_rgba(249,115,22,0.6)]"></div>
        <p className="text-blue-200 text-xs md:text-sm font-medium uppercase tracking-[0.3em] opacity-80">
          {t("jury.edition", "Édition Prestige 2026")}
        </p>
      </div>

      <div className="relative w-full h-[550px] flex items-center justify-center scale-95 md:scale-100">
        
        <div 
          className="absolute z-30 w-[270px] h-[320px] bg-white rounded-2xl pt-12 text-center flex flex-col items-center border border-gray-100"
          style={{ 
            boxShadow: `
              0 0 30px rgba(30, 58, 138, 0.6), 
              0 0 60px rgba(30, 58, 138, 0.4), 
              0 20px 50px rgba(7, 8, 25, 0.9)
            ` 
          }}
        >
          
          <div className="absolute -top-14 w-28 h-28 rounded-full p-1 bg-gradient-to-b from-orange-400 to-red-500 shadow-xl z-50">
            <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white">
              <img 
                src={getAssetImage(activeMember.photo_url)} 
                alt={activeMember.first_name}
                className="w-full h-full object-cover"
                onError={(e) => {e.target.src = defaultAvatar}}
              />
            </div>
          </div>

          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-0.5 mt-4 w-full px-2">
            {activeMember.first_name} {activeMember.last_name !== '-' ? activeMember.last_name : ''}
          </h2>
          
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2 block border-b border-blue-500 pb-1 mx-6">
            {activeMember.role}
          </span>
          
          <div className="w-full h-full overflow-y-auto px-3 custom-scroll-jury pb-10">
            <style>{`
              .custom-scroll-jury::-webkit-scrollbar { width: 3px; }
              .custom-scroll-jury::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
            `}</style>
            <p className="text-gray-700 text-xs md:text-sm font-medium leading-relaxed text-center">
              {activeMember.bio || "Aucune biographie disponible."}
            </p>
          </div>

          <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-8 py-2 pointer-events-none z-50">
            <button 
              onClick={prevMember} 
              className="pointer-events-auto p-1 rounded-full bg-white text-gray-400 border border-gray-100 hover:ring-2 hover:ring-orange-500 hover:text-orange-500 transition-all duration-300 active:scale-90 shadow-md"
            >
              <ChevronLeft size={14} />
            </button>
            <button 
              onClick={nextMember} 
              className="pointer-events-auto p-1 rounded-full bg-white text-gray-400 border border-gray-200 hover:ring-2 hover:ring-orange-500 hover:text-orange-500 transition-all duration-300 active:scale-90 shadow-md"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div 
          className="absolute w-full h-full rounded-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `rotate(${activeIndex * -angleStep}deg)` }}
        >
          {juryMembers.map((member, index) => {
            const angle = angleStep * index;
            const isActive = index === activeIndex;

            return (
              <div
                key={member.id}
                onClick={() => handleAvatarClick(index)}
                className="absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 cursor-pointer z-20 transition-all duration-500"
                style={{
                  transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle + (activeIndex * angleStep)}deg)`
                }}
              >
                <div className={`w-full h-full rounded-full p-1 shadow-lg transition-all duration-500 ${
                  isActive 
                  ? 'scale-0 opacity-0 pointer-events-none' 
                  : 'scale-100 opacity-90 hover:scale-110 bg-white ring-2 ring-white/10'
                }`}>
                  <img src={getAssetImage(member.photo_url)} alt={member.first_name} className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Jury;