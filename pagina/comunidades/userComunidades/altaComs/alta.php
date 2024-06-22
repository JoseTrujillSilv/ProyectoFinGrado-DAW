<?php



ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

require_once '../../../database.php';

bbddConexion();

$clave = $_POST['password'];
$idCom = $_POST['idCom'];

try {
    $resultado = bbdd()->query("SELECT idCom, clave FROM comunidades WHERE idCom= '$idCom'");   
} catch (\Throwable $th) {
    echo 'ERROR, LA CONTRASEÑA NO ES CORRECTA O LA COMUNIDAD ELEGIDA NO ES CORRECTA';
}

$rows = $resultado->fetch_array(MYSQLI_NUM);

$claveSql = $rows[1];

$id = $rows[0];

if (password_verify($clave, $claveSql)) {
    header('Location: ../../../usuarios/usuarios.html?'.$id);
}else{
    echo 'ERROR, LA CLAVE INTRODUCIDA NO ES CORRECTA';
}


?>