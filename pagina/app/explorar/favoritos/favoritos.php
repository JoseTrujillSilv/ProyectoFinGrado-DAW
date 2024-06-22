<?php

require_once '../../../database.php';


ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

$cont = 0;
$fechaTarian = $_POST['fechaFav'];
$fav = $_POST['fav'];
$idTarian = $_POST['idTarianFav'];
$idUser = $_POST['idUserFav'];
$text = $_POST['textFav'];
$img = $_POST['imgFav'];
$video = $_POST['videoFav'];
$pdf = $_POST['pdfFav'];
$autor = $_POST['autor'];
$idFav = random_int(200, 999999);

bbddConexion();

$bbdd = bbdd();

$resultado = $bbdd->query("SELECT idTarian FROM favoritos");


$row = $resultado->num_rows;

if ($row==0) {
    inserta($bbdd, $fechaTarian, $idFav, $idTarian, $idUser, $img, $video, $pdf, $text, $autor);
}else{

    for ($i=0; $i < $row; $i++) { 
        $rows = $resultado->fetch_array(MYSQLI_NUM);
    
        echo $rows[0];
    
        if ($rows[0]!=$idTarian) {
            $cont++;
        }
    
    }

    if ($cont == $row) {
        inserta($bbdd, $fechaTarian, $idFav, $idTarian, $idUser, $img, $video, $pdf, $text, $autor);
    }else{
        delete($bbdd, $idTarian);
    }



}






function inserta($bbdd, $fechaTarian, $idFav, $idTarian, $idUser, $img, $video, $pdf, $text, $autor){

    echo 'entra en inserta';
    echo $idUser.'<br>';

    $resultado01 = bbdd()->query("SELECT idCom FROM usuarios WHERE idUser = $idUser");

    $idCom = $resultado01->fetch_array(MYSQLI_NUM)[0];


switch (true) {
    case $img!=null:
        $sql = $bbdd->prepare("INSERT INTO favoritos (idCom, idUser, idTarian, idFav, text, img01, fecha, autor) VALUES(?,?,?,?,?,?,?,?)");

        $sql->bind_param('iiiissss', $idCom, $idUser, $idTarian, $idFav, $text, $img, $fechaTarian, $autor);
        
        $sql->execute();
        
        $sql->close();
        break;
    case $video!=null:
        $sql = $bbdd->prepare("INSERT INTO favoritos (idCom, idUser, idTarian, idFav, text, video, fecha, autor) VALUES(?,?,?,?,?,?,?,?)");

        $sql->bind_param('iiiissss', $idCom, $idUser, $idTarian, $idFav, $text, $video, $fechaTarian, $autor);
        
        $sql->execute();
        
        $sql->close();
        break;
    case $pdf!=null:
        $sql = $bbdd->prepare("INSERT INTO favoritos (idCom, idUser, idTarian, idFav, text, pdf, fecha, autor) VALUES(?,?,?,?,?,?,?,?)");
    
    $sql->bind_param('iiisssss', $idCom, $idUser, $idTarian, $idFav, $text, $pdf, $fechaTarian, $autor);
    
    $sql->execute();
    
    $sql->close();
        break;
    default:
        
    $sql = $bbdd->prepare("INSERT INTO favoritos (idCom, idUser, idTarian, idFav, text, fecha, autor) VALUES(?,?,?,?,?,?,?)");

    $sql->bind_param('iiiisss', $idCom, $idUser,  $idTarian, $idFav, $text, $fechaTarian, $autor);

    $sql->execute();

    $sql->close();   
        break;
}


 };



function delete($bbdd, $idTarian){

    $bbdd->query("DELETE FROM favoritos WHERE idTarian = $idTarian");

    $bbdd->close();
}




?>