<?php

require_once '../database.php';

bbddConexion();

$array_result = array();
$idUser = $_POST['idUser'];

$resultado = bbdd()->query("SELECT idCom, nombre, img FROM usuarios WHERE idUser=$idUser");

$row = $resultado->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resultado->fetch_array(MYSQLI_NUM);
    array_push($array_result, $rows);
}

echo json_encode($array_result);

?>