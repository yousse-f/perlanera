document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    function revealOnScroll() {
        const elements = document.querySelectorAll('.value-item, .gallery-item, .contact-item');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }

    // Run once on page load
    revealOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Header scroll effect
    function headerScroll() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(11, 11, 11, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(11, 11, 11, 0.9)';
            header.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', headerScroll);

    // Gold shimmer effect on hover for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .submit-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Create a radial gradient based on mouse position
            button.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--gold-light) 0%, var(--gold) 50%, var(--gold-hover) 100%)`;
        });
        
        button.addEventListener('mouseleave', function() {
            // Reset to original gradient
            button.style.background = 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)';
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For this demo, we'll just show a success message
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Grazie per il tuo messaggio! Ti contatteremo presto.';
            successMessage.style.color = 'var(--gold)';
            successMessage.style.padding = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.style.animation = 'fadeIn 0.5s forwards';
            
            // Replace form with success message
            contactForm.parentNode.replaceChild(successMessage, contactForm);
        });
    }
});
