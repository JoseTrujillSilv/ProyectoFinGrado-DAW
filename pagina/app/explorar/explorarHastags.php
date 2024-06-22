<?php


ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

require_once '../../database.php';

$arrayResultadoJson = array();
$arrayResultadoJson2 = array();
$idCom = $_POST['idCom'];

bbddConexion();

$resultado3 = bbdd()->query("SELECT tarians.txt, tarians.fecha, tarians.hastags, tarians.likes, usuarios.idUser, usuarios.img, usuarios.nombre

FROM tarians, usuarios

WHERE tarians.idUser = usuarios.idUser AND usuarios.idCom = '$idCom'");

$row2 = $resultado3->num_rows;

for ($i=0; $i < $row2; $i++) { 
    $rowsH = $resultado3->fetch_array(MYSQLI_NUM);
    array_push($arrayResultadoJson2,$rowsH);
}

echo json_encode($arrayResultadoJson2);


?>