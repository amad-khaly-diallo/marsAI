const express = require('express');

const router = express.Router();

// Dates par défaut pour les 3 phases du festival
// (peuvent être surchargées via les variables d'environnement)
const DEFAULT_PHASES = {
  phase1End: '2026-08-31T21:59:59.000Z',
  phase2End: '2026-09-30T21:59:59.000Z',
  festivalDate: '2026-10-15T18:00:00.000Z',
};

function getConfiguredDates() {
  const phase1End = new Date(process.env.PHASE1_END || DEFAULT_PHASES.phase1End);
  const phase2End = new Date(process.env.PHASE2_END || DEFAULT_PHASES.phase2End);
  const festivalDate = new Date(
    process.env.FESTIVAL_DATE || DEFAULT_PHASES.festivalDate
  );

  return { phase1End, phase2End, festivalDate };
}

function computePhase(now) {
  const { phase1End, phase2End, festivalDate } = getConfiguredDates();

  if (now <= phase1End) {
    return {
      phase: 'phase1',
      label: 'Soumissions ouvertes',
      target: phase1End,
    };
  }

  if (now <= phase2End) {
    return {
      phase: 'phase2',
      label: 'Sélection des films',
      target: phase2End,
    };
  }

  if (now <= festivalDate) {
    return {
      phase: 'phase3',
      label: 'Jour du festival',
      target: festivalDate,
    };
  }

  return {
    phase: 'ended',
    label: 'Festival terminé',
    target: festivalDate,
  };
}

function computeRemaining(now, target) {
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalSeconds,
    days,
    hours,
    minutes,
    seconds,
  };
}

// GET /api/festival-phase
router.get('/', (req, res) => {
  const now = new Date();
  const { phase, label, target } = computePhase(now);
  const remaining = computeRemaining(now, target);

  res.json({
    phase,
    label,
    serverTime: now.toISOString(),
    target: target.toISOString(),
    remaining,
  });
});

module.exports = router;

