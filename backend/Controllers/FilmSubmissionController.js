const FilmSubmissionService = require('../Services/FilmSubmissionService');
const { asyncHandler } = require('../Utils/http');

// POST /api/movies/submit
// Crée uniquement la table movie (le filmmaker doit déjà exister)
exports.submit = asyncHandler(async (req, res) => {
  // Gestion JSON ou multipart/form-data avec champ "payload"
  let movie = req.body || {};
  if (req.body && req.body.payload) {
    try {
      movie = JSON.parse(req.body.payload);
    } catch (err) {
      throw new (require('../Utils/http').HttpError)(400, 'Invalid JSON in payload field');
    }
  }

  const result = await FilmSubmissionService.submit({
    movie,
    videoFile: req.file || null,
  });

  res.status(201).json(result);
});

