const express = require("express");
const https = require("https");
const http = require("http");

const router = express.Router();

// GET /api/proxy/subtitle?url=https://...
// Récupère un fichier SRT depuis S3 et le renvoie avec les headers CORS appropriés
router.get("/subtitle", (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "url manquante" });
  }

  // Autoriser uniquement les URLs S3 Scaleway du projet
  const allowedHost = "paris.s3.fr-par.scw.cloud";
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({ error: "url invalide" });
  }

  if (parsed.hostname !== allowedHost) {
    return res.status(403).json({ error: "source non autorisée" });
  }

  const client = parsed.protocol === "https:" ? https : http;

  client
    .get(url, (s3Res) => {
      if (s3Res.statusCode !== 200) {
        return res.status(s3Res.statusCode).json({ error: "fichier introuvable" });
      }

      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      s3Res.pipe(res);
    })
    .on("error", () => {
      res.status(500).json({ error: "erreur lors de la récupération du fichier" });
    });
});

module.exports = router;
