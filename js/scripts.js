// const mercadopago = new MercadoPago('TEST-e442dbbb-1f38-489f-b3b8-816c541aaf90', {
//   locale: 'es-AR'
// });

// Handle call to backend and generate preference.
document.getElementById("checkout-btn").addEventListener("click", function () {

  $('#checkout-btn').attr("disabled", true);

  const orderData = {
    items: cartProducts.map(product => ({
      id: product.id,
      title: product.name,
      unit_price: product.price,
      quantity: product.amount
    }))
  };

  fetch(`api/create_preference`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (preference) {
    createCheckoutButton(preference.id);

    $(".shopping-cart").fadeOut(500);
    setTimeout(() => {
      $(".container_payment").show(500).fadeIn();
    }, 500);
  })

});

function createCheckoutButton(preferenceId) {

  // Initialize the checkout
  const bricksBuilder = mercadopago.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create(
      'wallet',
      'checkout-btn', // class/id where the payment button will be displayed
      {
        initialization: {
          preferenceId: preferenceId
        },
        callbacks: {
          onError: (error) => console.error(error),
          onReady: () => {}
        }
      }
    );
  };
  window.checkoutButton =  renderComponent(bricksBuilder);
}