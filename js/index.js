const cardContainer = document.getElementById("cardContainer");
const URL_Productos = './data/productos.json';
const productos = [];

function retornarCardHTML(producto) {
    const precioFormateado = Number(producto.precio).toLocaleString('es-AR');
    return `
        <div class="card" data-id="${producto.id}">
            <div class="card-name">${producto.nombre}</div>
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="container-price">
                <div class="card-price">$${precioFormateado}</div>
            </div>
        </div>`;
}

function promptErrorCard() {
    const errorCard = document.getElementById('errorCard');
    if (errorCard === null) {
        console.error("No se pudo obtener el elemento #errorCard");
        return;
    }
    if (productos.length === 0) {
        errorCard.className = "card-error ocultar";
    } else {
        errorCard.className = "card-error";
    }
}

function cargarProductos(array) {
    if (cardContainer === null) {
        console.error("No se encontró el contenedor de tarjetas.");
        return;
    }
    cardContainer.innerHTML = ''; // Limpiar antes de volver a renderizar
    array.forEach((element) => {
        cardContainer.innerHTML += retornarCardHTML(element);
    });
    activarClickEnBotones();
}

function activarClickEnBotones() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const producto = productos.find(p => p.id == id);
            if (producto) mostrarModal(producto);
        });
    });
}

function mostrarModal(producto) {
    const modal = document.getElementById('modalProducto');
    document.getElementById('modalNombre').innerText = producto.nombre;
    document.getElementById('modalImagenPrincipal').src = producto.imagen;
    document.getElementById('modalImagenPrincipal').alt = producto.nombre;
    document.getElementById('modalDescripcion').innerText = producto.descripcion;

    const galeria = document.getElementById('modalGaleria');
    galeria.innerHTML = '';

    if (producto.imagenesExtras && Array.isArray(producto.imagenesExtras)) {
        producto.imagenesExtras.forEach(img => {
            const imagen = document.createElement('img');
            imagen.src = img;
            imagen.alt = producto.nombre;
            imagen.addEventListener('click', () => {
                document.getElementById('modalImagenPrincipal').src = img;
            });
            galeria.appendChild(imagen);
        });
    }

    modal.style.display = 'flex';

    // Cerrar modal con la X
    document.querySelector('.cerrar').onclick = () => {
        modal.style.display = 'none';
    };

    // Cerrar modal al hacer clic afuera del contenido
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function obtenerProductos() {
    fetch(URL_Productos)
        .then(response => response.json())
        .then(data => {
            productos.push(...data);
            cargarProductos(productos);
            promptErrorCard();
        })
        .catch(error => {
            console.error("Error al cargar productos:", error);
        });
}

// Iniciar
obtenerProductos();
