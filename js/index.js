document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");
  const errorCard = document.getElementById("errorCard");
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");
  const openBtn = document.getElementById("openPopup");
  const hamburguer = document.querySelector(".menu__hamburguer");
  const links = document.querySelector(".menu__links");
  const URL_Productos = './data/productos.json';
  const productos = [];

  // Mostrar popup una vez por sesión
  if (popup && !sessionStorage.getItem("popupShown")) {
    popup.style.display = "block";
    sessionStorage.setItem("popupShown", "true");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => popup.style.display = "none");
  }

  if (openBtn) {
    openBtn.addEventListener("click", () => popup.style.display = "block");
  }

  window.addEventListener("click", (event) => {
    if (event.target === popup) popup.style.display = "none";
  });

  if (hamburguer && links) {
    hamburguer.addEventListener("click", () => {
      links.classList.toggle("menu__links--show");
    });
  }

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
    if (errorCard) {
      errorCard.style.display = productos.length > 0 ? "none" : "block";
    } else {
      console.warn("⚠️ No se encontró #errorCard");
    }
  }

  function cargarProductos(array) {
    if (!cardContainer) {
      console.error("No se encontró el contenedor de tarjetas.");
      return;
    }

    cardContainer.innerHTML = ''; // Limpiar antes
    array.forEach((producto) => {
      cardContainer.innerHTML += retornarCardHTML(producto);
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

    document.querySelector('.cerrar').onclick = () => {
      modal.style.display = 'none';
    };

    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  function obtenerProductos() {
    fetch(URL_Productos)
      .then(response => {
        if (!response.ok) throw new Error("Error de respuesta");
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No hay productos válidos");
        }
        productos.push(...data);
        cargarProductos(productos);
        promptErrorCard();
      })
      .catch(error => {
        console.error("Error al cargar productos:", error);
        promptErrorCard(); // Mostramos el mensaje de error
      });
  }

  // Iniciar carga
  obtenerProductos();
});
