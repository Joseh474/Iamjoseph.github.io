document.addEventListener('DOMContentLoaded', function() {
    // Core variables
    const header = document.querySelector("header");
    const menuIcon = document.querySelector('#menu-icon');
    const navlist = document.querySelector('.navlist');
    const navLinks = document.querySelectorAll('.navlist a');
    const toggle = document.querySelector(".toggle");
    const body = document.querySelector("body");

    // Menu Toggle Functionality
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navlist.classList.toggle('open');
    };

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuIcon.contains(e.target) && !navlist.contains(e.target)) {
            navlist.classList.remove('open');
            menuIcon.classList.remove('bx-x');
        }
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 100);
    });

    // Active Navigation Link
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth Scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                navlist.classList.remove('open');
                menuIcon.classList.remove('bx-x');
                
                // Smooth scroll
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dark Mode Toggle with Local Storage
    let getMode = localStorage.getItem("mode");
    if (getMode && getMode === "dark") {
        body.classList.add("dark");
        toggle.classList.add("active");
    }

    toggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        toggle.classList.toggle("active");
        
        // Save mode to local storage
        if (!body.classList.contains("dark")) {
            localStorage.setItem("mode", "light");
        } else {
            localStorage.setItem("mode", "dark");
        }
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top');
    
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

    // Form Validation and Submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[type="name"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            
            if (!name.value || !email.value || !message.value) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                alert('Please enter a valid email address');
                return;
            }

            // Show success message
            alert('Message sent successfully!');
            this.reset();
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // Add hover effect to service boxes
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'translateY(-10px)';
        });
        
        box.addEventListener('mouseleave', () => {
            box.style.transform = 'translateY(0)';
        });
    });

    // Initialize ScrollReveal with updated configuration
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 300,
        reset: true,  // This ensures animations play every time element becomes visible
        useDelay: 'always',
        viewFactor: 0.2,  // Element needs to be 20% in view to trigger animation
        viewOffset: {
            top: 50,
            right: 0,
            bottom: 50,
            left: 0
        }
    });

    // Home section reveals
    sr.reveal('.slide', { 
        origin: 'left',
        interval: 200
    });
    sr.reveal('.home-text h1', { delay: 200 });
    sr.reveal('.home-text h3', { delay: 300 });
    sr.reveal('.home-text p', { delay: 400 });
    sr.reveal('.button-group', { 
        origin: 'bottom',
        delay: 500 
    });
    sr.reveal('.social-icons', { 
        origin: 'bottom',
        delay: 600,
        interval: 100
    });

    // About section reveals
    sr.reveal('.about-img', { 
        origin: 'left',
        viewFactor: 0.5
    });
    sr.reveal('.about-text', { 
        origin: 'right',
        viewFactor: 0.5
    });

    // Services section reveals
    sr.reveal('.main-text', { 
        viewFactor: 0.3
    });
    sr.reveal('.services-content .box', { 
        origin: 'bottom',
        interval: 200,
        viewFactor: 0.3
    });

    // Portfolio section reveals
    sr.reveal('.portfolio-content .row', {
        origin: 'bottom',
        interval: 200,
        viewFactor: 0.3
    });

    // Contact section reveals
    sr.reveal('.contact-text', { 
        origin: 'left',
        viewFactor: 0.3
    });
    sr.reveal('.contact-form', { 
        origin: 'right',
        viewFactor: 0.3
    });

    // Footer section reveals
    sr.reveal('.footer-section', {
        origin: 'bottom',
        interval: 200,
        viewFactor: 0.2
    });

    // Animated shape reveal
    sr.reveal('.animated-shape', {
        origin: 'right',
        duration: 2000,
        viewFactor: 0.5
    });

    // Navigation items reveal
    sr.reveal('.navlist li', {
        origin: 'top',
        interval: 100,
        viewFactor: 0.2
    });
});
