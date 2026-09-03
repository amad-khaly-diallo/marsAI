const { asyncHandler } = require("../Utils/http");
const ContactService = require("../Services/ContactService");

exports.submit = asyncHandler(async (req, res) => {
  const result = await ContactService.submitContactForm(req.body || {});
  res.status(201).json(result);
});
