/**
 * SCRIPT OPTIMIZADO - Portafolio Gabriel Iturre
 * Versión 2.0 - Código limpio, sin duplicados, mejor rendimiento
 * Funcionalidades: Navbar, AOS, Particles, Email, Formulario, Chatbot
 */

document.addEventListener("DOMContentLoaded", () => {
  // ✅ PERMITIR SCROLL
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";

  // ✅ INICIALIZAR AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  // ✅ INICIALIZAR PARTICLES.JS
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 150, density: { enable: true, value_area: 800 } },
        color: { value: ["#ffffff", "#f0f8ff", "#e6e6fa", "#fffafa"] },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
        opacity: {
          value: 0.7,
          random: true,
          anim: { enable: true, speed: 0.3, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 2.5,
          random: true,
          anim: { enable: true, speed: 0.5, size_min: 0.1, sync: false },
        },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 0.2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: true, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: true, mode: "repulse" },
          resize: true,
        },
        modes: {
          bubble: { distance: 150, size: 4, duration: 2, opacity: 0.8, speed: 3 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      retina_detect: true,
    });
  }

  // ✅ NAVBAR CON SCROLL INTELIGENTE
  const navbar = document.getElementById("navbar");
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (scrollY > 80) {
      if (scrollY > lastScrollY && scrollY > 150) {
        navbar.classList.add("navbar-hidden");
        navbar.classList.remove("navbar-visible");
      } else if (scrollY < lastScrollY) {
        navbar.classList.remove("navbar-hidden");
        navbar.classList.add("navbar-visible");
      }
    } else {
      navbar.classList.remove("navbar-hidden");
      navbar.classList.add("navbar-visible");
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  navbar.classList.add("navbar-visible");
  window.addEventListener("scroll", requestTick, { passive: true });

  // ✅ EMAIL MODAL
  const emailButton = document.getElementById("emailButton");
  const emailModal = document.getElementById("emailModal");

  if (emailButton && emailModal) {
    emailButton.addEventListener("click", (e) => {
      e.stopPropagation();
      emailModal.classList.toggle("d-none");
    });

    document.addEventListener("click", (e) => {
      if (!emailButton.contains(e.target) && !emailModal.contains(e.target)) {
        emailModal.classList.add("d-none");
      }
    });
  }

  // ✅ COPIAR EMAIL
  window.copyEmailAddress = () => {
    const email = "gabriel13iturre@gmail.com";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        const tooltip = document.getElementById("copyTooltip");
        if (tooltip) {
          tooltip.classList.add("show");
          setTimeout(() => tooltip.classList.remove("show"), 1500);
        }
      });
    }
  };

  // ✅ EVENT LISTENERS PARA ELEMENTOS MIGRADOS DE ONCLICK
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", window.copyEmailAddress);
  }

  const tabPersonales = document.getElementById("tab-personales");
  if (tabPersonales) {
    tabPersonales.addEventListener("click", () => window.mostrarProyectos("personales"));
  }

  const tabEquipo = document.getElementById("tab-equipo");
  if (tabEquipo) {
    tabEquipo.addEventListener("click", () => window.mostrarProyectos("equipo"));
  }

  // ✅ BOTÓN VER MÁS PROYECTOS
  const verMasToggle = document.getElementById("ver-mas-toggle");
  const verMasText = document.getElementById("ver-mas-text");
  const verMasIcon = document.getElementById("ver-mas-icon");

  if (verMasToggle && verMasText && verMasIcon) {
    verMasToggle.addEventListener("change", function () {
      if (this.checked) {
        verMasText.textContent = "Ver menos proyectos";
        verMasIcon.classList.remove("fa-chevron-down");
        verMasIcon.classList.add("fa-chevron-up");
      } else {
        verMasText.textContent = "Ver más proyectos";
        verMasIcon.classList.remove("fa-chevron-up");
        verMasIcon.classList.add("fa-chevron-down");
      }
    });
  }

  // ✅ FORMULARIO DE CONTACTO
  const form = document.getElementById("contact-form");
  const submitButton = document.getElementById("submit-button");
  const buttonText = document.getElementById("button-text");
  const loadingIcon = document.getElementById("loading-icon");
  const successModalElement = document.getElementById("success-modal");
  let successModal;

  if (successModalElement) {
    successModal = new bootstrap.Modal(successModalElement, { keyboard: false });
  }

  if (form && submitButton && buttonText && loadingIcon) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      submitButton.disabled = true;
      loadingIcon.classList.remove("d-none");
      buttonText.textContent = "Enviando...";

      const formData = new FormData(form);

      try {
        const response = await fetch(
          "https://formsubmit.co/ajax/gabriel15iturre@gmail.com",
          {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
          }
        );

        if (response.ok) {
          loadingIcon.classList.add("d-none");
          buttonText.textContent = "Enviado ✅";
          form.reset();

          if (successModal) {
            successModal.show();
            setTimeout(() => {
              successModal.hide();
              buttonText.textContent = "Enviar mensaje";
              submitButton.disabled = false;
            }, 3000);
          }
        } else {
          throw new Error("Error en la respuesta del servidor");
        }
      } catch (error) {
        loadingIcon.classList.add("d-none");
        buttonText.textContent = "Error al enviar";
        submitButton.disabled = false;
        console.error("Error en el formulario:", error);

        setTimeout(() => {
          buttonText.textContent = "Enviar mensaje";
        }, 3000);
      }
    });
  }

  // ✅ SCROLL TO TOP BUTTON
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ✅ SMOOTH SCROLL PARA ENLACES DE NAVEGACIÓN
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();

        const targetElement = document.querySelector(href);
        const offset = 100;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      }
    });
  });

  // ✅ INICIALIZAR TOOLTIPS DE BOOTSTRAP
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // ✅ EFECTOS HOVER EN TECNOLOGÍAS
  const techItems = document.querySelectorAll(".tech-item-modern");
  techItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const techName = item.getAttribute("data-tech");
      const tooltip = document.createElement("div");
      tooltip.className = "tech-tooltip";
      tooltip.textContent = techName;
      tooltip.style.cssText = `
        position: absolute;
        background: rgba(13, 110, 253, 0.9);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 1000;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
      `;
      item.style.position = "relative";
      item.appendChild(tooltip);
    });

    item.addEventListener("mouseleave", () => {
      const tooltip = item.querySelector(".tech-tooltip");
      if (tooltip) tooltip.remove();
    });
  });

  // ✅ FUNCIÓN PARA MOSTRAR/OCULTAR PROYECTOS POR CATEGORÍA
  window.mostrarProyectos = (tipo) => {
    const personales = document.querySelectorAll(".proyecto-personal");
    const equipo = document.querySelectorAll(".proyecto-equipo");
    const tabPersonales = document.getElementById("tab-personales");
    const tabEquipo = document.getElementById("tab-equipo");

    if (tipo === "personales") {
      personales.forEach((p) => (p.style.display = ""));
      equipo.forEach((e) => (e.style.display = "none"));
      if (tabPersonales) tabPersonales.classList.add("active");
      if (tabEquipo) tabEquipo.classList.remove("active");
    } else {
      personales.forEach((p) => (p.style.display = "none"));
      equipo.forEach((e) => (e.style.display = ""));
      if (tabEquipo) tabEquipo.classList.add("active");
      if (tabPersonales) tabPersonales.classList.remove("active");
    }
  };

  // Mostrar proyectos personales por defecto
  window.mostrarProyectos("personales");

  // ✅ ANIMAR LETRAS INDIVIDUALES EN HEADINGS
  function animateHeadingLetters() {
    const headings = document.querySelectorAll(".animated-heading");
    headings.forEach((heading) => {
      const text = heading.innerText;
      let newHTML = "";
      let charCount = 0;

      // Iterar sobre cada nodo (texto e elementos)
      heading.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Nodo de texto
          const chars = node.textContent.split("");
          chars.forEach((char) => {
            if (char === " ") {
              newHTML += `<span class="letter" style="margin: 0 3px;"> </span>`;
            } else {
              newHTML += `<span class="letter">${char}</span>`;
            }
            charCount++;
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Elemento (ej: span con text-primary)
          const classes = node.className;
          const chars = node.textContent.split("");
          chars.forEach((char) => {
            if (char === " ") {
              newHTML += `<span class="letter ${classes}" style="margin: 0 3px;"> </span>`;
            } else {
              newHTML += `<span class="letter ${classes}">${char}</span>`;
            }
            charCount++;
          });
        }
      });

      heading.innerHTML = newHTML;
    });
  }

  // Ejecutar animación de letras
  animateHeadingLetters();
});

