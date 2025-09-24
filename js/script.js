// Loading Animation
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 800);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Animation Observer
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in');
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
}

// Particle System (simplified)
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        if (document.querySelectorAll('.particle').length < 5) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = '15s';
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 15000);
        }
    }
    
    setInterval(createParticle, 3000);
}

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Enhanced Tech Orb Interactions
function initTechOrbs() {
    const techOrbs = document.querySelectorAll('.tech-orb');
    
    techOrbs.forEach(orb => {
        orb.addEventListener('mouseenter', () => {
            orb.style.animationPlayState = 'paused';
        });
        
        orb.addEventListener('mouseleave', () => {
            orb.style.animationPlayState = 'running';
        });
        
        orb.addEventListener('click', () => {
            orb.style.animation = 'orbPulse 0.6s ease';
            setTimeout(() => {
                orb.style.animation = 'float-orb 6s ease-in-out infinite';
            }, 600);
        });
    });
}

// Parallax Effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .tech-showcase::before, .about::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Mouse Trail Effect (simplified)
function initMouseTrail() {
    let isThrottled = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!isThrottled) {
            const trailElement = document.createElement('div');
            trailElement.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: rgba(102, 126, 234, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                trailElement.style.opacity = '0';
                setTimeout(() => {
                    if (trailElement.parentNode) {
                        trailElement.remove();
                    }
                }, 300);
            }, 50);
            
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, 50);
        }
    });
}

// Enhanced Tech showcase progress bars animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            const width = parseInt(progressBar.getAttribute('data-width'));
            
            // Animate progress bar with counter
            let currentWidth = 0;
            const increment = width / 50;
            
            const animateProgress = () => {
                if (currentWidth < width) {
                    currentWidth += increment;
                    progressBar.style.width = Math.min(currentWidth, width) + '%';
                    requestAnimationFrame(animateProgress);
                } else {
                    progressBar.style.width = width + '%';
                }
            };
            
            setTimeout(() => {
                animateProgress();
            }, 200);
        }
    });
}, observerOptions);

// Enhanced Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(index, direction = 'next') {
    const currentActiveSlide = document.querySelector('.slide.active');
    
    if (currentActiveSlide) {
        currentActiveSlide.classList.add('exiting');
        setTimeout(() => {
            currentActiveSlide.classList.remove('active', 'exiting');
        }, 250);
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    setTimeout(() => {
        slides[index].classList.add('active', 'entering');
        dots[index].classList.add('active');
        
        setTimeout(() => {
            slides[index].classList.remove('entering');
        }, 500);
    }, 250);
}

function nextSlide() {
    const prevSlide = currentSlide;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide, 'next');
}

function prevSlide() {
    const prevSlide = currentSlide;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide, 'prev');
}

// Auto-advance slides with pause on hover
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

startSlideShow();

// Pause on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlideShow);
    sliderContainer.addEventListener('mouseleave', startSlideShow);
}

