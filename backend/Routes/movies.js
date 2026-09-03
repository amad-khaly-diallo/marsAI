const express = require('express');
const multer = require('multer');
const path = require('path');
const MovieController = require('../Controllers/MovieController');
const FilmSubmissionController = require('../Controllers/FilmSubmissionController');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');
const {
  allowPhases,
} = require('../Middlewares/festivalPhaseAccess');

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
// Autorisée uniquement en phase1 (soumissions ouvertes)
// La vidéo est uploadée directement vers S3 via presigned URL côté frontend.
router.post(
  '/submit',
  allowPhases(['phase1']),
  FilmSubmissionController.submit,
);

// GET /api/movies - Liste tous les films sélectionnés (catalogue)
// Accès uniquement en phase2 (visionnage & sélection)
// Pour permettre au super_admin de bypass la phase, on attache d'abord authenticate
// afin de peupler req.user avant le middleware de phase.
router.get('/', authenticate, allowPhases(['phase2']), MovieController.list);
// GET /api/movies/winners - Liste des films gagnants
// Accessible à partir de la phase2 (phase2 + phase3)
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
    { name: 'thumbnail', maxCount: 1 },
  ]),
  MovieController.addAssets
);

// GET /api/movies/:movieId/collaborators - Liste des collaborateurs
router.post('/:movieId/collaborators', MovieController.addCollaborator);

// POST /api/movies/:movieId/tags - Ajouter un tag
router.post('/:movieId/tags', MovieController.addTag);

// PUT /api/movies/:movieId/ai-declaration - Mettre à jour la déclaration IA
router.put('/:movieId/ai-declaration', MovieController.upsertAiDeclaration);

// DELETE /api/movies/:id - Suppression réservée aux admins
router.delete('/:id', authenticate, authorize(['admin', 'super_admin']), MovieController.remove);

// DELETE /api/movies/:movieId/tags/:tagId - Suppression d'un tag réservée aux admins
router.delete('/:movieId/tags/:tagId', authenticate, authorize(['admin', 'super_admin']), MovieController.removeTag);

module.exports = router;

