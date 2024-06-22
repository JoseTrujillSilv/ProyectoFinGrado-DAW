<?php

require_once '../../../../database.php';

bbddConexion();

$nombreArch = $_FILES['addImage']['name'];
$rutaArch = $_FILES['addImage']['tmp_name'];
$carpeta = 'imgAdmin/';
$rutaCompleta = $carpeta.$nombreArch;
$idUser = $_POST['idUser'];
$password = $_POST['passwordCambiaImg'];
$rutaDestino = '../../../../usuarios/admin/imgAdmin/'.$nombreArch;


// Verificar si es el tipo de archivo esperado
$tipoArchivo = strtolower(pathinfo($rutaCompleta, PATHINFO_EXTENSION));
if($tipoArchivo != "jpg" && $tipoArchivo != "jpeg" && $tipoArchivo != "png" && $tipoArchivo != "gif" ) {
    echo "Lo siento, solamente archivos con la extensión JPG, JPEG, PNG y GIF son permitidos.";
    exit();
}

// Limitar el tamaño máximo permitido en bytes
if ($_FILES["addImage"]["size"] > 500000) {
    echo "Lo siento, tu archivo es demasiado grande.";
    exit();
}

if (move_uploaded_file($rutaArch, $rutaDestino)) {
    echo 'El archivo '. $nombreArch . ' ha sido cargado con éxito';
} else {
    echo 'Ha ocurrido un error al cargar el archivo.';
}


$formatImage = './usuarios/admin/imgAdmin/'.$nombreArch;


$resultado1 = bbdd()->query("SELECT clave FROM usuarios WHERE idUser = $idUser");
$resultado2 = bbdd()->query("SELECT idUser FROM admins");
$rowR2 = $resultado2->num_rows;

$passwordSQL = strval($resultado1->fetch_array(MYSQLI_NUM)[0]);

// Verificar la contraseña
if (password_verify($password, $passwordSQL)) {
    
    bbdd()->query("UPDATE usuarios SET img = '$formatImage' WHERE idUser = '$idUser'");

    for ($i=0; $i < $rowR2; $i++) { 
        $rowsR2 = $resultado2->fetch_array(MYSQLI_NUM)[0];

        if ($rowsR2 == $idUser) {
            bbdd()->query("UPDATE admins SET img = '$formatImage' WHERE idUser = '$idUser'");
        }
    }

    header('Location: ../../../accesPrinc.php?id='.$idUser);

} else {
    echo 'La contraseña es incorrecta';
}


?>