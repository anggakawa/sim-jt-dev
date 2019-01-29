CREATE TABLE `activity_options` (
  `activity_options_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) NOT NULL,
  `option_text` varchar(100) NOT NULL,
  `option_value` int(2) NOT NULL,
  `value_description` varchar(100) NOT NULL,
  PRIMARY KEY (`activity_options_id`),
  KEY `activity_options_activity_FK` (`activity_id`),
  CONSTRAINT `activity_options_activity_FK` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;