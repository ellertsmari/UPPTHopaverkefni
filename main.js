// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Navigation buttons
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideNumber = document.getElementById('slideNumber');

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