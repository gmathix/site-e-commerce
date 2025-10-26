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
