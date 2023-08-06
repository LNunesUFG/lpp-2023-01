class Tarefa {
	constructor(    
			public id: number,
			public descricao: string,
			public status: boolean
	) { 
	}
	get Status(): string {
		return this.status ? 'Completa' : 'Pendente';
	}

}

class TodoList {
  public tarefas: Array<Tarefa>;

  constructor() {
    this.tarefas = [];
  }


  criarTarefa(id: number, descricao: string) {
    let tarefa: Tarefa = new Tarefa(id, descricao, false);
    this.tarefas.push(tarefa);
  }

  atualizarTarefa(id: number, descricao: string) {
    const tarefa: Tarefa = todoList.buscarTarefa(id);
    if (tarefa) {
      tarefa.descricao = descricao;

      todoList.removerTarefa(tarefa.id);
      todoList.criarTarefa(tarefa.id, tarefa.descricao);
      todoList.ordernarTarefa();

      renderizarTarefas();
      tarefaEditandoId = null; 
    } else 
      alert("Tarefa não encontrada.");
  }

  buscarTarefa(id: number): Tarefa {
    let tarefaBuscada: any = this.tarefas.find(
      tarefa => tarefa.id === id
    );
    return tarefaBuscada ?  tarefaBuscada : "Tarefa não encontrada.";
  }

  private buscarIndiceTarefa(id: number) {
    return this.tarefas.findIndex(
      tarefa => tarefa.id === id
    );
  }

  removerTarefa(id: number) {
   let indiceTarefaArray: number = this.buscarIndiceTarefa(id);

    this.tarefas.splice(indiceTarefaArray, 1);
  }

  listarTodasTarefas() {
    this.tarefas.forEach(
      tarefa => console.log(tarefa)
    );
  }

  listarTarefaEspecifica(id: number) {
    let tarefa: Tarefa = this.buscarTarefa(id);
    console.log(tarefa);
  }

  setTarefaConcluida(id: number) {
    let tarefa: Tarefa = this.buscarTarefa(id);

    tarefa.status = true;
  }

  editarTarefa(id: number, descricao: string) {
    let tarefa: Tarefa = this.buscarTarefa(id);

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

  filtrarTarefasPorEstado(status: boolean): Array<Tarefa> {
    return this.tarefas.filter((tarefa) => tarefa.status === status);
  }

  buscarUltimoId(): number {
    if (this.tarefas.length != 0) {
      let tarefa: Tarefa = this.tarefas.reduce(
        (prev: any, current: any) => { 
          return prev.id > current.id ? prev : current; 
        }
      );
      return tarefa.id;
    }
    return 0;
  }

  criarNovoId() {
    return this.buscarUltimoId() + 1;
  }

}

let todoList = new TodoList();
let tarefaEditandoId: number | null = null;
let ordenamentoAtual = "";

function novoElemento() {
  const inputElement: HTMLInputElement = document.getElementById("inputTarefa") as HTMLInputElement;
  const inputValor: string = inputElement.value.trim();

  if (tarefaEditandoId !== null) {
    todoList.atualizarTarefa(tarefaEditandoId, inputValor);
    tarefaEditandoId = null; 
  } else {
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
  const tarefaEditando: Tarefa | null = tarefaEditandoId ? todoList.buscarTarefa(tarefaEditandoId) : null;
  const inputElement: HTMLInputElement = document.getElementById("inputTarefa") as HTMLInputElement;

  if (tarefaEditando && inputElement) {
    inputElement.value = tarefaEditando.descricao;
    console.log('a')
  }
}

function imprimirTarefa(tarefa: Tarefa) {
  const tableBody = document.getElementById("taskTableBody") as HTMLTableSectionElement;
  const newRow = tableBody.insertRow(-1);

  const cellId = newRow.insertCell(0);
  const cellDescription = newRow.insertCell(1);
  const cellStatus = newRow.insertCell(2);
  const cellActions = newRow.insertCell(3);

  const radioConcluidas = document.getElementById("radioConcluidas") as HTMLInputElement;
  const radioPendentes = document.getElementById("radioPendentes") as HTMLInputElement;

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
  const tableBody = document.getElementById("taskTableBody") as HTMLTableSectionElement;
  tableBody.innerHTML = ""; 

  todoList.tarefas.forEach((
    tarefa: Tarefa) => {
      imprimirTarefa(tarefa);
  })
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
  const inputBusca: HTMLInputElement = document.getElementById("inputBusca") as HTMLInputElement;
  const idTarefa: number = parseInt(inputBusca.value);

  if (!idTarefa) {
    alert("Digite o código da tarefa.");
    return;
  } 

  const tarefaEncontrada: Tarefa = todoList.buscarTarefa(idTarefa);

  if (tarefaEncontrada) {
    const tableBody = document.getElementById("taskTableBody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    imprimirTarefa(tarefaEncontrada);
  } else {
    alert("Tarefa não encontrada.");
  }
}