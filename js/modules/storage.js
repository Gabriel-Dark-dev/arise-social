/* ============================================================
   STORAGE — persistência dos cadastros via localStorage
   ============================================================ */
window.App = window.App || {};

const CHAVE_CADASTROS = "ariseSocial_cadastros";

/* Lê o formulário e converte num objeto JavaScript simples.
   FormData lida automaticamente com campos de múltiplos valores
   (como os checkboxes de "áreas de interesse", que compartilham
   o mesmo name="areas"), agrupando-os num array. */
App.coletarDadosFormulario = function (form) {
    const formData = new FormData(form);
    const dados = {};

    formData.forEach(function (valor, chave) {
        if (dados[chave] === undefined) {
            dados[chave] = valor;
        } else if (Array.isArray(dados[chave])) {
            dados[chave].push(valor);
        } else {
            dados[chave] = [dados[chave], valor];
        }
    });

    dados.enviadoEm = new Date().toISOString();
    return dados;
};

/* Grava (set): converte o array inteiro de cadastros para string
   com JSON.stringify, porque localStorage só aceita strings. */
App.salvarCadastro = function (dadosCadastro) {
    const listaAtual = App.obterCadastros();
    listaAtual.push(dadosCadastro);
    localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(listaAtual));
};

/* Recupera (get): lê a string salva e converte de volta pra
   array/objeto JavaScript com JSON.parse. Se nunca houve nada
   salvo (ou o valor estiver corrompido), retorna array vazio
   em vez de quebrar a aplicação. */
App.obterCadastros = function () {
    const bruto = localStorage.getItem(CHAVE_CADASTROS);
    if (!bruto) return [];

    try {
        const dados = JSON.parse(bruto);
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        return [];
    }
};
