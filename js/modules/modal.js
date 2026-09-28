/* ============================================================
   MODAL — abrir/fechar + gerenciamento de foco (WCAG 2.1)
   ============================================================ */
window.App = window.App || {};

let elementoQueAbriuModal = null;

function abrirModal(modal, botaoQueAbriu) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    elementoQueAbriuModal = botaoQueAbriu;

    /* Move o foco pra dentro do modal (no botão de fechar).
       Sem isso, um usuário de leitor de tela ou teclado continuaria
       "focado" no restante da página, sem perceber que um modal
       cobriu a tela — é uma armadilha de contexto perdido. */
    const botaoFechar = modal.querySelector(".modal-close");
    if (botaoFechar) botaoFechar.focus();
}

function fecharModal(modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    /* Devolve o foco pra quem abriu o modal — sem isso, depois de
       fechar, o foco do teclado ficaria "perdido" no topo da página. */
    if (elementoQueAbriuModal) {
        elementoQueAbriuModal.focus();
        elementoQueAbriuModal = null;
    }
}

App.initModal = function () {
    document.addEventListener("click", function (e) {
        const botaoAbrir = e.target.closest("[data-modal-open]");
        if (botaoAbrir) {
            const modal = document.getElementById(botaoAbrir.getAttribute("data-modal-open"));
            if (modal) abrirModal(modal, botaoAbrir);
            return;
        }

        const botaoFechar = e.target.closest("[data-modal-close]");
        if (botaoFechar) {
            const modal = botaoFechar.closest(".modal-overlay");
            if (modal) fecharModal(modal);
            return;
        }

        if (e.target.classList.contains("modal-overlay")) {
            fecharModal(e.target);
        }
    });

    /* Tecla Esc fecha o modal aberto — requisito de acessibilidade
       (WCAG 2.1.2): nenhuma interface pode "prender" o teclado sem
       uma saída óbvia. */
    document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        const modalAberto = document.querySelector(".modal-overlay.is-open");
        if (modalAberto) fecharModal(modalAberto);
    });

    /* Prende o Tab dentro do modal enquanto ele estiver aberto
       (focus trap), pra evitar que o teclado "vaze" pro conteúdo
       coberto atrás do modal. */
    document.addEventListener("keydown", function (e) {
        if (e.key !== "Tab") return;
        const modalAberto = document.querySelector(".modal-overlay.is-open");
        if (!modalAberto) return;

        const focaveis = modalAberto.querySelectorAll("button, a[href], input, textarea, select");
        if (focaveis.length === 0) return;

        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];

        if (e.shiftKey && document.activeElement === primeiro) {
            e.preventDefault();
            ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
            e.preventDefault();
            primeiro.focus();
        }
    });
};
