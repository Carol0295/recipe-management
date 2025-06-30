-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 27. Jun 2025 um 09:27
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `recipe_management`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `favorites`
--

INSERT INTO `favorites` (`id`, `recipe_id`, `user_id`, `created_at`) VALUES
(56, 1, NULL, '2025-06-27 06:49:44'),
(60, 3, NULL, '2025-06-27 07:24:45');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `ingredients`
--

INSERT INTO `ingredients` (`id`, `recipe_id`, `name`, `quantity`) VALUES
(1, 1, 'Apples', 4),
(2, 1, 'Flour', 2),
(3, 1, 'Sugar', 1),
(4, 1, 'Butter', 100),
(5, 1, 'Cinnamon', 1),
(6, 1, 'Egg', 1),
(7, 1, 'Salt', 1),
(81, 17, 'nata', 250),
(82, 17, 'fresas', 500),
(83, 17, 'harina', 250),
(84, 17, 'leche', 125),
(85, 17, 'huevos', 5),
(86, 17, 'vainilla', 1),
(87, 17, 'azucar', 125),
(172, 2, 'Spaghetti', 200),
(173, 2, 'Eggs', 3),
(174, 2, 'Parmesan cheese', 50),
(175, 2, 'Pancetta', 100),
(176, 2, 'Black pepper', 1),
(177, 2, 'Salt', 1),
(209, 26, 'All-purpose flour', 1),
(210, 26, 'Milk', 1),
(211, 26, 'Egg', 1),
(212, 26, 'Baking powder', 2),
(213, 26, 'Sugar', 2),
(214, 26, 'Salt', 0),
(215, 26, 'Butter (melted)', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `recipes`
--

INSERT INTO `recipes` (`id`, `name`, `description`) VALUES
(1, 'Apple Pie', 'A classic dessert made with sweet apples and cinnamon.'),
(2, 'Spaghetti Carbonara', 'An Italian pasta dish with eggs, cheese, and bacon.'),
(3, 'Caesar Salad', 'A refreshing salad with romaine lettuce, croutons, and Caesar dressing.'),
(17, 'tarta de fresas', 'rica tarta de fresa con nata y un toque a vainilla'),
(26, 'Classic Pancakes', 'Fluffy and delicious pancakes perfect for a hearty breakfast.');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `steps`
--

CREATE TABLE `steps` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `step_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `steps`
--

INSERT INTO `steps` (`id`, `recipe_id`, `step_number`, `step_text`) VALUES
(1, 1, 1, 'Peel and slice the apples.'),
(2, 1, 2, 'Mix apples with sugar and cinnamon. Let it rest.'),
(3, 1, 3, 'Make the dough with flour, butter, egg, and salt.'),
(4, 1, 4, 'Roll out the dough and place it in a pie pan.'),
(5, 1, 5, 'Fill the crust with the apple mixture.'),
(6, 1, 6, 'Bake at 180°C (356°F) for 45 minutes or until golden.'),
(76, 17, 1, 'mezcla todos los ingredientes'),
(77, 17, 2, 'cocina el bizcocho al horno a 220grados por 45min'),
(78, 17, 3, 'bate la nata con un poco de azucar y vainilla'),
(79, 17, 4, 'lava y corta las fresas en cuadraditos'),
(80, 17, 5, 'aniade las fresas (no todas)a la nata'),
(81, 17, 6, 'cuando e bizcocho este frio, desmoldalo y rellenalo con la nata con fresas'),
(82, 17, 7, 'por ultimo decora con fresas y un poco de nata'),
(83, 17, 8, 'deja enfriar y disfrutalo :) <3'),
(150, 2, 1, 'Boil spaghetti in salted water until al dente.'),
(151, 2, 2, 'Fry pancetta until crispy.'),
(152, 2, 3, 'In a bowl, beat eggs and mix with grated cheese.'),
(153, 2, 4, 'Drain pasta and quickly mix with egg-cheese mixture.'),
(154, 2, 5, 'Add pancetta and season with black pepper.'),
(155, 2, 6, 'Serve immediately while hot.'),
(159, 26, 1, 'In a bowl, combine the flour, baking powder, sugar, and salt.'),
(160, 26, 2, 'Whisk in the milk and egg until the batter is smooth.'),
(161, 26, 3, 'Heat a lightly oiled griddle or frying pan over medium-high heat.'),
(162, 26, 4, 'Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.'),
(163, 26, 5, 'Cook until bubbles form and the edges are dry, then flip and cook until golden brown on the other side.'),
(164, 26, 6, 'Serve warm with melted butter or your favorite syrup.');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_fav_recipe` (`recipe_id`);

--
-- Indizes für die Tabelle `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ingredient_recipe` (`recipe_id`);

--
-- Indizes für die Tabelle `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_step_recipe` (`recipe_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT für Tabelle `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT für Tabelle `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT für Tabelle `steps`
--
ALTER TABLE `steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `fk_ingredient_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `steps`
--
ALTER TABLE `steps`
  ADD CONSTRAINT `fk_step_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
