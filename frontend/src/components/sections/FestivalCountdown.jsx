import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFestivalCountdown } from '../../hooks/useFestivalCountdown';

function formatUnit(value) {
  return value.toString().padStart(2, '0');
}

export function FestivalCountdown() {
  const { t } = useTranslation();
  const { loading, error, phase, label, remaining } = useFestivalCountdown();

  if (loading) {
    return (
      <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-medium text-white/70">
          {t('countdown.loading')}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
        <span className="text-xs font-medium text-red-100">
          {t('countdown.error')}
        </span>
      </div>
    );
  }

  if (!remaining || !phase) {
    return null;
  }

  const isEnded = phase === 'ended' || remaining.totalSeconds <= 0;

  if (isEnded) {
    return (
      <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            {t('countdown.ended_title')}
          </span>
          <span className="text-xs text-white/75">
            {t('countdown.ended_desc')}
          </span>
        </div>
      </div>
    );
  }

  const phaseLabel =
    phase === 'phase1'
      ? t('countdown.phase1')
      : phase === 'phase2'
        ? t('countdown.phase2')
        : t('countdown.phase3');

  return (
    <div className="mt-6 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-black/40 px-5 py-4 backdrop-blur">
      <div className="flex flex-col text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-white/60">
          {t('countdown.label_prefix')} — {label}
        </span>
        <span className="text-[11px] text-white/50">
          {t('countdown.current_phase')}{' '}
          <span className="font-semibold text-white/80">{phaseLabel}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 text-center text-white">
        <TimeBlock label={t('countdown.unit_days')} value={remaining.days} />
        <Separator />
        <TimeBlock label={t('countdown.unit_hours')} value={remaining.hours} />
        <Separator />
        <TimeBlock
          label={t('countdown.unit_minutes')}
          value={remaining.minutes}
        />
        <Separator />
        <TimeBlock
          label={t('countdown.unit_seconds')}
          value={remaining.seconds}
        />
      </div>
    </div>
  );
}

function TimeBlock({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 px-2.5 py-1.5 min-w-[48px]">
      <span className="text-base font-extrabold tabular-nums">
        {formatUnit(value)}
      </span>
      <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/60">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="mx-0.5 text-xs font-bold text-white/40 leading-none">
      :
    </span>
  );
}
