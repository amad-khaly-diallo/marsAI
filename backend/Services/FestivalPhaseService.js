const { query } = require("../Utils/db");
const { HttpError } = require("../Utils/http");
const {
  getPhaseConfig,
} = require("./FestivalPhaseConfigService");

// on stocke la phase dans une table contenant une seule ligne id=1
async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS festival_phase (
      id INT PRIMARY KEY,
      phase ENUM('phase1','phase2','phase3') NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  const rows = await query("SELECT * FROM festival_phase WHERE id = 1");
  if (rows.length === 0) {
    await query("INSERT INTO festival_phase (id, phase) VALUES (1,'phase1')");
  }
}

async function readRawPhase() {
  await ensureTable();
  const rows = await query("SELECT phase FROM festival_phase WHERE id = 1");
  if (rows.length === 0)
    throw new HttpError(500, "Phase du festival introuvable");
  return rows[0].phase;
}

async function writePhase(phase) {
  const allowed = ["phase1", "phase2", "phase3"];
  if (!allowed.includes(phase)) {
    throw new HttpError(400, "Phase invalide");
  }
  await ensureTable();
  await query(
    `INSERT INTO festival_phase (id, phase) VALUES (1, :phase)
     ON DUPLICATE KEY UPDATE phase = :phase`,
    { phase },
  );
  return phase;
}

// Avance automatiquement la phase si la date de fin est dépassée
async function getCurrentPhase() {
  let phase = await readRawPhase();

  while (true) {
    if (phase === "phase3") {
      // Dernière phase : pas d'auto-transition
      return phase;
    }

    const config = await getPhaseConfig(phase).catch(() => null);
    const endsAt = config?.endsAt ? new Date(config.endsAt) : null;
    const now = new Date();

    if (!endsAt || Number.isNaN(endsAt.getTime())) {
      // Pas de date valide → on reste sur la phase actuelle
      return phase;
    }

    if (now < endsAt) {
      // Pas encore arrivé à la date de fin
      return phase;
    }

    // Date dépassée → on passe à la phase suivante
    if (phase === "phase1") {
      phase = "phase2";
    } else if (phase === "phase2") {
      phase = "phase3";
    } else {
      return phase;
    }

    // On persiste la nouvelle phase avant de boucler / retourner
    await writePhase(phase);
  }
}

async function setCurrentPhase(phase, { enforceBusinessRules = false } = {}) {
  const allowed = ["phase1", "phase2", "phase3"];
  if (!allowed.includes(phase)) {
    throw new HttpError(400, "Phase invalide");
  }

  // Règle métier : pour passer en phase2, il faut entre 40 et 50 films sélectionnés
  if (enforceBusinessRules && phase === "phase2") {
    const rows = await query(
      "SELECT COUNT(*) AS cnt FROM movie WHERE status = 'selected'",
      {},
    );
    const count = rows[0]?.cnt ?? 0;
    if (count < 40 || count > 50) {
      throw new HttpError(
        400,
        `Impossible de passer en phase 2 : il faut entre 40 et 50 films sélectionnés (actuellement ${count}).`,
      );
    }
  }

  await writePhase(phase);
  return getCurrentPhase();
}

module.exports = {
  getCurrentPhase,
  setCurrentPhase,
};
