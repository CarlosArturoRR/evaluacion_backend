<?php


//    echo "No se envió un nombre de usuario válido";

$file = fopen("./data-1.json","r");
$response = fread($file,filesize("./data-1.json"));
echo ($response);
fclose($file);

 ?>
