<?php

require_once '../../../../../database.php';

bbddConexion();

$idUser = $_POST['idUser'];
$keyssAdmin = $_POST['keyssAdminCambImg'];
$passwordAdmin = $_POST['passwordAdminCambImg'];
$nombreArch = $_FILES['addImage']['name'];
$rutaArch = $_FILES['addImage']['tmp_name'];
$carpeta = 'imgCom/';
$rutaCompleta = $carpeta.$nombreArch;
$rutaDestino = '../../../../../comunidades/add/imgCom/'.$nombreArch;


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


$formatImage = './comunidades/add/imgCom/'.$nombreArch;


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
    
    bbdd()->query("UPDATE comunidades SET ruta = '$formatImage' WHERE idCom = '$idCom'");

    header('Location: ../../../../accesPrinc.php?id='.$idUser);

} else {
    echo 'La contraseña es incorrecta';
}



?>