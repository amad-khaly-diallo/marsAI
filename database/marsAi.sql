-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb:3306
-- Généré le : lun. 09 mars 2026 à 10:59
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
(1, 'sudo', 'admin', 'super.admin@laplateforme.io', '$2b$10$7fB7RE1unFNN7YIGJ0T5wuC.5c6BhvwdVCyXFJLWdToXTw6C2uZri', 'super_admin', '2026-01-30 08:39:42', '2026-03-09 09:31:41'),
(2, 'admin1', 'admin', 'admin1.admin@laplateforme.io', '$2b$10$ayAQQcxoTLR0cmlZWs9g6u5xe9yGWZhslZNrqQbtsn1yTaO0z9vre', 'admin', '2026-02-03 09:29:45', '2026-02-03 09:29:45'),
(3, 'chaymaa', 'labied', 'chaymaa.labied@laplateforme.io', '$2b$10$dGsjzsznSy25woqQIVfmduvzx2Wy5usv9JZ/D936tJ5QHEomGN7Pa', 'admin', '2026-02-12 11:53:48', '2026-02-12 11:53:48'),
(4, 'mehdi', 'ben-chaabane', 'mehdi.ben-chaabane@laplateform.io', '$2b$10$6Cl8PMLVQeLdpV8YdwkPXOJx9wz/ieA/w.0.wk1mu0eVWRcEMTxWO', 'admin', '2026-02-12 11:55:27', '2026-02-12 11:55:27'),
(5, 'nordine', 'ait-ouaraz', 'nordine.ait-ouaraz@laplateforme.io', '$2b$10$EAS6qw.yUakbClhqmDzO9ep3XgsFpDA6pwINfmEnYWeNM/2xQ..GG', 'admin', '2026-02-12 11:56:37', '2026-02-12 11:56:37'),
(6, 'amad-khaly', 'Diallo', 'amad-khaly.diallo@laplateforme.io', '$2b$10$daDujJ10HrhAGbQAY4QXzupqBEZhQwMofNzGKYpooDWTe1iFT/Zcm', 'admin', '2026-02-12 11:58:44', '2026-03-09 09:33:45');

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
(5, 6, 2, NULL, NULL, 'red', '2026-02-12 15:03:41'),
(6, 2, 2, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(7, 3, 2, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(8, 4, 2, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(9, 5, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(10, 6, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(11, 2, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(12, 3, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(13, 4, 5, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(14, 5, 5, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(15, 6, 5, NULL, NULL, 'yellow', '2026-02-12 15:03:41'),
(16, 2, 5, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(17, 3, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(18, 4, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(19, 5, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(20, 6, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(21, 2, 7, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(22, 3, 7, NULL, NULL, 'red', '2026-02-12 15:03:41'),
(23, 4, 7, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(24, 5, 7, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(25, 6, 8, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(26, 2, 8, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(27, 3, 8, NULL, NULL, 'yellow', '2026-02-12 15:03:41'),
(28, 4, 8, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(29, 5, 9, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(30, 6, 9, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(31, 2, 9, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(32, 3, 9, NULL, NULL, 'green', '2026-02-12 15:03:41'),
(33, 4, 10, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(34, 5, 10, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(35, 6, 10, NULL, NULL, 'green', '2026-02-12 15:03:41'),
(36, 2, 10, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(37, 6, 9, 10, 'jgfhg', NULL, '2026-02-12 15:15:57'),
(38, 3, 6, 3, 'il respect pas les aspects', NULL, '2026-02-19 10:58:16'),
(39, 6, 10, 6, 'pas ouf', NULL, '2026-02-19 13:41:46'),
(40, 6, 2, 2, NULL, NULL, '2026-02-19 13:51:22'),
(41, 6, 5, 5, 'passable', NULL, '2026-02-19 13:51:53'),
(42, 3, 9, 7, NULL, 'green', '2026-02-20 09:02:50'),
(43, 3, 8, NULL, NULL, NULL, '2026-02-20 09:03:03'),
(44, 3, 7, NULL, NULL, NULL, '2026-02-20 09:03:26'),
(45, 3, 9, 7, NULL, NULL, '2026-02-20 13:48:58'),
(46, 1, 16, 10, 'j\'aime bien cette vidéo', NULL, '2026-03-06 13:20:36'),
(47, 1, 16, NULL, NULL, 'green', '2026-03-06 13:33:04');

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
(4, 'hybrid', 'photoshop, sora et capcut', 'j\'ai fais un rpompt a l\'AI et ensuite j\'ai use photoshop pour modifier certaines partis et utiliser capcut pour monter', 9),
(5, '100_ai', 'FreePik', 'qsdlkfhqmsdlkfqsdflqksj qlsdjfhqlsdjkf q sldkjfhl', 11),
(6, '100_ai', 'SORA', 'qmslkdfjqsldkfh qsldkjflqkjfh qskdjfh', 12),
(7, '100_ai', 'qqlskdh', 'ksdjhflskjdfh qskdjflkjs qsdkjfh', 13),
(8, '100_ai', 'FreePik', 'une video libre droit generé par IA ', 14),
(9, 'hybrid', 'Gemini et photoshop', 'je rien a faire dans ce champs mais je peux pas passer sans le remplire', 15),
(10, 'hybrid', 'z\'etes de la police ?', 'nonnnnnnnnnnnnnnn !!!!!!!!!!!!!!!!!!!!!', 16),
(11, '100_ai', 'Sora', 'Find local businesses, view maps and get driving directions in Google Maps.', 17),
(12, '100_ai', 'Sora', 'Découvrez et parcourez le monde avec sérénité grâce à Google Maps. Trouvez les meilleurs itinéraires en voiture, à pied, à vélo et en transports en commun, tout en profitant de données\nDécouvrez et parcourez le monde avec sérénité grâce à Google Maps. Trouvez les meilleurs itinéraires en voiture, à pied, à vélo et en transports en commun, tout en profitant de données', 19),
(13, '100_ai', 'Sora', 'la video a ete telechargé sur sora et uploder', 20);

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
(4, 'still', 'uploads/assets/futuristic-set-with-dj-charge-music-using-virtual-reality-glasses-1770628427594-466118993.jpg', 'jpg', 9),
(5, 'still', 'uploads/assets/jury4-1772615144245-842919039.jpg', 'jpg', 12),
(6, 'still', 'uploads/assets/jury3-1772615144322-842607085.jpg', 'jpg', 12),
(7, 'still', 'uploads/assets/video-1772704724857-232300990.jpg', 'jpg', 13),
(8, 'still', 'uploads/assets/jury4-1772704724931-350109935.jpg', 'jpg', 13),
(9, 'still', 'uploads/assets/jury3-1772704724983-982211900.jpg', 'jpg', 13),
(10, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772720314119-video.jpg', 'jpg', 14),
(11, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772720315191-view-futuristic-concert.jpg', 'jpg', 14),
(12, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772720317277-futuristic-set-with-dj-charge-music-using-virtual-reality-glasses.jpg', 'jpg', 14),
(13, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772786125713-jury4.jpg', 'jpg', 15),
(14, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772786128353-jury3.jpg', 'jpg', 15),
(15, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772786131234-chatgpt-image-21-janv.-2026-11_08_24.png', 'png', 15),
(16, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772807517667-jury4.jpg', 'jpg', 17),
(17, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772807519900-view-futuristic-concert.jpg', 'jpg', 17),
(18, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772807521038-futuristic-set-with-dj-charge-music-using-virtual-reality-glasses.jpg', 'jpg', 17),
(19, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772808313388-jury4.jpg', 'jpg', 19),
(20, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772808315602-view-futuristic-concert.jpg', 'jpg', 19),
(21, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772808316735-futuristic-set-with-dj-charge-music-using-virtual-reality-glasses.jpg', 'jpg', 19),
(22, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772810173420-capture-dcran-du-2026-03-06-16-14-13.png', 'png', 20),
(23, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772810174126-capture-dcran-du-2026-03-06-16-14-48.png', 'png', 20),
(24, 'still', 'https://paris.s3.fr-par.scw.cloud/grp2/assets/stills/1772810174637-capture-dcran-du-2026-03-06-16-15-28.png', 'png', 20);

-- --------------------------------------------------------

--
-- Structure de la table `cms_content`
--

CREATE TABLE `cms_content` (
  `id` int(11) UNSIGNED NOT NULL,
  `content_key` varchar(191) NOT NULL,
  `locale` varchar(10) NOT NULL,
  `value` text NOT NULL,
  `page` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `cms_content`
--

INSERT INTO `cms_content` (`id`, `content_key`, `locale`, `value`, `page`, `description`, `created_at`, `updated_at`) VALUES
(1, 'home.hero.title', 'en', 'Un festival pour raconter fort.', NULL, NULL, '2026-02-11 13:52:32', '2026-02-11 13:53:00');

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
(4, 'Mr', 'amad', 'diallo', 'realisateur', 'amad.diallo@laplateforme.io', 7),
(5, 'Mr', 'Amad', 'DIallo', 'Realisateur', 'amad-khaly.diallo@laplateforme.io', 17);

-- --------------------------------------------------------

--
-- Structure de la table `festival_phase`
--

CREATE TABLE `festival_phase` (
  `id` int(11) NOT NULL,
  `phase` enum('phase1','phase2','phase3') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `festival_phase`
--

INSERT INTO `festival_phase` (`id`, `phase`) VALUES
(1, 'phase1');

-- --------------------------------------------------------

--
-- Structure de la table `festival_phase_config`
--

CREATE TABLE `festival_phase_config` (
  `phase` enum('phase1','phase2','phase3') NOT NULL,
  `label` varchar(255) NOT NULL,
  `ends_at` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `festival_phase_config`
--

INSERT INTO `festival_phase_config` (`phase`, `label`, `ends_at`) VALUES
('phase1', 'Soumissions des films', '2026-03-31T23:59:59Z'),
('phase2', 'Visionnage & sélection', '2026-04-30T23:59:00.000Z'),
('phase3', 'Jour du festival', '2026-05-15T20:00:00Z');

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
(7, 'Mr', 'amad', 'diallo', '2004-01-20', 'khalyamad.d@gqsdfl.com', NULL, '0758854873', 'TESTER', NULL, NULL, 'Paris', 'France', 'collègue', 0),
(8, 'Mr', 'mehdi', 'mehdi', '2001-02-20', 'mehdi.mehdi@laplateforme.io', NULL, '01234567', 'student', NULL, NULL, 'Paris', 'France', 'famille', 0),
(9, 'Mr', 'pierre', 'pierre', '1988-02-20', 'pierre@gmail.com', NULL, '01234567', 'Prof', NULL, NULL, 'France', 'PAris', 'formation', 0),
(12, 'Mr', 'diallo', 'khaly', '2000-01-20', 'khalyamad.d@gmail.com', NULL, '01234567', 'DEV', NULL, NULL, 'Parsi', 'Fr', 'family', 0),
(13, 'Mr', 'AMAD', 'DIALLO', '2000-02-20', 'khalyamad.d@gmail.com', NULL, '01234567', 'Dev', NULL, NULL, 'Parsi', 'Fr', 'sld', 0),
(14, 'Mr', 'qmsldk', 'qmsdlk', '2000-02-20', 'amad-khaly.diallo@laplateforme.io', NULL, '01234567', 'Dev', NULL, NULL, 'Paris', 'Fr', 'dsmfk', 0),
(15, 'Mr', 'qsokdfh', 'qlskd', '2003-03-02', 'qsldk@laplateforme.io', NULL, '1234556', 'qsf', NULL, NULL, 'Fqsd', 'qsdfqs', 'qsdf', 0),
(16, 'Mr', 'dlskf', 'MQslk', '2000-02-02', 'lsdkjfhq@gmail.com', NULL, NULL, 'qdf', NULL, NULL, 'sdf', 'sdfl', 'qdf', 0),
(17, 'Mr', 'amad', 'diallo', '1999-03-05', 'khalyd@gamil.com', NULL, '', 'DEV', NULL, NULL, NULL, 'Ahvenanmaa', NULL, 0),
(18, 'Mr', 'qmlsdkf', 'sdlfkj', '2001-04-04', 'qlksjdf@gamil.c', NULL, '', 'Sqlsdk', NULL, NULL, 'mlskd', 'Arabie Saoudite', 'school', 0),
(19, 'Mr', 'qskdjfh', 'sldjfh', '2000-02-03', 'qlsdk@gmail.om', NULL, '', 'qmlkfd', NULL, NULL, 'Santa Cruz', 'Aruba', 'search_engine', 0),
(20, 'Mr', 'sldkf', 'qlsd', '2000-03-20', 'qslkd@gmail.com', NULL, '', 'sdlk', NULL, NULL, 'SZF', 'Palestine', 'search_engine', 0),
(21, 'Mrs', 'qsmlkdfj', 'qlksdfj', '2000-04-23', 'qsdlk@gmail.com', NULL, NULL, 'qlskd', NULL, NULL, 'qsdf', 'Argentine', 'press', 0),
(22, 'Mr', 'qmlskd', 'qsmdlkf', '1888-02-12', 'qmsdlk@gmail.com', NULL, '', 'ldskjf', NULL, NULL, 'Aleksandriya', 'Ukraine', 'social_media', 0),
(23, 'Mr', 'amad khaly', 'Diallo', '2004-01-20', 'khaly.diallo@gmail.com', NULL, NULL, 'Dev', NULL, NULL, 'conakry', 'Guinée', 'school', 0),
(24, 'Mr', 'Amad khaly', 'Diallo', '2000-02-20', 'amad@gmail.com', NULL, NULL, 'Dev', NULL, NULL, 'Joinville-le-Pont', 'France', 'friend', 0),
(25, 'Mr', 'john', 'doe', '2024-12-22', 'pierre.aubree@laplateforme.io', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(26, 'Mrs', 'Aicha BB', 'Diallo', '2007-06-15', 'aissadiallo751@gmail.com', NULL, NULL, 'Cybersecurité', NULL, NULL, 'Torcy', 'France', 'friend', 0),
(27, 'Mrs', 'Aissa BB', 'Diallo', '2007-06-15', 'aissadiallo751@gmail.com', NULL, NULL, 'Etudiante', NULL, NULL, 'Paris', 'France', 'friend', 0),
(28, 'Mr', 'Amad khaly', 'diallo', '2004-02-20', 'amad-khaly.diallo@laplateforme.io', NULL, NULL, 'DEV', NULL, NULL, 'Torcy', 'France', 'school', 0),
(29, 'Mr', 'amad', 'Diallo', '2001-04-20', 'amad-khaly.diallo@laplateforme.io', NULL, NULL, 'dev', NULL, NULL, 'Torcy', 'France', 'search_engine', 0),
(30, 'Mr', 'Harouna', 'Soumare', '2005-02-20', 'harouna.soumare@laplateforme.io', NULL, NULL, 'Dev Web', NULL, NULL, 'Paris', 'France', 'school', 0),
(31, 'Mr', 'Harouna', 'Soumare', '2006-02-20', 'harouna.soumare@laplateforme.io', NULL, NULL, 'Dev Web', NULL, NULL, 'Paris', 'France', 'school', 0);

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
(2, 'Nordine', 'Ait', 'President du Jury', 'Le Lorem ipsum est un texte factice en latin utilisé depuis des siècles dans l\'imprimerie, la typographie et la conception graphique pour remplir un espace avant que le contenu réel ne soit disponible. ', 'https://paris.s3.fr-par.scw.cloud/grp2/images/1773048043554-jury3.jpg', '2026-02-13 09:08:00', '2026-03-09 09:23:34'),
(3, 'Ahamd', 'khaly', 'Critique Cinema', 'Le Lorem ipsum est un texte factice en latin utilisé depuis des siècles dans l\'imprimerie, la typographie et la conception graphique pour remplir un espace avant que le contenu réel ne soit disponible. ', 'https://paris.s3.fr-par.scw.cloud/grp2/images/1773048014460-jury1.jpg', '2026-02-13 09:08:00', '2026-03-09 09:23:25'),
(4, 'Mehdi', 'Ben-chabaane', 'Expert AI', 'Le Lorem ipsum est un texte factice en latin utilisé depuis des siècles dans l\'imprimerie, la typographie et la conception graphique pour remplir un espace avant que le contenu réel ne soit disponible. ', 'https://paris.s3.fr-par.scw.cloud/grp2/images/1773047981353-jury2.jpg', '2026-02-13 09:08:00', '2026-03-09 09:22:41'),
(5, 'Sofia', 'Martinez', 'Productrice', 'Le Lorem ipsum est un texte factice en latin utilisé depuis des siècles dans l\'imprimerie, la typographie et la conception graphique pour remplir un espace avant que le contenu réel ne soit disponible. ', 'https://paris.s3.fr-par.scw.cloud/grp2/images/1773047958686-jury3.jpg', '2026-02-13 09:08:00', '2026-03-09 09:22:24');

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
  `youtube_url` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `status` enum('in_process','approved','rejected','selected') DEFAULT 'in_process',
  `decision_reason` text DEFAULT NULL,
  `decision_at` datetime DEFAULT NULL,
  `is_winner` tinyint(1) NOT NULL DEFAULT 0,
  `filmmaker_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `movie`
--

INSERT INTO `movie` (`id`, `original_title`, `english_title`, `duration`, `language`, `synopsis_original`, `synopsis_english`, `youtube_url`, `video_url`, `status`, `decision_reason`, `decision_at`, `is_winner`, `filmmaker_id`) VALUES
(1, 'Le Film Test', 'The Test Movie', 120, 'French', 'Ceci est un synopsis en français.', 'This is an English synopsis.', 'https://youtu.be/dQw4w9WgXcQ', NULL, 'rejected', NULL, '2026-02-05 15:26:47', 0, 1),
(2, 'Le Film Test', 'The Test Movie', 120, 'French', 'Ceci est un synopsis en français.', 'This is an English synopsis.', 'https://youtu.be/dQw4w9WgXcQ', NULL, 'rejected', NULL, '2026-02-06 13:42:40', 0, 1),
(4, 'title', 'title', 1, 'anglais', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=CyMS7UqT53w', NULL, 'rejected', NULL, '2026-02-19 10:58:29', 0, 1),
(5, 'title', 'title', 10, 'angais', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=LuykUqIniFE', NULL, 'selected', NULL, '2026-02-12 14:26:40', 0, 1),
(6, 'title', 'title', 5, 'anglais', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=pHKFWb5Zgk8', NULL, 'selected', 'je sais pas pourquoi', '2026-02-03 09:49:04', 0, 1),
(7, 'savane', 'savane', 1, 'Français', 'dans la savane', 'dans la savane', 'https://www.youtube.com/watch?v=0vI-icmWPww', NULL, 'approved', NULL, '2026-03-06 13:51:09', 0, 4),
(8, 'Title', 'title', 0, 'English', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=OERknocIYKI', NULL, 'rejected', NULL, '2026-02-12 14:26:36', 0, 5),
(9, 'Futur souhaitable', 'futur', 1, 'Français', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=sdN8gdoYOYo', NULL, 'selected', NULL, '2026-02-12 15:15:47', 1, 7),
(10, 'titre', 'titre', 1, 'french', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=nTWKt1yKxVg', NULL, 'selected', NULL, '2026-02-20 09:17:46', 0, 8),
(11, 'titre', 'title', 15, 'En', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=C5fbefyCXD8', 'uploads/videos/1771841693129-245859721.mp4', 'selected', NULL, NULL, 0, 14),
(12, 'qmsldk', 'qlskd', 5, 'qsdf', 'qmsldk', 'qmsdkf', 'https://www.youtube.com/watch?v=mOesEk88F84', 'uploads/videos/1772615045727-531698950.mp4', 'approved', NULL, '2026-03-06 13:51:09', 0, 15),
(13, 'qsdj', 'lsdkj', 10, 'lkjsdhf', 'lskdjhf', 'lqskjdhf', 'https://www.youtube.com/watch?v=Kkm7C1Hr54A', 'uploads/videos/1772704640094-383623487.mp4', 'approved', NULL, '2026-03-06 13:51:10', 0, 22),
(14, 'titre de la video', 'video title', 35, 'Français', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=S9iIoYutGM0', 'https://paris.s3.fr-par.scw.cloud/grp2/videos/1772720098453-chaymaa.mp4', 'selected', NULL, NULL, 0, 23),
(15, 'unknow', 'inconnu', 5, 'English', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=3cYPfsh970k', 'https://paris.s3.fr-par.scw.cloud/grp2/videos/1772785985179-sadjo.mp4', 'selected', NULL, NULL, 0, 24),
(16, 'flying donuts', 'flying donuts', 35, NULL, NULL, NULL, 'https://www.youtube.com/watch?v=Rmed0_j8YEc', 'https://paris.s3.fr-par.scw.cloud/grp2/videos/1772788685293-chaymaa.mp4', 'approved', NULL, '2026-03-06 13:51:11', 0, 25),
(17, 'Maps', 'Maps', 5, 'English', 'Synopsis (langue originale) Synopsis (langue originale)', 'Synopsis (langue originale) Synopsis (langue originale)', 'https://www.youtube.com/watch?v=ks-2fJtuvhc', 'https://paris.s3.fr-par.scw.cloud/grp2/videos/1772807391597-maps.mp4', 'approved', NULL, '2026-03-06 14:42:40', 0, 27),
(18, 'Titre original', 'Titre original', 5, 'Français', 'Synopsis (langue originale) Synopsis (langue originale)', 'Synopsis (langue originale) Synopsis (langue originale)', 'https://www.youtube.com/watch?v=aOoWcp-LX8Q', 'https://paris.s3.fr-par.scw.cloud/grp2/videos/1772807952888-labo.mp4', 'approved', NULL, '2026-03-06 14:42:41', 0, 28),
(19, 'titre de la video', 'video title', 5, 'Français', 'Découvrez et parcourez le monde avec sérénité grâce à Google Maps. Trouvez les meilleurs itinéraires en voiture, à pied, à vélo et en transports en commun, tout en profitant de données', 'Découvrez et parcourez le monde avec sérénité grâce à Google Maps. Trouvez les meilleurs itinéraires en voiture, à pied, à vélo et en transports en commun, tout en profitant de données', 'https://www.youtube.com/watch?v=4HRb8BIu4SQ', 'https://paris.s3.fr-par.scw.cloud/grp2/videos/1772808210696-labo.mp4', 'approved', NULL, '2026-03-06 14:57:40', 0, 29),
(20, 'titre', 'title', 5, 'Français', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=qbPFzDJrlEY', 'https://paris.s3.fr-par.scw.cloud/grp2/videos/1772809961477-labo.mp4', 'approved', NULL, '2026-03-06 15:17:22', 0, 31);

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
(14, 4),
(17, 4),
(19, 4),
(20, 4),
(9, 5),
(14, 6),
(17, 6),
(15, 7),
(15, 8),
(17, 9),
(20, 9),
(19, 10),
(19, 11),
(20, 12);

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
(8, 'khalyamad.d@gmail.com', '2026-02-06 14:06:02'),
(9, 'pierre.aubree@laplateforme.io', '2026-03-06 09:00:55');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `notations`
--

INSERT INTO `notations` (`id`, `score`, `comment`, `film_id`, `admin_id`, `created_at`) VALUES
(1, 0, NULL, 1, 2, '2026-02-12 12:57:12'),
(2, 0, NULL, 1, 3, '2026-02-12 12:57:12'),
(3, 0, NULL, 2, 4, '2026-02-12 12:57:12'),
(4, 0, NULL, 2, 5, '2026-02-12 12:57:12'),
(5, 0, NULL, 4, 6, '2026-02-12 12:57:12'),
(6, 0, NULL, 4, 2, '2026-02-12 12:57:12'),
(7, 0, NULL, 5, 3, '2026-02-12 12:57:12'),
(8, 0, NULL, 5, 4, '2026-02-12 12:57:12'),
(9, 0, NULL, 6, 5, '2026-02-12 12:57:12'),
(10, 0, NULL, 6, 6, '2026-02-12 12:57:12'),
(11, 0, NULL, 7, 2, '2026-02-12 12:57:12'),
(12, 0, NULL, 7, 3, '2026-02-12 12:57:12'),
(13, 0, NULL, 8, 4, '2026-02-12 12:57:12'),
(14, 0, NULL, 8, 5, '2026-02-12 12:57:12'),
(15, 0, NULL, 9, 6, '2026-02-12 12:57:12'),
(16, 0, NULL, 9, 2, '2026-02-12 12:57:12'),
(17, 0, NULL, 10, 3, '2026-02-12 12:57:12'),
(18, 0, NULL, 10, 4, '2026-02-12 12:57:12');

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
(3, 'La Plateforme', 'https://paris.s3.fr-par.scw.cloud/grp2/images/1773047174754-laplateforme.png', 'Le site web https://laplateforme.io/ est celui de École La Plateforme, une grande école du numérique ouverte à tous, proposant des formations d’excellence en informatique avec des frais de scolarité accessibles, sans conditions de diplôme ni de ressources.  Elle organise également des événements culturels et professionnels à Marseille, comme les journées Babel Music XP, Marseille Fait Son Cinéma, ou encore La Grande Démo. Le site permet de s’inscrire à des tests de sélection, télécharger une brochure ou rejoindre la newsletter.', 'https://laplateforme.io', '2026-03-09 09:06:20', '2026-03-09 09:06:20'),
(4, 'Mobile Film festival', 'https://paris.s3.fr-par.scw.cloud/grp2/images/1773047282030-mobilefilm.png', 'Les festival de films mobiles mettent en avant des œuvres cinématographiques entièrement réalisées avec un smartphone.  Ces événements encouragent la créativité accessible à tous, indépendamment des moyens techniques ou financiers', 'https://www.mobilefilmfestival.com/', '2026-03-09 09:08:08', '2026-03-09 09:08:08');

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
(12, '#amination'),
(6, '#animation'),
(7, '#environnement'),
(3, '#futur'),
(10, '#humor'),
(11, '#labo'),
(9, '#marseille'),
(8, '#paysage'),
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
-- Index pour la table `admin_movie_assignment`
--
ALTER TABLE `admin_movie_assignment`
  ADD PRIMARY KEY (`id`);

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
-- Index pour la table `cms_content`
--
ALTER TABLE `cms_content`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_key_locale` (`content_key`,`locale`);

--
-- Index pour la table `collaborator`
--
ALTER TABLE `collaborator`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_collaborator_movie` (`movie_id`);

--
-- Index pour la table `festival_phase`
--
ALTER TABLE `festival_phase`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `festival_phase_config`
--
ALTER TABLE `festival_phase_config`
  ADD PRIMARY KEY (`phase`);

--
-- Index pour la table `filmmaker`
--
ALTER TABLE `filmmaker`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `admin_movie_assignment`
--
ALTER TABLE `admin_movie_assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT pour la table `ai_declaration`
--
ALTER TABLE `ai_declaration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `asset`
--
ALTER TABLE `asset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `cms_content`
--
ALTER TABLE `cms_content`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `collaborator`
--
ALTER TABLE `collaborator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `filmmaker`
--
ALTER TABLE `filmmaker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `jury`
--
ALTER TABLE `jury`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `newsletters`
--
ALTER TABLE `newsletters`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `notations`
--
ALTER TABLE `notations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
