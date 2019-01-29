CREATE TABLE `order_attachment` (
  `order_attachment_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_logs_id` int(11) NOT NULL,
  `path` varchar(100) NOT NULL,
  PRIMARY KEY (`order_attachment_id`),
  KEY `order_attachment_order_logs_FK` (`order_logs_id`),
  CONSTRAINT `order_attachment_order_logs_FK` FOREIGN KEY (`order_logs_id`) REFERENCES `order_logs` (`order_logs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;