document.addEventListener('DOMContentLoaded', () => {
    initMatrixEffect();
    initScrollAnimations();
    initGlitchText();
    initParallax();
});

// Matrix Rain Effect
function initMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters - binary + some special chars
    const chars = '010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array for drops - one per column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        // Translucent background to show trail
        ctx.fillStyle = 'rgba(10, 5, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            // Random color: Blue or Green
            const isGreen = Math.random() > 0.5;
            ctx.fillStyle = isGreen ? '#00ff9d' : '#00f0ff';
            
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Send drop back to top randomly after it has crossed screen
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    setInterval(draw, 33);
}

// Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('[data-scroll]');
    animatedElements.forEach(el => observer.observe(el));
}

// Text Glitch Effect (Random character replacement)
function initGlitchText() {
    const glitchTargets = document.querySelectorAll('.glitch-hover');
    
    glitchTargets.forEach(target => {
        const originalText = target.innerText;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        
        target.addEventListener('mouseover', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                target.innerText = target.innerText.split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                }
                
                iterations += 1 / 3;
            }, 30);
        });
    });
}

// Simple Parallax
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        // Only apply if hero is visible
        if (scrollValue < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollValue * 0.5}px)`;
        }
    });
}
