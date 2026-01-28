// Exemple de contrôleur pour la page d'accueil

exports.index = (req, res) => {
  res.json({
    message: 'Bienvenue sur l’API MarsAI',
    description: 'Backend initialisé avec un pattern MVC basique.',
  });
};

