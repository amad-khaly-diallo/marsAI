const mysql = require("mysql2/promise");
require("dotenv").config();

(async () => {
  console.log("\n--- DIAGNOSTIC START ---");
  try {
    // 1. Tenter une connexion SANS base de données pour vérifier les accès
    console.log(
      `1. Test connexion au serveur MySQL (${process.env.DB_HOST}:${process.env.DB_PORT})...`,
    );
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    console.log("✅ Connexion au serveur établie.");

    // 2. Vérifier si la DB existe
    const dbName = process.env.DB_NAME;
    console.log(`2. Vérification de l'existence de la base "${dbName}"...`);
    const [rows] = await connection.query(`SHOW DATABASES LIKE '${dbName}'`);

    if (rows.length > 0) {
      console.log(`✅ La base "${dbName}" existe.`);
    } else {
      console.error(`❌ La base de données "${dbName}" n'existe pas !`);
      console.log(
        "-> Vous devez créer la base de données vide avant de lancer le serveur.",
      );
    }

    await connection.end();
  } catch (error) {
    console.error("❌ ERREUR FATALE :");
    console.error(error.message);

    if (error.code === "ECONNREFUSED") {
      console.error(
        "-> Le serveur MySQL ne répond pas. Vérifiez que XAMPP/WAMP est lancé.",
      );
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("-> Mot de passe ou utilisateur incorrect.");
    } else {
      console.error("-> Code erreur:", error.code);
    }
  }
  console.log("--- DIAGNOSTIC END ---\n");
})();
