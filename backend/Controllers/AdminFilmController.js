const AdminFilmService = require('../Services/AdminFilmService');
const { asyncHandler } = require('../Utils/http');

// GET /api/admin/films
exports.list = asyncHandler(async (req, res) => {
  const { status, q } = req.query;
  const data = await AdminFilmService.list({ status, search: q });
  res.json(data);
});

// GET /api/admin/films/:id
exports.get = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await AdminFilmService.getById(id);
  res.json(data);
});

// PATCH /api/admin/films/:id/status
exports.updateStatus = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { status, decision_reason } = req.body || {};
  const data = await AdminFilmService.updateStatus(id, { status, decision_reason });
  res.json(data);
});

