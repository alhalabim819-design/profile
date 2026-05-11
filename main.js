// Portfolio Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

function filterPortfolio(filterValue) {
    portfolioItems.forEach(item => {
        if (item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
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

// Start with no items shown (per user request)
portfolioItems.forEach(item => {
    item.style.display = 'none';
    item.style.opacity = '0';
});
// Remove initial active state from buttons if you want it to be truly empty
// filterButtons.forEach(b => b.classList.remove('active'));

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

function reveal() {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Run once on load

// Eye Blink Animation
const blinkLayer = document.getElementById('blinkLayer');

// Blink animation removed in favor of cinematic effects

// Smooth Scroll for Nav Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Professional mouse parallax for hero image
const profileContainer = document.querySelector('.profile-container');
if (profileContainer) {
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 60; // Much subtler rotation
        const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
        profileContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset transform on mouse leave
    document.addEventListener('mouseleave', () => {
        profileContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}

// Image Lightbox Logic
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('fullImage');
const closeModal = document.querySelector('.close-modal');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        modal.style.display = 'block';
        modalImg.src = img.src;
        document.body.style.overflow = 'hidden'; 
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Typewriter Effect for Hero Name
const heroName = document.getElementById('heroName');
const nameText = "محمد سهيل الحلبي";
let charIndex = 0;

function typeName() {
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
