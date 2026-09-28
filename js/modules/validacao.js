/* ============================================================
   VALIDAÇÃO — verificação de consistência com feedback no DOM
   ============================================================ */
window.App = window.App || {};

const regras = {
    nome: { regex: /^.{3,}$/, mensagem: "Digite seu nome completo (mínimo 3 caracteres)." },
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, mensagem: "Digite um e-mail válido." },
    nascimento: { regex: /^\d{4}-\d{2}-\d{2}$/, mensagem: "Selecione uma data de nascimento válida." },
    cpf: { regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, mensagem: "CPF incompleto. Formato esperado: 000.000.000-00." },
    telefone: { regex: /^\(\d{2}\) \d{4,5}-\d{4}$/, mensagem: "Telefone incompleto. Formato esperado: (00) 00000-0000." },
    cep: { regex: /^\d{5}-\d{3}$/, mensagem: "CEP incompleto. Formato esperado: 00000-000." },
    rua: { regex: /^.{3,}$/, mensagem: "Digite o nome da rua." },
    cidade: { regex: /^.{2,}$/, mensagem: "Digite o nome da cidade." },
    estado: { regex: /^[A-Z]{2}$/, mensagem: "Selecione um estado." }
};

function limparErro(campo) {
    campo.classList.remove("campo-invalido", "campo-valido");
    campo.removeAttribute("aria-invalid");
    campo.removeAttribute("aria-describedby");
    const erroExistente = campo.parentElement.querySelector(".campo-erro");
    if (erroExistente) erroExistente.remove();
}

function marcarErro(campo, mensagem) {
    limparErro(campo);
    campo.classList.add("campo-invalido");

    /* aria-invalid avisa o leitor de tela que o campo está com erro.
       aria-describedby liga o campo ao texto do erro pelo id — sem
       isso, um usuário de leitor de tela nunca ouviria a mensagem,
       porque ela só aparece "visualmente" ao lado do campo. */
    const idErro = campo.id + "-erro";
    campo.setAttribute("aria-invalid", "true");
    campo.setAttribute("aria-describedby", idErro);

    const span = document.createElement("span");
    span.className = "campo-erro";
    span.id = idErro;
    span.setAttribute("role", "alert");
    span.textContent = mensagem;
    campo.insertAdjacentElement("afterend", span);
}

function validarCampo(campo) {
    const regra = regras[campo.id];
    if (!regra) return true;

    if (!regra.regex.test(campo.value.trim())) {
        marcarErro(campo, regra.mensagem);
        return false;
    }

    limparErro(campo);
    campo.classList.add("campo-valido");
    campo.setAttribute("aria-invalid", "false");
    return true;
}

App.limparValidacaoFormulario = function () {
    Object.keys(regras).forEach(function (id) {
        const campo = document.getElementById(id);
        if (campo) limparErro(campo);
    });
};

App.initValidacao = function () {
    /* Valida um campo assim que o usuário sai dele (evento "blur").
       "blur" não borbulha, por isso o listener precisa ficar na
       fase de CAPTURA (terceiro parâmetro "true"). */
    document.addEventListener("blur", function (e) {
        if (regras[e.target.id]) {
            validarCampo(e.target);
        }
    }, true);

    /* Valida tudo de novo na submissão — roda em fase de captura
       para poder BLOQUEAR o listener de toast (que fica na fase
       de bolha) caso algum campo esteja inválido. */
    document.addEventListener("submit", function (e) {
        if (e.target.id !== "form-cadastro") return;

        let formularioValido = true;
        let primeiroCampoInvalido = null;

        Object.keys(regras).forEach(function (id) {
            const campo = document.getElementById(id);
            if (!campo) return;
            if (!validarCampo(campo)) {
                formularioValido = false;
                if (!primeiroCampoInvalido) primeiroCampoInvalido = campo;
            }
        });

        if (!formularioValido) {
            e.preventDefault();
            e.stopImmediatePropagation();
            primeiroCampoInvalido.focus();
            App.mostrarToast("Corrija os campos destacados em vermelho antes de enviar.");
        }
    }, true);

    /* Limpa todo o estado visual de validação quando o botão
       "Limpar" (type="reset") é clicado. */
    document.addEventListener("reset", function (e) {
        if (e.target.id === "form-cadastro") {
            App.limparValidacaoFormulario();
        }
    });
};
