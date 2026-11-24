/* =========================================================
   LÚMINA INVITACIONES
   Interactividad y funcionalidades
========================================================= */

(() => {
    "use strict";


    /* =========================
       CONFIGURACIÓN
    ========================= */

    const CONFIG = {
        whatsapp: "51923624655",
        asesor: "Jeferson",
        desktopQuery: "(min-width: 801px)"
    };

    const SALUDO = `Hola, ${CONFIG.asesor} 👋`;

    const MENSAJE_GENERAL =
        `${SALUDO} Estoy interesado/a en las invitaciones digitales de Lúmina. ` +
        `Me gustaría recibir información sobre los diseños y paquetes disponibles para mis quince años.`;

    // Fotos extra para la galería de las demos
    const GALERIA_EXTRA = [
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=75",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=75"
    ];

    const DEMOS = {
        royal: {
            name: "Royal Blue",
            theme: "royal",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=75",
            color: "#263b68",
            accent: "#d5c3a0",
            nameGirl: "Valentina",
            dateISO: "2027-08-15T19:00:00",
            location: "Palacio de Celebraciones",
            message: "Con mucha ilusión, quiero invitarte a celebrar una noche mágica junto a mí."
        },
        pink: {
            name: "Pink Dream",
            theme: "pink",
            image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=75",
            color: "#a75e76",
            accent: "#f5d8df",
            nameGirl: "Sofía",
            dateISO: "2027-09-20T19:00:00",
            location: "Jardín de los Sueños",
            message: "Un sueño se hace realidad y quiero compartir este momento tan especial contigo."
        },
        butterfly: {
            name: "Butterfly Garden",
            theme: "butterfly",
            image: "https://images.unsplash.com/photo-1493976042213-8dbf9f4e8f13?auto=format&fit=crop&w=800&q=75",
            color: "#77718e",
            accent: "#e4d9ed",
            nameGirl: "Camila",
            dateISO: "2027-10-10T19:00:00",
            location: "Quinta Primavera",
            message: "Como las mariposas, los sueños nos llevan a lugares maravillosos."
        },
        gold: {
            name: "Golden Night",
            theme: "gold",
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=75",
            color: "#27231e",
            accent: "#d7b66f",
            nameGirl: "Isabella",
            dateISO: "2027-12-05T20:00:00",
            location: "Salón Imperial",
            message: "Te invito a compartir conmigo una noche llena de magia, alegría y recuerdos."
        },
        forest: {
            name: "Enchanted Garden",
            theme: "forest",
            image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=75",
            color: "#304d3c",
            accent: "#d6d8a9",
            nameGirl: "Luciana",
            dateISO: "2027-07-18T18:30:00",
            location: "Bosque Encantado",
            message: "En un mundo de sueños, magia y naturaleza, comienza una nueva historia."
        },
        minimal: {
            name: "Minimal Elegance",
            theme: "minimal",
            image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=75",
            color: "#8c7860",
            accent: "#fff3df",
            nameGirl: "Mariana",
            dateISO: "2027-11-22T19:00:00",
            location: "Casa de Eventos",
            message: "Hay momentos que se convierten en recuerdos para toda la vida. Me encantaría compartirlo contigo."
        }
    };


    /* =========================
       UTILIDADES
    ========================= */

    const $ = (id) => document.getElementById(id);

    const pad = (n) => String(n).padStart(2, "0");

    const esc = (value) =>
        String(value).replace(/[&<>"']/g, (c) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c]));

    const enlaceWhatsApp = (mensaje) =>
        `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;

    const abrirWhatsApp = (mensaje) =>
        window.open(enlaceWhatsApp(mensaje), "_blank", "noopener");

    // La fecha y la hora salen de dateISO: una sola fuente de verdad
    const formatoFecha = new Intl.DateTimeFormat("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const formatoHora = new Intl.DateTimeFormat("es-PE", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

    const fechaDemo = (demo) => formatoFecha.format(new Date(demo.dateISO));
    const horaDemo = (demo) => formatoHora.format(new Date(demo.dateISO));


    /* =========================
       ELEMENTOS
    ========================= */

    const header = $("header");
    const menuToggle = $("menuToggle");
    const nav = $("nav");

    const catalogFilters = $("catalogFilters");
    const catalogGrid = $("catalogGrid");
    const catalogCount = $("catalogCount");

    const previewModal = $("previewModal");
    const modalBackdrop = $("modalBackdrop");
    const modalClose = $("modalClose");
    const previewTitle = $("previewTitle");
    const previewScreen = $("previewScreen");
    const previewQuoteButton = $("previewQuoteButton");

    const contactButton = $("contactButton");
    const whatsappFloat = $("whatsappFloat");


    /* =========================
       MENÚ MÓVIL
    ========================= */

    const isMenuOpen = () => !!nav && nav.classList.contains("open");

    function setMenu(open) {
        if (!menuToggle || !nav) return;

        nav.classList.toggle("open", open);
        menuToggle.classList.toggle("active", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    }

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => setMenu(!isMenuOpen()));

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenu(false));
        });

        // Cerrar al hacer clic fuera
        document.addEventListener("click", (event) => {
            if (
                isMenuOpen() &&
                !nav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                setMenu(false);
            }
        });

        // Si se agranda la pantalla, el menú móvil debe quedar cerrado
        window.matchMedia(CONFIG.desktopQuery).addEventListener("change", (e) => {
            if (e.matches) setMenu(false);
        });
    }


    /* =========================
       FILTROS DEL CATÁLOGO
    ========================= */

    if (catalogFilters && catalogGrid) {

        const filterButtons = catalogFilters.querySelectorAll(".filter-btn");
        const designCards = catalogGrid.querySelectorAll(".design-card");

        filterButtons.forEach((button) => {

            button.addEventListener("click", () => {

                const filter = button.dataset.filter;
                let visibleCount = 0;

                filterButtons.forEach((btn) => {
                    const active = btn === button;
                    btn.classList.toggle("active", active);
                    btn.setAttribute("aria-pressed", String(active));
                });

                designCards.forEach((card) => {
                    const show = filter === "all" || card.dataset.category === filter;
                    card.hidden = !show;
                    if (show) visibleCount++;
                });

                if (catalogCount) {
                    catalogCount.textContent = pad(visibleCount);
                }
            });
        });
    }


    /* =========================
       ENLACES DE WHATSAPP
    ========================= */

    [contactButton, whatsappFloat].forEach((link) => {
        if (link) link.href = enlaceWhatsApp(MENSAJE_GENERAL);
    });


    /* =========================
       CLICS DEL CATÁLOGO Y PAQUETES
       (un solo listener para todos)
    ========================= */

    document.addEventListener("click", (event) => {

        const preview = event.target.closest("[data-preview]");

        if (preview) {
            abrirModal(preview.dataset.preview, preview);
            return;
        }

        const designBtn = event.target.closest(".design-contact");

        if (designBtn) {
            const design = designBtn.dataset.design || "un diseño del catálogo";

            abrirWhatsApp(
                `${SALUDO} Vi el catálogo de Lúmina y me interesa el diseño *${design}*. ` +
                `Quisiera recibir información y una cotización para mis quince años.`
            );
            return;
        }

        const packageBtn = event.target.closest(".package-button");

        if (packageBtn) {
            const pack = packageBtn.dataset.package || "un paquete";

            abrirWhatsApp(
                `${SALUDO} Estoy interesado/a en el paquete *${pack}* de Lúmina para mis quince años. ` +
                `¿Podrías brindarme más información?`
            );
        }
    });


    /* =========================
       MODAL DE DEMOSTRACIÓN
    ========================= */

    const modal = {
        demo: null,
        trigger: null,
        countdown: null
    };

    const isModalOpen = () =>
        !!previewModal && previewModal.classList.contains("show");


    function abrirModal(demoKey, trigger) {

        const demo = DEMOS[demoKey];

        if (!demo || !previewModal) return;

        modal.demo = demo;
        modal.trigger = trigger || null;

        previewTitle.textContent = demo.name;

        renderPortada(demo);

        previewModal.classList.add("show");
        previewModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        setTimeout(() => modalClose && modalClose.focus(), 100);
    }


    function cerrarModal() {

        if (!isModalOpen()) return;

        detenerCuentaRegresiva();

        previewModal.classList.remove("show");
        previewModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        // Devolver el foco al botón que abrió la demo
        if (modal.trigger && typeof modal.trigger.focus === "function") {
            modal.trigger.focus();
        }

        modal.demo = null;
        modal.trigger = null;
    }


    if (modalClose) modalClose.addEventListener("click", cerrarModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", cerrarModal);


    // Botón "Quiero este diseño"
    if (previewQuoteButton) {

        previewQuoteButton.addEventListener("click", () => {

            if (!modal.demo) return;

            abrirWhatsApp(
                `${SALUDO} Me interesa el diseño *${modal.demo.name}* que vi en tu catálogo. ` +
                `Quiero personalizarlo para mis quince años. ¿Podrías brindarme información sobre los paquetes?`
            );
        });
    }


    // Teclado: Escape cierra, Tab queda atrapado dentro del modal
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            if (isModalOpen()) {
                cerrarModal();
            } else if (isMenuOpen()) {
                setMenu(false);
                if (menuToggle) menuToggle.focus();
            }
            return;
        }

        if (event.key !== "Tab" || !isModalOpen()) return;

        const container = previewModal.querySelector(".preview-modal-container");

        const focusables = container.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });


    /* =========================
       DEMO: PORTADA
    ========================= */

    function renderPortada(demo) {

        if (!previewScreen) return;

        detenerCuentaRegresiva();

        previewScreen.innerHTML = `
            <div class="demo-cover demo-theme-${esc(demo.theme)}"
                 style="--demo-image:url('${esc(demo.image)}');--demo-accent:${esc(demo.accent)};">

                <div class="demo-cover-inner">

                    <span class="demo-deco" aria-hidden="true">✦</span>

                    <span class="demo-eyebrow">UNA CELEBRACIÓN ESPECIAL</span>

                    <span class="demo-xv">XV</span>

                    <h2>Mis <em>Quince Años</em></h2>

                    <span class="demo-line" aria-hidden="true"></span>

                    <p class="demo-name">${esc(demo.nameGirl)}</p>

                    <span class="demo-date">${esc(fechaDemo(demo))}</span>

                    <button type="button" class="demo-enter" id="demoEnter">
                        Abrir invitación <span aria-hidden="true">♡</span>
                    </button>

                    <span class="demo-cover-note">UNA NOCHE PARA RECORDAR</span>

                </div>
            </div>
        `;

        const enterButton = $("demoEnter");

        if (enterButton) {
            enterButton.addEventListener("click", () => renderContenido(demo));
            enterButton.focus();
        }
    }


    /* =========================
       DEMO: INTERIOR
    ========================= */

    function renderContenido(demo) {

        if (!previewScreen) return;

        const mapsUrl =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(demo.location);

        const galeria = [demo.image, ...GALERIA_EXTRA]
            .map((src, i) => `
                <img src="${esc(src)}"
                     alt="Fotografía de referencia ${i + 1}"
                     width="600" height="600"
                     loading="lazy" decoding="async">
            `)
            .join("");

        previewScreen.innerHTML = `
            <div class="demo-content" tabindex="-1"
                 style="--demo-color:${esc(demo.color)};--demo-accent:${esc(demo.accent)};">

                <section class="demo-welcome">
                    <span class="demo-small">CON MUCHO AMOR</span>
                    <h2>${esc(demo.nameGirl)}</h2>
                    <p>${esc(demo.message)}</p>
                    <span class="demo-welcome-xv" aria-hidden="true">XV</span>
                    <span class="demo-welcome-date">${esc(fechaDemo(demo))}</span>
                </section>


                <section class="demo-event">

                    <span class="demo-small">ESTÁS INVITADO</span>

                    <h3>Mis Quince Años</h3>

                    <div class="demo-event-details">
                        <div>
                            <span>FECHA</span>
                            <strong>${esc(fechaDemo(demo))}</strong>
                        </div>
                        <div>
                            <span>HORA</span>
                            <strong>${esc(horaDemo(demo))}</strong>
                        </div>
                        <div>
                            <span>LUGAR</span>
                            <strong>${esc(demo.location)}</strong>
                        </div>
                    </div>

                    <div class="demo-countdown" role="timer" aria-label="Cuenta regresiva para el evento">
                        <div><strong id="countDays">00</strong><span>DÍAS</span></div>
                        <div><strong id="countHours">00</strong><span>HORAS</span></div>
                        <div><strong id="countMinutes">00</strong><span>MIN</span></div>
                        <div><strong id="countSeconds">00</strong><span>SEG</span></div>
                    </div>

                    <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="demo-map">
                        Ver ubicación en Google Maps <span aria-hidden="true">↗</span>
                    </a>

                </section>


                <section class="demo-gallery">
                    <span class="demo-small">RECUERDOS</span>
                    <h3>Momentos especiales</h3>
                    <div class="demo-gallery-grid">${galeria}</div>
                    <p>Cada recuerdo forma parte de una hermosa historia.</p>
                </section>


                <section class="demo-rsvp">
                    <span class="demo-small">TU PRESENCIA ES MI REGALO</span>
                    <h3>¿Nos acompañas?</h3>
                    <p>Confirma tu asistencia para este día especial.</p>

                    <button type="button" class="demo-confirm" id="demoConfirm">
                        Confirmar asistencia <span aria-hidden="true">♡</span>
                    </button>

                    <p class="demo-confirm-note" id="demoConfirmNote" role="status" hidden>
                        Así verían tus invitados la confirmación. Es solo una demostración.
                    </p>
                </section>


                <footer class="demo-footer">
                    <span>HECHO CON AMOR</span>
                    <strong>LÚMINA</strong>
                </footer>

            </div>
        `;

        const content = previewScreen.querySelector(".demo-content");
        if (content) content.focus({ preventScroll: true });

        iniciarCuentaRegresiva(demo);
        iniciarConfirmacion();
    }


    /* =========================
       DEMO: CUENTA REGRESIVA
    ========================= */

    function detenerCuentaRegresiva() {
        if (modal.countdown) {
            clearInterval(modal.countdown);
            modal.countdown = null;
        }
    }


    function iniciarCuentaRegresiva(demo) {

        detenerCuentaRegresiva();

        const target = new Date(demo.dateISO).getTime();

        const els = {
            days: $("countDays"),
            hours: $("countHours"),
            minutes: $("countMinutes"),
            seconds: $("countSeconds")
        };

        function actualizar() {

            const distance = Math.max(0, target - Date.now());

            const values = {
                days: Math.floor(distance / 86400000),
                hours: Math.floor((distance % 86400000) / 3600000),
                minutes: Math.floor((distance % 3600000) / 60000),
                seconds: Math.floor((distance % 60000) / 1000)
            };

            Object.keys(els).forEach((key) => {
                if (els[key]) els[key].textContent = pad(values[key]);
            });
        }

        actualizar();

        modal.countdown = setInterval(actualizar, 1000);
    }


    /* =========================
       DEMO: CONFIRMAR ASISTENCIA
       Es solo una demo: no envía mensajes al negocio
    ========================= */

    function iniciarConfirmacion() {

        const button = $("demoConfirm");
        const note = $("demoConfirmNote");

        if (!button) return;

        button.addEventListener("click", () => {

            button.classList.add("is-confirmed");
            button.disabled = true;
            button.innerHTML = `¡Asistencia confirmada! <span aria-hidden="true">✓</span>`;

            if (note) note.hidden = false;
        });
    }


    /* =========================
       AÑO AUTOMÁTICO
    ========================= */

    const currentYear = $("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================
       ANIMACIÓN AL SCROLL
    ========================= */

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const elementsToAnimate = document.querySelectorAll(
            ".intro-left, .intro-right, .design-card, .experience-card, " +
            ".process-step, .package-card, .personalization-content"
        );

        const observer = new IntersectionObserver(
            (entries, instance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        instance.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        elementsToAnimate.forEach((element) => {

            // Pequeño retraso escalonado dentro de cada grilla
            const index = Array.from(element.parentElement.children).indexOf(element);
            element.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);

            element.classList.add("reveal");
            observer.observe(element);
        });
    }


    /* =========================
       HEADER AL HACER SCROLL
    ========================= */

    if (header) {

        let ticking = false;

        const actualizarHeader = () => {
            header.classList.toggle("header-scrolled", window.scrollY > 30);
            ticking = false;
        };

        window.addEventListener(
            "scroll",
            () => {
                if (!ticking) {
                    window.requestAnimationFrame(actualizarHeader);
                    ticking = true;
                }
            },
            { passive: true }
        );

        actualizarHeader();
    }

})();