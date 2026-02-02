-- 1. Création de la base de données
CREATE DATABASE IF NOT EXISTS marsAi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Sélection de la base
USE marsAi;

-- 3. Table des utilisateurs (Admin)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table des réalisateurs (Filmmakers) - Si vous en avez besoin
CREATE TABLE IF NOT EXISTS filmmakers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    portfolio_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table des films (Movies)
CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    year INT,
    video_url VARCHAR(255),
    thumbnail_url VARCHAR(255), -- Miniature YouTube ou uploadée
    filmmaker_id INT,
    duration VARCHAR(20),
    genre VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (filmmaker_id) REFERENCES filmmakers(id) ON DELETE SET NULL
);

-- 6. Table des soumissions (Submissions)
CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    project_title VARCHAR(255) NOT NULL,
    message TEXT,
    link VARCHAR(255),
    status ENUM('pending', 'reviewed', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Données de test (Optionnel)
INSERT INTO users (username, password_hash) VALUES ('admin', 'votre_hash_mot_de_passe');
