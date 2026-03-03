const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client, BUCKET_NAME, FOLDER } = require("../Config/s3");

/**
 * Génère un nom de fichier unique à partir du nom original.
 * @param {string} originalname
 * @returns {string}
 */
function buildFilename(originalname) {
  const clean = originalname
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-_]/g, "");
  return `${Date.now()}-${clean}`;
}

/**
 * Construit l'URL publique d'un fichier depuis sa clé S3.
 * @param {string} fileKey  ex: "grp2/videos/xxx.mp4"
 * @returns {string}
 */
function getFileUrl(fileKey) {
  const region = process.env.SCALEWAY_REGION || "fr-par";
  const bucket = process.env.SCALEWAY_BUCKET_NAME || "paris";
  return `https://${bucket}.s3.${region}.scw.cloud/${fileKey}`;
}

/**
 * Upload un fichier (buffer) vers S3 Scaleway.
 * @param {{ buffer: Buffer, mimetype: string, originalname: string }} file
 * @param {string} subfolder  ex: 'videos' | 'images' | 'thumbnails'
 * @returns {Promise<{ url: string, key: string, filename: string }>}
 */
async function uploadFile(file, subfolder) {
  const filename = buildFilename(file.originalname);
  const key = `${FOLDER}/${subfolder}/${filename}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  });

  await s3Client.send(command);

  const url = getFileUrl(key);
  return { url, key, filename };
}

/**
 * Supprime un fichier du bucket S3.
 * @param {string} fileKey  clé du fichier dans le bucket
 * @returns {Promise<boolean>}
 */
async function deleteFile(fileKey) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
    });
    await s3Client.send(command);
    return true;
  } catch (err) {
    console.error("[s3Service] deleteFile error:", err.message);
    return false;
  }
}

module.exports = { uploadFile, deleteFile, getFileUrl };
