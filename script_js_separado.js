// ====================================
// VARIABLES GLOBALES
// ====================================
let scrollPosition = 0;
const navbar = document.getElementById('navbar');
const modal = document.getElementById('modal');

// Variables para animación de deslizamiento en modal
let animacionModalActiva = null;
const VELOCIDAD_MODAL = 30; // pixels por segundo
const PAUSA_MODAL_INICIAL = 1500;
const PAUSA_MODAL_FINAL = 1000;

// ====================================
// EFECTOS DE SCROLL
// ====================================
window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;
    
    // Cambiar apariencia del navbar al hacer scroll
    if (scrollPosition > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// NAVEGACIÓN SUAVE
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave
    document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // NO interceptar enlaces externos (WhatsApp, etc)
            if (href.startsWith('http') || href.startsWith('https://')) {
                console.log('🔗 Enlace externo detectado, permitiendo navegación:', href);
                return; // Dejar que el navegador maneje el enlace
            }
            
            // Solo prevenir default para enlaces internos (#)
            if (href.startsWith('#')) {
                e.preventDefault();
            } else {
                // Para cualquier otro caso, dejar pasar
                return;
            }
            
            const targetId = this.getAttribute('href');
            
            // Verificar si es el enlace al inicio
            if (targetId === '#' || targetId === '#inicio' || targetId === '#home' || targetId === '#top') {
                // Scroll específico para el inicio
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Backup para asegurar que llegue al inicio
                setTimeout(() => {
                    if (window.pageYOffset > 50) {
                        document.documentElement.scrollTop = 0;
                        document.body.scrollTop = 0;
                    }
                }, 800);
                
            } else {
                // Para todas las demás secciones
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Cambio de estilo al hacer scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
});


// ====================================
// FUNCIONES DEL MODAL DE SERVICIOS
// ====================================
function showModal(title, text) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalText').innerHTML = text;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar modal al hacer clic fuera del contenido
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});
/*
// ====================================
// FUNCIONALIDAD DE LA GALERÍA DE PROYECTOS
// ====================================
*/

// Base de datos de proyectos con múltiples imágenes y descripciones
function generarImagenes(carpeta, cantidad, extension = 'jpg') {
    const imagenes = [];
    for (let i = 1; i <= cantidad; i++) {
        imagenes.push(`${carpeta}/image${i}.${extension}`);
    }
    return imagenes;
}

