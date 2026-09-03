import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

export function useAdminAuth() {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setChecking(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setAdmin(null);
        setIsAuthenticated(false);
        return;
      }

      const data = await api.get('/admins/me');
      if (data) {
        setAdmin(data);
        setIsAuthenticated(true);
      } else {
        setAdmin(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      setError("Erreur réseau lors de la vérification de l'accès admin.");
      setIsAuthenticated(false);
      setAdmin(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const logout = useCallback(async () => {
    try {
      await api.post('/admins/auth/logout');
    } catch {
      // ignore
    } finally {
      try {
        localStorage.removeItem('adminToken');
      } catch {
        // ignore
      }
      setAdmin(null);
      setIsAuthenticated(false);
    }
  }, []);

  return {
    admin,
    role: admin?.role || null,
    checking,
    isAuthenticated,
    error,
    reload: load,
    logout,
  };
}
