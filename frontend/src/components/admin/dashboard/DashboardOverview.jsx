import { SectionHeader, ErrorAlert, StatCard } from '../common';
import { useDashboardStats } from '../hooks';
import { useAdmin } from '../../../contexts';
import { useFestivalPhase } from '../../../hooks/useFestivalPhase';
import { useFestivalPhaseConfig } from '../../../hooks/useFestivalPhaseConfig';

export default function DashboardOverview() {
  const { stats, loading, error } = useDashboardStats();
  const { admin } = useAdmin();
  const {
    phase,
    loading: phaseLoading,
    error: phaseError,
    updatePhase,
  } = useFestivalPhase();
  const {
    configs,
    loading: configLoading,
    error: configError,
    saveConfig,
  } = useFestivalPhaseConfig();

  const handleSet = async (p) => {
    try {
      await updatePhase(p);
    } catch (err) {
      alert('Échec mise à jour phase: ' + (err.message || err));
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        badge="Dashboard"
        title="Vue d'ensemble"
        subtitle="Surveillez l'activité du festival: soumissions, réalisateurs et engagement newsletter."
      />
      <ErrorAlert message={error || phaseError || configError} />

      {/* contrôle de la phase (super_admin seulement) */}
      <section className="bg-white/10 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Phase du festival</h2>
        {phaseLoading ? (
          <p>Chargement...</p>
        ) : (
          <p className="mb-2">
            Phase courante : <strong>{phase || 'inconnue'}</strong>
          </p>
        )}
        {admin?.role === 'super_admin' && (
          <>
            <div className="space-x-2 mb-4">
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                disabled={phase === 'phase1'}
                onClick={() => handleSet('phase1')}
              >
                Phase 1
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                disabled={phase === 'phase2'}
                onClick={() => handleSet('phase2')}
              >
                Phase 2
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                disabled={phase === 'phase3'}
                onClick={() => handleSet('phase3')}
              >
                Phase 3
              </button>
            </div>

            {/* configuration des dates de phases pour le timer */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <h3 className="text-md font-semibold mb-2">
                Dates des phases (compte à rebours)
              </h3>
              {configLoading && !configs && <p>Chargement de la configuration…</p>}
              {!configLoading && configs && (
                <div className="space-y-3">
                  {['phase1', 'phase2', 'phase3'].map((p) => {
                    const cfg = configs[p] || {};

                    const label = cfg.label || {
                      phase1: 'Soumissions des films',
                      phase2: 'Visionnage & sélection',
                      phase3: 'Jour du festival',
                    }[p];

                    const endsAtValue = (() => {
                      if (!cfg.endsAt) return '';
                      const d = new Date(cfg.endsAt);
                      if (Number.isNaN(d.getTime())) return '';
                      const pad = (n) => n.toString().padStart(2, '0');
                      const year = d.getFullYear();
                      const month = pad(d.getMonth() + 1);
                      const day = pad(d.getDate());
                      const hours = pad(d.getHours());
                      const minutes = pad(d.getMinutes());
                      return `${year}-${month}-${day}T${hours}:${minutes}`;
                    })();

                    const handleChange = async (field, value) => {
                      const next = {
                        phase: p,
                        label,
                        endsAt:
                          field === 'endsAt'
                            ? new Date(value).toISOString()
                            : cfg.endsAt || new Date().toISOString(),
                      };

                      if (field === 'label') {
                        next.label = value;
                      }

                      try {
                        await saveConfig(p, {
                          label: next.label,
                          endsAt: next.endsAt,
                        });
                      } catch (err) {
                        alert(
                          'Échec de la mise à jour de la configuration de phase: ' +
                            (err.message || err),
                        );
                      }
                    };

                    return (
                      <div
                        key={p}
                        className="grid gap-2 md:grid-cols-[1fr,1fr] items-end"
                      >
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Libellé {p}
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border border-white/20 bg-black/20 px-2 py-1 text-sm"
                            defaultValue={label}
                            onBlur={(e) =>
                              handleChange('label', e.target.value.trim())
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Fin de la phase ({p})
                          </label>
                          <input
                            type="datetime-local"
                            className="w-full rounded border border-white/20 bg-black/20 px-2 py-1 text-sm"
                            defaultValue={endsAtValue}
                            onBlur={(e) =>
                              e.target.value &&
                              handleChange('endsAt', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Films soumis"
          value={stats.movies}
          loading={loading}
          description="Nombre total de films enregistrés dans la base."
        />
        <StatCard
          label="Réalisateurs inscrits"
          value={stats.filmmakers}
          loading={loading}
          description='Dossiers de réalisateurs créés via le formulaire "Participer".'
        />
        <StatCard
          label="Newsletter"
          value={stats.newsletter}
          loading={loading}
          description="Réalisateurs ayant accepté de recevoir les communications du festival."
        />
      </section>
    </div>
  );
}
