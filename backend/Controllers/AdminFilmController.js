const AdminFilmService = require('../Services/AdminFilmService');
const { asyncHandler } = require('../Utils/http');

// GET /api/admin/films
exports.list = asyncHandler(async (req, res) => {
  const { status, q } = req.query;
  const data = await AdminFilmService.list({ status, search: q, currentUser: req.user });
  res.json(data);
});

// GET /api/admin/films/:id
exports.get = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await AdminFilmService.getById(id, req.user);
  res.json(data);
});

// PATCH /api/admin/films/:id/status
exports.updateStatus = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { status, decision_reason } = req.body || {};
  const data = await AdminFilmService.updateStatus(id, { status, decision_reason });
  res.json(data);
});

// PATCH /api/admin/films/:id/winner
exports.updateWinner = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { is_winner } = req.body || {};
  const data = await AdminFilmService.updateWinner(id, { is_winner });
  res.json(data);
});

// POST /api/admin/films/distribute
exports.distribute = asyncHandler(async (req, res) => {
  const { minReviewers } = req.body || {};
  const data = await AdminFilmService.distributeToAdmins(minReviewers);
  res.json(data);
});

// PATCH /api/admin/films/:id/review
exports.updateReview = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { rating, comment } = req.body || {};
  const data = await AdminFilmService.upsertReview(id, { rating, comment }, req.user);
  res.json(data);
});

// PATCH /api/admin/films/:id/flag
exports.updateFlag = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { flag } = req.body || {};
  const data = await AdminFilmService.updateFlag(id, { flag }, req.user);
  res.json(data);
});

// GET /api/admin/films/:id/reviews
exports.listReviews = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await AdminFilmService.listReviews(id);
  res.json(data);
});

