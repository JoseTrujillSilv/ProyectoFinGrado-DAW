<?php


require_once '../../database.php';

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

bbddConexion();

$idTarian2 = $_POST['idTarianRetarians'];
$idTarian = random_int(0, 999999);
$idUser = $_POST['idUserRetarians'];
$textRetarians = $_POST['textRetarians'];
$fechaTarian = date('d/m/Y');
$numRetarian = 1;


echo $idTarian2.'<br>';


$resultadoTarians = bbdd()->query("SELECT idUser, txt, img01, video, pdf FROM tarians WHERE idTarian = $idTarian2");

$array_ResulTarians = $resultadoTarians->fetch_array(MYSQLI_NUM);

$text = $array_ResulTarians[1];
$img = $array_ResulTarians[2];
$video = $array_ResulTarians[3];
$pdf = $array_ResulTarians[4];

$resultadoUsuarioT = bbdd()->query("SELECT nombre FROM usuarios WHERE idUser = $array_ResulTarians[0]");

$autor = $resultadoUsuarioT->fetch_array(MYSQLI_NUM)[0];

$resultadoNameImg = bbdd()->query("SELECT nombre, img FROM usuarios WHERE idUser = $idUser");

$arrayImgName = $resultadoNameImg->fetch_array(MYSQLI_NUM);

$resultado01 = bbdd()->query("SELECT idCom FROM usuarios WHERE idUser = $idUser");

$idCom = $resultado01->fetch_array(MYSQLI_NUM)[0];


$nameUser = $arrayImgName[0];
$fotoUser = '.'.$arrayImgName[1];


$bbdd = bbdd();

echo $textRetarians;


switch (true) {
    case $img!=null:
        $sql = $bbdd->prepare("INSERT INTO tarians (idCom, idUser, idTarian, txt, img01, fecha, autor, textRetarian, retarian) VALUES(?,?,?,?,?,?,?,?,?)");

        $sql->bind_param('iiisssssi', $idCom, $idUser, $idTarian, $text, $img, $fechaTarian, $autor, $textRetarians, $numRetarian);
        
        $sql->execute();
        
        $sql->close();
        break;
    case $video!=null:
        $sql = $bbdd->prepare("INSERT INTO tarians (idCom, idUser, idTarian, txt, video, fecha, autor, textRetarian, retarian) VALUES(?,?,?,?,?,?,?,?,?)");

        $sql->bind_param('iiisssssi', $idCom, $idUser, $idTarian, $text, $video, $fechaTarian, $autor, $textRetarians, $numRetarian);
        
        $sql->execute();
        
        $sql->close();
        break;
    case $pdf!=null:
        $sql = $bbdd->prepare("INSERT INTO tarians (idCom, idUser, idTarian, txt, pdf, fecha, autor, textRetarian, retarian) VALUES(?,?,?,?,?,?,?,?,?)");
    
    $sql->bind_param('iiisssssi', $idCom, $idUser, $idTarian, $text, $pdf, $fechaTarian, $autor, $textRetarians, $numRetarian);
    
    $sql->execute();
    
    $sql->close();
        break;
    default:
        
    $sql = $bbdd->prepare("INSERT INTO tarians (idCom, idUser, idTarian, txt, fecha, autor, textRetarian, retarian) VALUES(?,?,?,?,?,?,?,?)");

    $sql->bind_param('iiissssi', $idCom, $idUser, $idTarian, $text, $fechaTarian, $autor, $textRetarians,$numRetarian);

    $sql->execute();

    $sql->close();   
        break;
}


header('Location: ./muestraTarians.html?idUser='.$idUser.', rutaFotoUser='.$fotoUser.', nameUser='.$nameUser);



?>


