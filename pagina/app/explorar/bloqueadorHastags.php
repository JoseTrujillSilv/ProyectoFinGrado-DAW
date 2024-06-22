<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

require_once '../../database.php';

bbddConexion();

$palancaBloqueo = false;
$arrayUsuarios = explode('?', $_GET['idUser']);

$idUser = $arrayUsuarios[0];
$rutaFoto = explode('=', $arrayUsuarios[1])[1];
$nameUser = explode('=', $arrayUsuarios[2])[1];
$idUserBloq = explode('=', $arrayUsuarios[3])[1];

$resultado = bbdd()->query("SELECT idUser, idUserBloq FROM bloqueados");

$row = $resultado->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resultado->fetch_array(MYSQLI_NUM);

    if ($rows[0]==$idUser && $rows[1] == $idUserBloq) {
       $palancaBloqueo = true;
    }

}

if ($palancaBloqueo == true) {
    header("Location: ../explorar/bloqueados.html?iduser=$idUserBloq");
}else{

header("Location: ../explorar/muestraTarians2.html?idUser=$idUser,rutaFotoUser=$rutaFoto,nameUser=$nameUser,idUserBloq=$idUserBloq");
}

?>