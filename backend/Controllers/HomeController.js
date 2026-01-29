exports.index = (req, res) => {
  res.json({
    message: 'Bienvenue sur l’API MarsAI',
    endpoints: {
      health: '/api/health',
      filmmakers: '/api/filmmakers',
      movies: '/api/movies',
    },
  });
};

