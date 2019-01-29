CREATE TABLE `order` (
  `order_id` varchar(100) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customer_name` varchar(100) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `customer_address` varchar(150) NOT NULL,
  `sto_office_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_coordinat_latitude` float NOT NULL,
  `customer_coordinate_longitude` varchar(100) NOT NULL,
  `pic_name` varchar(100) NOT NULL,
  `pic_contact` varchar(100) NOT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `order_users_FK` (`vendor_id`),
  KEY `order_sto_office_FK` (`sto_office_id`),
  CONSTRAINT `order_sto_office_FK` FOREIGN KEY (`sto_office_id`) REFERENCES `sto_office` (`sto_office_id`),
  CONSTRAINT `order_users_FK` FOREIGN KEY (`vendor_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;