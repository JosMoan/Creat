document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los elementos
    const fondo = document.querySelector(".fondo");
    const loginLink = document.querySelector(".login-link");
    const registrarLink = document.querySelector(".registro-link");
    const iniciarSesionBtn = document.querySelector(".btn-iniciar-sesion");
    const verCurso = document.querySelectorAll(".btn-curso");
    const iconoCerrar = document.querySelector(".icono-cerrar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section-content");
    const loginForm = document.querySelector(".contenedor-form.login");
    const registerForm = document.querySelector(".contenedor-form.registrar");
    const logoutLink = document.querySelector(".nav-link[href='/logout']");

    // Redireccionar a la página de registro
    if (registrarLink) {
        registrarLink.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = "/registro"; // Usa la ruta definida en el servidor
        });
    }

    // Redireccionar a la página de inicio de sesión
    if (loginLink) {
        loginLink.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = "/login"; // Usa la ruta definida en el servidor
        });
    }

    // Redireccionar a la página de inicio de sesión al hacer clic en el botón de iniciar sesión
    if (iniciarSesionBtn) {
        iniciarSesionBtn.addEventListener("click", () => {
            window.location.href = "/login";
        });
    }
    
    // Redireccionar a la página de cursos al hacer clic en el botón de ver cursos
    verCurso.forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = "/curso";
        });
    });

    // Cerrar el modal de inicio de sesión o registro
    if (iconoCerrar) {
        iconoCerrar.addEventListener("click", () => {
            if (fondo) fondo.classList.remove('active-btn');
            if (loginForm) loginForm.classList.remove('active');
            if (registerForm) registerForm.classList.remove('active');
        });
    }

    // Navegación entre secciones
    if (navLinks && sections) {
        navLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const targetSection = link.getAttribute("data-section");

                // Ocultar todas las secciones y mostrar solo la correspondiente
                sections.forEach(section => {
                    section.classList.remove("active");
                    if (section.id === targetSection) {
                        section.classList.add("active");
                    }
                });
            });
        });
    }

  // Lógica para cerrar sesión
if (logoutLink) {
    logoutLink.addEventListener("click", (event) => { // Cambiado a logoutLink
        event.preventDefault();
        // Hacer una solicitud al servidor para cerrar sesión
        fetch("/logout", {
            method: "GET",
            credentials: "same-origin"
        })
        .then(response => {
            if (response.ok) {
                // Redirigir a la página de inicio después de cerrar sesión en el servidor
                window.location.href = "/";
            } else {
                console.error("Error al cerrar sesión:", response.statusText);
            }
        })
        .catch(error => {
            console.error("Hubo un problema al querer cerrar sesión:", error);
        });
    });
}

    // Lógica para cambiar la paleta de colores según la edad
    const edadUsuario = localStorage.getItem('edadUsuario');
    const dynamicBody = document.body;

    if (window.location.pathname.includes('perfil.html')) {
        if (edadUsuario) {
            const edad = parseInt(edadUsuario);

            if (edad < 13) {
                dynamicBody.classList.add('body-nino');
            } else if (edad >= 13 && edad <= 29) {
                dynamicBody.classList.add('body-joven');
            } else {
                dynamicBody.classList.add('body-adulto');
            }
        } else {
            console.warn("Edad del usuario no encontrada. Asegúrate de haber guardado la edad en localStorage.");
        }
    }

    // --- Lógica para el desplazamiento con flechas ---
    const cursoList = document.querySelector(".curso-list");
    const arrowLeft = document.querySelector(".arrow-left");
    const arrowRight = document.querySelector(".arrow-right");
    let scrollPosition = 0;
    const cursoWidth = 300; // Ajustar el ancho del curso más el margen

    // Función para desplazarse a la izquierda
    function scrollLeft() {
        scrollPosition = Math.max(scrollPosition - cursoWidth, 0);
        cursoList.style.transform = `translateX(-${scrollPosition}px)`;
    }

    // Función para desplazarse a la derecha
    function scrollRight() {
        const maxScroll = cursoList.scrollWidth - cursoList.parentElement.clientWidth;
        scrollPosition = Math.min(scrollPosition + cursoWidth, maxScroll);
        cursoList.style.transform = `translateX(-${scrollPosition}px)`;
    }

    // Añadir eventos de clic a las flechas de desplazamiento
    if (arrowLeft) arrowLeft.addEventListener("click", scrollLeft);
    if (arrowRight) arrowRight.addEventListener("click", scrollRight);
});
