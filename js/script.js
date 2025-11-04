// Detecta si estamos en login.html o index.html y actúa según corresponda

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // LOGIN PAGE
  if (path.includes("login.html")) {
    const form = document.querySelector("#login-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.querySelector("#username").value.trim();
      const pass = document.querySelector("#password").value.trim();

      if (user === "admin" && pass === "umbra1998") {
        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = 0;
        setTimeout(() => (window.location.href = "index.html"), 800);
      } else {
        alert("ACCESO DENEGADO");
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 600);
      }
    });
  }

  // INDEX PAGE
  if (path.includes("index.html")) {
    const intro = document.querySelector("#intro-text");
    const content = document.querySelector("#content");
    const date = document.querySelector("#date");
    if (date) {
      const now = new Date();
      date.textContent = now.toLocaleString();
    }

    const lines = [
      ">> Iniciando transmisión UMBRA...",
      ">> Cargando módulos de seguridad...",
      ">> Acceso verificado: ADMIN",
      ">> Bienvenido al sistema.",
      "",
    ];

    let i = 0;

    function typeLine() {
      if (i < lines.length) {
        intro.textContent += lines[i] + "\n";
        i++;
        setTimeout(typeLine, 800);
      } else {
        intro.classList.remove("typewriter");
        content.classList.remove("hidden");
      }
    }

    typeLine();
  }
});
