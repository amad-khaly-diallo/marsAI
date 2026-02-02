import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-mars-dark w-full py-4 border-b border-mars-gray/20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-monument text-mars-white tracking-widest uppercase"
        >
          MARS<span className="text-mars-blue">.AI</span>
        </Link>

        {/* NAVIGATION */}
        <nav>
          <ul className="flex space-x-8 text-sm font-inter text-mars-gray font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-mars-blue transition-colors duration-300"
              >
                ACCUEIL
              </Link>
            </li>
            <li>
              <Link
                to="/partners"
                className="hover:text-mars-blue transition-colors duration-300"
              >
                PARTENAIRES
              </Link>
            </li>
            <li>
              <Link
                to="/submission"
                className="hover:text-mars-blue transition-colors duration-300"
              >
                SOUMETTRE
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="hover:text-mars-white transition-colors duration-300"
              >
                ADMIN
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
