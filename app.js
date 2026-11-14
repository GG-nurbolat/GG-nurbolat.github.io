const G = window.GG, page = document.body.dataset.page;
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const links = [['index.html','Главная','home'],['index.html#features','Плюсы','features'],['releases.html','Релизы','releases']];

document.body.insertAdjacentHTML('afterbegin',
  `<header class="top"><a class="brand" href="index.html"><img src="assets/icon.png" alt="" width="34" height="34">GGIPES</a>
  <nav class="pill" aria-label="Основная">${links.map(([h,t,id]) => `<a href="${h}"${id===page?' class="on" aria-current="page"':''}>${t}</a>`).join('')}</nav>
  <a class="btn sm" href="${esc(G.downloadPage)}">Скачать</a></header>`);
document.body.insertAdjacentHTML('beforeend',
  `<footer><span>© GGIPES</span><span>Построен на Electron и Chromium</span><a href="${esc(G.github)}" rel="noopener">GitHub</a></footer>`);

document.querySelectorAll('[data-go=download]').forEach(a => a.href = G.downloadPage);
document.querySelectorAll('[data-go=old]').forEach(a => a.href = G.oldVersionsRepo);

const soon = document.createElement('dialog');
soon.className = 'soon';
soon.innerHTML = `<h3 id="sn"></h3><p>Мы ещё работаем над этой версией. Загляните позже.</p><button class="btn sm" type="button">Понятно</button>`;
document.body.append(soon);
soon.querySelector('button').onclick = () => soon.close();
soon.onclick = e => { if (e.target === soon) soon.close(); };

const plats = document.getElementById('platforms');
if (plats) {
  plats.innerHTML = G.platforms.map(p => `<button class="glass plat" type="button" data-id="${esc(p.id)}"><b>${esc(p.name)}</b><span>${esc(p.note)}</span><i>${p.url ? 'Скачать' : 'Скоро'}</i></button>`).join('');
  plats.onclick = e => {
    const b = e.target.closest('.plat'); if (!b) return;
    const p = G.platforms.find(x => x.id === b.dataset.id);
    if (p.url) { location.href = p.url; return; }
    soon.querySelector('#sn').textContent = `GGIPES для ${p.name} скоро выйдет`;
    soon.showModal();
  };
}

const files = document.getElementById('files');
if (files) files.innerHTML = G.files.map(f => f.url
  ? `<div class="glass row"><div><b>${esc(f.platform)}</b><span>Версия ${esc(f.version)} · ${esc(f.size)}</span></div><a class="btn sm" href="${esc(f.url)}" rel="noopener">Скачать</a></div>`
  : `<div class="glass row off"><div><b>${esc(f.platform)}</b><span>Скоро выйдет</span></div></div>`).join('');
