/**
 * Animaciones Modernas para el Portfolio
 */

// Animación de flotación más suave para las cards de tecnología
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.tech-card-main');
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');
  });
});

// Animación de conteo para números (si los hay)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Agregar clase para iniciar animaciones
      entry.target.classList.add('animated');
      // Desdeñar el observer después de la animación
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar elementos con animación
document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

// Animación mejorada para escritura de "Full Stack Developer" - SIMPLIFICADA
document.addEventListener('DOMContentLoaded', () => {
  console.log('✨ Animaciones modernas cargadas correctamente');
});

// Efecto glow dinámico en los botones
const buttons = document.querySelectorAll('#hero .btn');
buttons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    button.style.setProperty('--glow-x', x + 'px');
    button.style.setProperty('--glow-y', y + 'px');
  });
});
