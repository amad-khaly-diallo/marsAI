import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validateFilmmakerField } from '../../utils/validation';

export default function FilmmakerForm({ value, onChange, hasError }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryQuery, setCountryQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');

  const validateField = (field, v) => {
    const key = validateFilmmakerField(field, v);
    return key ? t(key) : null;
  };

  const setField = (field, v) => {
    onChange({
      ...value,
      [field]: v,
    });
    const msg = validateField(field, v);
    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  const handle = (field) => (e) =>
    setField(
      field,
      e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    );

  const handleMobile = (e) => {
    const raw = e.target.value;
    // Autoriser uniquement chiffres, espaces et symboles usuels de téléphone
    const cleaned = raw.replace(/[^0-9+().\s-]/g, '');
    setField('mobile', cleaned);
  };

  // Charger la liste des pays une fois (API publique)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=cca2,name,translations',
        );
        const data = await res.json();
        const mapped = (data || [])
          .map((c) => {
            const frName =
              c.translations?.fra?.common || c.translations?.fra?.official;
            return {
              code: c.cca2,
              name: frName || c.name?.common || '',
            };
          })
          .filter((c) => c.name)
          .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
        setCountries(mapped);
      } catch (err) {
        // En cas d'erreur, on garde le fallback en input texte
        console.error('Erreur chargement pays:', err);
      }
    };
    fetchCountries();
  }, []);

  // Charger les villes quand le pays change
  useEffect(() => {
    const country = value?.country;
    if (!country) {
      setCities([]);
      return;
    }
    const fetchCities = async () => {
      try {
        const res = await fetch(
          'https://countriesnow.space/api/v0.1/countries/cities',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country }),
          },
        );
        const data = await res.json();
        if (data && Array.isArray(data.data)) {
          const sorted = [...data.data].sort((a, b) =>
            a.localeCompare(b, 'fr'),
          );
          setCities(sorted);
        } else {
          setCities([]);
        }
      } catch (err) {
        console.error('Erreur chargement villes:', err);
        setCities([]);
      }
    };
    fetchCities();
  }, [value?.country]);

  // Options filtrées côté client pour l'autocomplétion pays / ville
  const filteredCountries = useMemo(() => {
    if (!countryQuery) return countries;
    const q = countryQuery.toLowerCase();
    return countries.filter((c) => c.name.toLowerCase().includes(q));
  }, [countries, countryQuery]);

  const filteredCities = useMemo(() => {
    if (!cityQuery) return cities;
    const q = cityQuery.toLowerCase();
    return cities.filter((c) => c.toLowerCase().includes(q));
  }, [cities, cityQuery]);

  return (
    <section
      className={[
        'rounded-lg border bg-brand-surface/80 p-4 shadow-soft-sm',
        hasError ? 'border-red-500/70' : 'border-slate-800/80',
      ].join(' ')}
    >
      <h2 className="mb-3 text-sm font-semibold text-slate-100">
        1. Réalisateur / Réalisatrice
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Civilité</label>
          <select
            value={value.civility || ''}
            onChange={handle('civility')}
            required
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          >
            <option value="">Sélectionner</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Prénom</label>
          <input
            type="text"
            value={value.first_name || ''}
            onChange={handle('first_name')}
            required
            minLength={2}
            maxLength={80}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
          {errors.first_name && (
            <p className="text-[11px] text-red-300">{errors.first_name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Nom</label>
          <input
            type="text"
            value={value.last_name || ''}
            onChange={handle('last_name')}
            required
            minLength={2}
            maxLength={80}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
          {errors.last_name && (
            <p className="text-[11px] text-red-300">{errors.last_name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Date de naissance</label>
          <input
            type="date"
            value={value.birth_date || ''}
            onChange={handle('birth_date')}
            required
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Email</label>
          <input
            type="email"
            value={value.email || ''}
            onChange={handle('email')}
            required
            maxLength={200}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
          {errors.email && (
            <p className="text-[11px] text-red-300">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Mobile</label>
          <input
            type="tel"
            value={value.mobile || ''}
            onChange={handleMobile}
            pattern="[0-9+().\s-]{6,20}"
            maxLength={20}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
          {errors.mobile && (
            <p className="text-[11px] text-red-300">{errors.mobile}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Profession</label>
          <input
            type="text"
            value={value.job || ''}
            onChange={handle('job')}
            maxLength={120}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted"> Pays / Ville </label>
          <div className="flex gap-2">
            {/* Pays (saisie libre + suggestions) */}
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Pays"
                value={value.country || ''}
                onChange={(e) => {
                  const v = e.target.value;
                  setField('country', v);
                  setCountryQuery(v);
                }}
                onFocus={(e) => setCountryQuery(e.target.value || '')}
                maxLength={80}
                autoComplete="off"
                className="w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
              />
              {filteredCountries.length > 0 && countryQuery && (
                <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-slate-700 bg-slate-900 text-xs text-slate-100 shadow-lg">
                  {filteredCountries.map((c) => (
                    <li
                      key={c.code}
                      className="cursor-pointer px-3 py-1 hover:bg-slate-800"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setField('country', c.name);
                        setCountryQuery('');
                      }}
                    >
                      {c.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Ville (saisie libre + suggestions) */}
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Ville"
                value={value.city || ''}
                onChange={(e) => {
                  const v = e.target.value;
                  setField('city', v);
                  setCityQuery(v);
                }}
                onFocus={(e) => setCityQuery(e.target.value || '')}
                maxLength={80}
                autoComplete="off"
                disabled={!value.country}
                className="w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
              />
              {filteredCities.length > 0 && value.country && cityQuery && (
                <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-slate-700 bg-slate-900 text-xs text-slate-100 shadow-lg">
                  {filteredCities.map((city) => (
                    <li
                      key={city}
                      className="cursor-pointer px-3 py-1 hover:bg-slate-800"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setField('city', city);
                        setCityQuery('');
                      }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Comment avez-vous découvert le festival ?
          </label>
          <select
            value={value.discovery_source || ''}
            onChange={handle('discovery_source')}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          >
            <option value="">Sélectionner</option>
            <option value="social_media">Réseaux sociaux</option>
            <option value="friend">Recommandation (ami, collègue…)</option>
            <option value="press">Presse / médias</option>
            <option value="school">École / université</option>
            <option value="search_engine">Moteur de recherche</option>
            <option value="other">Autre</option>
          </select>
        </div>
        <label className="mt-5 flex items-center gap-2 text-xs text-brand-muted">
          <input
            type="checkbox"
            checked={!!value.newsletter}
            onChange={handle('newsletter')}
            className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-brand-primary"
          />
          S&apos;abonner à la newsletter
        </label>
      </div>
    </section>
  );
}
