// productos de la carta
class Carta {
    constructor(id, producto, precio) {
        this.id = id
        this.producto = producto
        this.precio = precio
    }
    getCargar = function () {
        return {
            producto: this,
            quantity: 1,
            monto: this.precio
        }
    }
}
// el array de productos de la carta
let productos = [];
console.log(productos)
// los cargo
productos.push(new Carta(101, "Papas Fritas", 300));
productos.push(new Carta(102, "Rabas", 500));
productos.push(new Carta(103, "Empanadas de carne", 100));
productos.push(new Carta(201, "Ravioles", 700));
productos.push(new Carta(202, "Sorrentinos", 750));
productos.push(new Carta(203, "Capeletinis", 800));
productos.push(new Carta(301, "Flan c/dulce de leche", 300));
productos.push(new Carta(302, "Frutillas c/Crema", 400));
productos.push(new Carta(303, "Bocha de Helado", 250));
productos.push(new Carta(401, "Coca Cola", 200));
productos.push(new Carta(402, "Fanta", 200));
productos.push(new Carta(403, "Sprite", 200));
productos.push(new Carta(404, "Soda", 200));
productos.push(new Carta(405, "Malbec", 750));
productos.push(new Carta(406, "Cabernet Franc", 800));
productos.push(new Carta(407, "Merlot", 750));
productos.push(new Carta(408, "Jarra de limonda", 300));

// grabo en el local store

saveInLocalStorage('ListaProductos', productos);

// creo la carta

let carrito = [];

// agrego los productos a la carta segun su id

productos.forEach(ObjetoProducto => {
    if ((100 < ObjetoProducto.id) && (ObjetoProducto.id < 200)) {
        cargarCarta(ObjetoProducto, document.querySelector('#Entradas'));
    }
    if ((200 < ObjetoProducto.id) && (ObjetoProducto.id < 300)) {
        cargarCarta(ObjetoProducto, document.querySelector('#Cocina'));
    }
    if ((300 < ObjetoProducto.id) && (ObjetoProducto.id < 400)) {
        cargarCarta(ObjetoProducto, document.querySelector('#Postres'));
    }
    if ((400 < ObjetoProducto.id) && (ObjetoProducto.id < 500)) {
        cargarCarta(ObjetoProducto, document.querySelector('#Bebidas'));
    }
});

// agrego click a los productos del carrito

document.querySelectorAll('.botonCompra').forEach(prod => {
    prod.addEventListener('click', function (event) {
        event.preventDefault();
        agregarCarrito(Number(prod.id));
    })
});

// muestro sector del menu al CLICK a menu

document.querySelectorAll('.mostrar').forEach(produ => {
    produ.addEventListener('click', function (event) {
        event.preventDefault();
        mostrarElMenu(produ.textContent);
    })
});


// muestro pedido al CLICK a PEDIDO 

document.querySelector('#pedir').addEventListener('click', function (event) {
    event.preventDefault();
    mostrarElPedido();
})

// agrego click en el boton comprar
let numeroFactura = 0;
document.querySelector('.mostrarComprar').addEventListener('click', function (event) {
    event.preventDefault();

    // saco lo que muestro el html

    document.querySelector('#myPedido').innerHTML = "";
    // guardar el el local storage sumandolo

    numeroFactura++;
    let factura = "factura" + numeroFactura;
    saveInLocalStorage(factura, carrito);

    // borrar el carrito
    carrito = [];

    //mostrar valor
    document.getElementsByClassName('valorTotal')[0].textContent = totalPedido();

});