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
        for(let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: Math.random() * 0.4 + 0.1,
                size: Math.random() * 1.5
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#555';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if(p.y > height) p.y = -10;
            if(p.x > width) p.x = 0;
            if(p.x < 0) p.x = width;
        });
        requestAnimationFrame(draw);
    }

    // 为卡片添加扫描线
    const cards = document.querySelectorAll('.char-card');
    cards.forEach(card => {
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(0, 240, 255, 0.5);
            box-shadow: 0 0 10px rgba(0, 240, 255, 0.8);
            pointer-events: none;
            z-index: 5;
            animation: scan 4s linear infinite;
        `;
        card.appendChild(scanLine);
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}