// ✅ ANIMACIÓN FADE-IN PARA CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ✅ FUNCIÓN PARA COPIAR EMAIL
window.copyEmail = function(email) {
  // Crear un elemento temporal
  const tempInput = document.createElement("textarea");
  tempInput.value = email;
  tempInput.style.position = "absolute";
  tempInput.style.opacity = "0";
  document.body.appendChild(tempInput);

  // Seleccionar y copiar
  tempInput.select();
  document.execCommand("copy");

  // Eliminar el elemento
  document.body.removeChild(tempInput);

  // Mostrar notificación de éxito
  const button = event.target.closest(".email-action-btn");
  const originalIcon = button.innerHTML;
  button.innerHTML = '<i class="fas fa-check"></i>';
  button.style.color = "#00d4ff";

  // Restaurar después de 2 segundos
  setTimeout(() => {
    button.innerHTML = originalIcon;
    button.style.color = "";
  }, 2000);
};

// ✅ CERRAR MENÚ MÓVIL AL HACER CLIC EN ENLACE O BOTÓN X
(function() {
  const navbarCollapse = document.getElementById("navbarNav");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const btnCloseNavbar = document.getElementById("btn-close-navbar");

  // Cerrar al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    });
  });

  // Cerrar al hacer clic en el botón X
  if (btnCloseNavbar) {
    btnCloseNavbar.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    });
  }
})();

  // -----------------------------
  // Language switch (loads JSON from /i18n/*.json)
  // - Expects files like `i18n/en.json` and `i18n/es.json`.
  // ✅ SIMPLE I18N TRANSLATION SYSTEM
  // - Uses data-i18n attributes with simple JSON translations
  // - Spanish (es) is default; click EN to switch to English
  // - Organized by sections: navbar | hero | technologies | featured | projects | modals | education | contact | footer
  // -----
  window.currentLang = 'es';
  window.langButtons = document.querySelectorAll('.btn-lang');
  console.log('[Init] langButtons encontrados:', window.langButtons.length);

  // ========================================
  // MULTILINGUAL TRANSLATIONS OBJECT
  // Pattern: "section-element-type" or "section-element-descriptor"
  // ========================================
  window.translations = {
    es: {
      // ========== NAVBAR - Navigation Links ==========
      "nav-sobremi": "Sobre Mí",
      "nav-inicio": "Inicio",
      "nav-videos": "Videos",
      "nav-tecnologias": "Tecnologías",
      "nav-proyectos": "Proyectos",
      "nav-educacion": "Educación",
      "nav-contacto": "Contacto",
      "nav-cv": "CV",
      "brand-title": "Desarrollador Full Stack",
      
      // ========== EMAIL CONTACT SECTION - Email Contact Display ==========
      "email-label": "Contáctame por correo",
      "email-open-gmail": "Abrir en Gmail",
      "email-copy": "Copiar correo",
      
      // ========== HERO SECTION - Welcome Banner ==========
      "hero-greeting": "Hola, soy",
      "hero-name": "Gabriel",
      "hero-lastname": "Iturre",
      "hero-title": "Desarrollador Full Stack",
      "hero-description": "Especialista en crear soluciones digitales modernas, eficientes y diseñadas para funcionar en el mundo real. Me apasiona convertir ideas en productos concretos: sistemas web, plataformas de gestión y experiencias online funcionales y atractivas",
      "hero-btn-cv": "Descargar CV",
      "hero-btn-blog": "Blog",
      
      // ========== TECHNOLOGIES SECTION - Tech Stack Display ==========
      "tech-title": "Mis Tecnologías",
      "tech-principal": "Stack Principal",
      "tech-frontend": "Frontend & UI",
      "tech-backend": "Backend & API",
      "tech-database": "Bases de Datos",
      "tech-tools": "Herramientas y Plataformas",
      
      // ========== FEATURED PROJECT - Showcase Project ==========
      "featured-title": "Proyecto Destacado",
      "featured-desc": "Este es el proyecto grupal más completo y desafiante en el que he trabajado, integrando frontend, backend, autenticación, pagos y chatbot inteligente.",
      "featured-carousel": "Carrusel",
      "featured-gym": "Sistema para Gimnasios",
      "featured-gym-desc": "Sistema para gestionar socios de un gimnasio: alta, baja, edición de datos, control de cuotas y visualización de miembros activos.",
      "featured-details": "Ver Detalles",
      "featured-demo": "Ver Sitio Web",
      "featured-code": "Ver Código",
      
      // ========== DENTAL SYSTEM - Featured Dental Project ==========
      "odonto-title": "Sistema Odontológico",
      "odonto-desc": "Proyecto grupal desarrollado por un equipo de 6 personas. Me encargué de la integración del login con Google OAuth, el desarrollo del chatbot, el diseño de vistas para paciente y dentista, conexión a base de datos Mongo Atlas, y tareas backend y frontend.",
      "odonto-details": "Ver Detalles",
      "odonto-demo": "Ver Demo",
      "odonto-code": "Código",
      "odonto-contributors": "Colaboradores",
      
      // ========== VIDEOS SECTION - Latest Videos ==========
      "videos-title": "Mis Últimos Videos",
      "videos-description": "Comparto mi conocimiento a través de tutoriales y explicaciones sobre desarrollo web, programación y tecnologías actuales.",
      "video-1-title": "Cómo Instalar Bootstrap en Angular 19 en Minutos ✅",
      "video-1-date": "Publicado: 12 de mayo, 2025",
      "video-1-desc": "Aprendé a integrar Bootstrap en Angular 19 sin errores y con tips reales para developers. Creá interfaces limpias y responsivas en minutos.",
      "video-2-title": "Ejercicio de Parcial en PSeInt - Lógica desde cero 🧠",
      "video-2-date": "Publicado: 17 de mayo, 2025",
      "video-2-desc": "Ideal si estás empezando con lógica: resolvemos paso a paso un ejercicio real de parcial usando pseudocódigo en PSeInt. ¡Perfecto para practicar!",
      "video-3-title": "¡Alertas Fáciles en Angular 19 con Ngx-Toastr! 🚀",
      "video-3-date": "Publicado: 11 de mayo, 2025",
      "video-3-desc": "Aprendé a instalar y configurar ngx-toastr en Angular 19 para mostrar alertas modernas y personalizadas de forma simple.",
      
      // ========== PROJECTS SECTION - Portfolio Intro ==========
      "projects-title": "Proyectos",
      "projects-description": "Estos son algunos de los proyectos en los que he trabajado, demostrando mis habilidades en desarrollo web y programación.",
      "projects-view-more": "Ver más proyectos",
      "projects-features": "Características Principales",
      "projects-tech": "Tecnologías Utilizadas",
      
      // ========== MODAL: HANGMAN GAME ==========
      "modal-ahorcados-title": "Juego Ahorcados",
      "modal-ahorcados-desc": "Un juego interactivo de Ahorcados desarrollado con Angular y TypeScript. El jugador debe adivinar palabras antes de que se complete el dibujo del ahorcado. Incluye diferentes niveles de dificultad, sistema de puntuación, e interfaz moderna y responsive.",
      "modal-ahorcados-features": "Características Principales",
      "modal-ahorcados-feature1": "Interfaz responsive y moderna",
      "modal-ahorcados-feature2": "Sistema de puntuación",
      "modal-ahorcados-feature3": "Múltiples categorías de palabras",
      "modal-ahorcados-feature4": "Animaciones suaves",
      "modal-ahorcados-feature5": "Progreso visual del ahorcado",
      "modal-ahorcados-tech": "Tecnologías Utilizadas",
      "modal-ahorcados-btn-play": "Jugar Ahora",
      "modal-ahorcados-btn-code": "Ver Código",
      
      // ========== MODAL: SUPERMARKET SYSTEM - POS ==========
      "modal-super-title": "Sistema Supermercado - Punto de Venta",
      "modal-super-desc": "Solución integral para comercios minoristas: software de punto de venta (POS) integrado con gestión de inventarios, control de precios y vencimientos, manejo de múltiples cajas y sucursales, y panel administrativo con reportes en tiempo real.",
      "modal-super-benefit1": "Venta rápida con impresión de tickets y soporte de múltiples métodos de pago.",
      "modal-super-benefit2": "Control de stock en tiempo real y alertas automáticas por vencimiento o bajo stock.",
      "modal-super-benefit3": "Gestión de usuarios y roles (administrador, cajero, gerente) con auditoría de transacciones.",
      "modal-super-benefit4": "Panel de reportes: ventas por sucursal, productos más vendidos y análisis de margen.",
      "modal-super-benefit5": "Implementación preparada para integración con lectores de códigos de barras y balanzas.",
      "modal-super-section-benefits": "Beneficios para el negocio",
      "modal-super-benefits-desc": "Reduce tiempos de atención en caja, evita roturas de stock y facilita la toma de decisiones con reportes accionables. Ideal para cadenas pequeñas y supermercados independientes.",
      "modal-super-section-arch": "Tecnologías & Arquitectura",
      "modal-super-btn-demo": "Ver Demo",
      "modal-super-btn-code": "Ver Código",
      "modal-super-btn-quote": "Solicitar Presupuesto",
      
      // ========== MODAL: TICKET SALES SYSTEM ==========
      "modal-pasajes-title": "Sistema de Venta de Pasajes",
      "modal-pasajes-desc": "Sistema completo para gestión de venta de pasajes de turismo. Permite registrar boletos, calcular descuentos automáticos según la categoría del pasajero, y generar reportes detallados de ventas. Incluye interfaz administrativa y panel de control.",
      "modal-pasajes-features": "Características Principales",
      "modal-pasajes-feature1": "Gestión completa de pasajeros",
      "modal-pasajes-feature2": "Cálculo automático de descuentos",
      "modal-pasajes-feature3": "Reportes de ventas en tiempo real",
      "modal-pasajes-feature4": "Data tables interactivas",
      "modal-pasajes-feature5": "Sistema de búsqueda avanzada",
      "modal-pasajes-tech": "Tecnologías Utilizadas",
      "modal-pasajes-btn-demo": "Ver Demo",
      "modal-pasajes-btn-code": "Ver Código",
      
      // ========== MODAL: PETIT BEAUTY SALON WEBSITE ==========
      "modal-petit-title": "Sitio Web Peluquería Petit",
      "modal-petit-desc": "Sitio web profesional para Peluquería Petit, diseñado con enfoque en la experiencia del usuario.",
      "modal-petit-tech": "Tecnologías Utilizadas",
      "modal-petit-btn-website": "Ver Sitio Web",
      
      // ========== MODAL: DENTAL MANAGEMENT SYSTEM ==========
      "modal-odonto-title": "Sistema Odontológico",
      "modal-odonto-desc": "Sistema web integral para consultorios odontológicos, desarrollado por un equipo de 6 personas. Me encargué de la integración del login con Google OAuth, el desarrollo del chatbot inteligente, el diseño de vistas para paciente y dentista, la conexión a base de datos Mongo Atlas, endpoints y tareas de backend como frontend.",
      "modal-odonto-features": "Funcionalidades Principales",
      "modal-odonto-feature1": "Autenticación con Google OAuth 2.0, registro de usuarios, JWT tokens seguros y roles (Paciente, Dentista, Administrador)",
      "modal-odonto-feature2": "Gestión de turnos: reserva, reprogramación, cancelación e historial",
      "modal-odonto-feature3": "Pagos electrónicos con MercadoPago, procesamiento seguro y notificaciones automáticas",
      "modal-odonto-feature4": "Dashboard admin con estadísticas en tiempo real, gestión de usuarios y reportes PDF",
      "modal-odonto-feature5": "Chatbot inteligente integrado al sistema",
      "modal-odonto-section-tech": "Tecnologías y Herramientas",
      "modal-odonto-section-collab": "Colaboradores",
      "modal-odonto-btn-demo": "Ver Demo",
      "modal-odonto-btn-code": "Ver Código",
      
      // ========== MODAL: JUJUY TOURISM TRANSPORT ==========
      "modal-jujuy-title": "Transporte Conoce Jujuy",
      "modal-jujuy-desc": "Conoce los mejores lugares famosos y exóticos de Jujuy. Viaja seguro y cómodo con Victor Martinez, conductor con más de 20 años de experiencia. Proyecto enfocado en mostrar destinos y servicios de transporte turístico.",
      "modal-jujuy-tech": "Tecnologías Utilizadas",
      "modal-jujuy-btn-website": "Ver Sitio Web",
      "modal-jujuy-btn-repo": "Ver Repositorio",
      
      // ========== MODAL: PATIENT REGISTRATION SYSTEM ==========
      "modal-registro-title": "Sistema de Registro de Pacientes",
      "modal-registro-desc": "Desarrollé un sistema para registrar pacientes donde el usuario puede ingresar nuevos pacientes, cargar y visualizar su información completa, buscarlos por nombre o ID, y también eliminarlos del sistema.",
      "modal-registro-tech": "Tecnologías Utilizadas",
      "modal-registro-btn-repo": "Ver Repositorio",
      
      // ========== MODAL COMMON SECTIONS ==========
      "modal-section-desc": "Descripción del Proyecto",
      "modal-section-tech": "Tecnologías Utilizadas",
      
      // ========== PROJECT CARDS - Portfolio Cards Display ==========
      "card-ahorcados-title": "Juego Ahorcados",
      "card-ahorcados-desc": "Desarrollé un juego interactivo de Ahorcados en el que los jugadores deben adivinar palabras antes de que se complete el dibujo del ahorcado. Es un juego sencillo, desafiante y divertido para todas las edades.",
      "card-ahorcados-details": "Ver Detalles",
      "card-ahorcados-demo": "Demo",
      "card-ahorcados-code": "Código",
      "card-gimnasio-title": "Sistema para Gimnasios",
      "card-gimnasio-desc": "Creé un sistema para gestionar socios de un gimnasio donde se pueden cargar nuevos miembros, controlar las cuotas pagadas, editar datos personales y dar de baja a usuarios cuando dejan de asistir.",
      
      // ========== PROJECT CARDS - Sistema Supermercado ==========
      "card-super-title": "Sistema de Gestión y Control de Inventario con Punto de Venta",
      "card-super-desc": "Sistema completo para supermercados que permite gestionar ventas, imprimir tickets, controlar el stock en tiempo real, generar alertas de vencimiento, administrar múltiples sucursales y usuarios con distintos roles. Incluye panel de reportes con estadísticas de ingresos, productos más vendidos y rendimiento por sucursal.",
      "card-super-btn1": "Ver Detalles",
      "card-super-btn2": "Demo",
      "card-super-btn3": "Código",
      
      // ========== PROJECT CARDS - Sistema Venta de Pasajes ==========
      "card-pasajes-title": "Sistema Venta de Pasajes",
      "card-pasajes-desc": "Aplicación web para una empresa de turismo que permite registrar boletos, calcular descuentos según la categoría del pasajero y mostrar un resumen de ventas. Desarrollada con Angular, incluye formulario interactivo, servicios para CRUD y visualización con data tables.",
      "card-pasajes-btn1": "Ver Detalles",
      "card-pasajes-btn2": "Demo",
      "card-pasajes-btn3": "Código",
      
      // ========== PROJECT CARDS - Sitio Web Peluquería Petit ==========
      "card-petit-title": "Sitio Web Peluquería Petit",
      "card-petit-desc": "Diseñé y desarrollé el sitio web de Peluquería Petit, enfocándome en una experiencia visual atractiva y funcional para mostrar servicios y generar contacto con clientes de manera efectiva.",
      "card-petit-btn1": "Ver más detalles",
      "card-petit-btn2": "Ver Sitio Web",
      "card-petit-btn3": "Ver Repositorio",
      
      // ========== PROJECT CARDS - Transporte Conoce Jujuy ==========
      "card-jujuy-title": "Transporte Conoce Jujuy",
      "card-jujuy-desc": "Conoce los mejores lugares famosos y exóticos de Jujuy. Viaja seguro y cómodo con Victor Martinez, conductor con más de 20 años de experiencia. Proyecto enfocado en mostrar destinos y servicios de transporte turístico.",
      "card-jujuy-btn1": "Ver Detalles",
      "card-jujuy-btn2": "Ver Sitio Web",
      "card-jujuy-btn3": "Ver Repositorio",
      
      // ========== EDUCATION SECTION - Academic Background ==========
      "edu-title": "Educación",
      "edu-formal-title": "Educación Formal",
      "edu-bootcamp-title": "Bootcamp Full Stack",
      "edu-bootcamp-place": "Henry",
      "edu-bootcamp-date": "2023 - 2024",
      "edu-bootcamp-desc": "Bootcamp intensivo de Programación Full Stack. Adquirí conocimientos de frontend (React, Angular), backend (Node.js, Express), bases de datos (MongoDB, MySQL, PostgreSQL) y tecnologías en la nube.",
      "edu-secondary-title": "Escuela Secundaria",
      "edu-secondary-place": "Instituto Héctor Vargas",
      "edu-secondary-date": "2018 - 2020",
      "edu-secondary-desc": "Educación secundaria completa",
      "edu-courses-title": "Cursos y Certificaciones",
      "edu-course1": "Google Analytics Certificado",
      "edu-course2": "JavaScript Avanzado - Udemy",
      "edu-course3": "React.js Masterclass - Educación IT",
      "edu-university": "Analista Programador Universitario",
      "edu-university-place": "Facultad de Ingeniería - Universidad Nacional de Jujuy",
      "edu-university-date": "2022 - 2025 (En curso)",
      "edu-university-desc": "Carrera universitaria especializada en análisis y desarrollo de sistemas. Estudios avanzados en programación, bases de datos, ingeniería de software y metodologías ágiles. Enfoque en tecnologías modernas y mejores prácticas de desarrollo.",
      "edu-university-status": "En Curso",
      "edu-certifications-title": "Certificaciones y Cursos",
      "edu-angular-title": "Universidad Angular",
      "edu-angular-place": "Udemy",
      "edu-angular-desc": "Certificación avanzada en Angular, cubriendo arquitectura de aplicaciones, TypeScript, Firebase, y despliegue en producción.",
      "edu-angular-status": "Completado",
      "edu-web-title": "Universidad Desarrollo Web",
      "edu-web-place": "Udemy",
      "edu-web-desc": "Curso integral de desarrollo web moderno, incluyendo DOM, eventos, POO y proyectos prácticos reales.",
      "edu-web-status": "Completado",
      "edu-html-css-title": "HTML y CSS Avanzado",
      "edu-html-css-place": "TodoCode",
      "edu-html-css-desc": "Especialización en diseño web responsive y interfaces modernas, con enfoque en UX/UI y mejores prácticas.",
      "edu-html-css-status": "Completado",
      "edu-argentina-title": "Programación desde Cero",
      "edu-argentina-place": "Argentina Programa",
      "edu-argentina-desc": "Fundamentos sólidos de programación y JavaScript, estableciendo las bases para el desarrollo de aplicaciones interactivas.",
      "edu-argentina-status": "Completado",
      "edu-study-areas": "Áreas de Estudio",
      "edu-description": "Mi trayectoria educativa en desarrollo de software, desde la educación formal hasta certificaciones especializadas en tecnologías modernas.",
      
      // ========== CONTACT SECTION - Communication Form ==========
      "contact-title": "Contacto",
      "contact-info-title": "Información de Contacto",
      "contact-info-text": "¿Tienes una pregunta o propuesta? Contáctame y responderé lo antes posible.",
      "contact-form-title": "Envíame un mensaje",
      "contact-form-name": "Nombre",
      "contact-form-name-placeholder": "Tu nombre",
      "contact-form-email": "Email",
      "contact-form-email-placeholder": "tu@email.com",
      "contact-form-subject": "Asunto",
      "contact-form-subject-placeholder": "Asunto del mensaje",
      "contact-form-message": "Mensaje",
      "contact-form-message-placeholder": "Tu mensaje aquí...",
      "contact-form-submit": "Enviar Mensaje",
      "contact-success": "¡Mensaje enviado con éxito!",
      "contact-success-desc": "Gracias por tu mensaje. Me pondré en contacto contigo pronto.",
      
      // ========== CHATBOT SECTION - Virtual Assistant ==========
      "chatbot-tooltip": "¡Hola! 👋 Soy el asistente de Gabriel. Pregúntame sobre sus proyectos y experiencia.",
      "chatbot-title": "Asistente Virtual de Gabriel",
      "chatbot-close-aria": "Cerrar",
      "chatbot-initial-message": "¡Hola! Soy el asistente virtual de Gabriel, soy su mejor amigo 😄\n\nRespondo preguntas sobre él, no personales porque se enoja.\n\n¿En qué puedo ayudarte? Podés preguntarme sobre:\n• Tecnologías que maneja\n• Proyectos que ha desarrollado\n• Su experiencia en frontend/backend\n• Cómo contactarlo",
      "chatbot-placeholder": "Escribe tu pregunta aquí...",
      "chatbot-send-aria": "Enviar",
      
      // ========== FOOTER SECTION - Bottom Navigation & Copyright ==========
      "footer-name": "Gabriel Iturre",
      "footer-desc": "Desarrollador Full Stack apasionado por crear soluciones innovadoras.",
      "footer-links-title": "Enlaces Rápidos",
      "footer-link-home": "Inicio",
      "footer-link-projects": "Proyectos",
      "footer-link-contact": "Contacto",
      "footer-social": "Sígueme",
      "footer-copyright": "© 2024 Gabriel Iturre. Todos los derechos reservados.",
    },
    en: {
      // ========== NAVBAR - Navigation Links ==========
      "nav-sobremi": "About Me",
      "nav-inicio": "Home",
      "nav-videos": "Videos",
      "nav-tecnologias": "Technologies",
      "nav-proyectos": "Projects",
      "nav-educacion": "Education",
      "nav-contacto": "Contact",
      "nav-cv": "CV",
      "brand-title": "Full Stack Developer",
      
      // ========== EMAIL CONTACT SECTION - Email Contact Display ==========
      "email-label": "Contact me by email",
      "email-open-gmail": "Open in Gmail",
      "email-copy": "Copy email",
      
      // ========== HERO SECTION - Welcome Banner ==========
      "hero-greeting": "Hi, I'm",
      "hero-name": "Gabriel",
      "hero-lastname": "Iturre",
      "hero-title": "Full Stack Developer",
      "hero-description": "Specialist in creating modern, efficient digital solutions designed to work in the real world. I'm passionate about turning ideas into concrete products: web systems, management platforms and functional, attractive online experiences",
      "hero-btn-cv": "Download CV",
      "hero-btn-blog": "Blog",
      
      // ========== TECHNOLOGIES SECTION - Tech Stack Display ==========
      "tech-title": "My Technologies",
      "tech-principal": "Main Stack",
      "tech-frontend": "Frontend & UI",
      "tech-backend": "Backend & API",
      "tech-database": "Databases",
      "tech-tools": "Tools and Platforms",
      
      // ========== FEATURED PROJECT - Showcase Project ==========
      "featured-title": "Featured Project",
      "featured-desc": "This is the most complete and challenging group project I have worked on, integrating frontend, backend, authentication, payments and intelligent chatbot.",
      "featured-carousel": "Carousel",
      "featured-gym": "Gym Management System",
      "featured-gym-desc": "System to manage gym members: registration, cancellation, data editing, fee control and active members visualization.",
      "featured-details": "View Details",
      "featured-demo": "View Website",
      "featured-code": "View Code",
      
      // ========== DENTAL SYSTEM - Featured Dental Project ==========
      "odonto-title": "Dental Management System",
      "odonto-desc": "Group project developed by a team of 6 people. I was responsible for integrating Google OAuth login, developing the chatbot, designing views for patient and dentist, connecting to Mongo Atlas database, and backend and frontend tasks.",
      "odonto-details": "View Details",
      "odonto-demo": "View Demo",
      "odonto-code": "Code",
      "odonto-contributors": "Contributors",
      
      // ========== VIDEOS SECTION - Latest Videos ==========
      "videos-title": "My Latest Videos",
      "videos-description": "I share my knowledge through tutorials and explanations on web development, programming and current technologies.",
      "video-1-title": "How to Install Bootstrap in Angular 19 in Minutes ✅",
      "video-1-date": "Published: May 12, 2025",
      "video-1-desc": "Learn how to integrate Bootstrap into Angular 19 without errors and with real tips for developers. Create clean and responsive interfaces in minutes.",
      "video-2-title": "Exam Exercise in PSeInt - Logic from Scratch 🧠",
      "video-2-date": "Published: May 17, 2025",
      "video-2-desc": "Ideal if you're starting with logic: we solve step by step a real exam exercise using pseudocode in PSeInt. Perfect for practice!",
      "video-3-title": "Easy Alerts in Angular 19 with Ngx-Toastr! 🚀",
      "video-3-date": "Published: May 11, 2025",
      "video-3-desc": "Learn how to install and configure ngx-toastr in Angular 19 to display modern and customized alerts in a simple way.",
      
      // ========== PROJECTS SECTION - Portfolio Intro ==========
      "projects-title": "Projects",
      "projects-description": "These are some of the projects I have worked on, demonstrating my skills in web development and programming.",
      "projects-view-more": "View more projects",
      "projects-features": "Main Features",
      "projects-tech": "Technologies Used",
      
      // ========== MODAL: HANGMAN GAME ==========
      "modal-ahorcados-title": "Hangman Game",
      "modal-ahorcados-desc": "An interactive Hangman game developed with Angular and TypeScript. The player must guess words before the hangman drawing is completed. Includes different difficulty levels, scoring system, and modern responsive interface.",
      "modal-ahorcados-features": "Main Features",
      "modal-ahorcados-feature1": "Responsive and modern interface",
      "modal-ahorcados-feature2": "Scoring system",
      "modal-ahorcados-feature3": "Multiple word categories",
      "modal-ahorcados-feature4": "Smooth animations",
      "modal-ahorcados-feature5": "Visual hangman progress",
      "modal-ahorcados-tech": "Technologies Used",
      "modal-ahorcados-btn-play": "Play Now",
      "modal-ahorcados-btn-code": "View Code",
      
      // ========== MODAL: SUPERMARKET SYSTEM - POS ==========
      "modal-super-title": "Supermarket System - Point of Sale",
      "modal-super-desc": "Comprehensive solution for retail stores: Point of Sale (POS) software integrated with inventory management, price and expiration control, multiple registers and branches management, and administrative panel with real-time reports.",
      "modal-super-benefit1": "Fast sales with ticket printing and support for multiple payment methods.",
      "modal-super-benefit2": "Real-time stock control and automatic alerts for expiration or low stock.",
      "modal-super-benefit3": "User and role management (admin, cashier, manager) with transaction audit.",
      "modal-super-benefit4": "Reports dashboard: sales by branch, best-selling products and margin analysis.",
      "modal-super-benefit5": "Implementation ready for integration with barcode readers and scales.",
      "modal-super-section-benefits": "Business Benefits",
      "modal-super-benefits-desc": "Reduces checkout times, prevents stock breaks and enables decision making with actionable reports. Ideal for small chains and independent supermarkets.",
      "modal-super-section-arch": "Technologies & Architecture",
      "modal-super-btn-demo": "View Demo",
      "modal-super-btn-code": "View Code",
      "modal-super-btn-quote": "Request Quote",
      
      // ========== MODAL: TICKET SALES SYSTEM ==========
      "modal-pasajes-title": "Ticket Sales System",
      "modal-pasajes-desc": "Complete system for managing tourism ticket sales. Allows ticket registration, automatic discount calculation according to passenger category, and detailed sales reports. Includes administrative interface and control panel.",
      "modal-pasajes-features": "Main Features",
      "modal-pasajes-feature1": "Complete passenger management",
      "modal-pasajes-feature2": "Automatic discount calculation",
      "modal-pasajes-feature3": "Real-time sales reports",
      "modal-pasajes-feature4": "Interactive data tables",
      "modal-pasajes-feature5": "Advanced search system",
      "modal-pasajes-tech": "Technologies Used",
      "modal-pasajes-btn-demo": "View Demo",
      "modal-pasajes-btn-code": "View Code",
      
      // ========== MODAL: PETIT BEAUTY SALON WEBSITE ==========
      "modal-petit-title": "Petit Beauty Salon Website",
      "modal-petit-desc": "Professional website for Petit Beauty Salon, designed with focus on user experience.",
      "modal-petit-tech": "Technologies Used",
      "modal-petit-btn-website": "View Website",
      
      // ========== MODAL: DENTAL MANAGEMENT SYSTEM ==========
      "modal-odonto-title": "Dental Management System",
      "modal-odonto-desc": "Comprehensive web system for dental clinics, developed by a team of 6 people. I was responsible for integrating Google OAuth login, developing the intelligent chatbot, designing views for patient and dentist, connecting to Mongo Atlas database, and backend and frontend tasks.",
      "modal-odonto-features": "Main Features",
      "modal-odonto-feature1": "Authentication with Google OAuth 2.0, user registration, secure JWT tokens and roles (Patient, Dentist, Administrator)",
      "modal-odonto-feature2": "Appointment management: booking, rescheduling, cancellation and history",
      "modal-odonto-feature3": "Electronic payments with MercadoPago, secure processing and automatic notifications",
      "modal-odonto-feature4": "Admin dashboard with real-time statistics, user management and PDF reports",
      "modal-odonto-feature5": "Intelligent chatbot integrated into the system",
      "modal-odonto-section-tech": "Technologies and Tools",
      "modal-odonto-section-collab": "Contributors",
      "modal-odonto-btn-demo": "View Demo",
      "modal-odonto-btn-code": "View Code",
      
      // ========== MODAL: JUJUY TOURISM TRANSPORT ==========
      "modal-jujuy-title": "Jujuy Tourism Transport",
      "modal-jujuy-desc": "Discover the best famous and exotic places in Jujuy. Travel safely and comfortably with Victor Martinez, a driver with over 20 years of experience. Project focused on showcasing destinations and tourism transport services.",
      "modal-jujuy-tech": "Technologies Used",
      "modal-jujuy-btn-website": "View Website",
      "modal-jujuy-btn-repo": "View Repository",
      
      // ========== MODAL: PATIENT REGISTRATION SYSTEM ==========
      "modal-registro-title": "Patient Registration System",
      "modal-registro-desc": "I developed a system to register patients where the user can enter new patients, upload and view their complete information, search them by name or ID, and also delete them from the system.",
      "modal-registro-tech": "Technologies Used",
      "modal-registro-btn-repo": "View Repository",
      
      // ========== MODAL COMMON SECTIONS ==========
      "modal-section-desc": "Project Description",
      "modal-section-tech": "Technologies Used",
      
      // ========== PROJECT CARDS - Portfolio Cards Display ==========
      "card-ahorcados-title": "Hangman Game",
      "card-ahorcados-desc": "I developed an interactive Hangman game where players must guess words before the hangman drawing is completed. It is a simple, challenging and fun game for all ages.",
      "card-ahorcados-details": "View Details",
      "card-ahorcados-demo": "Demo",
      "card-ahorcados-code": "Code",
      "card-gimnasio-title": "Gym Management System",
      "card-gimnasio-desc": "I created a system to manage gym members where you can add new members, control paid fees, edit personal data and remove users when they stop attending.",
      
      // ========== PROJECT CARDS - Supermarket System ==========
      "card-super-title": "Inventory and Stock Control System with Point of Sale",
      "card-super-desc": "Complete system for supermarkets that allows managing sales, printing tickets, controlling stock in real time, generating expiration alerts, managing multiple branches and users with different roles. Includes reports panel with income statistics, best-selling products and branch performance.",
      "card-super-btn1": "View Details",
      "card-super-btn2": "Demo",
      "card-super-btn3": "Code",
      
      // ========== PROJECT CARDS - Ticket Sales System ==========
      "card-pasajes-title": "Ticket Sales System",
      "card-pasajes-desc": "Web application for a tourism company that allows registering tickets, calculating discounts according to passenger category and displaying a sales summary. Developed with Angular, includes interactive form, CRUD services and data table visualization.",
      "card-pasajes-btn1": "View Details",
      "card-pasajes-btn2": "Demo",
      "card-pasajes-btn3": "Code",
      
      // ========== PROJECT CARDS - Petit Beauty Salon Website ==========
      "card-petit-title": "Petit Beauty Salon Website",
      "card-petit-desc": "I designed and developed the Petit Beauty Salon website, focusing on an attractive and functional visual experience to showcase services and generate customer contact effectively.",
      "card-petit-btn1": "View more details",
      "card-petit-btn2": "View Website",
      "card-petit-btn3": "View Repository",
      
      // ========== PROJECT CARDS - Jujuy Tourism Transport ==========
      "card-jujuy-title": "Jujuy Tourism Transport",
      "card-jujuy-desc": "Discover the best famous and exotic places in Jujuy. Travel safely and comfortably with Victor Martinez, a driver with over 20 years of experience. Project focused on showcasing destinations and tourism transport services.",
      "card-jujuy-btn1": "View Details",
      "card-jujuy-btn2": "View Website",
      "card-jujuy-btn3": "View Repository",
      
      // ========== EDUCATION SECTION - Academic Background ==========
      "edu-title": "Education",
      "edu-formal-title": "Formal Education",
      "edu-bootcamp-title": "Full Stack Bootcamp",
      "edu-bootcamp-place": "Henry",
      "edu-bootcamp-date": "2023 - 2024",
      "edu-bootcamp-desc": "Intensive Full Stack Programming Bootcamp. I acquired knowledge of frontend (React, Angular), backend (Node.js, Express), databases (MongoDB, MySQL, PostgreSQL) and cloud technologies.",
      "edu-secondary-title": "Secondary School",
      "edu-secondary-place": "Instituto Héctor Vargas",
      "edu-secondary-date": "2018 - 2020",
      "edu-secondary-desc": "Complete secondary education",
      "edu-courses-title": "Courses and Certifications",
      "edu-course1": "Google Analytics Certified",
      "edu-course2": "Advanced JavaScript - Udemy",
      "edu-course3": "React.js Masterclass - Educación IT",
      "edu-university": "University Programmer Analyst",
      "edu-university-place": "Faculty of Engineering - National University of Jujuy",
      "edu-university-date": "2022 - 2025 (In progress)",
      "edu-university-desc": "University career specialized in systems analysis and development. Advanced studies in programming, databases, software engineering and agile methodologies. Focus on modern technologies and development best practices.",
      "edu-university-status": "In Progress",
      "edu-certifications-title": "Certifications and Courses",
      "edu-angular-title": "Angular University",
      "edu-angular-place": "Udemy",
      "edu-angular-desc": "Advanced Angular certification, covering application architecture, TypeScript, Firebase, and production deployment.",
      "edu-angular-status": "Completed",
      "edu-web-title": "Web Development University",
      "edu-web-place": "Udemy",
      "edu-web-desc": "Comprehensive modern web development course, including DOM, events, OOP and real-world projects.",
      "edu-web-status": "Completed",
      "edu-html-css-title": "Advanced HTML and CSS",
      "edu-html-css-place": "TodoCode",
      "edu-html-css-desc": "Specialization in responsive web design and modern interfaces, with a focus on UX/UI and best practices.",
      "edu-html-css-status": "Completed",
      "edu-argentina-title": "Programming from Scratch",
      "edu-argentina-place": "Argentina Programa",
      "edu-argentina-desc": "Solid foundations of programming and JavaScript, laying the groundwork for developing interactive applications.",
      "edu-argentina-status": "Completed",
      "edu-study-areas": "Areas of Study",
      "edu-description": "My educational journey in software development, from formal education to specialized certifications in modern technologies.",
      
      // ========== CONTACT SECTION - Communication Form ==========
      "contact-title": "Contact",
      "contact-info-title": "Contact Information",
      "contact-info-text": "Do you have a question or proposal? Contact me and I'll get back to you as soon as possible.",
      "contact-form-title": "Send me a message",
      "contact-form-name": "Name",
      "contact-form-name-placeholder": "Your name",
      "contact-form-email": "Email",
      "contact-form-email-placeholder": "your@email.com",
      "contact-form-subject": "Subject",
      "contact-form-subject-placeholder": "Message subject",
      "contact-form-message": "Message",
      "contact-form-message-placeholder": "Your message here...",
      "contact-form-submit": "Send Message",
      "contact-success": "Message sent successfully!",
      "contact-success-desc": "Thank you for your message. I will get back to you soon.",
      
      // ========== CHATBOT SECTION - Virtual Assistant ==========
      "chatbot-tooltip": "Hi there! 👋 I'm Gabriel's assistant. Ask me about his projects and experience.",
      "chatbot-title": "Gabriel's Virtual Assistant",
      "chatbot-close-aria": "Close",
      "chatbot-initial-message": "Hi! I'm Gabriel's virtual assistant, I'm his best friend 😄\n\nI answer questions about him, not personal ones because he gets upset.\n\nHow can I help you? You can ask me about:\n• Technologies he handles\n• Projects he has developed\n• His experience in frontend/backend\n• How to contact him",
      "chatbot-placeholder": "Type your question here...",
      "chatbot-send-aria": "Send",
      
      // ========== FOOTER SECTION - Bottom Navigation & Copyright ==========
      "footer-name": "Gabriel Iturre",
      "footer-desc": "Full Stack developer passionate about creating innovative solutions.",
      "footer-links-title": "Quick Links",
      "footer-link-home": "Home",
      "footer-link-projects": "Projects",
      "footer-link-contact": "Contact",
      "footer-social": "Follow me",
      "footer-copyright": "© 2024 Gabriel Iturre. All rights reserved.",
    }
  };

  // Change language function
  window.changeLang = function(lang) {
    window.currentLang = lang;
    
    console.log(`[Translation] 🔄 Iniciando cambio de idioma a: ${lang}`);
    console.log(`[Translation] 📋 Traducciones disponibles:`, Object.keys(window.translations));
    console.log(`[Translation] 🔑 Claves en ${lang}:`, Object.keys(window.translations[lang]).slice(0, 5), '...');
    
    // Update button active states
    window.langButtons.forEach(btn => {
      const isActive = (lang === 'es' && btn.id === 'lang-es') || 
                       (lang === 'en' && btn.id === 'lang-en');
      btn.classList.toggle('lang-active', isActive);
    });

    // Update all elements with data-i18n attribute
    const elementsWithI18n = document.querySelectorAll('[data-i18n]');
    console.log(`[Translation] 🔎 Encontrados ${elementsWithI18n.length} elementos con data-i18n`);
    
    let translatedCount = 0;
    let missingCount = 0;
    
    elementsWithI18n.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (window.translations[lang] && window.translations[lang][key]) {
        const translatedText = window.translations[lang][key];
        // Handle text with line breaks
        if (translatedText.includes('\n')) {
          element.innerHTML = translatedText.replace(/\n/g, '<br>');
        } else {
          element.textContent = translatedText;
        }
        translatedCount++;
      } else {
        console.warn(`[Translation] ⚠️ Clave faltante: "${key}" para idioma ${lang}`);
        missingCount++;
      }
    });

    // Update all elements with data-placeholder-i18n attribute
    const elementsWithPlaceholder = document.querySelectorAll('[data-placeholder-i18n]');
    elementsWithPlaceholder.forEach(element => {
      const key = element.getAttribute('data-placeholder-i18n');
      if (window.translations[lang] && window.translations[lang][key]) {
        element.placeholder = window.translations[lang][key];
        translatedCount++;
      } else {
        console.warn(`[Translation] ⚠️ Clave placeholder faltante: "${key}" para idioma ${lang}`);
        missingCount++;
      }
    });

    // Update all elements with data-title-i18n attribute (for button titles/tooltips)
    const elementsWithTitle = document.querySelectorAll('[data-title-i18n]');
    elementsWithTitle.forEach(element => {
      const key = element.getAttribute('data-title-i18n');
      if (window.translations[lang] && window.translations[lang][key]) {
        element.title = window.translations[lang][key];
        translatedCount++;
      } else {
        console.warn(`[Translation] ⚠️ Clave title faltante: "${key}" para idioma ${lang}`);
        missingCount++;
      }
    });

    console.log(`[Translation] ✅ Language changed to ${lang === 'es' ? '🇦🇷 Spanish' : '🇺🇸 English'}`);
    console.log(`[Translation] 📊 Traducidos: ${translatedCount}, Faltantes: ${missingCount}`);
  };

  // Initialize with Spanish
  changeLang('es');

  // Keep the old function name for compatibility with onclick handlers
  window.translatePageTo = function(lang) {
    changeLang(lang);
  };

