document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').value;

    // Aquí puedes agregar la lógica para enviar los datos a tu servidor o API
    // Por ejemplo, usando fetch para enviar los datos a un endpoint

    document.getElementById('message').innerText = `Producto ${productName} cargado con éxito!`;
});
