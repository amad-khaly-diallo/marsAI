import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/participer", label: "Participer" },
  { to: "/partenaires", label: "Partenaires" },
  { to: "/admin", label: "Admin" },
];

export default function HeaderNavLinks({ orientation = "horizontal", onNavigate }) {
  const base =
    "text-sm font-medium tracking-wide transition-colors hover:text-brand-primary-soft";

  const active = ({ isActive }) =>
    [
      base,
      isActive
        ? "text-brand-primary-soft"
        : "text-slate-300",
    ].join(" ");

  if (orientation === "vertical") {
    return (
      <div className="flex flex-col gap-2 pt-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={active}
            onClick={onNavigate}
          >
            {link.label}
          </NavLink>
        ))}
        <NavLink
          to="/participer"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-slate-900 shadow-soft-sm"
          onClick={onNavigate}
        >
          Soumettre un film
        </NavLink>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={active}>
          {link.label}
        </NavLink>
      ))}
      <NavLink
        to="/participer"
        className="inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
      >
        Soumettre un film
      </NavLink>
    </div>
  );
}