// ✅ CHATBOT - ABRIR/CERRAR VENTANA
(function() {
  const chatbotButton = document.getElementById("chatbotButton");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const closeTooltipBtn = document.getElementById("closeTooltipBtn");
  const chatbotTooltip = document.getElementById("chatbotTooltip");
  const chatbotSend = document.getElementById("chatbotSend");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotMessages = document.getElementById("chatbotMessages");

  if (chatbotButton) {
    // Abrir chat al hacer clic en el botón
    chatbotButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (chatbotWindow) {
        chatbotWindow.style.display = chatbotWindow.style.display === "none" ? "flex" : "none";
        if (chatbotTooltip) {
          chatbotTooltip.style.display = "none";
        }
      }
    });
  }

  // Cerrar chat al hacer clic en la X
  if (chatbotClose) {
    chatbotClose.addEventListener("click", () => {
      if (chatbotWindow) {
        chatbotWindow.style.display = "none";
      }
    });
  }

  // Cerrar tooltip
  if (closeTooltipBtn) {
    closeTooltipBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (chatbotTooltip) {
        chatbotTooltip.style.display = "none";
      }
    });
  }

  // ✅ ENVIAR MENSAJE DEL CHATBOT
  function enviarMensaje() {
    if (!chatbotInput || !chatbotMessages) return;

    const mensaje = chatbotInput.value.trim();
    if (!mensaje) return;

    // Agregar mensaje del usuario
    const mensajeUsuario = document.createElement("div");
    mensajeUsuario.className = "message user-message";
    mensajeUsuario.innerHTML = `
      <div class="message-content">
        <div class="message-text">${mensaje}</div>
        <i class="fas fa-user message-icon"></i>
      </div>
    `;
    chatbotMessages.appendChild(mensajeUsuario);
    chatbotInput.value = "";

    // Scroll a abajo
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Obtener respuesta del bot
    setTimeout(() => {
      const respuesta = chatbotService.obtenerRespuesta(mensaje);
      const mensajeBot = document.createElement("div");
      mensajeBot.className = "message bot-message";
      mensajeBot.innerHTML = `
        <div class="message-content">
          <i class="fas fa-robot message-icon"></i>
          <div class="message-text">${respuesta}</div>
        </div>
      `;
      chatbotMessages.appendChild(mensajeBot);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 300);
  }

  // Enviar al hacer clic en el botón
  if (chatbotSend) {
    chatbotSend.addEventListener("click", enviarMensaje);
  }

  // Enviar al presionar Enter en el input
  if (chatbotInput) {
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        enviarMensaje();
      }
    });
  }
})();
