<?php

require_once './../database.php';

bbddConexion();

$clave = $_POST['password'];
$keyss = $_POST['keyss'];

$keyssEncrypt = crypt($keyss, '27776361HHg@###ir..');

try {
    $resultado = bbdd()->query("SELECT idCom, clave, keyss FROM comunidades WHERE keyss= '$keyssEncrypt'");   
} catch (\Throwable $th) {
    echo 'ERROR, EL KEYSS INTRODUCIDO NO ES CORRECTO';
}

$rows = $resultado->fetch_array(MYSQLI_NUM);

$claveSql = $rows[1]or die('ERROR, EL KEYSS INTRODUCIDO NO ES CORRECTO');

$id = $rows[0];

if (password_verify($clave, $claveSql)) {
    header('Location: ../usuarios/admin/admin.html?'.$id);
}else{
    echo 'ERROR, LA CLAVE INTRODUCIDA NO ES CORRECTA';
}


?>