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
    // CARRITO DE COMPRAS
    // ---------------------------------------------

    const orderButtons = document.querySelectorAll('.card .btn-small');
    const cart = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartToggle = document.querySelector('.nav-link-action');
    const closeCartBtn = document.getElementById('btn-close-cart');
    const buyBtn = document.getElementById('btn-buy');

    let cartItems = [];

    // Abrir / cerrar carrito
    cartToggle.addEventListener('click', () => {
        cart.classList.toggle('open');
    });

    closeCartBtn.addEventListener('click', () => {
        cart.classList.remove('open');
    });

    // Agregar productos
    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.card');
            const title = card.querySelector('.card-title').innerText;
            const price = Number(card.querySelector('.card-price').dataset.price);

            // Feedback visual
            if (btn.classList.contains('is-added')) return;
            const originalText = btn.innerText;
            btn.classList.add('is-added');
            btn.innerText = '¡Agregado! ✔';

            setTimeout(() => {
                btn.classList.remove('is-added');
                btn.innerText = originalText;
            }, 1000);

            // Agregar o sumar producto
            const existingItem = cartItems.find(item => item.title === title);

            if (existingItem) {
                existingItem.qty++;
            } else {
                cartItems.push({ title, price, qty: 1 });
            }

            updateCart();
            cart.classList.add('open');
        });
    });

    // Render del carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let totalItems = 0;
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            totalItems += item.qty;
            totalPrice += item.price * item.qty;

            const li = document.createElement('li');
            li.classList.add('cart-item');

            li.innerHTML = `
            <span>${item.title}</span>
            <div class="cart-controls">
                <button class="minus">−</button>
                <span>${item.qty}</span>
                <button class="plus">+</button>
                <button class="remove">✕</button>
            </div>
        `;

            li.querySelector('.plus').addEventListener('click', () => {
                item.qty++;
                updateCart();
            });

            li.querySelector('.minus').addEventListener('click', () => {
                item.qty--;
                if (item.qty <= 0) cartItems.splice(index, 1);
                updateCart();
            });

            li.querySelector('.remove').addEventListener('click', () => {
                cartItems.splice(index, 1);
                updateCart();
            });

            cartItemsContainer.appendChild(li);
        });

        cartCount.textContent = totalItems;
        cartTotal.textContent = `$${totalPrice.toLocaleString('es-CL')}`;
    }

    // Comprar
    buyBtn.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Tu carrito está vacío ☕');
            return;
        }

        alert('¡Compra realizada con éxito! 🎉');
        cartItems = [];
        updateCart();
        cart.classList.remove('open');
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

