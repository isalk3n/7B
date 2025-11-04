document.addEventListener('DOMContentLoaded', () => {
    const warning = document.querySelector('.footer');

    // Simula un parpadeo glitch del texto
    setInterval(() => {
        warning.style.visibility = (warning.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }, 600);

    // Pequeño efecto de sonido o interferencia (si deseas agregar más)
    console.log("⚠️ ADVERTENCIA: EL REGISTRO ESTÁ ACTIVO ⚠️");
});
