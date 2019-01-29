CREATE TABLE `activity` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(100) NOT NULL,
  `activity_description` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL,
  `require_status` tinyint(1) NOT NULL,
  `require_information` tinyint(1) NOT NULL,
  `require_attachment` tinyint(1) NOT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `activity_roles_FK` (`role_id`),
  CONSTRAINT `activity_roles_FK` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;