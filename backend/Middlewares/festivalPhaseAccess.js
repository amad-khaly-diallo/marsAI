const { getCurrentPhase } = require('../Services/FestivalPhaseService');
const { HttpError } = require('../Utils/http');

// Mapping simple phase -> niveau numérique pour comparer facilement
const PHASE_ORDER = {
  phase1: 1,
  phase2: 2,
  phase3: 3,
};

async function getPhaseOrThrow() {
  const phase = await getCurrentPhase();
  if (!PHASE_ORDER[phase]) {
    throw new HttpError(500, 'Phase du festival invalide');
  }
  return phase;
}

// Middleware générique : n'autoriser que certaines phases
function allowPhases(allowedPhases) {
  return async (req, res, next) => {
    try {
      // Super admin connecté : on bypass les restrictions de phase
      if (req.user && req.user.role === 'super_admin') {
        return next();
      }

      const phase = await getPhaseOrThrow();
      if (!allowedPhases.includes(phase)) {
        return res.status(403).json({
          message: 'Accès non autorisé pour la phase actuelle du festival',
          phase,
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

// Middleware : exiger un minimum de phase (ex: "phase2" => phase2 & phase3)
function requirePhaseAtLeast(minPhase) {
  return async (req, res, next) => {
    try {
      // Super admin connecté : on bypass les restrictions de phase
      if (req.user && req.user.role === 'super_admin') {
        return next();
      }

      const phase = await getPhaseOrThrow();
      if (PHASE_ORDER[phase] < PHASE_ORDER[minPhase]) {
        return res.status(403).json({
          message: 'Accès non autorisé pour la phase actuelle du festival',
          phase,
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  allowPhases,
  requirePhaseAtLeast,
};

