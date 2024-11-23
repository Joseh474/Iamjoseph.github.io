document.addEventListener('DOMContentLoaded', function() {
    // Core variables
    const header = document.querySelector("header");
    const menuIcon = document.querySelector('#menu-icon');
    const navlist = document.querySelector('.navlist');
    const toggle = document.querySelector(".toggle");
    const body = document.querySelector("body");
    const scrollTopBtn = document.getElementById('scroll-top');

    // Menu Toggle Functionality
    if (menuIcon) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navlist.classList.toggle('open');
        };
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuIcon && !menuIcon.contains(e.target) && !navlist.contains(e.target)) {
            navlist.classList.remove('open');
            menuIcon.classList.remove('bx-x');
        }
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }
    });

    // Dark Mode Toggle
    if (toggle) {
        let getMode = localStorage.getItem("mode");
        if (getMode && getMode === "dark") {
            body.classList.add("dark");
            toggle.classList.add("active");
        }

        toggle.addEventListener("click", () => {
            body.classList.toggle("dark");
            toggle.classList.toggle("active");
            
            localStorage.setItem("mode", body.classList.contains("dark") ? "dark" : "light");
        });
    }

    // Scroll to Top functionality
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'block';
                scrollTopBtn.style.opacity = '1';
            } else {
                scrollTopBtn.style.opacity = '0';
                setTimeout(() => {
                    scrollTopBtn.style.display = 'none';
                }, 300);
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize ScrollReveal if it exists
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2000,
            delay: 400,
            reset: true
        });

        // Add scroll reveal animations
        sr.reveal('.slide', { origin: 'top' });
        sr.reveal('.home-text', { origin: 'left' });
        sr.reveal('.about-img', { origin: 'left' });
        sr.reveal('.about-text', { origin: 'right' });
        sr.reveal('.services-content', { origin: 'bottom' });
        sr.reveal('.portfolio-content', { origin: 'bottom' });
        sr.reveal('.contact-text', { origin: 'left' });
        sr.reveal('.contact-form', { origin: 'right' });
    }

    // Form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Input sanitization
            const sanitizeInput = (input) => {
                return input.replace(/<[^>]*>/g, '').trim();
            };

            const name = sanitizeInput(this.querySelector('input[type="name"]').value);
            const email = sanitizeInput(this.querySelector('input[type="email"]').value);
            const message = sanitizeInput(this.querySelector('textarea').value);

            // Validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Success
            showNotification('Message sent successfully!', 'success');
            this.reset();
        });
    }

    // Custom Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Page Load Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'page-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Image Lazy Loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));

    // Enhanced Scroll Reveal
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2000,
            delay: 400,
            reset: true,
            mobile: true,
            viewFactor: 0.2
        });

        // Add more detailed reveal animations
        sr.reveal('.slide', { origin: 'top', interval: 200 });
        sr.reveal('.home-text h1', { origin: 'left', delay: 200 });
        sr.reveal('.home-text h3', { origin: 'right', delay: 400 });
        sr.reveal('.home-text p', { origin: 'bottom', delay: 600 });
        sr.reveal('.button-group', { origin: 'bottom', delay: 800 });
        sr.reveal('.social-icons', { origin: 'left', delay: 1000, interval: 200 });
    }

    // Session Storage for Form Data
    const saveFormData = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('input', (e) => {
                const formData = new FormData(form);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                sessionStorage.setItem('formData', JSON.stringify(data));
            });
        });
    };

    // Security Headers Check
    const checkSecurityHeaders = () => {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "default-src 'self'; img-src 'self' https:; script-src 'self' https:; style-src 'self' https:;";
        document.head.appendChild(meta);
    };

    // Enhanced Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Page Visit Counter
    const incrementPageVisits = () => {
        let visits = localStorage.getItem('pageVisits') || 0;
        visits = parseInt(visits) + 1;
        localStorage.setItem('pageVisits', visits);
        if (visits === 1) {
            showNotification('Welcome to my portfolio!', 'info');
        } else {
            showNotification(`Welcome back! Visit #${visits}`, 'info');
        }
    };

    // Initialize all new functionalities
    saveFormData();
    checkSecurityHeaders();
    incrementPageVisits();

    // Service box click functionality for mobile
    if (window.innerWidth <= 550) {
        const serviceBoxes = document.querySelectorAll('.services-content .box');
        
        serviceBoxes.forEach(box => {
            box.addEventListener('click', function(e) {
                // If box is already expanded, collapse it
                if (this.classList.contains('expanded')) {
                    this.classList.remove('expanded');
                    return;
                }
                
                // Collapse all other boxes
                serviceBoxes.forEach(otherBox => {
                    otherBox.classList.remove('expanded');
                });
                
                // Expand clicked box
                this.classList.add('expanded');
                
                // Scroll expanded box into view
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            });
        });
    }

    // Create particles
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 15 + 5) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Initialize particles on load
    window.addEventListener('load', createParticles);

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add parallax effect to shapes
    window.addEventListener('scroll', () => {
        const shapes = document.querySelectorAll('.shape');
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Read More functionality
    const serviceBoxes = document.querySelectorAll('.services-content .box');
    
    serviceBoxes.forEach(box => {
        const readBtn = box.querySelector('.read');
        
        if (readBtn) {
            readBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle expanded class
                box.classList.toggle('expanded');
                
                // Smooth scroll to box if it's expanded
                if (box.classList.contains('expanded')) {
                    box.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center'
                    });
                }
                
                // Close other boxes
                serviceBoxes.forEach(otherBox => {
                    if (otherBox !== box && otherBox.classList.contains('expanded')) {
                        otherBox.classList.remove('expanded');
                    }
                });
            });
        }
    });

    // Popup functionality
    const popup = document.querySelector('.popup-overlay');
    const popupClose = document.querySelector('.popup-close');
    const popupTitle = document.querySelector('.popup-title');
    const popupBody = document.querySelector('.popup-body');
    
    // Close popup when clicking the close button
    if (popupClose) {
        popupClose.addEventListener('click', () => {
            popup.classList.remove('active');
        });
    }

    // Close popup when clicking outside
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    }

    // Handle Read More buttons
    const readMoreButtons = document.querySelectorAll('.read');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const box = this.closest('.box');
            const title = box.querySelector('h3').textContent;
            const content = box.querySelector('.additional-content').innerHTML;
            
            // Update popup content
            popupTitle.textContent = title;
            popupBody.innerHTML = content;
            
            // Show popup
            popup.classList.add('active');
        });
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
        }
    });
});
