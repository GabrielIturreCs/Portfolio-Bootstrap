document.addEventListener("DOMContentLoaded", () => {
  // Asegurar que el scroll funcione correctamente
  document.body.style.overflow = "auto"
  document.documentElement.style.overflow = "auto"

  // Eliminar cualquier listener que pueda estar bloqueando el scroll
  window.addEventListener(
    "wheel",
    (event) => {
      // Permitir el comportamiento predeterminado del scroll
      return true
    },
    { passive: true },
  )

  // Inicializar AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  }

  // Modificar la configuración de particles.js para un mejor efecto de estrellas
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 150,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#ffffff", "#f0f8ff", "#e6e6fa", "#fffafa"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.7,
          random: true,
          anim: {
            enable: true,
            speed: 0.3,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 2.5,
          random: true,
          anim: {
            enable: true,
            speed: 0.5,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 0.2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "bubble",
          },
          onclick: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 150,
            size: 4,
            duration: 2,
            opacity: 0.8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      retina_detect: true,
    })
  }

  // Efecto de escritura para el texto dinámico
  const words = ["Desarrollador Full Stack", "Diseñador Web", "Programador"]
  let index = 0
  const dynamicText = document.getElementById("dynamic-text")

  function typeAndErase() {
    if (!dynamicText) return

    const word = words[index]
    let i = 0
    dynamicText.textContent = ""

    // Escribir el texto
    const typingInterval = setInterval(() => {
      if (i < word.length) {
        dynamicText.textContent += word[i]
        i++
      } else {
        clearInterval(typingInterval)
        setTimeout(erase, 2000) // Espera antes de borrar
      }
    }, 100) // Velocidad de escritura
  }

  function erase() {
    if (!dynamicText) return

    let i = dynamicText.textContent.length
    const erasingInterval = setInterval(() => {
      if (i > 0) {
        dynamicText.textContent = dynamicText.textContent.slice(0, i - 1)
        i--
      } else {
        clearInterval(erasingInterval)
        index = (index + 1) % words.length // Cambiar palabra
        setTimeout(typeAndErase, 500)
      }
    }, 50) // Velocidad de borrado
  }

  // Iniciar la animación de escritura
  typeAndErase()

  // Navbar scroll con ocultación inteligente
  const navbar = document.getElementById("navbar")
  let lastScrollY = window.scrollY
  let ticking = false

  function updateNavbar() {
    const scrollY = window.scrollY
    
    // Agregar clase scrolled cuando se hace scroll
    if (scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
    
    // Lógica para ocultar/mostrar navbar
    if (scrollY > 80) { // Solo aplicar la lógica después de cierto scroll
      if (scrollY > lastScrollY && scrollY > 150) {
        // Scrolling hacia abajo - ocultar navbar
        navbar.classList.add("navbar-hidden")
        navbar.classList.remove("navbar-visible")
        console.log("Navbar oculta - Scroll:", scrollY)
      } else if (scrollY < lastScrollY) {
        // Scrolling hacia arriba - mostrar navbar
        navbar.classList.remove("navbar-hidden")
        navbar.classList.add("navbar-visible")
        console.log("Navbar visible - Scroll:", scrollY)
      }
    } else {
      // Siempre mostrar navbar en la parte superior
      navbar.classList.remove("navbar-hidden")
      navbar.classList.add("navbar-visible")
    }
    
    lastScrollY = scrollY
    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar)
      ticking = true
    }
  }

  // Inicializar navbar como visible
  navbar.classList.add("navbar-visible")
  
  window.addEventListener("scroll", requestTick, { passive: true })

  // Email modal
  const emailButton = document.getElementById("emailButton")
  const emailModal = document.getElementById("emailModal")

  if (emailButton && emailModal) {
    emailButton.addEventListener("click", (e) => {
      e.stopPropagation()
      emailModal.classList.toggle("d-none")
    })

    document.addEventListener("click", (e) => {
      if (!emailButton.contains(e.target) && !emailModal.contains(e.target)) {
        emailModal.classList.add("d-none")
      }
    })
  }

  // Función para copiar email
  window.copyEmail = () => {
    navigator.clipboard.writeText("gabriel13iturre@gmail.com").then(() => {
      alert("Correo copiado al portapapeles")
      emailModal.classList.add("d-none")
    })
  }

  // Manejar el botón "Ver más"
  const verMasToggle = document.getElementById("ver-mas-toggle")
  const verMasText = document.getElementById("ver-mas-text")
  const verMasIcon = document.getElementById("ver-mas-icon")

  if (verMasToggle && verMasText && verMasIcon) {
    verMasToggle.addEventListener("change", function () {
      if (this.checked) {
        verMasText.textContent = "Ver menos proyectos"
        verMasIcon.classList.remove("fa-chevron-down")
        verMasIcon.classList.add("fa-chevron-up")
      } else {
        verMasText.textContent = "Ver más proyectos"
        verMasIcon.classList.remove("fa-chevron-up")
        verMasIcon.classList.add("fa-chevron-down")
      }
    })
  }

  // Formulario de contacto
  const form = document.getElementById("contact-form")
  const submitButton = document.getElementById("submit-button")
  const buttonText = document.getElementById("button-text")
  const loadingIcon = document.getElementById("loading-icon")
  const successModalElement = document.getElementById("success-modal")
  let successModal

  if (successModalElement) {
    successModal = new bootstrap.Modal(successModalElement, {
      keyboard: false,
    })
  }

  if (form && submitButton && buttonText && loadingIcon) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault()

      submitButton.disabled = true
      loadingIcon.classList.remove("d-none")
      buttonText.textContent = "Enviando..."

      const formData = new FormData(form)

      try {
        const response = await fetch("https://formsubmit.co/ajax/gabriel15iturre@gmail.com", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })

        if (response.ok) {
          loadingIcon.classList.add("d-none")
          buttonText.textContent = "Enviado ✅"
          form.reset()

          // Mostrar modal de éxito
          if (successModal) {
            successModal.show()

            // Ocultar modal después de 3 segundos
            setTimeout(() => {
              successModal.hide()
              buttonText.textContent = "Enviar mensaje"
              submitButton.disabled = false
            }, 3000)
          }
        } else {
          alert("Error al enviar el mensaje.")
          loadingIcon.classList.add("d-none")
          buttonText.textContent = "Enviar mensaje"
          submitButton.disabled = false
        }
      } catch (error) {
        alert("Error de conexión al enviar el formulario.")
        loadingIcon.classList.add("d-none")
        buttonText.textContent = "Enviar mensaje"
        submitButton.disabled = false
      }
    })
  }

  // Botón de scroll to top
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
    
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Mostrar mensaje de éxito si viene de formulario
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
      const modal = new bootstrap.Modal(successModal);
      modal.show();
      
      // Limpiar URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // Smooth scroll para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const navbarHeight = navbar.offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Cerrar el menú móvil si está abierto
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          document.querySelector(".navbar-toggler").click()
        }
      }
    })
  })
})

