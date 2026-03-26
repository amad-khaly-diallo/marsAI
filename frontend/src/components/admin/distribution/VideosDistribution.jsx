import { useState, useEffect } from 'react';
import { SectionHeader, ErrorAlert, SectionCard } from '../common';
import api from '../../../services/api';
import { getAdmins } from '../../../services/admin';

export default function VideosDistribution({ currentAdmin }) {
  const [admins, setAdmins] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const isSuperAdmin = currentAdmin?.role === 'super_admin';

  useEffect(() => {
    if (!isSuperAdmin) return;
    setLoadingAdmins(true);
    getAdmins()
      .then((data) => {
        setAdmins(data || []);
        setSelectedIds(new Set((data || []).map((a) => a.id)));
      })
      .catch(() => setAdmins([]))
      .finally(() => setLoadingAdmins(false));
  }, [isSuperAdmin]);

  const toggleAdmin = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === admins.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(admins.map((a) => a.id)));
    }
  };

  const handleDistribute = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const adminIds = [...selectedIds];
      const data = await api.post('/admin/films/distribute', { adminIds });
      setResult(data || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const allSelected = admins.length > 0 && selectedIds.size === admins.length;
  const noneSelected = selectedIds.size === 0;

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Répartition automatique des vidéos"
        subtitle="Sélectionnez les admins participants. Chaque vidéo sera assignée à au moins 2 admins en équilibrant la charge."
      />
      {!isSuperAdmin && (
        <p className="rounded-md border border-amber-500/60 bg-amber-950/40 px-3 py-2 text-xs text-amber-100">
          Seul un compte <span className="font-semibold">super_admin</span> peut
          lancer la répartition.
        </p>
      )}
      {isSuperAdmin && (
        <SectionCard title="Admins participants">
          {loadingAdmins ? (
            <p className="text-xs text-brand-muted py-2">Chargement des admins...</p>
          ) : admins.length === 0 ? (
            <p className="text-xs text-brand-muted py-2">Aucun compte admin trouvé.</p>
          ) : (
            <>
              <div className="mb-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleAll}
                  className="text-[11px] font-medium text-brand-primary hover:underline"
                >
                  {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
                </button>
                <span className="text-[11px] text-brand-muted">
                  {selectedIds.size} / {admins.length} sélectionné(s)
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {admins.map((admin) => {
                  const isChecked = selectedIds.has(admin.id);
                  return (
                    <button
                      key={admin.id}
                      type="button"
                      onClick={() => toggleAdmin(admin.id)}
                      className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                        isChecked
                          ? 'border-brand-primary/50 bg-brand-primary/10 text-slate-100'
                          : 'border-slate-800/80 bg-slate-950/60 text-brand-muted hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-bold transition-colors ${
                          isChecked
                            ? 'border-brand-primary bg-brand-primary text-slate-900'
                            : 'border-slate-600 bg-transparent'
                        }`}
                      >
                        {isChecked && '✓'}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium">
                          {admin.first_name} {admin.last_name}
                        </p>
                        <p className="truncate text-[10px] text-brand-muted">
                          {admin.email}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] text-brand-muted">
                Minimum par vidéo :{' '}
                <span className="font-semibold text-slate-100">2 admins</span>
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  disabled={loading || noneSelected}
                  onClick={handleDistribute}
                  className="inline-flex rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Répartition en cours...' : 'Lancer la répartition'}
                </button>
              </div>
            </>
          )}
          <ErrorAlert message={error} className="mt-3" />
          {result && (
            <div className="mt-3 rounded-md border border-emerald-500/40 bg-emerald-950/30 px-3 py-3 text-xs text-emerald-100 space-y-1">
              <p className="font-semibold text-emerald-200">
                Répartition effectuée avec succès.
              </p>
              <p>
                Films concernés :{' '}
                <span className="font-mono">{result.moviesCount ?? '—'}</span>
              </p>
              <p>
                Nouvelles assignations :{' '}
                <span className="font-mono">{result.assignmentsCreated ?? '0'}</span>
              </p>
            </div>
          )}
        </SectionCard>
      )}
    </div>
  );
}
