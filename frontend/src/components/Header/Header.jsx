import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
import HeaderNavLinks from "./HeaderNavLinks";
import HeaderBurger from "./HeaderBurger";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <HeaderLogo />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <HeaderNavLinks orientation="horizontal" />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <HeaderBurger open={open} onToggle={() => setOpen(!open)} />
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-800/50 bg-black/95 backdrop-blur-md px-6 pb-6 md:hidden">
          <HeaderNavLinks
            orientation="vertical"
            onNavigate={() => setOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
