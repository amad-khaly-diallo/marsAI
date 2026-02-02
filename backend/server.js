const express = require("express");
const cors = require("cors");

const env = require("./Config/env");
const apiRoutes = require("./Routes");
const notFound = require("./Middlewares/notFound");
const errorHandler = require("./Middlewares/errorHandler");
const { checkDatabaseConnection } = require("./Config/db");

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Route d'accueil simple
app.get("/", (req, res) => {
  res.send("MarsAI backend est démarré");
});

// API (MVC)
app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

// Démarrage du serveur APRÈS avoir check la DB
(async () => {
  try {
    await checkDatabaseConnection();
    app.listen(env.PORT, () => {
      console.log(`Backend MarsAI démarré sur http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error("❌ ECHEC DU DEMARRAGE DU SERVEUR");
    console.error("Erreur détaillée :", err);
    process.exit(1);
  }
})();

module.exports = app;
