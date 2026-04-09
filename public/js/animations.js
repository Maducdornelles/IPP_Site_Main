// --- 1. SELEÇÃO DE TODOS OS ELEMENTOS QUE SERÃO ANIMADOS ---
const elementsToAnimate = document.querySelectorAll(
    '.hero h1, .hero p, .hero .btn, ' + 
    '.features h2, .card, ' + 
    '.section-header .badge, .section-header h2, .section-header p, .doctor-card'
);

// Prepara os elementos
elementsToAnimate.forEach((el, index) => {
    el.classList.add('hidden-element');

    if (el.classList.contains('card') || el.classList.contains('doctor-card')) {
        const delayClass = `delay-${(index % 4) + 1}`;
        el.classList.add(delayClass);
    }
});


// --- 2. CONFIGURAÇÃO DO OBSERVER (Anima apenas de cima para baixo) ---
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // O elemento entrou na tela: ativa a animação
            entry.target.classList.add('animate-active');
        } else {
            // O MÁGICA ESTÁ AQUI:
            // entry.boundingClientRect.top > 0 significa que o elemento 
            // foi empurrado para baixo (fora da tela).
            // Só resetamos a animação se você voltou a rolagem lá pro topo!
            if (entry.boundingClientRect.top > 0) {
                entry.target.classList.remove('animate-active');
            }
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" 
});

elementsToAnimate.forEach(el => {
    animationObserver.observe(el);
});


// --- 3. MENU (HEADER) COM FUNDO NO SCROLL ---
const navbar = document.querySelector('.navbar');

window.addEventListener("scroll", () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.navbar nav a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// --- 4. LÓGICA DE ABRIR/FECHAR CARDS DE MÉDICOS ---
function toggleDoctor(element) {
    const isActive = element.classList.contains('active');
    
    document.querySelectorAll('.doctor-card').forEach(card => {
        card.classList.remove('active');
    });

    if (!isActive) {
        element.classList.add('active');
    }
}

function closeDoctor(event, buttonElement) {
    event.stopPropagation(); 
    const card = buttonElement.closest('.doctor-card');
    card.classList.remove('active');
}