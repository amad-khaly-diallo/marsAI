import { useEffect, useRef } from 'react';

/**
 * Déconnecte automatiquement l'admin après une période d'inactivité.
 * - timeoutMs: durée d'inactivité avant déconnexion (par défaut 1h).
 * - onIdle: callback appelé quand le délai est dépassé (ex: logout()).
 */
export function useAdminIdleLogout({ timeoutMs = 60 * 60 * 1000, onIdle }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!onIdle) return;

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        onIdle();
      }, timeoutMs);
    };

    // Événements considérés comme activité
    const activityEvents = [
      'click',
      'keydown',
      'mousemove',
      'scroll',
      'touchstart',
    ];

    activityEvents.forEach((evt) =>
      window.addEventListener(evt, resetTimer, { passive: true }),
    );

    // Timer initial
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      activityEvents.forEach((evt) =>
        window.removeEventListener(evt, resetTimer),
      );
    };
  }, [timeoutMs, onIdle]);
}
