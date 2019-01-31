CREATE TABLE `activity_connections` (
  `activity_connections_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) NOT NULL,
  `activity_next_id` int(11) DEFAULT NULL,
  `activity_alternate_id` int(11) DEFAULT NULL,
  `activity_back_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`activity_connections_id`),
  KEY `activity_connections_activity_FK` (`activity_id`),
  KEY `activity_connections_activity_FK_1` (`activity_next_id`),
  KEY `activity_connections_activity_FK_2` (`activity_alternate_id`),
  KEY `activity_connections_activity_FK_3` (`activity_back_id`),
  CONSTRAINT `activity_connections_activity_FK` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`),
  CONSTRAINT `activity_connections_activity_FK_1` FOREIGN KEY (`activity_next_id`) REFERENCES `activity` (`activity_id`),
  CONSTRAINT `activity_connections_activity_FK_2` FOREIGN KEY (`activity_alternate_id`) REFERENCES `activity` (`activity_id`),
  CONSTRAINT `activity_connections_activity_FK_3` FOREIGN KEY (`activity_back_id`) REFERENCES `activity` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;