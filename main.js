// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Navigation buttons
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideNumber = document.getElementById('slideNumber');

// Language functionality
let currentLanguage = localStorage.getItem('selectedLanguage') || 'is';

// Update text content based on current language
function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    const t = translations[lang];
    
    // Update navigation buttons
    prevBtn.textContent = t.prevBtn;
    nextBtn.textContent = t.nextBtn;
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
    
    // Set text direction for RTL languages (Arabic and Persian)
    if (lang === 'ar' || lang === 'fa') {
        document.body.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', lang);
    } else {
        document.body.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }
    
    // Update language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = lang;
    }
}

// Show the current slide
function showSlide(n) {
    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Wrap around if needed
    if (n >= totalSlides) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = n;
    }
    
    // Show the current slide
    slides[currentSlide].classList.add('active');
    
    // Update slide number
    slideNumber.textContent = `${currentSlide + 1} / ${totalSlides}`;
}

// Navigate to next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Navigate to previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Language selector event listener
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            updateLanguage(e.target.value);
        });
    }
    
    // Initialize language
    updateLanguage(currentLanguage);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Initialize
showSlide(currentSlide);