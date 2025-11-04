document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    setInterval(() => {
        footer.style.visibility = (footer.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }, 600);

    console.log("⚠️ PROYECTO UMBRA INICIALIZADO ⚠️");
});
