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
