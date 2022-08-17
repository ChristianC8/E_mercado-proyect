const LIST_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";


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






function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name  + " - " + category.currency +  " " + category.cost + `</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount+ ` Vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}



/* al cargar la pagina se ejectura la funcion con la url del json y un .then que trae el result.Comprueba que el status sea correcto luego se agrega a una array y esta se utiliza en la funcion de showcategories list que crea todo lo que se vera en la pagina. */
document.addEventListener("DOMContentLoaded", function(){
    capturaElJson(LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {

            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray.products);

        }
    });
});







