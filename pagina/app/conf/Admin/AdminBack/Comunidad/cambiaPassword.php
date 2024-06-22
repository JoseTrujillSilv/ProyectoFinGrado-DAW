<?php


require_once '../../../../../database.php';

bbddConexion();

$idUser = $_POST['idUser'];
$keyssAdmin = $_POST['keyssAdminCambCom'];
$passwordAdmin = $_POST['passwordAdminCambCom'];
$passwordCom = $_POST['passwordComCambCom']; 

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
    
    $bbdd = bbdd();
        
    $passwordEncrypt = password_hash($passwordCom, PASSWORD_DEFAULT, ['cost'=>10]);

    $stmt = $bbdd->prepare("UPDATE comunidades SET clave = ? WHERE idCom = ?");
    $stmt->bind_param("si", $passwordEncrypt, $idCom); // assume $password and $username are the sanitized inputs from user
    $stmt->execute();

    header('Location: ../../../../accesPrinc.php?id='.$idUser);


} else {
    echo 'La contraseña es incorrecta';
}

?>