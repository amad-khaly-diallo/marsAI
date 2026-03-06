const express = require('express');
const multer = require('multer');
const path = require('path');
const MovieController = require('../Controllers/MovieController');
const FilmSubmissionController = require('../Controllers/FilmSubmissionController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 300 * 1024 * 1024, // 300 Mo
  },
});

// Storage mémoire pour les assets (captures & sous-titres) avant upload vers S3
const uploadAssets = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 Mo par fichier, largement suffisant pour images + .srt
  },
});


// POST /api/movies/submit - Soumission publique (crée uniquement movie)
router.post('/submit', upload.single('video'), FilmSubmissionController.submit);

// GET /api/movies - Liste tous les films sélectionnés (catalogue)
router.get('/', MovieController.list);
// GET /api/movies/winners - Liste des films gagnants
router.get('/winners', MovieController.listWinners);
router.post('/', MovieController.create);

// GET /api/movies/:id - Détails d'un film (vue "simple" catalogue)
router.get('/:id', MovieController.get);

// GET /api/movies/:id/full - Détails complets (film + assets + tags + collaborateurs + IA)
router.get('/:id/full', MovieController.getFull);

// ============================================
// Routes nested (ressources liées)
// ============================================

// POST /api/movies/:movieId/assets - Ajouter des assets (captures + sous-titres)
router.post(
  '/:movieId/assets',
  uploadAssets.fields([
    { name: 'stills', maxCount: 3 },
    { name: 'subtitle', maxCount: 1 },
  ]),
  MovieController.addAssets
);

// GET /api/movies/:movieId/collaborators - Liste des collaborateurs
router.post('/:movieId/collaborators', MovieController.addCollaborator);

// POST /api/movies/:movieId/tags - Ajouter un tag
router.post('/:movieId/tags', MovieController.addTag);

// PUT /api/movies/:movieId/ai-declaration - Mettre à jour la déclaration IA
router.put('/:movieId/ai-declaration', MovieController.upsertAiDeclaration);

module.exports = router;

