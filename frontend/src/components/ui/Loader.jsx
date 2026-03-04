import React from 'react';

export default function Loader({
  message = 'Chargement...',
  fullscreen = false,
}) {
  const containerClasses = fullscreen
    ? 'min-h-screen flex items-center justify-center'
    : 'py-10 flex items-center justify-center';

  return (
    <div className={`${containerClasses} bg-[#070819] text-white`}>
      <div className="text-center">
        <div className="mx-auto h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-t-transparent border-violet-400 animate-spin shadow-[0_0_18px_rgba(129,140,248,0.7)]" />
        <p className="mt-4 text-sm md:text-base text-white/70">{message}</p>
      </div>
    </div>
  );
}

