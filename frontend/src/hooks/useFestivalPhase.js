import { useCallback, useEffect, useState } from 'react';

// Hook personnalisé pour gérer la phase actuelle du festival
import { useLocation } from 'react-router-dom';

function normalizePhaseParam(raw) {
  if (!raw) return null;
  const value = String(raw).toLowerCase().trim();

  if (value === '1' || value === 'phase1') return 'phase1';
  if (value === '2' || value === 'phase2') return 'phase2';
  if (value === '3' || value === 'phase3') return 'phase3';

  return null;
}
// fin helper normalizePhaseParam

export function useFestivalPhase() {
  const { search } = useLocation(); // A supprimer si on veut pas que le hook réagisse aux changements de l'URL.
  const [phase, setPhase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhase = useCallback(async () => {
// A supprimer si on veut pas que le hook réagisse aux changements de l'URL.
    const forcedPhase = normalizePhaseParam(
      new URLSearchParams(search).get('phase'),
    );

    if (forcedPhase) {
      setPhase(forcedPhase);
      setError(null);
      setLoading(false);
      return;
    }
// ==========================
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
  }, [search]); // a remplacer par [] si on veut pas que le hook réagisse aux changements de l'URL (ex: navigation interne), mais c'est utile pour forcer une phase via l'URL sans recharger la page

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
