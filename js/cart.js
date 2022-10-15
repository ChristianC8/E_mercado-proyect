const precargado = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
/* const Product_Info_URL = PRODUCT_INFO_URL + EXT_TYPE
 */
obtenerDatos(precargado)

let arrayUnicos = []
let arrayRepeticiones = []
let compras = localStorage.getItem("alCarrito").split(",").sort()
function comprasAgregadas(){
/*     let arrayUnicos = []
    let arrayRepeticiones = [] */
    let contador = 1;

    for(let i = 0; i<compras.length;i++){
        if(compras[i+1]=== compras[i]){
            contador++
        }else{
            arrayUnicos.push(compras[i])
            arrayRepeticiones.push(contador)
            contador = 1;
        }
    }
   /*  console.log(arrayUnicos) /* idproducto */
/*     console.log(arrayRepeticiones) */ /* cantidad */
    /* console.log(compras) */  


    for(let i=0;i<arrayUnicos.length;i++){
    const Product_Info_URL = PRODUCT_INFO_URL + arrayUnicos[i] + EXT_TYPE
    obtenerDatos(Product_Info_URL,i+1,arrayRepeticiones[i])

}

}
comprasAgregadas()






async function obtenerDatos(cargar,index,value){
    const productoCargar = await getJSONData(cargar);
    if(cargar == precargado){
    crearObjeto(productoCargar.data.articles[0].image,productoCargar.data.articles[0].name,productoCargar.data.articles[0].currency,productoCargar.data.articles[0].unitCost,0,1)
    }else{
    crearObjeto(productoCargar.data.images[0], productoCargar.data.name,productoCargar.data.currency,productoCargar.data.cost,index,value)
    }

} 






function crearObjeto(foto,name,moneda,precio,index,value){
    const MultipleAttributes =  (elemento,array) => {
        for(let i=0; i<array.length;i++){
            elemento.setAttribute(array[i],array[i+1])
            i++
        }
    }

    const contenedorO = document.createElement("tr")

    const Cfoto = document.createElement("th")
    Cfoto.setAttribute("scope","row")
    const CfotoIn = document.createElement("img")
    MultipleAttributes(CfotoIn,["src",foto,"style","width: 50px;height: 30px;"])

    const Cname = document.createElement("td")
    const Ccurrency = document.createElement("td")
    const Ccantidad = document.createElement("td")
    const Csubtotal = document.createElement("td")
    MultipleAttributes(Csubtotal,["style","display:flex;"])
    const Psubtotal = document.createElement("p")
    MultipleAttributes(Psubtotal,["id",`Psubtotal${index}`])

    document.getElementById("cartObjs").appendChild(contenedorO)
    contenedorO.appendChild(Cfoto)
    Cfoto.appendChild(CfotoIn)
    contenedorO.appendChild(Cname)
    Cname.innerHTML = name
    contenedorO.appendChild(Ccurrency)
    Ccurrency.innerHTML = moneda + precio
    contenedorO.appendChild(Ccantidad)
    Ccantidad.innerHTML = `<div style="width: 60px;"><input type="number"  name="subtotal" id="subtotal${index}" required="" value="${cargarCantidad(index)}" min="0" class = "form-control" onchange="actualizarSubtotal(${index},${precio})" ></div>` 
    contenedorO.appendChild(Csubtotal)
    Csubtotal.innerHTML = moneda 
    Csubtotal.appendChild(Psubtotal)
    Psubtotal.innerHTML = (precio * document.getElementById(`subtotal${index}`).value)


}





function guardarCantidad(id,arrayRepeticiones){
console.log(document.getElementById(`subtotal${id}`).value + "valueDom") 

localStorage.setItem("cantidad",document.getElementById(`subtotal${id}`).value)

}  

//* * 
function actualizarSubtotal(index,precio){

    let subtotalInicial = document.getElementById(`Psubtotal${index}`)
    subtotalInicial.innerHTML = precio * document.getElementById(`subtotal${index}`).value
/* 
    let diferencia = Math.abs(Number(localStorage.getItem("cantidad")) - Number(document.getElementById(`subtotal${index}`).value))
   
   
    if( Number(localStorage.getItem("cantidad")) < Number(document.getElementById(`subtotal${index}`).value) ){

        for(let i=0;i<diferencia;i++){
        console.log("sumando")
        compras.push(arrayUnicos[index-1])
        localStorage.setItem("alCarrito",compras)

        }
}else{

    for(let i=0;i<diferencia;i++){
        console.log("restando")

        compras.splice(index-1,1)
        console.log(compras)
        localStorage.setItem("alCarrito",compras)
    }



    } */

/*     guardarCantidad(index,arrayRepeticiones) */

let diferencia = Math.abs(Number(localStorage.getItem("cantidad")) - Number(document.getElementById(`subtotal${index}`).value))
if( Number(localStorage.getItem("cantidad")) < Number(document.getElementById(`subtotal${index}`).value) ){

    for(let i=0;i<diferencia;i++){
    console.log("sumando")
    setTimeout(() => localStorage.setItem(`item${index}`, localStorage.getItem("cantidad")), 100)
    }
}else{
for(let i=0;i<diferencia;i++){
    console.log("restando")
    setTimeout(() => localStorage.setItem(`item${index}`, localStorage.getItem("cantidad")), 100)

}


} 
guardarCantidad(index,arrayRepeticiones)

}

function cargarCantidad(index){
    if(localStorage.getItem("item0")){
        if(localStorage.getItem(`item${index}`) != null){
        return localStorage.getItem(`item${index}`)
    }else{
        return 1
    }
    }else{
        localStorage.setItem("item0",1)
        return localStorage.getItem(`item0`)
    }


}