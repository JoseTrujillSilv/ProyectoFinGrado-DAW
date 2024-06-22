<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

$usuario = 'root';//Enter your username of your mysql
$constrasena = '';//Enter your username password of your mysql 
$localhost = 'localhost';//Enter your host of your mysql

$host = $localhost;
$user = $usuario;
$password = $constrasena;

$bbdd = new mysqli($host, $user, $password);

try {
  $result = $bbdd->query("USE tariansBack");
} catch (\Throwable $th) {
  $bbdd->query("CREATE DATABASE tariansBack");

  $bbdd = new mysqli($host, $user, $password, 'tariansBack');

  $bbdd->query("CREATE TABLE `admins` (
      `idCom` int(10) NOT NULL,
      `idUser` int(10) NOT NULL,
      `nombre` varchar(200) DEFAULT NULL,
      `clave` varchar(200) DEFAULT NULL,
      `img` varchar(200) DEFAULT NULL,
      `keyssUser` varchar(200) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");

    $bbdd->query("CREATE TABLE `bloqueados` (
      `idCom` int(10) NOT NULL,
      `idUser` int(10) NOT NULL,
      `idUserBloq` int(10) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    ");


      $bbdd->query("CREATE TABLE `comentarios` (
          `idCom` int(10) NOT NULL,
          `idUser` int(10) NOT NULL,
          `idTarian` int(10) NOT NULL,
          `idComentario` int(10) NOT NULL,
          `txt` varchar(200) DEFAULT NULL,
          `fecha` varchar(19) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");

      $bbdd->query("CREATE TABLE `comunidades` (
          `idCom` int(10) NOT NULL,
          `nombre` varchar(200) DEFAULT NULL,
          `clave` varchar(200) DEFAULT NULL,
          `ruta` varchar(200) DEFAULT NULL,
          `keyss` varchar(100) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");

      $bbdd->query("CREATE TABLE `favoritos` (
          `idCom` int(10) NOT NULL,
          `idUser` int(10) NOT NULL,
          `idTarian` int(10) DEFAULT NULL,
          `idFav` int(10) NOT NULL,
          `text` varchar(500) DEFAULT NULL,
          `img01` varchar(200) DEFAULT NULL,
          `video` varchar(200) DEFAULT NULL,
          `pdf` varchar(200) DEFAULT NULL,
          `fecha` varchar(10) DEFAULT NULL,
          `autor` varchar(128) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");

      $bbdd->query("CREATE TABLE `tarians` (
          `idCom` int(10) NOT NULL,
          `idUser` int(10) NOT NULL,
          `idTarian` int(10) NOT NULL,
          `txt` varchar(500) DEFAULT NULL,
          `img01` varchar(200) DEFAULT NULL,
          `video` varchar(500) DEFAULT NULL,
          `pdf` varchar(200) DEFAULT NULL,
          `fecha` varchar(20) DEFAULT NULL,
          `hastags` varchar(17) DEFAULT NULL,
          `autor` varchar(128) DEFAULT NULL,
          `textRetarian` varchar(500) DEFAULT NULL,
          `retarian` int(1) NOT NULL,
          `tipoVideo` varchar(200) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");

      $bbdd->query("CREATE TABLE `usuarios` (
          `idCom` int(10) NOT NULL,
          `idUser` int(10) NOT NULL,
          `nombre` varchar(200) DEFAULT NULL,
          `clave` varchar(200) DEFAULT NULL,
          `img` varchar(200) DEFAULT NULL,
          `keyssUser` varchar(200) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");

      $bbdd->query("ALTER TABLE `admins`
      ADD PRIMARY KEY (`idCom`,`idUser`,`keyssUser`),
      ADD KEY `idCom` (`idCom`),
      ADD KEY `idUser` (`idUser`);");

      $bbdd->query("ALTER TABLE `bloqueados`
      ADD PRIMARY KEY (`idCom`,`idUser`,`idUserBloq`),
      ADD KEY `idCom` (`idCom`),
      ADD KEY `idUserBloq` (`idUserBloq`),
      ADD KEY `idUser` (`idUser`);");

      $bbdd->query("ALTER TABLE `comentarios`
      ADD PRIMARY KEY (`idCom`,`idTarian`,`idUser`,`idComentario`),
      ADD KEY `idCom` (`idCom`),
      ADD KEY `idTarian` (`idTarian`),
      ADD KEY `idUser` (`idUser`);");

      $bbdd->query("ALTER TABLE `comunidades`
      ADD PRIMARY KEY (`idCom`,`keyss`),
      ADD KEY `idCom` (`idCom`);");

      $bbdd->query("ALTER TABLE `favoritos`
      ADD PRIMARY KEY (`idCom`,`idUser`,`idTarian`,`idFav`),
      ADD KEY `idCom` (`idCom`),
      ADD KEY `idUser` (`idUser`);");

      $bbdd->query("ALTER TABLE `tarians`
      ADD PRIMARY KEY (`idCom`,`idUser`,`idTarian`),
      ADD KEY `idCom` (`idCom`),
      ADD KEY `idUser` (`idUser`),
      ADD KEY `idTarian` (`idTarian`);");

      $bbdd->query("ALTER TABLE `usuarios`
      ADD PRIMARY KEY (`idCom`,`idUser`,`keyssUser`),
      ADD KEY `idUser` (`idUser`),
      ADD KEY `idCom` (`idCom`);");

      $bbdd->query("ALTER TABLE `admins`
      ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`idCom`) REFERENCES `comunidades` (`idCom`),
      ADD CONSTRAINT `admins_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `usuarios` (`idUser`);");

      $bbdd->query("ALTER TABLE `bloqueados`
      ADD CONSTRAINT `bloqueados_ibfk_1` FOREIGN KEY (`idCom`) REFERENCES `comunidades` (`idCom`),
      ADD CONSTRAINT `bloqueados_ibfk_2` FOREIGN KEY (`idUserBloq`) REFERENCES `usuarios` (`idUser`),
      ADD CONSTRAINT `bloqueados_ibfk_3` FOREIGN KEY (`idUser`) REFERENCES `usuarios` (`idUser`);");

      $bbdd->query("ALTER TABLE `comentarios`
      ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`idCom`) REFERENCES `comunidades` (`idCom`),
      ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`idTarian`) REFERENCES `tarians` (`idTarian`),
      ADD CONSTRAINT `comentarios_ibfk_3` FOREIGN KEY (`idUser`) REFERENCES `usuarios` (`idUser`);");

      $bbdd->query("ALTER TABLE `favoritos`
      ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`idCom`) REFERENCES `comunidades` (`idCom`),
      ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `usuarios` (`idUser`);");

      $bbdd->query("ALTER TABLE `tarians`
      ADD CONSTRAINT `tarians_ibfk_1` FOREIGN KEY (`idCom`) REFERENCES `comunidades` (`idCom`),
      ADD CONSTRAINT `tarians_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `usuarios` (`idUser`);");

      $bbdd->query("ALTER TABLE `usuarios`
      ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idCom`) REFERENCES `comunidades` (`idCom`);");
      header('Location: ./index/index.html');
}

  if ($result = $bbdd->query("USE tariansBack")) {
    header('Location: ./index/index.html');
  }
?>