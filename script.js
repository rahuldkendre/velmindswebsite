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

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Tech items hover effect
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.service || !data.message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Hero buttons functionality
document.querySelector('.btn-primary').addEventListener('click', () => {
    document.querySelector('#services').scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelector('.btn-secondary').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Edge Tech Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Service Modal
const serviceData = {
    'digitalization': {
        title: 'Digitalization',
        icon: 'fas fa-digital-tachograph',
        description: 'Transform your traditional business processes into efficient digital workflows. Our comprehensive digitalization solutions help organizations modernize operations, improve efficiency, and stay competitive in the digital age.',
        features: [
            'Process Automation & Workflow Optimization',
            'Digital Document Management Systems',
            'Legacy System Modernization',
            'Digital Twin Implementation',
            'Business Process Re-engineering'
        ],
        benefits: [
            'Reduced operational costs by up to 40%',
            'Improved process efficiency and speed',
            'Enhanced data accuracy and accessibility',
            'Better compliance and audit trails',
            'Scalable digital infrastructure'
        ]
    },
    'ai-automation': {
        title: 'AI & Automation',
        icon: 'fas fa-robot',
        description: 'Harness the power of artificial intelligence to automate complex tasks, enhance decision-making, and create intelligent systems that adapt and learn from data patterns.',
        features: [
            'Intelligent Process Automation (IPA)',
            'Machine Learning Model Development',
            'Natural Language Processing Solutions',
            'Computer Vision Applications',
            'Robotic Process Automation (RPA)'
        ],
        benefits: [
            '70% reduction in manual processing time',
            'Improved accuracy and consistency',
            '24/7 automated operations capability',
            'Enhanced customer experience',
            'Data-driven intelligent insights'
        ]
    },
    'blockchain': {
        title: 'Blockchain',
        icon: 'fas fa-link',
        description: 'Implement secure, transparent, and decentralized solutions using blockchain technology. Create trust, eliminate intermediaries, and ensure data integrity across your business ecosystem.',
        features: [
            'Smart Contract Development',
            'Cryptocurrency Integration',
            'Supply Chain Transparency',
            'Digital Identity Management',
            'Decentralized Application (DApp) Development'
        ],
        benefits: [
            'Enhanced security and data integrity',
            'Reduced transaction costs',
            'Improved transparency and traceability',
            'Elimination of intermediaries',
            'Global accessibility and trust'
        ]
    },
    'cloud': {
        title: 'Cloud Solutions',
        icon: 'fas fa-cloud',
        description: 'Migrate to the cloud with confidence using our comprehensive cloud services. From strategy to implementation, we ensure scalable, secure, and cost-effective cloud infrastructure.',
        features: [
            'Multi-Cloud Architecture Design',
            'Cloud Migration & Modernization',
            'Serverless Computing Solutions',
            'Container Orchestration (Kubernetes)',
            'Cloud Security & Compliance'
        ],
        benefits: [
            'Up to 60% reduction in IT infrastructure costs',
            'Improved scalability and flexibility',
            'Enhanced disaster recovery capabilities',
            'Global accessibility and collaboration',
            'Automatic updates and maintenance'
        ]
    },
    'iot': {
        title: 'Internet of Things (IoT)',
        icon: 'fas fa-network-wired',
        description: 'Connect and optimize your physical assets with intelligent IoT solutions. Create smart environments that collect, analyze, and act on real-time data from connected devices.',
        features: [
            'IoT Device Integration & Management',
            'Real-time Data Analytics',
            'Edge Computing Implementation',
            'Sensor Network Design',
            'IoT Security & Device Management'
        ],
        benefits: [
            'Real-time operational visibility',
            'Predictive maintenance capabilities',
            'Energy efficiency optimization',
            'Enhanced safety and monitoring',
            'Data-driven decision making'
        ]
    },
    'ml': {
        title: 'Machine Learning',
        icon: 'fas fa-brain',
        description: 'Unlock the value of your data with advanced machine learning algorithms. Build predictive models, automate insights, and create intelligent systems that improve over time.',
        features: [
            'Predictive Analytics & Forecasting',
            'Deep Learning Model Development',
            'Recommendation Systems',
            'Anomaly Detection & Fraud Prevention',
            'MLOps & Model Deployment'
        ],
        benefits: [
            'Improved prediction accuracy up to 95%',
            'Automated pattern recognition',
            'Enhanced customer personalization',
            'Risk reduction and fraud prevention',
            'Continuous learning and improvement'
        ]
    },
    'testing': {
        title: 'Testing Services',
        icon: 'fas fa-bug',
        description: 'Ensure software quality and reliability with our comprehensive testing services. From automated testing to performance optimization, we guarantee robust and secure applications.',
        features: [
            'Automated Testing Frameworks',
            'Performance & Load Testing',
            'Security & Penetration Testing',
            'API & Integration Testing',
            'Mobile & Cross-platform Testing'
        ],
        benefits: [
            '90% reduction in critical bugs',
            'Faster time-to-market',
            'Improved user experience',
            'Enhanced security posture',
            'Reduced maintenance costs'
        ]
    }
};

const modal = document.getElementById('serviceModal');
const closeBtn = document.querySelector('.close');

// Service card hover handlers
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const service = card.getAttribute('data-service');
        const data = serviceData[service];
        
        if (data) {
            // Update modal content
            document.querySelector('.modal-icon').innerHTML = `<i class="${data.icon}"></i>`;
            document.querySelector('.modal-title').textContent = data.title;
            document.querySelector('.modal-description').textContent = data.description;
            
            // Update features list
            const featureList = document.querySelector('.feature-list');
            featureList.innerHTML = data.features.map(feature => `<li>${feature}</li>`).join('');
            
            // Update benefits list
            const benefitList = document.querySelector('.benefit-list');
            benefitList.innerHTML = data.benefits.map(benefit => `<li>${benefit}</li>`).join('');
            
            // Show modal
            modal.style.display = 'block';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        modal.style.display = 'none';
    });
});

// Close modal on hover out
modal.addEventListener('mouseenter', () => {
    modal.style.display = 'block';
});

modal.addEventListener('mouseleave', () => {
    modal.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});