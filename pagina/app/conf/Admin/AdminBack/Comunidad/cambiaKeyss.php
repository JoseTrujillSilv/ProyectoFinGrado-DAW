<?php

require_once '../../../../../database.php';

bbddConexion();

$idUser = $_POST['idUser'];
$keyssAdmin = $_POST['keyssAdminCambKeyss'];
$passwordAdmin = $_POST['passwordAdminCambKeyss'];

$resultCom = bbdd()->query("SELECT idCom FROM usuarios WHERE idUser = $idUser");
$resultado1 = bbdd()->query("SELECT clave, keyssUser FROM admins WHERE idUser = $idUser");

$idCom = $resultCom->fetch_array(MYSQLI_NUM)[0];

$row = $resultado1->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resultado1->fetch_array(MYSQLI_NUM);
    $passwordSQL = strval($rows[0]);
    $keyssSQL = strval($rows[1]);
}


// Verificar la contraseña
if (password_verify($passwordAdmin, $passwordSQL) && crypt($keyssAdmin, '7766GGGttwfef#@') == $keyssSQL) {

    $keyss = random_int(9999, 9999999);

    $keyssEncrypt = crypt($keyss, '27776361HHg@###ir..');
    
    bbdd()->query("UPDATE comunidades SET keyss = '$keyssEncrypt' WHERE idCom = '$idCom'");

    header('Location: ../../../../../comunidades/add/resultadoAdd.html?keyss='.$keyss);

} else {
    echo 'La contraseña es incorrecta';
}

?>