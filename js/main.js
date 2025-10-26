(function(){
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    burger && burger.addEventListener('click', ()=> {
      nav && nav.classList.toggle('open');
      burger.classList.toggle('open');
    });
  })();




  document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const next = carousel.querySelector('.next');
    const prev = carousel.querySelector('.prev');

    const scrollAmount = () => track.clientWidth;

    next.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
    prev.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
  });
});

(function(){
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const header = document.querySelector('.site-header');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('burger-active');
    });

    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('burger-active');
        });
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            nav.classList.remove('nav-active');
            burger.classList.remove('burger-active');
        }
    });
})();