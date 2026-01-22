/* =========================================
   LOGICA DEL SITIO - AROMA & GRANO
   Manipulación de estados SMACSS (is-*)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {


    // ---------------------------------------------
    // 1. EFECTO SCROLL EN HEADER
    // Objetivo: Añadir sombra cuando el usuario baja
    // ---------------------------------------------
    const header = document.querySelector('.l-header');

    window.addEventListener('scroll', () => {
        // Si bajamos más de 50px, añadimos la clase de estado
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // ---------------------------------------------
    // 2. INTERACCIÓN BOTONES DE PEDIDO + Carrito
    // ---------------------------------------------
    // ---------------------------------------------
    // Carrito funcional completo
    // ---------------------------------------------

    const orderButtons = document.querySelectorAll('.card .btn-small');
    const cart = document.getElementById('cart');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const btnBuy = document.getElementById('btn-buy');
    const btnCloseCart = document.getElementById('btn-close-cart');

    let cartItems = []; // arreglo de productos {title, quantity}
    const navCart = document.getElementById('nav-cart');

    // Abrir carrito al hacer clic en icono del nav
    navCart.addEventListener('click', () => {
        cart.classList.add('open');
    });

    // Función para cerrar carrito
    function closeCart() {
        cart.classList.remove('open');
    }

    // Función para actualizar carrito en pantalla
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let totalItems = 0;

        cartItems.forEach((item, index) => {
            totalItems += item.quantity;

            const li = document.createElement('li');
            li.innerHTML = `
            ${item.title} 
            <span>
                <button class="minus" data-index="${index}">-</button>
                ${item.quantity}
                <button class="plus" data-index="${index}">+</button>
            </span>
            <button class="remove" data-index="${index}">x</button>
        `;
            cartItemsContainer.appendChild(li);
        });

        cartCount.innerText = totalItems;
        document.getElementById('cart-total').innerText = `Total items: ${totalItems}`;

        // Agregar eventos a botones + - x
        document.querySelectorAll('.plus').forEach(btn => {
            btn.addEventListener('click', e => {
                const i = e.target.dataset.index;
                cartItems[i].quantity++;
                updateCartUI();
            });
        });

        document.querySelectorAll('.minus').forEach(btn => {
            btn.addEventListener('click', e => {
                const i = e.target.dataset.index;
                if (cartItems[i].quantity > 1) {
                    cartItems[i].quantity--;
                } else {
                    cartItems.splice(i, 1);
                }
                updateCartUI();
            });
        });

        document.querySelectorAll('.remove').forEach(btn => {
            btn.addEventListener('click', e => {
                const i = e.target.dataset.index;
                cartItems.splice(i, 1);
                updateCartUI();
            });
        });
    }

    // Evento de los botones "Pedir"
    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const title = card.querySelector('.card-title').innerText;

            // Feedback visual
            const currentBtn = e.target;
            const originalText = currentBtn.innerText;
            if (currentBtn.classList.contains('is-added')) return;
            currentBtn.classList.add('is-added');
            currentBtn.innerText = "¡Agregado! ✔";
            setTimeout(() => {
                currentBtn.classList.remove('is-added');
                currentBtn.innerText = originalText;
            }, 1000);

            // Agregar al carrito
            const existingItem = cartItems.find(item => item.title === title);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ title, quantity: 1 });
            }

            updateCartUI();
            openCart();
        });
    });

    // Cerrar carrito
    btnCloseCart.addEventListener('click', closeCart);

    // Comprar
    btnBuy.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert("Tu carrito está vacío");
            return;
        }
        const deliveryType = document.getElementById('delivery-type').value;
        alert(`Compra exitosa! Tipo de entrega: ${deliveryType}`);
        cartItems = [];
        updateCartUI();
        closeCart();
    });

    // ---------------------------------------------
    // 3. MENSAJES ROTATIVOS EN TOPBAR
    // ---------------------------------------------

    const messages = [
        "🚚 Despacho a domicilio",
        "📍 Reservas disponibles",
        "🎟️ Descuentos especiales esta semana"
    ];

    let currentMessage = 0;
    const messageElement = document.getElementById("topbar-message");

    setInterval(() => {
        currentMessage = (currentMessage + 1) % messages.length;
        messageElement.textContent = messages[currentMessage];
    }, 3000); // cambia cada 3 segundos



    // ---------------------------------------------
    // 4. TOGGLE NAV MOBILE
    // ---------------------------------------------

    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    toggle.addEventListener('click', () => {
        nav.classList.toggle('is-open');
    });


    // ---------------------------------------------
    // 5. TABS
    // ---------------------------------------------
    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".tab-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove("is-active"));
            panels.forEach(p => p.classList.remove("is-active"));

            tab.classList.add("is-active");
            document.getElementById(target).classList.add("is-active");
        });
    });

    // ---------------------------------------------
    // 6. TESTIMONIAL SLIDER
    // ---------------------------------------------
    const track = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    let index = 0;
    let autoSlide;

    function updateSlider() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            index = (index + 1) % testimonials.length;
            updateSlider();
        }, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    // Botones
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        index = (index + 1) % testimonials.length;
        updateSlider();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        index = (index - 1 + testimonials.length) % testimonials.length;
        updateSlider();
        startAutoSlide();
    });

    // Pausar al hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);

    // Iniciar
    startAutoSlide();


    // ---------------------------------------------
    // 7. FOOTER
    // ---------------------------------------------

    const footerForm = document.querySelector('.footer-form');

    footerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        footerForm.reset();
        alert('Gracias por escribirnos ☕ Te responderemos pronto.');
    });




});

