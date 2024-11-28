const API_URL = "/api/cars";

// Variável para controlar o estado de edição
let editCarId = null;

// Carrega os carros ao carregar a página
document.addEventListener("DOMContentLoaded", loadCars);

// Função para carregar carros do backend
async function loadCars() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao carregar carros");

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
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar carros!");
    }
}

// Função para gerenciar adição ou edição de carro
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

    try {
        if (editCarId) {
            // Atualiza carro existente
            const response = await fetch(`${API_URL}/${editCarId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(carData)
            });

            if (!response.ok) throw new Error("Erro ao atualizar carro");
            alert("Carro atualizado com sucesso!");
            editCarId = null; // Reseta o estado de edição
            document.getElementById("addEditButton").innerText = "Adicionar";
        } else {
            // Adiciona novo carro
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(carData)
            });

            if (!response.ok) throw new Error("Erro ao adicionar carro");
            alert("Carro adicionado com sucesso!");
        }

        clearForm();
        loadCars();
    } catch (error) {
        console.error(error);
        alert("Erro ao salvar o carro!");
    }
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

// Função para excluir um carro
async function deleteCar(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erro ao excluir carro");

        alert("Carro excluído com sucesso!");
        loadCars();
    } catch (error) {
        console.error(error);
        alert("Erro ao excluir o carro!");
    }
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("combustivel").value = "";
    editCarId = null;
    document.getElementById("addEditButton").innerText = "Adicionar";
}