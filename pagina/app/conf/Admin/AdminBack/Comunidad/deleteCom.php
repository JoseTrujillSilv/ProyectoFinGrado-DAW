<?php


require_once '../../../../../database.php';

bbddConexion();

$idUser = $_POST['idUser'];
$keyss = $_POST['keyssUserDeleteCom'];
$password = $_POST['passwordUserDeleteCom'];
$keyssCom = $_POST['keyssComDeleteCom'];
$passwordCom = $_POST['passwordComDeleteCom'];

$resultCom = bbdd()->query("SELECT idCom FROM usuarios WHERE idUser = $idUser");
$resultado1 = bbdd()->query("SELECT clave, keyssUser FROM admins WHERE idUser = $idUser");

$idCom = $resultCom->fetch_array(MYSQLI_NUM)[0];

$row = $resultado1->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resultado1->fetch_array(MYSQLI_NUM);
    $passwordSQL = strval($rows[0]);
    $keyssSQL = strval($rows[1]);
}

$resultado3 = bbdd()->query("SELECT clave, keyss FROM comunidades WHERE idCom = $idCom");

$row3 = $resultado3->num_rows;

for ($i=0; $i < $row3; $i++) { 
    $rows3 = $resultado3->fetch_array(MYSQLI_NUM);
    $passwordSQLCom = strval($rows3[0]);
    $keyssSQLCom = strval($rows3[1]);
}



// Verificar la contraseña
if (password_verify($passwordAdmin, $passwordSQL) && crypt($keyssAdmin, '7766GGGttwfef#@') == $keyssSQL && password_verify($passwordCom, $passwordSQLCom) && crypt($keyssCom, '27776361HHg@###ir..') == $keyssSQLCom) {
    bbdd()->query("DELETE FROM favoritos WHERE idCom = $idCom");
    bbdd()->query("DELETE FROM comentarios WHERE idCom = $idCom");
    bbdd()->query("DELETE FROM tarians WHERE idCom = $idCom");
    bbdd()->query("DELETE FROM bloqueados WHERE idCom = $idCom");
    bbdd()->query("DELETE FROM usuarios WHERE idCom = $idCom");
    bbdd()->query("DELETE FROM admins WHERE idCom = $idCom");
    bbdd()->query("DELETE FROM comunidades WHERE idCom = $idCom");

    header('Location: ../../../../../../../../index.html');

} else {
    echo 'La contraseña es incorrecta';
}

?>