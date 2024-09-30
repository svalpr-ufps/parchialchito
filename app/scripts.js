const productList = document.getElementById('productList');
const categorySelect = document.getElementById('categorySelect');

// Función para obtener categorías
async function loadCategories() {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await response.json();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
    loadProducts();  // Cargar productos después de obtener categorías
}

// Función para obtener productos
async function loadProducts(category = 'all') {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    // Filtrar productos por categoría
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

    // Mostrar productos
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
        `;
        productList.appendChild(productDiv);
    });
}

// Evento de cambio en la selección de categorías
categorySelect.addEventListener('change', (event) => {
    loadProducts(event.target.value);
});

// Cargar categorías al iniciar
loadCategories();
