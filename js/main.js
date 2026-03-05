const canvas = document.createElement('canvas');
canvas.id = 'ash-canvas-render';
const ashContainer = document.getElementById('ash-canvas');

if (ashContainer) {
    ashContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    function init() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        for(let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: Math.random() * 0.3 + 0.1,
                size: Math.random() * 1.2,
                color: Math.random() > 0.9 ? '#00f0ff' : '#555'
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if(p.y > height) p.y = -10;
            if(p.x > width) p.x = 0;
            if(p.x < 0) p.x = width;
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', init);
    init();
    draw();

    // Mouse Glow Effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        document.body.style.setProperty('--mouse-x', `${x}px`);
        document.body.style.setProperty('--mouse-y', `${y}px`);
    });
}

// Data Node Reveal on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.data-node, .file-entry, .chapter').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    observer.observe(el);
});
