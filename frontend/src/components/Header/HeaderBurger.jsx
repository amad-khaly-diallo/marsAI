export default function HeaderBurger({ open, onToggle }) {
  return (
    <button
      type="button"
      aria-label="Ouvrir le menu"
      aria-expanded={open}
      onClick={onToggle}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border/60 bg-brand-surface/70 shadow-soft-sm transition hover:border-brand-primary-soft"
    >
      <span className="relative flex h-3.5 w-4 flex-col justify-between">
        <span
          className={`h-0.5 w-full rounded-full bg-brand-white transition-transform ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-full rounded-full bg-brand-white transition-opacity ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`h-0.5 w-full rounded-full bg-brand-white transition-transform ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}

