/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", //
  ],
  theme: {
    extend: {
      colors: {
        mars: {
          dark: "#1E1E1E", // Le fond Noir
          blue: "#2933D3", // Le bleu électrique
          gray: "#7D7D7D", // Le gris texte
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        monument: ["Impact", "sans-serif"], // Fallback temporaire pour le titre
        inter: ["sans-serif"], // Police standard
      },
    },
  },
  plugins: [],
};
