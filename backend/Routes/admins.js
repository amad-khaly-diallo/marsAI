const express = require('express');
const AdminController = require('../Controllers/AdminController');
const { authenticate } = require('../Middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticate, AdminController.list);
router.get('/:id', authenticate, AdminController.get);
router.post('/auth/signup', AdminController.create);
router.post('/auth/login', AdminController.logAdmin);
router.put('/:id', authenticate, AdminController.update);
router.delete('/:id', authenticate, AdminController.remove);
module.exports = router;

