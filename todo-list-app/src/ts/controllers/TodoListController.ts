import { Tarefa } from "../models/tarefa.model";

export class TodoList {
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

    tarefa.completa = true;
  }

  editarTarefa(id: number, descricao: string) {
    let tarefa: Tarefa = this.buscarTarefa(id);

    tarefa.descricao = descricao;
  }

  ordernarTarefa() {
    this.tarefas.sort();
  }

  // Filtrar tarefas com base no estado de conclusão (completa/incompleta)
  filtrarTarefasPorEstado(completa: boolean): Array<Tarefa> {
    return this.tarefas.filter((tarefa) => tarefa.completa === completa);
  }


  // novoElemento() {
  //   const li: HTMLLIElement = document.createElement("li");
  //   const inputValor: string = (<HTMLInputElement>document.getElementById("inputTarefa")).value;
  //   const texto: Text = document.createTextNode(inputValor);
  //   li.appendChild(texto);

  //   if (inputValor === "") {
  //     alert("Escreva algo para adicionar! :)");
  //     return; 
  //   } else {
  //     const ul: HTMLUListElement | null = document.getElementById("listaTarefas") as HTMLUListElement;
  //     if(ul){
  //       ul.appendChild(li);
  //     }
  //   }

  //   (document.getElementById("inputTarefa") as HTMLInputElement).value = "";

  //   const span: HTMLSpanElement = document.createElement("SPAN");
  //   const txt: Text = document.createTextNode("\u00D7");
  //   span.className = "close";
  //   span.appendChild(txt);
  //   li.appendChild(span);

  //   span.onclick = function() {
  //     const div: HTMLElement = span.parentElement as HTMLElement;
  //     div.style.display = "none";
  //   };

  // } tentativa mal sucedida :(



}