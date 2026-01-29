const express = require('express');
const HomeController = require('../Controllers/HomeController');
const { asyncHandler } = require('../Utils/http');
const { ping } = require('../Utils/db');

const filmmakerRoutes = require('./filmmakers');
const movieRoutes = require('./movies');

const router = express.Router();

router.get('/', HomeController.index);

router.get(
  '/health',
  asyncHandler(async (req, res) => {
    await ping();
    res.json({
      status: 'ok',
      service: 'marsAI-backend',
      timestamp: new Date().toISOString(),
      db: 'up',
    });
  })
);

router.use('/filmmakers', filmmakerRoutes);
router.use('/movies', movieRoutes);

module.exports = router;

