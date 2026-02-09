import { useState } from "react";

const sections = [
  { id: "dashboard", label: "Dashboard" },
  { id: "admins", label: "Admins" },
  { id: "jury", label: "Jury" },
  { id: "movies", label: "Films" },
  { id: "partners", label: "Partenaires" },
  { id: "newsletters", label: "Newsletters" },
  { id: "traffic", label: "Trafic" },
];

export default function AdminLayout({ children }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:gap-6 md:py-8">
      {/* Navigation mobile (en haut) */}
      <div className="rounded-lg border border-brand-border/50 bg-brand-surface/80 p-3 shadow-soft-md md:hidden">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
              Espace admin
            </p>
            <p className="text-sm font-medium text-slate-100">
              Gestion du festival
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={[
                "rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors",
                activeSection === section.id
                  ? "bg-brand-primary text-slate-900"
                  : "bg-slate-900/80 text-brand-muted hover:text-slate-100",
              ].join(" ")}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar desktop */}
      <aside className="hidden w-60 flex-shrink-0 flex-col gap-4 rounded-lg border border-brand-border/50 bg-brand-surface/80 p-4 shadow-soft-md md:flex">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
            Espace admin
          </p>
          <p className="text-sm font-medium text-slate-100">
            Gestion du festival
          </p>
        </div>
        <nav className="mt-2 flex flex-col gap-1">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                activeSection === section.id
                  ? "bg-brand-primary/10 text-brand-primary-soft"
                  : "text-brand-muted hover:bg-slate-900/60 hover:text-slate-100"
              }`}
            >
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1">
        {children(activeSection)}
      </main>
    </div>
  );
}

