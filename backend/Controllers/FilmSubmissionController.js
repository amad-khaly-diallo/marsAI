const FilmSubmissionService = require("../Services/FilmSubmissionService");
const { asyncHandler } = require("../Utils/http");

exports.submit = asyncHandler(async (req, res) => {
  const movie = req.body || {};
  const result = await FilmSubmissionService.submit({ movie });
  res.status(201).json(result);
});
