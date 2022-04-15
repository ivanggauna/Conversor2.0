const listaDesplegable = document.querySelectorAll(".listaDesplegable select")
primerValor = document.querySelector(".primerValor select")
segundoValor = document.querySelector(".segundoValor select")
let button = document.querySelector("form button")

/* For para recorrer la lista desplegable */

for (let i = 0; i < listaDesplegable.length; i++) {

    for (moneda_id in paises_id) {
        /* Seleccionando conversion de ARS a USD por defecto */

        let selected;
        if (i == 0) {
            selected = moneda_id == "ARS" ? "selected" : "";
        } else if (i == 1) {
            selected = moneda_id == "USD" ? "selected" : "";
        }
        /* La opcion del select con el codigo de la moneda y el pais */
        let optionTag = `<option value="${moneda_id}" ${selected}>${moneda_id}</option>`
        /* Inserta los codigos en la lista desplegable */
        listaDesplegable[i].insertAdjacentHTML("beforeend", optionTag)
    }
    listaDesplegable[i].addEventListener("change", e => {
        banderas(e.target);
    });

}

function banderas(element){
    for (id in paises_id){
        if (id == element.value){
            let imgBandera = element.parentElement.querySelector("img")
            imgBandera.src = `https://countryflagsapi.com/png/${paises_id[id]}`
        }
    }
}







window.addEventListener("load", () => {  
    tasaDeConversion();
})


/* Funcion para que el form no haga submit */
button.addEventListener("click", e => {
    e.preventDefault();
    tasaDeConversion();
})



const iconoDeCambio = document.querySelector(".listaDesplegable .icon")
iconoDeCambio.addEventListener("click", ()=>{
    let temporal = primerValor.value
    primerValor.value = segundoValor.value
    segundoValor.value= temporal
    banderas(primerValor);
    banderas(segundoValor);
    tasaDeConversion()
})



function tasaDeConversion() {
    const monto = document.querySelector(".monto input")
    const textoTasaDeCambio = document.querySelector(".tasaDeConversion")
    let valorMonto = monto.value

    /* Validacion para que el valor no sea 0 y siempre este en valor 1 */
    if (valorMonto == "" || valorMonto == "0") {
        monto.value = "1";
        valorMonto = 1;
    }

    let url = `https://v6.exchangerate-api.com/v6/5c8e31e74e15756df4f82a8f/latest/${primerValor.value}`;
    /* Fetch de la api */
    fetch(url).then(response => response.json()).then(result => {
        let tasaDeCambio = result.conversion_rates[segundoValor.value]
        let tasaDeCambioTotal = (valorMonto * tasaDeCambio).toFixed(2)        
        textoTasaDeCambio.innerText = `${valorMonto} ${primerValor.value} = ${tasaDeCambioTotal} ${segundoValor.value}`
    }) .catch (() =>{
        textoTasaDeCambio.innerText = "Un simple error."
    })

}