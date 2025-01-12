<?php
$host = "localhost";
$db = "registro"; // Nombre de tu base de datos
$user = "root";   // Usuario de tu base de datos
$password = "";   // Contraseña de tu base de datos

try {
    $conexion = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>
