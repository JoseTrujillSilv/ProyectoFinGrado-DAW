<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

require_once '../database.php';

$palanca = false;

$idUser = $_GET['idUser'];

bbddConexion();

$result = bbdd()->query("SELECT idUser FROM admins");

$row = $result->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $result->fetch_array(MYSQLI_NUM);
    if ($rows[0]==$idUser) {
        $palanca = true;
    }

    echo $rows[0];
}

if ($palanca) {
    header('Location: ./conf/Admin/confAdmin.html?idUser='.$idUser);
}else{
    header('Location: ./conf/User/confUser.html?idUser='.$idUser);
}


?>