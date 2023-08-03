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
  private tarefas: Array<Tarefa>;

  constructor() {
    this.tarefas = [];
  }

  criarTarefa(id: number, descricao: string) {
    let tarefa: Tarefa = new Tarefa(id, descricao, false);
    this.tarefas.push(tarefa);
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

  // Filtrar tarefas com base no estado de conclusão (status/instatus)
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

function novoElemento() {
  const inputElement: HTMLInputElement = document.getElementById("inputTarefa") as HTMLInputElement;
  const inputValor: string = inputElement.value.trim();

  if (inputValor === "") {
    alert("Insira uma tarefa para adicionar!");
    return;
  }

  const id = todoList.criarNovoId();
  todoList.criarTarefa(id, inputValor);

  imprimirTarefa(todoList.buscarTarefa(id));

  inputElement.value = "";
} 

function imprimirTarefa(tarefa: Tarefa) {
  const tableBody = document.getElementById("taskTableBody") as HTMLTableSectionElement;
  const newRow = tableBody.insertRow(-1);

  const cellId = newRow.insertCell(0);
  const cellDescription = newRow.insertCell(1);
  const cellStatus = newRow.insertCell(2);
  const cellActions = newRow.insertCell(3);

  cellId.textContent = tarefa.id.toString();
  cellDescription.textContent = tarefa.descricao;
  cellStatus.textContent = tarefa.Status;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Excluir";
  deleteButton.className = "btn btn-danger";
  deleteButton.addEventListener("click", function () {
    newRow.remove();
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.className = "btn btn-warning ms-1";

  editButton.addEventListener("click", function () {
    // Implemente aqui a lógica para editar a tarefa.
    // Por exemplo, você pode abrir um modal para editar os detalhes da tarefa.
    alert("Editar tarefa com ID: " + tarefa.id);
  });

  cellActions.appendChild(deleteButton);
  cellActions.appendChild(editButton);
}
