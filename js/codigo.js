const listaDesplegable = document.querySelectorAll(".listaDesplegable select")
let button = document.querySelector("form button")

/* For para recorrer la lista desplegable */

for(let i =0; i < listaDesplegable.length;i++){

    for(moneda_id in paises_id){
        /* Seleccionando conversion de ARS a USD por defecto */
        
        let selected;
        if(i == 0){
            selected = moneda_id == "ARS" ? "selected" : "";
        }else if (i == 1){
            selected = moneda_id == "USD" ? "selected" : "";
        }
        
        
        /* La opcion del select con el codigo de la moneda y el pais */
        let optionTag = `<option value="${moneda_id}" ${selected}>${moneda_id}</option>`
        /* Inserta los codigos en la lista desplegable */
        listaDesplegable[i].insertAdjacentHTML("beforeend",optionTag)
    }
  
}

/* Funcion para que el form no haga submit */
button.addEventListener("click", e =>{
    e.preventDefault();
    tasaDeConversion(); 
})

function tasaDeConversion(){
    const monto = document.querySelector(".monto input")
    let valorMonto = monto.value
    
    /* Validacion para que el valor no sea 0 y siempre este en valor 1 */
    if (valorMonto == "" || valorMonto == "0"){
        monto.value = "1";
        valorMonto = 1;
    }
}