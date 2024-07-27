const libreria = [];
const tabellaLibri = document.querySelector(".tableContainer");
const contenitore = document.querySelector(".bookContainer")
const dialog = document.querySelector("#dialog");
const pulsanteAggiungi = document.querySelector("#addButton");
const inputId = document.querySelector("#id");
const inputTitolo = document.querySelector("#titolo");
const inputAutore = document.querySelector("#autore");
const inputPagine = document.querySelector("#nPagine");
const submitButton = document.querySelector("#submit");










const divinaCommedia = new Libro( "A001", "La Divina Commedia", "Dante Alighieri", 700, true);

const libro2 = new Libro( "A002", "ciao", "mondo", 700, false);

libreria.push(divinaCommedia);
libreria.push(libro2);


mostraLibri();








//costruttore
function Libro(id, titolo, autore, nPagine, isLetto){
    this.id = id;
    this.titolo = titolo;
    this.autore = autore;
    this.nPagine = nPagine;
    if(isLetto){
        this.isLetto = "Sì"
    }else{
        this.isLetto ="No";
    }

    
}


//funzioni
function aggiungiLibro(libro){
 
    libreria.push(libro);
    mostraLibri();
    


    
}

function mostraLibri(){
    let contenitori = document.querySelectorAll(".bookContainer");
    for(let contenitore of contenitori){
        tabellaLibri.removeChild(contenitore);
    }
    for(let libro of libreria){
        let contenitore = document.createElement("div");
        contenitore.classList.add("bookContainer");
        tabellaLibri.appendChild(contenitore);
        for(let dato in libro){
            let elemento = document.createElement("p");
            elemento.textContent = libro[dato];
            contenitore.appendChild(elemento);
            
        }
        
        
        }
      
}


//eventListener:
pulsanteAggiungi.addEventListener("click", () =>{
    dialog.showModal();

});


dialog.addEventListener("close", ()=>{
    if(dialog.returnValue !== "default"){
    let libro = new Libro(inputId.value, inputTitolo.value, inputAutore.value, inputPagine.value);
    aggiungiLibro(libro);
    }
});


submitButton.addEventListener("click", (e)=>{
    e.preventDefault();
    dialog.close();
});