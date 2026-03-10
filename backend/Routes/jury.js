const express = require('express');
const JuryController = require('../Controllers/JuryController');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');
const {
  allowPhases,
} = require('../Middlewares/festivalPhaseAccess');

const router = express.Router();

// Public: liste et détail du jury
// Non accessible en phase1
router.get('/', allowPhases(['phase2', 'phase3']), JuryController.list);
router.get('/:id', allowPhases(['phase2', 'phase3']), JuryController.get);

// Admin uniquement: création / mise à jour / suppression (réservé au super_admin)
const onlySuperAdmin = ['super_admin'];

router.post(
  '/',
  authenticate,
  authorize(onlySuperAdmin),
  JuryController.create
);

router.put(
  '/:id',
  authenticate,
  authorize(onlySuperAdmin),
  JuryController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize(onlySuperAdmin),
  JuryController.remove
);

module.exports = router;

