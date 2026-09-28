/* ============================================================
   ROUTER — sistema base de navegação SPA (baseado em hash: #/...)
   ============================================================ */
window.App = window.App || {};

const rotas = {
    "/": function () { return App.renderHome(); },
    "": function () { return App.renderHome(); },
    "/projetos": function () { return App.renderProjetos(); },
    "/cadastro": function () { return App.renderCadastro(); }
};

function renderRota() {
    const app = document.getElementById("app");
    const caminho = window.location.hash.replace("#", "") || "/";
    const gerarTemplate = rotas[caminho] || rotas["/"];

    app.innerHTML = gerarTemplate();
    atualizarLinkAtivo(caminho);
    window.scrollTo(0, 0);
}

function atualizarLinkAtivo(caminho) {
    document.querySelectorAll("[data-route]").forEach(function (link) {
        const rotaDoLink = link.getAttribute("href").replace("#", "") || "/";
        link.classList.toggle("active", rotaDoLink === caminho);
    });
}

App.initRouter = function () {
    window.addEventListener("hashchange", renderRota);
    renderRota();
};
