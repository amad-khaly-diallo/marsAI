import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, Trophy, Users, Globe2 } from 'lucide-react';

export default function PostFestivalPresentation() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Trophy,
      value: t('postFestival.stats.winners.value'),
      label: t('postFestival.stats.winners.label'),
    },
    {
      icon: Users,
      value: t('postFestival.stats.audience.value'),
      label: t('postFestival.stats.audience.label'),
    },
    {
      icon: Globe2,
      value: t('postFestival.stats.countries.value'),
      label: t('postFestival.stats.countries.label'),
    },
  ];

  return (
    <section
      className="relative z-10 px-4 pt-16 pb-10 md:pt-24"
      id="post-festival"
    >
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-[#0a0a16]/85 p-6 md:p-10 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-[#C6A55C] mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
            {t('postFestival.badge')}
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
          {t('postFestival.title')}
        </h2>
        <p className="mt-4 max-w-3xl text-sm md:text-base text-white/70 leading-relaxed">
          {t('postFestival.description')}
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="inline-flex items-center justify-center rounded-full border border-[#C6A55C]/30 bg-[#C6A55C]/10 p-2">
                  <Icon className="h-4 w-4 text-[#C6A55C]" />
                </div>
                <p className="mt-3 text-xl font-bold text-white">
                  {item.value}
                </p>
                <p className="text-xs text-white/55">{item.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/winners"
            className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0a16] hover:bg-[#C6A55C] transition-colors"
          >
            {t('postFestival.cta.winners')}
          </Link>
          <Link
            to="/partenaires"
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            {t('postFestival.cta.partners')}
          </Link>
        </div>
      </div>
    </section>
  );
}
