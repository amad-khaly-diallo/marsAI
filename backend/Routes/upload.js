const express = require("express");
const { uploadSingle } = require("../Middlewares/upload");
const s3Service = require("../Services/s3Service");
const { authenticate, authorize } = require("../Middlewares/authMiddleware");

const router = express.Router();

/**
 * POST /api/upload/video
 * Upload d'une vidéo vers S3 (dossier videos/).
 */
router.post("/upload/video", uploadSingle, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier reçu." });
    }
    const result = await s3Service.uploadFile(req.file, "videos");
    return res.status(201).json(result);
  } catch (err) {
    console.error("[upload/video]", err.message);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/upload/image
 * Upload d'une image vers S3 (dossier images/).
 */
router.post("/upload/image", uploadSingle, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier reçu." });
    }
    const result = await s3Service.uploadFile(req.file, "images");
    return res.status(201).json(result);
  } catch (err) {
    console.error("[upload/image]", err.message);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/upload/thumbnail
 * Upload d'une miniature vers S3 (dossier thumbnails/).
 * Images uniquement.
 */
router.post("/upload/thumbnail", uploadSingle, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier reçu." });
    }
    if (!req.file.mimetype.startsWith("image/")) {
      return res
        .status(400)
        .json({ error: "Les thumbnails doivent être des images." });
    }
    const result = await s3Service.uploadFile(req.file, "thumbnails");
    return res.status(201).json(result);
  } catch (err) {
    console.error("[upload/thumbnail]", err.message);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/upload/:key
 * Supprime un fichier du bucket S3 via sa clé.
 * La clé doit être encodée URL (encodeURIComponent côté client).
 */
router.delete("/upload/:key(*)", authenticate, authorize(["admin", "super_admin"]), async (req, res) => {
  try {
    const key = req.params.key;
    if (!key) {
      return res.status(400).json({ error: "Clé de fichier manquante." });
    }
    const success = await s3Service.deleteFile(key);
    if (!success) {
      return res
        .status(500)
        .json({ error: "Échec de la suppression du fichier." });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error("[upload/delete]", err.message);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
