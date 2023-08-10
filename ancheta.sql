-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-08-2023 a las 07:31:26
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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ancheta`
--
ALTER TABLE `ancheta`
  MODIFY `ID_Ancheta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ancheta`
--
ALTER TABLE `ancheta`
  ADD CONSTRAINT `FK_Ancheta_Estado` FOREIGN KEY (`ID_Estado`) REFERENCES `estado` (`ID_Estado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
