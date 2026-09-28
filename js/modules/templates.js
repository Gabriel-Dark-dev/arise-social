/* ============================================================
   TEMPLATES — geração dinâmica de HTML via JavaScript
   Cada função retorna uma string de HTML (template) que o
   router injeta dentro de <main id="app">.
   ============================================================ */
window.App = window.App || {};

/* Componente reaproveitável: um card de projeto.
   Em vez de repetir o mesmo bloco de HTML 3 vezes, essa função
   recebe os dados e "monta" o card — é reaproveitamento de
   componente na prática. */
function cardProjeto(dados) {
    return `
        <section class="col-4" id="${dados.id}">
            <h3>${dados.titulo} <span class="badge ${dados.badgeClasse}">${dados.badge}</span></h3>
            <img src="../imagens/${dados.imagem}" alt="${dados.alt}">
            <p>${dados.texto}</p>
        </section>
    `;
}

App.renderHome = function () {
    return `
        <div class="hero">
            <img src="../imagens/hero.jpg" alt="Voluntário recuperando um notebook doado">
        </div>
        <div class="grid">
            <section class="col-6">
                <h2>Nossa Missão</h2>
                <p>Recebemos computadores, notebooks e celulares usados, recuperamos os equipamentos e os destinamos gratuitamente a estudantes de baixa renda, pessoas em busca de emprego, escolas e comunidades.</p>
                <button type="button" class="btn-link" data-modal-open="modal-sobre">Saiba mais sobre nossa missão →</button>
            </section>
            <section class="col-6">
                <h2>Como Ajudamos</h2>
                <p>Cada equipamento passa por um processo de recuperação e é entregue com uma história por trás: de "PC que ia para o lixo" a ferramenta de estudo, trabalho e transformação.</p>
            </section>
        </div>
    `;
};

App.renderProjetos = function () {
    const projetos = [
        { id: "recuperacao", titulo: "Recuperação de Equipamentos", badge: "Doação", badgeClasse: "badge-primary", imagem: "recuperacao.jpg", alt: "Técnico consertando um computador doado", texto: "Recebemos computadores, notebooks e celulares usados e passam por um processo completo de higienização, formatação e reparo antes de serem doados." },
        { id: "cursos", titulo: "Cursos Gratuitos de Informática", badge: "Educação", badgeClasse: "badge-secondary", imagem: "cursos.jpg", alt: "Estudantes em aula de informática", texto: "Oferecemos oficinas para quem quer aprender o básico de informática ou dar os primeiros passos em programação." },
        { id: "primeiro-pc", titulo: "Primeiro PC", badge: "Comunidade", badgeClasse: "badge-accent", imagem: "primeiro-pc.jpg", alt: "Criança usando computador pela primeira vez", texto: "Montamos computadores básicos a partir de peças doadas e entregamos a estudantes que nunca tiveram acesso a um computador próprio." }
    ];

    return `
        <h2>Nossos Projetos</h2>
        <div class="grid">
            ${projetos.map(cardProjeto).join("")}
        </div>
    `;
};

