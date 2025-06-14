const cardContainer = document.getElementById("cardContainer")
const URL_Productos = './data/productos.json'
const productos = []

function retornarCardHTML(producto) {
    return `
        <div class="card">
            <div class="card-name">${producto.nombre}</div>
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-price">$${producto.precio}</div>
        </div>`
}

function promptErrorCard() {
    const errorCard = document.getElementById('errorCard');
    if (errorCard === null) {
        console.error("No se pudo obtener el elemento #errorCard")
        return
    }
    if (productos.length == 0) {
        errorCard.className = "card-error ocultar";
    } else {
        errorCard.className = "card-error";
    }
}

function cargarProductos(array) {
    console.table(array);
    if (cardContainer == null) {
        console.error("Cannot find container for cards.")
        return
    }
    array.forEach((element) => {
        cardContainer.innerHTML += retornarCardHTML(element)
    });
    activarClickEnBotones()
}

const obtenerProductos = () => {
    fetch(URL_Productos)
        .then((response) => response.json())
        .then((data) => productos.push(...data))
        .then(() => cargarProductos(productos))
        .catch((error) => console.error(error))
    if (productos.length != 0) {
        cargarProductos(productos);
    }
    promptErrorCard()
}

obtenerProductos()