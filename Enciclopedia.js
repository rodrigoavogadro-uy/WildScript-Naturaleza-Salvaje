document.addEventListener('DOMContentLoaded', () => {

    // ===== SLIDER =====
    const slides = document.querySelectorAll('.slide');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let current = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            current = (current + 1) % slides.length;
            showSlide(current);
        }, 10000);
    }

    if (next) {
        next.addEventListener('click', () => {
            current = (current + 1) % slides.length;
            showSlide(current);
            startAutoSlide();
        });
    }

    if (prev) {
        prev.addEventListener('click', () => {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
            startAutoSlide();
        });
    }

    startAutoSlide();

    // ===== MENÚ ACTIVO =====
    const menuLinks = document.querySelectorAll('nav ul li a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Detectar scroll para cambiar menú automáticamente
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const sliderSection = document.querySelector('#slider');
        const statsSection = document.querySelector('#estadisticas');

        if (!sliderSection || !statsSection) return;

        let currentSection = 'header';

        if (scrollPosition >= statsSection.offsetTop - 200) {
            currentSection = 'estadisticas';
        } else if (scrollPosition >= sliderSection.offsetTop - 200) {
            currentSection = 'slider';
        } else {
            currentSection = 'header';
        }

        menuLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href === '#header' && currentSection === 'header') {
                link.classList.add('active');
            } else if (href === '#slider' && currentSection === 'slider') {
                link.classList.add('active');
            } else if (href === '#estadisticas' && currentSection === 'estadisticas') {
                link.classList.add('active');
            }
        });
    });

    // ===== MENÚ HAMBURGUESA =====
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('header nav a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // ===== NAVEGACIÓN SPA =====
    function showPage(pageId) {
        console.log(`Intentando mostrar página: ${pageId}`);
        const targetPage = document.getElementById(pageId);

        if (!targetPage) {
            console.log(`Página ${pageId} no encontrada, creando...`);
            createPage(pageId);
            return;
        }

        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }

    function createPage(pageId) {
        const category = pageId.replace('-page', '');

        console.log(`Creando página para categoría: ${category}`);

        // 1. SCROLL AL INICIO INMEDIATAMENTE
        window.scrollTo(0, 0);

        // 2. OCULTAR SOLO EL CONTENIDO HOME (no el header completo)
        const homeContent = document.querySelector('#home-page');
        if (homeContent) homeContent.style.display = 'none';

        // 3. NO OCULTAR EL FOOTER - debe verse siempre
        // (Se eliminó la línea que ocultaba el footer)

        // Eliminar páginas anteriores
        document.querySelectorAll('.category-page').forEach(page => page.remove());

        // Crear página específica según categoría
        let pageContent = '';

        if (category === 'terrestres') {
            pageContent = `
        <div class="page-content">
            <div class="category-header">
                <h1>ANIMALES TERRESTRES</h1>
                <p>Explora la increíble diversidad de vida que habita en nuestros continentes</p>
            </div>
            
            <div class="animal-categories">
                <!-- Mamíferos -->
                <div class="animal-category-card">
                    <div class="category-image">
                        <img src="img/Mamiferos.jpg" alt="Mamíferos">
                    </div>
                    <div class="category-info">
                        <h3>MAMÍFEROS</h3>
                        <p>Los reyes de la tierra con sangre caliente y pelaje protector</p>
                        <button class="category-btn">VER MAMÍFEROS</button>
                    </div>
                </div>

                <!-- Reptiles -->
                <div class="animal-category-card">
                    <div class="category-image">
                        <img src="img/Reptiles.jpg" alt="Reptiles">
                    </div>
                    <div class="category-info">
                        <h3>REPTILES</h3>
                        <p>Maestros de la adaptación con escamas y sangre fría</p>
                        <button class="category-btn">VER REPTILES</button>
                    </div>
                </div>

                <!-- Anfibios -->
                <div class="animal-category-card">
                    <div class="category-image">
                        <img src="img/Anfibios.jpg" alt="Anfibios">
                    </div>
                    <div class="category-info">
                        <h3>ANFIBIOS</h3>
                        <p>Vida dual entre tierra y agua con metamorfosis fascinantes</p>
                        <button class="category-btn">VER ANFIBIOS</button>
                    </div>
                </div>

                <!-- Aves Terrestres -->
                <div class="animal-category-card">
                    <div class="category-image">
                        <img src="img/AvesTerrestres.jpg" alt="Aves Terrestres">
                    </div>
                    <div class="category-info">
                        <h3>AVES TERRESTRES</h3>
                        <p>Aves que han elegido la tierra como su hogar principal</p>
                        <button class="category-btn">VER AVES</button>
                    </div>
                </div>

                <!-- Insectos y Arácnidos -->
                <div class="animal-category-card">
                    <div class="category-image">
                        <img src="img/AracnidosEInsectos.jpg" alt="Insectos y Arácnidos">
                    </div>
                    <div class="category-info">
                        <h3>🐛 INSECTOS Y ARÁCNIDOS</h3>
                        <p>Los artrópodos más diversos: desde insectos con 6 patas hasta arácnidos con 8</p>
                        <button class="category-btn">VER INSECTOS Y ARÁCNIDOS</button>
                    </div>
                </div>

                <!-- Invertebrados -->
                <div class="animal-category-card">
                    <div class="category-image">
                        <img src="img/Invertebrados.jpg" alt="Invertebrados">
                    </div>
                    <div class="category-info">
                        <h3>🐌 INVERTEBRADOS</h3>
                        <p>Criaturas terrestres sin columna vertebral con adaptaciones sorprendentes</p>
                        <button class="category-btn">VER INVERTEBRADOS</button>
                    </div>
                </div>
            </div>
            
            <div class="fun-facts">
                <h2>🌟 DATOS CURIOSOS</h2>
                <div class="facts-grid">
                    <div class="fact-card">
                        <h4>¿Sabías que...?</h4>
                        <p>Los elefantes pueden "escuchar" con los pies, detectando vibraciones a kilómetros de distancia</p>
                    </div>
                    <div class="fact-card">
                        <h4>¡Increíble!</h4>
                        <p>Las hormigas pueden levantar 50 veces su propio peso corporal</p>
                    </div>
                    <div class="fact-card">
                        <h4>¡Asombroso!</h4>
                        <p>Los geckos pueden caminar por el techo gracias a millones de pelos microscópicos</p>
                    </div>
                </div>
            </div>
        </div>
    `;
        } else {
            // Páginas para acuaticos y aéreos
            const categoryNames = {
                'acuaticos': 'Animales Acuáticos',
                'aereos': 'Animales Aéreos'
            };
            
            pageContent = `
                <div class="page-content">
                    <div class="category-header">
                        <h1>${categoryNames[category]}</h1>
                        <p>Página en construcción para ${categoryNames[category].toLowerCase()}</p>
                    </div>
                </div>
            `;
        }

        // Crear nueva página
        const newPage = document.createElement('section');
        newPage.id = `${category}-content`;
        newPage.className = 'category-page';
        newPage.innerHTML = pageContent;

        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentElement('afterend', newPage);
        }
    }

    function goHome() {
        console.log('Volviendo al inicio...');

        // 1. SCROLL AL INICIO INMEDIATAMENTE
        window.scrollTo(0, 0);

        // 2. MOSTRAR CONTENIDO HOME
        const homeContent = document.querySelector('#home-page');
        if (homeContent) homeContent.style.display = 'block';

        // 3. ELIMINAR PÁGINAS DE CATEGORÍAS
        document.querySelectorAll('.category-page').forEach(page => page.remove());

        // Resetear menú activo
        menuLinks.forEach(l => l.classList.remove('active'));
        const inicioLink = document.querySelector('a[href="#header"]');
        if (inicioLink) inicioLink.classList.add('active');
    }

    // ===== BOTONES EXPLORAR =====
    function setupExploreButtons() {
        const exploreButtons = document.querySelectorAll('.explore-btn');
        console.log(`Encontrados ${exploreButtons.length} botones explorar`);

        if (exploreButtons.length === 0) {
            console.log('No se encontraron botones, reintentando...');
            setTimeout(setupExploreButtons, 500);
            return;
        }

        exploreButtons.forEach((btn, index) => {
            console.log(`Botón ${index + 1} - data-category:`, btn.getAttribute('data-category'));

            btn.onclick = function (e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');

                if (category) {
                    console.log(`✅ Navegando a: ${category}`);
                    showPage(`${category}-page`);
                } else {
                    console.error('❌ No se pudo obtener la categoría');
                }
            };
        });
    }

    setupExploreButtons();

    // ===== BOTÓN INICIO =====
    const inicioBtn = document.querySelector('a[href="#header"]');
    if (inicioBtn) {
        inicioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            goHome();
        });
    }

});