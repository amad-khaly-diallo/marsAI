import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const CookieBanner = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('MarsIA_cookie_consent');
    if (consent !== 'accepted' && consent !== 'declined') {
      setIsVisible(true);
    }
  }, []);

  let cookieData = null;
  fetch('http://localhost:1337/api/cookie?locale=en')
    .then((response) => response.json())
    .then((data) => {
      cookieData = data;
    })
    .catch((error) => {
      console.error('Error fetching cookie data:', error);
    });

  const handleAccept = () => {
    localStorage.setItem('MarsIA_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('MarsIA_cookie_consent', 'declined');
    setIsVisible(false);
  };

  const refuse = () => {
    localStorage.setItem('MarsIA_cookie_consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    // Style adapté : Fond sombre, bordure fine, effet de flou (backdrop-blur)
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-black/80 backdrop-blur-md text-white p-6 z-[9999] flex flex-col md:flex-row justify-between items-center border border-white/10 rounded-2xl shadow-2xl">
      <div className="mb-4 md:mb-0 md:mr-8 text-center md:text-left">
        <p className="text-sm md:text-base font-light tracking-wide">
          <span className="font-bold text-violet-400">MarsIA</span>{' '}
          {t('cookies.description')}
        </p>
      </div>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={handleDecline}
          className="px-6 py-2 border border-white/30 text-white/70 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
        >
          {t('cookies.decline')}
        </button>
        <button
          onClick={handleAccept}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition-transform text-white px-8 py-2 rounded-full font-bold text-sm uppercase tracking-widest"
        >
          {t('cookies.accept')}
        </button>
      </div>
    </div>
  );
};
