import FooterMainLinks from "./FooterMainLinks";
import FooterLegalLinks from "./FooterLegalLinks";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border/40 bg-brand-surface/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:justify-between">
        <FooterMainLinks />
        <FooterLegalLinks />
      </div>
      <div className="border-t border-slate-800/70 py-4">
        <p className="text-center text-xs text-brand-muted">
          © {new Date().getFullYear()} marsAI — Festival de courts-métrages
          générés par IA.
        </p>
      </div>
    </footer>
  );
}

