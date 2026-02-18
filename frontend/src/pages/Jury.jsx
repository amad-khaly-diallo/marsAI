import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import defaultAvatar from "../assets/images/avatar.jpg";
import bannerBg from "../assets/images/jury-bn.png"; 

const Jury = () => {
  const { t } = useTranslation();
  
  const [juryMembers, setJuryMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null); 
  const scrollRef = useRef(null);
  
  const radius = 250; 

  const imagesContext = require.context('../assets/images', false, /\.(png|jpe?g|svg)$/);

  const getAssetImage = (imagePath) => {
    if (!imagePath) return defaultAvatar;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    try {
      return imagesContext(`./${imagePath}`);
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

  useEffect(() => {
    if (scrollRef.current) {
      const activeItem = scrollRef.current.children[activeIndex];
      if (activeItem) {
        const timer = setTimeout(() => {
          activeItem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [activeIndex]);

  const nextMember = () => setActiveIndex((prev) => (prev + 1) % juryMembers.length);
  const prevMember = () => setActiveIndex((prev) => (prev - 1 + juryMembers.length) % juryMembers.length);
  const handleAvatarClick = (index) => setActiveIndex(index);

  if (loading) return <div className="text-white text-center py-20 bg-[#070819] min-h-screen">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center py-20 bg-[#070819] min-h-screen">Erreur: {error}</div>;
  if (juryMembers.length === 0) return null;

  const displayedMember = hoverIndex !== null ? juryMembers[hoverIndex] : juryMembers[activeIndex];
  const isHovering = hoverIndex !== null && hoverIndex !== activeIndex;
  const angleStep = 360 / juryMembers.length;

  return (
    <div className="w-full min-h-screen bg-[#070819] text-white bg-gradient-to-b from-sky-dark to-sky-light py-4 px-2 flex flex-col items-center justify-start overflow-hidden font-sans relative">
      
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden pointer-events-none">
        <img 
          src={bannerBg} 
          alt="Banner Background" 
          className="w-full h-full object-cover opacity-30 blur-s"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#070819]"></div>
      </div>

      <div className="text-center mt-24 mb-6 z-10 relative px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
          Jury du <span className="text-orange-500">Festival marsAI</span>
        </h1>
        <div className="h-[3px] w-20 bg-orange-500 mx-auto rounded-full mb-4 shadow-[0_0_15px_rgba(249,115,22,0.6)]"></div>
        <p className="text-gray-300 text-xs md:text-lg font-medium max-w-2xl mx-auto leading-relaxed px-4">
          Découvrez les experts d'exception qui évaluent vos créations générées par l'intelligence artificielle.
        </p>
      </div>

      <div className="md:hidden w-full overflow-x-auto py-4 mb-2 no-scrollbar flex items-start gap-6 px-10 z-10" ref={scrollRef}>
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {juryMembers.map((member, index) => (
          <div
            key={member.id}
            onClick={() => handleAvatarClick(index)}
            className="flex flex-col items-center flex-shrink-0 gap-2 cursor-pointer group"
          >
            <div className={`w-14 h-14 rounded-full p-[1.5px] transition-all duration-300 bg-white ${
              index === activeIndex 
                ? 'shadow-[0_0_15px_rgba(249,115,22,0.8)]' 
                : 'hover:ring-2 hover:ring-blue-600'
            }`}>
              <img src={getAssetImage(member.photo_url)} alt={member.first_name} className="w-full h-full rounded-full object-cover border border-white/20" />
            </div>
            <span className={`text-[10px] font-bold whitespace-nowrap transition-colors ${index === activeIndex ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
              {member.first_name}
            </span>
          </div>
        ))}
      </div>

      <div className="relative w-full h-[480px] md:h-[550px] flex items-center justify-center scale-95 md:scale-100 z-10">
        
        <div 
          className={`absolute z-30 w-[270px] h-[320px] bg-white rounded-2xl pt-12 text-center flex flex-col items-center border border-gray-100 transition-all duration-700 ease-in-out ${
            isHovering ? 'grayscale opacity-70 scale-95' : 'grayscale-0 opacity-100 scale-100'
          }`}
          style={{ 
            boxShadow: `0 0 40px rgba(30, 58, 138, 0.7), 0 0 80px rgba(30, 58, 138, 0.4), 0 25px 60px rgba(7, 8, 25, 0.9)` 
          }}
        >
          <div className="absolute -top-14 w-28 h-28 rounded-full p-[3px] bg-gradient-to-b from-blue-600 to-blue-700 z-50">
            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
              <img 
                src={getAssetImage(displayedMember.photo_url)} 
                alt={displayedMember.first_name}
                className="w-full h-full object-cover"
                onError={(e) => {e.target.src = defaultAvatar}}
              />
            </div>
          </div>

          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-0.5 mt-4 w-full px-2">
            {displayedMember.first_name} {displayedMember.last_name !== '-' ? displayedMember.last_name : ''}
          </h2>
          
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2 block border-b border-blue-500 pb-1 mx-6">
            {displayedMember.role}
          </span>
          
          <div className="w-full h-full overflow-y-auto px-3 custom-scroll-jury pb-10">
            <style>{`.custom-scroll-jury::-webkit-scrollbar { width: 3px; } .custom-scroll-jury::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }`}</style>
            <p className="text-gray-700 text-xs md:text-sm font-medium leading-relaxed text-center">
              {displayedMember.bio || "Aucune biographie disponible."}
            </p>
          </div>

          <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-8 py-2 pointer-events-none z-50">
            <button onClick={prevMember} className="pointer-events-auto p-1.5 rounded-full bg-white text-gray-400 border border-gray-100 hover:ring-2 hover:ring-orange-500 active:scale-90 shadow-md"><ChevronLeft size={16} /></button>
            <button onClick={nextMember} className="pointer-events-auto p-1.5 rounded-full bg-white text-gray-400 border border-gray-200 hover:ring-2 hover:ring-orange-500 active:scale-90 shadow-md"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div 
          className="hidden md:block absolute w-full h-full rounded-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `rotate(${activeIndex * -angleStep}deg)` }}
        >
          {juryMembers.map((member, index) => {
            const angle = angleStep * index;
            const isActive = index === activeIndex;

            return (
              <div
                key={member.id}
                onClick={() => handleAvatarClick(index)}
                onMouseEnter={() => setHoverIndex(index)} 
                onMouseLeave={() => setHoverIndex(null)} 
                className="absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 cursor-pointer z-20 transition-all duration-500 flex flex-col items-center group"
                style={{
                  transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle + (activeIndex * angleStep)}deg)`
                }}
              >
                <div className={`w-full h-full rounded-full p-[1.5px] transition-all duration-500 bg-white group-hover:scale-125 group-hover:ring-2 group-hover:ring-blue-600 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] ${
                  isActive 
                    ? 'scale-110 shadow-[0_0_25px_rgba(249,115,22,0.9)]' 
                    : 'opacity-90 ring-1 ring-white/10 shadow-lg'
                }`}>
                  <img src={getAssetImage(member.photo_url)} alt={member.first_name} className="w-full h-full rounded-full object-cover" />
                </div>
                <span className={`absolute top-full mt-2 text-[11px] font-bold text-white transition-opacity duration-300 whitespace-nowrap drop-shadow-md pointer-events-none ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  {member.first_name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Jury;