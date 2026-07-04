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
