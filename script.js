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
    // 2. INTERACCIÓN BOTONES DE PEDIDO
    // Objetivo: Dar feedback visual al hacer clic
    // ---------------------------------------------

    // Seleccionamos todos los botones pequeños de las cards
    const orderButtons = document.querySelectorAll('.card .btn-small');

    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentBtn = e.target;
            const originalText = currentBtn.innerText;

            // Evitamos que den clic muchas veces seguidas
            if (currentBtn.classList.contains('is-added')) return;

            // Cambiamos el estado visual
            currentBtn.classList.add('is-added');
            currentBtn.innerText = "¡Agregado! ✔";

            // Simulamos que pasaron 2 segundos y volvemos a la normalidad
            setTimeout(() => {
                currentBtn.classList.remove('is-added');
                currentBtn.innerText = originalText;
            }, 2000);
        });
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



});

