CREATE DATABASE  IF NOT EXISTS `feedbook_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `feedbook_db`;
-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: feedbook_db
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `professor_tb`
--

DROP TABLE IF EXISTS `professor_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor_tb` (
  `professor_id` varchar(48) NOT NULL,
  `professor_name` varchar(60) NOT NULL,
  `professor_img_url` varchar(200) DEFAULT NULL,
  `professor_email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`professor_id`),
  UNIQUE KEY `professor_id_UNIQUE` (`professor_id`),
  UNIQUE KEY `professor_name_UNIQUE` (`professor_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subject_tb`
--

DROP TABLE IF EXISTS `subject_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_tb` (
  `subject_id` char(48) NOT NULL,
  `professor_id` varchar(48) NOT NULL,
  `mean_dedication_time` double unsigned DEFAULT '0',
  `mean_material_quality` double unsigned DEFAULT '0',
  `mean_professor_avaliation` double unsigned DEFAULT '0',
  `mean_content_complexity` double unsigned DEFAULT '0',
  `subject_cod` varchar(48) DEFAULT NULL,
  `subject_name` varchar(96) NOT NULL,
  `avaliations_count` int unsigned DEFAULT '0',
  PRIMARY KEY (`subject_id`,`professor_id`),
  UNIQUE KEY `subject_id_UNIQUE` (`subject_id`),
  KEY `fk_subject_tb_1_idx` (`professor_id`),
  CONSTRAINT `fk_subject_tb_1` FOREIGN KEY (`professor_id`) REFERENCES `professor_tb` (`professor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_tb`
--

DROP TABLE IF EXISTS `user_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tb` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) NOT NULL,
  `user_pwd` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-18 23:33:50
