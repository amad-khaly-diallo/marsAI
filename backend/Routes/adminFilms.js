const express = require('express');
const AdminFilmController = require('../Controllers/AdminFilmController');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

const router = express.Router();

// Toutes ces routes sont protégées ADMIN / SUPER_ADMIN
router.use(authenticate, authorize(['admin', 'super_admin']));

// GET /api/admin/films
router.get('/', AdminFilmController.list);

// GET /api/admin/films/:id
router.get('/:id', AdminFilmController.get);

// PATCH /api/admin/films/:id/status
router.patch('/:id/status', AdminFilmController.updateStatus);

// PATCH /api/admin/films/:id/review
router.patch('/:id/review', AdminFilmController.updateReview);

// POST /api/admin/films/distribute - uniquement SUPER_ADMIN
router.post(
  '/distribute',
  authenticate,
  authorize(['super_admin']),
  AdminFilmController.distribute
);

module.exports = router;

