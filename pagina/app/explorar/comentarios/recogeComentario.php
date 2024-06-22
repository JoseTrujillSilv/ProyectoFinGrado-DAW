<?php

require_once '../../../database.php';

bbddConexion();

$arrayResultadoJson = array();

$idTarian = $_POST['idTarian'];

$resultado = bbdd()->query("SELECT usuarios.nombre, comentarios.idTarian, comentarios.txt, comentarios.fecha FROM usuarios, comentarios, tarians WHERE usuarios.idUser = comentarios.idUser AND tarians.idTarian= comentarios.idTarian AND tarians.idTarian = $idTarian ORDER BY comentarios.fecha DESC");

$row = $resultado->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resultado->fetch_array(MYSQLI_NUM);
    array_push($arrayResultadoJson,$rows);
}

echo json_encode($arrayResultadoJson);

bbdd()->close();

?>