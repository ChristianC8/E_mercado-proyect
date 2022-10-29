const precargado = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

/* obtenerDatos(precargado) */

let arrayUnicos = []
let arrayRepeticiones = []
let compras = localStorage.getItem("alCarrito").split(",").sort()

function comprasAgregadas(){

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
    for(let i=0;i<arrayUnicos.length;i++){
    const Product_Info_URL = PRODUCT_INFO_URL + arrayUnicos[i] + EXT_TYPE

    obtenerDatos(Product_Info_URL,i+1)
}

}

comprasAgregadas()


console.log(arrayUnicos)



async function obtenerDatos(cargar,index){
    const productoCargar = await getJSONData(cargar);
    if(cargar == precargado){
    crearObjeto(productoCargar.data.articles[0].image,productoCargar.data.articles[0].name,productoCargar.data.articles[0].currency,productoCargar.data.articles[0].unitCost,0,1)
    }else{
    crearObjeto(productoCargar.data.images[0], productoCargar.data.name,productoCargar.data.currency,productoCargar.data.cost,index,productoCargar.data.id)
    }


} 





function crearObjeto(foto,name,moneda,precio,index,idp){
    const MultipleAttributes =  (elemento,array) => {
        for(let i=0; i<array.length;i++){
            elemento.setAttribute(array[i],array[i+1])
            i++
        }
    }

    const contenedorO = document.createElement("tr")
    contenedorO.setAttribute("id",`tr${idp}`)

    const Cfoto = document.createElement("th")
    Cfoto.setAttribute("scope","row")
    const CfotoIn = document.createElement("img")
    MultipleAttributes(CfotoIn,["src",foto,"style","width: 50px;height: 30px;"])

    const Cname = document.createElement("td")
    const Ccurrency = document.createElement("td")
    const Ccantidad = document.createElement("td")
    const Csubtotal = document.createElement("td")
    const borrar = document.createElement("td")
    MultipleAttributes(Csubtotal,["style","display:flex;"])
    const Pcurrency = document.createElement("p")
    const Psubtotal = document.createElement("p")
    MultipleAttributes(Psubtotal,["id",`Psubtotal${index}`])
    MultipleAttributes(Pcurrency,["id",`Pcurrency${index}`])

    document.getElementById("cartObjs").appendChild(contenedorO)
    contenedorO.appendChild(Cfoto)
    Cfoto.appendChild(CfotoIn)
    contenedorO.appendChild(Cname)
    Cname.innerHTML = name
    contenedorO.appendChild(Ccurrency)
    Ccurrency.innerHTML = moneda + precio
    contenedorO.appendChild(Ccantidad)
    Ccantidad.innerHTML = `<div style="width: 60px;"><input type="number"  name="subtotal" id="subtotal${index}" required="" value="${cargarCantidad(index)}" min="1" class = "form-control" onchange="actualizarSubtotal(${index},${precio})" ></div>` 
    contenedorO.appendChild(Csubtotal)
/*     Csubtotal.innerHTML = moneda  */
    Csubtotal.appendChild(Pcurrency)
    Csubtotal.appendChild(Psubtotal)
    Pcurrency.innerHTML = moneda
    Psubtotal.innerHTML = (precio * document.getElementById(`subtotal${index}`).value)

    contenedorO.appendChild(borrar)
    borrar.innerHTML = ` <button type="button" class="btn btn-outline-danger" id="Borrar${index}" onclick ="borrarelemento(${idp})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
</svg>
  </button>`
    


}




function borrarelemento(index){
    document.getElementById("cartObjs").removeChild(document.getElementById(`tr${index}`))
    let localsave = []
    localsave = localStorage.getItem("alCarrito")
    localsave = localsave.split(",")
    localsave.pop(index)
    localStorage.setItem("alCarrito",localsave)
    PaginaCargada()
}








function guardarCantidad(id,arrayRepeticiones){


localStorage.setItem("cantidad",document.getElementById(`subtotal${id}`).value)

}  







