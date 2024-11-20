let carId = 0;
const carTable = document.getElementById('carTable');

// Função para adicionar um carro
function addCar() {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const cor = document.getElementById('cor').value;
    const combustivel = document.getElementById('combustivel').value;

    if (!marca || !modelo || !ano || !cor || !combustivel) {
        alert('Preencha todos os campos!');
        return;
    }

    carId++;
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', carId);
    newRow.innerHTML = `
        <td>${carId}</td>
        <td>${marca}</td>
        <td>${modelo}</td>
        <td>${ano}</td>
        <td>${cor}</td>
        <td>${combustivel}</td>
        <td>
            <button onclick="editCar(${carId})">Editar</button>
            <button onclick="deleteCar(${carId})">Excluir</button>
        </td>
    `;
    carTable.appendChild(newRow);

    // Limpar os campos do formulário
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('ano').value = '';
    document.getElementById('cor').value = '';
    document.getElementById('combustivel').value = '';
}

// Função para editar um carro
function editCar(id) {
    const row = document.querySelector(`tr[data-id='${id}']`);
    const cells = row.querySelectorAll('td');

    const marca = prompt('Editar Marca:', cells[1].innerText);
    const modelo = prompt('Editar Modelo:', cells[2].innerText);
    const ano = prompt('Editar Ano:', cells[3].innerText);
    const cor = prompt('Editar Cor:', cells[4].innerText);
    const combustivel = prompt('Editar Combustível:', cells[5].innerText);

    if (marca && modelo && ano && cor && combustivel) {
        cells[1].innerText = marca;
        cells[2].innerText = modelo;
        cells[3].innerText = ano;
        cells[4].innerText = cor;
        cells[5].innerText = combustivel;
    } else {
        alert('Todos os campos devem ser preenchidos!');
    }
}

// Função para excluir um carro
function deleteCar(id) {
    const row = document.querySelector(`tr[data-id='${id}']`);
    carTable.removeChild(row);
}
