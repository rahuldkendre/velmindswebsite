// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Tech showcase progress bars animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            const width = progressBar.getAttribute('data-width');
            setTimeout(() => {
                progressBar.style.width = width + '%';
            }, 200);
        }
    });
}, observerOptions);

// Observe all tech cards
document.addEventListener('DOMContentLoaded', () => {
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        progressObserver.observe(card);
    });
});

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slides
setInterval(nextSlide, 5000);

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
    card.addEventListener('click', () => {
        const service = card.getAttribute('data-service');
        const data = serviceData[service];
        
        if (data) {
            document.querySelector('.modal-title').textContent = data.title;
            document.querySelector('.modal-icon').innerHTML = `<i class="${data.icon}"></i>`;
            document.querySelector('.modal-description').textContent = data.description;
            
            const featureList = document.querySelector('.feature-list');
            featureList.innerHTML = data.features.map(feature => `<li>${feature}</li>`).join('');
            
            const benefitList = document.querySelector('.benefit-list');
            benefitList.innerHTML = data.benefits.map(benefit => `<li>${benefit}</li>`).join('');
            
            modal.style.display = 'block';
        }
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Smooth scrolling for navigation links
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

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
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