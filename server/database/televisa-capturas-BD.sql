
-- create database

CREATE DATABASE `televisa-capturas-BD`;

-- using the database

USE `televisa-capturas-BD`;

-- creating table users type

DROP TABLE IF EXISTS `tipo_usuario`;

CREATE TABLE `tipo_usuario` (
  `tipo_id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(15) NOT NULL,
  PRIMARY KEY (`tipo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- creating table users

DROP TABLE IF EXISTS `tabla_cuentas`;

CREATE TABLE `tabla_cuentas` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_nombre` varchar(45) NOT NULL,
  `usuario_correo` varchar(45) NOT NULL,
  `usuario_password` varchar(255) NOT NULL,
  `usuario_fecha_creación` datetime NOT NULL,
  `tipo_id` int(11) NOT NULL DEFAULT 2,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `usuario_id_UNIQUE` (`usuario_id`),
  UNIQUE KEY `usuario_correo_UNIQUE` (`usuario_correo`),
  UNIQUE KEY `usuario_nombre_UNIQUE` (`usuario_nombre`),
  KEY `tipo_id_idx` (`tipo_id`),
  CONSTRAINT `tipo_usuario_tipo_id` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_usuario` (`tipo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;