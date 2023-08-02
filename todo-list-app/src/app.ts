function novoElemento() {
    const li: HTMLLIElement = document.createElement("li");
    const inputValor: string = (<HTMLInputElement>document.getElementById("inputTarefa")).value;
    const texto: Text = document.createTextNode(inputValor);
    li.appendChild(texto);

    if (inputValor === "") {
        alert("Escreva algo para adicionar! :)");
        return; 
    } else {
        const ul: HTMLUListElement | null = document.getElementById("listaTarefas") as HTMLUListElement;
        if(ul){
        ul.appendChild(li);
        }
    }

    (document.getElementById("inputTarefa") as HTMLInputElement).value = "";

    const span: HTMLSpanElement = document.createElement("SPAN");
    const txt: Text = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        const div: HTMLElement = span.parentElement as HTMLElement;
        div.style.display = "none";
    };

} 