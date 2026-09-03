const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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
  // Certains fournisseurs S3-compatibles (ex: Supabase Storage) exposent les
  // objets publics via une URL différente de leur endpoint S3 signé. On la
  // laisse configurable, avec l'ancienne URL Scaleway en repli par défaut.
  const publicBase = process.env.SCALEWAY_PUBLIC_URL_BASE;
  if (publicBase) {
    return `${publicBase.replace(/\/$/, "")}/${fileKey}`;
  }
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

/**
 * Génère une presigned URL pour upload direct depuis le navigateur vers S3.
 * @param {string} filename  nom original du fichier
 * @param {string} mimetype  type MIME
 * @param {string} subfolder ex: 'videos'
 * @returns {Promise<{ presignedUrl: string, key: string, publicUrl: string }>}
 */
async function generatePresignedUploadUrl(filename, mimetype, subfolder = "videos") {
  const clean = filename
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-_]/g, "");
  const key = `${FOLDER}/${subfolder}/${Date.now()}-${clean}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: mimetype,
    ACL: "public-read",
  });

  const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  const publicUrl = getFileUrl(key);

  return { presignedUrl, key, publicUrl };
}

module.exports = { uploadFile, deleteFile, getFileUrl, generatePresignedUploadUrl };
