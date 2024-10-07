// Función para obtener los parámetros de la URL
function getUrlParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let id = urlParams.get("id");

    if (id === "null") {
        id = null;
    }

    return {
        id,
    };
}

// Obtener los productos del carrito para un usuario específico
async function getCart(id) {
    const req = await fetch(`https://fakestoreapi.com/carts/${id}`);
    const cart = await req.json();
    const resultsElem = document.querySelector("#products");

    // Obtener detalles de cada producto en el carrito
    const data = await Promise.all(
        cart.products.map(async (product) => {
            return await getProduct(product.productId, product.quantity);
        })
    );

    resultsElem.innerHTML = data.join(""); // Mostrar los productos en la página
}

// Obtener los detalles del producto por ID
async function getProduct(id, quantity) {
    const req = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await req.json();

    return `
        <tr>
          <td>${product.title}</td>
          <td>${quantity}</td>
          <td>${product.price}</td>
          <td>${quantity * product.price}</td>
        </tr>
      `;
}

// Obtener todos los carritos
async function getCarts() {
    const resultsElem = document.querySelector("#carts");
    const req = await fetch("https://fakestoreapi.com/carts/");
    const data = await req.json();

    // Mostrar una lista de carritos con enlaces
    resultsElem.innerHTML = data
        .map((cart) => {
            return `
          <tr>
            <td>${cart.id}</td>
            <td>${cart.date}</td>
            <td><a href="?id=${cart.id}">Ver</a></td>
          </tr>
        `;
        })
        .join("");
}

// Inicializar al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    const { id } = getUrlParams();

    if (id) {
        document.querySelector("#all-carts").classList.add("hidden");
        getCart(id); // Si hay un ID en la URL, mostrar los detalles del carrito
    } else {
        document.querySelector("#cart-details").classList.add("hidden");
        getCarts(); // Si no hay ID, mostrar todos los carritos
    }
});
