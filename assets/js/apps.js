// --- TrollStore 应用列表 ---
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
