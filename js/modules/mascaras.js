/* ============================================================
   MÁSCARAS — CPF, Telefone, CEP
   Usa "delegação de evento": o listener fica no document (que
   nunca é destruído), e verifica QUAL campo disparou o evento.
   Isso é essencial numa SPA, porque os campos do formulário só
   existem depois que a rota /cadastro é renderizada — um
   getElementById direto, feito antes disso, encontraria null.
   ============================================================ */
window.App = window.App || {};

App.initMascaras = function () {
    document.addEventListener("input", function (e) {
        if (e.target.id === "cpf") {
            let v = e.target.value.replace(/\D/g, "").slice(0, 11);
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = v;
        }

        if (e.target.id === "telefone") {
            let bruto = e.target.value.replace(/\D/g, "").slice(0, 11);
            let v = bruto.replace(/^(\d{2})(\d)/, "($1) $2");

            if (bruto.length > 10) {
                /* Celular: DDD + 9 dígitos → (00) 00000-0000 */
                v = v.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
            } else {
                /* Fixo: DDD + 8 dígitos → (00) 0000-0000 */
                v = v.replace(/(\d{4})(\d{1,4})$/, "$1-$2");
            }

            e.target.value = v;
        }

        if (e.target.id === "cep") {
            let v = e.target.value.replace(/\D/g, "").slice(0, 8);
            v = v.replace(/(\d{5})(\d)/, "$1-$2");
            e.target.value = v;
        }
    });
};
