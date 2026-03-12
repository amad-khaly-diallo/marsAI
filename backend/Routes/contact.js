const express = require("express");
const ContactController = require("../Controllers/ContactController");

const router = express.Router();

router.post("/", ContactController.submit);

module.exports = router;
