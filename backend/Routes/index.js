const express = require('express');
const HomeController = require('../Controllers/HomeController');

const router = express.Router();

// Exemple de route MVC avec un contrôleur
router.get('/home', HomeController.index);

module.exports = router;

