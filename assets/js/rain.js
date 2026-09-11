// --- 雨滴背景 ---
(function () {
    const canvas = document.getElementById('rain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const drops = [];

    function resize() {
        w = canvas.width = document.documentElement.clientWidth;
        h = canvas.height = document.documentElement.clientHeight;
    }

    function makeDrop(randomY) {
        return {
            x: Math.random() * w,
            y: randomY ? Math.random() * h : Math.random() * -h,
            speed: 1.2 + Math.random() * 2.5,
            len: 10 + Math.random() * 20,
            opacity: 0.06 + Math.random() * 0.12,
            width: 0.4 + Math.random() * 0.7
        };
    }

    resize();
    for (let i = 0; i < 220; i++) drops.push(makeDrop(true));

    (function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < drops.length; i++) {
            const d = drops[i];
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x + 0.3, d.y + d.len);
            ctx.strokeStyle = `rgba(120,115,180,${d.opacity})`;
            ctx.lineWidth = d.width;
            ctx.lineCap = 'round';
            ctx.stroke();
            d.y += d.speed;
            if (d.y > h + d.len) drops[i] = makeDrop(false);
        }
        requestAnimationFrame(draw);
    })();

    window.addEventListener('resize', resize);
})();
