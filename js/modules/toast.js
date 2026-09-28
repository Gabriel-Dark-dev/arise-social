/* ============================================================
   TOAST — notificação não obstrutiva ao enviar o formulário
   ============================================================ */
window.App = window.App || {};

App.mostrarToast = function (mensagem) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = mensagem;
    toast.classList.add("is-visible");
    setTimeout(function () {
        toast.classList.remove("is-visible");
    }, 3500);
};

App.initToastFormulario = function () {
    document.addEventListener("submit", function (e) {
        if (e.target.id === "form-cadastro") {
            e.preventDefault();

            if (App.coletarDadosFormulario && App.salvarCadastro) {
                const dados = App.coletarDadosFormulario(e.target);
                App.salvarCadastro(dados);
            }

            App.mostrarToast("Cadastro enviado com sucesso! Entraremos em contato em breve.");
            e.target.reset();
            if (App.limparValidacaoFormulario) App.limparValidacaoFormulario();
        }
    });
};
