document.addEventListener('DOMContentLoaded', () => {

    // Variables para navegación jerárquica
    let currentLevel = 'home'; // 'home', 'category', 'subcategory'
    let currentCategory = null; // 'terrestres', 'acuaticos', 'aereos'

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

    // ===== MENÚ ACTIVO MEJORADO =====
    const menuLinks = document.querySelectorAll('nav ul li a');

    function updateMenuForNavigation() {
        menuLinks.forEach(l => l.classList.remove('active'));

        if (currentLevel === 'home') {
            // Comportamiento normal del scroll
            const scrollPosition = window.scrollY;
            const sliderSection = document.querySelector('#slider');
            const statsSection = document.querySelector('#estadisticas');
            const aboutSection = document.querySelector('#sobre-mi');

            if (!sliderSection || !statsSection || !aboutSection) return;

            let currentSection = 'header';

             if (scrollPosition >= aboutSection.offsetTop - 200) {
            currentSection = 'sobre-mi';
            } else if (scrollPosition >= statsSection.offsetTop - 200) {
                currentSection = 'estadisticas';
            } else if (scrollPosition >= sliderSection.offsetTop - 200) {
                currentSection = 'slider';
            } else {
                currentSection = 'header';
            }

            menuLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === '#header' && currentSection === 'header') {
                    link.classList.add('active');
                } else if (href === '#slider' && currentSection === 'slider') {
                    link.classList.add('active');
                } else if (href === '#estadisticas' && currentSection === 'estadisticas') {
                    link.classList.add('active');
                } else if (href === '#sobre-mi' && currentSection === 'sobre-mi') {
                    link.classList.add('active');
                }
            });
        } else if (currentLevel === 'category' || currentLevel === 'subcategory') {
            // Mantener "ANIMALES" activo cuando estamos en categorías o subcategorías
            const animalesLink = document.querySelector('a[href="#slider"]');
            if (animalesLink) animalesLink.classList.add('active');
        }
    }

    // Detectar scroll solo cuando estamos en home
    window.addEventListener('scroll', () => {
        if (currentLevel === 'home') {
            updateMenuForNavigation();
        }
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

    // ===== NAVEGACIÓN SPA MEJORADA =====
    function showPage(pageId) {
        console.log(`Intentando mostrar página: ${pageId}`);

        // Actualizar estado de navegación
        if (pageId.includes('-page')) {
            currentLevel = 'category';
            currentCategory = pageId.replace('-page', '');
        }

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

        // Actualizar menú
        updateMenuForNavigation();
    }

    function showSubcategory(subcategory) {
        console.log(`Mostrando subcategoría: ${subcategory} de ${currentCategory}`);
        currentLevel = 'subcategory';

        // Aquí puedes crear las páginas de subcategorías más adelante
        console.log(`Subcategoría ${subcategory} en construcción`);

        // Mantener menú "ANIMALES" activo
        updateMenuForNavigation();
    }

    function createPage(pageId) {
        const category = pageId.replace('-page', '');

        console.log(`Creando página para categoría: ${category}`);

        window.scrollTo(0, 0);

        const homeContent = document.querySelector('#home-page');
        if (homeContent) homeContent.style.display = 'none';

        document.querySelectorAll('.category-page').forEach(page => page.remove());

        // Tu contenido actual de createPage se mantiene igual...
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
                        <button class="category-btn" data-subcategory="mamiferos">VER MAMÍFEROS</button>
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
                        <button class="category-btn" data-subcategory="reptiles">VER REPTILES</button>
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
                        <button class="category-btn" data-subcategory="anfibios">VER ANFIBIOS</button>
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
                        <button class="category-btn" data-subcategory="aves-terrestres">VER AVES</button>
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
                        <button class="category-btn" data-subcategory="insectos-aracnidos">VER INSECTOS Y ARÁCNIDOS</button>
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
                        <button class="category-btn" data-subcategory="invertebrados">VER INVERTEBRADOS</button>
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
        } else if (category === 'acuaticos') {
            pageContent = `
            <div class="page-content">
                <div class="category-header">
                    <h1>ANIMALES ACUÁTICOS</h1>
                    <p>Sumérgete en las profundidades de mares, océanos y ríos para descubrir la increíble diversidad de criaturas que habitan nuestras aguas.</p>
                </div>
                
                <div class="animal-categories">
                    <!-- Mamíferos Marinos -->
                    <div class="animal-category-card">
                        <div class="category-image">
                            <img src="img/MamiferosMarinos.jpg" alt="Mamíferos Marinos">
                        </div>
                        <div class="category-info">
                            <h3>MAMÍFEROS MARINOS</h3>
                            <p>Gigantes del océano con sangre caliente que respiran aire</p>
                            <button class="category-btn" data-subcategory="mamiferos-marinos">VER MAMÍFEROS MARINOS</button>
                        </div>
                    </div>

                    <!-- Reptiles Marinos -->
                    <div class="animal-category-card">
                        <div class="category-image">
                            <img src="img/ReptilesMarinos.jpg" alt="Reptiles Marinos">
                        </div>
                        <div class="category-info">
                            <h3>REPTILES MARINOS</h3>
                            <p>Antiguos navegantes con escamas adaptados a la vida oceánica</p>
                            <button class="category-btn" data-subcategory="reptiles-marinos">VER REPTILES MARINOS</button>
                        </div>
                    </div>

                    <!-- Peces -->
                    <div class="animal-category-card">
                        <div class="category-image">
                            <img src="img/Peces.jpg" alt="Peces">
                        </div>
                        <div class="category-info">
                            <h3>PECES</h3>
                            <p>Habitan siempre en el agua y respiran por branquias. Se desplazan con aletas y tienen gran variedad de formas.</p>
                            <button class="category-btn" data-subcategory="peces">VER PECES</button>
                        </div>
                    </div>

                    <!-- Moluscos -->
                    <div class="animal-category-card">
                        <div class="category-image">
                            <img src="img/Moluscos.jpg" alt="Moluscos">
                        </div>
                        <div class="category-info">
                            <h3>MOLUSCOS</h3>
                            <p>Criaturas blandas con conchas protectoras y tentáculos inteligentes</p>
                            <button class="category-btn" data-subcategory="moluscos">VER MOLUSCOS</button>
                        </div>
                    </div>

                    <!-- Crustáceos -->
                    <div class="animal-category-card">
                        <div class="category-image">
                            <img src="img/Crustaceos.jpg" alt="Crustáceos">
                        </div>
                        <div class="category-info">
                            <h3>CRUSTÁCEOS</h3>
                            <p>Artrópodos acorazados con pinzas poderosas y exoesqueletos resistentes</p>
                            <button class="category-btn" data-subcategory="crustaceos">VER CRUSTÁCEOS</button>
                        </div>
                    </div>

                    <!-- Equinodermos -->
                    <div class="animal-category-card">
                        <div class="category-image">
                            <img src="img/Equinodermos.jpg" alt="Equinodermos">
                        </div>
                        <div class="category-info">
                            <h3>EQUINODERMOS</h3>
                            <p>Habitantes del fondo marino con simetría radial y piel espinosa</p>
                            <button class="category-btn" data-subcategory="equinodermos">VER EQUINODERMOS</button>
                        </div>
                    </div>
                </div>
                
                <div class="fun-facts">
                    <h2>🌟 DATOS CURIOSOS</h2>
                    <div class="facts-grid">
                        <div class="fact-card">
                            <h4>¡Increíble!</h4>
                            <p>Los pulpos tienen tres corazones y sangre azul</p>
                        </div>
                        <div class="fact-card">
                            <h4>¡Asombroso!</h4>
                            <p>Los tiburones han existido por más de 400 millones de años, antes que los árboles</p>
                        </div>
                        <div class="fact-card">
                            <h4>¡Fascinante!</h4>
                            <p>Las estrellas de mar pueden regenerar brazos perdidos completamente</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        } else if (category === 'aereos') {
            pageContent = `
        <div class="page-content">
            <div class="category-header">
                <h1>🦅 ANIMALES AÉREOS</h1>
                <p>Vuela alto y explora el reino de las criaturas que dominan los cielos</p>
            </div>
            
            <div class="animal-categories">
                <!-- Mamíferos -->
                <div class="animal-category-card">
                    <div class="category-image">
                        <img src="img/MamiferosAereos.jpg" alt="Mamíferos Aéreos">
                    </div>
                    <div class="category-info">
                        <h3>🦇 MAMÍFEROS</h3>
                        <p>Los únicos mamíferos capaces de volar con alas de piel membranosa</p>
                        <button class="category-btn" data-subcategory="mamiferos-aereos">VER MAMÍFEROS AÉREOS</button>
                    </div>
                </div>

                <!-- Aves -->
                <div class="animal-category-card">
                    <div class="category-image">
                        <img src="img/Aves.jpg" alt="Aves">
                    </div>
                    <div class="category-info">
                        <h3>AVES</h3>
                        <p>Maestros del vuelo con plumas, huesos huecos y navegación extraordinaria</p>
                        <button class="category-btn" data-subcategory="aves">VER AVES</button>
                    </div>
                </div>

                <!-- Insectos -->
                <div class="animal-category-card">
                    <div class="category-image">
                        <img src="img/InsectosAereos.jpg" alt="Insectos Aéreos">
                    </div>
                    <div class="category-info">
                        <h3>INSECTOS</h3>
                        <p>Los primeros conquistadores del aire con alas membranosas y vuelos acrobáticos</p>
                        <button class="category-btn" data-subcategory="insectos-aereos">VER INSECTOS AÉREOS</button>
                    </div>
                </div>
            </div>
            
            <div class="fun-facts">
                <h2>🌟 DATOS CURIOSOS</h2>
                <div class="facts-grid">
                    <div class="fact-card">
                        <h4>¿Sabías que...?</h4>
                        <p>Los murciélagos son los únicos mamíferos capaces de volar verdaderamente, no solo planear</p>
                    </div>
                    <div class="fact-card">
                        <h4>¡Increíble!</h4>
                        <p>Los colibríes pueden volar hacia atrás y batir sus alas hasta 80 veces por segundo</p>
                    </div>
                    <div class="fact-card">
                        <h4>¡Asombroso!</h4>
                        <p>Las libélulas son cazadores aéreos tan eficientes que capturan el 95% de sus presas</p>
                    </div>
                </div>
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

        // Añadir event listeners para botones de subcategorías
        const categoryButtons = newPage.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const subcategory = btn.getAttribute('data-subcategory');
                showSubcategory(subcategory);
            });
        });
    }

    function goHome() {
        console.log('Volviendo al inicio...');

        window.scrollTo(0, 0);

        const homeContent = document.querySelector('#home-page');
        if (homeContent) homeContent.style.display = 'block';

        document.querySelectorAll('.category-page').forEach(page => page.remove());

        // Resetear estado de navegación
        currentLevel = 'home';
        currentCategory = null;

        updateMenuForNavigation();
    }

    function backToCategories() {
        console.log('Volviendo al slider principal...');

        // Mostrar home content
        const homeContent = document.querySelector('#home-page');
        if (homeContent) homeContent.style.display = 'block';

        // Eliminar páginas de categorías  
        document.querySelectorAll('.category-page').forEach(page => page.remove());

        // Resetear estado
        currentLevel = 'home';
        currentCategory = null;

        // Ir directo al slider
        const slider = document.querySelector('#slider');
        if (slider) {
            slider.scrollIntoView({ behavior: 'smooth' });
        }

        // Activar menú ANIMALES
        menuLinks.forEach(l => l.classList.remove('active'));
        const animalesLink = document.querySelector('a[href="#slider"]');
        if (animalesLink) animalesLink.classList.add('active');
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

    // ===== BOTÓN ANIMALES MEJORADO =====
    const animalesBtn = document.querySelector('a[href="#slider"]');
    if (animalesBtn) {
        animalesBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (currentLevel === 'home') {
                // Comportamiento normal - ir a slider
                document.querySelector('#slider').scrollIntoView({ behavior: 'smooth' });
                updateMenuForNavigation();
            } else {
                // Volver al nivel anterior
                backToCategories();
            }
        });
    }


    // ===== PÁGINAS DE ESTADÍSTICAS =====
    function showStatsPage(statType) {
        console.log(`Mostrando estadística: ${statType}`);

        // Actualizar estado
        currentLevel = 'subcategory';

        window.scrollTo(0, 0);

        // Ocultar home content
        const homeContent = document.querySelector('#home-page');
        if (homeContent) homeContent.style.display = 'none';

        // Eliminar páginas anteriores
        document.querySelectorAll('.category-page').forEach(page => page.remove());

        // Crear página de estadística
        createStatsPage(statType);

        // Mantener menú ESTADÍSTICAS activo
        menuLinks.forEach(l => l.classList.remove('active'));
        // ===== BOTÓN ESTADÍSTICAS MEJORADO =====
        const estadisticasBtn = document.querySelector('a[href="#estadisticas"]');
        if (estadisticasBtn) {
            estadisticasBtn.addEventListener('click', (e) => {
                e.preventDefault();

                if (currentLevel === 'home') {
                    // Comportamiento normal - ir a estadísticas
                    document.querySelector('#estadisticas').scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Volver a las estadísticas principales
                    backToCategories();
                }
            });
        }
    }

    function createStatsPage(statType) {
        let pageContent = '';

        switch (statType) {
            case 'velocidad':
                pageContent = `
            <div class="page-content">
                <div class="stats-page-header">
                    <h1>🏃‍♂️ LOS MÁS RÁPIDOS</h1>
                    <p>Descubre los récords de velocidad más impresionantes del reino animal</p>
                </div>
                
                <div class="speed-champions">
                    <div class="champion-card gold">
                        <div class="champion-image">
                            <img src="img/HalconPeregrino.jpg" alt="Halcón Peregrino">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥇HALCÓN PEREGRINO</h3>
                            <div class="speed-stat">389 km/h</div>
                            <p><strong>Categoría:</strong> Aéreo (en picada)</p>
                            <p><strong>Hábitat:</strong> Mundial, excepto Antártida</p>
                            <p>El halcón peregrino alcanza velocidades letales durante sus picadas de caza, convirtiéndose en el animal más rápido del planeta.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card silver">
                        <div class="champion-image">
                            <img src="img/AguilaReal.jpg" alt="Guepardo">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥈ÁGUILA REAL</h3>
                            <div class="speed-stat">240 km/h</div>
                            <p><strong>Categoría:</strong> Aéreo (en picada)</p>
                            <p><strong>Hábitat:</strong> América del Norte, Europa, Asia y norte de África</p>
                            <p>Una cazadora formidable que alcanza gran velocidad al lanzarse desde alturas impresionantes para atrapar a sus presas.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card bronze">
                        <div class="champion-image">
                            <img src="img/Guepardo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥉GUEPARDO</h3>
                            <div class="speed-stat">120 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>África y algunas zonas de Irán</p>
                            <p>El felino más veloz del mundo, capaz de acelerar de 0 a 100 km/h en solo 3 segundos, ideal para cazar en distancias cortas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/PezVela.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>4️⃣PEZ VELA</h3>
                            <div class="speed-stat">110 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Océanos tropicales y subtropicales</p>
                            <p>El pez más veloz de los océanos, usa su velocidad para cazar bancos de peces pequeños.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/AntilopeBerrendo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>5️⃣ANTÍLOPE BERRENDO</h3>
                            <div class="speed-stat">100 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> América del Norte</p>
                            <p>Puede mantener altas velocidades por largos periodos, lo que lo convierte en uno de los corredores más resistentes de la naturaleza.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/TiburonMako.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>6️⃣TIBURÓN MAKO</h3>
                            <div class="speed-stat">74 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Océanos templados y tropicales</p>
                            <p>El tiburón más veloz, capaz de saltar fuera del agua mientras caza gracias a su potencia y diseño hidrodinámico.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Avestruz.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>7️⃣AVESTRUZ</h3>
                            <div class="speed-stat">70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>África subsahariana</p>
                            <p>El ave corredora más rápida, utiliza sus largas patas para alcanzar gran velocidad y escapar de depredadores.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Caballo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>8️⃣CABALLO</h3>
                            <div class="speed-stat">70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> Doméstico (criado en todo el mundo)</p>
                            <p>Criado para la velocidad, este caballo es capaz de alcanzar gran potencia y resistencia en carreras cortas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/GacelaDeThommpson.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>9️⃣GACELA DE THOMSON</h3>
                            <div class="speed-stat">65-70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> África oriental</p>
                            <p>Combina velocidad y agilidad, utilizando giros rápidos para evadir a depredadores como guepardos y leones.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/LoboGris.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🔟 LOBO GRIS</h3>
                            <div class="speed-stat">65 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>América del Norte, Europa, Asia y Medio Oriente</p>
                            <p>Caza en manada y alcanza altas velocidades durante persecuciones, aunque solo por distancias cortas.</p>
                        </div>
                    </div>
                </div>
                
                <div class="speed-facts">
                    <h2>🌟 DATOS CURIOSOS</h2>
                    <div class="facts-comparison">
                        <div class="comparison-item">
                            <h4>Comparación con Humanos</h4>
                            <p>Usain Bolt: 44.7 km/h<br>
                            Guepardo: <strong>120 km/h</strong><br>
                            ¡2.7 veces más rápido!</p>
                        </div>
                        <div class="comparison-item">
                            <h4>Adaptaciones Especiales</h4>
                            <p>• Músculos súper desarrollados<br>
                            • Visión excepcional<br>
                            • Aerodinámica perfecta</p>
                        </div>
                        <div class="comparison-item">
                            <h4>Récord Asombroso</h4>
                            <p>El halcón peregrino en picada es más rápido que un auto de Fórmula 1 (350 km/h)</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

                break;

            case 'lentitud':
                pageContent = `
            <div class="page-content">
                <div class="stats-page-header">
                    <h1>LOS MÁS LENTOS</h1>
                    <p>Descubre a los maestros de la calma: los animales más lentos del planeta</p>
                </div>
                
                <div class="speed-champions">
                    <div class="champion-card gold">
                        <div class="champion-image">
                            <img src="img/CaballitoDeMar.jpg" alt="Caballito De Mar">
                        </div>
                        <div class="champion-info">
                            <h3>🥇 CABALLITO DE MAR</h3>
                            <div class="speed-stat">0,009 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Zonas costeras y arrecifes de coral en aguas cálidas</p>
                            <p>El caballito de mar es considerado el pez más lento del mundo. Nada erguido moviendo su aleta dorsal, que bate de 30 a 70 veces por segundo, avanzando apenas unos centímetros por minuto.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card silver">
                        <div class="champion-image">
                            <img src="img/babosabanana.jpg" alt="Babosa Banana">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>🥈 BABOSA BANANA</h3>
                                <div class="speed-stat">0,006 km/h</div>
                                <p><strong>Categoría:</strong> Terrestre</p>
                                <p><strong>Hábitat:</strong> Bosques húmedos de América del Norte</p>
                                <p>La babosa banana es una de las más grandes del mundo, alcanzando hasta 25 cm de longitud. Su baba espesa le permite incluso deslizarse boca abajo y la protege de depredadores gracias a su sabor amargo.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card bronze">
                        <div class="champion-image">
                            <img src="img/Invertebrados.jpg" alt="Caracol Terrestre">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>🥉 CARACOL TERRESTRE</h3>
                                <div class="speed-stat">0,048 km/h</div>
                                <p><strong>Categoría:</strong> Terrestre</p>
                                <p><strong>Hábitat:</strong> Mundial, en zonas húmedas y boscosas</p>
                                <p>El caracol se desplaza sobre una capa de baba que reduce la fricción y protege su cuerpo. Puede tardar más de 20 horas en recorrer apenas 1 km.</p>

                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Perezoso3dedos.jpg" alt="Perezoso 3 dedos">
                        </div>
                        <div class="champion-info">
                            <h3>4️⃣ PEREZOSO DE TRES DEDOS</h3>
                            <div class="speed-stat">0,24 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre y arborícola</p>
                            <p><strong>Hábitat:</strong> Selvas tropicales de Centro y Sudamérica</p>
                            <p>La pereza se mueve tan despacio que el musgo crece en su pelaje, ayudándola a camuflarse. Solo baja al suelo una vez por semana para hacer sus necesidades.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/TortugaGalapagos.jpg" alt="Tortuga Galapagos">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>5️⃣ TORTUGA GIGANTE DE GALÁPAGOS</h3>
                                <div class="speed-stat">0,3 km/h</div>
                                <p><strong>Categoría:</strong> Terrestre</p>
                                <p><strong>Hábitat:</strong> Islas Galápagos</p>
                                <p>Estas tortugas pueden vivir más de 150 años. Su metabolismo lento les permite conservar energía y desplazarse lentamente pese a su gran tamaño.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/CangrejoCocotero.jpg" alt="Cangrejo Cocotero">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>6️⃣ CANGREJO COCOTERO</h3>
                                <div class="speed-stat">1,5 - 2 km/h</div>
                                <p><strong>Categoría:</strong> Terrestre</p>
                                <p><strong>Hábitat:</strong> Islas tropicales del océano Índico y Pacífico</p>
                                <p>El cangrejo cocotero es el cangrejo terrestre más grande del mundo. Aunque se mueve lentamente, posee una fuerza increíble y puede romper cocos con sus pinzas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/LorisPerezoso.jpg" alt="Loris Perezoso">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>7️⃣ LORIS PEREZOSO</h3>
                                <div class="speed-stat">2 km/h</div>
                                <p><strong>Categoría:</strong> Terrestre y arborícola</p>
                                <p><strong>Hábitat:</strong> Bosques tropicales del sudeste asiático</p>
                                <p>Este primate nocturno se mueve despacio y en silencio para evitar depredadores. Es uno de los pocos primates venenosos del mundo.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/PinguinoEmperador.jpg" alt="Pinguino Emperador">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>8️⃣ PINGÜINO EMPERADOR</h3>
                                <div class="speed-stat">2 - 3 km/h</div>
                                <p><strong>Categoría:</strong> Terrestre (sobre hielo) y acuático</p>
                                <p><strong>Hábitat:</strong> Antártida</p>
                                <p>Aunque son veloces nadando, en tierra caminan lentamente. Para ahorrar energía, suelen deslizarse sobre su vientre en el hielo.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/OsoHormigueroGigante.jpg" alt="Oso Hormiguero Gigante">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>9️⃣ OSO HORMIGUERO GIGANTE</h3>
                                <div class="speed-stat">5 km/h</div>
                                <p><strong>Categoría:</strong> Terrestre</p>
                                <p><strong>Hábitat:</strong> Sabana y selvas de América Central y del Sur</p>
                                <p>Este animal camina despacio debido a sus enormes garras, pero puede defenderse con ellas, siendo capaz de herir gravemente a un jaguar.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Koala.jpg" alt="Koala">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>🔟 KOALA</h3>
                                <div class="speed-stat">10 km/h</div>
                                <p><strong>Categoría:</strong> Terrestre y arborícola</p>
                                <p><strong>Hábitat:</strong> Bosques de eucalipto en Australia</p>
                                <p>Su dieta pobre en nutrientes lo obliga a moverse despacio y dormir hasta 20 horas al día para conservar energía.</p>
                        </div>
                    </div>
                </div>
                
                <div class="speed-facts">
                    <h2>🌟 DATOS CURIOSOS</h2>
                        <div class="facts-comparison">
        <div class="comparison-item">
            <h4>Lentitud Extrema</h4>
            <p>El caracol terrestre roduce baba para reducir la fricción al desplazarse.</p>
        </div>
        <div class="comparison-item">
            <h4>Camuflaje Natural</h4>
            <p>La lentitud de los perezosos pigmeos les permite que crezcan algas en su pelaje, lo que lo camufla entre los árboles.</p>
        </div>
        <div class="comparison-item">
            <h4>Regeneración increíble </h4>
            <p>Las estrellas de mar pueden regenerar un brazo perdido e incluso reconstruir su cuerpo entero.</p>
        </div>
    </div>
                </div>
            </div>
        `;
                break;

            case 'tamaño':
                pageContent = `
            <div class="page-content">
                <div class="stats-page-header">
                    <h1>🏃‍♂️ LOS MÁS GRANDES</h1>
                    <p>Descubre a los gigantes del reino animal: titanes de la tierra y el mar</p>
                </div>
                
                <div class="size-champions">
    <div class="champion-card gold">
        <div class="champion-image">
            <img src="img/ballenaazul.jpg" alt="Ballena Azul">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>🥇BALLENA AZUL</h3>
            <div class="speed-stat">30 m</div>
            <p><strong>Categoría:</strong> Acuático (mamífero marino)</p>
            <p><strong>Hábitat:</strong> Océanos de todo el mundo</p>
            <p>El animal más grande que ha existido, puede alcanzar hasta 30 metros y su corazón puede pesar tanto como un automóvil.</p>
        </div>
    </div>

    <div class="champion-card silver">
        <div class="champion-image">
            <img src="img/rorcualcomun.jpg" alt="Rorcual Común">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>🥈RORCUAL COMÚN</h3>
            <div class="speed-stat">27 m</div>
            <p><strong>Categoría:</strong> Acuático (mamífero marino)</p>
            <p><strong>Hábitat:</strong> Océanos templados y fríos</p>
            <p>Es el segundo animal más grande del planeta y puede nadar a gran velocidad, alcanzando hasta 40 km/h.</p>
        </div>
    </div>

    <div class="champion-card bronze">
        <div class="champion-image">
            <img src="img/Cachalote.jpg" alt="Cachalote">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>🥉CACHALOTE</h3>
            <div class="speed-stat">20.5 m</div>
            <p><strong>Categoría:</strong> Acuático (mamífero marino)</p>
            <p><strong>Hábitat:</strong> Océanos profundos y templados</p>
            <p>El depredador con dientes más grande del mundo, famoso por sus inmersiones a más de 2.000 metros de profundidad.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/tiburonballena.jpg" alt="Tiburón Ballena">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>4️⃣TIBURÓN BALLENA</h3>
            <div class="speed-stat">18 m</div>
            <p><strong>Categoría:</strong> Acuático (pez)</p>
            <p><strong>Hábitat:</strong> Océanos tropicales y subtropicales</p>
            <p>El pez más grande del mundo, se alimenta filtrando plancton y pequeños peces mientras nada lentamente.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/ballenagris.jpg" alt="Ballena Gris">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>5️⃣BALLENA GRIS</h3>
            <div class="speed-stat">15 m</div>
            <p><strong>Categoría:</strong> Acuático (mamífero marino)</p>
            <p><strong>Hábitat:</strong> Costas del Pacífico Norte</p>
            <p>Realiza una de las migraciones más largas del reino animal, viajando hasta 20.000 km cada año.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/calamargigante.jpg" alt="Calamar Gigante">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>6️⃣CALAMAR GIGANTE</h3>
            <div class="speed-stat">13 m</div>
            <p><strong>Categoría:</strong> Acuático (invertebrado)</p>
            <p><strong>Hábitat:</strong> Océanos profundos</p>
            <p>Posee ojos del tamaño de un plato, perfectos para detectar presas en la oscuridad de las profundidades marinas.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/tiburonperegrino.jpg" alt="Tiburón Peregrino">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>7️⃣TIBURÓN PEREGRINO</h3>
            <div class="speed-stat">12 m</div>
            <p><strong>Categoría:</strong> Acuático (pez)</p>
            <p><strong>Hábitat:</strong> Océanos templados y fríos</p>
            <p>Este tiburón inofensivo se alimenta filtrando plancton y puede ser visto nadando cerca de la superficie.</p>
        </div>
    </div>
    
    <div class="champion-card">
        <div class="champion-image">
            <img src="img/anaconda.jpg" alt="Anaconda">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>8️⃣ANACONDA</h3>
            <div class="speed-stat">8 m</div>
            <p><strong>Categoría:</strong> Acuático/Terrestre (reptil)</p>
            <p><strong>Hábitat:</strong> Ríos y pantanos de Sudamérica</p>
            <p>Una de las serpientes más largas y pesadas, adaptada para nadar y emboscar a sus presas en el agua.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/cocodrilodeaguasalada.jpg" alt="Cocodrilo de Agua Salada">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>9️⃣COCODRILO DE AGUA SALADA</h3>
            <div class="speed-stat">7 m</div>
            <p><strong>Categoría:</strong> Acuático/Terrestre (reptil)</p>
            <p><strong>Hábitat:</strong> Estuarios y manglares del Indo-Pacífico</p>
            <p>El reptil más grande del mundo, capaz de nadar en mar abierto y emboscar presas con gran fuerza.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/Jirafa.jpg" alt="Jirafa">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>🔟JIRAFA</h3>
            <div class="speed-stat">6 m</div>
            <p><strong>Categoría:</strong> Terrestre (mamífero)</p>
            <p><strong>Hábitat:</strong> Sabana africana</p>
            <p>El animal terrestre más alto, gracias a su cuello extremadamente largo que le permite alcanzar hojas altas.</p>
        </div>
    </div>


</div>

                
                <div class="speed-facts">
                    <h2>🌟 DATOS CURIOSOS</h2>
                        <div class="facts-comparison">
        <div class="comparison-item">
            <h4>Adaptaci{on</h4>
            <p>Las orejas del elefante funcionan como radiadores naturales para regular la temperatura corporal.</p>
        </div>
        <div class="comparison-item">
            <h4>Corazón Gigante</h4>
            <p>El corazón de una ballena azul pesa hasta 180 kg, como un piano pequeño</p>
        </div>
        <div class="comparison-item">
            <h4>Gigante Escondido</h4>
            <p>Vive en profundidades extremas, por lo que rara vez se observa vivo.</p>
        </div>
    </div>
                </div>
            </div>
        `;
                break;

            case 'pequeño':
                pageContent = `
            <div class="page-content">
                <div class="stats-page-header">
                    <h1>🏃‍♂️ LOS MÁS PEQUEÑOS</h1>
                    <p>Descubre a los pequeños gigantes que desafían la naturaleza</p>
                </div>
                
                <div class="speed-champions">
                    <div class="champion-card gold">
                        <div class="champion-image">
                            <img src="img/RanaPaedophryneamauensis.jpg" alt="RANA PAEDOPHRYNE AMAUENSIS">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>🥇RANA PAEDOPHRYNE AMAUENSIS</h3>
                                <div class="size-stat">7,7 mm</div>
                                <p><strong>Categoría:</strong> Anfibio</p>
                                <p><strong>Hábitat:</strong> Papúa Nueva Guinea</p>
                                <p>Considerada el vertebrado más pequeño del mundo, esta diminuta rana puede sentarse cómodamente en la cabeza de un alfiler.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card silver">
                        <div class="champion-image">
                            <img src="img/PAEDOCYPRISPROGENETICA.jpg" alt="PAEDOCYPRIS PROGENETICA">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>🥈PAEDOCYPRIS PROGENETICA</h3>
                                <div class="size-stat">7,9 mm</div>
                                <p><strong>Categoría:</strong> Pez</p>
                                <p><strong>Hábitat:</strong> Sumatra, Indonesia</p>
                                <p>Este pez habita en aguas turbias y ácidas, siendo uno de los peces más pequeños y más ligeros del mundo.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card bronze">
                        <div class="champion-image">
                            <img src="img/BROOKESIANANA.jpg" alt="BROOKESIA NANA">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>🥉BROOKESIA NANA</h3>
                                <div class="size-stat">13,5 mm</div>
                                <p><strong>Categoría:</strong> Reptil</p>
                                <p><strong>Hábitat:</strong> Madagascar</p>
                                <p>Este diminuto camaleón puede posarse en la punta de un dedo y es uno de los reptiles más pequeños conocidos.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/MURCIÉLAGONARIZDECERDODEKITTI.jpg" alt="MURCIÉLAGO NARIZ DE CERDO DE KITTI">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>4️⃣MURCIÉLAGO NARIZ DE CERDO DE KITTI</h3>
                                <div class="size-stat">29-33 mm</div>
                                <p><strong>Categoría:</strong> Mamífero</p>
                                <p><strong>Hábitat:</strong> Tailandia y Birmania</p>
                                <p>El mamífero más pequeño del mundo en tamaño, con un peso similar al de una moneda pequeña.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/MUSARAÑAETRUSCA.jpg" alt="MUSARAÑA ETRUSCA">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>5️⃣MUSARAÑA ETRUSCA</h3>
                                <div class="size-stat">35-50 mm</div>
                                <p><strong>Categoría:</strong> Mamífero</p>
                                <p><strong>Hábitat:</strong> Europa, África y Asia</p>
                                <p>Uno de los mamíferos más ligeros, su metabolismo es extremadamente rápido, lo que la obliga a comer constantemente.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/TARSEROFILIPINO.jpg" alt="TARSERO FILIPINO">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>6️⃣TARSERO FILIPINO</h3>
                                <div class="size-stat">85-160 mm</div>
                                <p><strong>Categoría:</strong> Mamífero</p>
                                <p><strong>Hábitat:</strong> Filipinas</p>
                                <p>Este pequeño primate tiene enormes ojos que le permiten cazar insectos en la oscuridad.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/TITÍPIGMEO.jpg" alt="TITÍ PIGMEO">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>7️⃣TITÍ PIGMEO</h3>
                                <div class="size-stat">117-152 mm</div>
                                <p><strong>Categoría:</strong> Mamífero</p>
                                <p><strong>Hábitat:</strong> Amazonas, Sudamérica</p>
                                <p>Conocido como el mono más pequeño del mundo, pesa menos de 150 gramos.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/LEPTOTYPHLOPSCARLAE.jpg" alt="LEPTOTYPHLOPS CARLAE">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>8️⃣LEPTOTYPHLOPS CARLAE</h3>
                                <div class="size-stat">102 mm</div>
                                <p><strong>Categoría:</strong> Reptil</p>
                                <p><strong>Hábitat:</strong> Barbados</p>
                                <p>Esta diminuta serpiente puede enrollarse sobre una moneda y se alimenta principalmente de larvas de insectos.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/COLIBRÍZUNZUNCITO.jpg" alt="COLIBRÍ ZUNZUNCITO">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>9️⃣COLIBRÍ ZUNZUNCITO</h3>
                                <div class="size-stat">50-61 mm</div>
                                <p><strong>Categoría:</strong> Ave</p>
                                <p><strong>Hábitat:</strong> Cuba</p>
                                <p>El ave más pequeña del mundo, tan ligera que puede mantenerse suspendida en el aire durante mucho tiempo.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/HIPPOCAMPUSDENISE.jpg" alt="HIPPOCAMPUS DENISE">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                                <h3>🔟HIPPOCAMPUS DENISE</h3>
                                <div class="size-stat">16 mm</div>
                                <p><strong>Categoría:</strong> Pez</p>
                                <p><strong>Hábitat:</strong> Océano Pacífico, entre Japón y Papúa Nueva Guinea</p>
                                <p>Este diminuto caballito de mar es tan pequeño que a menudo pasa desapercibido entre los corales.</p>
                        </div>
                    </div>
                </div>
                
                <div class="speed-facts">
                    <h2>🌟 DATOS CURIOSOS</h2>
                   <div class="facts-comparison">
        <div class="comparison-item">
            <h4>Pequeño Pero Veloz</h4>
            <p>El colibrí puede batir sus alas hasta 80 veces por segundo.</p>
        </div>
        <div class="comparison-item">
            <h4>Perfecto Camuflaje</h4>
            <p>La rana dorada brasileña con su pequeñez extrema la hace muy difícil de detectar.</p>
        </div>
        <div class="comparison-item">
            <h4>Padres únicos</h4>
            <p>El caballito de mar pigmeo macho lleva a las crías en una bolsa.</p>
        </div>
    </div>
                </div>
            </div>
        `;
                break;

            case 'sonido':
                pageContent = `
            <div class="page-content">
                <div class="stats-page-header">
                    <h1>🏃‍♂️ LOS MÁS RÁPIDOS</h1>
                    <p>Descubre los récords de velocidad más impresionantes del reino animal</p>
                </div>
                
                <div class="speed-champions">
                    <div class="champion-card gold">
                        <div class="champion-image">
                            <img src="img/HalconPeregrino.jpg" alt="Halcón Peregrino">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥇HALCÓN PEREGRINO</h3>
                            <div class="speed-stat">389 km/h</div>
                            <p><strong>Categoría:</strong> Aéreo (en picada)</p>
                            <p><strong>Hábitat:</strong> Mundial, excepto Antártida</p>
                            <p>El halcón peregrino alcanza velocidades letales durante sus picadas de caza, convirtiéndose en el animal más rápido del planeta.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card silver">
                        <div class="champion-image">
                            <img src="img/AguilaReal.jpg" alt="Guepardo">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥈ÁGUILA REAL</h3>
                            <div class="speed-stat">240 km/h</div>
                            <p><strong>Categoría:</strong> Aéreo (en picada)</p>
                            <p><strong>Hábitat:</strong> América del Norte, Europa, Asia y norte de África</p>
                            <p>Una cazadora formidable que alcanza gran velocidad al lanzarse desde alturas impresionantes para atrapar a sus presas.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card bronze">
                        <div class="champion-image">
                            <img src="img/Guepardo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥉GUEPARDO</h3>
                            <div class="speed-stat">120 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>África y algunas zonas de Irán</p>
                            <p>El felino más veloz del mundo, capaz de acelerar de 0 a 100 km/h en solo 3 segundos, ideal para cazar en distancias cortas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/PezVela.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>4️⃣PEZ VELA</h3>
                            <div class="speed-stat">110 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Océanos tropicales y subtropicales</p>
                            <p>El pez más veloz de los océanos, usa su velocidad para cazar bancos de peces pequeños.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/AntilopeBerrendo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>5️⃣ANTÍLOPE BERRENDO</h3>
                            <div class="speed-stat">100 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> América del Norte</p>
                            <p>Puede mantener altas velocidades por largos periodos, lo que lo convierte en uno de los corredores más resistentes de la naturaleza.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/TiburonMako.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>6️⃣TIBURÓN MAKO</h3>
                            <div class="speed-stat">74 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Océanos templados y tropicales</p>
                            <p>El tiburón más veloz, capaz de saltar fuera del agua mientras caza gracias a su potencia y diseño hidrodinámico.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Avestruz.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>7️⃣AVESTRUZ</h3>
                            <div class="speed-stat">70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>África subsahariana</p>
                            <p>El ave corredora más rápida, utiliza sus largas patas para alcanzar gran velocidad y escapar de depredadores.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Caballo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>8️⃣CABALLO</h3>
                            <div class="speed-stat">70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> Doméstico (criado en todo el mundo)</p>
                            <p>Criado para la velocidad, este caballo es capaz de alcanzar gran potencia y resistencia en carreras cortas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/GacelaDeThommpson.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>9️⃣GACELA DE THOMSON</h3>
                            <div class="speed-stat">65-70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> África oriental</p>
                            <p>Combina velocidad y agilidad, utilizando giros rápidos para evadir a depredadores como guepardos y leones.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/LoboGris.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🔟 LOBO GRIS</h3>
                            <div class="speed-stat">65 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>América del Norte, Europa, Asia y Medio Oriente</p>
                            <p>Caza en manada y alcanza altas velocidades durante persecuciones, aunque solo por distancias cortas.</p>
                        </div>
                    </div>
                </div>
                
                <div class="speed-facts">
                    <h2>🌟 DATOS CURIOSOS</h2>
                   <div class="facts-comparison">
        <div class="comparison-item">
            <h4>Comunicación Oceánica</h4>
            <p>Las ballenas azules producen sonidos de 188 decibelios que viajan cientos de kilómetros</p>
        </div>
        <div class="comparison-item">
            <h4>Rugido Territorial</h4>
            <p>El rugido de un león puede escucharse hasta 8 kilómetros de distancia</p>
        </div>
        <div class="comparison-item">
            <h4>Mono Más Ruidoso</h4>
            <p>Los monos aulladores pueden escucharse a 5 km de distancia en la selva</p>
        </div>
    </div>
            </div>
        `;
                break;

            case 'fuerza':
                pageContent = `
            <div class="page-content">
                <div class="stats-page-header">
                    <h1>🏃‍♂️ LOS MÁS FUERTES</h1>
                    <p>Descubre la fuerza descomunal de estos increíbles animales</p>
                </div>
                
                <div class="strength-champions">

        <div class="champion-card gold">
        <div class="champion-image">
            <img src="img/escarabajopelotero.jpg" alt="Escarabajo Pelotero">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>🥉🥇ESCARABAJO PELOTERO</h3>
            <div class="speed-stat">1,100x su peso</div>
            <p><strong>Categoría:</strong> Insecto</p>
            <p><strong>Hábitat:</strong> Praderas y bosques</p>
            <p>Puede empujar bolas de estiércol más de mil veces su peso, usando la Vía Láctea como guía para orientarse.</p>
        </div>
    </div>

    <div class="champion-card silver">
        <div class="champion-image">
            <img src="img/escarabajorinoceronte.jpg" alt="Escarabajo Rinoceronte">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>🥇🥈ESCARABAJO RINOCERONTE</h3>
            <div class="speed-stat">850x su peso</div>
            <p><strong>Categoría:</strong> Insecto</p>
            <p><strong>Hábitat:</strong> Bosques tropicales y subtropicales</p>
            <p>Considerado uno de los animales más fuertes del planeta en relación a su tamaño, puede levantar hasta 850 veces su propio peso.</p>
        </div>
    </div>

    <div class="champion-card bronze">
        <div class="champion-image">
            <img src="img/hormigacortadoradehojas.jpg" alt="Hormiga Cortadora de Hojas">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>🥈🥉HORMIGA CORTADORA DE HOJAS</h3>
            <div class="speed-stat">50x su peso</div>
            <p><strong>Categoría:</strong> Insecto</p>
            <p><strong>Hábitat:</strong> Regiones cálidas de América</p>
            <p>Puede transportar objetos 50 veces más pesados que su cuerpo, mostrando una increíble fuerza para su tamaño.</p>
        </div>
    </div>



    <div class="champion-card">
        <div class="champion-image">
            <img src="img/gorila.jpg" alt="Gorila">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>4️⃣GORILA</h3>
            <div class="speed-stat">2,000 kg</div>
            <p><strong>Categoría:</strong> Mamífero terrestre</p>
            <p><strong>Hábitat:</strong> Selvas tropicales de África</p>
            <p>Su increíble fuerza proviene de sus brazos y torso, pudiendo levantar hasta 10 veces su peso corporal.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/elefanteafricano.jpg" alt="Elefante Africano">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>5️⃣ELEFANTE AFRICANO</h3>
            <div class="speed-stat">9,000 kg</div>
            <p><strong>Categoría:</strong> Mamífero terrestre</p>
            <p><strong>Hábitat:</strong> África subsahariana</p>
            <p>El animal con mayor fuerza bruta, capaz de derribar árboles y mover cargas extremadamente pesadas.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/anaconda.jpg" alt="Anaconda Verde">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>6️⃣ANACONDA VERDE</h3>
            <div class="speed-stat">90 psi</div>
            <p><strong>Categoría:</strong> Reptil</p>
            <p><strong>Hábitat:</strong> Pantanos y ríos de Sudamérica</p>
            <p>Su constricción ejerce una presión letal, suficiente para asfixiar y tragar presas muy grandes enteras.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/aguilacalva.jpg" alt="Águila Calva">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>7️⃣ÁGUILA CALVA</h3>
            <div class="speed-stat">10x fuerza humana</div>
            <p><strong>Categoría:</strong> Ave</p>
            <p><strong>Hábitat:</strong> América del Norte</p>
            <p>Sus garras ejercen una fuerza diez veces superior a la de un humano, capaz de levantar presas casi de su tamaño en vuelo.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/osogrizzly.jpg" alt="Oso Grizzly">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>8️⃣OSO GRIZZLY</h3>
            <div class="speed-stat">500 kg</div>
            <p><strong>Categoría:</strong> Mamífero terrestre</p>
            <p><strong>Hábitat:</strong> América del Norte</p>
            <p>Puede mover objetos de gran peso y defenderse con fuerza bruta, además de correr a gran velocidad.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/bueyalmizclero.jpg" alt="Buey Almizclero">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>9️⃣BUEY ALMIZCLERO</h3>
            <div class="speed-stat">400 kg</div>
            <p><strong>Categoría:</strong> Mamífero terrestre</p>
            <p><strong>Hábitat:</strong> Regiones árticas</p>
            <p>Sus embestidas son tan poderosas que sus choques de cabeza pueden escucharse a kilómetros de distancia.</p>
        </div>
    </div>

    <div class="champion-card">
        <div class="champion-image">
            <img src="img/CangrejoCocotero.jpg" alt="Cangrejo Cocotero">
        </div>
        <div class="champion-info">
            <div class="medal"></div>
            <h3>🔟CANGREJO COCOTERO</h3>
            <div class="speed-stat">3,300 N</div>
            <p><strong>Categoría:</strong> Crustáceo</p>
            <p><strong>Hábitat:</strong> Islas tropicales del Índico y Pacífico</p>
            <p>Sus pinzas ejercen una fuerza impresionante, siendo el artrópodo terrestre más fuerte del mundo.</p>
        </div>
    </div>
</div>

                
                <div class="speed-facts">
                    <h2>🌟 DATOS CURIOSOS</h2>
                    <div class="facts-comparison">
        <div class="comparison-item">
            <h4>Fuerza Relativa</h4>
            <p>El escarabajo rinoceronte puede levantar 850 veces su propio peso corporal</p>
        </div>
        <div class="comparison-item">
            <h4>Poder Primate</h4>
            <p>Un gorila adulto es aproximadamente 10 veces más fuerte que un humano promedio</p>
        </div>
        <div class="comparison-item">
            <h4>Carga Impresionante</h4>
            <p>Las hormigas pueden cargar objetos de 10-50 veces su peso corporal</p>
        </div>
    </div>
                </div>
            </div>
        `;
                break;

            case 'mordida':
                pageContent = `
            <div class="page-content">
                <div class="stats-page-header">
                    <h1>🏃‍♂️ LOS MÁS RÁPIDOS</h1>
                    <p>Descubre los récords de velocidad más impresionantes del reino animal</p>
                </div>
                
                <div class="speed-champions">
                    <div class="champion-card gold">
                        <div class="champion-image">
                            <img src="img/HalconPeregrino.jpg" alt="Halcón Peregrino">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥇HALCÓN PEREGRINO</h3>
                            <div class="speed-stat">389 km/h</div>
                            <p><strong>Categoría:</strong> Aéreo (en picada)</p>
                            <p><strong>Hábitat:</strong> Mundial, excepto Antártida</p>
                            <p>El halcón peregrino alcanza velocidades letales durante sus picadas de caza, convirtiéndose en el animal más rápido del planeta.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card silver">
                        <div class="champion-image">
                            <img src="img/AguilaReal.jpg" alt="Guepardo">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥈ÁGUILA REAL</h3>
                            <div class="speed-stat">240 km/h</div>
                            <p><strong>Categoría:</strong> Aéreo (en picada)</p>
                            <p><strong>Hábitat:</strong> América del Norte, Europa, Asia y norte de África</p>
                            <p>Una cazadora formidable que alcanza gran velocidad al lanzarse desde alturas impresionantes para atrapar a sus presas.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card bronze">
                        <div class="champion-image">
                            <img src="img/Guepardo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥉GUEPARDO</h3>
                            <div class="speed-stat">120 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>África y algunas zonas de Irán</p>
                            <p>El felino más veloz del mundo, capaz de acelerar de 0 a 100 km/h en solo 3 segundos, ideal para cazar en distancias cortas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/PezVela.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>4️⃣PEZ VELA</h3>
                            <div class="speed-stat">110 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Océanos tropicales y subtropicales</p>
                            <p>El pez más veloz de los océanos, usa su velocidad para cazar bancos de peces pequeños.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/AntilopeBerrendo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>5️⃣ANTÍLOPE BERRENDO</h3>
                            <div class="speed-stat">100 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> América del Norte</p>
                            <p>Puede mantener altas velocidades por largos periodos, lo que lo convierte en uno de los corredores más resistentes de la naturaleza.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/TiburonMako.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>6️⃣TIBURÓN MAKO</h3>
                            <div class="speed-stat">74 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Océanos templados y tropicales</p>
                            <p>El tiburón más veloz, capaz de saltar fuera del agua mientras caza gracias a su potencia y diseño hidrodinámico.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Avestruz.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>7️⃣AVESTRUZ</h3>
                            <div class="speed-stat">70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>África subsahariana</p>
                            <p>El ave corredora más rápida, utiliza sus largas patas para alcanzar gran velocidad y escapar de depredadores.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Caballo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>8️⃣CABALLO</h3>
                            <div class="speed-stat">70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> Doméstico (criado en todo el mundo)</p>
                            <p>Criado para la velocidad, este caballo es capaz de alcanzar gran potencia y resistencia en carreras cortas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/GacelaDeThommpson.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>9️⃣GACELA DE THOMSON</h3>
                            <div class="speed-stat">65-70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> África oriental</p>
                            <p>Combina velocidad y agilidad, utilizando giros rápidos para evadir a depredadores como guepardos y leones.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/LoboGris.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🔟 LOBO GRIS</h3>
                            <div class="speed-stat">65 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>América del Norte, Europa, Asia y Medio Oriente</p>
                            <p>Caza en manada y alcanza altas velocidades durante persecuciones, aunque solo por distancias cortas.</p>
                        </div>
                    </div>
                </div>
                
                <div class="speed-facts">
                    <h2>🌟 DATOS CURIOSOS</h2>
                   <div class="facts-comparison">
        <div class="comparison-item">
            <h4>Presión Extrema</h4>
            <p>El cocodrilo de agua salada tiene una mordida de hasta 3,700 PSI</p>
        </div>
        <div class="comparison-item">
            <h4>Dientes Renovables</h4>
            <p>Los tiburones pueden reemplazar hasta 300 dientes por vez a lo largo de su vida</p>
        </div>
        <div class="comparison-item">
            <h4>Contraste Muscular</h4>
            <p>Los cocodrilos tienen músculos muy fuertes para cerrar la mandíbula pero muy débiles para abrirla</p>
        </div>
    </div>
                </div>
            </div>
        `;
                break;

            case 'inteligencia':
                pageContent = `
            <div class="page-content">
                <div class="stats-page-header">
                    <h1>🏃‍♂️ LOS MÁS RÁPIDOS</h1>
                    <p>Descubre los récords de velocidad más impresionantes del reino animal</p>
                </div>
                
                <div class="speed-champions">
                    <div class="champion-card gold">
                        <div class="champion-image">
                            <img src="img/HalconPeregrino.jpg" alt="Halcón Peregrino">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥇HALCÓN PEREGRINO</h3>
                            <div class="speed-stat">389 km/h</div>
                            <p><strong>Categoría:</strong> Aéreo (en picada)</p>
                            <p><strong>Hábitat:</strong> Mundial, excepto Antártida</p>
                            <p>El halcón peregrino alcanza velocidades letales durante sus picadas de caza, convirtiéndose en el animal más rápido del planeta.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card silver">
                        <div class="champion-image">
                            <img src="img/AguilaReal.jpg" alt="Guepardo">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥈ÁGUILA REAL</h3>
                            <div class="speed-stat">240 km/h</div>
                            <p><strong>Categoría:</strong> Aéreo (en picada)</p>
                            <p><strong>Hábitat:</strong> América del Norte, Europa, Asia y norte de África</p>
                            <p>Una cazadora formidable que alcanza gran velocidad al lanzarse desde alturas impresionantes para atrapar a sus presas.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card bronze">
                        <div class="champion-image">
                            <img src="img/Guepardo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥉GUEPARDO</h3>
                            <div class="speed-stat">120 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>África y algunas zonas de Irán</p>
                            <p>El felino más veloz del mundo, capaz de acelerar de 0 a 100 km/h en solo 3 segundos, ideal para cazar en distancias cortas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/PezVela.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>4️⃣PEZ VELA</h3>
                            <div class="speed-stat">110 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Océanos tropicales y subtropicales</p>
                            <p>El pez más veloz de los océanos, usa su velocidad para cazar bancos de peces pequeños.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/AntilopeBerrendo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>5️⃣ANTÍLOPE BERRENDO</h3>
                            <div class="speed-stat">100 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> América del Norte</p>
                            <p>Puede mantener altas velocidades por largos periodos, lo que lo convierte en uno de los corredores más resistentes de la naturaleza.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/TiburonMako.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>6️⃣TIBURÓN MAKO</h3>
                            <div class="speed-stat">74 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Océanos templados y tropicales</p>
                            <p>El tiburón más veloz, capaz de saltar fuera del agua mientras caza gracias a su potencia y diseño hidrodinámico.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Avestruz.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>7️⃣AVESTRUZ</h3>
                            <div class="speed-stat">70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>África subsahariana</p>
                            <p>El ave corredora más rápida, utiliza sus largas patas para alcanzar gran velocidad y escapar de depredadores.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Caballo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>8️⃣CABALLO</h3>
                            <div class="speed-stat">70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> Doméstico (criado en todo el mundo)</p>
                            <p>Criado para la velocidad, este caballo es capaz de alcanzar gran potencia y resistencia en carreras cortas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/GacelaDeThommpson.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>9️⃣GACELA DE THOMSON</h3>
                            <div class="speed-stat">65-70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> África oriental</p>
                            <p>Combina velocidad y agilidad, utilizando giros rápidos para evadir a depredadores como guepardos y leones.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/LoboGris.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🔟 LOBO GRIS</h3>
                            <div class="speed-stat">65 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>América del Norte, Europa, Asia y Medio Oriente</p>
                            <p>Caza en manada y alcanza altas velocidades durante persecuciones, aunque solo por distancias cortas.</p>
                        </div>
                    </div>
                </div>
                
                <div class="speed-facts">
                    <h2>🌟 DATOS CURIOSOS</h2>
                    <div class="facts-comparison">
        <div class="comparison-item">
            <h4>Uso de Herramientas</h4>
            <p>Los cuervos fabrican y usan herramientas para obtener alimento</p>
        </div>
        <div class="comparison-item">
            <h4>Memoria Extraordinaria</h4>
            <p>Los elefantes pueden recordar rutas migratorias e individuos después de décadas</p>
        </div>
        <div class="comparison-item">
            <h4>Autoconciencia</h4>
            <p>Los delfines se reconocen a sí mismos en espejos, demostrando autoconciencia</p>
        </div>
    </div>
                </div>
            </div>
        `;
                break;

            case 'longevidad':
                pageContent = `
            <div class="page-content">
                <div class="stats-page-header">
                    <h1>🏃‍♂️ LOS MÁS RÁPIDOS</h1>
                    <p>Descubre los récords de velocidad más impresionantes del reino animal</p>
                </div>
                
                <div class="speed-champions">
                    <div class="champion-card gold">
                        <div class="champion-image">
                            <img src="img/HalconPeregrino.jpg" alt="Halcón Peregrino">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥇HALCÓN PEREGRINO</h3>
                            <div class="speed-stat">389 km/h</div>
                            <p><strong>Categoría:</strong> Aéreo (en picada)</p>
                            <p><strong>Hábitat:</strong> Mundial, excepto Antártida</p>
                            <p>El halcón peregrino alcanza velocidades letales durante sus picadas de caza, convirtiéndose en el animal más rápido del planeta.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card silver">
                        <div class="champion-image">
                            <img src="img/AguilaReal.jpg" alt="Guepardo">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥈ÁGUILA REAL</h3>
                            <div class="speed-stat">240 km/h</div>
                            <p><strong>Categoría:</strong> Aéreo (en picada)</p>
                            <p><strong>Hábitat:</strong> América del Norte, Europa, Asia y norte de África</p>
                            <p>Una cazadora formidable que alcanza gran velocidad al lanzarse desde alturas impresionantes para atrapar a sus presas.</p>
                        </div>
                    </div>
                    
                    <div class="champion-card bronze">
                        <div class="champion-image">
                            <img src="img/Guepardo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🥉GUEPARDO</h3>
                            <div class="speed-stat">120 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>África y algunas zonas de Irán</p>
                            <p>El felino más veloz del mundo, capaz de acelerar de 0 a 100 km/h en solo 3 segundos, ideal para cazar en distancias cortas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/PezVela.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>4️⃣PEZ VELA</h3>
                            <div class="speed-stat">110 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Océanos tropicales y subtropicales</p>
                            <p>El pez más veloz de los océanos, usa su velocidad para cazar bancos de peces pequeños.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/AntilopeBerrendo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>5️⃣ANTÍLOPE BERRENDO</h3>
                            <div class="speed-stat">100 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> América del Norte</p>
                            <p>Puede mantener altas velocidades por largos periodos, lo que lo convierte en uno de los corredores más resistentes de la naturaleza.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/TiburonMako.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>6️⃣TIBURÓN MAKO</h3>
                            <div class="speed-stat">74 km/h</div>
                            <p><strong>Categoría:</strong> Acuático</p>
                            <p><strong>Hábitat:</strong> Océanos templados y tropicales</p>
                            <p>El tiburón más veloz, capaz de saltar fuera del agua mientras caza gracias a su potencia y diseño hidrodinámico.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Avestruz.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>7️⃣AVESTRUZ</h3>
                            <div class="speed-stat">70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>África subsahariana</p>
                            <p>El ave corredora más rápida, utiliza sus largas patas para alcanzar gran velocidad y escapar de depredadores.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/Caballo.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>8️⃣CABALLO</h3>
                            <div class="speed-stat">70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> Doméstico (criado en todo el mundo)</p>
                            <p>Criado para la velocidad, este caballo es capaz de alcanzar gran potencia y resistencia en carreras cortas.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/GacelaDeThommpson.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>9️⃣GACELA DE THOMSON</h3>
                            <div class="speed-stat">65-70 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong> África oriental</p>
                            <p>Combina velocidad y agilidad, utilizando giros rápidos para evadir a depredadores como guepardos y leones.</p>
                        </div>
                    </div>
                     <div class="champion-card">
                        <div class="champion-image">
                            <img src="img/LoboGris.jpg" alt="Pez Vela">
                        </div>
                        <div class="champion-info">
                            <div class="medal"></div>
                            <h3>🔟 LOBO GRIS</h3>
                            <div class="speed-stat">65 km/h</div>
                            <p><strong>Categoría:</strong> Terrestre</p>
                            <p><strong>Hábitat:</strong>América del Norte, Europa, Asia y Medio Oriente</p>
                            <p>Caza en manada y alcanza altas velocidades durante persecuciones, aunque solo por distancias cortas.</p>
                        </div>
                    </div>
                </div>
                
                <div class="speed-facts">
                    <h2>🌟 DATOS CURIOSOS</h2>
                     <div class="facts-comparison">
        <div class="comparison-item">
            <h4>Récord de Longevidad</h4>
            <p>Los tiburones de Groenlandia pueden vivir más de 400 años según estudios de carbono-14</p>
        </div>
        <div class="comparison-item">
            <h4>Gigante Centenario</h4>
            <p>Las tortugas gigantes de Galápagos pueden vivir más de 150 años</p>
        </div>
        <div class="comparison-item">
            <h4>Mamífero Longevo</h4>
            <p>Las ballenas boreales pueden vivir más de 200 años, siendo los mamíferos más longevos</p>
        </div>
    </div>
                </div>
            </div>
        `;
                break;

            default:
                pageContent = `<div class="page-content"><h1>Página no encontrada</h1></div>`;
                break;





        }

        // Crear nueva página
        const newPage = document.createElement('section');
        newPage.id = `stats-${statType}`;
        newPage.className = 'category-page stats-page';
        newPage.innerHTML = pageContent;

        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentElement('afterend', newPage);
        }
    }

    // Configurar botones "LEER MÁS"
    function setupStatsButtons() {
        const statsButtons = document.querySelectorAll('.read-more-btn');

        statsButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const statType = btn.getAttribute('data-stat');
                if (statType) {
                    showStatsPage(statType);
                }
            });
        });
    }

    setupStatsButtons();

const logoText = document.querySelector('.logo-text');
const footerLogo = document.querySelector('.logo-img');

if (logoText) {
    logoText.addEventListener('click', () => {
        location.reload();
    });
    
    // Añadir cursor pointer para indicar que es clickeable
    logoText.style.cursor = 'pointer';
}

if (footerLogo) {
    footerLogo.addEventListener('click', () => {
        location.reload();
    });
    
    // Añadir cursor pointer
    footerLogo.style.cursor = 'pointer';
}











});