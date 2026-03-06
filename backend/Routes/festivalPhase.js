const express = require('express');
const router = express.Router();

const {
  getCurrentPhase,
  setCurrentPhase,
} = require('../Services/FestivalPhaseService');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

// Configuration simple des dates de fin de phases pour le compte à rebours.
// Les dates sont en UTC ISO 8601.
// Tu pourras les déplacer dans un fichier de config ou des variables d'env plus tard.
const PHASE_CONFIG = {
  phase1: {
    label: 'Soumissions des films',
    // Exemple : fin de la phase 1
    endsAt: '2026-03-31T23:59:59Z',
  },
  phase2: {
    label: 'Visionnage & sélection',
    // Exemple : fin de la phase 2
    endsAt: '2026-04-30T23:59:59Z',
  },
  phase3: {
    label: 'Jour du festival',
    // Exemple : jour J du festival
    endsAt: '2026-05-15T20:00:00Z',
  },
};

function buildCountdownPayload(phase) {
  const now = new Date();
  const config = PHASE_CONFIG[phase] || {
    label: 'Phase du festival',
    endsAt: null,
  };

  let target = null;
  let remaining = null;

  if (config.endsAt) {
    target = new Date(config.endsAt);
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
    label: config.label,
    serverTime: now.toISOString(),
    target: target ? target.toISOString() : null,
    remaining,
  };
}

// public – renvoie la phase active + les infos pour le compte à rebours
router.get('/', async (req, res, next) => {
  try {
    const phase = await getCurrentPhase();
    const payload = buildCountdownPayload(phase);
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

module.exports = router;

