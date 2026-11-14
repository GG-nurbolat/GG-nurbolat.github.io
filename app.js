const G = window.GG, page = document.body.dataset.page;
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const links = [['index.html','Главная','home'],['releases.html','Релизы','releases']];

document.body.insertAdjacentHTML('afterbegin',
  `<header class="top"><a class="brand" href="index.html"><img src="assets/icon.png" alt="" width="34" height="34">GGIPES</a>
  <nav class="pill" aria-label="Основная">${links.map(([h,t,id]) => `<a href="${h}"${id===page?' class="on" aria-current="page"':''}>${t}</a>`).join('')}</nav>
  <a class="btn sm" href="releases.html">Скачать</a></header>`);
document.body.insertAdjacentHTML('beforeend',
  `<footer><span>© GGIPES</span><span>Построен на Electron и Chromium</span><a href="${esc(G.github)}" rel="noopener">GitHub</a></footer>`);

document.querySelectorAll('[data-go=old]').forEach(a => a.href = G.oldVersionsRepo);

const soon = document.createElement('dialog');
soon.className = 'soon';
soon.innerHTML = `<h3 id="sn"></h3><p>Мы ещё работаем над этой версией. Загляните позже.</p><button class="btn sm" type="button">Понятно</button>`;
document.body.append(soon);
soon.querySelector('button').onclick = () => soon.close();
soon.onclick = e => { if (e.target === soon) soon.close(); };

const plats = document.getElementById('platforms');
if (plats) {
  plats.innerHTML = G.platforms.map(p => p.url
    ? `<a class="glass plat ready" href="${esc(p.url)}" rel="noopener"><b>${esc(p.name)}</b><span>${esc(p.note)}</span><span>Версия ${esc(p.version)} · ${esc(p.size)}</span><i>Скачать</i></a>`
    : `<button class="glass plat" type="button" data-id="${esc(p.id)}"><b>${esc(p.name)}</b><span>${esc(p.note)}</span><i>Скоро</i></button>`).join('');
  plats.onclick = e => {
    const b = e.target.closest('button.plat'); if (!b) return;
    const p = G.platforms.find(x => x.id === b.dataset.id);
    soon.querySelector('#sn').textContent = `GGIPES для ${p.name} скоро выйдет`;
    soon.showModal();
  };
}
