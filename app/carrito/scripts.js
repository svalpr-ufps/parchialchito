document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart');
    const addToCartBtn = document.getElementById('addToCartBtn');
    let products = [];

    // Fetch the cart for user 2 and display the products
    function fetchCart() {
        fetch('https://fakestoreapi.com/carts/user/2')
            .then(res => res.json())
            .then(cartData => {
                cartContainer.innerHTML = '';
                products = cartData[0]?.products || [];
                if (products.length > 0) {
                    let cartList = document.createElement('ul');
                    products.forEach(item => {
                        let listItem = document.createElement('li');
                        listItem.textContent = `Producto ID: ${item.productId}, Cantidad: ${item.quantity}`;
                        cartList.appendChild(listItem);
                    });
                    cartContainer.appendChild(cartList);
                } else {
                    cartContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Simulate adding a product to the cart
    function addToCart() {
        const newProduct = {
            productId: Math.floor(Math.random() * 20) + 1, // Simulamos un producto aleatorio entre 1 y 20
            quantity: 1
        };

        products.push(newProduct);
        updateCartUI();

        console.log('Producto agregado:', newProduct);
    }

    // Update the cart display UI
    function updateCartUI() {
        cartContainer.innerHTML = '';
        if (products.length > 0) {
            let cartList = document.createElement('ul');
            products.forEach(item => {
                let listItem = document.createElement('li');
                listItem.textContent = `Producto ID: ${item.productId}, Cantidad: ${item.quantity}`;
                cartList.appendChild(listItem);
            });
            cartContainer.appendChild(cartList);
        } else {
            cartContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
        }
    }

    // Initial cart fetch
    fetchCart();

    // Add product on button click
    addToCartBtn.addEventListener('click', addToCart);
});
