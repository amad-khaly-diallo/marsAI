const express = require('express');
const JuryController = require('../Controllers/JuryController');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

const router = express.Router();

// Public: liste et détail du jury
router.get('/', JuryController.list);
router.get('/:id', JuryController.get);

// Admin uniquement: création / mise à jour / suppression
const onlyAdmins = [ 'admin', 'super_admin' ];

router.post(
  '/',
  authenticate,
  authorize(onlyAdmins),
  JuryController.create
);

router.put(
  '/:id',
  authenticate,
  authorize(onlyAdmins),
  JuryController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize(onlyAdmins),
  JuryController.remove
);

module.exports = router;

