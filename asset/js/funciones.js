   // localStore
   function getLocalStorage(key) {
       return JSON.parse(localStorage.getItem(key));
   }

   function saveInLocalStorage(key, item) {

       localStorage.setItem(key, JSON.stringify(item));
   }

   // valor total sacado de la suma de los objetos que hay en carrito

   function totalPedido() {
       // a carrito lo itero con map y le hago reduce que agarro 1 lo sumo y le meto el siguiente

       return carrito.map(({
           monto
       }) => monto).reduce(((acumulador, numero) => acumulador + numero), 0);;
   }

   // Agregar a la carta los productos

   function cargarCarta(ObjetoProducto, sector) {

       // creo el html que voy a cargar cuando llega
       let ul = document.createElement('ul');
       ul.classList.add('contenedor-menu');
       ul.innerHTML = `<li class="producto">
<p class="indiceId">${ObjetoProducto.id}</p>
<p class="indiceProd">${ObjetoProducto.producto}</p>
<p class="indicePrecio">${ObjetoProducto.precio}</p>
<button class="cantidad botonCompra" id="${ObjetoProducto.id}">+</button>
</li>`;

       // sector es donde quiero que valla y lo cargo con appendChild la creado en ul
       sector.appendChild(ul);
   }

   // agrego al carrito el producto y al sector donde va
   function mostrarCarrito(ObjetoProducto, sector) {

       let ul = document.createElement('ul');
       ul.classList.add('contenedor-menu');
       ul.innerHTML = `<li class="producto ${ObjetoProducto.producto.id}">
<p class="indiceId">${ObjetoProducto.quantity}</p>
<p class="indiceProd">${ObjetoProducto.producto.producto}</p>
<p class="indicePrecio">${ObjetoProducto.monto}</p>
<button class="cantidad botonSacar" value="${ObjetoProducto.producto.id}">-</button>
</li>`;
       sector.appendChild(ul);

       //  como agrege un elemento al carrito debo agregar el click en sacar el producto 

       ul.addEventListener('click', function (event) {
           event.preventDefault();
           // si hay mas de 1 solo saco los producto del carrito, modifico el html y nuevo valor al pedido
           // si hay 1 solo saco producto del html, elimino de carrito y  nuevo valor al pedido

           if (ul.childNodes[0].childNodes[1].childNodes[0].textContent > 1) {


               carrito.forEach((ObjetoProducto, i) => {
                   if (ObjetoProducto.producto.id == ul.childNodes[0].classList[1]) {
                       // saco los producto del carrito
                       carrito[i].quantity--;
                       carrito[i].monto = carrito[i].producto.precio * carrito[i].quantity;

                       // modifico el html ** busco la classe donde poner los nuevos valores, luego copie del html el childnodes del texto que busco y piso el texto con textcontent
                       document.getElementsByClassName(carrito[i].producto.id)[0].childNodes[1].textContent = carrito[i].quantity;
                       document.getElementsByClassName(carrito[i].producto.id)[0].childNodes[5].textContent = carrito[i].monto;
                       return;
                   }
               });
           } else {
               // saco producto del html
               ul.parentNode.removeChild(ul);

               // elimino de carrito
               let nuevoCarrito = carrito.filter((evento) => {
                   return evento.producto.id !== Number(ul.childNodes[0].classList[1]);
               })
               // cargo a carrito
               carrito = nuevoCarrito;
           }
           // nuevo valor al pedido
           document.getElementsByClassName('valorTotal')[0].textContent = totalPedido();

       });


   }

   // AGREGAR AL CARRITO HACE: MODIFICA/AGRAGA ARRAY DEL CARRITO, MUESTRA/MODIFICA EN PEDIDO, HACE LA SUMA DEL PEDIDO Y AGREGA CLICK

   function agregarCarrito(pedidoId) {

       let codigo = false
       // recorro carrito en busca si ya esta cargado, si lo esta cargo
       carrito.forEach((ObjetoProducto, i) => {

           if (ObjetoProducto.producto.id === pedidoId) {

               // MODIFICA CARRITO
               carrito[i].quantity++;
               carrito[i].monto = carrito[i].producto.precio * carrito[i].quantity;

               // busco la classe donde poner los nuevos valores, luego copie del html el childnodes del texto que busco y piso el texto con textcontent
               document.getElementsByClassName(pedidoId)[0].childNodes[1].textContent = carrito[i].quantity;
               document.getElementsByClassName(pedidoId)[0].childNodes[5].textContent = carrito[i].monto;

               codigo = true
               return;
           }
       });
       if (codigo != true) {

           // creo el producto con monto y cantidad
           carrito.push(productos.find(({
               id
           }) => id === pedidoId).getCargar());

           // agrego al html el producto con la funcion mostrar creada antes 
           mostrarCarrito(productos.find(({id}) => id === pedidoId).getCargar(), document.querySelector('#myPedido'));
       }
       //poner el valor
       document.getElementsByClassName('valorTotal')[0].textContent = totalPedido();
   };


   function mostrarElMenu(titulo) {
       // oculto pedido 
       document.querySelector('.contenedorPedido').style.display = "none";
       // recorro contenedor y cambio a visible y oculto
       document.querySelectorAll('.contenedorproductos').forEach(prod => {
           if (titulo === prod.childNodes[1].textContent) {
               prod.style.display = "block";
               return;
           }
           prod.style.display = "none";
       });
   };

   function mostrarElPedido() {
       // oculto todo
       document.querySelectorAll('.contenedorproductos').forEach(prod => {
           prod.style.display = "none";

       });
       //muestro pedido
       document.querySelector('.contenedorPedido').style.display = "block";


   };