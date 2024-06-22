<?php

require_once '../../../../database.php';

bbddConexion();

$idUser = $_POST['idUser'];
$nameUser = '@'.$_POST['nameUserCambiaName'];
$password = $_POST['passwordUserCambiaName'];

$resultado1 = bbdd()->query("SELECT clave FROM usuarios WHERE idUser = $idUser");
$resultado2 = bbdd()->query("SELECT idUser FROM admins");
$rowR2 = $resultado2->num_rows;

$passwordSQL = strval($resultado1->fetch_array(MYSQLI_NUM)[0]);

// Verificar la contraseña
if (password_verify($password, $passwordSQL)) {
    
    bbdd()->query("UPDATE usuarios SET nombre = '$nameUser' WHERE idUser = '$idUser'");

    for ($i=0; $i < $rowR2; $i++) { 
        $rowsR2 = $resultado2->fetch_array(MYSQLI_NUM)[0];

        if ($rowsR2 == $idUser) {
            bbdd()->query("UPDATE admins SET nombre = '$nameUser' WHERE idUser = '$idUser'");
        }
    }

    header('Location: ../../../accesPrinc.php?id='.$idUser);

} else {
    echo 'La contraseña es incorrecta';
}


?>