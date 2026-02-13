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
    "text-sm font-medium tracking-wide transition-colors hover:text-brand-primary-soft";

  const active = ({ isActive }) =>
    [base, isActive ? "text-brand-primary-soft" : "text-slate-300"].join(" ");

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
            {t(link.labelKey, link.defaultLabel)}
          </NavLink>
        ))}
        <NavLink
          to="/participer"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-slate-900 shadow-soft-sm"
          onClick={onNavigate}
        >
          {t("nav.participate", "Participer")}
        </NavLink>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={active}>
          {t(link.labelKey, link.defaultLabel)}
        </NavLink>
      ))}
      <NavLink
        to="/participer"
        className="inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-brand-white shadow-soft-sm hover:bg-brand-accent hover:text-brand-white"
      >
        {t("nav.participate", "Participer")}
      </NavLink>
    </div>
  );
}
