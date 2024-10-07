// Obtener los parámetros de la URL
function getUrlParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let category = urlParams.get("category");

    if (category === "null") {
        category = null;
    }

    return {
        category,
    };
}

// Cargar y mostrar productos
async function loadProducts(category = '') {
    let url = 'https://fakestoreapi.com/products';

    // Si hay una categoría seleccionada, modificar la URL para filtrar
    if (category) {
        url += `/category/${category}`;
    }

    try {
        const req = await fetch(url);
        const products = await req.json();

        const productList = document.getElementById('product-list');
        // Limpiar el contenedor de productos
        productList.innerHTML = '';

        // Iterar sobre los productos y agregarlos al DOM
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p><strong>Precio:</strong> $${product.price}</p>
                <button onclick="addProduct(${product.id})">Agregar</button>
            `;

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        const productList = document.getElementById('product-list');
        productList.innerHTML = '<p>Hubo un error al cargar los productos.</p>';
    }
}

// Añadir producto al carrito
async function addProduct(id) {
    try {
        const req = await fetch("https://fakestoreapi.com/carts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: 5,
                date: new Date(),
                products: [{ productId: id, quantity: 1 }],
            }),
        });

        const data = await req.json();
        alert("Producto Agregado");
    } catch (err) {
        alert("No se ha podido agregar el producto");
    }
}

// Evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    const { category } = getUrlParams(); // Obtener la categoría de la URL
    loadProducts(category); // Cargar productos según la categoría

    // Añadir evento a los botones para filtrar por categoría
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            loadProducts(category); // Cargar productos según la categoría filtrada
        });
    });
});
