// --- 1. SELEÇÃO DE ELEMENTOS PARA ANIMAÇÃO ---
const elementsToAnimate = document.querySelectorAll(
    '.hero h1, .hero p, .hero .btn, ' + 
    '.features h2, .card, ' + 
    '.section-header .badge, .section-header h2, .section-header p, .doctor-card'
);

elementsToAnimate.forEach((el, index) => {
    el.classList.add('hidden-element');
    if (el.classList.contains('card') || el.classList.contains('doctor-card')) {
        const delayClass = `delay-${(index % 4) + 1}`;
        el.classList.add(delayClass);
    }
});

// --- 2. CONFIGURAÇÃO DO OBSERVER ---
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-active');
        } else {
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

// --- 3. MENU (HEADER) E MONITORAMENTO DE SCROLL ---
const navbar = document.querySelector('.navbar');

window.addEventListener("scroll", () => {
    // Lógica da classe Scrolled para o fundo do menu
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Lógica do Link Ativo (Home, Profissionais, etc)
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

    // REMOVIDO: A lógica que fechava os cards ao rolar foi excluída daqui.
});

// --- 4. LÓGICA DE ABRIR/FECHAR CARDS DE MÉDICOS ---
function toggleDoctor(element) {
    const isActive = element.classList.contains('active');
    
    // Fecha outros cards abertos para não sobrepor
    document.querySelectorAll('.doctor-card').forEach(card => {
        card.classList.remove('active');
    });

    if (!isActive) {
        element.classList.add('active');
    }
}

function closeDoctor(event, buttonElement) {
    // Impede que o clique no "X" dispare o toggle do card pai
    event.stopPropagation(); 
    const card = buttonElement.closest('.doctor-card');
    card.classList.remove('active');
}

// FECHA AO CLICAR EM QUALQUER OUTRA PARTE DA TELA (FORA DO CARD)
document.addEventListener('click', (event) => {
    // Verifica se o clique foi fora do card do médico
    const isClickInsideCard = event.target.closest('.doctor-card');
    
    if (!isClickInsideCard) {
        document.querySelectorAll('.doctor-card.active').forEach(card => {
            card.classList.remove('active');
        });
    }
});