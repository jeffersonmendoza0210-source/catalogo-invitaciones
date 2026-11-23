
// IMPORTANTE: reemplaza este número por tu WhatsApp.
// Perú: 51 + número de celular, sin espacios ni signos.
const WHATSAPP = "51923624655";

const crearEnlaceWhatsApp = (mensaje) => {
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
};

// Menú para celulares
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {    
    nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
});

// Filtros del catálogo
const filtros = document.querySelectorAll(".filter");
const tarjetas = document.querySelectorAll(".design-card");

filtros.forEach(filtro => {
    filtro.addEventListener("click", () => {
        filtros.forEach(btn => btn.classList.remove("active"));
        filtro.classList.add("active");

        const categoria = filtro.dataset.filter;

        tarjetas.forEach(tarjeta => {
            const mostrar = categoria === "todos" ||
                tarjeta.dataset.category === categoria;

            tarjeta.style.display = mostrar ? "" : "none";
        });
    });
});

// Botones de contratación
document.querySelectorAll(".choose-package").forEach(boton => {
    boton.addEventListener("click", event => {
        event.preventDefault();

        const paquete = boton.dataset.package;
        const mensaje = `Hola, estoy interesado(a) en contratar una invitación digital. Me gustaría recibir información del paquete ${paquete}.`;

        window.open(crearEnlaceWhatsApp(mensaje), "_blank", "noopener");
    });
});

// Contacto general
const mensajeGeneral = "Hola, quisiera información sobre sus invitaciones digitales personalizadas.";

document.getElementById("contactButton").href =
    crearEnlaceWhatsApp(mensajeGeneral);

document.getElementById("whatsappFloat").href =
    crearEnlaceWhatsApp(mensajeGeneral);

document.getElementById("contactButton").target = "_blank";
document.getElementById("whatsappFloat").target = "_blank";

document.getElementById("contactButton").rel = "noopener";
document.getElementById("whatsappFloat").rel = "noopener";

// Año automático
document.getElementById("year").textContent = new Date().getFullYear();

/* SISTEMA DE VISTAS PREVIAS */

/* =====================================
   VISTAS PREVIAS INTERACTIVAS
===================================== */

const previewModal = document.getElementById("previewModal");
const closePreview = document.getElementById("closePreview");
const phonePreview = document.getElementById("demoCover");

const previewTitle = document.getElementById("previewTitle");
const previewSubtitle = document.getElementById("previewSubtitle");
const previewDate = document.getElementById("previewDate");
const eventDateText = document.getElementById("eventDateText");

const previewContact = document.getElementById("previewContact");
const demoRSVP = document.getElementById("demoRSVP");

let fechaDemo = new Date(2027, 7, 15, 20, 0, 0);

// Abrir la vista previa
document.querySelectorAll(".preview-btn").forEach(button => {

    button.addEventListener("click", () => {

        const title = button.dataset.title;
        const subtitle = button.dataset.subtitle;
        const theme = button.dataset.theme;

        previewTitle.textContent =
            theme === "xv" || theme === "princess"
                ? "Mis XV Años"
                : theme === "wedding"
                    ? "Nos casamos"
                    : "¡Estás invitado!";

        previewSubtitle.textContent = subtitle;

        previewDate.textContent = "15 DE AGOSTO DE 2027";

        eventDateText.textContent = "15 de agosto de 2027";

        phonePreview.className = "demo-cover theme-" + theme;

        previewContact.href = crearEnlaceWhatsApp(
            `Hola, me interesa el diseño ${title} para mi invitación digital.`
        );

        demoRSVP.href = crearEnlaceWhatsApp(
            `Hola, deseo confirmar mi asistencia a la celebración de ejemplo del 15 de agosto.`
        );

        previewModal.classList.add("show");
        document.body.classList.remove("modal-open");

        actualizarCuentaRegresiva();

    });

});

// Cerrar ventana
function cerrarVistaPrevia() {
    previewModal.classList.remove("show");
    document.body.style.overflow = "";
}

closePreview.addEventListener("click", cerrarVistaPrevia);

previewModal.addEventListener("click", event => {
    if (event.target === previewModal) {
        cerrarVistaPrevia();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        cerrarVistaPrevia();
    }
});

// Desplazarse hasta los detalles
document.getElementById("openDemo").addEventListener("click", () => {

    document.getElementById("demoDetails").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

// Cuenta regresiva
function actualizarCuentaRegresiva() {

    const ahora = new Date();
    const diferencia = fechaDemo - ahora;

    if (diferencia <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach(id => {
            document.getElementById(id).textContent = "00";
        });
        return;
    }

    const dias = Math.floor(diferencia / 86400000);
    const horas = Math.floor((diferencia % 86400000) / 3600000);
    const minutos = Math.floor((diferencia % 3600000) / 60000);
    const segundos = Math.floor((diferencia % 60000) / 1000);

    document.getElementById("days").textContent =
        String(dias).padStart(3, "0");

    document.getElementById("hours").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(segundos).padStart(2, "0");
}

setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva();