// Dot navigation with animation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index !== currentSlide) {
            currentSlide = index;
            showSlide(currentSlide);
        }
    });
    
    dot.addEventListener('mouseenter', () => {
        dot.style.transform = 'scale(1.3)';
    });
    
    dot.addEventListener('mouseleave', () => {
        if (!dot.classList.contains('active')) {
            dot.style.transform = 'scale(1)';
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Enhanced Service modal functionality
const serviceCards = document.querySelectorAll('.service-card');
const modal = document.getElementById('serviceModal');
const closeBtn = document.querySelector('.close');

// Add click sound effect (optional)
function playClickSound() {
    // You can add audio here if needed
    // const audio = new Audio('path/to/click-sound.mp3');
    // audio.play();
}

const serviceData = {
    'digitalization': {
        title: 'Digital Transformation',
        icon: 'fas fa-digital-tachograph',
        description: 'Complete digital transformation solutions to modernize your business processes and enhance operational efficiency.',
        features: ['Process Automation', 'Digital Workflows', 'Legacy System Migration', 'Digital Strategy Consulting'],
        benefits: ['Increased Efficiency', 'Cost Reduction', 'Better Customer Experience', 'Competitive Advantage']
    },
    'ai-automation': {
        title: 'AI & Automation',
        icon: 'fas fa-robot',
        description: 'Intelligent automation powered by artificial intelligence to streamline operations and reduce manual work.',
        features: ['Machine Learning Models', 'Robotic Process Automation', 'Intelligent Document Processing', 'Predictive Analytics'],
        benefits: ['24/7 Operations', 'Error Reduction', 'Scalable Solutions', 'Data-Driven Insights']
    },
    'blockchain': {
        title: 'Blockchain Solutions',
        icon: 'fas fa-link',
        description: 'Secure, transparent, and decentralized blockchain solutions for modern business challenges.',
        features: ['Smart Contracts', 'Cryptocurrency Integration', 'Supply Chain Tracking', 'Identity Verification'],
        benefits: ['Enhanced Security', 'Transparency', 'Reduced Costs', 'Trust & Verification']
    },
    'cloud': {
        title: 'Cloud Solutions',
        icon: 'fas fa-cloud',
        description: 'Scalable cloud infrastructure and migration services for improved performance and cost efficiency.',
        features: ['Cloud Migration', 'Multi-Cloud Strategy', 'Serverless Computing', 'Cloud Security'],
        benefits: ['Scalability', 'Cost Optimization', 'Global Accessibility', 'Disaster Recovery']
    },
    'iot': {
        title: 'Internet of Things',
        icon: 'fas fa-network-wired',
        description: 'Connected device ecosystems that enable smart operations and real-time monitoring.',
        features: ['Sensor Networks', 'Real-time Monitoring', 'Edge Computing', 'Data Analytics'],
        benefits: ['Operational Insights', 'Predictive Maintenance', 'Energy Efficiency', 'Remote Control']
    },
    'ml': {
        title: 'Machine Learning',
        icon: 'fas fa-brain',
        description: 'Advanced machine learning solutions that turn your data into actionable insights and predictions.',
        features: ['Predictive Models', 'Natural Language Processing', 'Computer Vision', 'Recommendation Systems'],
        benefits: ['Better Decisions', 'Pattern Recognition', 'Automated Insights', 'Personalization']
    },
    'testing': {
        title: 'Quality Assurance',
        icon: 'fas fa-bug',
        description: 'Comprehensive testing services to ensure your software meets the highest quality standards.',
        features: ['Automated Testing', 'Performance Testing', 'Security Testing', 'Mobile Testing'],
        benefits: ['Bug-Free Software', 'Faster Releases', 'User Satisfaction', 'Risk Mitigation']
    }
};

serviceCards.forEach(card => {
    // Add hover sound effect
    card.addEventListener('mouseenter', () => {
        card.style.cursor = 'pointer';
    });
    
    card.addEventListener('click', () => {
        playClickSound();
        const service = card.getAttribute('data-service');
        const data = serviceData[service];
        
        if (data) {
            // Animate modal appearance
            modal.style.display = 'block';
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.transform = 'scale(0.7) translateY(-50px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s ease';
                modalContent.style.transform = 'scale(1) translateY(0)';
                modalContent.style.opacity = '1';
            }, 10);
            
            document.querySelector('.modal-title').textContent = data.title;
            document.querySelector('.modal-icon').innerHTML = `<i class="${data.icon}"></i>`;
            document.querySelector('.modal-description').textContent = data.description;
            
            const featureList = document.querySelector('.feature-list');
            featureList.innerHTML = data.features.map((feature, index) => 
                `<li style="animation-delay: ${index * 0.1}s" class="fade-in">${feature}</li>`
            ).join('');
            
            const benefitList = document.querySelector('.benefit-list');
            benefitList.innerHTML = data.benefits.map((benefit, index) => 
                `<li style="animation-delay: ${index * 0.1}s" class="fade-in">${benefit}</li>`
            ).join('');
            
            // Trigger animations for list items
            setTimeout(() => {
                modal.querySelectorAll('.fade-in').forEach(item => {
                    item.classList.add('visible');
                });
            }, 100);
        }
    });
});

function closeModal() {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transition = 'all 0.3s ease';
    modalContent.style.transform = 'scale(0.7) translateY(-50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.style.transform = '';
        modalContent.style.opacity = '';
        modalContent.style.transition = '';
    }, 300);
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add scroll animation
            const startPosition = window.pageYOffset;
            const targetPosition = target.offsetTop - 80;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
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
            
            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// Enhanced Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Enhanced Form submission with animations
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Add focus animations to form inputs
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
        
        // Real-time validation feedback
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.style.borderColor = '#10b981';
                input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
            } else {
                input.style.borderColor = '#ef4444';
                input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            }
        });
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animate submit button
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Show success animation
            const successMessage = document.createElement('div');
            successMessage.innerHTML = '✓ Thank you! We\'ll get back to you soon.';
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                font-weight: 600;
                z-index: 10000;
                animation: successPop 0.5s ease forwards;
            `;
            
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.style.animation = 'successPop 0.5s ease reverse';
                setTimeout(() => {
                    successMessage.remove();
                    contactForm.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    
                    // Reset input styles
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    });
                }, 500);
            }, 2000);
        }, 1500);
    });
}

// Add success animation keyframes
const successStyle = document.createElement('style');
successStyle.textContent = `
    @keyframes successPop {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(successStyle);

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        progressObserver.observe(card);
    });
    
    initScrollAnimations();
    initTechOrbs();
    // initParallax();
    // initMouseTrail();
    // createParticles();
    
    // Add stagger classes to elements
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('fade-in', `stagger-${(index % 8) + 1}`);
    });
    
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
        card.classList.add('scale-in', `stagger-${(index % 8) + 1}`);
    });
    
    const careerCards = document.querySelectorAll('.career-card');
    careerCards.forEach((card, index) => {
        card.classList.add('slide-in-left', `stagger-${(index % 3) + 1}`);
    });
    
    // Add typing animation to hero title (simplified)
    const heroTitle = document.querySelector('.title-main');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease';
            heroTitle.style.opacity = '1';
        }, 1000);
    }
    
    // Animate counters when they come into view
    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    animateCounter(target, number);
                }
                statObserver.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });
    
    // Add glitch effect to logo
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.classList.add('glitch');
        logo.setAttribute('data-text', logo.textContent);
    }
    
    // Add morphing background to hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('morphing-bg');
    }
});