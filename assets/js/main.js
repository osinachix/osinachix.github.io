// ===== SMOOTH SCROLLING =====
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            window.location.href = targetId;
        }
    });
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== FADE IN ANIMATIONS =====
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.domain-card, .project-card, .achievement').forEach(el => {
        observer.observe(el);
    });
}

// ===== ENHANCED CONTACT FORM HANDLING =====
function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message
            alert(`Thank you, ${data.name}! Your message has been sent. I will respond within 24-48 hours.`);
            
            // Reset form
            this.reset();
            
            // In a real implementation, you would send data to a server here
            // Example: 
            // fetch('/api/contact', { 
            //     method: 'POST', 
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data) 
            // })
        });
    }
}

// ===== TYPING EFFECT FOR HERO TEXT =====
function typeWriter(element, text, speed = 50) {
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

// ===== DOWNLOAD BUTTON ENHANCEMENT =====
function enhanceDownloadButtons() {
    document.querySelectorAll('a[download]').forEach(button => {
        button.addEventListener('click', function(e) {
            // You can add download tracking here if needed
            console.log('CV downloaded:', this.getAttribute('download'));
        });
    });
}

// ===== INITIALIZE EVERYTHING WHEN PAGE LOADS =====
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    observeElements();
    handleContactForm();
    enhanceDownloadButtons();
    
    // Initialize typing effect on hero section
    if (document.querySelector('.hero h2')) {
        const heroText = "Pioneering Trustworthy AI Systems";
        typeWriter(document.querySelector('.hero h2'), heroText);
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== WINDOW LOAD EVENT FOR ADDITIONAL INITIALIZATION =====
window.addEventListener('load', function() {
    // Additional initialization after all resources are loaded
    console.log('Portfolio website loaded successfully');
});
