
const alert_red = document.getElementById("alertred");
const boton_inicio = document.getElementById("btninicio");

function alertWarning(){
    setTimeout()  /*  DEBO SETEAR UN TIME OUT PARA VISIBILITY */
    alert_red.style.visibility = 'visible';
}



/* evento click Ingresar */
boton_inicio.addEventListener("click",cambiarPag);
function cambiarPag(){
    let email = document.getElementById("floatingInput").value
    let paswo = document.getElementById("floatingPassword").value
    if(paswo == null || email == null){
        location.href = "index.html";
        console.log(paswo);
        console.log(email)           /* ARREGLAR FALLO CON PASWO Y EMAIL */
    }else{ alertWarning();
    };

}

