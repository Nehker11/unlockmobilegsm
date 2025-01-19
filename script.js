// Función para redirigir a la página de Activaciones
function redirigirActivaciones() {
    window.location.href = "listadeactivaciones.html";  // Asegúrate de que el archivo 'listadeactivaciones.html' esté en la misma carpeta
}

// Función para redirigir a la página de Créditos
function redirigirCreditos() {
    window.location.href = "listadecreditos.html";  // Asegúrate de que el archivo 'listadecreditos.html' esté en la misma carpeta
}


// Detecta el scroll para ocultar y mostrar el encabezado
let lastScrollTop = 0;  // Variable para almacenar la última posición del scroll

// Agrega el evento de scroll cuando la página cargue
window.addEventListener("scroll", function() {
    let header = document.querySelector(".header");  // Selecciona el encabezado

    if (!header) return;  // Si no se encuentra el encabezado, no hace nada

    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;  // Posición actual del scroll

    if (currentScroll > lastScrollTop) {
        // Si el scroll es hacia abajo, ocultamos el encabezado
        header.classList.add("hidden");
    } else {
        // Si el scroll es hacia arriba, mostramos el encabezado
        header.classList.remove("hidden");
    }

    // Actualiza la última posición del scroll
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".btn-buy");
    buttons.forEach(button => {
        button.setAttribute("target", "_blank");
    });
});

// Función para verificar si el usuario está logueado
function verificarSesion() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        mostrarPerfil();
    } else {
        // Si no está logueado, redirige a la página de inicio de sesión
        window.location.href = "index.html";
    }
}

// Función para mostrar el perfil del usuario
function mostrarPerfil() {
    const username = localStorage.getItem('currentUser');
    const profileSection = document.getElementById('profileSection');
    const errorMessage = document.getElementById('errorMessage');
    
    // Si no se encuentra el perfil, muestra un error
    if (!username) {
        errorMessage.style.display = 'block';
        profileSection.style.display = 'none';
    } else {
        errorMessage.style.display = 'none';
        profileSection.style.display = 'block';

        // Mostrar el nombre del usuario en el perfil
        document.getElementById('profileUsername').textContent = username;

        // Si tienes más campos, añádelos aquí de manera similar
    }
}

// Llamada a la función cuando la página se carga
window.onload = function() {
    verificarSesion();  // Verifica la sesión cuando la página cargue
};

// Función para manejar el inicio de sesión
function iniciarSesion() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulación de autenticación (puedes reemplazarla con una verificación real)
    if (username === 'usuarioPrueba' && password === 'claveSegura') {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentUser', username);
        window.location.href = "perfil.html"; // Redirigir al perfil
    } else {
        alert('Credenciales incorrectas');
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    // Elimina los datos de sesión (usuario logueado)
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    
    // Muestra el mensaje de despedida
    alert("Gracias por su visita, ¡vuelva pronto!");
    
    // Redirige al inicio (index.html)
    window.location.href = "index.html";
}

// Agregar el evento al botón de cerrar sesión
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', cerrarSesion);
    }
});
