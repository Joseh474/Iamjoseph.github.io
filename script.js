document.addEventListener('DOMContentLoaded', function() {
    // Core variables
    const header = document.querySelector("header");
    const menuIcon = document.querySelector('#menu-icon');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.navlist a');
    const body = document.querySelector('body');

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    body.appendChild(overlay);

    // Menu toggle functionality
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navWrapper.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    // Close menu when clicking overlay
    overlay.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navWrapper.classList.remove('active');
        overlay.classList.remove('active');
    };

    // Smooth scrolling and active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                navWrapper.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            }
        });
    });

    // Sticky header and active section highlighting
    window.addEventListener('scroll', () => {
        header.classList.toggle("sticky", window.scrollY > 100);
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Read More functionality
    document.querySelectorAll('.read').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const content = this.nextElementSibling;
            if (content.style.display === 'none' || !content.style.display) {
                content.style.display = 'block';
                this.textContent = 'Read Less';
            } else {
                content.style.display = 'none';
                this.textContent = 'Read More';
            }
        });
    });

    // Dark mode toggle
    const toggle = document.querySelector(".toggle");
    
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

    // Loader
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }, 1500);
        });
    }

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize EmailJS if form exists
    const contactForm = document.getElementById('JosephMwanzia');
    if (contactForm) {
        emailjs.init("t5JAZ9JAYxaX_sDVO");
        
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                from_mobile: document.getElementById('mobile').value,
                message: document.getElementById('message').value
            };

            emailjs.send('service_10rcju9', 'template_fyf6y5a', templateParams)
                .then(() => alert('Message sent successfully!'))
                .catch(() => alert('Failed to send message. Please try again later.'));
        });
    }

    // Initialize ScrollReveal with base configuration
    const sr = ScrollReveal({
        distance: '60px',
        duration: 2000,
        delay: 400,
        reset: true,
        mobile: true,
        useDelay: 'onload',
        viewFactor: 0.2
    });

    // Home section reveals
    sr.reveal('.slide', { 
        origin: 'top',
        distance: '20px',
        duration: 1000
    });

    sr.reveal('.typing-h1', { 
        origin: 'left',
        delay: 500,
        duration: 1500
    });

    sr.reveal('.typing-h3', {
        origin: 'right',
        delay: 700,
        duration: 1500
    });

    sr.reveal('.animate-text', {
        origin: 'bottom',
        delay: 900,
        duration: 1500
    });

    sr.reveal('.button-group', {
        origin: 'bottom',
        delay: 1100,
        duration: 1500
    });

    sr.reveal('.social-icons', {
        origin: 'left',
        delay: 1300,
        duration: 1500,
        interval: 200
    });

    // About section reveals
    sr.reveal('.about-img', {
        origin: 'left',
        duration: 1500,
        distance: '100px'
    });

    sr.reveal('.about-text', {
        origin: 'right',
        duration: 1500,
        distance: '100px'
    });

    // Services section reveals
    sr.reveal('.main-text', {
        origin: 'top',
        duration: 1500
    });

    sr.reveal('.services-content .box', {
        origin: 'bottom',
        duration: 1500,
        interval: 200
    });

    // Portfolio section reveals
    sr.reveal('.portfolio-content .row', {
        origin: 'bottom',
        duration: 1500,
        interval: 200
    });

    // Contact section reveals
    sr.reveal('.contact-text', {
        origin: 'left',
        duration: 1500
    });

    sr.reveal('.contact-form', {
        origin: 'right',
        duration: 1500
    });

    // Footer reveals
    sr.reveal('.footer-section', {
        origin: 'bottom',
        duration: 1500,
        interval: 200
    });

    // Add smooth transition for dark mode toggle
    document.querySelector('.toggle').addEventListener('click', () => {
        document.body.style.transition = 'background 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
});
