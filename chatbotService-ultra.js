const chatbotService = (() => {
  const respuestas = [
    {
      claves: ["tecnologias", "stack", "herramientas", "lenguajes", "skills", "sabes usar", "sistemas", "que tecnologias", "que lenguajes"],
      respuesta: `Trabajo con un stack fullstack moderno. En frontend utilizo Angular, HTML5, CSS3, Bootstrap y JavaScript puro. En backend, uso Node.js con Express y también Java para aplicaciones estructuradas. Manejo MongoDB (local y Atlas), MySQL, PostgreSQL (Docker), Firebase y consumo APIs REST. También sé trabajar sin frameworks cuando el proyecto lo requiere.`
    },
    {
      claves: ["frontend", "cliente", "vista", "diseño", "interfaz", "angular", "html", "css", "bootstrap", "typescript"],
      respuesta: `Tengo amplia experiencia en desarrollo frontend usando Angular, HTML semántico, CSS optimizado, y Bootstrap. Me enfoco en diseño responsivo, accesibilidad, SEO técnico, animaciones fluidas y experiencia de usuario intuitiva. También he desarrollado sitios estáticos rápidos y optimizados para servicios locales como peluquerías.`
    },
    {
      claves: ["backend", "servidor", "api", "node", "express", "logica", "java", "controlador", "servicios", "rest"],
      respuesta: `En backend trabajo con Node.js y Express para construir APIs REST robustas, seguras y escalables. Además, desarrollé proyectos empresariales en Java conectados a bases de datos reales. Domino autenticación, validación de datos, lógica de negocio, envío de correos, integración con servicios externos (como Mercado Pago y WhatsApp Business), y arquitectura MVC.`
    },
    {
      claves: ["base de datos", "bd", "persistencia", "modelado", "mysql", "mongodb", "postgres", "docker", "firestore", "sql", "nosql"],
      respuesta: `Uso MongoDB Atlas para bases NoSQL, y MySQL Workbench y PostgreSQL (Docker) para relacionales. Modelé estructuras complejas, hice relaciones, joins, migraciones y pruebas. También usé Firebase para prototipos con Firestore y autenticación. En todos los casos conecto correctamente con backend usando drivers y ORMs cuando es necesario.`
    },
    {
      claves: ["proyectos", "experiencia", "trabajos", "portafolio", "hecho", "apps", "que proyectos", "que has hecho"],
      respuesta: `Desarrollé sistemas completos como:
- Una app de facturación automática con PDF + envío por WhatsApp usando Electron y Node.js.
- Un sistema bancario completo en Java, con gestión de clientes, cuentas y movimientos conectados a MySQL.
- Una app de turnos para consultorios médicos y peluquerías, integrada con WhatsApp.
- Un sitio educativo sobre C++, shorts y cursos en video.
- Bots inteligentes conectados a interfaces web, usando lógica de decisión propia.
Todos incluyen control de versiones con Git y deploy profesional en la nube.`
    },
    {
      claves: ["electron", "escritorio", "pdf", "whatsapp", "facturacion", "app local", "desktop"],
      respuesta: `Desarrollé aplicaciones de escritorio usando Electron que generan facturas en PDF de forma automática, integradas con la API de WhatsApp Business para enviarlas al cliente final. Estas apps cuentan con formularios HTML dinámicos, lógica de cálculo personalizada, y guardado local. El backend procesa los datos y genera archivos precisos y profesionales.`
    },
    {
      claves: ["seo", "optimización", "google", "meta", "etiquetas", "accesibilidad", "semantica", "posicionamiento"],
      respuesta: `Tengo experiencia en SEO técnico: uso etiquetas HTML semánticas (main, section, article, h1-h6), optimizo imágenes con alt, configuro meta tags, Open Graph, robots.txt, y estructura clara del DOM. También mido rendimiento con Lighthouse, aplico lazy loading y organizo contenido jerárquicamente para mejorar posicionamiento en Google.`
    },
    {
      claves: ["despliegue", "vercel", "netlify", "render", "hosting", "producción", "cargar sitio", "deploy"],
      respuesta: `Deployo proyectos frontend en Vercel y Netlify, usando rutas amigables, archivos optimizados y builds automáticos. Para backend uso Render con conexión a Mongo Atlas o Railway. Configuro variables de entorno, HTTPS, control de errores y lógica de producción eficiente. Manejo pipelines desde GitHub con CI/CD.`
    },
    {
      claves: ["educacion", "formacion", "estudios", "que estudiaste", "aprender", "carrera", "universidad"],
      respuesta: `Estoy cursando una carrera en programación y redes, combinando formación académica con aprendizaje autodidacta. Mi formación no se limita a una institución: constantemente estudio documentación oficial, tutoriales avanzados, cursos específicos (como APIs de Mercado Pago, SEO avanzado, Docker, Angular), y resuelvo problemas reales para solidificar lo aprendido.`
    },
    {
      claves: ["docker", "contenedor", "ambiente", "postgresql", "infraestructura", "red", "virtualizacion"],
      respuesta: `Uso Docker para levantar contenedores de bases de datos como PostgreSQL o MongoDB en entornos controlados. Configuro redes virtuales, persistencia de datos con volúmenes y compartición entre contenedores. También he trabajado en proyectos académicos diseñando infraestructura de red física y lógica para empresas simuladas.`
    },
    {
      claves: ["trabajar", "equipo", "comunicacion", "soft skills", "colaborar", "git", "versionado"],
      respuesta: `Me adapto bien al trabajo en equipo. Versiono con Git de forma clara, comento el código, documento decisiones técnicas y me comunico con precisión. También puedo trabajar de forma autónoma, tomando decisiones fundamentadas y priorizando la entrega funcional por sobre lo innecesario. Tengo mentalidad constructiva y orientada al resultado.`
    },
    {
      claves: ["quien sos", "tu nombre", "gabriel", "personal", "biografia", "sobre ti"],
      respuesta: `Soy Gabriel, un programador fullstack autodidacta y estudiante de programación y redes. Me motiva resolver problemas reales con código, construir soluciones funcionales que ayuden a la gente, y aprender continuamente. Me gusta tanto el lado técnico como pensar en el producto final, el usuario y cómo destacar visual y funcionalmente en un proyecto.`
    },
    {
      claves: ["contacto", "contactar", "email", "linkedin", "github", "redes", "como contactar"],
      respuesta: `Podés contactarme a través de:
- LinkedIn: https://www.linkedin.com/in/gabriel-iturre-73900626a/
- GitHub: https://github.com/GabrielIturreCs
- TikTok: @gapherdev
- Email: gabrieliturre.cs@gmail.com
- Blog: https://gabrieliturre.hashnode.dev/
¡Me encanta conectar con otros desarrolladores y oportunidades interesantes!`
    },
    {
      claves: ["cv", "curriculum", "resume", "descargar", "cv pdf"],
      respuesta: `Mi CV está disponible para descargar en formato PDF. Incluye mi experiencia técnica, proyectos destacados, tecnologías que manejo y mi formación. Podés accederlo desde el botón "CV" en la navegación o desde la sección hero. ¡Espero que te interese mi perfil!`
    },
    {
      claves: ["juego", "ahorcados", "game", "diversion", "entretenimiento"],
      respuesta: `Desarrollé un juego de Ahorcados completo con Angular y TypeScript. Incluye múltiples categorías de palabras, sistema de puntuación, animaciones suaves y una interfaz moderna. Está desplegado en Netlify y podés jugarlo ahora mismo. ¡Es una muestra de cómo combino diversión con programación!`
    },
    {
      claves: ["sistema", "pasajes", "turismo", "venta", "boletos"],
      respuesta: `Creé un sistema completo de venta de pasajes de turismo con Angular. Permite registrar boletos, calcular descuentos automáticos según la categoría del pasajero, y generar reportes detallados de ventas. Incluye interfaz administrativa y panel de control con data tables interactivas.`
    },
    {
      claves: ["peluqueria", "petit", "sitio web", "servicios", "local"],
      respuesta: `Desarrollé el sitio web para Peluquería Petit, un negocio local. El proyecto se enfoca en la experiencia del usuario con diseño responsivo y optimizado para servicios locales. Usé HTML5, CSS3 y Bootstrap para crear una presencia web profesional y atractiva.`
    },
    {
      claves: ["java", "enterprise", "empresarial", "bancario", "sistema bancario"],
      respuesta: `Desarrollé un sistema bancario completo en Java con gestión de clientes, cuentas y movimientos financieros. Conecté la aplicación a MySQL para persistencia de datos, implementé lógica de negocio compleja y creé una interfaz administrativa robusta. Este proyecto demuestra mi capacidad para trabajar con tecnologías empresariales.`
    },
    {
      claves: ["whatsapp", "api", "mensajes", "notificaciones", "integracion"],
      respuesta: `Integré la API de WhatsApp Business en varios proyectos para enviar notificaciones automáticas, confirmaciones de turnos y facturas. Esto incluye la app de facturación con Electron y el sistema de turnos para consultorios. La integración permite comunicación directa con clientes de forma profesional.`
    },
    {
      claves: ["firebase", "firestore", "autenticacion", "google", "prototipos"],
      respuesta: `Uso Firebase para prototipos rápidos y aplicaciones que requieren autenticación y base de datos en tiempo real. Firestore me permite crear apps funcionales sin configurar servidor, ideal para MVPs y proyectos que necesitan escalar rápidamente.`
    },
    {
      claves: ["git", "github", "versionado", "control", "repositorio"],
      respuesta: `Uso Git para control de versiones en todos mis proyectos. Mantengo repositorios organizados en GitHub con commits descriptivos, documentación clara y README detallados. Esto facilita la colaboración y el mantenimiento de código a largo plazo.`
    },
    {
      claves: ["responsive", "mobile", "móvil", "adaptativo", "diseño"],
      respuesta: `Todos mis proyectos son completamente responsivos. Uso CSS Grid, Flexbox y media queries para asegurar que las aplicaciones se vean y funcionen perfectamente en dispositivos móviles, tablets y desktops. La experiencia de usuario es consistente en todas las pantallas.`
    },
    {
      claves: ["animaciones", "transiciones", "efectos", "css", "interactivo"],
      respuesta: `Implemento animaciones suaves y transiciones CSS para mejorar la experiencia de usuario. Uso keyframes, transformaciones y transiciones para crear interfaces dinámicas y atractivas. Las animaciones son sutiles y mejoran la usabilidad sin ser distractivas.`
    },
    {
      claves: ["api", "rest", "consumo", "fetch", "axios", "http"],
      respuesta: `Tengo experiencia consumiendo APIs REST con fetch y axios. He integrado servicios como Mercado Pago, WhatsApp Business API y APIs públicas. Manejo autenticación, manejo de errores, y optimización de requests para crear aplicaciones que se conectan eficientemente con servicios externos.`
    },
    {
      claves: ["lighthouse", "performance", "rendimiento", "optimizacion", "velocidad"],
      respuesta: `Optimizo el rendimiento de mis aplicaciones usando Lighthouse. Me enfoco en Core Web Vitals, lazy loading, compresión de imágenes, y minimización de recursos. Esto asegura que mis sitios carguen rápido y proporcionen una experiencia fluida al usuario.`
    },
    {
      claves: ["ci/cd", "pipeline", "automatizacion", "deploy", "github actions"],
      respuesta: `Configuro pipelines de CI/CD para automatizar el deploy de mis aplicaciones. Uso GitHub Actions para builds automáticos y deploy en Vercel/Netlify. Esto asegura que los cambios se desplieguen de forma confiable y rápida sin intervención manual.`
    }
  ];

  function obtenerRespuesta(inputUsuario) {
    const input = inputUsuario.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Buscar coincidencias exactas primero
    for (const item of respuestas) {
      for (const palabra of item.claves) {
        if (input.includes(palabra)) {
          return item.respuesta;
        }
      }
    }

    // Si no hay coincidencias exactas, buscar palabras similares
    const palabrasInput = input.split(' ');
    for (const item of respuestas) {
      for (const palabra of item.claves) {
        for (const palabraInput of palabrasInput) {
          if (palabraInput.length > 3 && (palabra.includes(palabraInput) || palabraInput.includes(palabra))) {
            return item.respuesta;
          }
        }
      }
    }

    return `¡Hola! Soy el asistente virtual de Gabriel. No entendí bien tu pregunta 😅, pero podés preguntarme sobre:
- Tecnologías o herramientas que maneja
- Proyectos que ha desarrollado
- Backend, frontend, bases de datos
- Electron, SEO, deploy
- Su educación y estilo de trabajo
- Cómo contactarlo
¡Probá reformular tu pregunta!`;
  }

  return {
    obtenerRespuesta
  };
})();
