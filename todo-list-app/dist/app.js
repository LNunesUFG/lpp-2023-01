"use strict";
class Tarefa {
    constructor(id, descricao, status) {
        this.id = id;
        this.descricao = descricao;
        this.status = status;
    }
    get Status() {
        return this.status ? 'Completa' : 'Pendente';
    }
}
class TodoList {
    constructor() {
        this.tarefas = [];
    }
    criarTarefa(id, descricao) {
        let tarefa = new Tarefa(id, descricao, false);
        this.tarefas.push(tarefa);
    }
    atualizarTarefa(id, descricao) {
        const tarefa = todoList.buscarTarefa(id);
        if (tarefa) {
            tarefa.descricao = descricao;
            todoList.removerTarefa(tarefa.id);
            todoList.criarTarefa(tarefa.id, tarefa.descricao);
            todoList.ordernarTarefa();
            renderizarTarefas();
            tarefaEditandoId = null;
        }
        else
            alert("Tarefa não encontrada.");
    }
    buscarTarefa(id) {
        let tarefaBuscada = this.tarefas.find(tarefa => tarefa.id === id);
        return tarefaBuscada ? tarefaBuscada : "Tarefa não encontrada.";
    }
    buscarIndiceTarefa(id) {
        return this.tarefas.findIndex(tarefa => tarefa.id === id);
    }
    removerTarefa(id) {
        let indiceTarefaArray = this.buscarIndiceTarefa(id);
        this.tarefas.splice(indiceTarefaArray, 1);
    }
    listarTodasTarefas() {
        this.tarefas.forEach(tarefa => console.log(tarefa));
    }
    listarTarefaEspecifica(id) {
        let tarefa = this.buscarTarefa(id);
        console.log(tarefa);
    }
    setTarefaConcluida(id) {
        let tarefa = this.buscarTarefa(id);
        tarefa.status = true;
    }
    editarTarefa(id, descricao) {
        let tarefa = this.buscarTarefa(id);
        tarefa.descricao = descricao;
    }
    ordernarTarefa() {
        this.tarefas.sort();
    }
    ordenarTarefasConcluidas() {
        this.tarefas.sort((a, b) => {
            if (a.status === b.status) {
                return a.id - b.id;
            }
            return a.status ? -1 : 1;
        });
    }
    ordenarTarefasPendentes() {
        this.tarefas.sort((a, b) => {
            if (a.status === b.status) {
                return a.id - b.id;
            }
            return a.status ? 1 : -1;
        });
    }
    filtrarTarefasPorEstado(status) {
        return this.tarefas.filter((tarefa) => tarefa.status === status);
    }
    buscarUltimoId() {
        if (this.tarefas.length != 0) {
            let tarefa = this.tarefas.reduce((prev, current) => {
                return prev.id > current.id ? prev : current;
            });
            return tarefa.id;
        }
        return 0;
    }
    criarNovoId() {
        return this.buscarUltimoId() + 1;
    }
}
let todoList = new TodoList();
let tarefaEditandoId = null;
let ordenamentoAtual = "";
function novoElemento() {
    const inputElement = document.getElementById("inputTarefa");
    const inputValor = inputElement.value.trim();
    if (tarefaEditandoId !== null) {
        todoList.atualizarTarefa(tarefaEditandoId, inputValor);
        tarefaEditandoId = null;
    }
    else {
        if (inputValor === "") {
            alert("Insira uma tarefa para adicionar!");
            return;
        }
        const id = todoList.criarNovoId();
        todoList.criarTarefa(id, inputValor);
        renderizarTarefas();
    }
    inputElement.value = "";
}
function preencherInputComDescricaoAtual() {
    const tarefaEditando = tarefaEditandoId ? todoList.buscarTarefa(tarefaEditandoId) : null;
    const inputElement = document.getElementById("inputTarefa");
    if (tarefaEditando && inputElement) {
        inputElement.value = tarefaEditando.descricao;
        console.log('a');
    }
}
function imprimirTarefa(tarefa) {
    const tableBody = document.getElementById("taskTableBody");
    const newRow = tableBody.insertRow(-1);
    const cellId = newRow.insertCell(0);
    const cellDescription = newRow.insertCell(1);
    const cellStatus = newRow.insertCell(2);
    const cellActions = newRow.insertCell(3);
    const radioConcluidas = document.getElementById("radioConcluidas");
    const radioPendentes = document.getElementById("radioPendentes");
    radioConcluidas.checked = ordenamentoAtual === "concluidas";
    radioPendentes.checked = ordenamentoAtual === "pendentes";
    cellId.textContent = tarefa.id.toString();
    cellDescription.textContent = tarefa.descricao;
    cellStatus.textContent = tarefa.Status;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.className = "btn btn-danger";
    deleteButton.addEventListener("click", function () {
        todoList.removerTarefa(tarefa.id);
        renderizarTarefas();
    });
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "btn btn-warning ms-1";
    editButton.addEventListener("click", function () {
        tarefaEditandoId = tarefa.id;
        preencherInputComDescricaoAtual();
    });
    const completeButton = document.createElement("button");
    completeButton.textContent = "Finalizar tarefa";
    completeButton.className = "btn btn-success ms-1";
    completeButton.addEventListener("click", function () {
        if (tarefa.status === false) {
            tarefa.status = true;
            renderizarTarefas();
        }
    });
    cellActions.appendChild(deleteButton);
    cellActions.appendChild(editButton);
    cellActions.appendChild(completeButton);
}
function renderizarTarefas() {
    const tableBody = document.getElementById("taskTableBody");
    tableBody.innerHTML = "";
    todoList.tarefas.forEach((tarefa) => {
        imprimirTarefa(tarefa);
    });
}
function ordenarConcluidas() {
    todoList.ordenarTarefasConcluidas();
    ordenamentoAtual = "concluidas";
    renderizarTarefas();
}
function ordenarPendentes() {
    todoList.ordenarTarefasPendentes();
    ordenamentoAtual = "pendentes";
    renderizarTarefas();
}
function buscarTarefaPorId() {
    const inputBusca = document.getElementById("inputBusca");
    const idTarefa = parseInt(inputBusca.value);
    if (!idTarefa) {
        alert("Digite o código da tarefa.");
        return;
    }
    const tarefaEncontrada = todoList.buscarTarefa(idTarefa);
    if (tarefaEncontrada) {
        const tableBody = document.getElementById("taskTableBody");
        tableBody.innerHTML = "";
        imprimirTarefa(tarefaEncontrada);
    }
    else {
        alert("Tarefa não encontrada.");
    }
}
