<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);
require_once '../database.php';

$idUser = $_GET['id'];

bbddConexion();

$resultado = bbdd()->query("SELECT nombre, img, idUser FROM usuarios WHERE idUser = '$idUser'");

$row = $resultado->num_rows;

$rows = $resultado->fetch_array(MYSQLI_NUM);

$name = $rows[0];

$fotoPerfil = '.'.$rows[1];

$idUserSQL = $rows[2];

$arrayJson = [$name, $fotoPerfil, $idUserSQL]; 

header('Location: ./mostrar/muestraTarians.html?id='.$arrayJson[2].',ruta='.$arrayJson[1].',name='.$arrayJson[0]);