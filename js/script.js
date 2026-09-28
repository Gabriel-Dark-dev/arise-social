/* ===== Menu mobile (hambúrguer) ===== */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        const aberto = navMenu.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", aberto);
    });
}

/* ===== Máscara de CPF ===== */
const campoCpf = document.getElementById("cpf");
if (campoCpf) {
    campoCpf.addEventListener("input", function () {
        let valor = campoCpf.value;
        valor = valor.replace(/\D/g, "");
        valor = valor.slice(0, 11);
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        campoCpf.value = valor;
    });
}

/* ===== Máscara de Telefone ===== */
const campoTelefone = document.getElementById("telefone");
if (campoTelefone) {
    campoTelefone.addEventListener("input", function () {
        let valor = campoTelefone.value;
        valor = valor.replace(/\D/g, "");
        valor = valor.slice(0, 11);
        valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
        campoTelefone.value = valor;
    });
}

/* ===== Máscara de CEP ===== */
const campoCep = document.getElementById("cep");
if (campoCep) {
    campoCep.addEventListener("input", function () {
        let valor = campoCep.value;
        valor = valor.replace(/\D/g, "");
        valor = valor.slice(0, 8);
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
        campoCep.value = valor;
    });
}

/* ===== Modal ===== */
document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
        const modal = document.getElementById(btn.getAttribute("data-modal-open"));
        if (modal) {
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
        }
    });
});

document.querySelectorAll("[data-modal-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
        const modal = btn.closest(".modal-overlay");
        if (modal) {
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
        }
    });
});

document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            overlay.classList.remove("is-open");
            overlay.setAttribute("aria-hidden", "true");
        }
    });
});

/* ===== Toast ===== */
function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = mensagem;
    toast.classList.add("is-visible");
    setTimeout(function () {
        toast.classList.remove("is-visible");
    }, 3500);
}

const formCadastro = document.querySelector("form");
if (formCadastro && document.getElementById("toast")) {
    formCadastro.addEventListener("submit", function (e) {
        e.preventDefault();
        mostrarToast("Cadastro enviado com sucesso! Entraremos em contato em breve.");
    });
}
