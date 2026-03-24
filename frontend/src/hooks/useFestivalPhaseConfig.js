import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

const PHASE_KEYS = ['phase1', 'phase2', 'phase3'];

function normalizeConfigs(list) {
  const map = {};
  for (const item of list || []) {
    if (PHASE_KEYS.includes(item.phase)) {
      map[item.phase] = item;
    }
  }
  return map;
}

export function useFestivalPhaseConfig() {
  const [configs, setConfigs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConfigs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get('/festival-phase/config');
      setConfigs(normalizeConfigs(data));
    } catch (err) {
      console.error('Erreur récupération config phases', err);
      setError(
        'Impossible de récupérer la configuration des dates de phases du festival.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const saveConfig = useCallback(async (phase, payload) => {
    setError(null);
    try {
      const body = {
        phase,
        label: payload.label,
        endsAt: payload.endsAt,
      };
      const updated = await api.put('/festival-phase/config', body);
      setConfigs((prev) => ({
        ...(prev || {}),
        [phase]: updated,
      }));
      return updated;
    } catch (err) {
      console.error('Erreur mise à jour config phase', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  return {
    configs,
    loading,
    error,
    fetchConfigs,
    saveConfig,
  };
}
