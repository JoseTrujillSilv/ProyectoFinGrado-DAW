<?php


require_once '../../database.php';

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

bbddConexion();


$idTarian = random_int(900, 9999999);
$idUser = $_POST['idUser'];
$nameUser = $_POST['nameUser'];
$fotoUser = $_POST['fotoUser'];
$text = $_POST['text'];
$bbdd = bbdd();
$fechaHoy = date('d/m/Y');
$textHastags = $_POST['hastags'];
$retarian = 0;

$resultado01 = bbdd()->query("SELECT idCom FROM usuarios WHERE idUser = $idUser");

$idCom = $resultado01->fetch_array(MYSQLI_NUM)[0];


if ($_FILES['file1']['tmp_name'] == null) {

    $sql = $bbdd->prepare("INSERT INTO tarians (idCom, idUser, idTarian, txt, fecha, hastags, retarian) VALUES(?,?,?,?,?,?,?)");

    $sql->bind_param('iiisssi', $idCom, $idUser,  $idTarian, $text, $fechaHoy, $textHastags,$retarian);

    $sql->execute();

    $sql->close();   

}else{

$nombreArch = $_FILES['file1']['name'];
$terminacion = explode('.', $nombreArch)[1];

if ($terminacion == 'jpeg' || $terminacion == 'jpg' || $terminacion == 'png') {

$rutaImg = $_FILES['file1']['tmp_name'];
$carpeta = './imgs/';
$rutaCompleta = $carpeta.$nombreArch;
$fechaHoy = date('d/m/Y');
    
// Verificar si es el tipo de archivo esperado
$tipoArchivo = strtolower(pathinfo($rutaCompleta, PATHINFO_EXTENSION));
if($tipoArchivo != "jpg" && $tipoArchivo != "jpeg" && $tipoArchivo != "png" && $tipoArchivo != "gif" ) {
    echo "Lo siento, solamente archivos con la extensión JPG, JPEG, PNG y GIF son permitidos.";
    exit();
}

// Limitar el tamaño máximo permitido en bytes
if ($_FILES["file1"]["size"] > 500000) {
    echo "Lo siento, tu archivo es demasiado grande.";
    exit();
}

if (move_uploaded_file($rutaImg, $rutaCompleta)) {
    echo 'El archivo '. $nombreArch . ' ha sido cargado con éxito';
} else {
    echo 'Ha ocurrido un error al cargar el archivo.';
}

$sql = $bbdd->prepare("INSERT INTO tarians (idCom, idUser, idTarian, txt, img01, fecha, hastags,retarian) VALUES(?,?,?,?,?,?,?,?)");

$sql->bind_param('iiissssi', $idCom, $idUser, $idTarian, $text, $rutaCompleta, $fechaHoy, $textHastags,$retarian);

$sql->execute();

$sql->close();

}


if ($terminacion == 'mp4') {

$rutaVideo = $_FILES['file1']['tmp_name'];
$carpeta = './Videos/';
$rutaCompleta = $carpeta.$nombreArch;

if (move_uploaded_file($rutaVideo, $rutaCompleta)) {
    echo 'El archivo '. $nombreArch . ' ha sido cargado con éxito';
} else {
    echo 'Ha ocurrido un error al cargar el archivo.';
}

$sql = $bbdd->prepare("INSERT INTO tarians (idCom, idUser, idTarian, txt, video, fecha, hastags,retarian) VALUES(?,?,?,?,?,?,?,?)");

$sql->bind_param('iiissssi', $idCom, $idUser, $idTarian, $text, $rutaCompleta, $fechaHoy, $textHastags,$retarian);

$sql->execute();

$sql->close();


}


if ($terminacion == 'pdf') {

    $rutaArchivo = $_FILES['file1']['tmp_name'];
    $carpeta = './pdf/';
    $rutaCompleta = $carpeta.$nombreArch;
    
    if (move_uploaded_file($rutaArchivo, $rutaCompleta)) {
        echo 'El archivo '. $nombreArch . ' ha sido cargado con éxito';
    } else {
        echo 'Ha ocurrido un error al cargar el archivo.';
    }
    
    $sql = $bbdd->prepare("INSERT INTO tarians (idCom, idUser, idTarian, txt, pdf, fecha, hastags,retarian) VALUES(?,?,?,?,?,?,?,?)");
    
    $sql->bind_param('iiissssi', $idCom, $idUser, $idTarian, $text, $rutaCompleta, $fechaHoy, $textHastags,$retarian);
    
    $sql->execute();
    
    $sql->close();
    
    }


    
    
}


header('Location: ./muestraTarians.html?idUser='.$idUser.', rutaFotoUser='.$fotoUser.', nameUser='.$nameUser);


?>


