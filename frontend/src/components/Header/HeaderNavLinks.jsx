import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const links = [
  { to: "/", labelKey: "nav.home", defaultLabel: "Accueil" },
  { to: "/contact", labelKey: "nav.contact", defaultLabel: "Contact" },
  { to: "/jury", labelKey: "nav.jury", defaultLabel: "Jury" },
  { to: "/partenaires", labelKey: "nav.partners", defaultLabel: "Partenaires" },
  { to: "/admin", labelKey: "nav.admin", defaultLabel: "Admin" },
];

export default function HeaderNavLinks({
  orientation = "horizontal",
  onNavigate,
}) {
  const { t } = useTranslation();

  const base =
    "text-sm font-medium tracking-wide transition-colors duration-200";
  // On enlève le texte gris par défaut pour du blanc/clair, car on est sur un fond glassmorphism sombre
  const active = ({ isActive }) =>
    [
      base,
      isActive
        ? "text-brand-primary font-semibold"
        : "text-slate-200 hover:text-white",
    ].join(" ");

  // MODE VERTICAL (Mobile) : On garde le bouton Participer ici
  if (orientation === "vertical") {
    return (
      <div className="flex flex-col gap-4 text-center">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-lg font-medium transition-colors ${isActive ? "text-brand-primary" : "text-slate-200"}`
            }
            onClick={onNavigate}
          >
            {t(link.labelKey, link.defaultLabel)}
          </NavLink>
        ))}
        <NavLink
          to="/participer"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-4 py-3 text-sm font-bold text-slate-900 shadow-soft-sm uppercase"
          onClick={onNavigate}
        >
          {t("nav.participate", "Participer")}
        </NavLink>
      </div>
    );
  }

  // MODE HORIZONTAL (Desktop - Bulle centrale)
  // On ne met QUE les liens textuels. Le bouton Participer est géré par Header.jsx
  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={active}>
          {t(link.labelKey, link.defaultLabel)}
        </NavLink>
      ))}
    </div>
  );
}
