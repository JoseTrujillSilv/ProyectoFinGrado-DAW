<?php

require_once '../../database.php';

bbddConexion();

$palancaBloq = false;
$arrayResultadoJson = array();
$idCom = $_POST['idCom'];
$hastags = '#'.$_POST['hastags'];
$idUserBloq = $_POST['idUser'];

$resultBloq = bbdd()->query("SELECT idUser FROM bloqueados WHERE idUserBloq = $idUserBloq");


$resultado = bbdd()->query("SELECT usuarios.nombre, usuarios.img, tarians.txt, tarians.img01, tarians.video, tarians.pdf, tarians.fecha, tarians.idTarian, usuarios.idUser FROM usuarios, tarians WHERE usuarios.idUser = tarians.idUser AND usuarios.idCom = '$idCom' AND tarians.hastags = '$hastags';");

$row = $resultado->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rowsBloq = $resultBloq->fetch_array(MYSQLI_NUM);
    $rows = $resultado->fetch_array(MYSQLI_NUM);

    if ($rowsBloq[0] == $rows[8]) {
        array_push($arrayResultadoJson, 0);
    }else{
        array_push($arrayResultadoJson, $rows);
    }
}

echo json_encode($arrayResultadoJson);


?>