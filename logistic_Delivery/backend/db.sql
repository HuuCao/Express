-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: 103.145.63.40    Database: logistic
-- ------------------------------------------------------
-- Server version	5.7.34-0ubuntu0.18.04.1

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
-- Table structure for table `bags`
--

DROP TABLE IF EXISTS `bags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bags` (
  `idbags` int(11) NOT NULL AUTO_INCREMENT,
  `shipment_id` int(11) NOT NULL,
  `bag_code` varchar(45) NOT NULL,
  PRIMARY KEY (`idbags`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bags`
--

LOCK TABLES `bags` WRITE;
/*!40000 ALTER TABLE `bags` DISABLE KEYS */;
INSERT INTO `bags` VALUES (79,210,'Bag01');
/*!40000 ALTER TABLE `bags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `en_name` text NOT NULL,
  `ori_name` text,
  `vi_name` text,
  `other_name` text,
  `en_address` text NOT NULL,
  `ori_address` text,
  `vi_address` text,
  `tel` varchar(64) DEFAULT NULL,
  `exp_code` varchar(64) DEFAULT NULL,
  `tax_code` varchar(64) DEFAULT NULL,
  `company_code` varchar(64) NOT NULL COMMENT 'mã công ty, thường là 3 chữ cái ví dụ: ABC, DNT, ...',
  `cell_phone` varchar(64) DEFAULT NULL,
  `representative` text COMMENT 'người đại diện',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'ngày add vào db',
  `type` enum('Agency','ShipperCompany') NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (29,'Safe Cargo','Safe Cargo','Safe Cargo','Safe Cargo','Gò Vấp','Gò Vấp','Gò Vấp','0987545105','123','321','222','0123456789','2112','2021-05-26 15:50:09','ShipperCompany',1),(30,'SGL','SGL','SGL','SGL','Sài Gòn','Sài Gòn','Sài Gòn','0123456789','20000','2000','111','0987545105','01234','2021-05-26 15:50:34','ShipperCompany',1),(31,'Van Chuyen Da Nang','Van Chuyen Da Nang','Van Chuyen Da Nang','Van Chuyen Da Nang','Da Nang','Da Nang','Da Nang','123','123','123','123','123','23','2021-05-26 15:51:04','ShipperCompany',1);
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_customer`
--

DROP TABLE IF EXISTS `company_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_company_customer_1_idx` (`company_id`),
  KEY `fk_company_customer_2_idx` (`customer_id`),
  CONSTRAINT `fk_company_customer_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `fk_company_customer_2` FOREIGN KEY (`customer_id`) REFERENCES `customer_receiver` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_customer`
--

LOCK TABLES `company_customer` WRITE;
/*!40000 ALTER TABLE `company_customer` DISABLE KEYS */;
INSERT INTO `company_customer` VALUES (30,30,37,'2021-05-27 03:56:15');
/*!40000 ALTER TABLE `company_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignee`
--

DROP TABLE IF EXISTS `consignee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ccne_name` varchar(45) DEFAULT NULL,
  `ccne_address` varchar(45) DEFAULT NULL,
  `ccne_phone` varchar(45) DEFAULT NULL,
  `ccne_email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignee`
--

LOCK TABLES `consignee` WRITE;
/*!40000 ALTER TABLE `consignee` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_receiver`
--

DROP TABLE IF EXISTS `customer_receiver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_receiver` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(45) NOT NULL,
  `name` tinytext NOT NULL,
  `address` tinytext NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_receiver`
--

LOCK TABLES `customer_receiver` WRITE;
/*!40000 ALTER TABLE `customer_receiver` DISABLE KEYS */;
INSERT INTO `customer_receiver` VALUES (37,'012345678','Mr Thiện','Ngoại Giao Đoàn, Bắc Từ Liêm, Hà Nội',NULL,NULL);
/*!40000 ALTER TABLE `customer_receiver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `effort_prices`
--

DROP TABLE IF EXISTS `effort_prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `effort_prices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cost_per_kg` float NOT NULL,
  `company_id` int(11) NOT NULL,
  `modified_at` datetime DEFAULT NULL,
  `type_cal` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_effort_prices_1_idx` (`company_id`),
  CONSTRAINT `fk_effort_prices_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COMMENT='bảng giá tiền ứng với mỗi khách. tiền công tính trên đơn vị kg tuy nhiên giá tiền cho mỗi kilogram với mỗi khách có thể khác nhau';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `effort_prices`
--

LOCK TABLES `effort_prices` WRITE;
/*!40000 ALTER TABLE `effort_prices` DISABLE KEYS */;
INSERT INTO `effort_prices` VALUES (11,123,29,'2021-05-26 15:50:09',123),(12,123123,30,'2021-05-26 15:50:34',21323),(13,123,31,'2021-05-26 15:51:04',123);
/*!40000 ALTER TABLE `effort_prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fee`
--

DROP TABLE IF EXISTS `fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL COMMENT 'user này là user khách hàng',
  `discount` float DEFAULT '0' COMMENT 'số tiền được giảm giá',
  `cod` float NOT NULL COMMENT 'tiền được trả',
  `cost` float NOT NULL COMMENT 'tiền phải thanh toán (tiền công)',
  `note` tinytext,
  `package_id` int(11) NOT NULL,
  `is_paid_done` tinyint(1) NOT NULL COMMENT 'đã thanh toán công chưa?',
  `paid_date` datetime DEFAULT NULL,
  `is_refund_done` tinyint(1) NOT NULL COMMENT 'đã được thanh toán tiền thu hộ chưa',
  `refund_date` datetime DEFAULT NULL,
  `id_accountant_paid` int(11) DEFAULT NULL COMMENT 'kế toán viên thu tiền công của khách',
  `id_accountant_refund` int(11) DEFAULT NULL COMMENT 'kế toán viên trả tiền thu hộ cho khách',
  PRIMARY KEY (`id`,`package_id`),
  KEY `fk_fee_user1_idx` (`user_id`),
  KEY `fk_fee_packages1_idx` (`package_id`),
  CONSTRAINT `fk_fee_packages1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`),
  CONSTRAINT `fk_fee_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=292 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee`
--

LOCK TABLES `fee` WRITE;
/*!40000 ALTER TABLE `fee` DISABLE KEYS */;
INSERT INTO `fee` VALUES (286,'2021-05-26 17:27:33',3,0,23,53429,NULL,641,0,NULL,0,NULL,NULL,NULL),(287,'2021-05-27 03:06:30',23,0,30000000,900,NULL,642,0,NULL,0,NULL,NULL,NULL),(288,'2021-05-27 03:06:40',23,0,30000000,900,NULL,643,0,NULL,0,NULL,NULL,NULL),(289,'2021-06-10 09:02:22',1,0,1200000,900,NULL,644,0,NULL,0,NULL,NULL,NULL),(290,'2021-06-10 09:05:54',1,0,1200000,900,NULL,645,0,NULL,0,NULL,NULL,NULL),(291,'2021-06-10 09:06:00',1,0,1200000,900,NULL,646,0,NULL,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notify_party`
--

DROP TABLE IF EXISTS `notify_party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notify_party` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `np_name` varchar(45) DEFAULT NULL,
  `np_address` varchar(45) DEFAULT NULL,
  `np_phone` varchar(45) DEFAULT NULL,
  `np_email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notify_party`
--

LOCK TABLES `notify_party` WRITE;
/*!40000 ALTER TABLE `notify_party` DISABLE KEYS */;
/*!40000 ALTER TABLE `notify_party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_status`
--

DROP TABLE IF EXISTS `package_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_code` varchar(64) DEFAULT NULL,
  `status_text` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_status`
--

LOCK TABLES `package_status` WRITE;
/*!40000 ALTER TABLE `package_status` DISABLE KEYS */;
INSERT INTO `package_status` VALUES (1,'200','wait_plane','2021-04-28 08:22:13'),(2,'200','planning','2021-04-28 08:22:13'),(3,'200','at_warehouse','2021-04-28 08:22:13'),(4,'200','shipping','2021-04-28 08:22:13'),(5,'200','shipped','2021-04-28 08:22:13'),(6,'200','not_shipped','2021-04-28 08:22:13'),(7,'200','inventory','2021-04-28 08:22:13'),(8,'200','out_inventory','2021-04-28 08:22:13');
/*!40000 ALTER TABLE `package_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_user`
--

DROP TABLE IF EXISTS `package_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_user` (
  `user_id` int(11) NOT NULL COMMENT 'user ở đây là shipper của kho',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `package_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `cod_done` tinyint(1) NOT NULL COMMENT 'Shipper đã bàn giao tiền COD cho kế toán chưa?',
  `id_accountant_confirm` int(11) DEFAULT NULL,
  `cod_done_datetime` datetime DEFAULT NULL COMMENT 'ngày giờ shipper bàn giao tiền COD cho kế toán',
  `cod_received` float DEFAULT NULL COMMENT 'thực nhận từ khách',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_package_user_user1_idx` (`user_id`),
  KEY `fk_package_user_packages1_idx` (`package_id`),
  CONSTRAINT `fk_package_user_packages1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`),
  CONSTRAINT `fk_package_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_user`
--

LOCK TABLES `package_user` WRITE;
/*!40000 ALTER TABLE `package_user` DISABLE KEYS */;
INSERT INTO `package_user` VALUES (30,'2021-06-10 09:12:54',170,642,1,0,NULL,NULL,NULL),(30,'2021-06-10 09:12:54',171,643,1,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `package_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carton_no` varchar(64) NOT NULL,
  `net` float DEFAULT NULL,
  `gross` float NOT NULL,
  `height` float NOT NULL,
  `width` float NOT NULL,
  `real_weight` float DEFAULT NULL,
  `length` double NOT NULL,
  `pkg_type` enum('Loose carton','Pallet','Wooden crate','Bag') DEFAULT NULL,
  `warning` tinyint(1) DEFAULT NULL COMMENT 'cảnh báo khi trọng lượng không phù hợp với thể tích ',
  `current_status_id` int(11) DEFAULT NULL COMMENT 'trạng thái đơn hàng tại thời điểm hiện tại',
  `note` text,
  `cod` double DEFAULT NULL,
  `volume` float DEFAULT NULL,
  `num_item` int(11) DEFAULT NULL,
  `co_check` tinyint(1) DEFAULT NULL,
  `pcs` int(11) DEFAULT NULL,
  `shipment_id` int(11) NOT NULL,
  `warehouse_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_packages_shipment1_idx` (`shipment_id`),
  KEY `fk_packages_warehouse1_idx` (`warehouse_id`),
  KEY `fk_packages_1_idx` (`bag_id`),
  CONSTRAINT `fk_packages_1` FOREIGN KEY (`bag_id`) REFERENCES `bags` (`idbags`),
  CONSTRAINT `fk_packages_shipment1` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`),
  CONSTRAINT `fk_packages_warehouse1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=647 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
INSERT INTO `packages` VALUES (641,'123',32,2323,23,23,0,23,'Wooden crate',1,NULL,'2323',NULL,0.012,23,1,23,209,NULL,'2021-05-26 17:27:33',NULL),(642,'P01',30,30,30,30,30,30,'Loose carton',1,NULL,'hàng dễ vỡ',NULL,0.027,NULL,1,NULL,210,17,'2021-05-27 03:06:30',NULL),(643,'P02',30,30,30,30,30,30,'Loose carton',1,NULL,'hàng dễ vỡ',NULL,0.027,NULL,1,NULL,210,17,'2021-05-27 03:06:40',NULL),(644,'P1',30,30,30,30,0,30,'Loose carton',1,NULL,'None note',NULL,0.027,4,0,NULL,211,NULL,'2021-06-10 09:02:22',NULL),(645,'P2',30,30,30,30,0,30,'Loose carton',1,NULL,'None note',NULL,0.027,4,0,NULL,211,NULL,'2021-06-10 09:05:54',NULL),(646,'P3',30,30,30,30,0,30,'Loose carton',1,NULL,'None note',NULL,0.027,4,0,NULL,211,NULL,'2021-06-10 09:06:00',NULL);
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(64) NOT NULL,
  `description` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'CREATE_EDIT_SUBADMIN','CREATE_EDIT_SUBADMIN','2021-04-22 07:33:34'),(2,'CREATE_EDIT_USER','create-edit client,managerwarehouse,accounteen,shipper','2021-04-22 07:33:34'),(3,'VIEW_ALL_USERS','view all users','2021-04-22 07:33:34'),(4,'VIEW_ALL_COMPANIES','view all companies','2021-04-22 07:33:34'),(5,'VIEW_ALL_WAREHOUSE','nothing','2021-04-22 07:33:34'),(6,'VIEW_ALL_SHIPMENTS','nothing','2021-04-22 07:33:34'),(7,'CREATE_EDIT_ROLE','nothing','2021-04-22 07:33:34'),(8,'ADD_PERMISSION_ROLE','nothing','2021-04-22 07:33:34'),(9,'VIEW_SHIPMENT_OWNER','nothing','2021-04-22 07:33:34'),(10,'CREATE_EDIT_SHIPMENT','nothing','2021-04-22 07:33:34'),(11,'CREATE_EDIT_PKG','nothing','2021-04-22 07:33:34'),(12,'SUBMIT_SHIPMENT','nothing','2021-04-22 07:33:34'),(13,'APPROVAL_SHIPMENT','nothing','2021-04-22 07:33:34'),(14,'UPDATE_SHIPMENT_WAREHOUSE','nothing','2021-04-22 07:33:34'),(15,'DELETE_PKG_IN_SHIPMENT','nothing','2021-04-22 07:33:34'),(16,'VIEW_COD_CLIENT','nothing','2021-04-22 07:33:34'),(17,'VIEW_EFFORT_PRICE','nothing','2021-04-22 07:33:34'),(18,'CREATE_EDIT_EFFORT_PRICE','nothing','2021-04-22 07:33:34'),(19,'VIEW_ALL_BAGS','nothing','2021-04-22 07:33:34'),(20,'CREATE_EDIT_BAG','nothing','2021-04-22 07:33:34'),(21,'VIEW_CUSTOMER_ONLY','nothing','2021-04-22 07:33:34'),(22,'CREATE_EDIT_CUSTOMER','nothing','2021-04-22 07:33:34'),(23,'VIEW_SHIPMENT_WAREHOUSE','nothing','2021-04-22 07:33:34'),(24,'UPDATE_RW_PKG','nothing','2021-04-22 07:33:34'),(25,'PREPARE_SHIPPING_PKG','nothing','2021-04-22 07:33:34'),(26,'VIEW_SHIPPER_WAREHOUSE','nothing','2021-04-22 07:33:34'),(27,'SEND_PKG_CUSMTOMER','nothing','2021-04-22 07:33:34'),(28,'UPDATE_REASON_RETURN_PKG','nothing','2021-04-22 07:33:34'),(29,'UPDATE_REAL_COD','nothing','2021-04-22 07:33:34'),(30,'VIEW_INVENTORY_WAREHOUSE','nothing','2021-04-22 07:33:34'),(31,'VIEW_SUCCESS_PKG','view pkg got cod success','2021-04-22 07:33:34'),(32,'RESOLVE_PKG','resolve inventory','2021-04-22 07:33:34'),(33,'VIEW_SET_PRICE','VIEW_SET_PRICE','2021-05-06 14:21:29'),(34,'VIEW_PROCESSING_PACKAGE','view package processing','2021-05-06 14:21:29'),(35,'VIEW_DEBIT_NOTE','view debit note','2021-05-06 14:21:29');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pkg_effort`
--

DROP TABLE IF EXISTS `pkg_effort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pkg_effort` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `package_id` int(11) NOT NULL,
  `effort_id` int(11) NOT NULL,
  `modified_at` datetime DEFAULT NULL,
  `update_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pkg_effort_1_idx` (`package_id`),
  KEY `fk_pkg_effort_2_idx` (`effort_id`),
  CONSTRAINT `fk_pkg_effort_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`),
  CONSTRAINT `fk_pkg_effort_2` FOREIGN KEY (`effort_id`) REFERENCES `effort_prices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pkg_effort`
--

LOCK TABLES `pkg_effort` WRITE;
/*!40000 ALTER TABLE `pkg_effort` DISABLE KEYS */;
/*!40000 ALTER TABLE `pkg_effort` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pkg_receiver`
--

DROP TABLE IF EXISTS `pkg_receiver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pkg_receiver` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pkg_id` int(11) NOT NULL,
  `creceiver_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_pkg_receiver_1_idx` (`creceiver_id`),
  KEY `fk_pkg_receiver_2_idx` (`pkg_id`),
  CONSTRAINT `fk_pkg_receiver_1` FOREIGN KEY (`creceiver_id`) REFERENCES `customer_receiver` (`id`),
  CONSTRAINT `fk_pkg_receiver_2` FOREIGN KEY (`pkg_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=347 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pkg_receiver`
--

LOCK TABLES `pkg_receiver` WRITE;
/*!40000 ALTER TABLE `pkg_receiver` DISABLE KEYS */;
INSERT INTO `pkg_receiver` VALUES (342,643,37,'2021-05-27 03:58:16'),(343,642,37,'2021-05-27 03:58:16'),(344,644,37,'2021-06-10 09:07:29'),(345,646,37,'2021-06-10 09:07:29'),(346,645,37,'2021-06-10 09:07:29');
/*!40000 ALTER TABLE `pkg_receiver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pkg_source_link`
--

DROP TABLE IF EXISTS `pkg_source_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pkg_source_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `package_id` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1 là ảnh, 2 là video',
  `link` varchar(256) NOT NULL,
  `isactivate` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_pkg_source_link_1_idx` (`package_id`),
  CONSTRAINT `fk_pkg_source_link_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pkg_source_link`
--

LOCK TABLES `pkg_source_link` WRITE;
/*!40000 ALTER TABLE `pkg_source_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `pkg_source_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reason`
--

DROP TABLE IF EXISTS `reason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reason` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` text NOT NULL COMMENT 'lý do khi KH không nhận hàng',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reason`
--

LOCK TABLES `reason` WRITE;
/*!40000 ALTER TABLE `reason` DISABLE KEYS */;
INSERT INTO `reason` VALUES (1,'Khách không nhận hàng','2021-04-28 15:11:58'),(2,'Hàng hư hỏng, bị vỡ','2021-04-28 15:11:58'),(3,'Hàng chưa hoàn thành','2021-04-28 15:11:58'),(4,'Chi phí dịch vụ dơ dang','2021-04-28 15:11:58'),(5,'Nguyên vật liệu giá rẻ','2021-04-28 15:11:58');
/*!40000 ALTER TABLE `reason` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_permission` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_permission`,`id_role`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_role_permissions_roles1_idx` (`id_role`),
  KEY `fk_role_permissions_permissions1_idx` (`id_permission`),
  CONSTRAINT `fk_role_permissions_permissions1` FOREIGN KEY (`id_permission`) REFERENCES `permissions` (`id`),
  CONSTRAINT `fk_role_permissions_roles1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(7,7,1),(8,8,1),(9,9,1),(10,10,1),(11,11,1),(12,12,1),(13,13,1),(14,14,1),(15,15,1),(16,16,1),(17,17,1),(18,18,1),(19,19,1),(20,20,1),(21,21,1),(22,22,1),(23,23,1),(24,24,1),(25,25,1),(26,26,1),(27,27,1),(28,28,1),(29,29,1),(30,30,1),(31,31,1),(32,2,2),(33,3,2),(34,4,2),(35,5,2),(36,6,2),(37,7,2),(38,8,2),(39,9,2),(40,10,2),(41,11,2),(42,12,2),(43,13,2),(44,14,2),(45,15,2),(46,16,2),(47,17,2),(48,18,2),(49,19,2),(50,20,2),(51,21,2),(52,22,2),(53,23,2),(54,24,2),(55,25,2),(56,26,2),(57,27,2),(58,28,2),(59,29,2),(60,30,2),(61,31,2),(62,23,4),(63,24,4),(64,25,4),(65,26,4),(66,27,4),(67,28,4),(68,29,4),(69,30,4),(70,31,4),(71,30,5),(72,31,5),(73,27,6),(74,9,3),(75,10,3),(76,11,3),(77,12,3),(78,16,3),(79,17,3),(80,18,3),(81,19,3),(82,20,3),(83,21,3),(84,22,3),(85,24,5),(86,25,5),(87,26,5),(88,27,5),(89,28,5),(90,29,5),(91,30,5),(92,31,5),(93,32,1),(94,32,2),(95,32,4),(96,32,5),(97,33,1),(98,33,4),(99,33,2),(100,6,4),(101,6,5),(102,34,3),(103,35,3),(104,34,1),(105,34,2),(106,35,1),(107,35,2),(108,35,4);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','2021-04-22 07:33:34',NULL),(2,'subAdmin','2021-04-22 07:33:34',NULL),(3,'client','2021-04-22 07:33:34',NULL),(4,'accounteen','2021-04-22 07:33:34',NULL),(5,'warehouse_manager','2021-04-22 07:33:34',NULL),(6,'shipper','2021-04-22 07:33:34',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(64) NOT NULL,
  `invoice_type` enum('commercial','noncommercial') NOT NULL DEFAULT 'noncommercial',
  `shipping_date` datetime NOT NULL,
  `flight_no` varchar(64) DEFAULT NULL,
  `shipping_from` varchar(64) DEFAULT NULL,
  `shipping_to` varchar(64) DEFAULT NULL,
  `term_payment` enum('T/T','Non-Commercial') NOT NULL,
  `bl_description` tinytext,
  `shipped_per` varchar(256) DEFAULT NULL,
  `remarks` varchar(256) DEFAULT NULL,
  `state` enum('creating','closed','wait_confirm','confirming','confirmed','shipped','preparing') NOT NULL DEFAULT 'creating',
  `user_id` int(11) NOT NULL,
  `warehouse_id` int(11) DEFAULT NULL,
  `cs_id` int(11) DEFAULT NULL,
  `ccne_name` tinytext,
  `ccne_address` tinytext,
  `ccne_phone` tinytext,
  `ccne_email` tinytext,
  `np_name` tinytext,
  `np_address` tinytext,
  `np_phone` tinytext,
  `np_email` tinytext,
  `shipper_name` tinytext,
  `shipper_address` tinytext,
  `shipper_phone` tinytext,
  `shipper_corporate_number` tinytext,
  `shipper_consignee_standard` tinytext,
  `processed_date` datetime DEFAULT NULL,
  `cs_processed_name` varchar(256) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `mawb` varchar(32) DEFAULT NULL,
  `id_company` int(11) DEFAULT NULL,
  `at_warehouse` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_no_UNIQUE` (`invoice_no`),
  KEY `fk_shipment_user1_idx` (`user_id`),
  KEY `fk_shipment_1_idx` (`warehouse_id`),
  KEY `shipment_ibfk_5` (`id_company`),
  CONSTRAINT `fk_shipment_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`),
  CONSTRAINT `shipment_ibfk_5` FOREIGN KEY (`id_company`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (209,'DEV123-1','commercial','2021-05-27 12:12:50',NULL,'AAH','AAH','T/T','123','24242','12','creating',3,17,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-05-26 17:12:50','123',29,0),(210,'DEV123-2','noncommercial','2021-05-27 09:57:42',NULL,'AAH','AAR','Non-Commercial','Aircaft','EW','AAA','closed',23,17,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-05-27 02:57:42','131-5413543432',30,1),(211,'DEV123-3','noncommercial','2021-06-09 21:01:41',NULL,'LCG','AAL','Non-Commercial','a','test','test','wait_confirm',1,17,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-06-10 09:01:40','131-4564654545',29,0);
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipper`
--

DROP TABLE IF EXISTS `shipper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shipper_name` varchar(45) DEFAULT NULL,
  `shipper_address` varchar(45) DEFAULT NULL,
  `shipper_phone` varchar(45) DEFAULT NULL,
  `shipper_corporate_number` varchar(45) DEFAULT NULL,
  `shipper_consignee_standard` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipper`
--

LOCK TABLES `shipper` WRITE;
/*!40000 ALTER TABLE `shipper` DISABLE KEYS */;
INSERT INTO `shipper` VALUES (1,'Nguyễn A','Gò Vấp','123',NULL,NULL),(2,'Nguyễn B','Gò Vấp','123',NULL,NULL),(3,'Nguyễn C','Gò Vấp','123',NULL,NULL);
/*!40000 ALTER TABLE `shipper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(45) DEFAULT NULL,
  `detail` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblpackage`
--

DROP TABLE IF EXISTS `tblpackage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblpackage` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) DEFAULT NULL,
  `weight` varchar(45) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `co_check` tinyint(1) DEFAULT NULL,
  `cod` tinyint(1) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `tag` varchar(45) DEFAULT NULL,
  `status` text,
  `shipping_fee` float DEFAULT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `shipper_id` varchar(45) DEFAULT NULL,
  `shipment_id` int(11) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id_UNIQUE` (`_id`),
  KEY `fk_tblPackage_tblSender_idx` (`sender_id`),
  KEY `fk_tblPackage_tblReceiver1_idx` (`receiver_id`),
  KEY `fk_tblPackage_shipment1_idx` (`shipment_id`),
  CONSTRAINT `fk_tblPackage_shipment1` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`),
  CONSTRAINT `fk_tblPackage_tblReceiver1` FOREIGN KEY (`receiver_id`) REFERENCES `tblreceiver` (`_id`),
  CONSTRAINT `fk_tblPackage_tblSender` FOREIGN KEY (`sender_id`) REFERENCES `tblsender` (`_id`),
  CONSTRAINT `fk_tblPackage_tblStaff1` FOREIGN KEY (`receiver_id`) REFERENCES `tblstaff` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpackage`
--

LOCK TABLES `tblpackage` WRITE;
/*!40000 ALTER TABLE `tblpackage` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblpackage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblreceiver`
--

DROP TABLE IF EXISTS `tblreceiver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblreceiver` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblreceiver`
--

LOCK TABLES `tblreceiver` WRITE;
/*!40000 ALTER TABLE `tblreceiver` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblreceiver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblsender`
--

DROP TABLE IF EXISTS `tblsender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblsender` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `address` varchar(128) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id_UNIQUE` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsender`
--

LOCK TABLES `tblsender` WRITE;
/*!40000 ALTER TABLE `tblsender` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblsender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblstaff`
--

DROP TABLE IF EXISTS `tblstaff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblstaff` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `identity_card` varchar(45) NOT NULL,
  `position` varchar(45) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id_UNIQUE` (`_id`),
  UNIQUE KEY `identity_card_UNIQUE` (`identity_card`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblstaff`
--

LOCK TABLES `tblstaff` WRITE;
/*!40000 ALTER TABLE `tblstaff` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblstaff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracking_package`
--

DROP TABLE IF EXISTS `tracking_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracking_package` (
  `status_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `package_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tracking_package_FK` (`package_id`),
  CONSTRAINT `tracking_package_FK` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=647 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracking_package`
--

LOCK TABLES `tracking_package` WRITE;
/*!40000 ALTER TABLE `tracking_package` DISABLE KEYS */;
INSERT INTO `tracking_package` VALUES (1,'2021-05-26 17:27:33',635,641),(1,'2021-05-27 03:06:30',636,642),(1,'2021-05-27 03:06:40',637,643),(1,'2021-06-10 09:02:22',638,644),(1,'2021-06-10 09:05:54',639,645),(1,'2021-06-10 09:06:00',640,646),(2,'2021-06-10 09:08:01',641,643),(2,'2021-06-10 09:08:01',642,642),(3,'2021-06-10 09:12:33',643,643),(3,'2021-06-10 09:12:33',644,642),(4,'2021-06-10 09:12:54',645,642),(4,'2021-06-10 09:12:54',646,643);
/*!40000 ALTER TABLE `tracking_package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` text NOT NULL,
  `position` text NOT NULL,
  `tel` text NOT NULL,
  `address` text NOT NULL,
  `name` text NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `warehouse_id` int(11) DEFAULT NULL,
  `is_activate` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_user_roles1_idx` (`role_id`),
  KEY `fk_user_companies1_idx` (`company_id`),
  KEY `fk_user_1_idx` (`warehouse_id`),
  CONSTRAINT `fk_user_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`),
  CONSTRAINT `fk_user_companies1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `fk_user_roles1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','caominhhuu2108@gmail.com','Admin','123','Hải Phòng','Anh Quyền',29,1,'2021-05-26 15:50:09',17,1),(3,'cs1','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','anhlong@gmail.com','CS','9824245232','Hà Nội','Anh Long',29,2,'2021-05-26 15:50:09',17,1),(17,'cs2','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','nhu@gmail.com','CS','123422525','Tân Phú','Chánh Nhất',29,2,'2021-05-26 15:50:09',17,1),(18,'wh1','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','anhdinh@gmail.com','Warehouse Manager','242921852','Phan Văn Trị','Anh Anh',29,5,'2021-05-26 15:50:09',17,1),(19,'wh2','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','tam@gmail.com','Warehouse Manager','9285223234','TP HCM','Chị Tâm',29,5,'2021-05-26 15:50:09',17,1),(20,'ac1','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','linh@gmail.com','Accountant','9824251232','Sài Gòn','Chị Linh',30,4,'2021-05-26 15:50:09',17,1),(21,'ac2','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','hoa@gmail.com','Accountant','988252242','Gò Vấp','Chị Hoa',30,4,'2021-05-26 15:50:09',17,1),(22,'client1','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','thuc@gmail.com','Client','3256956489','Gò Vấp','Chị Thúy',30,3,'2021-05-26 15:50:09',17,1),(23,'client2','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','hoa@gmail.com','Client','3256956489','Gò Vấp','Chị Hòa',30,3,'2021-05-26 15:50:09',17,1),(24,'client3','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','huan@gmail.com','Client','3256956489','Gò Vấp','Anh Huấn',30,3,'2021-05-26 15:50:09',17,1),(25,'client4','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','quyen@gmail.com','Client','3256956489','Gò Vấp','Chị QUyên',30,3,'2021-05-26 15:50:09',17,1),(26,'client5','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','tuan@gmail.com','Client','3256956489','Gò Vấp','Anh Tuấn',31,3,'2021-05-26 15:50:09',17,1),(27,'client6','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','huong@gmail.com','Client','3256956489','Gò Vấp','Chị Hường',31,3,'2021-05-26 15:50:09',17,1),(28,'client7','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','bao@gmail.com','Client','3256956489','Gò Vấp','Anh Bảo',31,3,'2021-05-26 15:50:09',17,1),(29,'client8','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','lan@gmail.com','Client','3256956489','Gò Vấp','Chị Lan',31,3,'2021-05-26 15:50:09',17,1),(30,'shipper1','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','luong@gmail.com','Shipper','3256956489','Gò Vấp','Anh Long',31,6,'2021-05-26 15:50:09',17,1),(31,'shipper2','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','duc@gmail.com','Shipper','3256956489','Gò Vấp','Anh Đức',31,6,'2021-05-26 15:50:09',17,1),(32,'shipper3','$2b$10$hpdLVWzFOxAjaqXILNaGP.t2ftUF4dNFjFubXx.zPAXf8U3fiQYly','hung@gmail.com','Shipper','3256956489','Gò Vấp','Anh Hùng',31,6,'2021-05-26 15:50:09',17,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_lock`
--

DROP TABLE IF EXISTS `user_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_lock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`user_id`,`package_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_user_lock_user1_idx` (`user_id`),
  KEY `fk_user_lock_packages1_idx` (`package_id`),
  CONSTRAINT `fk_user_lock_packages1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`),
  CONSTRAINT `fk_user_lock_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_lock`
--

LOCK TABLES `user_lock` WRITE;
/*!40000 ALTER TABLE `user_lock` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(64) NOT NULL,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `capacity` double DEFAULT NULL,
  `description` text,
  `company_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_warehouse_companies1_idx` (`company_id`),
  CONSTRAINT `fk_warehouse_companies1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse`
--

LOCK TABLES `warehouse` WRITE;
/*!40000 ALTER TABLE `warehouse` DISABLE KEYS */;
INSERT INTO `warehouse` VALUES (17,'321','Kho A','Bình Thạnh',123,'123',29,'2021-05-26 16:03:41');
/*!40000 ALTER TABLE `warehouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_customer`
--

DROP TABLE IF EXISTS `warehouse_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_warehouse_customer_1_idx` (`warehouse_id`),
  KEY `fk_warehouse_customer_2_idx` (`company_id`),
  CONSTRAINT `fk_warehouse_customer_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`),
  CONSTRAINT `fk_warehouse_customer_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='bảng thể hiện quan hệ khách hàng của các warehouse';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_customer`
--

LOCK TABLES `warehouse_customer` WRITE;
/*!40000 ALTER TABLE `warehouse_customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_package`
--

DROP TABLE IF EXISTS `warehouse_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_package` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_id` int(11) NOT NULL,
  `package_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status_id` int(11) NOT NULL,
  `reason_id` int(11) DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_warehouse_package_1_idx` (`status_id`),
  KEY `fk_warehouse_package_2_idx` (`reason_id`),
  KEY `fk_warehouse_package_3_idx` (`warehouse_id`),
  KEY `fk_warehouse_package_4_idx` (`package_id`),
  CONSTRAINT `fk_warehouse_package_1` FOREIGN KEY (`status_id`) REFERENCES `package_status` (`id`),
  CONSTRAINT `fk_warehouse_package_2` FOREIGN KEY (`reason_id`) REFERENCES `reason` (`id`),
  CONSTRAINT `fk_warehouse_package_3` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`),
  CONSTRAINT `fk_warehouse_package_4` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=414 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_package`
--

LOCK TABLES `warehouse_package` WRITE;
/*!40000 ALTER TABLE `warehouse_package` DISABLE KEYS */;
INSERT INTO `warehouse_package` VALUES (408,17,641,'2021-05-26 17:27:33',1,NULL,NULL),(409,17,642,'2021-05-27 03:06:30',4,NULL,NULL),(410,17,643,'2021-05-27 03:06:40',4,NULL,NULL),(411,17,644,'2021-06-10 09:02:22',1,NULL,NULL),(412,17,645,'2021-06-10 09:05:54',1,NULL,NULL),(413,17,646,'2021-06-10 09:06:00',1,NULL,NULL);
/*!40000 ALTER TABLE `warehouse_package` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-19  0:52:49