// Añadir función para comprobar la visibilidad de las secciones
function checkVisibility() {
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    console.log(
      `Sección ${section.id}: visible=${isVisible(section)}, display=${getComputedStyle(section).display}, height=${section.offsetHeight}px`,
    )
  })
}

function isVisible(element) {
  const style = window.getComputedStyle(element)
  return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0"
}

// Ejecutar después de que la página se cargue completamente
window.addEventListener("load", () => {
  // Forzar visibilidad de todas las secciones
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "block"
    section.style.visibility = "visible"
    section.style.opacity = "1"
  })

  // Comprobar visibilidad después de un breve retraso
  setTimeout(checkVisibility, 1000)

  // Añadir efecto de estrellas brillantes ocasionales
  setInterval(() => {
    const stars = document.querySelectorAll("#particles-js canvas")
    if (stars.length > 0) {
      const randomStar = Math.floor(Math.random() * 10) + 1
      stars[0].style.filter = `brightness(${randomStar})`
      setTimeout(() => {
        stars[0].style.filter = "brightness(1)"
      }, 300)
    }
  }, 3000)

  // ==== NUEVAS FUNCIONES PROFESIONALES ====

  // Texto fijo para presentación profesional
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    typingText.textContent = 'Desarrollador Full Stack';
  }

  // Funciones mejoradas para el email
  const emailButton = document.getElementById('emailButton');
  const emailModal = document.getElementById('emailModal');
  const copyTooltip = document.getElementById('copyTooltip');
  
  if (emailButton && emailModal) {
    emailButton.addEventListener('click', (e) => {
      e.stopPropagation();
      emailModal.classList.toggle('d-none');
    });
    
    document.addEventListener('click', (e) => {
      if (!emailButton.contains(e.target) && !emailModal.contains(e.target)) {
        emailModal.classList.add('d-none');
      }
    });
  }

  // Inicializar tooltips de Bootstrap
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Animaciones para las barras de progreso de tecnologías
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
        });
      }
    });
  }, observerOptions);

  const techSection = document.getElementById('tecnologias');
  if (techSection) {
    progressObserver.observe(techSection);
  }

  // Efectos hover mejorados para tecnologías
  const techItems = document.querySelectorAll('.tech-item-modern');
  techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const techName = item.getAttribute('data-tech');
      if (techName) {
        // Crear tooltip personalizado
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = `Click para más información sobre ${techName}`;
        tooltip.style.cssText = `
          position: absolute;
          background: rgba(0, 123, 255, 0.9);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          white-space: nowrap;
          z-index: 1000;
          pointer-events: none;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        `;
        
        item.style.position = 'relative';
        item.appendChild(tooltip);
        
        setTimeout(() => {
          tooltip.style.opacity = '1';
        }, 100);
      }
    });
    
    item.addEventListener('mouseleave', () => {
      const tooltip = item.querySelector('.tech-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });
  });

  // Smooth scroll mejorado para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Parallax effect para elementos
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Contador animado para estadísticas (si las agregas)
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = target / 100;
        
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(() => counterObserver.observe(counter), 50);
        } else {
          counter.innerText = target;
        }
      }
    });
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
})

