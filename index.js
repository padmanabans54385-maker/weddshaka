/**
 * Professional Wedding Invitation JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup Intersection Observer for scroll animations
    setupScrollReveal();

    // 2. Setup Sticky Navbar logic
    setupStickyNav();

    // 3. Start countdown timer
    startCountdown();
});

function setupScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Reveal hero instantly
    setTimeout(() => {
        const heroElems = document.querySelectorAll('#hero .fade-in');
        heroElems.forEach(el => el.classList.add('visible'));
    }, 150);
}

function setupStickyNav() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        // Add a background to the nav when scrolled
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function startCountdown() {
    // Define the wedding date
    const weddingDate = new Date("April 30, 2026 10:30:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const countdownElement = document.getElementById("countdown");
        if (!countdownElement) return;

        if (distance < 0) {
            countdownElement.innerHTML = "<h3 style='font-family: var(--font-heading); font-size: 2.5rem; color: var(--gold-light);'>Just Married!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Safely update DOM
        const dEl = document.getElementById("days");
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (dEl) dEl.innerText = days.toString().padStart(2, '0');
        if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
        if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
        if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
}