import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

export function useFestivalPhase() {
  const [phase, setPhase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhase = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get('/festival-phase');
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
      const data = await api.put('/festival-phase', { phase: newPhase });
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
