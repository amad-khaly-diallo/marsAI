import { Calendar, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLocalized } from '../../../utils/sanity';


export default function Phase1Chronology({ phase1 }) {
  const { i18n } = useTranslation();

  const badge =
    getLocalized(phase1?.chronologyBadge, i18n) || 'Chronologie';
  const title =
    getLocalized(phase1?.chronologyTitle, i18n) ||
    'Planning des événements';

  const annualTitle =
    getLocalized(phase1?.chronologyAnnualTitle, i18n) ||
    'Planning potentiel — de février à juin';
  const annualItems = Array.isArray(phase1?.chronologyAnnualItems)
    ? phase1.chronologyAnnualItems
    : [];

  const programTitle =
    getLocalized(phase1?.chronologyProgramTitle, i18n) ||
    'Programme du festival — Vendredi & Samedi';

  const fridayTitle =
    getLocalized(phase1?.chronologyFridayTitle, i18n) || 'Vendredi';
  const fridaySlots = Array.isArray(phase1?.chronologyFridaySlots)
    ? phase1.chronologyFridaySlots
    : [];

  const saturdayTitle =
    getLocalized(phase1?.chronologySaturdayTitle, i18n) || 'Samedi';
  const saturdaySlots = Array.isArray(phase1?.chronologySaturdaySlots)
    ? phase1.chronologySaturdaySlots
    : [];
  return (
    <section className="relative py-16 md:py-24 px-4" id="chronologie">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-4">
          <Calendar className="h-4 w-4 text-brand-primary mr-2" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
            {badge}
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-10">
          {title}
        </h2>

        {/* Planning annuel */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold text-white mb-6">
            {annualTitle}
          </h3>
          <div className="space-y-4">
            {annualItems.map((item, index) => (
              <div
                key={item._key || index}
                className="rounded-xl border p-4 md:p-5 bg-sky-500/20 border-sky-500/40 text-sky-200"
              >
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-bold text-white">
                    {getLocalized(item?.label, i18n)}
                  </span>
                  <span className="text-xs opacity-90">
                    • {getLocalized(item?.months, i18n)}
                  </span>
                  <span className="text-[11px] opacity-75">
                    ( {getLocalized(item?.weeks, i18n)} ) •
                  </span>
                </div>
                {item?.detail && (
                  <p className="text-sm opacity-90 mt-2">
                    {getLocalized(item.detail, i18n)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Programme 2 jours */}
        <h3 className="text-lg font-semibold text-white mb-6">
          {programTitle}
        </h3>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Vendredi */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <h4 className="text-amber-200 font-bold text-lg mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {fridayTitle}
            </h4>
            <ul className="space-y-3">
              {fridaySlots.map((slot, i) => (
                <li key={slot._key || i} className="flex gap-3 text-sm">
                  <span className="shrink-0 w-24 font-mono text-amber-200/90">
                    {slot.time}
                  </span>
                  <div>
                    <span className="font-semibold text-white">
                      {getLocalized(slot?.title, i18n)}
                    </span>
                    {slot?.description && (
                      <p className="text-slate-400 text-xs mt-0.5">
                        {getLocalized(slot.description, i18n)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Samedi */}
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
            <h4 className="text-violet-200 font-bold text-lg mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {saturdayTitle}
            </h4>
            <ul className="space-y-3">
              {saturdaySlots.map((slot, i) => (
                <li key={slot._key || i} className="flex gap-3 text-sm">
                  <span className="shrink-0 w-28 font-mono text-violet-200/90">
                    {slot.time}
                  </span>
                  <div>
                    <span className="font-semibold text-white">
                      {getLocalized(slot?.title, i18n)}
                    </span>
                    {slot?.description && (
                      <p className="text-slate-400 text-xs mt-0.5">
                        {getLocalized(slot.description, i18n)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
