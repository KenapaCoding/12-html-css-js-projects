class Product{
    constructor(id,name,description, price, image){
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.image = image
    }

    displayCard(){
        return `
                <img src="${this.image}" alt="${this.name}">
                <h3>${this.name}</h3>
                <p>$${this.price.toFixed(2)}</p>
                <p id="quantity-${this.id}">Quantity in cart: 0</p>
                <button onclick="shoppingCart.viewProductDetail(${this.id})">View Details</button>
                <button onclick="shoppingCart.addToCart(${this.id}, ${true})">Add to Cart</button>
        
        `
    }
}

class CartItem{
    constructor(product, quantity =1){
        this.product = product
        this.quantity = quantity
    }
    incrementQuantity(){
        this.quantity ++
    }
    getTotalPrice(){
        return this.quantity * this.product.price
    }
}

class ShoppingCart{
    constructor(){
        this.products = []
        this.cart = []
    }
    addProduct(product){
        this.products.push(product)
    }
    displayProducts(){
        const productList = document.getElementById('product-list')
        productList.innerHTML = ''
        this.products.forEach(product => {
            const productCard = document.createElement('div')
            productCard.classList.add('product-card')
            productCard.innerHTML = product.displayCard()
            productList.appendChild(productCard)
        })
    }

    viewProductDetail(id){
        const product = this.products.find(p => p.id === id)
        document.getElementById('detail-image').src = product.image
        document.getElementById('detail-title').textContent = product.name
        document.getElementById('detail-description').textContent = product.description

        document.getElementById('detail-price').textContent = `$${product.price.toFixed(2)}`

        document.getElementById('add-to-cart-btn').setAttribute('onclick', `shoppingCart.addToCart(${product.id})`)

        this.toggleProductDetail()
    }

    toggleProductDetail(addFromDisplay = false){
        const modal = document.getElementById('product-modal')
        modal.style.display = modal.style.display === 'block'? 'none' : "block"
    }

    addToCart(id){
        const product = this.products.find(p=> p.id === id)
        const existingItem = this.cart.find(item => item.product.id === id)

        if (existingItem){
            existingItem.incrementQuantity()
        } else {
            this.cart.push(new CartItem(product))
        }

        this.updateCart()
        this.updateProductQuantity(id)
    }

    updateCart(){
        const cartItems = document.getElementById('cart-items')
        cartItems.innerHTML = ''
        let totalPrice = 0

        this.cart.forEach((item,index)=> {
            const itemTotalPrice = item.getTotalPrice()
            totalPrice += itemTotalPrice

            const li = document.createElement('li')

            li.innerHTML = `
                ${item.product.name} - $${item.product.price.toFixed(2)} x ${item.quantity} = $${itemTotalPrice.toFixed(2)}
                <button onclick="shoppingCart.removeFromCart(${index})">Remove</button>
            `
            cartItems.appendChild(li)
        })

        document.getElementById('cart-count').textContent = this.cart.reduce((sum,item) => sum + item.quantity,0)
        document.getElementById('total-price').textContent = totalPrice.toFixed(2)
    }

    updateProductQuantity(id){
        const cartItem = this.cart.find(item => item.product.id === id)
        const quantityElement = document.getElementById(`quantity-${id}`)


        if(cartItem) {
            quantityElement.textContent = `Quantity in cart: ${cartItem.quantity}`
        } else {
             quantityElement.textContent = `Quantity in cart: 0`
        }
    }

    removeFromCart(index){
        const removedItem = this.cart.splice(index,1)[0]
        this.updateCart()
        this.updateProductQuantity(removedItem.product.id)
    }

    toggleCart(){
        const modal = document.getElementById('cart-modal')
        modal.style.display = modal.style.display === 'block' ? 'none': 'block'
    }
}

// inisialisasi shopping cart dan product
const shoppingCart = new ShoppingCart()

shoppingCart.addProduct(
	new Product(
		1,
		'Product 1',
		'This is the description for Product 1',
		10.0,
		'https://images.unsplash.com/photo-1633455583769-4d8c28b50286?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D'
	)
);
shoppingCart.addProduct(
	new Product(
		2,
		'Product 2',
		'This is the description for Product 2',
		20.0,
		'https://images.unsplash.com/photo-1613140506142-277c6241b858?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	)
);
shoppingCart.addProduct(
	new Product(
		3,
		'Product 3',
		'This is the description for Product 3',
		30.0,
		'https://images.unsplash.com/photo-1520170350707-b2da59970118?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	)
);

shoppingCart.displayProducts()

window.onclick = function(event) {
    const cartModal = document.getElementById('cart-modal')
    const productModal = document.getElementById('product-modal')

    if(event.target == cartModal){
        cartModal.style.display = "none"
    }
    if(event.target == productModal){
        productModal.style.display = "none"
    }
}
