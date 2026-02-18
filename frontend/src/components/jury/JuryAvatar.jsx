import React from 'react';

const JuryAvatar = ({ 
  member, 
  index, 
  activeIndex, 
  hoverIndex, 
  isMobile, 
  onClick, 
  onMouseEnter, 
  onMouseLeave, 
  getAssetImage,
  angleStep,
  radius
}) => {
  const isActive = index === activeIndex;
  const isHovered = hoverIndex === index;
    // mobile
  if (isMobile) {
    return (
      <button 
        onClick={() => onClick(index)} 
        className="flex flex-col items-center flex-shrink-0 gap-2 group"
      >
        <div className={`w-14 h-14 rounded-full p-[1.5px] bg-white transition-all ${
          isActive ? 'shadow-[0_0_15px_rgba(249,115,22,0.8)]' : 'opacity-80 hover:ring-2 hover:ring-blue-600'
        }`}>
          <img 
            src={getAssetImage(member.photo_url)} 
            className="w-full h-full rounded-full object-cover" 
            alt={member.first_name} 
          />
        </div>
        <span className={`text-[10px] font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
          {member.first_name}
        </span>
      </button>
    );
  }

  // Desktop
  const angle = angleStep * index;
  const rotationOffset = activeIndex * angleStep;

  return (
    <div
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(index)}
      className="absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 cursor-pointer group transition-all duration-500"
      style={{ 
        transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-(angle - rotationOffset)}deg)` 
      }}
    >
      <div className={`w-full h-full rounded-full p-[1.5px] bg-white transition-all duration-500 group-hover:scale-125 group-hover:ring-2 group-hover:ring-blue-600 ${
        isActive ? 'scale-110 shadow-xl ring-2 ring-orange-500' : 'opacity-90'
      }`}>
        <img 
          src={getAssetImage(member.photo_url)} 
          className="w-full h-full rounded-full object-cover" 
          alt="avatar" 
        />
      </div>
      <span className={`absolute top-full mt-2 text-[11px] font-bold text-white transition-opacity whitespace-nowrap drop-shadow-md ${
        isActive || isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        {member.first_name}
      </span>
    </div>
  );
};

export default JuryAvatar;