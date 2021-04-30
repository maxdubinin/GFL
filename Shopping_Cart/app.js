const productDOM = document.querySelector(".product__list");
const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart__list");
const cartTotal = document.querySelector(".cart__total-price");
const itemTotals = document.querySelector(".item__total");

let cart = [];

let buttonDOM = [];

class UI {
  displayProducts(products) {
    let results = "";
    let disabled;
    products.forEach(({ name, price, id, available }) => {

      if(available <= 0) {
        disabled = 'disabled';
      } else {
        disabled = '';
      }
      results += `<!-- Single Product -->
      <div class="product__item">
          <h3 class="product__name">${name}</h3>
          <span class="product__price">$${price}</span>
          <button class="product__btn" type="button" data-id=${id} ${disabled}>add</button>
         </div>
      <!-- End of Single Product -->`;
    });
    productDOM.innerHTML = results;
  }

  getButtons() {
    const buttons = [...document.querySelectorAll(".product__btn")];
    buttonDOM = buttons;
    buttons.forEach(button => {
      const id = button.dataset.id;
      const inCart = cart.find(item => item.id === parseInt(id, 10));

      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }

      button.addEventListener("click", e => {
        e.preventDefault();
        e.target.innerHTML = "In Cart";
        e.target.disabled = true;

        // Get product from products
        const cartItem = { ...Storage.getProduct(id), amount: 1 };

        // Add product to cart
        cart = [...cart, cartItem];
        // save the cart in local storage
        Storage.saveCart(cart);
        // set cart values
        this.setItemValues(cart);
        // display the cart item
        this.addCartItem(cartItem);
        // show the cart
      });
    });
  }

  setItemValues(cart) {
    let tempTotal = 0;
    let itemTotal = 0;

    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemTotal += item.amount;
    });
    cartTotal.innerText = `$ ${parseFloat(tempTotal.toFixed(2))}`;
    itemTotals.innerText = itemTotal;
  }

  addCartItem({ price, name, id, amount }) {
    const div = document.createElement("div");
    div.classList.add("cart__item");

    let divContent = `<div class="cart__block cart__block--first">
                    <h3 class="cart__name">${name}</h3>
                    <span class="cart__price">$${price}</span>
                </div>
                <div class="cart__block cart__block cart__buttons">
                    <button class="cart__btn cart__btn-remove" type="button" data-id=${id}>-</button>
                    <button class="cart__btn cart__btn-add" type="button" data-id=${id}>+</button>
                    <div class="cart__quantity">${amount}</div>
                </div>`;
    div.innerHTML = divContent;
    cartContent.appendChild(div);
  }


  setAPP() {
    cart = Storage.getCart();
    this.setItemValues(cart);
    this.populate(cart);
  }

  populate(cart) {
    cart.forEach(item => this.addCartItem(item));
  }

  cartLogic() {

    // Cart Functionality
    cartContent.addEventListener("click", e => {
      const target = e.target;
      console.log(target);

      if (!target) return;

      // + -
      if (target.classList.contains("cart__btn-add")) {
        const id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);
        if(!(tempItem.amount === tempItem.available)) {
          tempItem.amount++;
          Storage.saveCart(cart);
          this.setItemValues(cart);
          let cartElementPrice = e.target.parentElement.previousElementSibling.children[1];
          let cartPriceValue = parseFloat(tempItem.price * tempItem.amount);
          cartElementPrice.innerText = `$${cartPriceValue}`;
          target.nextElementSibling.innerText = tempItem.amount;
        }

      } else if (target.classList.contains("cart__btn-remove")) {
          const id = parseInt(target.dataset.id, 10);
          let tempItem = cart.find(item => item.id === id);

          tempItem.amount--;
          let cartElementPrice = e.target.parentElement.previousElementSibling.children[1];
          let cartPriceValue = parseFloat(tempItem.price * tempItem.amount);
          cartElementPrice.innerText = `$${cartPriceValue}`;
          target.nextElementSibling.nextElementSibling.innerText = tempItem.amount;

        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setItemValues(cart);
          target.nextElementSibling.nextElementSibling.innerText = tempItem.amount;
        } else {
          this.removeItem(id);
          cartContent.removeChild(target.parentElement.parentElement);
        }

      }
    });
  }


  removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    this.setItemValues(cart);
    Storage.saveCart(cart);

    let button = this.singleButton(id);
    button.disabled = false;
    button.innerText = "Add";
  }

  singleButton(id) {
    return buttonDOM.find(button => parseInt(button.dataset.id) === id);
  }
}

// Products
class Products {
  async getProducts() {
    try {
      const USERS_LINK = 'http://my-json-server.typicode.com/achubirka/db/products';
      const result = await fetch(USERS_LINK);
      const data = await result.json();
      const products = data;
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}

class Storage {
  static saveProduct(obj) {
    localStorage.setItem("products", JSON.stringify(obj));
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.id === parseFloat(id, 10));
  }

  static getCart() {
    return localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const productList = new Products();
  const ui = new UI();

  ui.setAPP();

  const products = await productList.getProducts();
  ui.displayProducts(products);
  Storage.saveProduct(products);
  ui.getButtons();
  ui.cartLogic();
});
