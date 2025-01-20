// Función para manejar el registro de usuario
function registrarUsuario() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Obtener los usuarios registrados desde localStorage
    let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Si el usuario no existe, guardar los datos del nuevo usuario
    const nuevoUsuario = {
        username: username,
        email: email,
        password: password
    };

    usuariosRegistrados.push(nuevoUsuario);

    // Guardar la lista de usuarios en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    // Redirigir al usuario al perfil o a la página principal
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('currentUser', username);
    window.location.href = "perfil.html"; // Redirige al perfil
}

// Función para manejar el inicio de sesión
function iniciarSesion() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si el usuario existe y si la contraseña es correcta
    const usuarioEncontrado = usuariosRegistrados.find(usuario => usuario.username === username && usuario.password === password);

    if (usuarioEncontrado) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentUser', username);
        window.location.href = "perfil.html"; // Redirigir al perfil
    } else {
        alert('Credenciales incorrectas');
    }
}

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

let timer;
let inactivityTime = 600000; // 10 minutos en milisegundos

// Función para resetear el temporizador de inactividad
function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(showInactivityAlert, inactivityTime);
}

// Función para mostrar la alerta de inactividad
function showInactivityAlert() {
    const userResponse = confirm("Su sesión se cerrará debido a inactividad.");
    if (userResponse) {
        // Aquí puedes cerrar la sesión, por ejemplo, redirigiendo a una página de cierre de sesión
        window.location.href = "index.html";  // Ajusta esto a tu lógica de cierre de sesión
    }
}

// Detectar actividad del usuario (clic, movimiento del mouse, etc.)
document.onmousemove = resetTimer;
document.onkeypress = resetTimer;
document.onclick = resetTimer;
document.ontouchstart = resetTimer;

// Iniciar el temporizador de inactividad al cargar la página
window.onload = resetTimer;
