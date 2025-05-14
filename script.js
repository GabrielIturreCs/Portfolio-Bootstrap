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

  // Navbar scroll
  const navbar = document.getElementById("navbar")
  const lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("bg-dark", "bg-opacity-90", "shadow")
    } else {
      navbar.classList.remove("bg-dark", "bg-opacity-90", "shadow")
    }
  })

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

  // Verificar si hay parámetro de éxito en la URL
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get("success") === "true" && successModal) {
    successModal.show()
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
})

// Asegurar que el scroll funcione correctamente
document.documentElement.style.overflowY = "auto"
document.body.style.overflowY = "auto"
