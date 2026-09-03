const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const env = require("./Config/env");
const apiRoutes = require("./Routes");
const notFound = require("./Middlewares/notFound");
const errorHandler = require("./Middlewares/errorHandler");
const { checkDatabaseConnection } = require("./Config/db");
const { startYoutubeStatusWorker } = require("./Jobs/youtubeStatusWorker");

const app = express();

// ── Sécurité : headers HTTP (helmet) ─────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Autorise les assets publics (images, vidéos)
  }),
);

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Autorise les requêtes sans origin (Postman, curl) en dev uniquement
      if (!origin && process.env.NODE_ENV !== "production") return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS bloqué pour l'origine : ${origin}`));
    },
    credentials: true,
  }),
);

// ── Rate limiting global (100 req / 15 min par IP) ───────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de requêtes, réessayez dans 15 minutes." },
});
app.use("/api", globalLimiter);

// ── Rate limiting strict sur le login (10 tentatives / 15 min par IP) ────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de tentatives de connexion. Réessayez dans 15 minutes." },
});
app.use("/api/admins/auth/login", loginLimiter);

// ── Rate limiting sur la soumission de films (5 soumissions / heure par IP) ──
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de soumissions. Réessayez dans une heure." },
});
app.use("/api/movies/submit", submitLimiter);

// ── Rate limiting sur le formulaire de contact (10 envois / heure par IP) ────
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de messages envoyés. Réessayez dans une heure." },
});
app.use("/api/contact", contactLimiter);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "2mb" }));

// ── Fichiers uploadés (vidéos soumises, assets) ───────────────────────────────
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ── Route d'accueil ───────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("MarsAI backend est démarré");
});

// ── API (MVC) ─────────────────────────────────────────────────────────────────
app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

// ── Démarrage ─────────────────────────────────────────────────────────────────
(async () => {
  try {
    await checkDatabaseConnection();
    startYoutubeStatusWorker();
    app.listen(env.PORT, () => {
      console.log(`Backend MarsAI démarré sur http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
})();

module.exports = app;
