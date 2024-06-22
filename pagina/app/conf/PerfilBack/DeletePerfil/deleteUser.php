<?php


require_once '../../../../database.php';

bbddConexion();

$idUser = $_POST['idUser'];
$keyss = $_POST['keyssUserDelete'];
$password = $_POST['passwordUserDelete'];

$resultado1 = bbdd()->query("SELECT clave, keyssUser FROM usuarios WHERE idUser = $idUser");
$resultado2 = bbdd()->query("SELECT idUser FROM admins");
$rowR2 = $resultado2->num_rows;

$rows = $resultado1->fetch_array(MYSQLI_NUM);

$passwordSQL = $rows[0];
$keyssSQL = $rows[1];

// Verificar la contraseña
if (password_verify($password, $passwordSQL)) {
    if (crypt($keyss, '7766GGGttwfef#@') == $keyssSQL) {
                bbdd()->query("DELETE FROM favoritos WHERE idUser = $idUser");
                bbdd()->query("DELETE FROM comentarios WHERE idUser = $idUser");
                bbdd()->query("DELETE FROM tarians WHERE idUser = $idUser");
                bbdd()->query("DELETE FROM bloqueados WHERE idUser = $idUser");
                bbdd()->query("DELETE FROM usuarios WHERE idUser = $idUser");

        for ($i=0; $i < $rowR2; $i++) { 
            $rowsR2 = $resultado2->fetch_array(MYSQLI_NUM)[0];
    
            if ($rowsR2 == $idUser) {
                bbdd()->query("DELETE FROM admins WHERE idUser = $idUser");
            }
        }

        header('Location: ../../../../../../indice.html');
    }else{
        echo 'No son las misma keyss';
    }

} else {
    echo 'La contraseña es incorrecta';
}


?>