<?php

require_once '../../database.php';

$idUser = $_POST['idUser'];

bbddConexion();

$arrayResultado = array();

$resultado = bbdd()->query("SELECT txt, img01, video, pdf, fecha, idTarian, autor, textRetarian, retarian FROM tarians WHERE idUser = $idUser ORDER BY fecha DESC");

$row = $resultado->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resultado->fetch_array(MYSQLI_NUM);
    array_push($arrayResultado, $rows);
}

echo json_encode($arrayResultado);

bbdd()->close();
?>