-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2019 at 03:58 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `computing_nps`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `departmentId` int(11) NOT NULL,
  `departmentName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `encounter`
--

CREATE TABLE `encounter` (
  `surveyEncounterId` int(11) UNSIGNED NOT NULL,
  `location` text NOT NULL,
  `date` date NOT NULL,
  `departmentId` int(11) NOT NULL,
  `programId` int(11) NOT NULL,
  `yearOfStudy` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `unitCode` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `programId` int(11) NOT NULL,
  `programName` varchar(200) NOT NULL,
  `departmentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `studentresponse`
--

CREATE TABLE `studentresponse` (
  `surveyResponseId` int(11) UNSIGNED NOT NULL,
  `surveyEncounter_surveyEncounterId` int(11) UNSIGNED NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `unitCode` varchar(11) CHARACTER SET utf8 NOT NULL,
  `unitName` varchar(200) NOT NULL,
  `programId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`departmentId`);

--
-- Indexes for table `encounter`
--
ALTER TABLE `encounter`
  ADD PRIMARY KEY (`surveyEncounterId`),
  ADD KEY `departmentId` (`departmentId`),
  ADD KEY `programId` (`programId`),
  ADD KEY `unitCode` (`unitCode`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`programId`),
  ADD KEY `departmentId` (`departmentId`);

--
-- Indexes for table `studentresponse`
--
ALTER TABLE `studentresponse`
  ADD PRIMARY KEY (`surveyResponseId`),
  ADD KEY `surveyEncounter_surveyResponse` (`surveyEncounter_surveyEncounterId`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`unitCode`),
  ADD KEY `programId` (`programId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `encounter`
--
ALTER TABLE `encounter`
  MODIFY `surveyEncounterId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `studentresponse`
--
ALTER TABLE `studentresponse`
  MODIFY `surveyResponseId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `encounter`
--
ALTER TABLE `encounter`
  ADD CONSTRAINT `encounter_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`departmentId`),
  ADD CONSTRAINT `encounter_ibfk_2` FOREIGN KEY (`programId`) REFERENCES `programs` (`programId`),
  ADD CONSTRAINT `encounter_ibfk_3` FOREIGN KEY (`unitCode`) REFERENCES `units` (`unitCode`),
  ADD CONSTRAINT `encounter_ibfk_4` FOREIGN KEY (`unitCode`) REFERENCES `units` (`unitCode`);

--
-- Constraints for table `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`departmentId`);

--
-- Constraints for table `studentresponse`
--
ALTER TABLE `studentresponse`
  ADD CONSTRAINT `surveyEncounter_surveyResponse` FOREIGN KEY (`surveyEncounter_surveyEncounterId`) REFERENCES `encounter` (`surveyEncounterId`) ON UPDATE CASCADE;

--
-- Constraints for table `units`
--
ALTER TABLE `units`
  ADD CONSTRAINT `units_ibfk_1` FOREIGN KEY (`programId`) REFERENCES `programs` (`programId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
