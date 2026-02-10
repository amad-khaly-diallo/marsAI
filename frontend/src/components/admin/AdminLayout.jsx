import { useState } from "react";

const sections = [
  { id: "dashboard", label: "Dashboard" },
  { id: "admins", label: "Admins" },
  { id: "jury", label: "Jury" },
  { id: "movies", label: "Films" },
  { id: "partners", label: "Partenaires" },
  { id: "newsletters", label: "Newsletters" },
  { id: "traffic", label: "Trafic" },
  {id: "all-videos", label: "Toutes les vidéos"}
];

export default function AdminLayout({ children }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
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

