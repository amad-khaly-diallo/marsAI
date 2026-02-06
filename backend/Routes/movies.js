const express = require('express');
const multer = require('multer');
const MovieController = require('../Controllers/MovieController');
const FilmSubmissionController = require('../Controllers/FilmSubmissionController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
});


// POST /api/movies/submit - Soumission publique (crée uniquement movie)
router.post('/submit', upload.single('video'), FilmSubmissionController.submit);

// GET /api/movies - Liste tous les films
router.get('/', MovieController.list);
router.post('/', MovieController.create);

// GET /api/movies/:id - Détails d'un film
router.get('/:id', MovieController.get);

// ============================================
// Routes nested (ressources liées)
// ============================================

// POST /api/movies/:movieId/assets - Ajouter un asset
router.post('/:movieId/assets', MovieController.addAssets);

// GET /api/movies/:movieId/collaborators - Liste des collaborateurs
router.post('/:movieId/collaborators', MovieController.addCollaborator);

// POST /api/movies/:movieId/tags - Ajouter un tag
router.post('/:movieId/tags', MovieController.addTag);

// PUT /api/movies/:movieId/ai-declaration - Mettre à jour la déclaration IA
router.put('/:movieId/ai-declaration', MovieController.upsertAiDeclaration);

module.exports = router;