App.renderCadastro = function () {
    const cadastrosSalvos = App.obterCadastros ? App.obterCadastros() : [];
    let avisoHistorico = "";

    if (cadastrosSalvos.length > 0) {
        const ultimo = cadastrosSalvos[cadastrosSalvos.length - 1];

        /* Formata a data com Day.js (biblioteca externa via CDN).
           Se por algum motivo a biblioteca não carregar (ex: sem
           internet), caímos de volta no formato nativo do JS. */
        const dataFormatada = (typeof dayjs !== "undefined")
            ? dayjs(ultimo.enviadoEm).locale("pt-br").format("D [de] MMMM [de] YYYY [às] HH:mm")
            : new Date(ultimo.enviadoEm).toLocaleString("pt-BR");

        avisoHistorico = `<div class="alert alert-success">
               <span>✅</span>
               <span>Você já enviou <strong>${cadastrosSalvos.length}</strong> cadastro(s) neste navegador. O mais recente foi de <strong>${ultimo.nome}</strong>, em ${dataFormatada}.</span>
           </div>`;
    }

    return `
        <h2>Faça parte da Arise Social</h2>
        <p>Preencha o formulário para se cadastrar como voluntário ou doador.</p>

        ${avisoHistorico}

        <div class="alert alert-info">
            <span>ℹ️</span>
            <span><strong>Atenção:</strong> preencha corretamente os campos obrigatórios para que possamos entrar em contato com você.</span>
        </div>

        <form id="form-cadastro" action="#" method="post">
            <fieldset>
                <legend>Dados Pessoais</legend>
                <div><label for="nome">Nome Completo:</label><input type="text" id="nome" name="nome" required minlength="3" placeholder=" "></div>
                <div><label for="email">E-mail:</label><input type="email" id="email" name="email" required placeholder=" "></div>
                <div><label for="nascimento">Data de Nascimento:</label><input type="date" id="nascimento" name="nascimento" required placeholder=" "></div>
                <div><label for="cpf">CPF:</label><input type="text" id="cpf" name="cpf" required placeholder=" "></div>
                <div><label for="telefone">Telefone / WhatsApp:</label><input type="tel" id="telefone" name="telefone" required placeholder=" "></div>
            </fieldset>

            <fieldset>
                <legend>Endereço</legend>
                <div><label for="cep">CEP:</label><input type="text" id="cep" name="cep" required placeholder=" "></div>
                <div><label for="rua">Rua / Logradouro:</label><input type="text" id="rua" name="rua" required placeholder=" "></div>
                <div><label for="cidade">Cidade:</label><input type="text" id="cidade" name="cidade" required placeholder=" "></div>
                <div>
                    <label for="estado">Estado:</label>
                    <select id="estado" name="estado" required>
                        <option value="">Selecione o estado</option>
                        <option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option><option value="ES">Espírito Santo</option><option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option><option value="MT">Mato Grosso</option><option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option><option value="PA">Pará</option><option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option><option value="PE">Pernambuco</option><option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option>
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <legend>Como Quer Ajudar</legend>
                <p>Áreas de interesse (pode marcar mais de uma):</p>
                <div class="checkbox-row"><input type="checkbox" id="area1" name="areas" value="doacao-equipamentos"><label for="area1">Doação de Equipamentos (computadores, notebooks, celulares)</label></div>
                <div class="checkbox-row"><input type="checkbox" id="area2" name="areas" value="manutencao"><label for="area2">Manutenção e Reparo Técnico de Equipamentos</label></div>
                <div class="checkbox-row"><input type="checkbox" id="area3" name="areas" value="ensino"><label for="area3">Aulas de Informática / Programação</label></div>
                <div class="checkbox-row"><input type="checkbox" id="area4" name="areas" value="logistica"><label for="area4">Logística e Transporte de Doações</label></div>
                <div class="checkbox-row"><input type="checkbox" id="area5" name="areas" value="comunicacao"><label for="area5">Comunicação e Redes Sociais</label></div>

                <p>Disponibilidade de horário:</p>
                <div class="checkbox-row"><input type="checkbox" id="horario1" name="disponibilidade" value="manha"><label for="horario1">Manhã</label></div>
                <div class="checkbox-row"><input type="checkbox" id="horario2" name="disponibilidade" value="tarde"><label for="horario2">Tarde</label></div>
                <div class="checkbox-row"><input type="checkbox" id="horario3" name="disponibilidade" value="fds"><label for="horario3">Finais de Semana</label></div>

                <div>
                    <label for="mensagem">Mensagem ou Observações:</label><br>
                    <textarea id="mensagem" name="mensagem" rows="4"></textarea>
                </div>
            </fieldset>

            <div class="form-actions">
                <button type="submit">Enviar Cadastro</button>
                <button type="reset">Limpar</button>
            </div>
        </form>
    `;
};
