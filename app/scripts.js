// Variables
const categorySelect = document.getElementById('categorySelect');
const productList = document.getElementById('productList');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const goToCartBtn = document.getElementById('goToCartBtn');
const logoutBtn = document.getElementById('logoutBtn');

let cart = [];

// Consumir endpoint para obtener productos
async function fetchProducts(category = '') {
    let url = 'https://fakestoreapi.com/products'; // Reemplaza con el endpoint real
    if (category) {
        url += `?category=${category}`;
    }
    try {
        const response = await fetch(url);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Mostrar productos en la página
function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Precio: $${product.price}</p>
      <button onclick="addToCart('${product.id}')">Add to Cart</button>
    `;
        productList.appendChild(productDiv);
    });
}

// Filtrar productos por categoría
categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    fetchProducts(selectedCategory);
});

// Añadir producto al carrito
function addToCart(productId) {
    cart.push(productId);
    showNotification('Producto añadido al carrito');
}

// Mostrar notificación
function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

goToCartBtn.addEventListener('click', () => {
    alert('Vas al carrito con ' + cart.length + ' productos.');
    window.location.href = "carrito/index.html"; 
});

logoutBtn.addEventListener('click', () => {
    alert('Has cerrado sesión.');
    window.location.href= "../login/index.html";
});
