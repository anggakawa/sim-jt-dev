CREATE TABLE `task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_logs_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `task_users_FK` (`user_id`),
  KEY `task_order_logs_FK` (`order_logs_id`),
  KEY `task_activity_FK` (`activity_id`),
  CONSTRAINT `task_activity_FK` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`),
  CONSTRAINT `task_order_logs_FK` FOREIGN KEY (`order_logs_id`) REFERENCES `order_logs` (`order_logs_id`),
  CONSTRAINT `task_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;