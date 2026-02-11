-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb:3306
-- Généré le : mar. 10 fév. 2026 à 08:23
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
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','super_admin') NOT NULL DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'super', 'admin', 'super.admin@laplateforme.io', '$2b$10$7fB7RE1unFNN7YIGJ0T5wuC.5c6BhvwdVCyXFJLWdToXTw6C2uZri', 'admin', '2026-01-30 08:39:42', '2026-01-30 08:39:42'),
(2, 'admin1', 'admin', 'admin1.admin@laplateforme.io', '$2b$10$ayAQQcxoTLR0cmlZWs9g6u5xe9yGWZhslZNrqQbtsn1yTaO0z9vre', 'admin', '2026-02-03 09:29:45', '2026-02-03 09:29:45');

-- --------------------------------------------------------

--
-- Structure de la table `ai_declaration`
--

CREATE TABLE `ai_declaration` (
  `id` int(11) NOT NULL,
  `artwork_type` enum('100_ai','hybrid') NOT NULL,
  `tech_stack` varchar(500) DEFAULT NULL,
  `methodology` varchar(500) DEFAULT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `ai_declaration`
--

INSERT INTO `ai_declaration` (`id`, `artwork_type`, `tech_stack`, `methodology`, `movie_id`) VALUES
(1, '100_ai', 'Sora', 'prompt', 6),
(2, '100_ai', 'Freepik', 'j\'ai pris une vidéo par hasard sur freepik', 7),
(3, '100_ai', 'Artist.io', 'prompt', 8),
(4, 'hybrid', 'photoshop, sora et capcut', 'j\'ai fais un rpompt a l\'AI et ensuite j\'ai use photoshop pour modifier certaines partis et utiliser capcut pour monter', 9);

-- --------------------------------------------------------

--
-- Structure de la table `asset`
--

CREATE TABLE `asset` (
  `id` int(11) NOT NULL,
  `asset_type` enum('thumbnail','still','subtitle','other') NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_format` varchar(10) DEFAULT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `asset`
--

INSERT INTO `asset` (`id`, `asset_type`, `file_path`, `file_format`, `movie_id`) VALUES
(1, 'thumbnail', '/uploads/thumbnail1.jpg', 'jpg', 2),
(2, 'still', 'uploads/assets/video-1770628427436-368732121.jpg', 'jpg', 9),
(3, 'still', 'uploads/assets/view-futuristic-concert-1770628427546-676111237.jpg', 'jpg', 9),
(4, 'still', 'uploads/assets/futuristic-set-with-dj-charge-music-using-virtual-reality-glasses-1770628427594-466118993.jpg', 'jpg', 9);

-- --------------------------------------------------------

--
-- Structure de la table `collaborator`
--

CREATE TABLE `collaborator` (
  `id` int(11) NOT NULL,
  `civility` varchar(10) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `collaborator`
--

INSERT INTO `collaborator` (`id`, `civility`, `first_name`, `last_name`, `role`, `email`, `movie_id`) VALUES
(1, 'Mr', 'Paul', 'Martin', 'Producer', 'paul.martin@example.com', 2),
(2, 'Mr', 'mehdi', 'mehdi', 'monteur video', 'mehdi.mehdi@laplateforme.io', 6),
(3, 'Mr', 'amad', 'diallo', 'realisateur', 'amad.diallo@laplateforme.io', 7),
(4, 'Mr', 'amad', 'diallo', 'realisateur', 'amad.diallo@laplateforme.io', 7);

-- --------------------------------------------------------

--
-- Structure de la table `filmmaker`
--

CREATE TABLE `filmmaker` (
  `id` int(11) NOT NULL,
  `civility` enum('Mr','Mrs') DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `job` varchar(100) DEFAULT NULL,
  `street` varchar(150) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `discovery_source` varchar(100) DEFAULT NULL,
  `newsletter` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `filmmaker`
--

INSERT INTO `filmmaker` (`id`, `civility`, `first_name`, `last_name`, `birth_date`, `email`, `phone`, `mobile`, `job`, `street`, `postal_code`, `city`, `country`, `discovery_source`, `newsletter`) VALUES
(1, 'Mr', 'John', 'Doe', '1990-05-15', 'khalyamad.d@gmail.com', '0123456789', '0612345678', 'Director', '123 Rue Exemple', '75001', 'Paris', 'France', 'Social Media', 1),
(3, 'Mr', 'Amad khaly', 'Diallo', '2002-02-25', 'amad-khaly.diallo@laplateforme.io', '0758854873', '0758854873', 'DEV', '123 rue de la paix', '12345', 'Ville', 'pays', 'famille', 1),
(4, 'Mr', 'sadjo', 'kanoute', '1920-12-24', 'sadjo.kanoute@laplateforme.io', NULL, '01234567', 'DEV', NULL, NULL, 'Paris', 'France', 'laplateforme', 0),
(5, 'Mr', 'amad', 'diallo', '2000-11-03', 'amad.diallo@laplateforme.io', NULL, '01234567', 'DEV', NULL, NULL, 'Paris', 'Belgique', 'Famille', 0),
(7, 'Mr', 'amad', 'diallo', '2004-01-20', 'khalyamad.d@gqsdfl.com', NULL, '0758854873', 'TESTER', NULL, NULL, 'Paris', 'France', 'collègue', 0);

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

-- --------------------------------------------------------

--
-- Structure de la table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `original_title` varchar(150) NOT NULL,
  `english_title` varchar(150) NOT NULL,
  `duration` int(11) NOT NULL,
  `language` varchar(50) DEFAULT NULL,
  `synopsis_original` varchar(300) DEFAULT NULL,
  `synopsis_english` varchar(300) DEFAULT NULL,
  `youtube_url` varchar(255) NOT NULL,
  `status` enum('in_process','approved','rejected','selected') DEFAULT 'in_process',
  `decision_reason` text DEFAULT NULL,
  `decision_at` datetime DEFAULT NULL,
  `filmmaker_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `movie`
--

INSERT INTO `movie` (`id`, `original_title`, `english_title`, `duration`, `language`, `synopsis_original`, `synopsis_english`, `youtube_url`, `status`, `decision_reason`, `decision_at`, `filmmaker_id`) VALUES
(1, 'Le Film Test', 'The Test Movie', 120, 'French', 'Ceci est un synopsis en français.', 'This is an English synopsis.', 'https://youtu.be/dQw4w9WgXcQ', 'rejected', NULL, '2026-02-05 15:26:47', 1),
(2, 'Le Film Test', 'The Test Movie', 120, 'French', 'Ceci est un synopsis en français.', 'This is an English synopsis.', 'https://youtu.be/dQw4w9WgXcQ', 'rejected', NULL, '2026-02-06 13:42:40', 1),
(4, 'title', 'title', 1, 'anglais', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=CyMS7UqT53w', 'in_process', NULL, NULL, 1),
(5, 'title', 'title', 10, 'angais', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=LuykUqIniFE', 'in_process', NULL, NULL, 1),
(6, 'title', 'title', 5, 'anglais', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=pHKFWb5Zgk8', 'selected', 'je sais pas pourquoi', '2026-02-03 09:49:04', 1),
(7, 'savane', 'savane', 1, 'Français', 'dans la savane', 'dans la savane', 'https://www.youtube.com/watch?v=0vI-icmWPww', 'in_process', NULL, NULL, 4),
(8, 'Title', 'title', 0, 'English', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=OERknocIYKI', 'in_process', NULL, NULL, 5),
(9, 'Futur souhaitable', 'futur', 1, 'Français', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=sdN8gdoYOYo', 'in_process', NULL, NULL, 7);

-- --------------------------------------------------------

--
-- Structure de la table `movie_tag`
--

CREATE TABLE `movie_tag` (
  `movie_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `movie_tag`
--

INSERT INTO `movie_tag` (`movie_id`, `tag_id`) VALUES
(6, 2),
(9, 3),
(9, 4),
(9, 5);

-- --------------------------------------------------------

--
-- Structure de la table `newsletters`
--

CREATE TABLE `newsletters` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `newsletters`
--

INSERT INTO `newsletters` (`id`, `email`, `created_at`) VALUES
(1, 'amad-khaly.diallo@laplateforme.io', '2026-02-06 13:39:10'),
(2, 'mehdi.ben-chaabane@laplateforme.io', '2026-02-06 13:39:10'),
(3, 'nordine.ait-ouaraz@laplateforme.io', '2026-02-06 13:48:09'),
(5, 'chaymaa.labied@laplateforme.io', '2026-02-06 13:48:09'),
(6, 'jawad.zafari@laplateforme.io', '2026-02-06 13:48:09'),
(7, 'soumman.guirassy@laplateforme.io', '2026-02-06 13:48:09'),
(8, 'khalyamad.d@gmail.com', '2026-02-06 14:06:02');

-- --------------------------------------------------------

--
-- Structure de la table `notations`
--

CREATE TABLE `notations` (
  `id` int(10) UNSIGNED NOT NULL,
  `score` tinyint(3) UNSIGNED NOT NULL CHECK (`score` between 0 and 10),
  `comment` text DEFAULT NULL,
  `film_id` int(10) UNSIGNED NOT NULL,
  `admin_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Structure de la table `partners`
--

CREATE TABLE `partners` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `partners`
--

INSERT INTO `partners` (`id`, `name`, `logo_url`, `description`, `website_url`, `created_at`, `updated_at`) VALUES
(1, 'partenaires', 'https://www.parteners.fr/logo', 'partenaire description', 'https://www.parteners.fr', '2026-02-06 12:15:56', '2026-02-06 12:15:56');

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `label` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `tag`
--

INSERT INTO `tag` (`id`, `label`) VALUES
(4, '#ai'),
(3, '#futur'),
(5, '#photoshop'),
(2, '#teste');

-- --------------------------------------------------------

--
-- Structure de la table `winner`
--

CREATE TABLE `winner` (
  `id` int(11) NOT NULL,
  `ranking` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `ai_declaration`
--
ALTER TABLE `ai_declaration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `movie_id` (`movie_id`);

--
-- Index pour la table `asset`
--
ALTER TABLE `asset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_asset_movie` (`movie_id`);

--
-- Index pour la table `collaborator`
--
ALTER TABLE `collaborator`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_collaborator_movie` (`movie_id`);

--
-- Index pour la table `filmmaker`
--
ALTER TABLE `filmmaker`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `jury`
--
ALTER TABLE `jury`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movie_filmmaker` (`filmmaker_id`);

--
-- Index pour la table `movie_tag`
--
ALTER TABLE `movie_tag`
  ADD PRIMARY KEY (`movie_id`,`tag_id`),
  ADD KEY `fk_movie_tag_tag` (`tag_id`);

--
-- Index pour la table `newsletters`
--
ALTER TABLE `newsletters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `notations`
--
ALTER TABLE `notations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_notations_admin_film` (`film_id`,`admin_id`);

--
-- Index pour la table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `label` (`label`);

--
-- Index pour la table `winner`
--
ALTER TABLE `winner`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category` (`category`,`ranking`),
  ADD KEY `fk_winner_movie` (`movie_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `ai_declaration`
--
ALTER TABLE `ai_declaration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `asset`
--
ALTER TABLE `asset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `collaborator`
--
ALTER TABLE `collaborator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `filmmaker`
--
ALTER TABLE `filmmaker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `jury`
--
ALTER TABLE `jury`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `newsletters`
--
ALTER TABLE `newsletters`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `notations`
--
ALTER TABLE `notations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `winner`
--
ALTER TABLE `winner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ai_declaration`
--
ALTER TABLE `ai_declaration`
  ADD CONSTRAINT `fk_ai_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `asset`
--
ALTER TABLE `asset`
  ADD CONSTRAINT `fk_asset_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `collaborator`
--
ALTER TABLE `collaborator`
  ADD CONSTRAINT `fk_collaborator_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `fk_movie_filmmaker` FOREIGN KEY (`filmmaker_id`) REFERENCES `filmmaker` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `movie_tag`
--
ALTER TABLE `movie_tag`
  ADD CONSTRAINT `fk_movie_tag_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_movie_tag_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `winner`
--
ALTER TABLE `winner`
  ADD CONSTRAINT `fk_winner_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
