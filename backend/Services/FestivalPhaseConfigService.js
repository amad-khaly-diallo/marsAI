const { query } = require("../Utils/db");
const { HttpError } = require("../Utils/http");

const PHASES = ["phase1", "phase2", "phase3"];

// Valeurs par défaut basées sur l'ancienne configuration en dur
const DEFAULT_CONFIG = {
  phase1: {
    label: "Soumissions des films",
    endsAt: "2026-03-31T23:59:59Z",
  },
  phase2: {
    label: "Visionnage & sélection",
    endsAt: "2026-04-30T23:59:59Z",
  },
  phase3: {
    label: "Jour du festival",
    endsAt: "2026-05-15T20:00:00Z",
  },
};

async function ensureConfigTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS festival_phase_config (
      phase ENUM('phase1','phase2','phase3') PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      ends_at VARCHAR(64) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  const rows = await query("SELECT phase FROM festival_phase_config");
  const existing = new Set(rows.map((r) => r.phase));

  for (const phase of PHASES) {
    if (!existing.has(phase)) {
      const def = DEFAULT_CONFIG[phase];
      await query(
        `
        INSERT INTO festival_phase_config (phase, label, ends_at)
        VALUES (:phase, :label, :ends_at)
      `,
        {
          phase,
          label: def.label,
          ends_at: def.endsAt,
        },
      );
    }
  }
}

async function getPhaseConfig(phase) {
  if (!PHASES.includes(phase)) {
    throw new HttpError(400, "Phase invalide");
  }

  await ensureConfigTable();
  const rows = await query(
    "SELECT phase, label, ends_at FROM festival_phase_config WHERE phase = :phase",
    { phase },
  );

  if (!rows.length) {
    return {
      phase,
      ...DEFAULT_CONFIG[phase],
    };
  }

  const row = rows[0];
  return {
    phase: row.phase,
    label: row.label,
    endsAt: row.ends_at,
  };
}

async function getAllPhaseConfigs() {
  await ensureConfigTable();
  const rows = await query(
    "SELECT phase, label, ends_at FROM festival_phase_config ORDER BY phase",
  );

  return rows.map((row) => ({
    phase: row.phase,
    label: row.label,
    endsAt: row.ends_at,
  }));
}

async function upsertPhaseConfig({ phase, label, endsAt }) {
  if (!PHASES.includes(phase)) {
    throw new HttpError(400, "Phase invalide");
  }
  if (!label || !endsAt) {
    throw new HttpError(400, "Label et date de fin sont requis");
  }

  await ensureConfigTable();
  await query(
    `
    INSERT INTO festival_phase_config (phase, label, ends_at)
    VALUES (:phase, :label, :ends_at)
    ON DUPLICATE KEY UPDATE
      label = VALUES(label),
      ends_at = VALUES(ends_at)
  `,
    {
      phase,
      label,
      ends_at: endsAt,
    },
  );

  return getPhaseConfig(phase);
}

module.exports = {
  getPhaseConfig,
  getAllPhaseConfigs,
  upsertPhaseConfig,
};

