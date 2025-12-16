// ===== My Prestige - Luxury Concierge Landing Page =====

document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initNavbar();
    initScrollReveal();
    initSmoothScroll();
    initParallaxStars();
    initFormHandler();
    initWhatsAppWidget();
    initCustomCursor();
});

// ===== Page Loader =====
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
        }, 2000);
    });

    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loader.classList.add('loaded');
        }, 2000);
    }
}

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

// ===== WhatsApp Chat Widget =====
function initWhatsAppWidget() {
    const toggle = document.getElementById('whatsappToggle');
    const bubble = document.getElementById('chatBubble');
    const close = document.getElementById('chatClose');
    const input = document.getElementById('chatInput');
    const send = document.getElementById('chatSend');
    const badge = document.querySelector('.wa-badge');

    const phoneNumber = '33749612724';

    toggle?.addEventListener('click', () => {
        bubble.classList.toggle('active');
        if (badge) badge.style.display = 'none';
    });

    close?.addEventListener('click', () => {
        bubble.classList.remove('active');
    });

    function sendToWhatsApp() {
        const message = input.value.trim();
        const text = message || "Bonjour, je souhaite en savoir plus sur vos services.";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        input.value = '';
        bubble.classList.remove('active');
    }

    send?.addEventListener('click', sendToWhatsApp);
    input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendToWhatsApp();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.whatsapp-widget')) {
            bubble?.classList.remove('active');
        }
    });
}

// ===== Custom Cursor =====
function initCustomCursor() {
    // Only on devices with fine pointer (mouse)
    if (window.matchMedia('(pointer: fine)').matches === false) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Animate ring with delay
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .pricing-card, .testimonial-card, input, select, textarea, .faq-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    // Click effect
    document.addEventListener('mousedown', () => ring.classList.add('clicking'));
    document.addEventListener('mouseup', () => ring.classList.remove('clicking'));
}

// ===== Form Handler =====
function initFormHandler() {
    const form = document.getElementById('registrationForm');
    const whatsappBtn = document.getElementById('sendWhatsApp');

    if (!form) return;

    // Send via WhatsApp
    whatsappBtn?.addEventListener('click', () => {
        // Validate form first
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const phoneNumber = '33749612724';

        let message = "🌟 *Nouvelle demande My Prestige*\n\n";
        message += `👤 *Nom:* ${formData.get('firstName')} ${formData.get('lastName')}\n`;
        message += `📧 *Email:* ${formData.get('email')}\n`;
        message += `📱 *Téléphone:* ${formData.get('phone')}\n`;

        if (formData.get('city')) {
            message += `📍 *Ville:* ${formData.get('city')}\n`;
        }
        if (formData.get('formula')) {
            message += `💎 *Formule:* ${formData.get('formula')}\n`;
        }

        // Selected services
        const services = formData.getAll('services');
        if (services.length > 0) {
            message += `\n✨ *Services souhaités:*\n`;
            services.forEach(s => message += `• ${s}\n`);
        }

        if (formData.get('message')) {
            message += `\n💬 *Message:*\n${formData.get('message')}`;
        }

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        // Show success message
        showFormSuccess(form);
    });

    // Email submission - show loading state
    form.addEventListener('submit', function (e) {
        const btn = form.querySelector('.btn-submit');
        const originalContent = btn.innerHTML;
        btn.innerHTML = `
            <svg class="spinner" viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4" stroke-dashoffset="10">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
            <span>Envoi en cours...</span>
        `;
        btn.disabled = true;
    });
}

function showFormSuccess(form) {
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
}

// ===== Console Branding =====
console.log('%c✨ My Prestige', 'color: #C9A962; font-size: 24px; font-weight: bold;');
console.log('%cL\'art de l\'exception au quotidien', 'color: #FAFAFA; font-size: 14px;');
