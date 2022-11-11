const email = document.getElementById("email");
const guardar = document.getElementById("btnGuardar");
const imagen = document.getElementById("Imagen")
const imagenDiv = document.getElementById("imagenDiv")
const nombre = document.getElementById("Nombre");
const SegNombre = document.getElementById("Segundonom");
const apellido = document.getElementById("Apellido");
const SegApellido = document.getElementById("Segundoap");
const telNum = document.getElementById("numero");


nombre.value = localStorage.getItem("nombre");
SegNombre.value = localStorage.getItem("segNom");
apellido.value = localStorage.getItem("apellido");
SegApellido.value = localStorage.getItem("segApell");
email.value = localStorage.getItem("email");
telNum.value = localStorage.getItem("telefono");

if (!email.value) {
  email.value = localStorage.getItem("userId");
}

guardar.addEventListener("click", () => {
  if (nombre.value && apellido.value && email.value) {
    localStorage.setItem("nombre", nombre.value);
    localStorage.setItem("segNom", SegNombre.value);
    localStorage.setItem("apellido", apellido.value);
    localStorage.setItem("segApell", SegApellido.value);
    localStorage.setItem("userId", email.value);
    localStorage.setItem("telefono", telNum.value);
    localStorage.setItem("imagenGuardada",localStorage.getItem("imagenIntercambiable"))
    location.reload();


  }
});
if(localStorage.getItem("imagenGuardada")){
imagenDiv.innerHTML =  `<img class="perfilPic" src="${localStorage.getItem("imagenGuardada")}" alt="">`
}

function subirImagen(e){
  /*  var imagen = URL.createObjectURL(e.target.files[0]) */
  var imagen = e.target.files[0]
   
    const reader = new FileReader();
    reader.addEventListener("load",() =>{
        localStorage.setItem("imagenIntercambiable",reader.result)
    },false)
    if(imagen){
        reader.readAsDataURL(imagen)
    }

/* 

   localStorage.setItem("imagenIntercambiable",imagen) */
  /*  imagenDiv.innerHTML =  `<img class="perfilPic" src="${imagen}" alt="">` */
}

