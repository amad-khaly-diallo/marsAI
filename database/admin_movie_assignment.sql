-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb:3306
-- Généré le : jeu. 19 fév. 2026 à 11:21
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
-- Structure de la table `admin_movie_assignment`
--

CREATE TABLE `admin_movie_assignment` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `rating` tinyint(4) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `flag` enum('green','yellow','red') DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `admin_movie_assignment`
--

INSERT INTO `admin_movie_assignment` (`id`, `admin_id`, `movie_id`, `rating`, `comment`, `flag`, `created_at`) VALUES
(1, 2, 1, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(2, 3, 1, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(3, 4, 1, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(4, 5, 1, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(5, 6, 2, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(6, 2, 2, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(7, 3, 2, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(8, 4, 2, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(9, 5, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(10, 6, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(11, 2, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(12, 3, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(13, 4, 5, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(14, 5, 5, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(15, 6, 5, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(16, 2, 5, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(17, 3, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(18, 4, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(19, 5, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(20, 6, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(21, 2, 7, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(22, 3, 7, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(23, 4, 7, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(24, 5, 7, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(25, 6, 8, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(26, 2, 8, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(27, 3, 8, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(28, 4, 8, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(29, 5, 9, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(30, 6, 9, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(31, 2, 9, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(32, 3, 9, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(33, 4, 10, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(34, 5, 10, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(35, 6, 10, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(36, 2, 10, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(37, 6, 9, 10, 'jgfhg', NULL, '2026-02-12 15:15:57'),
(38, 3, 6, 3, 'il respect pas les aspects', NULL, '2026-02-19 10:58:16');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin_movie_assignment`
--
ALTER TABLE `admin_movie_assignment`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin_movie_assignment`
--
ALTER TABLE `admin_movie_assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
