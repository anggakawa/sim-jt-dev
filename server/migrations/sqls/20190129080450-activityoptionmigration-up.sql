CREATE TABLE `option_value` (
  `option_value_id` int(11) NOT NULL AUTO_INCREMENT,
  `value_description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`option_value_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='value for determine next activity';