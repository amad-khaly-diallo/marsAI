import React, { useState, useEffect } from 'react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('marsai_cookies_v2');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('marsai_cookies_v2', 'accepted');
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem('marsai_cookies_v2', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 max-w-xs bg-brand-bg border border-brand-border rounded-xl shadow-soft-sm p-4 z-[9999] animate-fadeIn">
      <p className="text-xs text-brand-muted leading-relaxed font-light">
        Ce site utilise des cookies pour améliorer votre expérience.
      </p>
      <div className="flex gap-2 mt-3">
        <button
          onClick={accept}
          className="bg-brand-primary text-white text-xs font-medium rounded-full px-4 py-1.5 hover:bg-brand-accent transition"
        >
          Accepter
        </button>
        <button
          onClick={decline}
          className="bg-transparent text-brand-muted text-xs font-light rounded-full px-4 py-1.5 hover:text-brand-white transition border border-brand-border hover:border-brand-primary/50"
        >
          Refuser
        </button>
      </div>
    </div>
  );
};
