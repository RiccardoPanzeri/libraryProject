//classe Libro
class Libro{
    constructor(id, titolo, autore, nPagine, isLetto){
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
    
}



const domHandler = (function(){
    //elementi del Dom
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

    function mostraLibri(){
        let contenitori = document.querySelectorAll(".bookContainer");
        for(let contenitore of contenitori){
            tabellaLibri.removeChild(contenitore);
        }
        for(let libro of elencoLibri.getLibreria()){
            let contenitore = document.createElement("div");
            contenitore.classList.add("bookContainer");
            tabellaLibri.appendChild(contenitore);
            for(let dato in libro){
                let elemento = document.createElement("p");
                elemento.textContent = libro[dato];
                contenitore.appendChild(elemento);
                }
            
        let read = document.createElement("img");
        if(libro.isLetto === "No"){
            read.setAttribute("src", "./eye-check.svg");
            }else if(libro.isLetto === "Sì"){
                read.setAttribute("src", "./eye-remove.svg");
            }
        read.classList.add("readButton");
        read.setAttribute("data-id", libro.id);
        contenitore.appendChild(read);
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
            elencoLibri.aggiungiLibro(libro);
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
            elencoLibri.setLibreria(elencoLibri.getLibreria().filter(filtra));
            console.table(elencoLibri.getLibreria());
        }
    
    
    
    });
    
    
    tabellaLibri.addEventListener("click",(e)=>{
        target = e.target;
        function setLetto(libro){
            if(libro.isLetto === "Sì" && libro.id ===target.getAttribute("data-id")){
                libro.isLetto = "No";
                target.setAttribute("src", "./eye-remove.svg");
            }else if(libro.isLetto === "No" && libro.id ===target.getAttribute("data-id")){
                libro.isLetto = "Sì";
                target.setAttribute("src", "./eye-check.svg");
            }
        }
        
        if(target.classList.contains("readButton")){
            
            elencoLibri.getLibreria().map(setLetto);
        }
            
        mostraLibri();
        
    });

    return{mostraLibri};
})();






const elencoLibri = (function (){
    
    let libreria = [];
    
    function aggiungiLibro(libro){
        libreria.push(libro);
        domHandler.mostraLibri();
            }

    function getLibreria(){
        return libreria;
    }      

    function setLibreria(newLibreria){
        libreria = newLibreria;
    }
        
    return {aggiungiLibro, getLibreria, setLibreria};        
        
    


})();











const divinaCommedia = new Libro( "A001", "La Divina Commedia", "Dante Alighieri", 700, true);

const braveNewWorld = new Libro( "A002", "Brave New World", "Aldous Huxley", 400, false);

elencoLibri.aggiungiLibro(divinaCommedia);
elencoLibri.aggiungiLibro(braveNewWorld);


domHandler.mostraLibri();














