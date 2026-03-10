import { useCallback, useEffect, useState } from 'react';

export function useFestivalPhase() {
  const [phase, setPhase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhase = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/festival-phase', {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setPhase(data.phase);
    } catch (err) {
      console.error('Erreur récupération phase festival', err);
      setError('Impossible de récupérer la phase du festival');
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePhase = useCallback(async (newPhase) => {
    setError(null);
    try {
      const res = await fetch('/api/festival-phase', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phase: newPhase }),
      });
      if (!res.ok) {
        let userMessage = 'Impossible de modifier la phase du festival ( il faut entre 40 et 50 films pour la phase 2 ).';
        try {
          const errData = await res.json();
          if (errData?.message) {
            userMessage = errData.message;
          }
        } catch {
          // ignore parse errors, fallback message
        }
        throw new Error(userMessage);
      }
      const data = await res.json();
      setPhase(data.phase);
      return data.phase;
    } catch (err) {
      console.error('Erreur mise à jour phase', err);
      setError(err.message || 'Impossible de modifier la phase du festival ( il faut entre 40 et 50 films pour la phase 2 ).');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchPhase();
  }, [fetchPhase]);

  return {
    phase,
    loading,
    error,
    fetchPhase,
    updatePhase,
  };
}
