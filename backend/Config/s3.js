const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.SCALEWAY_REGION || "fr-par",
  endpoint: process.env.SCALEWAY_ENDPOINT || "https://s3.fr-par.scw.cloud",
  credentials: {
    accessKeyId: process.env.SCALEWAY_ACCESS_KEY,
    secretAccessKey: process.env.SCALEWAY_SECRET_KEY,
  },
  forcePathStyle: true,
});

const BUCKET_NAME = process.env.SCALEWAY_BUCKET_NAME || "paris";
const FOLDER = process.env.SCALEWAY_FOLDER || "grp2";

module.exports = { s3Client, BUCKET_NAME, FOLDER };
