<?php


ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

require_once '../../database.php';

$arrayResultadoJson = array();
$arrayResultadoJson2 = array();
$idCom = $_POST['idCom'];

bbddConexion();

$resultado = bbdd()->query("SELECT nombre, img, idUser FROM usuarios WHERE idCom = $idCom");

$row = $resultado->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resultado->fetch_array(MYSQLI_NUM);
    array_push($arrayResultadoJson,$rows);
}

echo json_encode($arrayResultadoJson);


?>