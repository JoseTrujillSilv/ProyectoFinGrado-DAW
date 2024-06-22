<?php


require_once '../../../../database.php';

bbddConexion();

$idUser = $_POST['idUser'];
$keyss = $_POST['keyssCuenta'];
$password = $_POST['passwordNewCuenta'];

echo $keyss;
echo $password;
echo $idUser;


$resultado1 = bbdd()->query("SELECT keyssUser FROM usuarios WHERE idUser = $idUser");
$resultado2 = bbdd()->query("SELECT idUser FROM admins");
$rowR2 = $resultado2->num_rows;

$keyssSQL = $resultado1->fetch_array(MYSQLI_NUM)[0];

    if (crypt($keyss, '7766GGGttwfef#@') == $keyssSQL) {

        $bbdd = bbdd();
        
        $passwordEncrypt = password_hash($password, PASSWORD_DEFAULT, ['cost'=>10]);

        $stmt = $bbdd->prepare("UPDATE usuarios SET clave = ? WHERE idUser = ?");
        $stmt->bind_param("si", $passwordEncrypt, $idUser); // assume $password and $username are the sanitized inputs from user
        $stmt->execute();

        for ($i=0; $i < $rowR2; $i++) { 
            $rowsR2 = $resultado2->fetch_array(MYSQLI_NUM)[0];
    
            if ($rowsR2 == $idUser) {
                $stmt = $bbdd->prepare("UPDATE admins SET clave = ? WHERE idUser = ?");
                $stmt->bind_param("si", $passwordEncrypt, $idUser); // assume $password and $username are the sanitized inputs from user
                $stmt->execute();
            }
        }

        header('Location: ../../../accesPrinc.php?id='.$idUser);
    }else{
        echo 'No son las misma keyss';
    }
?>