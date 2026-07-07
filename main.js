document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.className = 'ri-close-line';
            } else {
                icon.className = 'ri-menu-3-line';
            }
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.className = 'ri-menu-3-line';
            });
        });
    }

    // 2. Navbar Style Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Active Link Highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Check if user is scrolled into the section (with an offset of half the navbar height)
            if (window.scrollY >= (sectionTop - 90)) {
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

    // 4. Scroll Triggered Fade-In Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // 5. Instagram 피드는 index.html에서 공식 임베드(embed.js)로 렌더링됨

    // 6. Contact Form Processing
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormBtn = document.getElementById('resetFormBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && formSuccess && resetFormBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
 
            // Loading state on button
            const submitText = submitBtn.querySelector('span');
            const originalText = submitText.textContent;
            submitText.textContent = '전송 중...';
            submitBtn.disabled = true;
 
            // EmailJS 실제 전송 서비스 호출
            // serviceID: service_kz6e9v4, templateID: template_9a906yj
            emailjs.sendForm('service_kz6e9v4', 'template_9a906yj', contactForm)
                .then(() => {
                    contactForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                    
                    // Reset loading state
                    submitText.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Scroll to contact form container
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }, (error) => {
                    alert('문의 전송에 실패하였습니다. 다시 시도해 주세요. 에러: ' + JSON.stringify(error));
                    submitText.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
 
        resetFormBtn.addEventListener('click', () => {
            contactForm.reset();
            formSuccess.classList.add('hidden');
            contactForm.classList.remove('hidden');
        });
    }
});
