-- MySQL dump 10.16  Distrib 10.1.13-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: computing_nps
-- ------------------------------------------------------
-- Server version	10.1.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departments`
--
CREATE DATABASE IF NOT EXISTS `computing_nps`;
USE `computing_nps`;

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departments` (
  `departmentId` int(11) NOT NULL,
  `departmentName` varchar(200) NOT NULL,
  PRIMARY KEY (`departmentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Computer Science'),(2,'Information Technology');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encounter`
--

DROP TABLE IF EXISTS `encounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encounter` (
  `surveyEncounterId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `departmentId` int(11) NOT NULL,
  `programId` int(11) NOT NULL,
  `yearOfStudy` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `unitCode` varchar(11) NOT NULL,
  PRIMARY KEY (`surveyEncounterId`),
  KEY `departmentId` (`departmentId`),
  KEY `programId` (`programId`),
  KEY `unitCode` (`unitCode`),
  CONSTRAINT `encounter_ibfk_4` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`departmentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `encounter_ibfk_5` FOREIGN KEY (`programId`) REFERENCES `programs` (`programId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `encounter_ibfk_6` FOREIGN KEY (`unitCode`) REFERENCES `units` (`unitCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encounter`
--

LOCK TABLES `encounter` WRITE;
/*!40000 ALTER TABLE `encounter` DISABLE KEYS */;
INSERT INTO `encounter` VALUES (1,'2019-03-20',2,21,1,1,'CIT 101'),(2,'2019-03-20',2,21,1,1,'CIT 101'),(3,'2019-03-20',2,21,1,1,'CIT 101'),(4,'2019-03-20',2,21,1,2,'CIT 106'),(5,'2019-03-20',2,22,1,1,'SCT 101'),(6,'2019-03-20',2,22,1,1,'SCT 101'),(7,'2019-03-20',2,22,1,2,'SCT 108'),(8,'2019-03-20',1,12,1,1,'CCT 101'),(9,'2019-03-20',1,12,1,1,'CCT 101'),(10,'2019-03-20',1,11,1,1,'CCS 101'),(11,'2019-03-20',1,11,1,1,'CCS 101'),(12,'2019-03-20',2,21,2,1,'CIT 201'),(13,'2019-03-20',2,21,2,1,'CIT 201');
/*!40000 ALTER TABLE `encounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `programs` (
  `departmentId` int(11) NOT NULL,
  `programId` int(11) NOT NULL,
  `programName` varchar(200) NOT NULL,
  PRIMARY KEY (`programId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (1,11,'BScCs'),(1,12,'BScCT'),(2,21,'BScIT'),(2,22,'BSc ICTM');
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentresponse`
--

DROP TABLE IF EXISTS `studentresponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `studentresponse` (
  `surveyResponseId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `surveyEncounter_surveyEncounterId` int(11) unsigned NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  PRIMARY KEY (`surveyResponseId`),
  KEY `surveyEncounter_surveyResponse` (`surveyEncounter_surveyEncounterId`),
  CONSTRAINT `studentresponse_ibfk_1` FOREIGN KEY (`surveyEncounter_surveyEncounterId`) REFERENCES `encounter` (`surveyEncounterId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentresponse`
--

LOCK TABLES `studentresponse` WRITE;
/*!40000 ALTER TABLE `studentresponse` DISABLE KEYS */;
INSERT INTO `studentresponse` VALUES (1,1,'unit','10'),(2,1,'unit comment','The unit was conducted as per the course outline'),(3,1,'instructor','10'),(4,1,'instructor comment','Average work'),(5,1,'lab','3'),(6,1,'labc','Not perfect'),(7,1,'classroom','10'),(8,1,'classroom comment','wondeful'),(9,1,'school','10'),(10,2,'unit','9'),(11,2,'unit comment','The administration was average'),(12,2,'instructor','10'),(13,2,'instructor comment','great'),(14,2,'lab','9'),(15,2,'labc','Awesome'),(16,2,'classroom','10'),(17,2,'classroom comment','Awesome'),(18,2,'school','10'),(19,3,'unit','10'),(20,3,'unit comment','The unit was conducted as per the course outline'),(21,3,'instructor','10'),(22,3,'instructor comment','Average work'),(23,3,'lab','3'),(24,3,'labc','Not perfect'),(25,3,'classroom','10'),(26,3,'classroom comment','wondeful'),(27,3,'school','10'),(28,4,'unit','10'),(29,4,'unit comment','I was satisfied'),(30,4,'instructor','10'),(31,4,'instructor comment','He observed the course outline'),(32,4,'lab','2'),(33,4,'labc','poor no equipments'),(34,4,'classroom comment','great'),(35,4,'classroom','10'),(36,4,'school','10'),(37,5,'unit','3'),(38,5,'unit comment','Poorly conducted'),(39,5,'instructor','3'),(40,5,'instructor comment','poorly administered'),(41,5,'lab','3'),(42,5,'labc','Not good'),(43,5,'classroom','3'),(44,5,'classroom comment','Facilities are not good'),(45,5,'school','4'),(46,6,'unit','3'),(47,6,'unit comment','Poorly conducted'),(48,6,'instructor','3'),(49,6,'instructor comment','poorly administered'),(50,6,'lab','3'),(51,6,'labc','Not good'),(52,6,'classroom','3'),(53,6,'classroom comment','Facilities are not good'),(54,6,'school','4'),(55,7,'unit','3'),(56,7,'unit comment','I got Nothing'),(57,7,'instructor','2'),(58,7,'instructor comment','Average tutor'),(59,7,'lab','10'),(60,7,'labc','Should be improved'),(61,7,'classroom','10'),(62,7,'classroom comment','Nice'),(63,7,'school','10'),(64,8,'unit comment','Boring'),(65,8,'unit','3'),(66,8,'instructor','3'),(67,8,'instructor comment','boring'),(68,8,'lab','2'),(69,8,'labc','Pathetic'),(70,8,'classroom','3'),(71,8,'classroom comment','Facilities were adequate'),(72,8,'school','10'),(73,9,'unit comment','Boring'),(74,9,'unit','3'),(75,9,'instructor','3'),(76,9,'instructor comment','boring'),(77,9,'lab','2'),(78,9,'labc','Pathetic'),(79,9,'classroom','3'),(80,9,'classroom comment','Facilities were adequate'),(81,9,'school','10'),(82,10,'unit','10'),(83,10,'unit comment','The unit was effectively administered'),(84,10,'instructor','10'),(85,10,'instructor comment','So great'),(86,10,'lab','10'),(87,10,'labc','Average'),(88,10,'classroom','10'),(89,10,'classroom comment','So good'),(90,10,'school','2'),(91,11,'unit','10'),(92,11,'unit comment','The unit was effectively administered'),(93,11,'instructor','10'),(94,11,'instructor comment','So great'),(95,11,'lab','10'),(96,11,'labc','Average'),(97,11,'classroom','10'),(98,11,'classroom comment','So good'),(99,11,'school','2'),(100,12,'unit','10'),(101,12,'unit comment','It was well done'),(102,12,'instructor','10'),(103,12,'instructor comment','Proud of him'),(104,12,'lab','10'),(105,12,'labc','Perfect for me'),(106,12,'classroom','10'),(107,12,'classroom comment','Facilities were available'),(108,12,'school','3'),(109,13,'unit','10'),(110,13,'unit comment','It was well done'),(111,13,'instructor','10'),(112,13,'instructor comment','Proud of him'),(113,13,'lab','10'),(114,13,'labc','Perfect for me'),(115,13,'classroom','10'),(116,13,'classroom comment','Facilities were available'),(117,13,'school','3');
/*!40000 ALTER TABLE `studentresponse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `units` (
  `departmentId` int(11) NOT NULL,
  `programId` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `semester` int(2) NOT NULL,
  `unitCode` varchar(11) CHARACTER SET utf8 NOT NULL,
  `unitName` varchar(200) NOT NULL,
  PRIMARY KEY (`unitCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,11,1,1,'CCS 101','Fundamentals Of Computer System'),(1,11,1,2,'CCS 102','Linear Algebra'),(1,11,2,1,'CCS 201','Object Oriented Programming In Java II'),(1,11,2,2,'CCS 202','Data Structures and Algoriths'),(1,11,3,1,'CCS 301','Principal of Programming Languages'),(1,11,3,2,'CCS 302','Human Computer Interaction'),(1,11,4,1,'CCS 401','Software Project Management'),(1,11,4,2,'CCS 410','Computational Science'),(1,12,1,1,'CCT 101','Fundamentals Of Computing'),(1,12,1,2,'CCT 102','Engineering Math II'),(1,12,2,1,'CCT 201','Object Oriented Programming II'),(1,12,2,2,'CCT 202','Digital Electronics II'),(1,12,3,1,'CCT 301','Computer Architecture I'),(1,12,3,2,'CCT 302','Computer Architecture II'),(1,12,4,2,'CCT 402','Computer Aided Analysis And Design'),(1,12,4,1,'CCT 415','Data Mining'),(2,21,1,1,'CIT 101','Discrete Mathematics'),(2,21,1,2,'CIT 106','Linear Algebra'),(2,21,2,1,'CIT 201','Object Oriented Programming II'),(2,21,2,2,'CIT 202','Computer Aided Design'),(2,21,3,1,'CIT 301','Design And Analysis Of Algorithm'),(2,21,3,2,'CIT 302','Human Computer Interaction'),(2,21,4,1,'CIT 401','Software Project Management'),(2,21,4,2,'CIT 402','Information Technology Project II'),(2,22,1,1,'SCT 101','Business Organisation'),(2,22,1,2,'SCT 108','Data Communication'),(2,22,2,1,'SCT 201','Computer Networks'),(2,22,2,2,'SCT 210','Management Process'),(2,22,3,1,'SCT 301','It Service Support I'),(2,22,3,2,'SCT 312','IT Service Support II'),(2,22,4,1,'SCT 401','Business Management'),(2,22,4,2,'SCT 402','Computer Ethics');
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-21 10:49:43
