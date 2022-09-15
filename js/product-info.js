const LIST_URL = `https://japceibal.github.io/emercado-api/cats_products/`+JSON.parse(localStorage.getItem("catID"))+`.json`;

const Comment_URL = `https://japceibal.github.io/emercado-api/products_comments/`+JSON.parse(localStorage.getItem("selectedProductid"))+`.json`

function capturaElJson(url){
    let result = {};
    /* el fetch se agrega al objeto response para utilizar sus propiedades y luego es convertido en json. Los .then estan conectados entre si por eso va en secuencia uno tras otro. A el segundo .then result se le agrega la propiedad .status = a ok y el .data que trae el json*/
    return fetch(url) 
    .then(response => {
    if (response.ok) {
        return response.json();
    }else{
        throw Error(response.statusText);
    }
    })
    .then(function(response) {
        result.status = 'ok';
        result.data = response;
        return result;

    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

let categoriesArray = [];




function showProductInfo(array){


    let htmlContentToAppend = "";
/*     console.log(array[localStorage.getItem("selectedProduct")])
    console.log(Comment_URL) */


    
/* 

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];
 */
        htmlContentToAppend += `
        <p id="tituloProducto">${array[localStorage.getItem("selectedProduct")].name}</p>
        <hr>
        <p><strong>Precio</strong> <br> ${array[localStorage.getItem("selectedProduct")].currency} ${array[localStorage.getItem("selectedProduct")].cost}</p>
        <p><strong>Descripción</strong><br>${array[localStorage.getItem("selectedProduct")].description}</p>
        <p><strong>Categoría</strong><br>${categoriesArray.catName}</p>
        <p><strong>Cantidad de vendidos</strong><br>${array[localStorage.getItem("selectedProduct")].soldCount}</p>
        <p><strong>Imágenes ilustrativas</strong></p>
        <div id="padreImagenesP">
        <img src="img/prod${array[localStorage.getItem("selectedProduct")].id }_1.jpg" class="imgProduct">
        <img src="img/prod${array[localStorage.getItem("selectedProduct")].id }_2.jpg" class="imgProduct">
        <img src="img/prod${array[localStorage.getItem("selectedProduct")].id }_3.jpg" class="imgProduct">
        <img src="img/prod${array[localStorage.getItem("selectedProduct")].id }_4.jpg" class="imgProduct">
        </div>


        `
        document.getElementById("productInfo").innerHTML = htmlContentToAppend; 



    }
/* } */



function showComments(array){
/* console.log(array) */
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){ 


    htmlContentToAppend +=  `

                <li class="border rounded-3 cont" id="listaComm">
                <div  id="padreImagenesP"> 
                    <p>  <strong style="margin:5px">${array[i].user}</strong>   -${array[i].dateTime}-                 </p>
                    <div id="puntaje`+i+`" class = "puntajes${i}"> 
                    
                    ${puntuacion(array[i])}

                    </div>
                    </div>
                    
                    <p>${array[i].description}</p>
                </li>


        `
        
    
        document.getElementById("contenedor").innerHTML = htmlContentToAppend; 

    }

}
function puntuacion(a){
    console.log(a)
    if(a.score === 0){
    return ` 
    <span class="far fa-star"></span>
    <span class="far fa-star"></span>
    <span class="far fa-star"></span>
    <span class="far fa-star"></span>
    <span class="far fa-star"></span> `}
    if(a.score === 1){
        return  `
        <span class="fa fa-star checked"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span> `}
        if(a.score === 2){
            return  `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="far fa-star"></span>
            <span class="far fa-star"></span>
            <span class="far fa-star"></span> `}
        if(a.score === 3){
            return  `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="far fa-star"></span>
            <span class="far fa-star"></span> `}
        if(a.score === 4){
            return  `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="far fa-star"></span> `}
        if(a.score === 5){
            return  `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span> `}
}
































document.addEventListener("DOMContentLoaded", function(){
    capturaElJson(LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {

            categoriesArray = resultObj.data;
            showProductInfo(categoriesArray.products);
        }
    });
    capturaElJson(Comment_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArrayD = resultObj.data;
            showComments(categoriesArrayD);
        }
    });
});

