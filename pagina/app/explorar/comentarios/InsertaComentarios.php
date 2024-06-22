<?php

require_once '../../../database.php';

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

$arrayResultadoJson = array();

$url = $_POST['url'];
$idComment = random_int(0, 999999);
$idTarian = $_POST['idTarianComment'];
$idUser = $_POST['idUserComment'];
$comentario = $_POST['comentarioTxt'];
$fechaHoy = date('d/m/Y H:i:s');

bbddConexion();

$bbdd = bbdd();

$resultado01 = $bbdd->query("SELECT idCom FROM usuarios WHERE idUser = $idUser");

$idCom = $resultado01->fetch_array(MYSQLI_NUM)[0];


$sql = $bbdd->prepare("INSERT INTO comentarios VALUES(?,?,?,?,?,?)");

mysqli_stmt_bind_param($sql, 'iiiiss', $idCom, $idUser, $idTarian, $idComment, $comentario, $fechaHoy);


mysqli_stmt_execute($sql);


bbdd()->close();

header('Location: '.$url);

?>