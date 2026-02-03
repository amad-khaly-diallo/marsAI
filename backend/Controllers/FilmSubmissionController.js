const FilmSubmissionService = require('../Services/FilmSubmissionService');
const { asyncHandler } = require('../Utils/http');
const { getVideoDuration, getVideoDimensions } = require('../Utils/video.utils');

exports.submit = asyncHandler(async (req, res) => {

  let movie = req.body || {};
  if (req.body && req.body.payload) {
    try {
      movie = JSON.parse(req.body.payload);
    } catch (err) {
      throw new (require('../Utils/http').HttpError)(400, 'Invalid JSON in payload field');
    }
  }

  const { width, height } = await getVideoDimensions(req.file);
  const ratio = width / height;
  if (Math.abs(ratio - 16 / 9) > 0.01) {
    throw new (require('../Utils/http').HttpError)(400, `Vidéo non conforme (aspect ratio = ${ratio.toFixed(2)}), il faut du 16:9`);
  }

  const duration = await getVideoDuration(req.file);
  if (duration < 60) {
    throw new (require('../Utils/http').HttpError)(400, 'La vidéo dépasse la durée maximale de 1 minute.');
  }

  const result = await FilmSubmissionService.submit({
    movie,
    videoFile: req.file || null,
  });

  res.status(201).json(result);
});

