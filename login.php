<?php
include 'conexion.php';

// Habilitar errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST['correo']) && !empty($_POST['clave'])) {
        $correo = $_POST['correo'];
        $clave = $_POST['clave'];

        // Buscar el usuario en la base de datos
        $query = "SELECT * FROM registros_de_usuarios WHERE correo = :correo";
        $stmt = $conexion->prepare($query);
        $stmt->execute(['correo' => $correo]);

        // Verificar si se encuentra el usuario
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($clave, $usuario['clave'])) {
            // Desactivar caché y redirigir
            header("Cache-Control: no-cache, no-store, must-revalidate");
            header("Pragma: no-cache");
            header("Expires: 0");

            // Redirigir a la página principal
            header("Location: paginaPrincipal.html");
            exit(); // Detener la ejecución después de la redirección
        } else {
            // Si las credenciales son incorrectas, mostrar un mensaje de error
            echo "Correo o contraseña incorrectos.";
        }
    } else {
        echo "Por favor, completa todos los campos.";
    }
}
?>
