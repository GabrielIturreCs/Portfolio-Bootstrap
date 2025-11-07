console.log('🎨 Theme Toggle Script Loaded');

// Detectar tema guardado o usar oscuro por defecto
function initTheme() {
  console.log('🚀 Initializing theme system...');
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  console.log('📌 Saved theme:', savedTheme);
  
  applyTheme(savedTheme);
  setupButtons();
}

// Aplicar tema al documento
function applyTheme(theme) {
  console.log(`🎨 Applying theme: ${theme}`);
  
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    console.log('✅ Light theme class ADDED to body');
  } else {
    document.body.classList.remove('light-theme');
    console.log('✅ Dark theme class REMOVED from body');
  }
  
  localStorage.setItem('theme', theme);
  console.log(`💾 Theme saved to localStorage: ${theme}`);
}

// Configurar botones
function setupButtons() {
  console.log('👆 Setting up theme toggle buttons...');
  
  // Botón en navbar
  const navBtn = document.getElementById('navbarThemeToggle');
  if (navBtn) {
    navBtn.addEventListener('click', toggleTheme);
    console.log('✅ Navbar button listener attached');
  } else {
    console.warn('⚠️ Navbar button NOT found');
  }
  
  // Botón flotante
  const floatingBtn = document.querySelector('.theme-toggle-btn');
  if (floatingBtn) {
    floatingBtn.addEventListener('click', toggleTheme);
    console.log('✅ Floating button listener attached');
  } else {
    console.warn('⚠️ Floating button NOT found');
  }
}

// Alternar tema
function toggleTheme(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  console.log('🔄 Toggle button clicked!');
  
  const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  console.log(`🔄 Switching to: ${newTheme}`);
  
  applyTheme(newTheme);
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
  console.log('⏳ DOM still loading, waiting...');
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  console.log('✅ DOM already loaded, initializing...');
  initTheme();
}

// Escuchar cambios en otra pestaña
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    console.log('🔄 Theme changed in another tab:', e.newValue);
    applyTheme(e.newValue || 'dark');
  }
});

console.log('🎨 Theme toggle script ready');