const proyectos = {
    proyecto1: {
        titulo: "Desarrollo Web",
        descripcion: "Página web responsiva con HTML, CSS y JS",
        imagenes: generarImagenes("imagenes_proyectos/Desarrollo_web", 3, "png"),
        descripcionesImagenes: [
            "Diseño inicial del sitio web con enfoque en la experiencia de usuario y navegación intuitiva.",
            "Implementación de funcionalidades interactivas usando JavaScript moderno y APIs nativas.",
            "Versión final optimizada con diseño responsivo y rendimiento mejorado para todos los dispositivos."
        ],
        imagenActual: 0
    },
    proyecto2: {
        titulo: "Diseño 3D",
        descripcion: "Modelado y renderizado 3D",
        imagenes: generarImagenes("imagenes_proyectos/Diseño_3D", 2, "png"),
        descripcionesImagenes: [
            "Modelo 3D base creado con atención al detalle en geometría y proporciones realistas.",
            "Renderizado final con iluminación profesional, materiales realistas y efectos de post-procesamiento."
        ],
        imagenActual: 0
    },
    proyecto3: {
        titulo: "Diseño/Mejora de logotipo",
        descripcion: "Diseño gráfico profesional para marcas",
        imagenes: generarImagenes("imagenes_proyectos/Mejora_de_logotipos", 2, "png"),
        descripcionesImagenes: [
            "Concepto inicial del logotipo con elementos distintivos que reflejan la identidad de la marca.",
            "Versión final refinada con variaciones de color, tipografía optimizada y adaptaciones para diferentes medios."
        ],
        imagenActual: 0
    },
    proyecto4: {
        titulo: "Edición de video",
        descripcion: "Edición de video profesional",
        imagenes: generarImagenes("imagenes_proyectos/Edicion_de_video", 2, "png"),
        descripcionesImagenes: [
            "Timeline de edición mostrando la estructura narrativa y secuenciación de clips principales.",
            "Proceso de corrección de color y efectos visuales aplicados para lograr el tono cinematográfico deseado."
        ],
        imagenActual: 0
    },
    proyecto5: {
        titulo: "Reconocimiento de imagenes",
        descripcion: "Implementación de modelos de IA",
        imagenes: generarImagenes("imagenes_proyectos/Reconocimiento_imagenes", 2, "png"),
        descripcionesImagenes: [
            "Modelo de IA para reconocimiento de imágenes entrenado con datasets variados para alta precisión.",
            "Proceso de entrenamiento y validación del modelo con métricas de desempeño y ajustes de hiperparámetros."
        ],
        imagenActual: 0
    },
    proyecto6: {
        titulo: "Modelos de predicción",
        descripcion: "Implementación de modelos de IA para datos",
        imagenes: generarImagenes("imagenes_proyectos/Modelos_Prediccion", 3, "png"),
        descripcionesImagenes: [
            "Modelo de clasificacion para prediccion de volatilidad en el mercado de valores.",
            "Proceso de mejoras y optimización del modelo para aumentar la precisión y reducir el error.",
            "Visualización de resultados y análisis de desempeño del modelo en diferentes métricas."
        ],
        imagenActual: 0
    },
    proyecto7: {
        titulo: "Generacion de imagenes con IA",
        descripcion: "Generacion de imagenes con IA",
        imagenes: generarImagenes("imagenes_proyectos/Generacion_imagenes", 2, "png"),
        descripcionesImagenes: [
            "Imagenes generadas utilizando modelos avanzados de IA como DALL-E y Stable Diffusion.",
            "Imagenes fotorealistas creadas a partir de descripciones textuales detalladas, para publicidad y marketing."
        ],
        imagenActual: 0
    }
};

// ====================================
// INICIALIZAR GALERÍA
// ====================================
function inicializarGaleria() {
    const galleryContainer = document.querySelector('.gallery');
    
    // Limpiar contenido existente
    galleryContainer.innerHTML = '';
    
    // Crear elementos para cada proyecto
    Object.entries(proyectos).forEach(([proyectoId, proyecto]) => {
        const galleryItem = crearElementoProyecto(proyectoId, proyecto);
        galleryContainer.appendChild(galleryItem);
    });

    // Crear modal
    crearModal();
}

// ====================================
// CREAR ELEMENTO DE PROYECTO
// ====================================
function crearElementoProyecto(proyectoId, proyecto) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.proyecto = proyectoId;
    
    galleryItem.innerHTML = `
        <div class="project-image-container">
            <img src="${proyecto.imagenes[0]}" alt="${proyecto.titulo}" class="project-image">
            <div class="image-indicator">
                ${proyecto.imagenActual + 1}/${proyecto.imagenes.length}
            </div>
            <div class="image-nav">
                ${proyecto.imagenes.map((_, index) => 
                    `<div class="nav-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`
                ).join('')}
            </div>
            <div class="project-overlay">
                <div class="overlay-content">
                    <h3>${proyecto.titulo}</h3>
                    <p>${proyecto.descripcion}</p>
                    <small>Click para ver detalles</small>
                </div>
            </div>
        </div>
        <div class="project-title">
            <h3>${proyecto.titulo}</h3>
            <small>Ver mas...</small>
        </div>
    `;
    
    // Agregar evento de click para abrir modal
    galleryItem.addEventListener('click', () => abrirModal(proyectoId));
    
    return galleryItem;
}

// ====================================
// CREAR MODAL
// ====================================
function crearModal() {
    // Verificar si el modal ya existe
    if (document.querySelector('.project-modal')) {
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <button class="modal-close">&times;</button>
        <div class="modal-info-section">
            <h2 class="modal-project-title"></h2>
            <p class="modal-image-description"></p>
            <div class="modal-dots"></div>
        </div>
        <div class="modal-image-section">
            <img src="" alt="" class="modal-image">
            <button class="modal-nav prev">&#8249;</button>
            <button class="modal-nav next">&#8250;</button>
            <div class="modal-image-indicator"></div>
        </div>
    `;

    document.body.appendChild(modal);

    // Eventos del modal
    configurarEventosModal();
}


