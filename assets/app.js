(() => {
  const lang = window.__LANG__ || 'en';
  const body = document.body;
  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.mobile-toggle');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.lang || 'en';
      const page = location.pathname.split('/').pop() || 'index.html';
      const localized = target === 'en' ? 'index.html' : `index-${target}.html`;
      if (page.startsWith('index')) location.href = localized;
      else location.href = localized;
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const filters = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    items.forEach(item => {
      item.style.display = (f === 'all' || item.dataset.category === f) ? '' : 'none';
    });
  }));

  const lightbox = document.getElementById('lightbox');
  const figure = document.getElementById('lightbox-figure');
  const closeBox = document.querySelector('.lightbox-close');
  document.querySelectorAll('.gallery-item button').forEach(btn => btn.addEventListener('click', () => {
    if (!lightbox || !figure) return;
    const parent = btn.closest('.gallery-item');
    const src = parent.dataset.src;
    const title = parent.dataset.title || '';
    const desc = parent.dataset.desc || '';
    const type = parent.dataset.type;
    const poster = parent.dataset.poster || '';
    figure.innerHTML = type === 'video'
      ? `<video controls autoplay poster="${poster}"><source src="${src}" type="video/mp4"></video><figcaption><strong>${title}</strong><br>${desc}</figcaption>`
      : `<img src="${src}" alt="${title}"><figcaption><strong>${title}</strong><br>${desc}</figcaption>`;
    lightbox.classList.add('open');
    body.style.overflow = 'hidden';
  }));
  if (closeBox) closeBox.addEventListener('click', () => { lightbox.classList.remove('open'); figure.innerHTML=''; body.style.overflow=''; });
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) { lightbox.classList.remove('open'); figure.innerHTML=''; body.style.overflow=''; } });

  const slides = document.querySelector('.slides');
  if (slides) {
    let index = 0;
    const total = slides.children.length;
    const render = () => slides.style.transform = `translateX(${(body.classList.contains('rtl') ? '' : '-')}${index * 100}%)`;
    document.querySelector('.next-slide')?.addEventListener('click', () => { index = (index + 1) % total; render(); });
    document.querySelector('.prev-slide')?.addEventListener('click', () => { index = (index - 1 + total) % total; render(); });
    setInterval(() => { index = (index + 1) % total; render(); }, 5500);
  }

  const search = document.getElementById('blog-search');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase().trim();
      document.querySelectorAll('.post-card').forEach(card => {
        card.style.display = card.dataset.search.includes(q) ? '' : 'none';
      });
    });
  }

  const form = document.getElementById('lead-form');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const msg = [
      'New consultation request',
      `Name: ${data.get('name') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Service: ${data.get('service') || ''}`,
      `Message: ${data.get('message') || ''}`
    ].join('\n');
    window.open(`https://wa.me/212641637051?text=${encodeURIComponent(msg)}`, '_blank');
  });
})();
