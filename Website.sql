-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 26, 2018 at 02:38 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Website`
--

-- --------------------------------------------------------

--
-- Table structure for table `Historic`
--

CREATE TABLE `Historic` (
  `ID` int(11) NOT NULL,
  `Level_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Difficulty_ID` int(11) NOT NULL,
  `Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Historic`
--

INSERT INTO `Historic` (`ID`, `Level_ID`, `User_ID`, `Difficulty_ID`, `Date`) VALUES
(1, 1, 1, 0, '2018-11-15'),
(2, 1, 2, 0, '2018-11-14'),
(3, 2, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Levels`
--

CREATE TABLE `Levels` (
  `Level_ID` int(11) NOT NULL,
  `Difficulty_ID` int(11) NOT NULL,
  `Level_Name` varchar(200) DEFAULT NULL,
  `Level_Desc` varchar(1001) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Levels`
--

INSERT INTO `Levels` (`Level_ID`, `Difficulty_ID`, `Level_Name`, `Level_Desc`) VALUES
(1, 1, 'Intro', NULL),
(1, 2, 'Intro', NULL),
(1, 3, 'Intro', NULL),
(2, 1, 'Level 1\r\n', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Level_Difficulty`
--

CREATE TABLE `Level_Difficulty` (
  `ID_Difficulty` int(11) NOT NULL,
  `Difficulty_Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Level_Difficulty`
--

INSERT INTO `Level_Difficulty` (`ID_Difficulty`, `Difficulty_Name`) VALUES
(1, 'Zen'),
(2, 'Speed-Run'),
(3, 'Hardcore');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL COMMENT 'ID',
  `user_name` varchar(255) CHARACTER SET utf16 NOT NULL COMMENT 'full name''s user',
  `user_mail` varchar(50) NOT NULL COMMENT 'mail',
  `user_password` varchar(35) NOT NULL COMMENT 'password',
  `user_level` int(11) NOT NULL DEFAULT '1' COMMENT 'zen/speed/hardcore',
  `user_progression` double DEFAULT NULL COMMENT 'progression of the user in the game',
  `user_status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `user_name`, `user_mail`, `user_password`, `user_level`, `user_progression`, `user_status`) VALUES
(1, 'guillaume', 'guillaume@mail.fr', 'passwd', 1, NULL, 0),
(2, 'PJ', 'pj@mail.fr', 'pass', 2, NULL, 0),
(3, 'flo ', 'floflo@mail.fr', 'floflo', 1, NULL, 0),
(10, 'gui', 'gui@mail.fr', 'd7f69547d875d5984c7c0d185f62a81b', 1, NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Historic`
--
ALTER TABLE `Historic`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Users` (`User_ID`),
  ADD KEY `levels` (`Level_ID`);

--
-- Indexes for table `Levels`
--
ALTER TABLE `Levels`
  ADD PRIMARY KEY (`Level_ID`,`Difficulty_ID`),
  ADD KEY `Difficulty` (`Difficulty_ID`) USING BTREE;

--
-- Indexes for table `Level_Difficulty`
--
ALTER TABLE `Level_Difficulty`
  ADD PRIMARY KEY (`ID_Difficulty`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `LevelsUsers` (`user_level`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Historic`
--
ALTER TABLE `Historic`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Level_Difficulty`
--
ALTER TABLE `Level_Difficulty`
  MODIFY `ID_Difficulty` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Historic`
--
ALTER TABLE `Historic`
  ADD CONSTRAINT `Users` FOREIGN KEY (`User_ID`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Levels`
--
ALTER TABLE `Levels`
  ADD CONSTRAINT `Difficulty` FOREIGN KEY (`Difficulty_ID`) REFERENCES `Level_Difficulty` (`ID_Difficulty`),
  ADD CONSTRAINT `level` FOREIGN KEY (`Level_ID`) REFERENCES `Historic` (`Level_ID`);

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `LevelsUsers` FOREIGN KEY (`user_level`) REFERENCES `Level_Difficulty` (`ID_Difficulty`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
