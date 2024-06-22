<?php

require_once '../../../database.php';


ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

$idUser = $_GET['idUser'];

bbddConexion();

$sql = bbdd()->query("SELECT nombre, img FROM usuarios WHERE idUser = $idUser");

$resultado = $sql->fetch_array(MYSQLI_NUM);

$nameUser = $resultado[0];

$rutaUser = '.'.$resultado[1];


header('Location: ./favoritos.html?idUser='.$idUser.',fotoUser='.$rutaUser.',nameUser='.$nameUser);



?>