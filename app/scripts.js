// Variables
const goToCartBtn = document.getElementById('goToCartBtn');
const logoutBtn = document.getElementById('logoutBtn');

let cart = [];
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
    window.location.href = "carrito"; 
});

logoutBtn.addEventListener('click', () => {
    alert('You have logged out.');
    window.location.href= "../login";
});


const botones = document.querySelectorAll('.categoria-btn');
const productosDiv = document.getElementById('productos');

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const categoria = boton.getAttribute('data-categoria');
        obtenerProductos(categoria);
    });
});

function obtenerProductos(categoria) {
    fetch(`https://fakestoreapi.com/products/category/${categoria}`)
        .then(res => res.json())
        .then(json => mostrarProductos(json))
        .catch(error => console.error('Error:', error));
}

function mostrarProductos(productos) {
    productosDiv.innerHTML = '';
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <h3>${producto.title}</h3>
            <p>Precio: $${producto.price}</p>
            <img src="${producto.image}" alt="${producto.title}" style="width: 100px;">
        `;
        productosDiv.appendChild(productoDiv);
    });
}