// ====================================
// CONFIGURAR EVENTOS DEL MODAL
// ====================================
function configurarEventosModal() {
    const modal = document.querySelector('.project-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.modal-nav.prev');
    const nextBtn = modal.querySelector('.modal-nav.next');

    // Cerrar modal
    closeBtn.addEventListener('click', cerrarModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', manejarTeclas);

    // Navegación con botones
    prevBtn.addEventListener('click', () => navegarImagen(-1));
    nextBtn.addEventListener('click', () => navegarImagen(1));
}

// ====================================
// ABRIR MODAL
// ====================================
let proyectoActual = null;

function abrirModal(proyectoId) {
    proyectoActual = proyectoId;
    const proyecto = proyectos[proyectoId];
    const modal = document.querySelector('.project-modal');
    
    if (!proyecto || !modal) return;

    // Actualizar contenido del modal
    actualizarContenidoModal(proyecto);
    
    // Mostrar modal con animación
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');

    console.log(`🖼️ Modal abierto: ${proyecto.titulo}`);
}

// ====================================
// CERRAR MODAL
// ====================================
function cerrarModal() {
    const modal = document.querySelector('.project-modal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
    proyectoActual = null;
    // Detener animación del modal
    detenerAnimacionModal();
}

// ====================================
// ACTUALIZAR CONTENIDO DEL MODAL
// ====================================
function actualizarContenidoModal(proyecto) {
    const modal = document.querySelector('.project-modal');
    if (!modal) return;

    const titulo = modal.querySelector('.modal-project-title');
    const imagen = modal.querySelector('.modal-image');
    const descripcion = modal.querySelector('.modal-image-description');
    const indicador = modal.querySelector('.modal-image-indicator');
    const dotsContainer = modal.querySelector('.modal-dots');
    const prevBtn = modal.querySelector('.modal-nav.prev');
    const nextBtn = modal.querySelector('.modal-nav.next');

    // Actualizar título
    titulo.textContent = proyecto.titulo;

    // Actualizar imagen
    imagen.src = proyecto.imagenes[proyecto.imagenActual];
    imagen.alt = `${proyecto.titulo} - Imagen ${proyecto.imagenActual + 1}`;

    // Actualizar descripción
    descripcion.textContent = proyecto.descripcionesImagenes[proyecto.imagenActual];

    // Actualizar indicador
    indicador.textContent = `${proyecto.imagenActual + 1} / ${proyecto.imagenes.length}`;

    // Actualizar dots
    dotsContainer.innerHTML = '';
    proyecto.imagenes.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `modal-dot ${index === proyecto.imagenActual ? 'active' : ''}`;
        dot.addEventListener('click', () => cambiarAImagenModal(index));
        dotsContainer.appendChild(dot);
    }); 

    // Actualizar estado de botones
    prevBtn.disabled = proyecto.imagenActual === 0;
    nextBtn.disabled = proyecto.imagenActual === proyecto.imagenes.length - 1;

    // Detener animación anterior
    detenerAnimacionModal();

    // Iniciar nueva animación después de cargar la imagen
    setTimeout(() => {
        iniciarAnimacionModal(imagen);
    }, PAUSA_MODAL_INICIAL);

}

// ====================================
// NAVEGACIÓN DE IMÁGENES EN MODAL
// ====================================
function navegarImagen(direccion) {
    if (!proyectoActual) return;
    
    const proyecto = proyectos[proyectoActual];
    const nuevoIndice = proyecto.imagenActual + direccion;
    
    if (nuevoIndice >= 0 && nuevoIndice < proyecto.imagenes.length) {
        cambiarAImagenModal(nuevoIndice);
    }
}

