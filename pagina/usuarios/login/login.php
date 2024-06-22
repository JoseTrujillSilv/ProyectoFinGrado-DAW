<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);


require_once './../../database.php';

bbddConexion();
$idCom = $_POST['idCom'];
$clave = $_POST['password'];
$keyss = $_POST['keyss'];
$cont = 0;

$keyssEncrypt = crypt($keyss, '7766GGGttwfef#@');

try {
    $resultado = bbdd()->query("SELECT idCom, clave, idUser FROM usuarios WHERE keyssUser='$keyssEncrypt'");   
} catch (\Throwable $th) {
    echo 'ERROR, EL KEYSS INTRODUCIDO NO ES CORRECTO';
}

$rows = $resultado->fetch_array(MYSQLI_NUM);

$idComSQL = $rows[0]or die('ERROR, EL KEYSS INTRODUCIDO NO ES CORRECTO');

$claveSQL = $rows[1];

$idUser = $rows[2];


if (password_verify($clave, $claveSQL)) {
    $cont++;
}else{
    echo 'ERROR, LA CLAVE INTRODUCIDA NO ES CORRECTA';
}

if ($idComSQL == $idCom) {
    $cont++;
}else{
    echo 'ERROR, EL ID ES INCORRECTO, NO ESTAS EN TU COMUNIDAD';
}

if ($cont==2) {
    header('Location: ../../app/accesPrinc.php?id='.$idUser.'');
}


?>