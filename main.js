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

    // 5. Dynamic Mock Instagram Feed Populate
    const instaGrid = document.getElementById('instaGrid');
    const mockInstaPosts = [
        {
            imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop',
            likes: '1.2K',
            comments: '184',
            caption: 'TOV_BAND | 서울 뮤직 페스티벌 메인 스테이지 대기 중! 🤘 잠시 후 8시에 시작합니다.'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=600&auto=format&fit=crop',
            likes: '954',
            comments: '72',
            caption: '새로운 이펙터 세팅 완료. 🎸 지헌이의 솔로 파트를 한층 더 빛내줄 사운드.'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop',
            likes: '1.4K',
            comments: '232',
            caption: '합정 스튜디오 연습실 현장! 전국 투어 셋리스트 조율 중입니다. 태웅이의 드럼 파트 특훈! 🥁'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1539628390323-d0723793e1f1?q=80&w=600&auto=format&fit=crop',
            likes: '820',
            comments: '43',
            caption: '🎹 지혜의 키보드 레이어링 작업 완료! 이번 신곡 분위기 완전히 달라질 것 같아요.'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop',
            likes: '745',
            comments: '39',
            caption: '🌌 녹음실에서 밤샘 세션. 요한이의 베이스라인이 이번 앨범 가장 핵심이 될 것 같아요!'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600&auto=format&fit=crop',
            likes: '2.1K',
            comments: '411',
            caption: '민지의 떼창 유도에 관객 전체가 하나로! ❤️ 최고의 에너지였습니다. #TovBand #Live'
        }
    ];

    if (instaGrid) {
        mockInstaPosts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'instagram-item fade-in';
            postElement.innerHTML = `
                <img src="${post.imageUrl}" alt="Instagram Post ${index + 1}" loading="lazy">
                <div class="insta-overlay">
                    <div class="insta-stats">
                        <span><i class="ri-heart-fill"></i> ${post.likes}</span>
                        <span><i class="ri-chat-3-fill"></i> ${post.comments}</span>
                    </div>
                    <p class="insta-caption">${post.caption}</p>
                </div>
            `;
            
            // Add click interaction to redirect to actual instagram
            postElement.addEventListener('click', () => {
                window.open('https://instagram.com', '_blank');
            });
            
            instaGrid.appendChild(postElement);
            // Observe the dynamically created elements
            scrollObserver.observe(postElement);
        });
    }

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
