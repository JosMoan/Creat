function addComment() {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();

    if (text !== '') {
        // Crear un nuevo comentario
        const commentsSection = document.querySelector('.comments-section');
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `
            <div class="avatar-icon">
                <i class="bx bxs-user"></i> <!-- Cambiar esta clase según tu librería de íconos -->
            </div>
            <div class="comment-content">
                <p><strong>Tú:</strong> ${text}</p>
            </div>
        `;

        // Añadir el comentario a la sección
        commentsSection.appendChild(newComment);

        // Limpiar el input
        input.value = '';

        // Hacer scroll hacia abajo
        commentsSection.scrollTop = commentsSection.scrollHeight;
    }
}
