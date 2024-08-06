"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const database = [
        {
            id: 1,
            name: 'Aceite de Chia',
            price: 1,
            imagen: 'aceitechia250ml.jpg'
        },
        {
            id: 2,
            name: 'Aceite de palta',
            price: 2,
            imagen: 'aceitepalta.jpg'
        },
        {
            id: 3,
            name: 'Cafe Quero',
            price: 3,
            imagen: 'cafequero250gr.jpg'
        },
        {
            id: 4,
            name: 'Ghee-Mantequilla Clarificada',
            price: 4,
            imagen: 'ghee250ml.jpg'
        },
        {
            id: 5,
            name: 'Gin Intira',
            price: 5,
            imagen: 'ginintira700ml.jpg'
        },
        {
            id: 6,
            name: 'Matacuy',
            price: 6,
            imagen: 'matacuy375ml.jpg'
        },
        {
            id: 7,
            name: 'Miel Silvestre',
            price: 7,
            imagen: 'mielsilvestre300gr.jpg'
        },
        {
            id: 8,
            name: 'Yogurt Griego-Glika',
            price: 8,
            imagen: 'yogurtgriego700gr.jpg'
        },
        {
            id: 9,
            name: 'Legumbre - Ñuña',
            price: 9,
            imagen: 'ñuña.jpg'
        },
        {
            id: 10,
            name: 'Cashew Natural',
            price: 10,
            imagen: 'cashews.jpg'
        },
        {
            id: 11,
            name: 'Naranja Deshiadratada',
            price: 11,
            imagen: 'naranjadeshidratada.jpg'
        },
        {
            id: 12,
            name: 'Manzana Deshidratada',
            price: 12,
            imagen: 'manzanadeshidratada.jpg'
        }
    ]

    let cart = [];
    // const divisa = ' S/ ';
    const badge = ' S/ ';
    const DOMitems = document.querySelector('#items');
    // const DOMCarrito = document.querySelector('#carrito');
    const DOMcart = document.querySelector('#cart');
    const DOMtotal = document.querySelector('#total');
    // const DOMbotonVaciar = document.querySelector('#button-empty');
    const DOMbuttonEmpty = document.querySelector('#button-empty');

    function renderProducts() {
        database.forEach((info) => {
            // Estructura
            const myNodo = document.createElement('div');
            myNodo.classList.add('card', 'col-sm-4');
            // Body
            const myNodoCardBody = document.createElement('div');
            myNodoCardBody.classList.add('card-body');
            // Titulo
            const myNodoTitle = document.createElement('h5');
            myNodoTitle.classList.add('card-title');
            myNodoTitle.textContent = info.name;
            // Imagen
            const myNodoImagen = document.createElement('img');
            myNodoImagen.classList.add('img-fluid');
            myNodoImagen.setAttribute('src', "../img/" + info.imagen);
            // price
            const myNodoprice = document.createElement('p');
            myNodoprice.classList.add('card-text');
            myNodoprice.textContent = `${info.price}${badge}`;
            // Boton
            const myNodoBoton = document.createElement('button');
            myNodoBoton.classList.add('btn', 'btn-primary');
            myNodoBoton.textContent = '+';
            myNodoBoton.setAttribute('marcador', info.id);
            myNodoBoton.addEventListener('click', addProductCart);
            // Insertamos
            myNodoCardBody.appendChild(myNodoImagen);
            myNodoCardBody.appendChild(myNodoTitle);
            myNodoCardBody.appendChild(myNodoprice);
            myNodoCardBody.appendChild(myNodoBoton);
            myNodo.appendChild(myNodoCardBody);
            DOMitems.appendChild(myNodo);
        });
    }

    function renderCart() {
        // Vaciamos todo el html
        DOMcart.textContent = '';
        // Quitamos los duplicados
        
        const carritoSinDuplicados = [...new Set(cart)];
        console.log(carritoSinDuplicados);
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = database.filter((itemDatabase) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemDatabase.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = cart.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].name} - ${miItem[0].price}${badge}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcart.appendChild(miNodo);
        });
       // Renderizamos el precio total en el HTML
       DOMtotal.textContent = calculateTotal();
    }

    function addProductCart(evento) {
        // Anyadimos el Nodo a nuestro carrito
        cart.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito
        renderCart();

    }

    function calculateTotal() {
        // Recorremos el array del carrito
        return cart.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = database.filter((itemDatabase) => {
                return itemDatabase.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].price;
        }, 0).toFixed(2);
    }

    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        cart = cart.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderCart();
    }

    function emptyCart() {
        // Limpiamos los productos guardados
        cart = [];
        // Renderizamos los cambios
        renderCart();
    }

    // Eventos
    DOMbuttonEmpty.addEventListener('click', emptyCart);

    // Inicio
    renderProducts();
    renderCart();
});