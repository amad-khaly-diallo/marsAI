import React, { useEffect, useState, useRef, useMemo } from 'react';
import defaultAvatar from "../../assets/images/avatar.jpg";
import bannerBg from "../../assets/images/jury-bn.png";
import JuryCard from './JuryCard';
import JuryAvatar from './JuryAvatar';
import JuryHeader from './JuryHeader'; 
import styles from './Jury.module.css';

const Jury = () => {
  const [juryMembers, setJuryMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null); 
  const scrollRef = useRef(null);
  
  const radius = 250; 

  const imagesContext = useMemo(() => 
    require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/)
  , []);

  const getAssetImage = (path) => {
    if (!path) return defaultAvatar;
    if (path.startsWith('http')) return path;
    try { return imagesContext(`./${path}`); } catch { return defaultAvatar; }
  };

  useEffect(() => {
    fetch('/api/jury')
      .then(res => res.json())
      .then(data => { 
        setJuryMembers(data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (scrollRef.current?.children[activeIndex]) {
      setTimeout(() => {
        scrollRef.current.children[activeIndex].scrollIntoView({ 
          behavior: 'smooth', 
          inline: 'center' 
        });
      }, 100);
    }
  }, [activeIndex]);

  const angleStep = useMemo(() => 
    juryMembers.length ? 360 / juryMembers.length : 0
  , [juryMembers]);

  const isHovering = hoverIndex !== null && hoverIndex !== activeIndex;

  if (loading || !juryMembers.length) return null;

  return (
    <div className="w-full min-h-screen bg-[#070819] text-white py-4 px-2 flex flex-col items-center justify-start overflow-hidden relative font-sans">
      
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 pointer-events-none">
        <img 
          src={bannerBg} 
          className="w-full h-full object-cover opacity-30 blur-sm" 
          alt="Banner" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#070819]"></div>
      </div>

      <JuryHeader />

      {/*(Mobile View) */}
      <nav 
        className={`md:hidden w-full overflow-x-auto py-4 mb-2 flex items-start gap-6 px-10 z-10 ${styles.noScrollbar}`} 
        ref={scrollRef}
      >
        {juryMembers.map((member, index) => (
          <JuryAvatar 
            key={member.id} 
            member={member} 
            index={index} 
            activeIndex={activeIndex} 
            isMobile={true}
            onClick={setActiveIndex}
            getAssetImage={getAssetImage}
          />
        ))}
      </nav>

      {/* (Desktop & Card) */}
      <main className="relative w-full h-[480px] md:h-[550px] flex items-center justify-center z-10">
        
        <JuryCard 
          member={isHovering ? juryMembers[hoverIndex] : juryMembers[activeIndex]}
          isHovering={isHovering}
          onPrev={() => setActiveIndex(p => (p - 1 + juryMembers.length) % juryMembers.length)}
          onNext={() => setActiveIndex(p => (p + 1) % juryMembers.length)}
          getMemberImage={getAssetImage}
          defaultAvatar={defaultAvatar}
        />

        {/* Rotation circulaire des avatars sur le bureau */}
        <div 
          className="hidden md:block absolute w-full h-full transition-transform duration-1000 ease-out" 
          style={{ transform: `rotate(${activeIndex * -angleStep}deg)` }}
        >
          {juryMembers.map((member, index) => (
            <JuryAvatar 
              key={member.id}
              member={member}
              index={index}
              activeIndex={activeIndex}
              hoverIndex={hoverIndex}
              isMobile={false}
              onClick={setActiveIndex}
              onMouseEnter={setHoverIndex}
              onMouseLeave={() => setHoverIndex(null)}
              getAssetImage={getAssetImage}
              angleStep={angleStep}
              radius={radius}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Jury;