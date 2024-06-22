<?php

require_once '../../../database.php';

bbddConexion();
$bbdd = bbdd();

$idUser = $_POST['idUser'];
$array_idUserBloq = $_POST['bloq'];

echo $idUser;

$resultCom = $bbdd->query("SELECT idCom FROM usuarios");

$idCom = $resultCom->fetch_array(MYSQLI_NUM)[0];

$resultadoDevuelve = $bbdd->query("SELECT idUserBloq FROM bloqueados WHERE idCom = $idCom");

$arrayDevuelve = $resultadoDevuelve->fetch_array(MYSQLI_NUM);


if ($array_idUserBloq == null) {
    $bbdd->query("DELETE FROM bloqueados WHERE idUser = $idUser");
    echo 'Desbloqueados todos con éxito';
}else{
    if ($arrayDevuelve == null) {

        foreach ($array_idUserBloq as $value2) {
                if ($value2 == $idUser) {
                    echo 'Error, te estas bloqueando a ti mismo';
                }else{
                    $sql = $bbdd->prepare("INSERT INTO bloqueados VALUES(?,?,?)");
    
                mysqli_stmt_bind_param($sql, 'iii', $idCom, $idUser, $value2);
    
    
                mysqli_stmt_execute($sql);
    
                echo 'Bloqueado con éxito';
                }
        }
    }else{
        foreach ($arrayDevuelve as $value){
            foreach ($array_idUserBloq as $value2) {
                if ($value2 == $idUser) {
                    echo 'Error, te estas bloqueando a ti mismo';
                }else{
                    if($value === $value2){
                        $bbdd->query("DELETE FROM bloqueados WHERE idUserBloq = $value2");
                        echo 'Desbloqueado con éxito';
                    }else{
                        $sql = $bbdd->prepare("INSERT INTO bloqueados VALUES(?,?,?)");
            
                        mysqli_stmt_bind_param($sql, 'iii', $idCom, $idUser, $value);
            
            
                        mysqli_stmt_execute($sql);
            
                        echo 'Bloqueado con éxito';
                    }
                }
            }
        }
    }
}




?>