function actualizarSubtotal(index,precio){

    let subtotalInicial = document.getElementById(`Psubtotal${index}`)
    subtotalInicial.innerHTML = precio * document.getElementById(`subtotal${index}`).value

let diferencia = Math.abs(Number(localStorage.getItem("cantidad")) - Number(document.getElementById(`subtotal${index}`).value))
if( Number(localStorage.getItem("cantidad")) < Number(document.getElementById(`subtotal${index}`).value) ){

    for(let i=0;i<diferencia;i++){
    
    setTimeout(() => localStorage.setItem(`item${index}`, localStorage.getItem("cantidad")), 100)
    }
}else{
for(let i=0;i<diferencia;i++){
 
    setTimeout(() => localStorage.setItem(`item${index}`, localStorage.getItem("cantidad")), 100)
}
} 

guardarCantidad(index,arrayRepeticiones);


PaginaCargada()

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



let NumeroCostosS = document.getElementById("totalSubtotal");
let CostoDeEnvio = document.getElementById("subtotalPorcentaje")
let totalCostos = document.getElementById("total")

setTimeout(PaginaCargada, 100);

function PaginaCargada(){

    let sumaSubtotales = 0
for(let i = 1;i < arrayUnicos.length + 1 ; i++ ){
    if(document.getElementById(`Psubtotal${i}`)){

  
        if(document.getElementById(`Pcurrency${i}`).innerHTML === "UYU"){
            sumaSubtotales += parseInt(document.getElementById(`Psubtotal${i}`).innerHTML) / 41,02
        }else{
        sumaSubtotales +=parseInt(document.getElementById(`Psubtotal${i}`).innerHTML)
    }

    }
    NumeroCostosS.innerHTML= parseInt(sumaSubtotales)
    actualizarCostoEnvio(0.15)
    totalCostos.innerHTML = parseInt(NumeroCostosS.innerHTML) + parseInt(CostoDeEnvio.innerHTML)
}
}

let premium = document.getElementById("Premiumradio")
let express = document.getElementById("Expressradio")
let standard = document.getElementById("standardradio")

premium.addEventListener("change",()=>{
    actualizarCostoEnvio(0.15)
})
express.addEventListener("change",()=>{
    actualizarCostoEnvio(0.7)
})
standard.addEventListener("change",()=>{
    actualizarCostoEnvio(0.5)
})

function actualizarCostoEnvio(porcentaje){
    CostoDeEnvio.innerHTML = parseInt(NumeroCostosS.innerHTML * porcentaje)
    totalCostos.innerHTML = parseInt(NumeroCostosS.innerHTML) + parseInt(CostoDeEnvio.innerHTML)
}


const calle   = document.getElementById("calle")
const numero  = document.getElementById("numero")
const esquina = document.getElementById("Esquina")

const tarjetaC  = document.getElementById("Tarjetacred")
const numeroTarjeta  = document.getElementById("NumTarjeta")
const CodigoSeg  = document.getElementById("CodigoSeg")
const Venc  = document.getElementById("Vencimiento")

const TranBan  = document.getElementById("Transferencia")
const NumCuenta  = document.getElementById("Numerocuenta")

const formaDePago = document.getElementById("formaDepago")
const finalizarComp = document.getElementById("finalizarCompra")


tarjetaC.addEventListener("change",()=>{
    NumCuenta.setAttribute("disabled","")
    Venc.removeAttribute("disabled")
    CodigoSeg.removeAttribute("disabled")
    numeroTarjeta.removeAttribute("disabled")
})

TranBan.addEventListener("change",()=>{
    NumCuenta.removeAttribute("disabled")
    Venc.setAttribute("disabled","")
    CodigoSeg.setAttribute("disabled","")
    numeroTarjeta.setAttribute("disabled","")
})


/* validar */



const form = document.getElementById("form")

form.addEventListener("submit",(e)=>{

    e.preventDefault()
    if (valido < 4){
        e.preventDefault()
    }else{
        document.getElementById("completado").classList.remove("d-none")
        setTimeout(()=>{ document.getElementById("completado").classList.add("d-none")}, 1400)
    }

})
let valido = 0;

finalizarComp.addEventListener("click",()=>{


    if(!calle.checkValidity()){
        calle.classList.add("is-invalid")
        valido --
    }else{
        calle.classList.remove("is-invalid")
        valido ++
    }

    if(!numero.checkValidity()){
        numero.classList.add("is-invalid")
        valido --
    }else{
        numero.classList.remove("is-invalid")
        valido ++
    }


    if(!esquina.checkValidity()){
        esquina.classList.add("is-invalid")
        valido --
    }else{
        esquina.classList.remove("is-invalid")
        valido ++
    }

    if(!tarjetaC.checkValidity() || !TranBan.checkValidity()){
        formaDePago.classList.add("is-invalid")
        valido --
    }else if((tarjetaC.checkValidity() || TranBan.checkValidity() ) &&  (NumCuenta.checkValidity() && !NumCuenta.hasAttribute("disabled")) || (numeroTarjeta.checkValidity() && CodigoSeg.checkValidity() && Venc.checkValidity() && !Venc.hasAttribute("disabled")) ){
        formaDePago.classList.remove("is-invalid")
        valido ++
    } else{formaDePago.classList.add("is-invalid")       
        valido --}



})
