// Función para mostrar la sección seleccionada
function showSection(sectionId) {
    // Oculta todas las secciones de contenido principal
    document.querySelectorAll('.content').forEach(section => {
        section.classList.add('hidden');
    });

    // Muestra la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}

// Mostrar la sección "Panel" por defecto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');
});

// Función para abrir la ventana modal y cargar los datos del estudiante
function abrirModal(id, nombre, usuario, email, fechaNacimiento) {
    const modal = document.getElementById("modal-editar");
    if (modal) {
        modal.style.display = "flex"; // Muestra el modal

        // Asigna los valores a los campos del formulario
        document.getElementById("edit-id").value = id;
        document.getElementById("edit-nombre_completo").value = nombre;
        document.getElementById("edit-usuario").value = usuario;
        document.getElementById("edit-email").value = email;

        // Formatea correctamente la fecha para el input de tipo "date"
        const formattedDate = new Date(fechaNacimiento).toISOString().split("T")[0];
        document.getElementById("edit-fecha_nacimiento").value = formattedDate;
    }
}

// Función para cerrar la ventana modal de edición de estudiantes
function cerrarModal() {
    const modal = document.getElementById("modal-editar");
    if (modal) {
        modal.style.display = "none"; // Oculta el modal
    }
}

// Función para abrir el modal con la información del curso
function abrirModalCurso(id, nombre, descripcion, fechaInicio, fechaCierre, profesor) {
    const modal = document.getElementById("modal-editar-curso");
    if (modal) {
        modal.style.display = "flex"; // Muestra el modal

        // Asigna los valores a los campos del formulario
        document.getElementById("curso-id").value = id;
        document.getElementById("curso-nombre").value = nombre;
        document.getElementById("curso-descripcion").value = descripcion;
        document.getElementById("curso-profesor").value = profesor;

        // Formatea las fechas correctamente para los inputs de tipo "date"
        const formattedStartDate = new Date(fechaInicio).toISOString().split("T")[0];
        const formattedEndDate = new Date(fechaCierre).toISOString().split("T")[0];

        document.getElementById("curso-fecha-inicio").value = formattedStartDate;
        document.getElementById("curso-fecha-cierre").value = formattedEndDate;
    }
}

// Función para cerrar la ventana modal de edición de cursos
function cerrarModalCurso() {
    const modal = document.getElementById("modal-editar-curso");
    if (modal) {
        modal.style.display = "none"; // Oculta el modal
    }
}

// Función para abrir el modal de agregar curso
function abrirModalAgregarCurso() {
    const modal = document.getElementById('modal-agregar-curso');
    modal.classList.remove('hidden');
}

// Cerrar el modal de agregar curso
function cerrarModalAgregarCurso() {
    const modal = document.getElementById('modal-agregar-curso');
    modal.classList.add('hidden');
}

// Validación del formulario de agregar curso
document.getElementById('form-agregar-curso').addEventListener('submit', function (event) {
    // Captura los valores de los campos del formulario
    const nombre = document.querySelector('input[name="nombre"]').value;
    const descripcion = document.querySelector('textarea[name="descripcion"]').value;
    const fechaInicio = document.querySelector('input[name="fecha_inicio"]').value;
    const fechaCierre = document.querySelector('input[name="fecha_cierre"]').value;
    const profesor = document.querySelector('input[name="profesor"]').value;

    // Validaciones básicas
    if (!nombre || !descripcion || !fechaInicio || !fechaCierre || !profesor) {
        event.preventDefault(); // Evita el envío del formulario
        alert('Todos los campos son obligatorios');
        return;
    }

    // Validación de fechas
    if (new Date(fechaInicio) > new Date(fechaCierre)) {
        event.preventDefault();
        alert('La fecha de inicio no puede ser mayor a la fecha de cierre');
        return;
    }
});
