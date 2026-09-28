/* ============================================================
   MODAL — abrir/fechar (delegação de evento, mesmo motivo acima)
   ============================================================ */
window.App = window.App || {};

App.initModal = function () {
    document.addEventListener("click", function (e) {
        const botaoAbrir = e.target.closest("[data-modal-open]");
        if (botaoAbrir) {
            const modal = document.getElementById(botaoAbrir.getAttribute("data-modal-open"));
            if (modal) {
                modal.classList.add("is-open");
                modal.setAttribute("aria-hidden", "false");
            }
            return;
        }

        const botaoFechar = e.target.closest("[data-modal-close]");
        if (botaoFechar) {
            const modal = botaoFechar.closest(".modal-overlay");
            if (modal) {
                modal.classList.remove("is-open");
                modal.setAttribute("aria-hidden", "true");
            }
            return;
        }

        if (e.target.classList.contains("modal-overlay")) {
            e.target.classList.remove("is-open");
            e.target.setAttribute("aria-hidden", "true");
        }
    });
};
