const API_URL = "/api/cars";
let editingCarId = null; // Armazena o ID do carro que está sendo editado

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
                    <button onclick="editCar(${car.id})">Editar</button>
                    <button onclick="deleteCar(${car.id})">Excluir</button>
                </td>
            `;
            carTable.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar carros:", error);
        alert("Erro ao carregar a lista de carros.");
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
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCar)
        });

        if (!response.ok) throw new Error("Erro ao adicionar carro");

        alert("Carro adicionado com sucesso!");
        loadCars(); // Atualiza a tabela
        clearForm();
    } catch (error) {
        console.error("Erro ao adicionar carro:", error);
        alert("Erro ao adicionar carro.");
    }
}

// Preenche o formulário para edição de carro
async function editCar(id) {
    const row = document.querySelector(`tr[data-id='${id}']`);

    // Preenche os campos do formulário com os dados do carro
    document.getElementById("marca").value = row.children[1].innerText;
    document.getElementById("modelo").value = row.children[2].innerText;
    document.getElementById("ano").value = row.children[3].innerText;
    document.getElementById("cor").value = row.children[4].innerText;
    document.getElementById("combustivel").value = row.children[5].innerText;

    // Armazena o ID do carro sendo editado
    editingCarId = id;

    // Alterna os botões de adicionar e salvar
    document.getElementById("addCarButton").style.display = "none";
    document.getElementById("saveCarButton").style.display = "inline-block";
}

// Salva as alterações de um carro editado
async function saveCar() {
    if (!editingCarId) {
        alert("Nenhum carro está sendo editado!");
        return;
    }

    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const ano = parseInt(document.getElementById("ano").value);
    const cor = document.getElementById("cor").value;
    const combustivel = document.getElementById("combustivel").value;

    if (!marca || !modelo || !ano || !cor || !combustivel) {
        alert("Preencha todos os campos!");
        return;
    }

    const updatedCar = { marca, modelo, ano, cor, combustivel };

    try {
        const response = await fetch(`${API_URL}/${editingCarId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCar)
        });

        if (!response.ok) throw new Error("Erro ao salvar alterações");

        alert("Carro atualizado com sucesso!");
        loadCars(); // Atualiza a tabela
        clearForm();
        toggleButtons(); // Alterna os botões para adicionar
    } catch (error) {
        console.error("Erro ao salvar alterações:", error);
        alert("Erro ao salvar alterações.");
    }
}

// Função para excluir um carro
async function deleteCar(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (response.ok) {
        loadCars(); // Atualiza a tabela
        alert("Carro excluído com sucesso!");
        loadCars(); // Atualiza a tabela
    } catch (error) {
        console.error("Erro ao excluir carro:", error);
        alert("Erro ao excluir carro.");
    }
}

// Limpa o formulário
function clearForm() {
    document.getElementById("carForm").reset();
    editingCarId = null;
}

// Alterna os botões entre adicionar e salvar
function toggleButtons() {
    document.getElementById("addCarButton").style.display = "inline-block";
    document.getElementById("saveCarButton").style.display = "none";
}