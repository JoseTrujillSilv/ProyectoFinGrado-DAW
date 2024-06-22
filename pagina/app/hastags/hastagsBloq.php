<?php

require_once '../../database.php';

bbddConexion();

$palancaBloq = false;
$arrayResultadoJson = array();
$idCom = $_POST['idCom'];
$hastags = '#'.$_POST['hastags'];
$idUserBloq = $_POST['idUser'];

echo $idUserBloq;

$resultBloq = bbdd()->query("SELECT idUser FROM bloqueados WHERE idUserBloq = $idUserBloq");

var_dump($resultBloq->fetch_array(MYSQLI_NUM));

/*
$resultado = bbdd()->query("SELECT usuarios.nombre, usuarios.img, tarians.txt, tarians.img01, tarians.video, tarians.pdf, tarians.fecha, tarians.idTarian, usuarios.idUser FROM usuarios, tarians WHERE usuarios.idUser = tarians.idUser AND usuarios.idCom = '$idCom' AND tarians.hastags = '$hastags';");

$row = $resultado->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rowsBloq = $resultBloq->fetch_array(MYSQLI_NUM);
    $rows = $resultado->fetch_array(MYSQLI_NUM);

    if ($resultBloq[0] == $rows[8]) {
        $palancaBloq = true;
    }

    if ($palancaBloq == false) {
        array_push($arrayResultadoJson, $rows);
    }

    $palancaBloq = false;
}

echo json_encode($arrayResultadoJson);

*/

?>