// ==== FUNCIONES GLOBALES ====

// Función mejorada para copiar email
function copyEmailAddress() {
  const email = 'gabriel13iturre@gmail.com';
  
  // Mostrar tooltip inmediatamente para feedback visual
  const tooltip = document.getElementById('copyTooltip');
  if (tooltip) {
    tooltip.classList.add('show');
  }
  
  // Intentar copiar usando la API moderna
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => {
      console.log('Email copiado exitosamente');
      // El tooltip ya está mostrado, solo lo ocultamos después de 2 segundos
      setTimeout(() => {
        if (tooltip) {
          tooltip.classList.remove('show');
        }
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar con clipboard API:', err);
      // Fallback al método antiguo
      fallbackCopy();
    });
  } else {
    // Fallback para navegadores que no soportan clipboard API
    fallbackCopy();
  }
  
  // Cerrar el modal después de copiar
  const emailModal = document.getElementById('emailModal');
  if (emailModal) {
    emailModal.classList.add('d-none');
  }
  
  // Función fallback para navegadores antiguos
  function fallbackCopy() {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        console.log('Email copiado exitosamente con fallback');
      } else {
        console.error('No se pudo copiar el email');
        // Mostrar mensaje de error si es necesario
        if (tooltip) {
          tooltip.textContent = 'Error al copiar';
          tooltip.style.background = '#dc3545';
        }
      }
    } catch (err) {
      console.error('Error en fallback copy:', err);
      if (tooltip) {
        tooltip.textContent = 'Error al copiar';
        tooltip.style.background = '#dc3545';
      }
    }
    
    // Ocultar tooltip después de 2 segundos
    setTimeout(() => {
      if (tooltip) {
        tooltip.classList.remove('show');
        tooltip.textContent = '¡Copiado!';
        tooltip.style.background = '#28a745';
      }
    }, 2000);
  }
}

// Función para lazy loading de imágenes
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Función para detectar dispositivos móviles
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Función para optimizar rendimiento en móviles
function optimizeForMobile() {
  if (isMobile()) {
    // Reducir partículas en móviles
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
      particlesContainer.style.opacity = '0.5';
    }
    
    // Desactivar algunas animaciones complejas
    document.body.classList.add('mobile-optimized');
  }
}

// Inicializar optimizaciones
optimizeForMobile();
initLazyLoading();

// Asegurar que el scroll funcione correctamente
document.documentElement.style.overflowY = "auto"
document.body.style.overflowY = "auto"

// ==== CHATBOT FUNCTIONALITY ====

// Variables del chatbot
let chatbotOpen = false;
let isTyping = false;

// Elementos del chatbot
const chatbotButton = document.getElementById('chatbotButton');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Función para abrir/cerrar el chatbot
function toggleChatbot() {
  const tooltip = document.getElementById('chatbotTooltip');
  
  if (chatbotOpen) {
    chatbotWindow.classList.remove('show');
    chatbotOpen = false;
    // Mostrar el tooltip cuando se cierra el chat
    if (tooltip) {
      tooltip.classList.add('chatbot-tooltip-visible');
    }
  } else {
    chatbotWindow.classList.add('show');
    chatbotOpen = true;
    chatbotInput.focus();
    // Ocultar el tooltip cuando se abre el chat
    if (tooltip) {
      tooltip.classList.remove('chatbot-tooltip-visible');
    }
  }
}

