const express = require('express');
const multer = require('multer');
const MovieController = require('../Controllers/MovieController');
const FilmSubmissionController = require('../Controllers/FilmSubmissionController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB max
  },
});

// ============================================
// Routes exactes (AVANT les routes avec paramètres)
// ============================================

// POST /api/movies/submit - Soumission publique (crée uniquement movie)
router.post('/submit', upload.single('video'), FilmSubmissionController.submit);

// ============================================
// Routes CRUD de base
// ============================================

// GET /api/movies - Liste tous les films
router.get('/', MovieController.list);
router.post('/', MovieController.create);

// GET /api/movies/:id - Détails d'un film
router.get('/:id', MovieController.get);

// PUT /api/movies/:id - Mettre à jour un film (admin)
router.put('/:id', MovieController.update);

// DELETE /api/movies/:id - Supprimer un film (admin)
router.delete('/:id', MovieController.remove);

// ============================================
// Routes nested (ressources liées)
// ============================================

// GET /api/movies/:movieId/assets - Liste des assets
router.get('/:movieId/assets', MovieController.listAssets);

// POST /api/movies/:movieId/assets - Ajouter un asset
router.post('/:movieId/assets', MovieController.addAssets);

// GET /api/movies/:movieId/collaborators - Liste des collaborateurs
router.get('/:movieId/collaborators', MovieController.listCollaborators);

// GET /api/movies/:movieId/collaborators - Liste des collaborateurs
router.post('/:movieId/collaborators', MovieController.addCollaborator);

// GET /api/movies/:movieId/tags - Liste des tags
router.get('/:movieId/tags', MovieController.listTags);

// POST /api/movies/:movieId/tags - Ajouter un tag
router.post('/:movieId/tags', MovieController.addTag);


// GET /api/movies/:movieId/ai-declaration - Récupérer la déclaration IA
router.get('/:movieId/ai-declaration', MovieController.getAiDeclaration);

// PUT /api/movies/:movieId/ai-declaration - Mettre à jour la déclaration IA
router.put('/:movieId/ai-declaration', MovieController.upsertAiDeclaration);

module.exports = router;

