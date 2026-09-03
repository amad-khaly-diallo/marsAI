const path = require('path');
const MovieService = require('../Services/MovieService');
const { asyncHandler, HttpError } = require('../Utils/http');
const s3Service = require('../Services/s3Service');

exports.list = asyncHandler(async (req, res) => {
  const data = await MovieService.list();
  res.json(data);
});

exports.listWinners = asyncHandler(async (req, res) => {
  const data = await MovieService.listWinners();
  res.json(data);
});

exports.get = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await MovieService.getById(id);
  res.json(data);
});

exports.getFull = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await MovieService.getFullById(id);

  // Pour l'affichage public (page /watch/:id), on ne doit exposer
  // que les films sélectionnés. Les autres renvoient une 404.
  if (!data.movie || data.movie.status !== 'selected') {
    throw new HttpError(404, 'Movie not found');
  }

  res.json(data);
});


exports.create = asyncHandler(async (req, res) => {
  const data = await MovieService.create(req.body || {});
  res.status(201).json(data);
});

exports.update = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await MovieService.update(id, req.body || {});
  res.json(data);
});

exports.remove = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await MovieService.remove(id);
  res.status(204).send();
});

exports.listAssets = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.listAssets(movieId);
  res.json(data);
});

exports.addAssets = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const files = req.files || {};

  const stillFiles = files.stills || [];
  const subtitleFiles = files.subtitle || [];
  const thumbnailFiles = files.thumbnail || [];

  if (!stillFiles.length && !subtitleFiles.length && !thumbnailFiles.length) {
    throw new HttpError(400, 'No asset files provided');
  }

  const payloads = [];

  // Upload des captures vers S3
  for (const file of stillFiles) {
    const { url } = await s3Service.uploadFile(file, 'assets/stills');
    const ext =
      (path.extname(file.originalname) || '').replace('.', '').toLowerCase() ||
      null;

    payloads.push({
      asset_type: 'still',
      file_path: url,
      file_format: ext,
    });
  }

  if (thumbnailFiles[0]) {
    const file = thumbnailFiles[0];
    const ext =
      (path.extname(file.originalname) || '').replace('.', '').toLowerCase() ||
      null;

    const { url } = await s3Service.uploadFile(file, 'assets/thumbnails');

    payloads.push({
      asset_type: 'thumbnail',
      file_path: url,
      file_format: ext,
    });
  }

  if (subtitleFiles[0]) {
    const file = subtitleFiles[0];
    const ext = (path.extname(file.originalname) || '').toLowerCase();
    if (ext !== '.srt') {
      throw new HttpError(400, 'Subtitle file must be .srt');
    }

    const { url } = await s3Service.uploadFile(file, 'assets/subtitles');

    payloads.push({
      asset_type: 'subtitle',
      file_path: url,
      file_format: 'srt',
    });
  }

  const createdAssets = [];
  // On insère chaque asset séparément
  for (const payload of payloads) {
    // MovieService.addAsset retourne un tableau (résultat SQL), on l'aplatit
    const rows = await MovieService.addAsset(movieId, payload);
    if (Array.isArray(rows)) {
      createdAssets.push(...rows);
    } else if (rows) {
      createdAssets.push(rows);
    }
  }

  res.status(201).json(createdAssets);
});

exports.listCollaborators = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.listCollaborators(movieId);
  res.json(data);
});

exports.addCollaborator = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.addCollaborator(movieId, req.body || {});
  res.status(201).json(data);
});

exports.listTags = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.listTags(movieId);
  res.json(data);
});

exports.addTag = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const label = (req.body && req.body.label) || null;
  const data = await MovieService.addTag(movieId, label);
  res.status(201).json(data);
});

exports.removeTag = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const tagId = Number(req.params.tagId);
  const data = await MovieService.removeTag(movieId, tagId);
  res.json(data);
});

exports.getAiDeclaration = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.getAiDeclaration(movieId);
  res.json(data);
});

exports.upsertAiDeclaration = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.upsertAiDeclaration(movieId, req.body || {});
  res.json(data);
});

