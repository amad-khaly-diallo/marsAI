import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/partenaires", label: "Partenaires" },
];

export default function HeaderNavLinks({
  orientation = "horizontal",
  onNavigate,
}) {
  const base =
    "text-sm font-medium tracking-wide transition-all duration-300 hover:text-blue-400";

  const active = ({ isActive }) =>
    [base, isActive ? "text-blue-500" : "text-gray-300"].join(" ");

  if (orientation === "vertical") {
    return (
      <div className="flex flex-col gap-3 pt-4">
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
          className="mt-3 inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:bg-blue-600 hover:shadow-blue-500/50"
          onClick={onNavigate}
        >
          Participez
        </NavLink>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-8">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={active}>
          {link.label}
        </NavLink>
      ))}
      <NavLink
        to="/participer"
        className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:bg-blue-600 hover:shadow-blue-500/50 hover:scale-105"
      >
        Participez
      </NavLink>
    </div>
  );
}
