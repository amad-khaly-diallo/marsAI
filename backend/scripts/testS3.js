/**
 * Script de test de l'intégration S3 Scaleway.
 * Usage : npm run test:s3
 */
require("../Config/env"); // Charge le .env via dotenv
const s3Service = require("../Services/s3Service");

async function runTest() {
  console.log("🚀 Démarrage du test S3 Scaleway...\n");

  // 1. Préparer un faux fichier (buffer texte)
  const testContent = "marsAI S3 test OK";
  const fakeFile = {
    buffer: Buffer.from(testContent, "utf-8"),
    mimetype: "text/plain",
    originalname: "test.txt",
  };

  // 2. Upload
  console.log("📤 Upload de test.txt...");
  let uploadResult;
  try {
    uploadResult = await s3Service.uploadFile(fakeFile, "test");
    console.log("✅ Upload réussi !");
    console.log("   URL :", uploadResult.url);
    console.log("   Clé :", uploadResult.key);
  } catch (err) {
    console.error("❌ Échec de l'upload :", err.message);
    process.exit(1);
  }

  // 3. Suppression
  console.log("\n🗑️  Suppression du fichier de test...");
  const deleted = await s3Service.deleteFile(uploadResult.key);
  if (deleted) {
    console.log("✅ Suppression réussie !");
  } else {
    console.warn(
      "⚠️  La suppression a échoué (fichier peut-être déjà absent).",
    );
  }

  console.log("\n🎉 Test S3 réussi ✅");
}

runTest().catch((err) => {
  console.error("Erreur inattendue :", err);
  process.exit(1);
});
