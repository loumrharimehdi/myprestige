// ===== My Prestige - Luxury Concierge Landing Page =====

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initSmoothScroll();
    initParallaxStars();
    initFormHandler();
});

// ===== Navbar Functionality =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.top = currentScroll > lastScroll ? '-100px' : '20px';
        } else {
            navbar.style.top = '20px';
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile toggle
    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ===== Scroll Reveal Animation =====
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Stagger children animations
                const children = entry.target.querySelectorAll('.service-card, .testimonial-card, .pricing-card, .faq-item, .comparison-card');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 100}ms`;
                    child.classList.add('revealed');
                });

                // Special animation for process steps
                const processSteps = entry.target.querySelectorAll('.process-step');
                processSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('process-revealed');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // Add reveal styles
    const style = document.createElement('style');
    style.textContent = `
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .service-card, .testimonial-card, .pricing-card, .faq-item, .comparison-card {
            opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .service-card.revealed, .testimonial-card.revealed, 
        .pricing-card.revealed, .faq-item.revealed, .comparison-card.revealed {
            opacity: 1; transform: translateY(0);
        }
        
        /* Premium Process Step Animations */
        .process-step {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
            transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .process-step.process-revealed {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        
        /* Counter animation for step numbers */
        .process-step.process-revealed .step-number {
            animation: countUp 0.8s ease-out forwards;
        }
        @keyframes countUp {
            0% { opacity: 0; transform: scale(0.5) translateY(20px); }
            50% { opacity: 0.7; transform: scale(1.2) translateY(-5px); }
            100% { opacity: 0.7; transform: scale(1) translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ===== Parallax Floating Stars =====
function initParallaxStars() {
    const stars = document.querySelectorAll('.float-star');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        stars.forEach((star, index) => {
            const speed = 0.1 + (index * 0.05);
            star.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
        });
    }, { passive: true });
}

// ===== Cursor Glow Effect (Optional - Desktop Only) =====
if (window.innerWidth > 1024) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
        .cursor-glow {
            position: fixed; width: 400px; height: 400px;
            background: radial-gradient(circle, rgba(201, 169, 98, 0.1) 0%, transparent 70%);
            pointer-events: none; z-index: -1; transform: translate(-50%, -50%);
            transition: opacity 0.3s;
        }
    `;
    document.head.appendChild(glowStyle);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// ===== Form Handler =====
function initFormHandler() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        });

        // Log form data (in production, send to server)
        console.log('Form submitted:', data);

        // Show success message
        const formContainer = form.parentElement;
        form.style.display = 'none';

        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-icon">✨</div>
            <h3>Merci pour votre demande !</h3>
            <p>Notre équipe vous recontactera dans les plus brefs délais.<br>
            <strong>Réponse garantie sous 2 heures.</strong></p>
        `;
        formContainer.appendChild(successMessage);

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}


// ===== Console Branding =====
console.log('%c✨ My Prestige', 'color: #C9A962; font-size: 24px; font-weight: bold;');
console.log('%cL\'art de l\'exception au quotidien', 'color: #FAFAFA; font-size: 14px;');
