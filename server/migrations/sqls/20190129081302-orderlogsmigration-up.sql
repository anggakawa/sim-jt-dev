CREATE TABLE `order_logs` (
  `order_logs_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(100) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `information` text,
  `status` tinyint(1) DEFAULT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`order_logs_id`),
  KEY `order_logs_order_FK` (`order_id`),
  KEY `order_logs_activity_FK` (`activity_id`),
  CONSTRAINT `order_logs_activity_FK` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`),
  CONSTRAINT `order_logs_order_FK` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;