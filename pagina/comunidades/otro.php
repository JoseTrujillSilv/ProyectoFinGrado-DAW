<?php

$nombreArch = $_FILES['addImage']['name'];
$rutaArch = $_FILES['addImage']['tmp_name'];
$carpeta = 'imgsCom/';
$rutaCompleta = $carpeta.$nombreArch;

echo $rutaArch;

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



?>