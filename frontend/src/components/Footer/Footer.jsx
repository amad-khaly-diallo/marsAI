import React from "react";

export default function Footer() {
  return (
    <footer className="bg-mars-dark border-t border-mars-gray/20 text-mars-gray py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-inter">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-mars-white font-monument">MARS.AI</span>. Tous
          droits réservés.
        </p>
      </div>
    </footer>
  );
}
