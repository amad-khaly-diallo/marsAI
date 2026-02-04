export default function HeaderLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-primary via-brand-primary-soft to-brand-accent shadow-soft-md">
        <span className="text-sm font-bold text-slate-900">mAI</span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-sm font-semibold tracking-wide text-slate-50">
          marsAI
        </span>
        <span className="text-[11px] text-brand-muted">
          Festival de courts-métrages IA
        </span>
      </div>
    </div>
  );
}