function cambiarAImagenModal(nuevoIndice) {
    if (!proyectoActual) return;
    
    const proyecto = proyectos[proyectoActual];
    if (nuevoIndice === proyecto.imagenActual) return;

    const imagen = document.querySelector('.modal-image');
    const descripcion = document.querySelector('.modal-image-description');

    // Efecto de transición
    imagen.classList.add('fade-out');
    descripcion.classList.add('fade-out');

    setTimeout(() => {
        proyecto.imagenActual = nuevoIndice;
        actualizarContenidoModal(proyecto);
        
        imagen.classList.remove('fade-out');
        descripcion.classList.remove('fade-out');
    }, 300);
}

// ====================================
// ANIMACIÓN DE DESLIZAMIENTO EN MODAL
// ====================================
function iniciarAnimacionModal(imagen) {
    if (!imagen || !imagen.complete) {
        if (imagen) {
            imagen.onload = () => iniciarAnimacionModal(imagen);
        }
        return;
    }
    
    const contenedor = imagen.parentElement;
    const anchoContenedor = contenedor.offsetWidth;
    const altoContenedor = contenedor.offsetHeight;
    const anchoImagen = imagen.naturalWidth;
    const altoImagen = imagen.naturalHeight;
    
    // Calcular escala manteniendo proporción
    const escalaAncho = anchoContenedor / anchoImagen;
    const escalaAlto = altoContenedor / altoImagen;
    const escala = Math.max(escalaAncho, escalaAlto); // Llenar el contenedor
    
    const anchoImagenEscalada = anchoImagen * escala;
    const altoImagenEscalada = altoImagen * escala;
    
    // Solo animar si la imagen escala es más grande que el contenedor
    const necesitaAnimacionH = anchoImagenEscalada > anchoContenedor;
    const necesitaAnimacionV = altoImagenEscalada > altoContenedor;
    
    if (!necesitaAnimacionH && !necesitaAnimacionV) {
        imagen.style.objectPosition = 'center center';
        return;
    }
    
    // Configurar animación
    let progresoH = 0;
    let progresoV = 0;
    let direccionH = 1;
    let direccionV = 1;
    let inicioAnimacion = Date.now();
    
    const distanciaMaximaH = Math.max(0, anchoImagenEscalada - anchoContenedor);
    const distanciaMaximaV = Math.max(0, altoImagenEscalada - altoContenedor);
    const distanciaMaxima = Math.max(distanciaMaximaH, distanciaMaximaV);
    const duracionTotal = (distanciaMaxima / VELOCIDAD_MODAL) * 1000;
    
    function animar() {
        const tiempoTranscurrido = Date.now() - inicioAnimacion;
        const progresoTiempo = Math.min(tiempoTranscurrido / duracionTotal, 1);
        
        // Animación horizontal
        if (necesitaAnimacionH) {
            progresoH = direccionH > 0 ? progresoTiempo : 1 - progresoTiempo;
        } else {
            progresoH = 0.5; // Centrado
        }
        
        // Animación vertical
        if (necesitaAnimacionV) {
            progresoV = direccionV > 0 ? progresoTiempo : 1 - progresoTiempo;
        } else {
            progresoV = 0.5; // Centrado
        }
        
        // Aplicar posición
        const posicionX = progresoH * 100;
        const posicionY = progresoV * 100;
        imagen.style.objectPosition = `${posicionX}% ${posicionY}%`;
        imagen.style.objectFit = 'cover';
        
        // Cambiar dirección al completar el ciclo
        if (progresoTiempo >= 1) {
            setTimeout(() => {
                direccionH *= -1;
                direccionV *= -1;
                inicioAnimacion = Date.now();
                animar();
            }, PAUSA_MODAL_FINAL);
        } else {
            animacionModalActiva = requestAnimationFrame(animar);
        }
    }
    
    animar();
}

function detenerAnimacionModal() {
    if (animacionModalActiva) {
        cancelAnimationFrame(animacionModalActiva);
        animacionModalActiva = null;
    }
}

// ====================================
// MANEJO DE TECLADO
// ====================================
function manejarTeclas(e) {
    if (!proyectoActual) return;

    switch(e.key) {
        case 'Escape':
            cerrarModal();
            break;
        case 'ArrowLeft':
            navegarImagen(-1);
            break;
        case 'ArrowRight':
            navegarImagen(1);
            break;
    }
}

// ====================================
// INICIALIZAR AL CARGAR LA PÁGINA
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    inicializarGaleria();
});

