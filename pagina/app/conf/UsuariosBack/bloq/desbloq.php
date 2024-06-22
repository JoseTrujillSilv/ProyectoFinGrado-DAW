<?php

require_once '../../../../database.php';

bbddConexion();

$idUser = $_POST['idUser'];

$resultCom = bbdd()->query("SELECT idCom FROM usuarios WHERE idUser = $idUser");

$idCom = $resultCom->fetch_array(MYSQLI_NUM)[0];

$resultados = bbdd()->query("SELECT nombre, img, idUser FROM usuarios WHERE idCom = $idCom");

$arrayResultados = array();

$row = $resultados->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resultados->fetch_array(MYSQLI_NUM);

    $arraynew = array();
    array_push($arraynew, $rows[0], $rows[1], $rows[2]);
    array_push($arrayResultados, $arraynew);

    
}

echo json_encode($arrayResultados);

?>