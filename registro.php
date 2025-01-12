<?php
include 'conexion.php';

// Habilitar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST['nombre']) && !empty($_POST['correo']) && !empty($_POST['clave'])) {
        $nombre = $_POST['nombre'];
        $correo = $_POST['correo'];
        $clave = password_hash($_POST['clave'], PASSWORD_DEFAULT); // Encriptar contraseña

        // Verificar si el correo ya está registrado
        $query = "SELECT COUNT(*) FROM registros_de_usuarios WHERE correo = :correo";
        $stmt = $conexion->prepare($query);
        $stmt->execute(['correo' => $correo]);
        $count = $stmt->fetchColumn();

        if ($count > 0) {
            // Si el correo ya existe, mostrar mensaje de error
            echo "El correo electrónico ya está registrado. Por favor, usa otro correo.";
        } else {
            // Si el correo no está registrado, proceder con la inserción
            $query = "INSERT INTO registros_de_usuarios (nombre, correo, clave) VALUES (:nombre, :correo, :clave)";
            $stmt = $conexion->prepare($query);

            try {
                $stmt->execute(['nombre' => $nombre, 'correo' => $correo, 'clave' => $clave]);
                
                // Redirigir al formulario de inicio de sesión
                header("Location: login.html");
                exit(); // Detener la ejecución después de la redirección
            } catch (PDOException $e) {
                // En caso de error
                echo "Error al registrar: " . $e->getMessage();
            }
        }
    } else {
        echo "Por favor, completa todos los campos.";
    }
}
?>
