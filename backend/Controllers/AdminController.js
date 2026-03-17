const AdminService = require('../Services/AdminService');
const { asyncHandler } = require('../Utils/http');

exports.me = asyncHandler(async (req, res) => {
  const id = req.user?.id;
  const data = await AdminService.getById(id);
  res.json(data);
});

exports.updateMeProfile = asyncHandler(async (req, res) => {
  const id = req.user?.id;
  const data = await AdminService.updateProfile(id, req.body || {});
  res.json(data);
});

exports.changePassword = asyncHandler(async (req, res) => {
  const id = req.user?.id;
  await AdminService.changePassword(id, req.body || {});
  res.status(204).send();
});

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

exports.logAdmin = asyncHandler(async (req, res) => {
  const { admin, token } = await AdminService.logAdmin(req.body || {});

  // On garde le cookie pour les usages mêmes-origine éventuels,
  // mais on renvoie aussi explicitement le token au frontend
  // pour l'utiliser en Authorization Bearer (option sans cookies).
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 72 * 60 * 60 * 1000,
    sameSite: 'lax',
  });

  res.status(200).json({ admin, token });
});

exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.status(204).send();
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

