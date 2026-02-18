import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Jury.module.css';

const JuryCard = ({ member, isHovering, onPrev, onNext, getMemberImage, defaultAvatar }) => (
  <article 
    className={`absolute z-30 w-[270px] h-[320px] bg-white rounded-2xl pt-12 text-center flex flex-col items-center border border-gray-100 transition-all duration-700 ease-in-out ${
      isHovering ? 'grayscale opacity-70 scale-95' : 'grayscale-0 opacity-100 scale-100'
    }`}
    style={{ boxShadow: `0 0 40px rgba(30, 58, 138, 0.7), 0 25px 60px rgba(7, 8, 25, 0.9)` }}
  >
    <div className="absolute -top-14 w-28 h-28 rounded-full p-[3px] bg-gradient-to-b from-blue-600 to-blue-700 z-50">
      <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
        <img 
          src={getMemberImage(member.photo_url)} 
          alt={member.first_name}
          className="w-full h-full object-cover"
          onError={(e) => {e.target.src = defaultAvatar}}
        />
      </div>
    </div>

    <h2 className="text-base md:text-lg font-bold text-gray-900 mb-0.5 mt-4 w-full px-2">
      {member.first_name} {member.last_name !== '-' ? member.last_name : ''}
    </h2>
    
    <span className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2 block border-b border-blue-500 pb-1 mx-6">
      {member.role}
    </span>
    
    <div className={`w-full h-full overflow-y-auto px-3 pb-10 ${styles.customScrollJury}`}>
      <p className="text-gray-700 text-xs md:text-sm font-medium leading-relaxed">
        {member.bio || "Aucune biographie disponible."}
      </p>
    </div>

    <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-8 py-2 pointer-events-none z-50">
      <button onClick={onPrev} className="pointer-events-auto p-1.5 rounded-full bg-white text-gray-400 border border-gray-100 hover:ring-2 hover:ring-orange-500 shadow-md">
        <ChevronLeft size={16} />
      </button>
      <button onClick={onNext} className="pointer-events-auto p-1.5 rounded-full bg-white text-gray-400 border border-gray-200 hover:ring-2 hover:ring-orange-500 shadow-md">
        <ChevronRight size={16} />
      </button>
    </div>
  </article>
);

export default JuryCard;