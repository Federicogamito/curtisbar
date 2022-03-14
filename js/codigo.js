const mensajeMenorEdad = () => { alert("No estamos autorizados a venderte alcohol :(") };

const esMayorDeEdad = JSON.parse(localStorage.getItem("mayorEdad"));

if (esMayorDeEdad === null) {
    let preguntarMayoriaEdad = prompt("¿Eres mayor de edad?");
    if (preguntarMayoriaEdad === "si") localStorage.setItem("mayorEdad", true);
    else if (preguntarMayoriaEdad === "no") {
        localStorage.setItem("mayorEdad", false);
        mensajeMenorEdad();
    };
} else if (esMayorDeEdad !== true) {
    mensajeMenorEdad();
}

const errorClave = () => { alert("Esa contraseña es incorrecta! Igualmente puedes ver nuestros productos y visitar nuestro instagram :D") };

const claveCorrecta = JSON.parse(localStorage.getItem("claveCorrecta"));

if (claveCorrecta === null) {
    let preguntarClave = prompt("Ingrese contraseña, si no la sabe, puede descubrirla en nuestro Instagram @curtisbar");
    if (preguntarClave === "curtis") localStorage.setItem("claveCorrecta", true);
    else if (preguntarClave !== "curtis") {
        localStorage.setItem("claveCorrecta", false);
        errorClave();
    };
} else if (claveCorrecta !== true) {
    errorClave();
}

const URL_POST = "https://jsonplaceholder.typicode.com/posts";

const producto = [
    { id: 1, Titulo: "Paradise", Precio: 550 },
    { id: 2, Titulo: "Gin Fizz", Precio: 500 },
    { id: 3, Titulo: "Derby", Precio: 550 },
    { id: 4, Titulo: "Brezza", Precio: 490 },
    { id: 5, Titulo: "Bramble", Precio: 500 },
    { id: 6, Titulo: "Bloody Mary", Precio: 550 }
];
const productoJSON = JSON.stringify(producto);

localStorage.setItem("productoJSON", productoJSON);
localStorage.setItem("producto", producto);
console.log(localStorage.getItem("producto"));

const productoDesdeLocalStorage = localStorage.getItem("productoJSON");
console.log(productoDesdeLocalStorage);

const productoParse = JSON.parse(productoDesdeLocalStorage);
console.log(productoParse);

 
// ARRANCANDO CON ARRAYS
class Producto {
  constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = parseFloat(precio);
      this.vendido = false;
  }
  sumaIva() {
      this.precio = this.precio * 1.21;
  }
}

// ajax y json
/*ESTE PRODUCTO LO ARME PARA INSTANCIAR EL JSON Y QUE COINCIDAN LOS PARÁMETROS QUE RECIBE*/
class ProductoII {
  constructor(id, img, titulo, precio) {
      this.id = id;
      this.img = img;
      this.titulo = titulo;
      this.precio = precio;
  }
  sumaIva() {
      this.precio = this.precio * 1.21;
  }
}

let displayTragosJSON;
//ESTE ARRAY ES EL QUE RECIBE LA INFO DE AJAX
/*FUNCION PARA INSTANCIAR EL JSON A UN OBJETO Y PODER APLICAR METODOS*/
const instancioDataTragos = (arrayTragosResponse) => {
  displayTragosJSON = arrayTragosResponse.map((item) => new ProductoII(
      item.id,
      item.img,
      item.titulo,
      item.precio
  ));
  divTragos(displayTragosJSON);

}
// json
// defino la url de mi API de datos
const urlProductos = './js/productos.json';
//hago el llamado a mi API para traer los datos 
$.get(urlProductos, (response, success) => {
  if (success === "success") {
      // funcion que muestra todas las variedades de tragos
      console.log('respuesta', response)
      instancioDataTragos(response);
      // divTragos(displayTragosJSON);
      const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
      addToShoppingCartButtons.forEach((addToCartButton) => {
          addToCartButton.addEventListener('click', addToCartClicked);
      });
  }
});

//console.log(displayTragosOptions);
// funcion para agregar al html

function divTragos(tragos) {
  const productContainer = document.querySelector('.main-container');
  productContainer.innerHTML = '';
  tragos.forEach(item => {
      productContainer.innerHTML +=
          `<section class="store">
  <div class="container">
      <div class="items">
      <div class="row">
              <div class="col-12 col-md-6">
                  <div class="item shadow mb-4">
                      <h3 class="title">${item.titulo}</h3>
                      <img class="item-image" src="${item.img}">
                      <div class="item-details">
                          <h4 class="price">${item.precio}</h4>
                          <button class="item-button btn btn-primary addToCart">AÑADIR AL CARRITO</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</section>`;
  });
  //displayTragos = displayTragos.join('');
  // productContainer.innerHTML = displayTragos;
}

// divTragos(displayTragosJSON);

// CARRITO 


const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.title').textContent;
  const itemPrice = item.querySelector('.price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
      'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
      if (elementsTitle[i].innerText === itemTitle) {
          let elementQuantity = elementsTitle[
              i
          ].parentElement.parentElement.parentElement.querySelector(
              '.shoppingCartItemQuantity'
          );
          elementQuantity.value++;
          $('.toast').toast('show');
          updateShoppingCartTotal();
          return;
      }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
<div class="row shoppingCartItem">
      <div class="col-6">
          <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
              <img src=${itemImage} class="shopping-cart-image">
              <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
          </div>
      </div>
      <div class="col-2">
          <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
              <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
          </div>
      </div>
      <div class="col-4">
          <div
              class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
              <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                  value="1">
              <button class="btn btn-danger buttonDelete" type="button">X</button>
          </div>
      </div>
  </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
      .querySelector('.buttonDelete')
      .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
      .querySelector('.shoppingCartItemQuantity')
      .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
      const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
          '.shoppingCartItemPrice'
      );
      const shoppingCartItemPrice = Number(
          shoppingCartItemPriceElement.textContent.replace('$', '')
      );
      const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
          '.shoppingCartItemQuantity'
      );
      const shoppingCartItemQuantity = Number(
          shoppingCartItemQuantityElement.value
      );
      total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}

// FORMULARIO

$("#form").on("submit", (e) => {
      e.preventDefault();
      const payload = { email: $("#email").val() };
      $.post(URL_POST, payload, (respuesta, estado) => {
          console.log(respuesta);
          console.log(estado);
          if (estado === "success") alert(`Los datos han sido guardados correctamente.`)
      })
  })
  // storage