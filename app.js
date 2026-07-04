// бургер-меню
const burger = document.querySelector('.burger');
const links = document.querySelector('.nav-links');
if (burger && links) {
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
    const open = links.classList.contains('open');
    burger.children[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
    burger.children[1].style.opacity = open ? '0' : '';
    burger.children[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.children[0].style.transform = '';
    burger.children[1].style.opacity = '';
    burger.children[2].style.transform = '';
  }));
}

// текущий год
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// появление при скролле
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// модалка-превью товара (магазин)
const modal = document.getElementById('modal');
if (modal) {
  const mImg = modal.querySelector('#m-img');
  const mName = modal.querySelector('#m-name');
  const mPrice = modal.querySelector('#m-price');
  const mDesc = modal.querySelector('#m-desc');
  const mSizes = modal.querySelector('#m-sizes');
  const mSizesWrap = modal.querySelector('#m-sizes-wrap');

  function openModal(el) {
    const d = el.dataset;
    mImg.src = d.img; mImg.alt = d.name;
    mName.textContent = d.name;
    mPrice.textContent = d.price;
    mDesc.textContent = d.desc;
    const sizes = (d.sizes || '').split(',').map(s => s.trim()).filter(Boolean);
    mSizes.innerHTML = sizes.map((s, i) => `<span class="chip${i === 0 ? ' sel' : ''}">${s}</span>`).join('');
    mSizesWrap.style.display = sizes.length ? 'block' : 'none';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-product]').forEach(el =>
    el.addEventListener('click', () => openModal(el)));
  modal.querySelector('.modal-ov').addEventListener('click', closeModal);
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  mSizes.addEventListener('click', e => {
    if (e.target.classList.contains('chip')) {
      mSizes.querySelectorAll('.chip').forEach(c => c.classList.remove('sel'));
      e.target.classList.add('sel');
    }
  });
}

