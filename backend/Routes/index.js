const express = require('express');
const { asyncHandler } = require('../Utils/http');
const { ping } = require('../Utils/db');
const adminRoutes = require('./admins');
const filmmakerRoutes = require('./filmmakers');
const movieRoutes = require('./movies');
const adminFilmsRoutes = require('./adminFilms');
const authRoutes = require('./auth');
const cookieParser = require('cookie-parser');

const router = express.Router();

router.use(cookieParser());

router.use('/health', asyncHandler(async (req, res) => {
  await ping();
  res.json({ status: 'ok' });
}));

router.use('/admins', adminRoutes);// Admin CRUD
router.use('/admin/films', adminFilmsRoutes);// Admin gestion des films
router.use('/filmmakers', filmmakerRoutes);// Filmmaker CRUD
router.use('/movies', movieRoutes);// CRUD movies + POST /api/movies/submit (soumission publique)
router.use('/auth', authRoutes);

module.exports = router;

