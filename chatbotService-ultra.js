const chatbotService = (() => {
  const respuestas = [
    {
      claves: ["tecnologias", "stack", "herramientas", "lenguajes", "skills", "sabes usar", "sistemas", "que tecnologias", "que lenguajes"],
      respuesta: `Gabriel trabaja con un stack moderno y profesional, orientado a construir soluciones escalables y eficientes:

FRONTEND: HTML5 semántico, CSS3 avanzado, JavaScript puro, Angular (su especialidad), TypeScript, Bootstrap, diseño responsivo.

BACKEND: Node.js con Express para APIs REST robustas, Java para aplicaciones empresariales, lógica de negocio compleja.

BASES DE DATOS: MySQL (Workbench), MongoDB (Atlas), PostgreSQL (Docker), Firebase con Firestore, modelado y relaciones complejas.

INFRAESTRUCTURA & HERRAMIENTAS: Docker para contenedores, Grafana y Prometheus para monitoreo, Jira para gestión de proyectos, Git para versionado profesional.

INTEGRACIONES: Mercado Pago API, WhatsApp Business API, APIs REST externas, autenticación OAuth.

Su enfoque siempre es elegir la herramienta correcta para cada problema, priorizando claridad y escalabilidad.`
    },
    {
      claves: ["frontend", "cliente", "vista", "diseño", "interfaz", "angular", "html", "css", "bootstrap", "typescript"],
      respuesta: `En frontend, Gabriel tiene amplia experiencia construyendo interfaces modernas y funcionales:

✓ FRAMEWORKS: Angular es su especialidad, con TypeScript, componentes estructurados y arquitectura escalable.

✓ LENGUAJES: HTML5 semántico optimizado para SEO, CSS3 avanzado con Flexbox, Grid, animaciones, responsive design.

✓ UX/UI: Diseño responsivo perfecto en mobile/tablet/desktop, accesibilidad, experiencia de usuario intuitiva.

✓ HERRAMIENTAS: Bootstrap para estructuras rápidas, CSS personalizado cuando es necesario, animaciones fluidas.

✓ ENFOQUE: Prioriza código limpio, componentes reutilizables, rendimiento y experiencia visual atractiva.

Construye sitios estáticos optimizados para servicios locales, dashboards con data visualization, y aplicaciones web complejas.`
    },
    {
      claves: ["backend", "servidor", "api", "node", "express", "logica", "java", "controlador", "servicios", "rest"],
      respuesta: `Gabriel es un backend developer sólido con experiencia en múltiples tecnologías y paradigmas:

✓ NODE.JS & EXPRESS: Construye APIs REST robustas, seguras y escalables. Maneja autenticación, validación, lógica de negocio compleja.

✓ JAVA EMPRESARIAL: Desarrolló sistemas complejos conectados a bases de datos reales (arquitectura MVC, controladores, servicios).

✓ FUNCIONALIDADES AVANZADAS: Envío de correos automáticos, integración con APIs externas (Mercado Pago, WhatsApp Business), pagos online.

✓ BASES DE DATOS: Diseño y optimización de esquemas, relaciones complejas, migraciones, consultas eficientes.

✓ PRINCIPIOS: Código limpio, separación de responsabilidades, manejo robusto de errores, rendimiento optimizado.

Su pensamiento es analítico: descompone problemas complejos y construye soluciones elegantes.`
    },
    {
      claves: ["base de datos", "bd", "persistencia", "modelado", "mysql", "mongodb", "postgres", "docker", "firestore", "sql", "nosql"],
      respuesta: `Uso MongoDB Atlas para bases NoSQL, y MySQL Workbench y PostgreSQL (Docker) para relacionales. Modelé estructuras complejas, hice relaciones, joins, migraciones y pruebas. También usé Firebase para prototipos con Firestore y autenticación. En todos los casos conecto correctamente con backend usando drivers y ORMs cuando es necesario.`
    },
    {
      claves: ["proyectos", "experiencia", "trabajos", "portafolio", "hecho", "apps", "que proyectos", "que has hecho"],
      respuesta: `Gabriel ha desarrollado múltiples sistemas a medida con enfoque profesional:

✓ SISTEMAS DE GESTIÓN: Sistemas de ventas para supermercados, sistemas administrativos para consultorios médicos, herramientas para manejo de inventarios.

✓ DASHBOARDS & PANELES: Paneles de control con métricas, dashboards interactivos con data visualization.

✓ APLICACIONES ESPECIALIZADAS: Sistema de facturación con PDF y WhatsApp (Electron), app de turnos para consultorios/peluquerías, sistema bancario en Java, bots inteligentes.

✓ FRONTEND: Sitios web institucionales, páginas orientadas a marketing y comunicación, aplicaciones web responsivas con Angular.

✓ INFRAESTRUCTURA: Experiencia con Docker, monitoreos con Grafana y Prometheus, metodologías de gestión con Jira.

Su enfoque es siempre el mismo: construir soluciones que combinen lógica, claridad y funcionalidad real.`
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
      respuesta: `Gabriel combinó aprendizaje académico con experiencia práctica. Estudió formalmente en una carrera de programación y redes, pero su verdadera educación vino de:

✓ APRENDIZAJE AUTODIDACTA: Documentación oficial, tutoriales avanzados, cursos especializados (APIs de Mercado Pago, SEO avanzado, Docker, Angular).

✓ EXPERIENCIA REAL: Resolviendo problemas reales en proyectos complejos, que solidifican el aprendizaje mejor que cualquier libro.

✓ MENTALIDAD DE CRECIMIENTO: Entiende que en programación nunca se deja de aprender. La tecnología evoluciona constantemente y él está siempre actualizado.

✓ PENSAMIENTO CRÍTICO: No solo aprende lo que le enseñan; cuestiona, experimenta y busca la mejor solución para cada caso.

A los 22 años ya posee una madurez técnica excepcional gracias a esta combinación de formación y experiencia.`
    },
    {
      claves: ["docker", "contenedor", "ambiente", "postgresql", "infraestructura", "red", "virtualizacion"],
      respuesta: `Uso Docker para levantar contenedores de bases de datos como PostgreSQL o MongoDB en entornos controlados. Configuro redes virtuales, persistencia de datos con volúmenes y compartición entre contenedores. También he trabajado en proyectos académicos diseñando infraestructura de red física y lógica para empresas simuladas.`
    },
    {
      claves: ["trabajar", "equipo", "comunicacion", "soft skills", "colaborar", "git", "versionado"],
      respuesta: `Gabriel es una persona que sabe trabajar en equipo porque respeta las ideas de otros, comparte conocimiento sin ego y valora la colaboración. Pero también es perfectamente capaz de trabajar de forma independiente, organizándose y produciendo resultados sin supervisión.

Su forma de trabajar es muy profesional: escucha, analiza, pregunta, planifica, ejecuta y revisa. No se limita a hacer lo que se le indica; siempre busca entender el propósito detrás del proyecto para construir algo que realmente funcione.

Cualidades clave: Responsabilidad absoluta en todo compromiso, proactividad buscando mejoras constantemente, autodisciplina en la gestión del tiempo, pensamiento analítico para resolver problemas complejos, paciencia y persistencia ante dificultades, comunicación clara de conceptos técnicos, creatividad aplicada en soluciones.`
    },
    {
      claves: ["quien sos", "tu nombre", "gabriel", "personal", "biografia", "sobre ti", "quien es gabriel"],
      respuesta: `Soy Gabriel, un programador de 22 años apasionado por la tecnología y la creación de soluciones digitales que aporten valor real. Desde muy joven fui rodeado de computadoras, lo que despertó en mí una curiosidad profunda por entender cómo funcionan las cosas detrás de lo que vemos en pantalla.

Me caracterizo por tener una capacidad notable para aprender rápidamente y aplicar conocimientos complejos de forma clara y orientada a resultados. Trabajo con un enfoque profesional distinguido por seriedad, constancia y disciplina. No solo escribo código: pienso, estructuro, mejoro y optimizo.

Más allá de lo técnico, lo que me destaca son mis habilidades humanas: responsabilidad, proactividad, autodisciplina, pensamiento analítico, comunicación clara y creatividad aplicada. Disfruto el proceso de aprender y crear; para mí el código es una forma de expresión y una herramienta para materializar ideas.`
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
    },
    {
      claves: ["que lo hace especial", "por que contratarlo", "fortalezas", "ventajas", "diferente", "unico"],
      respuesta: `Gabriel se destaca no solo por sus habilidades técnicas, sino por sus cualidades personales:

✓ RESPONSABILIDAD ABSOLUTA: Siempre cumple con lo que promete, llevando cada proyecto hasta el final con dedicación.

✓ PROACTIVIDAD: No espera instrucciones. Propone ideas, anticipa problemas y busca mejoras constantemente.

✓ CLARIDAD: Explica conceptos técnicos complejos de forma sencilla, tanto a colegas como a clientes sin trasfondo técnico.

✓ MADUREZ PROFESIONAL: A los 22 años muestra un enfoque sólido y preparado para enfrentar desafíos reales.

✓ CREATIVIDAD APLICADA: No solo resuelve problemas, sino que crea soluciones más eficientes y elegantes.

✓ PASIÓN GENUINA: Disfruta del proceso de aprender y crear. El código es para él una forma de expresión.

Con Gabriel no solo contratas código: contratas una mentalidad de excelencia.`
    },
    {
      claves: ["como aborda", "enfoque", "metodo", "proceso", "resuelve", "soluciona"],
      respuesta: `Gabriel tiene un método de trabajo bien definido:

1️⃣ ESCUCHA ACTIVA: Entiende completamente los objetivos antes de empezar.

2️⃣ ANÁLISIS PROFUNDO: Descompone problemas complejos en partes pequeñas y manejables.

3️⃣ PLANIFICACIÓN: Estructura la solución antes de escribir código, considerando escalabilidad y mantenibilidad.

4️⃣ EJECUCIÓN DISCIPLINADA: Escribe código limpio, comentado y siguiendo principios SOLID.

5️⃣ REVISIÓN CONTINUA: Prueba, optimiza y mejora hasta que la solución sea eficiente.

6️⃣ DOCUMENTACIÓN: Deja todo bien documentado para que otros puedan entender y mantener el código.

Su filosofía: La claridad es clave. Código limpio, diseño organizado y procesos bien pensados.`
    },
    {
      claves: ["desafios", "dificultades", "errores", "que pasa cuando falla", "complicado"],
      respuesta: `Gabriel ve los desafíos como oportunidades de aprendizaje:

✓ PACIENCIA Y PERSISTENCIA: No se rinde ante errores o dificultades. Entiende que la programación es un proceso de ensayo y mejora constante.

✓ DEBUGGING METÓDICO: Cuando algo no funciona, analiza sistemáticamente, busca el root cause y corrige desde la raíz.

✓ RESILIENCIA: Los problemas complejos no lo desalientan. Los descompone lógicamente hasta encontrar la solución.

✓ APRENDIZAJE DEL ERROR: Cada bug es una lección. No repite los mismos errores; mejora constantemente.

✓ BUSCA AYUDA CUANDO ES NECESARIO: Es lo suficientemente maduro para saber que a veces necesita una segunda opinión o colaboración.

Para Gabriel, "no sé cómo hacerlo" nunca es una limitación; es el comienzo de un aprendizaje.`
    },
    {
      claves: ["novia", "pareja", "relacion", "amor", "tiene novia", "enamorado", "silvia"],
      respuesta: `¡Sí! Gabriel está felizmente de novio con Silvia 💕. Ella es una parte importante de su vida y lo apoya en sus proyectos y ambiciones. 

Más allá del código y la tecnología, Gabriel valora profundamente las relaciones personales y sabe balancear su pasión por la programación con el tiempo y la atención que merece su pareja. Entiende que aunque sea un programador dedicado, las relaciones humanas son fundamentales para una vida plena y equilibrada.

¡Silvia es su apoyo constante en esta aventura de crear soluciones digitales y crecer profesionalmente!`
    },
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
