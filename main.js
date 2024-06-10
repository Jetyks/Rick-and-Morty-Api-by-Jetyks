const listaPersonaje = document.querySelector("#lista-personaje");
let URL = "https://rickandmortyapi.com/api/character/";
const modal = document.querySelector("#modal");
let nombreModal = document.querySelector("#nombre-modal");
let idModal = document.querySelector("#id-modal");
let especie = document.querySelector("#especie");
let genero = document.querySelector("#genero");
let estatus = document.querySelector("#estatus");
let locacion = document.querySelector("#locacion");
let imgModal = document.querySelector("#img-modal");
const btnCerrar = document.querySelector("#btn-cerrar");
const btnTodos = document.querySelector("#btn-todos");
const buscador = document.querySelector("#buscador");
const btnBuscar = document.querySelector("#btn-buscar");

const personajes = [];

/* fetch(URL)
.then(res => res.json())
.then(data => {console.log(data)}) */

/* for (let i = 1; i <= 40; i++){
    fetch(URL + i)
    .then((response) => response.json())
    .then(data => 
        mostrarPersonaje(data, i))
        
    
    } */

        for (let i = 1; i <= 500; i++) {
            fetch(URL + i)
                .then((response) => response.json())
                .then(data => {
                    personajes.push(data); // Almacena cada personaje en el array personajes
                    mostrarPersonaje(data, i);
                });
        }
    

    function mostrarPersonaje (char, index){
        const div = document.createElement("div");
        div.classList.add("personaje");
        div.id = `personaje-${index}`;
        /* console.log(div.id); */
        div.innerHTML = `
                <p class="personaje-id-back">${`#` + char.id}</p>
                <div class="personaje-img">
                    <img src="${char.image}" alt="${char.name}">
                </div>
                <div class="personaje-info">
                    <div class="nombre-contenedor">
                        <h3 id="nombre-personaje">${char.name}</h3>
                    </div>
                </div>
            `;

            div.addEventListener('click', () => {
                idModal.innerHTML = "#" + char.id;
                nombreModal.innerHTML = char.name;
                especie.innerHTML = char.species;
                genero.innerHTML = char.gender;
                estatus.innerHTML = char.status;
                locacion.innerHTML = char.location.name;
                imgModal.src = char.image;
                modal.classList.add("modal--show");
            });
            listaPersonaje.append(div);
    }
    
btnCerrar.addEventListener('click',()=>{
    modal.classList.remove("modal--show");

})

console.log(personajes);

btnBuscar.addEventListener("click", buscarPersonaje);

function buscarPersonaje(){
    const nombreIngresado = buscador.value.toUpperCase();
    listaPersonaje.innerHTML = "";
    personajes
        .filter(char => char.name.toUpperCase().includes(nombreIngresado))
        .forEach((char, index) => mostrarPersonaje(char, index));
}

btnTodos.addEventListener("click", () => {
    location.reload();
});