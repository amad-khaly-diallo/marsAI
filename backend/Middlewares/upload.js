const multer = require("multer");

const ACCEPTED_MIMETYPES = [
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  // Vidéos
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (ACCEPTED_MIMETYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Type de fichier non supporté : ${file.mimetype}. ` +
          `Types acceptés : images (jpeg, png, webp, gif) et vidéos (mp4, webm, quicktime).`,
      ),
      false,
    );
  }
};

const multerInstance = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
});

/** Middleware pour un seul fichier (champ "file") */
const uploadSingle = multerInstance.single("file");

/** Middleware pour plusieurs fichiers (champ "files", max 10) */
const uploadMultiple = multerInstance.array("files", 10);

module.exports = { uploadSingle, uploadMultiple };
