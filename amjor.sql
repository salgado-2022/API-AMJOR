-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-08-2023 a las 07:53:38
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `amjor`
--
CREATE DATABASE IF NOT EXISTS `amjor` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `amjor`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ancheta`
--

CREATE TABLE `ancheta` (
  `ID_Ancheta` int(11) NOT NULL,
  `NombreAncheta` varchar(50) NOT NULL,
  `Descripcion` text NOT NULL,
  `PrecioUnitario` int(11) NOT NULL,
  `ID_Estado` int(11) NOT NULL DEFAULT 1,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ancheta`
--

INSERT INTO `ancheta` (`ID_Ancheta`, `NombreAncheta`, `Descripcion`, `PrecioUnitario`, `ID_Estado`, `image`) VALUES
(1, 'Ancheta de cumpleaños', 'Esta es la primer ancheta creada. Es la de cumpleaños. Hola', 368073, 1, 'image_1686871781783.jpg'),
(2, 'Ancheta de día de la madre', 'Primer ancheta de día de la madre | ANCHETA DE PRUEBA', 74084, 1, 'image_1687545273222.jpg'),
(3, 'Ancheta de día del padre', 'Esta es una ancheta del día del padre. | ANCHETA DE PRUEBA', 163096, 1, 'image_1687551751906.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `ID_Cliente` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `Documento` int(10) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Telefono` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `ID_Estado` int(11) NOT NULL,
  `NombreEstado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`ID_Estado`, `NombreEstado`) VALUES
(1, 'Disponible'),
(2, 'Agotado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumo`
--

CREATE TABLE `insumo` (
  `ID_Insumo` int(11) NOT NULL,
  `NombreInsumo` varchar(50) NOT NULL,
  `Descripcion` text NOT NULL,
  `PrecioUnitario` int(11) NOT NULL,
  `ID_Estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `insumo`
--

INSERT INTO `insumo` (`ID_Insumo`, `NombreInsumo`, `Descripcion`, `PrecioUnitario`, `ID_Estado`) VALUES
(1, 'Caja de galletas gourmet', 'Unidades', 33482, 1),
(2, 'Productos de aseo personal', 'Unidades', 23606, 1),
(3, 'Camiseta con mensaje especial', 'Paquete de 10', 21890, 1),
(4, 'Tarjeta de felicitación', 'Tamaño mediano', 48070, 1),
(5, 'Botella de vino premium', 'Unidades', 4124, 1),
(6, 'Botella de vino premium', 'Unidades', 8765, 1),
(7, 'Productos de aseo personal', 'Paquete de 10', 35722, 1),
(8, 'Productos de cuidado personal de lujo', 'Unidades', 42048, 1),
(9, 'Snacks salados', 'Unidades', 36021, 1),
(10, 'Botella de vino', 'Unidades', 49675, 1),
(11, 'Botella de vino', 'Unidades', 19065, 1),
(12, 'Productos de aseo personal', 'Unidades', 11589, 1),
(13, 'Torta pequeña', 'Incluye sobre y mensaje', 24514, 1),
(14, 'Taza personalizada', '750 ml', 39117, 1),
(15, 'Caja de galletas gourmet', 'Paquete de 10', 41297, 1),
(16, 'Torta pequeña', 'Unidades', 31720, 1),
(17, 'Flores o plantas pequeñas', 'Tamaño mediano', 12719, 1),
(18, 'Caja de galletas gourmet', 'Unidades', 35077, 1),
(19, 'Globos decorativos', 'Unidades', 6058, 1),
(20, 'Flores o plantas pequeñas', 'Unidades', 25514, 1),
(21, 'Accesorios deportivos', 'Unidades', 40909, 1),
(22, 'Torta pequeña', 'Unidades', 18494, 1),
(23, 'Botella de vino', 'Unidades', 43052, 1),
(24, 'Snacks salados', 'Incluye sobre y mensaje', 27325, 1),
(25, 'Snacks salados', 'Unidades', 44897, 1),
(26, 'Chocolates especiales', '750 ml', 45540, 1),
(27, 'Flores o plantas pequeñas', 'Unidades', 15903, 1),
(28, 'Cervezas artesanales', 'Unidades', 42350, 1),
(29, 'Flores o plantas pequeñas', 'Paquete de 10', 8012, 1),
(30, 'Botella de vino premium', 'Unidades', 49006, 1),
(31, 'Botella de vino premium', 'Tamaño mediano', 3334, 1),
(32, 'Botella de vino premium', 'Incluye sobre y mensaje', 10562, 1),
(33, 'Chocolates especiales', 'Incluye sobre y mensaje', 39421, 1),
(34, 'Globos decorativos', 'Tamaño mediano', 13630, 1),
(35, 'Velas aromáticas', 'Unidades', 26631, 1),
(36, 'Globos decorativos', 'Unidades', 46894, 1),
(37, 'Chocolates', 'Incluye sobre y mensaje', 30214, 1),
(38, 'Velas de cumpleaños', 'Unidades', 45703, 1),
(39, 'Sombrero de fiesta', 'Unidades', 48956, 1),
(40, 'Velas aromáticas', 'Paquete de 10', 43674, 1),
(41, 'Libro de regalo', 'Unidades', 38485, 1),
(42, 'Herramientas', 'Unidades', 49110, 1),
(43, 'Torta pequeña', 'Unidades', 4907, 1),
(44, 'Caja de galletas gourmet', 'Unidades', 36711, 1),
(45, 'Chocolates especiales', 'Unidades', 3251, 1),
(46, 'Camiseta con mensaje especial', 'Paquete de 10', 34409, 1),
(47, 'Flores o plantas pequeñas', 'Paquete de 10', 17726, 1),
(48, 'Botella de vino', 'Tamaño mediano', 16651, 1),
(49, 'Taza personalizada', 'Unidades', 21231, 1),
(50, 'Tarjeta de felicitación', 'Unidades', 2892, 1),
(51, 'Velas de cumpleaños', 'Unidades', 47720, 1),
(52, 'Botella de vino', '750 ml', 40447, 1),
(53, 'Velas aromáticas', 'Unidades', 24740, 1),
(54, 'Herramientas', 'Unidades', 42001, 1),
(55, 'Productos de aseo personal', 'Unidades', 17126, 1),
(56, 'Tarjeta de felicitación', 'Paquete de 10', 43241, 1),
(57, 'Torta pequeña', 'Incluye sobre y mensaje', 14136, 1),
(58, 'Chocolates especiales', '750 ml', 2697, 1),
(59, 'Herramientas', '750 ml', 3701, 1),
(60, 'Chocolates', 'Paquete de 10', 10981, 1),
(61, 'Sombrero de fiesta', 'Unidades', 44601, 1),
(62, 'Snacks salados', 'Unidades', 1079, 1),
(63, 'Peluche', 'Tamaño mediano', 34499, 1),
(64, 'Caja de galletas gourmet', 'Unidades', 45582, 1),
(65, 'Productos de aseo personal', 'Tamaño mediano', 12893, 1),
(66, 'Productos de cuidado personal de lujo', 'Incluye sobre y mensaje', 29985, 1),
(67, 'Sombrero de fiesta', 'Paquete de 10', 27170, 1),
(68, 'Globos decorativos', 'Tamaño mediano', 31484, 1),
(69, 'Chocolates', 'Paquete de 10', 49344, 1),
(70, 'Peluche', 'Tamaño mediano', 46575, 1),
(71, 'Velas de cumpleaños', 'Unidades', 34339, 1),
(72, 'Cervezas artesanales', 'Unidades', 35992, 1),
(73, 'Cervezas artesanales', 'Tamaño mediano', 33494, 1),
(74, 'Caja de galletas gourmet', 'Unidades', 11734, 1),
(75, 'Accesorios deportivos', 'Incluye sobre y mensaje', 47912, 1),
(76, 'Sombrero de fiesta', 'Paquete de 10', 5590, 1),
(77, 'Sombrero de fiesta', 'Tamaño mediano', 10486, 1),
(78, 'Torta pequeña', 'Incluye sobre y mensaje', 25243, 1),
(79, 'Velas de cumpleaños', 'Incluye sobre y mensaje', 16127, 1),
(80, 'Tarjeta de felicitación', 'Unidades', 4648, 1),
(81, 'Herramientas', 'Unidades', 1072, 1),
(82, 'Botella de vino', 'Tamaño mediano', 23513, 1),
(83, 'Productos de aseo personal', 'Paquete de 10', 33842, 1),
(84, 'Peluche', 'Unidades', 28527, 1),
(85, 'Productos de aseo personal', 'Tamaño mediano', 10473, 1),
(86, 'Herramientas', 'Unidades', 15702, 1),
(87, 'Snacks salados', '750 ml', 4798, 1),
(88, 'Velas aromáticas', 'Paquete de 10', 46950, 1),
(89, 'Peluche', 'Unidades', 27955, 1),
(90, 'Taza personalizada', '750 ml', 6692, 1),
(91, 'Libro de regalo', '750 ml', 44813, 1),
(92, 'Velas aromáticas', 'Unidades', 17168, 1),
(93, 'Herramientas', 'Unidades', 30159, 1),
(94, 'Peluche', 'Unidades', 38181, 1),
(95, 'Velas de cumpleaños', 'Paquete de 10', 48157, 1),
(96, 'Flores o plantas pequeñas', '750 ml', 5084, 1),
(97, 'Libro de regalo', 'Unidades', 32555, 1),
(98, 'Peluche', 'Unidades', 20782, 1),
(99, 'Chocolates especiales', 'Unidades', 13189, 1),
(100, 'Cervezas artesanales', 'Tamaño mediano', 9947, 1),
(101, 'Tarjeta de felicitación', 'Tamaño mediano', 5288, 1),
(102, 'Sombrero de fiesta', 'Unidades', 23639, 1),
(103, 'Flores o plantas pequeñas', 'Incluye sobre y mensaje', 27222, 1),
(104, 'Flores o plantas pequeñas', 'Unidades', 28343, 1),
(105, 'Chocolates', '750 ml', 14274, 1),
(106, 'Caja de galletas gourmet', 'Unidades', 32805, 1),
(107, 'Velas aromáticas', 'Unidades', 4834, 1),
(108, 'Taza personalizada', 'Unidades', 15193, 1),
(109, 'Productos de aseo personal', 'Unidades', 23158, 1),
(110, 'Velas de cumpleaños', '750 ml', 4006, 1),
(111, 'Velas aromáticas', 'Unidades', 40524, 1),
(112, 'Chocolates', 'Unidades', 34016, 1),
(113, 'Tarjeta de felicitación', '750 ml', 7582, 1),
(114, 'Flores o plantas pequeñas', 'Unidades', 29546, 1),
(115, 'Productos de aseo personal', 'Unidades', 31515, 1),
(116, 'Caja de galletas gourmet', 'Tamaño mediano', 45516, 1),
(117, 'Libro de regalo', 'Paquete de 10', 15030, 1),
(118, 'Productos de cuidado personal de lujo', 'Incluye sobre y mensaje', 30775, 1),
(119, 'Peluche', 'Unidades', 33260, 1),
(120, 'Velas de cumpleaños', 'Unidades', 19042, 1),
(121, 'Snacks salados', 'Paquete de 10', 29465, 1),
(122, 'Camiseta con mensaje especial', 'Incluye sobre y mensaje', 22813, 1),
(123, 'Velas aromáticas', 'Incluye sobre y mensaje', 27277, 1),
(124, 'Sombrero de fiesta', 'Unidades', 31514, 1),
(125, 'Globos decorativos', 'Unidades', 39020, 1),
(126, 'Accesorios deportivos', '750 ml', 34591, 1),
(127, 'Botella de vino', 'Paquete de 10', 26767, 1),
(128, 'Sombrero de fiesta', 'Paquete de 10', 6803, 1),
(129, 'Chocolates especiales', '750 ml', 24041, 1),
(130, 'Sombrero de fiesta', 'Paquete de 10', 18958, 1),
(131, 'Snacks salados', '750 ml', 3165, 1),
(132, 'Productos de cuidado personal de lujo', 'Unidades', 18166, 1),
(133, 'Cervezas artesanales', 'Paquete de 10', 4167, 1),
(134, 'Botella de vino premium', 'Unidades', 39280, 1),
(135, 'Caja de galletas gourmet', 'Tamaño mediano', 13948, 1),
(136, 'Snacks salados', 'Unidades', 16667, 1),
(137, 'Cervezas artesanales', 'Unidades', 34105, 1),
(138, 'Chocolates especiales', '750 ml', 13907, 1),
(139, 'Caja de galletas gourmet', '750 ml', 34555, 1),
(140, 'Peluche', 'Unidades', 48355, 1),
(141, 'Botella de vino premium', 'Unidades', 24948, 1),
(142, 'Accesorios deportivos', 'Unidades', 29640, 1),
(143, 'Caja de galletas gourmet', 'Unidades', 16570, 1),
(144, 'Taza personalizada', 'Paquete de 10', 5507, 1),
(145, 'Velas aromáticas', 'Unidades', 27042, 1),
(146, 'Tarjeta de felicitación', 'Unidades', 39792, 1),
(147, 'Flores o plantas pequeñas', 'Unidades', 42268, 1),
(148, 'Torta pequeña', 'Unidades', 11396, 1),
(149, 'Peluche', 'Unidades', 37995, 1),
(150, 'Peluche', 'Unidades', 35106, 1),
(151, 'Chocolates especiales', 'Unidades', 45299, 1),
(152, 'Snacks salados', 'Incluye sobre y mensaje', 28511, 1),
(153, 'Sombrero de fiesta', 'Unidades', 38376, 1),
(154, 'Flores o plantas pequeñas', 'Unidades', 18317, 1),
(155, 'Flores o plantas pequeñas', 'Unidades', 1101, 1),
(156, 'Tarjeta de felicitación', 'Tamaño mediano', 6518, 1),
(157, 'Botella de vino premium', '750 ml', 34184, 1),
(158, 'Sombrero de fiesta', 'Tamaño mediano', 41064, 1),
(159, 'Torta pequeña', 'Unidades', 5672, 1),
(160, 'Sombrero de fiesta', 'Unidades', 11235, 1),
(161, 'Torta pequeña', 'Incluye sobre y mensaje', 21444, 1),
(162, 'Libro de regalo', '750 ml', 18812, 1),
(163, 'Torta pequeña', 'Unidades', 9525, 1),
(164, 'Torta pequeña', 'Paquete de 10', 44025, 1),
(165, 'Globos decorativos', 'Unidades', 22594, 1),
(166, 'Snacks salados', 'Paquete de 10', 42495, 1),
(167, 'Tarjeta de felicitación', '750 ml', 16909, 1),
(168, 'Taza personalizada', '750 ml', 38931, 1),
(169, 'Productos de aseo personal', 'Paquete de 10', 43953, 1),
(170, 'Productos de cuidado personal de lujo', '750 ml', 19225, 1),
(171, 'Tarjeta de felicitación', '750 ml', 25358, 1),
(172, 'Cervezas artesanales', 'Paquete de 10', 1343, 1),
(173, 'Globos decorativos', 'Unidades', 13869, 1),
(174, 'Botella de vino premium', 'Unidades', 30129, 1),
(175, 'Caja de galletas gourmet', 'Paquete de 10', 39639, 1),
(176, 'Chocolates', 'Unidades', 30220, 1),
(177, 'Camiseta con mensaje especial', 'Unidades', 29910, 1),
(178, 'Sombrero de fiesta', 'Unidades', 41967, 1),
(179, 'Botella de vino premium', 'Unidades', 6387, 1),
(180, 'Globos decorativos', 'Unidades', 21322, 1),
(181, 'Camiseta con mensaje especial', 'Unidades', 31251, 1),
(182, 'Chocolates especiales', 'Unidades', 21117, 1),
(183, 'Torta pequeña', 'Unidades', 13829, 1),
(184, 'Camiseta con mensaje especial', '750 ml', 41565, 1),
(185, 'Chocolates', 'Paquete de 10', 24250, 1),
(186, 'Chocolates especiales', 'Unidades', 36768, 1),
(187, 'Chocolates', 'Unidades', 5390, 1),
(188, 'Globos decorativos', 'Unidades', 20574, 1),
(189, 'Caja de galletas gourmet', 'Paquete de 10', 8262, 1),
(190, 'Chocolates especiales', 'Incluye sobre y mensaje', 12920, 1),
(191, 'Accesorios deportivos', '750 ml', 41675, 1),
(192, 'Accesorios deportivos', 'Tamaño mediano', 44329, 1),
(193, 'Velas aromáticas', 'Tamaño mediano', 38980, 1),
(194, 'Productos de aseo personal', 'Paquete de 10', 34449, 1),
(195, 'Globos decorativos', '750 ml', 17998, 1),
(196, 'Velas aromáticas', '750 ml', 15622, 1),
(197, 'Globos decorativos', 'Unidades', 42388, 1),
(198, 'Chocolates', 'Paquete de 10', 5506, 1),
(199, 'Chocolates', 'Paquete de 10', 46475, 1),
(200, 'Velas aromáticas', 'Unidades', 39293, 1),
(201, 'Velas aromáticas', 'Unidades', 13600, 1),
(202, 'Velas aromáticas', 'Incluye sobre y mensaje', 33694, 1),
(203, 'Velas aromáticas', 'Incluye sobre y mensaje', 38769, 1),
(204, 'Chocolates especiales', 'Paquete de 10', 7533, 1),
(205, 'Snacks salados', 'Tamaño mediano', 16182, 1),
(206, 'Velas de cumpleaños', 'Unidades', 37084, 1),
(207, 'Velas de cumpleaños', 'Unidades', 46827, 1),
(208, 'Camiseta con mensaje especial', 'Unidades', 23972, 1),
(209, 'Globos decorativos', 'Unidades', 7240, 1),
(210, 'Torta pequeña', '750 ml', 4763, 1),
(211, 'Botella de vino', 'Unidades', 39346, 1),
(212, 'Flores o plantas pequeñas', '750 ml', 20716, 1),
(213, 'Cervezas artesanales', 'Paquete de 10', 25755, 1),
(214, 'Flores o plantas pequeñas', '750 ml', 16095, 1),
(215, 'Velas aromáticas', 'Unidades', 4640, 1),
(216, 'Velas de cumpleaños', '750 ml', 21503, 1),
(217, 'Botella de vino', 'Incluye sobre y mensaje', 1508, 1),
(218, 'Tarjeta de felicitación', 'Tamaño mediano', 29919, 1),
(219, 'Camiseta con mensaje especial', 'Incluye sobre y mensaje', 40353, 1),
(220, 'Velas de cumpleaños', 'Unidades', 41765, 1),
(221, 'Accesorios deportivos', 'Tamaño mediano', 37825, 1),
(222, 'Botella de vino', 'Tamaño mediano', 31623, 1),
(223, 'Botella de vino', 'Paquete de 10', 20525, 1),
(224, 'Productos de cuidado personal de lujo', 'Tamaño mediano', 15137, 1),
(225, 'Taza personalizada', 'Paquete de 10', 48205, 1),
(226, 'Velas aromáticas', 'Incluye sobre y mensaje', 46169, 1),
(227, 'Chocolates especiales', 'Unidades', 32153, 1),
(228, 'Accesorios deportivos', '750 ml', 43900, 1),
(229, 'Chocolates', 'Paquete de 10', 19723, 1),
(230, 'Torta pequeña', 'Tamaño mediano', 24036, 1),
(231, 'Velas de cumpleaños', '750 ml', 38845, 1),
(232, 'Botella de vino', '750 ml', 26716, 1),
(233, 'Libro de regalo', 'Paquete de 10', 47385, 1),
(234, 'Peluche', '750 ml', 38697, 1),
(235, 'Chocolates especiales', 'Paquete de 10', 26872, 1),
(236, 'Botella de vino premium', 'Paquete de 10', 18573, 1),
(237, 'Velas de cumpleaños', '750 ml', 15055, 1),
(238, 'Velas aromáticas', 'Unidades', 41647, 1),
(239, 'Herramientas', 'Unidades', 1697, 1),
(240, 'Herramientas', 'Unidades', 35586, 1),
(241, 'Herramientas', 'Tamaño mediano', 10796, 1),
(242, 'Tarjeta de felicitación', 'Unidades', 47672, 1),
(243, 'Accesorios deportivos', 'Unidades', 48097, 1),
(244, 'Flores o plantas pequeñas', 'Unidades', 6676, 1),
(245, 'Taza personalizada', 'Tamaño mediano', 10929, 1),
(246, 'Chocolates especiales', 'Unidades', 37306, 1),
(247, 'Camiseta con mensaje especial', '750 ml', 38621, 1),
(248, 'Herramientas', 'Unidades', 25414, 1),
(249, 'Productos de cuidado personal de lujo', 'Unidades', 7719, 1),
(250, 'Botella de vino premium', 'Unidades', 10087, 1),
(251, 'Botella de vino premium', 'Unidades', 44237, 1),
(252, 'Productos de cuidado personal de lujo', 'Incluye sobre y mensaje', 27684, 1),
(253, 'Chocolates', 'Tamaño mediano', 22776, 1),
(254, 'Snacks salados', 'Paquete de 10', 30266, 1),
(255, 'Sombrero de fiesta', 'Unidades', 25568, 1),
(256, 'Snacks salados', 'Tamaño mediano', 6574, 1),
(257, 'Peluche', '750 ml', 40220, 1),
(258, 'Flores o plantas pequeñas', 'Unidades', 42498, 1),
(259, 'Flores o plantas pequeñas', 'Tamaño mediano', 15645, 1),
(260, 'Velas de cumpleaños', 'Unidades', 46957, 1),
(261, 'Globos decorativos', '750 ml', 47951, 1),
(262, 'Cervezas artesanales', 'Unidades', 49962, 1),
(263, 'Botella de vino premium', 'Unidades', 16045, 1),
(264, 'Peluche', 'Tamaño mediano', 35139, 1),
(265, 'Sombrero de fiesta', 'Unidades', 22530, 1),
(266, 'Velas aromáticas', '750 ml', 31595, 1),
(267, 'Velas de cumpleaños', 'Unidades', 14699, 1),
(268, 'Productos de cuidado personal de lujo', '750 ml', 35626, 1),
(269, 'Globos decorativos', '750 ml', 4641, 1),
(270, 'Caja de galletas gourmet', 'Tamaño mediano', 19151, 1),
(271, 'Flores o plantas pequeñas', 'Unidades', 27666, 1),
(272, 'Flores o plantas pequeñas', 'Unidades', 39702, 1),
(273, 'Tarjeta de felicitación', 'Tamaño mediano', 43703, 1),
(274, 'Cervezas artesanales', '750 ml', 3890, 1),
(275, 'Accesorios deportivos', 'Incluye sobre y mensaje', 19698, 1),
(276, 'Botella de vino premium', 'Unidades', 47005, 1),
(277, 'Libro de regalo', 'Unidades', 30519, 1),
(278, 'Camiseta con mensaje especial', 'Tamaño mediano', 17225, 1),
(279, 'Productos de cuidado personal de lujo', 'Paquete de 10', 25370, 1),
(280, 'Globos decorativos', 'Paquete de 10', 16033, 1),
(281, 'Peluche', 'Unidades', 36995, 1),
(282, 'Caja de galletas gourmet', 'Unidades', 7588, 1),
(283, 'Caja de galletas gourmet', 'Tamaño mediano', 26142, 1),
(284, 'Torta pequeña', 'Unidades', 18601, 1),
(285, 'Productos de aseo personal', 'Unidades', 33761, 1),
(286, 'Flores o plantas pequeñas', 'Unidades', 16157, 1),
(287, 'Botella de vino premium', 'Unidades', 4951, 1),
(288, 'Accesorios deportivos', '750 ml', 7987, 1),
(289, 'Caja de galletas gourmet', '750 ml', 45634, 1),
(290, 'Botella de vino', '750 ml', 47009, 1),
(291, 'Torta pequeña', 'Unidades', 1993, 1),
(292, 'Botella de vino', 'Unidades', 40763, 1),
(293, 'Cervezas artesanales', 'Unidades', 34116, 1),
(294, 'Torta pequeña', 'Tamaño mediano', 2251, 1),
(295, 'Sombrero de fiesta', 'Unidades', 5081, 1),
(296, 'Tarjeta de felicitación', 'Paquete de 10', 9110, 1),
(297, 'Tarjeta de felicitación', 'Incluye sobre y mensaje', 45688, 1),
(298, 'Cervezas artesanales', '750 ml', 47496, 1),
(299, 'Botella de vino premium', 'Unidades', 18456, 1),
(300, 'Libro de regalo', 'Incluye sobre y mensaje', 42968, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos_ancheta`
--

CREATE TABLE `insumos_ancheta` (
  `ID_Insumos_Ancheta` int(11) NOT NULL,
  `ID_Ancheta` int(11) NOT NULL,
  `ID_Insumo` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `insumos_ancheta`
--

INSERT INTO `insumos_ancheta` (`ID_Insumos_Ancheta`, `ID_Ancheta`, `ID_Insumo`, `Cantidad`, `Precio`) VALUES
(1, 1, 1, 4, 133928),
(2, 1, 10, 1, 49675),
(3, 1, 11, 5, 95325),
(4, 1, 13, 1, 24514),
(5, 1, 14, 1, 39117),
(6, 1, 20, 1, 25514),
(7, 2, 3, 1, 21890),
(8, 2, 4, 1, 48070),
(9, 2, 5, 1, 4124),
(10, 3, 12, 1, 11589),
(11, 3, 13, 1, 24514),
(12, 3, 15, 1, 41297),
(13, 3, 10, 1, 49675),
(14, 3, 9, 1, 36021);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `ID_Pedido` int(11) NOT NULL,
  `ID_Cliente` int(11) NOT NULL,
  `Direccion_Entrega` varchar(50) NOT NULL,
  `Feche_Entrega` date NOT NULL,
  `Precio_Total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_ancheta`
--

CREATE TABLE `pedido_ancheta` (
  `ID_PedidoAnch` int(11) NOT NULL,
  `ID_Pedido` int(11) NOT NULL,
  `ID_Ancheta` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_insumos_ancheta`
--

CREATE TABLE `pedido_insumos_ancheta` (
  `ID_PedidoInsumo` int(11) NOT NULL,
  `ID_PedidoAnch` int(11) NOT NULL,
  `ID_Insumo` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `ID_Permiso` int(11) NOT NULL,
  `NombrePermiso` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso_x_rol`
--

CREATE TABLE `permiso_x_rol` (
  `ID_Rol_Permiso` int(11) NOT NULL,
  `ID_Rol` int(11) NOT NULL,
  `ID_Permiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `ID_Rol` int(11) NOT NULL,
  `Nombre_Rol` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`ID_Rol`, `Nombre_Rol`) VALUES
(1, 'Admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `ID_Rol` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `Estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `ID_Rol`, `correo`, `contrasena`, `Estado`) VALUES
(1, 1, 'juanfergamer77@gmail.com', '$2b$10$0sLaergDpPGDd/gi8pvWVeI3CxSHgsFVuwE1vzOmpwyV9vym3Hgs.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `ID_Venta` int(11) NOT NULL,
  `ID_Pedido` int(11) NOT NULL,
  `ID_PedidoAnch` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Direccion_Entrega` varchar(100) NOT NULL,
  `Fecha_Entrega` date NOT NULL,
  `Precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ancheta`
--
ALTER TABLE `ancheta`
  ADD PRIMARY KEY (`ID_Ancheta`),
  ADD KEY `FK_Ancheta_Estado` (`ID_Estado`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID_Cliente`),
  ADD KEY `FK_Cliente_Usuario` (`ID_Usuario`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`ID_Estado`);

--
-- Indices de la tabla `insumo`
--
ALTER TABLE `insumo`
  ADD PRIMARY KEY (`ID_Insumo`),
  ADD KEY `FK_Insumo_Estado` (`ID_Estado`);

--
-- Indices de la tabla `insumos_ancheta`
--
ALTER TABLE `insumos_ancheta`
  ADD PRIMARY KEY (`ID_Insumos_Ancheta`),
  ADD KEY `FK_InsumosAnchetas` (`ID_Ancheta`),
  ADD KEY `FK_InsumosDeAncheta` (`ID_Insumo`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`ID_Pedido`),
  ADD KEY `fk_pedidos_clientes` (`ID_Cliente`);

--
-- Indices de la tabla `pedido_ancheta`
--
ALTER TABLE `pedido_ancheta`
  ADD PRIMARY KEY (`ID_PedidoAnch`),
  ADD KEY `FK_PedidoAnch_Pedido` (`ID_Pedido`),
  ADD KEY `FK_PediAnch_Ancheta` (`ID_Ancheta`);

--
-- Indices de la tabla `pedido_insumos_ancheta`
--
ALTER TABLE `pedido_insumos_ancheta`
  ADD PRIMARY KEY (`ID_PedidoInsumo`),
  ADD KEY `FK_ID_PedidoAnch` (`ID_PedidoAnch`),
  ADD KEY `FK_ID_Insumo` (`ID_Insumo`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`ID_Permiso`),
  ADD UNIQUE KEY `UC_Permiso` (`NombrePermiso`);

--
-- Indices de la tabla `permiso_x_rol`
--
ALTER TABLE `permiso_x_rol`
  ADD PRIMARY KEY (`ID_Rol_Permiso`),
  ADD KEY `FK_ID_Rol` (`ID_Rol`),
  ADD KEY `FK_ID_Permiso` (`ID_Permiso`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`ID_Rol`),
  ADD UNIQUE KEY `UC_Nombre_Rol` (`Nombre_Rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `UC_Correo` (`correo`),
  ADD KEY `FK_Rol_Usuario` (`ID_Rol`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`ID_Venta`),
  ADD KEY `FK_IDPedidoVenta` (`ID_Pedido`),
  ADD KEY `FK_ID_PedidoAnchVenta` (`ID_PedidoAnch`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ancheta`
--
ALTER TABLE `ancheta`
  MODIFY `ID_Ancheta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID_Cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `ID_Estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `insumo`
--
ALTER TABLE `insumo`
  MODIFY `ID_Insumo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=301;

--
-- AUTO_INCREMENT de la tabla `insumos_ancheta`
--
ALTER TABLE `insumos_ancheta`
  MODIFY `ID_Insumos_Ancheta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `ID_Pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido_ancheta`
--
ALTER TABLE `pedido_ancheta`
  MODIFY `ID_PedidoAnch` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido_insumos_ancheta`
--
ALTER TABLE `pedido_insumos_ancheta`
  MODIFY `ID_PedidoInsumo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `ID_Permiso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permiso_x_rol`
--
ALTER TABLE `permiso_x_rol`
  MODIFY `ID_Rol_Permiso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `ID_Rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `ID_Venta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ancheta`
--
ALTER TABLE `ancheta`
  ADD CONSTRAINT `FK_Ancheta_Estado` FOREIGN KEY (`ID_Estado`) REFERENCES `estado` (`ID_Estado`);

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `FK_Cliente_Usuario` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `insumo`
--
ALTER TABLE `insumo`
  ADD CONSTRAINT `FK_Insumo_Estado` FOREIGN KEY (`ID_Estado`) REFERENCES `estado` (`ID_Estado`);

--
-- Filtros para la tabla `insumos_ancheta`
--
ALTER TABLE `insumos_ancheta`
  ADD CONSTRAINT `FK_InsumosAnchetas` FOREIGN KEY (`ID_Ancheta`) REFERENCES `ancheta` (`ID_Ancheta`),
  ADD CONSTRAINT `FK_InsumosDeAncheta` FOREIGN KEY (`ID_Insumo`) REFERENCES `insumo` (`ID_Insumo`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedidos_clientes` FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`);

--
-- Filtros para la tabla `pedido_ancheta`
--
ALTER TABLE `pedido_ancheta`
  ADD CONSTRAINT `FK_PediAnch_Ancheta` FOREIGN KEY (`ID_Ancheta`) REFERENCES `ancheta` (`ID_Ancheta`),
  ADD CONSTRAINT `FK_PedidoAnch_Pedido` FOREIGN KEY (`ID_Pedido`) REFERENCES `pedido` (`ID_Pedido`);

--
-- Filtros para la tabla `pedido_insumos_ancheta`
--
ALTER TABLE `pedido_insumos_ancheta`
  ADD CONSTRAINT `FK_ID_Insumo` FOREIGN KEY (`ID_Insumo`) REFERENCES `insumo` (`ID_Insumo`),
  ADD CONSTRAINT `FK_ID_PedidoAnch` FOREIGN KEY (`ID_PedidoAnch`) REFERENCES `pedido_ancheta` (`ID_PedidoAnch`);

--
-- Filtros para la tabla `permiso_x_rol`
--
ALTER TABLE `permiso_x_rol`
  ADD CONSTRAINT `FK_ID_Permiso` FOREIGN KEY (`ID_Permiso`) REFERENCES `permiso` (`ID_Permiso`),
  ADD CONSTRAINT `FK_ID_Rol` FOREIGN KEY (`ID_Rol`) REFERENCES `rol` (`ID_Rol`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_Rol_Usuario` FOREIGN KEY (`ID_Rol`) REFERENCES `rol` (`ID_Rol`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `FK_IDPedidoVenta` FOREIGN KEY (`ID_Pedido`) REFERENCES `pedido` (`ID_Pedido`),
  ADD CONSTRAINT `FK_ID_PedidoAnchVenta` FOREIGN KEY (`ID_PedidoAnch`) REFERENCES `pedido_ancheta` (`ID_PedidoAnch`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
