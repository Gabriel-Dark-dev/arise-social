/* ============================================================
   NAV — botão hambúrguer (o header nunca é recriado pela SPA,
   então aqui pode ser um listener direto, sem delegação)
   ============================================================ */
window.App = window.App || {};

App.initMenuToggle = function () {
    const botao = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");

    if (botao && menu) {
        botao.addEventListener("click", function () {
            const aberto = menu.classList.toggle("is-open");
            botao.setAttribute("aria-expanded", aberto);
        });

        menu.addEventListener("click", function (e) {
            if (e.target.tagName === "A" && !e.target.closest(".has-dropdown")) {
                menu.classList.remove("is-open");
            }
        });
    }
};
