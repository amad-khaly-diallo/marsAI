const express = require('express');
const AdminController = require('../Controllers/AdminController');
const { authenticate } = require('../Middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticate, AdminController.list);
router.get('/:id', authenticate, AdminController.get);
router.post('/', authenticate, AdminController.create);
router.put('/:id', authenticate, AdminController.update);
router.delete('/:id', authenticate, AdminController.remove);
module.exports = router;