// ====================================
// FUNCIÓN PARA AGREGAR NUEVOS PROYECTOS
// ====================================
function agregarProyecto(id, titulo, descripcion, imagenes, descripcionesImagenes = []) {
    // Si no se proporcionan descripciones, crear descripciones genéricas
    if (descripcionesImagenes.length === 0) {
        descripcionesImagenes = imagenes.map((_, index) => 
            `Vista ${index + 1} del proyecto ${titulo}`
        );
    }

    proyectos[id] = {
        titulo: titulo,
        descripcion: descripcion,
        imagenes: imagenes,
        descripcionesImagenes: descripcionesImagenes,
        imagenActual: 0
    };
    
    // Reinicializar galería si ya está cargada
    if (document.querySelector('.gallery')) {
        inicializarGaleria();
    }
}


// ====================================
// SCROLL AL INICIO
// ====================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ====================================
// ANIMACIONES DE ENTRADA
// ====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas de servicio cuando se cargan
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ====================================
// EFECTOS DE TECLADO
// ====================================
document.addEventListener('keydown', function(e) {
    // Cerrar modal con la tecla ESC
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
    
    // Navegación con teclas de flecha
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        window.scrollBy(0, -200);
    } else if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        window.scrollBy(0, 200);
    }
    
    // Ir al inicio con la tecla Home
    if (e.key === 'Home') {
        e.preventDefault();
        scrollToTop();
    }
});

// ====================================
// EFECTOS ADICIONALES
// ====================================

// Efecto parallax sutil en el héroe
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Cambiar el color del logo aleatoriamente cada 10 segundos
setInterval(() => {
    const logo = document.querySelector('.logo');
    const colors = ['#6366f1', '#ff6b6b', '#4ecdc4', '#74ff3dff', '#1a9cf3ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    if (logo) {
        logo.style.color = randomColor;
    }
}, 10000);

// ====================================
// EVENTOS DE CARGA DE LA PÁGINA
// ====================================
window.addEventListener('load', function() {
    // Mensaje de bienvenida en consola
    console.log('🎉 ¡Página web cargada correctamente!');
    console.log('💡 Usa las teclas Ctrl+↑/↓ para navegar');
    console.log('⌨️  Usa ESC para cerrar modales');
    console.log('🏠 Usa Home para ir al inicio');
    
    // Pequeña animación de bienvenida
    setTimeout(() => {
        const hero = document.querySelector('.hero h1');
        if (hero) {
            hero.style.textShadow = '0 0 20px rgba(255,255,255,0.5)';
            setTimeout(() => {
                hero.style.textShadow = 'none';
            }, 1000);
        }
    }, 2000);
});

// ====================================
// UTILIDADES ADICIONALES
// ====================================

// Función para cambiar el tema (opcional - para futuras expansiones)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Función para obtener información del dispositivo
function getDeviceInfo() {
    const info = {
        width: window.innerWidth,
        height: window.innerHeight,
        userAgent: navigator.userAgent,
        language: navigator.language
    };
    console.log('📱 Información del dispositivo:', info);
    return info;
}

// Detectar si es dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para smooth scroll personalizado
function smoothScrollTo(targetPosition, duration = 1000) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// ====================================
// DEBUG Y DESARROLLO
// ====================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Modo desarrollo activado');
    
    // Mostrar información útil para desarrollo
    window.debugInfo = {
        getDeviceInfo,
        isMobile,
        smoothScrollTo,
        toggleTheme
    };
    
    console.log('🛠️ Funciones de debug disponibles en window.debugInfo');
}

// PARTÍCULAS DINÁMICAS
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesLayer = document.createElement('div');
    particlesLayer.className = 'particles-layer';
    
    // Crear 30 partículas individuales
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = ['0', '1'][Math.floor(Math.random() * 2)];
        particle.style.position = 'absolute';
        particle.style.color = 'white';
        particle.style.fontSize = Math.random() * 15 + 10 + 'px';
        particle.style.fontFamily = 'Courier New, monospace';
        particle.style.textShadow = '0 0 5px rgba(0, 26, 255, 1)';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.8 + 0.2;
        particle.style.animation = `
            particle-twinkle ${2 + Math.random() * 3}s infinite ease-in-out,
            particle-drift ${8 + Math.random() * 4}s infinite ease-in-out
        `;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesLayer.appendChild(particle);
    }
    
    hero.appendChild(particlesLayer);
}

// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', createParticles);

// ====================================
// FOOTER JAVASCRIPT - MS Technologies
// ====================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    initFooterFunctionality();
});

// Función principal para inicializar todas las funcionalidades del footer
function initFooterFunctionality() {
    initBackToTopButton();
    initFooterAnimations();
    initSocialLinksEffects();
}

// ====================================
// BOTÓN VOLVER ARRIBA
// ====================================

// Mostrar/ocultar botón de volver arriba basado en scroll
function initBackToTopButton() {
    const backToTop = document.querySelector('.back-to-top-btn');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// Función para volver arriba suavemente
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ====================================
// ANIMACIONES DEL FOOTER
// ====================================

// Configurar animaciones de entrada para las secciones del footer
function initFooterAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar todas las secciones del footer
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach(section => {
        observer.observe(section);
    });
}

// ====================================
// EFECTOS DE REDES SOCIALES
// ====================================

// Agregar efectos hover mejorados para los enlaces de redes sociales
function initSocialLinksEffects() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        // Efecto al pasar el mouse
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        // Efecto al quitar el mouse
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
        
        // Efecto de click/tap para dispositivos móviles
        link.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px) scale(1.1)';
        });
        
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 150);
        });
    });
}

// ====================================
// EFECTOS ADICIONALES
// ====================================

// Efecto parallax sutil para el fondo del footer (opcional)
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const footer = document.querySelector('.footer');
        if (!footer) return;
        
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        footer.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

// ====================================
// UTILIDADES
// ====================================

// Función para obtener la altura del scroll
function getScrollPercent() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const trackLength = docHeight - winHeight;
    const pct = Math.floor(scrollTop/trackLength * 100);
    return pct;
}

// Función para smooth scroll a cualquier elemento
function smoothScrollTo(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// ====================================
// EVENTOS GLOBALES
// ====================================

// Manejar redimensionamiento de ventana
window.addEventListener('resize', function() {
    // Reajustar animaciones si es necesario
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach(section => {
        section.style.animationDelay = '0s';
    });
});

// Prevenir comportamiento por defecto en enlaces vacíos
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href="#"]')) {
        e.preventDefault();
    }
});

// ====================================
// CONFIGURACIÓN DE EMAILJS
// ====================================

// ⚠️ REEMPLAZA con tus credenciales reales de EmailJS
const EMAIL_CONFIG = {
    userID: 'LFx3X0bmRBdTLIPSN',      // Tu Public Key de EmailJS
    serviceID: 'cristhian343',       // Tu Service ID
    templateID: 'Contact001'         // Tu Template ID
};

// ====================================
// INICIALIZACIÓN
// ====================================
function initializeApp() {
    console.log('🚀 Iniciando aplicación...');
    
    // Verificar que EmailJS esté cargado
    if (typeof emailjs === 'undefined') {
        console.warn('⏳ EmailJS aún no está cargado, reintentando...');
        setTimeout(initializeApp, 100);
        return;
    }
    
    // Inicializar EmailJS
    try {
        emailjs.init(EMAIL_CONFIG.userID);
        console.log('✅ EmailJS inicializado correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar EmailJS:', error);
        return;
    }
    
    // Configurar aplicación
    setupContactForm();
    setupRealtimeValidation();
    setupModal();
    
    console.log('✅ Aplicación lista');
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ====================================
// FORMULARIO DE CONTACTO
// ====================================
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) {
        console.warn('⚠️ Formulario no encontrado');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const loading = document.getElementById('loading');
        
        // Obtener valores
        const nombreInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const mensajeInput = document.getElementById('mensaje');
        
        const nombre = nombreInput ? nombreInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const mensaje = mensajeInput ? mensajeInput.value.trim() : '';
        
        console.log('📝 Enviando formulario:', { nombre, email, mensajeLength: mensaje.length });
        
        // Validar
        if (!validateForm(nombre, email, mensaje)) {
            return;
        }
        
        // Deshabilitar botón
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }
        if (loading) {
            loading.style.display = 'block';
        }
        
        // Enviar con EmailJS
        emailjs.sendForm(EMAIL_CONFIG.serviceID, EMAIL_CONFIG.templateID, this)
            .then(function(response) {
                console.log('✅ Email enviado:', response);
                showModal(
                    '¡Mensaje Enviado!',
                    `Gracias ${nombre}, hemos recibido tu mensaje. Te contactaremos pronto.`
                );
                form.reset();
                clearValidationStyles();
            })
            .catch(function(error) {
                console.error('❌ Error:', error);
                let msg = 'Hubo un problema al enviar tu mensaje.';
                if (error.text) msg += ' ' + error.text;
                showModal('Error al Enviar', msg);
            })
            .finally(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensaje';
                }
                if (loading) {
                    loading.style.display = 'none';
                }
            });
    });
}

