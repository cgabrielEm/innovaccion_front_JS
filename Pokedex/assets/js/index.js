

async function getPokemon(pokeName) {

    const url_api = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    console.log(url_api)
    const response = await fetch(url_api);
    return response;
}


/*getPokemon("ditto").then(data=>{
    console.log(data);
    if(data.status !== 200){
        alert("No fue posible encontrar tu ");
        return "";
    }
    
    console.log(data.json());

}).catch(error=>{
    console.log(error);
    alert("Error al consultar servicio "+error+" Estatus: "+error.status);
});*/

/**
 * @description Consulta el metodo de la consulta al API
 * @param {String} dataPokemon 
 * @returns Promise Object API Response
 */
function consultaAPI(dataPokemon) {
    return new Promise(function (resolve, reject) {
        try {
            console.log(dataPokemon);
            console.log(dataPokemon.toString().toLowerCase());
            getPokemon(dataPokemon.toString().toLowerCase()).then(data => {
                if (data.status !== 200) {
                    reject(data.status);
                }
                resolve(data.json());
            }).catch(errorAPI => {
                reject(errorAPI);
            });
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * @description Se escribe en pantalla la información
 * @param {Object} data Datos
 * @param {Integer} tipo Tipo de mensaje
 */
function escribirEnPantalla(data,tipo) {
    var contenidoTextArea = document.getElementById("descripcion_pokemons");
    contenidoTextArea.innerHTML = "";
    try {
        const img = document.getElementById("imagen_pokemon");
        switch (tipo) {
            case 1:// Mensaje te API
                const arrayHabilidades = data.abilities;
                let sizeHabilities = arrayHabilidades.length;
                let habilidades = "";

                const arrayTipos = data.types;
                const sizeArrayTipos = arrayTipos.length;
                let tipos = "";
                let contador = 0;
                arrayTipos.forEach(element => {
                    if (sizeArrayTipos - 1 === contador) {
                        tipos += "|";
                    }
                    tipos += element.type.name;
                    contador++;
                });
                contador = 0;
                arrayHabilidades.forEach(element => {
                    if (sizeHabilities - 1 === contador) {
                        habilidades += "|";
                    }
                    habilidades += element.ability.name;
                    contador++;
                });
                contenidoTextArea.innerHTML = "Id: " + data.id + '\nNombre: ' + data.forms[0].name + "\nEspecie: " + data.species.name + "\nTipo: " + data.types[0].slot + "\nAncho: " + data.weight + "\nLargo: " + data.height + "\nTipos: " + tipos + "\nHabilidades: " + habilidades;
                img.src = data.sprites.front_default;
                break;
            case 2:// Mensaje Error en el sistema
                img.src = "./assets/images/quien_es_pokemon.gif";
                contenidoTextArea.innerHTML = "ERROR! en el Sistema - "+data;
                break;

            case 3:// Mensaje buscando información
                img.src = "./assets/images/loading-load.gif";
                contenidoTextArea.innerHTML = "BUSCANDO....";
                break;
            default: //Limpiar textarea
            img.src = "./assets/images/quien_es_pokemon.gif";
            contenidoTextArea.innerHTML = "";


        }

    } catch (error) {
        alert("No se encontró información " + error);
        contenidoTextArea.innerHTML = "ERROR en el Sistema";
    }
}

/**
 * @description Valida los campos y consume el API de PokemonApi.
 * @returns ""
*/
function buscarPokemon() {
    
    const nombrePokemon = document.getElementById("nombre_pokemon");
    const numeroPokemon = document.getElementById("numero_pokemon");


    if (nombrePokemon.value === "" && numeroPokemon.value === "") {
        alert("Escribe un nombre o número de Pokemon!");
        return "";
    }

    if (nombrePokemon.value !== "" && numeroPokemon.value !== "") {
        alert("Solo selecciona una opción de búsqueda, por nombre o por número");
        return "";
    }
    escribirEnPantalla(null,3);
    const parametroPokemon = (nombrePokemon.value === "") ? numeroPokemon.value : nombrePokemon.value;
    //Consulta API

    consultaAPI(parametroPokemon).then(data => { 
        escribirEnPantalla(data,1);
    }).catch(error => {
        alert(`Error al consultar los datos de la API ${error}`);
        escribirEnPantalla(error,2);
    });

}

/**
 * @description Limpia los campos de texto
 */
function limpiaFormulario(){
    const nombrePokemon = document.getElementById("nombre_pokemon");
    const numeroPokemon = document.getElementById("numero_pokemon");
    nombrePokemon.value = "";
    numeroPokemon.value = "";
    escribirEnPantalla(null,0);
}


const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", buscarPokemon);

const btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.addEventListener("click",limpiaFormulario);


