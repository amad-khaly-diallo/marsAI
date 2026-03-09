const express = require('express');
const router = express.Router();

const {
  getCurrentPhase,
  setCurrentPhase,
} = require('../Services/FestivalPhaseService');
const {
  getPhaseConfig,
  getAllPhaseConfigs,
  upsertPhaseConfig,
} = require('../Services/FestivalPhaseConfigService');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

async function buildCountdownPayload(phase) {
  const now = new Date();
  const config = await getPhaseConfig(phase).catch(() => null);

  const safeConfig = config || {
    label: 'Phase du festival',
    endsAt: null,
  };

  let target = null;
  let remaining = null;

  if (safeConfig.endsAt) {
    target = new Date(safeConfig.endsAt);
    const diffMs = Math.max(0, target.getTime() - now.getTime());
    const totalSeconds = Math.floor(diffMs / 1000);

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor(
      (totalSeconds % (24 * 60 * 60)) / (60 * 60),
    );
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    remaining = {
      totalSeconds,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return {
    phase,
    label: safeConfig.label,
    serverTime: now.toISOString(),
    target: target ? target.toISOString() : null,
    remaining,
  };
}

// public – renvoie la phase active + les infos pour le compte à rebours
router.get('/', async (req, res, next) => {
  try {
    const phase = await getCurrentPhase();
    const payload = await buildCountdownPayload(phase);
    res.json(payload);
  } catch (err) {
    next(err);
  }
});

// modification réservée au super_admin
router.put(
  '/',
  authenticate,
  authorize(['super_admin']),
  async (req, res, next) => {
    try {
      const { phase } = req.body;
      const newPhase = await setCurrentPhase(phase);
      res.json({ phase: newPhase });
    } catch (err) {
      next(err);
    }
  },
);

// Récupération de la configuration de toutes les phases (super_admin)
router.get(
  '/config',
  authenticate,
  authorize(['super_admin']),
  async (req, res, next) => {
    try {
      const configs = await getAllPhaseConfigs();
      res.json(configs);
    } catch (err) {
      next(err);
    }
  },
);

// Mise à jour de la configuration d'une phase (super_admin)
router.put(
  '/config',
  authenticate,
  authorize(['super_admin']),
  async (req, res, next) => {
    try {
      const { phase, label, endsAt } = req.body;
      const updated = await upsertPhaseConfig({ phase, label, endsAt });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;

