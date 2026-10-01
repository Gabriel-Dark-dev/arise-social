/* ============================================================
   THEME — alternância manual de dark mode, persistida
   ============================================================ */
window.App = window.App || {};

const CHAVE_TEMA = "ariseSocial_tema";

function aplicarTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    const botao = document.querySelector(".theme-toggle");
    if (botao) {
        botao.textContent = tema === "dark" ? "☀️ Claro" : "🌙 Escuro";
        botao.setAttribute("aria-pressed", tema === "dark");
    }
}

App.initTema = function () {
    /* Se o usuário já escolheu antes, essa escolha manda.
       Senão, deixamos a cargo do @media (prefers-color-scheme)
       no CSS, sem forçar nada aqui. */
    const temaSalvo = localStorage.getItem(CHAVE_TEMA);
    if (temaSalvo) aplicarTema(temaSalvo);

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".theme-toggle")) return;

        const atual = document.documentElement.getAttribute("data-theme");
        const prefereEscuroPorPadrao = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const estaEscuroAgora = atual ? atual === "dark" : prefereEscuroPorPadrao;

        const novoTema = estaEscuroAgora ? "light" : "dark";
        localStorage.setItem(CHAVE_TEMA, novoTema);
        aplicarTema(novoTema);
    });
};
