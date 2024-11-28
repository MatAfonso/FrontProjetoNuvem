const API_URL = "/api/cars"; 

// Carrega os carros ao carregar a página
document.addEventListener("DOMContentLoaded", loadCars);

// Função para carregar carros do backend
async function loadCars() {
    const response = await fetch(API_URL);
    const cars = await response.json();

    const carTable = document.getElementById("carTable");
    carTable.innerHTML = ""; // Limpa a tabela

    cars.forEach(car => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", car.id);
        row.innerHTML = `
            <td>${car.id}</td>
            <td>${car.marca}</td>
            <td>${car.modelo}</td>
            <td>${car.ano}</td>
            <td>${car.cor}</td>
            <td>${car.combustivel}</td>
            <td>
                <button onclick="editCar(${car.id})">Editar</button>
                <button onclick="deleteCar(${car.id})">Excluir</button>
            </td>
        `;
        carTable.appendChild(row);
    });
}

// Adiciona um novo carro
async function addCar() {
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const ano = parseInt(document.getElementById("ano").value);
    const cor = document.getElementById("cor").value;
    const combustivel = document.getElementById("combustivel").value;

    if (!marca || !modelo || !ano || !cor || !combustivel) {
        alert("Preencha todos os campos!");
        return;
    }

    const newCar = { marca, modelo, ano, cor, combustivel };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar)
    });

    if (response.ok) {
        loadCars(); // Atualiza a tabela
        alert("Carro adicionado com sucesso!");
    } else {
        alert("Erro ao adicionar carro!");
    }
}

// Edita um carro
async function editCar(id) {
    const row = document.querySelector(`tr[data-id='${id}']`);
    const marca = prompt("Editar Marca:", row.children[1].innerText);
    const modelo = prompt("Editar Modelo:", row.children[2].innerText);
    const ano = prompt("Editar Ano:", row.children[3].innerText);
    const cor = prompt("Editar Cor:", row.children[4].innerText);
    const combustivel = prompt("Editar Combustível:", row.children[5].innerText);

    if (marca && modelo && ano && cor && combustivel) {
        const updatedCar = { id, marca, modelo, ano: parseInt(ano), cor, combustivel };

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCar)
        });

        if (response.ok) {
            loadCars(); // Atualiza a tabela
            alert("Carro atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar carro!");
        }
    } else {
        alert("Todos os campos devem ser preenchidos!");
    }
}

// Exclui um carro
async function deleteCar(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (response.ok) {
        loadCars(); // Atualiza a tabela
        alert("Carro excluído com sucesso!");
    } else {
        alert("Erro ao excluir carro!");
    }
}
