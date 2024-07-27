let libreria = [];
const tabellaLibri = document.querySelector(".tableContainer");
const contenitore = document.querySelector(".bookContainer")
const dialog = document.querySelector("#dialog");
const pulsanteAggiungi = document.querySelector("#addButton");
const inputId = document.querySelector("#id");
const inputTitolo = document.querySelector("#titolo");
const inputAutore = document.querySelector("#autore");
const inputPagine = document.querySelector("#nPagine");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("#dialogForm");
const cancelButton = document.querySelector("#cancel");








const divinaCommedia = new Libro( "A001", "La Divina Commedia", "Dante Alighieri", 700, true);

const libro2 = new Libro( "A002", "ciao", "mondo", 700, false);

libreria.push(divinaCommedia);



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

        let read = document.createElement("button")

        let cancella = document.createElement("img");
        cancella.setAttribute("src","./delete-empty.svg");
        cancella.setAttribute("data-id", libro.id);
        cancella.classList.add("deleteButton");
        
        contenitore.appendChild(cancella);

        
        
        }


      
}


//eventListener:
pulsanteAggiungi.addEventListener("click", () =>{
    dialog.showModal();

});


dialog.addEventListener("close", ()=>{
    if(dialog.returnValue === "ok"){
    let libro = new Libro(inputId.value, inputTitolo.value, inputAutore.value, inputPagine.value);
    aggiungiLibro(libro);
    inputId.value="";
    inputTitolo.value="";
    inputAutore.value="";
    inputPagine.value="";
    console.log(dialog.returnValue);
    }else{
        form.reset();
    }
    
});


submitButton.addEventListener("click", (e)=>{
   
    
    e.preventDefault();
    if(!form.checkValidity() ){
        
        form.reportValidity()
    }else{
      
    dialog.close("ok");
    }
});

cancelButton.addEventListener("click", (e)=>{
    form.reset();
    e.preventDefault();
    dialog.close("");
});


tabellaLibri.addEventListener("click", (e)=>{
    target = e.target;
    if(target.classList.contains("deleteButton")){
        let parent = target.parentNode;
        parent.remove();
        console.log(target.getAttribute("data-id"));

        function filtra(libro){
            if(libro.id !== target.getAttribute("data-id")){
                return true;
            }else{
                return false;
            }
        }
        
        libreria = libreria.filter(filtra);
        console.table(libreria);
    }



});