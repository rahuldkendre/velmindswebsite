// Minimal script to prevent reloading issues

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Basic slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slides
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Service modal functionality
const serviceCards = document.querySelectorAll('.service-card');
const modal = document.getElementById('serviceModal');
const closeBtn = document.querySelector('.close');

const serviceData = {
    'digitalization': {
        title: 'Digital Transformation',
        icon: 'fas fa-digital-tachograph',
        description: 'Complete digital transformation solutions to modernize your business processes.',
        features: ['Process Automation', 'Digital Workflows', 'Legacy System Migration'],
        benefits: ['Increased Efficiency', 'Cost Reduction', 'Better Customer Experience']
    },
    'ai-automation': {
        title: 'AI & Automation',
        icon: 'fas fa-robot',
        description: 'Intelligent automation powered by artificial intelligence.',
        features: ['Machine Learning Models', 'Robotic Process Automation', 'Predictive Analytics'],
        benefits: ['24/7 Operations', 'Error Reduction', 'Scalable Solutions']
    },
    'blockchain': {
        title: 'Blockchain Solutions',
        icon: 'fas fa-link',
        description: 'Secure, transparent, and decentralized blockchain solutions.',
        features: ['Smart Contracts', 'Cryptocurrency Integration', 'Supply Chain Tracking'],
        benefits: ['Enhanced Security', 'Transparency', 'Reduced Costs']
    },
    'cloud': {
        title: 'Cloud Solutions',
        icon: 'fas fa-cloud',
        description: 'Scalable cloud infrastructure and migration services.',
        features: ['Cloud Migration', 'Multi-Cloud Strategy', 'Serverless Computing'],
        benefits: ['Scalability', 'Cost Optimization', 'Global Accessibility']
    },
    'iot': {
        title: 'Internet of Things',
        icon: 'fas fa-network-wired',
        description: 'Connected device ecosystems for smart operations.',
        features: ['Sensor Networks', 'Real-time Monitoring', 'Edge Computing'],
        benefits: ['Operational Insights', 'Predictive Maintenance', 'Energy Efficiency']
    },
    'ml': {
        title: 'Machine Learning',
        icon: 'fas fa-brain',
        description: 'Advanced machine learning solutions for actionable insights.',
        features: ['Predictive Models', 'Natural Language Processing', 'Computer Vision'],
        benefits: ['Better Decisions', 'Pattern Recognition', 'Automated Insights']
    },
    'testing': {
        title: 'Quality Assurance',
        icon: 'fas fa-bug',
        description: 'Comprehensive testing services for software quality.',
        features: ['Automated Testing', 'Performance Testing', 'Security Testing'],
        benefits: ['Bug-Free Software', 'Faster Releases', 'User Satisfaction']
    }
};

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const service = card.getAttribute('data-service');
        const data = serviceData[service];
        
        if (data && modal) {
            modal.style.display = 'block';
            
            const modalTitle = document.querySelector('.modal-title');
            const modalIcon = document.querySelector('.modal-icon');
            const modalDescription = document.querySelector('.modal-description');
            const featureList = document.querySelector('.feature-list');
            const benefitList = document.querySelector('.benefit-list');
            
            if (modalTitle) modalTitle.textContent = data.title;
            if (modalIcon) modalIcon.innerHTML = `<i class="${data.icon}"></i>`;
            if (modalDescription) modalDescription.textContent = data.description;
            if (featureList) featureList.innerHTML = data.features.map(feature => `<li>${feature}</li>`).join('');
            if (benefitList) benefitList.innerHTML = data.benefits.map(benefit => `<li>${benefit}</li>`).join('');
        }
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}