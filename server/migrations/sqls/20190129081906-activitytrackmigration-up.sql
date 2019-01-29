CREATE TABLE `activity_track` (
  `activity_track_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) NOT NULL,
  `order_id` varchar(100) NOT NULL,
  PRIMARY KEY (`activity_track_id`),
  KEY `activity_track_activity_FK` (`activity_id`),
  KEY `activity_track_order_FK` (`order_id`),
  CONSTRAINT `activity_track_activity_FK` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`),
  CONSTRAINT `activity_track_order_FK` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;