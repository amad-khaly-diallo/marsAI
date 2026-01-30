const dotenv = require("dotenv");
dotenv.config();

// Fonction de validation stricte
function required(name) {
  if (!process.env[name]) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }
  return process.env[name];
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,

  DB_HOST: required("DB_HOST"),
  DB_PORT: required("DB_PORT"),
  DB_NAME: required("DB_NAME"),
  DB_USER: required("DB_USER"),

  // MODIFICATION ICI : On n'utilise PAS required() pour le mot de passe
  // On prend la valeur du .env OU une chaine vide si rien n'est défini
  DB_PASSWORD: process.env.DB_PASSWORD || "",

  // ... le reste de vos configurations (YouTube, etc.)
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  // etc...
};
