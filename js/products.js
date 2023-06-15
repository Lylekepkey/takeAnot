const products = [
    {
        id: 1,
        Image: "https://i.postimg.cc/BnYCg5Pd/41-GUY1j8v-BL-1024x1024.jpg",
        name: "Jack Daniel's blend", //change names
        price: "1200",
        quantity: 5,
    },
    {
        id: 2,
        Image: "https://i.postimg.cc/d3yvtp5R/Jacobs3-1200x1200.webp",
        name: "Jacobs Zuma",
        price: "80",
        quantity: 5,
    },
    {
        id: 3,
        Image:  "https://i.postimg.cc/sgsVc7C9/douwe-egberts-200g.webp",
        name: `Douwe Egberts`,
        price: "120",
        quantity: 5,
    },
    {
        id: 4,
        Image: "https://i.postimg.cc/7PpQxDXC/4200145.png",
        name: "Lavazza", //change names
        price: "90",
        quantity: 5,
    },
    {
        id: 5,
        Image: "https://i.postimg.cc/GhwzWKhG/4300031-4.png",
        name: "Hug in A Mug",
        price: "50",
        quantity: 5,
    },
    {
        id: 6,
        Image:  "https://i.postimg.cc/tCNdLHcG/fe.png",
        name: "HUG in A Mug",
        price: "80",
        quantity: 5,
    },
    {
        id: 7,
        Image: "https://i.postimg.cc/rp3dyfbh/4070024.png",
        name: "Hot Chocolate", //change names
        price: "90",
        quantity: 5,
    },
    {
        id: 8,
        Image: "https://i.postimg.cc/yxV779VQ/4070025.png",
        name: "Espresso Beans",
        price: "180",
        quantity: 5,
    },
    {
        id: 9,
        Image:  "https://i.postimg.cc/YSKKpgR6/4500094-jpg.jpg",
        name: "Coffee beans",
        price: "120",
        quantity: 5,
    }
];

function displayProducts() {
    const ourProducts = document.getElementById("products");
    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
        <img src="${product.Image}" alt="${product.name}" id="product-imgs">
        <h3>${product.name}</h3>
        <p>${product.price}</p>        
        <button onclick="addToCart(${product.id})" class="addbtn">Add to cart</button>`;
        ourProducts.appendChild(productElement);
    });
}

let cart = JSON.parse(localStorage.getItem("Products")) || [];

function addToCart(productId) {
    const product = products.find((product) => product.id === productId);
    if (product && product.quantity > 0) {
        cart.push(product);
        product.quantity--;
        updateCart();
}
}

function removeFromCart(index) {
    let removedProduct = cart.splice(index, 1)[0];
    removedProduct.quantity++;
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById("cart-body");
    localStorage.setItem("Products", JSON.stringify(cart));
    cartContainer.innerHTML = "";
    cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        <span>${product.name}</span>
        <p>Total R ${product.price}
        <button onclick="removeFromCart(${index})" class="rembutton">✖</button></p>
        `;
        cartContainer.appendChild(cartItem);
});
    calculateTotal();
}

function calculateTotal() {
    let totalElement = document.getElementById("total");
    let total = 0 
    cart.forEach(item => {
        total +=  eval(item.price)
    })
    totalElement.textContent = `R${total}`;
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to proceed with the checkout.");
        return;
      }

    const modalFooter = document.querySelector(".modal-footer");
    modalFooter.innerHTML = `
        <div class="tick-animation" >
        <img src="https://i.postimg.cc/wxhvCdcV/green-tick-checkbox-illustration-isolated-on-white-background-free-vector.jpg"
        alt="Tick" style="width: 400px;">
        <p>Checkout successful!</p>
        </div>
    `;

    cart = [];
    updateCart(); 
}

let isAscending = true;

function sortProductsByPrice() {
    const ourProducts = document.getElementById("products");

    
    isAscending = !isAscending;
    
    const sortedProducts = products.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        if (isAscending) {
            return priceA - priceB;
        } else {
            return priceB - priceA; 
        }
    });

    ourProducts.innerHTML = "";
    
    sortedProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
        <img src="${product.Image}" alt="${product.name}" id="product-imgs">
        <h3>${product.name}</h3>
        <p>${product.price}</p>        
        <button onclick="addToCart(${product.id})" class="addbtn">Add to cart</button>`;
        ourProducts.appendChild(productElement);
    });
} 




displayProducts();

updateCart();



