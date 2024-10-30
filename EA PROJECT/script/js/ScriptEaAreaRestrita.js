
const clientsPerPage = 10;
let currentPage = 1;
let totalClients = 0;
let totalPages = 1;

// Mostrar formulário de adicionar cliente
document.querySelector('.add-client-btn').addEventListener('click', function() {
    document.querySelector('.form-section').style.display = 'block';
});

// Função para adicionar um cliente
function addClient() {
    const clientName = document.getElementById('client-name').value;
    const lastVisit = document.getElementById('last-visit').value;

    if (clientName && lastVisit) {
        totalClients++;
        if (totalClients % clientsPerPage === 1 && totalClients > 1) {
            // Se o número total de clientes exceder o limite por página, cria uma nova página
            totalPages++;
            createNewPage(totalPages);
        }

        const clientListId = `client-list-${totalPages}`;
        const clientList = document.getElementById(clientListId);
        const newClient = document.createElement('li');

        newClient.innerHTML = `
            <div class="client-info">
                <span>Cliente: ${clientName}</span>
                <span>Data de Cadastro: ${lastVisit}</span>
            </div>
            <div class="btns">
                <a href="#" class="btn-detalhes">Ver Histórico</a>
                <a href="javascript:void(0)" class="btn-remover" onclick="removeClient(this)">Remover</a>
            </div>
            <div class="procedure-section">
                <select id="procedure-${totalClients}">
                    <option value="">Selecione um Procedimento</option>
                    <option value="Limpeza de pele">Limpeza de pele</option>
                    <option value="Micro agulhamento">Micro agulhamento</option>
                    <option value="Dermaplene">Dermaplene</option>
                    <option value="Pilin de diamante">Pilin de diamante</option>
                    <option value="Drenagem linfática fácil">Drenagem linfática fácil</option>
                    <option value="Drenagem linfática">Drenagem linfática</option>
                    <option value="Massagem relaxante">Massagem relaxante</option>
                    <option value="Massagem modeladora">Massagem modeladora</option>
                    <option value="Pumpin">Pumpin</option>
                    <option value="Fortalecimento muscular">Fortalecimento muscular</option>
                    <option value="Tratamento de flacidez">Tratamento de flacidez</option>
                    <option value="Tratamento de estrias">Tratamento de estrias</option>
                    <option value="Manicure">Manicure</option>
                    <option value="Pedicure">Pedicure</option>
                    <option value="Spa dos pés">Spa dos pés</option>
                    <option value="Plástica dos pés">Plástica dos pés</option>
                    <option value="Designer de sombrancelha">Designer de sombrancelha</option>
                </select>
                <button onclick="addProcedure(${totalClients})">Adicionar</button>
                <ul class="procedure-list" id="procedure-list-${totalClients}"></ul>
            </div>
        `;

        clientList.appendChild(newClient);
        document.querySelector('.form-section').style.display = 'none';
        document.getElementById('client-name').value = '';
        document.getElementById('last-visit').value = '';
    }
}

// Função para criar uma nova página de clientes
function createNewPage(pageNumber) {
    // Cria uma nova lista de clientes para a nova página
    const newPage = document.createElement('div');
    newPage.classList.add('page');
    newPage.id = `page-${pageNumber}`;
    newPage.innerHTML = `<ul class="fidelidade-list" id="client-list-${pageNumber}"></ul>`;
    document.getElementById('pages-container').appendChild(newPage);

    // Cria um novo botão de navegação para a nova página
    const pagination = document.getElementById('pagination');
    const newButton = document.createElement('button');
    newButton.textContent = `Página ${pageNumber}`;
    newButton.onclick = () => changePage(pageNumber);
    pagination.appendChild(newButton);
}

// Função para trocar de página
function changePage(pageNumber) {
    // Esconde todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Mostra apenas a página selecionada
    document.getElementById(`page-${pageNumber}`).classList.add('active');

    // Atualiza o botão de navegação ativo
    const pageButtons = document.querySelectorAll('.pagination button');
    pageButtons.forEach(button => button.classList.remove('active'));
    pageButtons[pageNumber - 1].classList.add('active');
}

// Função para remover um cliente
function removeClient(element) {
    const client = element.closest('li');
    client.remove();
    totalClients--;
}

// Função para adicionar procedimento ao cliente
function addProcedure(clientId) {
    const procedureSelect = document.getElementById(`procedure-${clientId}`);
    const procedureList = document.getElementById(`procedure-list-${clientId}`);
    const procedure = procedureSelect.value;

    if (procedure) {
        const newProcedure = document.createElement('li');
        newProcedure.innerHTML = `${procedure} <button class="remove-procedure-btn" onclick="removeProcedure(this)">Remover</button>`;
        procedureList.appendChild(newProcedure);
        procedureSelect.value = ''; // Limpar seleção de procedimento
    }
}

// Função para remover um procedimento
function removeProcedure(element) {
    const procedureItem = element.closest('li');
    procedureItem.remove();
}