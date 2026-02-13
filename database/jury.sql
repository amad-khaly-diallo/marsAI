-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb:3306
-- Généré le : ven. 13 fév. 2026 à 12:46
-- Version du serveur : 11.8.5-MariaDB-ubu2404
-- Version de PHP : 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `marsAi`
--

-- --------------------------------------------------------

--
-- Structure de la table `jury`
--

CREATE TABLE `jury` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `role` varchar(150) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `jury`
--

INSERT INTO `jury` (`id`, `first_name`, `last_name`, `role`, `bio`, `photo_url`, `created_at`, `updated_at`) VALUES
(2, 'Nordine', '-', 'President du Jury', 'Réalisateur éminent et leader dans l\'utilisation de l\'intelligence artificielle au cinéma.', '/images/allumer.png', '2026-02-13 09:08:00', '2026-02-13 09:15:43'),
(3, 'Ahamd', '-', 'Critique Cinema', 'Critique principal de magazines de cinéma et analyste technologique.', '/uploads/avatar.jpg', '2026-02-13 09:08:00', '2026-02-13 09:08:00'),
(4, 'Mehdi', '', 'Expert AI', 'Chercheur principal en modèles linguistiques et production d\'images.', 'Mehdi.jpg', '2026-02-13 09:08:00', '2026-02-13 11:09:10'),
(5, 'Sofia', 'Martinez', 'Productrice', 'Producteur de projets indépendants en Europe.', 'banner.png', '2026-02-13 09:08:00', '2026-02-13 11:12:01'),
(6, 'John', 'Doe', 'Producteur', 'Producteur de projets indépendants en Europe.', 'john.jpg', '2026-02-13 09:08:00', '2026-02-13 11:15:05'),
(7, 'Jane', 'Smith', 'Productrice', 'Productrice de projets indépendants en Europe.', '/uploads/avatar.jpg', '2026-02-13 09:08:00', '2026-02-13 09:08:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `jury`
--
ALTER TABLE `jury`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `jury`
--
ALTER TABLE `jury`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
