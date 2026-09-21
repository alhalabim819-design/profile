// Mobile Navigation Toggle Logic
const mobileNavToggle = document.getElementById('mobileNavToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMobileNav() {
    if (mobileNavToggle && navLinks && navOverlay) {
        mobileNavToggle.classList.add('active');
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileNav() {
    if (mobileNavToggle && navLinks && navOverlay) {
        mobileNavToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navLinks.classList.contains('active')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
}

// Portfolio Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

function filterPortfolio(filterValue) {
    portfolioItems.forEach(item => {
        if (item.getAttribute('data-category') === filterValue) {
            item.style.display = 'flex';
            setTimeout(() => item.style.opacity = '1', 10);
        } else {
            item.style.opacity = '0';
            item.style.display = 'none';
        }
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        filterPortfolio(filterValue);
    });
});

// Start with no items shown (per initial setup)
portfolioItems.forEach(item => {
    item.style.display = 'none';
    item.style.opacity = '0';
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

function reveal() {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Run once on load

// Smooth Scroll for Nav Links (Closing mobile menu on click)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        closeMobileNav();
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight || 70;
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Mouse parallax for hero image (Desktop only)
const profileContainer = document.querySelector('.profile-container');
if (profileContainer && window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
        profileContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        profileContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}

// Image Lightbox Modal Logic
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('fullImage');
const closeModal = document.querySelector('.close-modal');

if (modal && modalImg) {
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                modal.style.display = 'flex';
                modalImg.src = img.src;
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            if (!navLinks || !navLinks.classList.contains('active')) {
                document.body.style.overflow = 'auto';
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            if (!navLinks || !navLinks.classList.contains('active')) {
                document.body.style.overflow = 'auto';
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            closeMobileNav();
        }
    });
}

// Typewriter Effect for Hero Name
const heroName = document.getElementById('heroName');
const nameText = "محمد سهيل الحلبي";
let charIndex = 0;

function typeName() {
    if (!heroName) return;
    heroName.classList.add('typing');
    if (charIndex < nameText.length) {
        heroName.textContent += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeName, 150);
    } else {
        setTimeout(() => {
            heroName.classList.remove('typing');
            heroName.style.borderLeft = "none";
        }, 1000);
    }
}

// Start typing after a short delay
window.addEventListener('load', () => {
    setTimeout(typeName, 500);
});