// ====================================
// VALIDACIÓN
// ====================================
function validateForm(nombre, email, mensaje) {
    console.log('🔍 Validando:', { 
        nombre: `"${nombre}" (${nombre.length} chars)`, 
        email: `"${email}"`, 
        mensaje: `${mensaje.length} chars` 
    });
    
    if (nombre.length < 2) {
        console.log('❌ Nombre muy corto');
        showModal('Error de Validación', 'El nombre debe tener al menos 2 caracteres');
        highlightField('nombre', false);
        return false;
    }
    
    if (!isValidEmail(email)) {
        console.log('❌ Email inválido');
        showModal('Error de Validación', 'Por favor ingresa un email válido');
        highlightField('email', false);
        return false;
    }
    
    if (mensaje.length < 10) {
        console.log('❌ Mensaje muy corto');
        showModal('Error de Validación', 'El mensaje debe tener al menos 10 caracteres');
        highlightField('mensaje', false);
        return false;
    }
    
    console.log('✅ Validación exitosa');
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function highlightField(fieldId, isValid) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('error', 'success');
        field.classList.add(isValid ? 'success' : 'error');
    }
}

function clearValidationStyles() {
    ['nombre', 'email', 'mensaje'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.classList.remove('error', 'success');
        }
    });
}

// ====================================
// VALIDACIÓN EN TIEMPO REAL
// ====================================
function setupRealtimeValidation() {
    const fields = {
        'email': (val) => isValidEmail(val),
        'nombre': (val) => val.trim().length >= 2,
        'mensaje': (val) => val.trim().length >= 10
    };
    
    Object.keys(fields).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                if (this.value.length > 0) {
                    highlightField(fieldId, fields[fieldId](this.value));
                } else {
                    this.classList.remove('error', 'success');
                }
            });
        }
    });
}

// ====================================
// MODAL
// ====================================
function showModal(title, message) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    if (modal && modalTitle && modalMessage) {
        modalTitle.textContent = title;
        modalMessage.innerHTML = message;
        modal.style.display = 'block';
        
        if (title.includes('Enviado')) {
            setTimeout(closeModal, 5000);
        }
    } else {
        alert(`${title}\n\n${message}`);
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function setupModal() {
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    };
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

/*====================================
  PANTALLA DE CARGA
====================================*/
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(function() {
    loadingScreen.style.animation = 'fadeOut 2s ease-in-out forwards';
    setTimeout(function() {
      loadingScreen.remove();
    }, 2000);
  }, 2800);
});

// ====================================
// BANNER DE OFERTA ESPECIAL
// ====================================
function closeOffer() {
    const banner = document.getElementById('specialOffer');
    if (banner) {
        banner.style.animation = 'slideDown 0.5s ease reverse';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 500);
        // Guardar en localStorage para no mostrar de nuevo
        localStorage.setItem('offerClosed', 'true');
    }
}

// Verificar si el banner debe mostrarse al cargar
document.addEventListener('DOMContentLoaded', function() {
    const offerClosed = localStorage.getItem('offerClosed');
    const banner = document.getElementById('specialOffer');
    
    if (offerClosed === 'true' && banner) {
        banner.style.display = 'none';
    }
});