import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
import HeaderNavLinks from "./HeaderNavLinks";
import HeaderBurger from "./HeaderBurger";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border/40 bg-brand-bg/70 backdrop-blur-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-3">
          <HeaderLogo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <HeaderNavLinks orientation="horizontal" />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <HeaderBurger open={open} onToggle={() => setOpen(!open)} />
        </div>
      </div>

      {open && (
        <div className="border-t border-brand-border/40 bg-brand-surface/95 px-4 pb-4 md:hidden">
          <HeaderNavLinks
            orientation="vertical"
            onNavigate={() => setOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
