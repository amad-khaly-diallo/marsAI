const express = require('express');
const cors = require('cors');

// Import des routes principales
const apiRoutes = require('./Routes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Route d'accueil simple pour vérifier que le backend répond
app.get('/', (req, res) => {
  res.send('MarsAI backend est démarré ');
});

// Routes API (architecture MVC)
app.use('/api', apiRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Backend MarsAI démarré sur http://localhost:${PORT}`);
});

module.exports = app;