// Función para agregar mensaje del usuario
function addUserMessage(text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user-message';
  messageDiv.innerHTML = `
    <div class="message-content">
      <i class="fas fa-user message-icon"></i>
      <div class="message-text">${text}</div>
    </div>
  `;
  chatbotMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Función para agregar mensaje del bot
function addBotMessage(text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot-message';
  messageDiv.innerHTML = `
    <div class="message-content">
      <i class="fas fa-robot message-icon"></i>
      <div class="message-text">${text}</div>
    </div>
  `;
  chatbotMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Función para simular escritura del bot
function addTypingMessage() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot-message typing-message';
  typingDiv.innerHTML = `
    <div class="message-content">
      <i class="fas fa-robot message-icon"></i>
      <div class="message-text">
        <span class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    </div>
  `;
  chatbotMessages.appendChild(typingDiv);
  scrollToBottom();
  return typingDiv;
}

// Función para remover mensaje de escritura
function removeTypingMessage(typingElement) {
  if (typingElement && typingElement.parentNode) {
    typingElement.parentNode.removeChild(typingElement);
  }
}

// Función para hacer scroll al final
function scrollToBottom() {
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Función para procesar mensaje del usuario
function processUserMessage(message) {
  if (!message.trim()) return;
  
  // Agregar mensaje del usuario
  addUserMessage(message);
  
  // Simular escritura del bot
  const typingElement = addTypingMessage();
  isTyping = true;
  
  // Obtener respuesta del servicio
  setTimeout(() => {
    removeTypingMessage(typingElement);
    const response = chatbotService.obtenerRespuesta(message);
    addBotMessage(response);
    isTyping = false;
  }, 1000 + Math.random() * 1000); // Tiempo aleatorio entre 1-2 segundos
}

// Función para enviar mensaje
function sendMessage() {
  const message = chatbotInput.value.trim();
  if (message && !isTyping) {
    chatbotInput.value = '';
    processUserMessage(message);
  }
}

// Event listeners del chatbot
if (chatbotButton) {
  chatbotButton.addEventListener('click', toggleChatbot);
}

if (chatbotClose) {
  chatbotClose.addEventListener('click', toggleChatbot);
}

if (chatbotSend) {
  chatbotSend.addEventListener('click', sendMessage);
}

if (chatbotInput) {
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

// Cerrar chatbot al hacer clic fuera
document.addEventListener('click', (e) => {
  if (chatbotOpen && 
      !chatbotWindow.contains(e.target) && 
      !chatbotButton.contains(e.target)) {
    toggleChatbot();
  }
});

// Agregar estilos CSS para los puntos de escritura
const typingStyles = document.createElement('style');
typingStyles.textContent = `
  .typing-dots {
    display: inline-flex;
    gap: 4px;
  }
  
  .typing-dots span {
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: typingDot 1.4s infinite ease-in-out;
  }
  
  .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
  .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
  .typing-dots span:nth-child(3) { animation-delay: 0s; }
  
  @keyframes typingDot {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(typingStyles);

document.addEventListener('DOMContentLoaded', function () {
  // Mostrar tooltip automáticamente
  const tooltip = document.getElementById('chatbotTooltip');
  const closeTooltipBtn = document.getElementById('closeTooltipBtn');
  if (tooltip && closeTooltipBtn) {
    tooltip.classList.add('chatbot-tooltip-visible');
    closeTooltipBtn.addEventListener('click', function (e) {
      tooltip.classList.remove('chatbot-tooltip-visible');
    });
  }
});

// Cambiar entre tabs de proyectos
function mostrarProyectos(tipo) {
  const personales = document.getElementById('proyectosPersonales');
  const equipo = document.getElementById('proyectosEquipo');
  const tabPersonales = document.getElementById('tabPersonales');
  const tabEquipo = document.getElementById('tabEquipo');

  if (tipo === 'personales') {
    personales.classList.remove('d-none');
    equipo.classList.add('d-none');
    tabPersonales.classList.add('active');
    tabEquipo.classList.remove('active');
  } else {
    personales.classList.add('d-none');
    equipo.classList.remove('d-none');
    tabPersonales.classList.remove('active');
    tabEquipo.classList.add('active');
  }
}
