document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});
