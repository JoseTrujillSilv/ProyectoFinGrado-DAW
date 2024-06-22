<?php

require_once './database.php';

bbddConexion();

$resultado = bbdd()->query("SELECT * FROM comunidades");

$row = $resultado->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resultado->fetch_array(MYSQLI_NUM);

    switch (true) {
        case $i==0:
            echo '['.json_encode($rows).',';
            break;
        case $i==$row-1:
            echo json_encode($rows).']';
            break;
        default: 
        echo json_encode($rows).',';
    }
   
}


?>