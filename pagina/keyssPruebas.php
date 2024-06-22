<?php

require_once 'database.php';

bbddConexion();

$resul = bbdd()->query("SELECT nombre, keyssUser FROM usuarios");

$row = $resul->num_rows;

for ($i=0; $i < $row; $i++) { 
    $rows = $resul->fetch_array(MYSQLI_NUM);
    echo $rows[0];
    echo crypt('77S.thfClZ/3A', '7766GGGttwfef#@');
    echo '<br>';
}



?>