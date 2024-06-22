<?php

function bbdd(){

    $server = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'finalProyect';

    $bbdd = new mysqli($server, $username, $password, $database);

    return $bbdd;

}


function bbddConexion(){
    $server = 'localhost';
    $username = 'root';
    $password = '';

    return bbdd()->connect($server, $username, $password);
}



?>