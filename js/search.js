const d = document;

function filtrarProductos(input, selector) {
    const datalist = d.querySelector("#sugerencias-categorias");
    const categoriasSet = new Set();

    // Primero recopilamos categorías únicas para el datalist
    d.querySelectorAll(selector).forEach((el) => {
        const categoria = el.querySelector(".card-categoria")?.textContent.trim();
        if (categoria) {
            categoriasSet.add(categoria);
        }
    });

    // Agregamos las opciones al datalist
    categoriasSet.forEach((cat) => {
        const option = d.createElement("option");
        option.value = cat;
        datalist.appendChild(option);
    });

    // Evento de filtrado
    d.addEventListener("keyup", e => {
        if (e.target.matches(input)) {
            const filtro = e.target.value.toLowerCase();

            d.querySelectorAll(selector).forEach((el) => {
                const titulo = el.querySelector(".card-title")?.textContent.toLowerCase() || "";
                const categoria = el.querySelector(".card-categoria")?.textContent.toLowerCase() || "";

                if (titulo.includes(filtro) || categoria.includes(filtro)) {
                    el.style.display = "flex";
                } else {
                    el.style.display = "none";
                }
            });
        }
    });

    // Mostrar todas si el input está vacío
    d.querySelector(input).addEventListener("input", (e) => {
        if (e.target.value.trim() === "") {
            d.querySelectorAll(selector).forEach((el) => {
                el.style.display = "flex";
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    filtrarProductos(".cards-filter", ".card");
});
