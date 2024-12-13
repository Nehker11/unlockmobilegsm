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