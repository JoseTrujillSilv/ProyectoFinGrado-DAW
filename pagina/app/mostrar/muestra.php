<?php

require_once '../../database.php';

bbddConexion();

$arrayResultado = array();

$resultado = bbdd()->query("SELECT txt, img01, video, pdf, fecha FROM tarians WHERE idUser = $array_idUser[0]");

$row = $resultado->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resultado->fetch_array(MYSQLI_NUM);
    array_push($arrayResultado, $rows);
}



echo json_encode($arrayResultado);



?>