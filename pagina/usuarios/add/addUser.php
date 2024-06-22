<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);


require_once '../../database.php';

$nombreArch = $_FILES['addImage']['name'];
$rutaArch = $_FILES['addImage']['tmp_name'];
$carpeta = 'imgUser/';
$rutaCompleta = $carpeta.$nombreArch;

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

if (move_uploaded_file($rutaArch, $rutaCompleta)) {
    echo 'El archivo '. $nombreArch . ' ha sido cargado con éxito';
} else {
    echo 'Ha ocurrido un error al cargar el archivo.';
}

$idCom = explode('=', $_POST['idCom'])[1];
$name = '@'.$_POST['name'];
$password = $_POST['password'];
$id = random_int(900, 9999999);
$keyss = random_int(9999, 9999999);
$keyssString = strval($keyss);

$passwordEncrypt = password_hash($password, PASSWORD_DEFAULT, ['cost'=>10]);

$keyssEncrypt = crypt($keyssString, '7766GGGttwfef#@');

bbddConexion();

$bbdd = bbdd();

$formatImage = './usuarios/add/imgUser/'.$nombreArch;

$sql = $bbdd->prepare("INSERT INTO usuarios VALUES(?,?,?,?,?,?)");

$sql->bind_param('iissss', $idCom, $id, $name, $passwordEncrypt, $formatImage, $keyssEncrypt);

$sql->execute();

header('Location: ./resultadoAdd.html?keyss='.$keyssString);

$sql->close();
?>