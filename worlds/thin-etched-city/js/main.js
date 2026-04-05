// 🏙️ 薄刻之城：核心逻辑脚本 (v2.0)

// 1. 灰烬粒子系统 (Ash Particles)
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

    // 鼠标全局辉光 (Mouse Glow)
    document.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
}

// 2. 滚动显现引擎 (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-scroll]').forEach(el => {
    observer.observe(el);
});

// 3. 代码雨特效 (Matrix Rain)
const matrixCanvas = document.getElementById('matrix-canvas');
if (matrixCanvas) {
    const mCtx = matrixCanvas.getContext('2d');
    let mWidth = matrixCanvas.width = window.innerWidth;
    let mHeight = matrixCanvas.height = window.innerHeight;
    
    const chars = "SHERLOCKLOGICWATSON01界厚TRANSLATIONENCODING".split("");
    const fontSize = 14;
    const columns = mWidth / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        mCtx.fillStyle = "rgba(2, 2, 5, 0.05)";
        mCtx.fillRect(0, 0, mWidth, mHeight);
        mCtx.fillStyle = "#00f0ff22"; // 极低透明度的青色
        mCtx.font = fontSize + "px monospace";

        for (let i = 0; drops.length > i; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > mHeight && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);
    window.addEventListener('resize', () => {
        mWidth = matrixCanvas.width = window.innerWidth;
        mHeight = matrixCanvas.height = window.innerHeight;
    });
}

// 4. 按钮互动 (Button Haptics)
document.querySelectorAll('.cyber-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = "scale(0.95)";
        btn.style.boxShadow = "0 0 50px var(--accent-cyan)";
    });
    btn.addEventListener('mouseup', () => {
        btn.style.transform = "scale(1.05)";
    });
});
