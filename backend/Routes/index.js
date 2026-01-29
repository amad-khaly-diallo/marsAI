const express = require('express');
const { asyncHandler } = require('../Utils/http');
const { ping } = require('../Utils/db');
const adminRoutes = require('./admins');
const filmmakerRoutes = require('./filmmakers');
const movieRoutes = require('./movies');
const cookieParser = require('cookie-parser');

const router = express.Router();

router.use(cookieParser());

router.use('/health', asyncHandler(async (req, res) => {
  await ping();
  res.json({ status: 'ok' });
}));

router.use('/admins', adminRoutes);
router.use('/filmmakers', filmmakerRoutes);
router.use('/movies', movieRoutes);

module.exports = router;

