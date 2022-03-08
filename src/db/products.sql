-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-03-2022 a las 20:42:51
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `products`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `published` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `published`, `createdAt`, `updatedAt`, `image`) VALUES
(10, 'refrigerador', 'blackline', 0, '2022-03-08 02:02:27', '2022-03-08 02:02:27', 'https://realplaza.vtexassets.com/arquivos/ids/15118763-800-auto?v=637370032424530000&width=800&height=auto&aspect=true'),
(11, 'laptop', 'hp', 0, '2022-03-08 02:02:34', '2022-03-08 02:02:34', 'https://realplaza.vtexassets.com/arquivos/ids/20695732-800-auto?v=637803690377900000&width=800&height=auto&aspect=true'),
(12, 'smart tv', 'lg', 0, '2022-03-08 02:02:43', '2022-03-08 02:02:43', 'https://realplaza.vtexassets.com/arquivos/ids/17579057-800-auto?v=637708585360130000&width=800&height=auto&aspect=true'),
(13, 'tablet', 'apple', 1, '2022-03-08 02:02:53', '2022-03-08 02:02:53', 'https://realplaza.vtexassets.com/arquivos/ids/17543597-800-auto?v=637705336571130000&width=800&height=auto&aspect=true'),
(18, 'monitor', 'lg', 0, '2022-03-08 11:54:57', '2022-03-08 11:54:57', 'https://realplaza.vtexassets.com/arquivos/ids/16583374-800-auto?v=637553883861900000&width=800&height=auto&aspect=true'),
(19, 'cellphone', 'apple', 0, '2022-03-08 12:03:15', '2022-03-08 12:03:15', 'https://realplaza.vtexassets.com/arquivos/ids/17823472-800-auto?v=637733796622230000&width=800&height=auto&aspect=true'),
(20, 'computer', 'generico', 0, '2022-03-08 12:04:45', '2022-03-08 12:04:45', 'https://realplaza.vtexassets.com/arquivos/ids/20485032-800-auto?v=637794202319100000&width=800&height=auto&aspect=true');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
