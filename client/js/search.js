const d = document;

function filtrarProductos(input, selector) {
    d.addEventListener("keyup", e => {
        if (e.target.matches(input)) {
            d.querySelectorAll(selector).forEach((el) => {
                el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                    ? el.style.display = "flex"
                    : el.style.display ="none";
                    //Oculto las tarjetas en caso de que no coincida con la busqueda ingresada
            });
        }
    });

    // Agregar evento para detectar cuando se borra el contenido del cuadro de búsqueda
d.querySelector(input).addEventListener("input", (e) => {
    if (e.target.value.trim() === "") {
        // Si el cuadro de búsqueda está vacío, mostrar todas las tarjetas
        d.querySelectorAll(selector).forEach((el) => {
            el.style.display = "flex";
        });
    }
});
}

//Antes de activar el boton de buscar espero que se cargue el contenido, por ende las tarjetas
document.addEventListener("DOMContentLoaded", function () {
    filtrarProductos(".cards-filter", ".card");
});

