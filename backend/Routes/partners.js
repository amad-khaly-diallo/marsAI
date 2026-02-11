const express = require('express');
const PartnerController = require('../Controllers/PartnerController');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

const router = express.Router();

// Public: liste + détail des partenaires (pour la page Partenaires)
router.get('/', PartnerController.list);
router.get('/:id', PartnerController.get);

// Admin uniquement: création / mise à jour / suppression
const onlyAdmins = ['admin', 'super_admin'];

router.post(
  '/',
  authenticate,
  authorize(onlyAdmins),
  PartnerController.create
);

router.put(
  '/:id',
  authenticate,
  authorize(onlyAdmins),
  PartnerController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize(onlyAdmins),
  PartnerController.remove
);

module.exports = router;

