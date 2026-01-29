const AdminService = require('../Services/AdminService');
const { asyncHandler } = require('../Utils/http');

exports.list = asyncHandler(async (req, res) => {
  const data = await AdminService.list();
  res.json(data);
});

exports.get = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await AdminService.getById(id);
  res.json(data);
});

exports.create = asyncHandler(async (req, res) => {
  const data = await AdminService.create(req.body || {});
  res.status(201).json(data);
});

exports.update = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await AdminService.update(id, req.body || {});
  res.json(data);
});

exports.remove = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await AdminService.remove(id);
  res.status(204).send();
});

