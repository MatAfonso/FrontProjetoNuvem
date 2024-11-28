const API_URL = "/api/cars";

// Variável para controlar o estado de edição
let editCarId = null;

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
                <button onclick="startEditCar(${car.id})">Editar</button>
                <button onclick="deleteCar(${car.id})">Excluir</button>
            </td>
        `;
        carTable.appendChild(row);
    });
}

// Gerencia a adição ou edição de um carro
async function handleAddOrEdit() {
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const ano = parseInt(document.getElementById("ano").value);
    const cor = document.getElementById("cor").value;
    const combustivel = document.getElementById("combustivel").value;

    if (!marca || !modelo || !ano || !cor || !combustivel) {
        alert("Preencha todos os campos!");
        return;
    }

    const carData = { marca, modelo, ano, cor, combustivel };

    if (editCarId) {
        // Atualiza carro existente
        const response = await fetch(`${API_URL}/${editCarId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carData)
        });

        if (response.ok) {
            alert("Carro atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar carro!");
        }
        editCarId = null; // Reseta o ID de edição
        document.getElementById("addEditButton").innerText = "Adicionar";
    } else {
        // Adiciona um novo carro
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carData)
        });

        if (response.ok) {
            alert("Carro adicionado com sucesso!");
        } else {
            alert("Erro ao adicionar carro!");
        }
    }

    clearForm();
    loadCars();
}

// Função para iniciar a edição de um carro
function startEditCar(id) {
    const row = document.querySelector(`tr[data-id='${id}']`);
    const marca = row.children[1].innerText;
    const modelo = row.children[2].innerText;
    const ano = row.children[3].innerText;
    const cor = row.children[4].innerText;
    const combustivel = row.children[5].innerText;

    // Preenche o formulário
    document.getElementById("marca").value = marca;
    document.getElementById("modelo").value = modelo;
    document.getElementById("ano").value = ano;
    document.getElementById("cor").value = cor;
    document.getElementById("combustivel").value = combustivel;

    // Ajusta o estado para edição
    editCarId = id;
    document.getElementById("addEditButton").innerText = "Salvar";
}

// Exclui um carro
async function deleteCar(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (response.ok) {
        alert("Carro excluído com sucesso!");
        loadCars();
    } else {
        alert("Erro ao excluir carro!");
    }
}

// Limpa o formulário e reseta o estado
function clearForm() {
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("combustivel").value = "";
    editCarId = null;
    document.getElementById("addEditButton").innerText = "Adicionar";
}