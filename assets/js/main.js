// --- 雨滴 ---
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

// --- 复制 ---
function copyURL(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(showToast).catch(fallback);
    } else {
        fallback();
    }
    function fallback() {
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast(); } catch (e) {}
        document.body.removeChild(ta);
    }
}

function showToast() {
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1600);
}

// --- 打字机 ---
(function () {
    const el = document.getElementById('repo-url-text');
    if (!el) return;
    const text = 'https://zlonej.github.io/repo';
    let i = 0;
    function type() {
        if (i <= text.length) {
            el.textContent = text.slice(0, i);
            i++;
            setTimeout(type, 35 + Math.random() * 35);
        }
    }
    setTimeout(type, 700);
})();

// --- TrollStore ---
(function () {
    const listEl = document.getElementById('tipa-list');
    const countEl = document.getElementById('tipa-count');
    if (!listEl) return;

    fetch('trollstore/apps.json')
        .then(r => r.ok ? r.json() : [])
        .catch(() => [])
        .then(apps => {
            if (!apps.length) return;

            countEl.textContent = apps.length + (apps.length === 1 ? ' app' : ' apps');
            listEl.innerHTML = '';

            apps.forEach(app => {
                const row = document.createElement('div');
                row.className = 'app-row';

                const dl = 'trollstore/' + app.file;
                const install = 'apple-magnifier://install?url=https://zlonej.github.io/trollstore/' + encodeURIComponent(app.file);
                const icon = app.icon ? 'trollstore/' + app.icon : 'assets/icon/trollstore.png';

                row.innerHTML =
                    '<img class="app-icon" src="' + icon + '" alt="">' +
                    '<div class="app-info">' +
                        '<div class="app-name">' + app.name + '</div>' +
                        (app.version ? '<div class="app-ver">v' + app.version + '</div>' : '') +
                    '</div>' +
                    '<div class="app-actions">' +
                        '<a class="app-btn app-btn-primary" href="' + install + '">' +
                            '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Install' +
                        '</a>' +
                        '<a class="app-btn" href="' + dl + '" download>' +
                            '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download' +
                        '</a>' +
                    '</div>';

                listEl.appendChild(row);
            });
        });
})();