// pour que une seule checkbox dans .shop-categories soit cochee à la fois
(function(){
  // Keep the single-selection checkbox behavior and drive which .content is visible
  document.addEventListener('DOMContentLoaded', function(){
    const container = document.body;
    if(!container) return;

    const checkboxes = Array.from(container.querySelectorAll('input[type="checkbox"]'));

    function findContentForCheckboxId(cbId){
      // Try exact match first
      const exact = document.getElementById(cbId + '-content');
      if(exact) return exact;

      // Fallback: try match by token (use first token before '-')
      const token = cbId.split('-')[0];
      const candidates = document.querySelectorAll('.content');
      for(const c of candidates){
        if(c.id && c.id.indexOf(token) === 0) return c;
      }

      // Last resort: return null
      return null;
    }

    function updateActiveContent(checkedId){
      // remove active class from all content
      document.querySelectorAll('.content.active').forEach(el => el.classList.remove('active'));
      // remove active from labels
      document.querySelectorAll('.shop-categories label.active').forEach(el => el.classList.remove('active'));
      const target = findContentForCheckboxId(checkedId);
      if(target) target.classList.add('active');
      // add active to the corresponding label (if present)
      const lab = document.querySelector('.shop-categories label[for="'+checkedId+'"]') || document.querySelector('.ultimate-category-card label[for="'+checkedId+'"]');
      if(lab) lab.classList.add('active');
    }

    checkboxes.forEach(cb => {
      cb.addEventListener('change', function(){
        if(this.checked){
          // Uncheck all others
          checkboxes.forEach(other => { if(other !== this) other.checked = false; });
          // Update visible content
          updateActiveContent(this.id);
        } else {
          // If no checkbox is checked, clear all active content
          const anyChecked = checkboxes.some(x => x.checked);
          if(!anyChecked) document.querySelectorAll('.content.active').forEach(el => el.classList.remove('active'));
        }
      });
    });

    // Initialize: show content for the initially checked checkbox (if any)
    const initiallyChecked = checkboxes.find(x => x.checked);
    if(initiallyChecked) updateActiveContent(initiallyChecked.id);
  });
})();

// Build small carousels for each .content section: wrap product-containers into a scrollable track and add arrows
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
      // skip if already processed
      if(content.dataset.carouselProcessed) return;

      const items = Array.from(content.querySelectorAll('.product-container'));
      if(items.length === 0) return;

      // create track
      const track = document.createElement('div');
      track.className = 'track';
      // move items into track
      items.forEach(it => track.appendChild(it));
      // insert track into content
      content.insertBefore(track, content.firstChild);

      // find existing nav buttons if present, otherwise create them
      let prev = content.querySelector('.nav-arrow.prev');
      let next = content.querySelector('.nav-arrow.next');
      if(!prev){
        prev = document.createElement('button');
        prev.className = 'nav-arrow prev';
        prev.setAttribute('aria-label','Précédent');
        // create an <img> so we can reuse the same right-arrow asset and flip with CSS
        const prevImg = new Image();
        prevImg.src = 'images/left-arrow.png';
        prevImg.alt = 'Précédent';
        prevImg.width = 24; prevImg.height = 24;
        // fallback to glyph if image fails to load (prevents white-square or broken-icon UX)
        prevImg.onerror = function(){
          // remove any possibly-broken image and show a glyph instead
          if(prevImg.parentNode) prev.removeChild(prevImg);
          prev.textContent = '◀';
          prev.classList.add('no-img');
        };
        prev.appendChild(prevImg);
        content.appendChild(prev);
      }
      if(!next){
        next = document.createElement('button');
        next.className = 'nav-arrow next';
        next.setAttribute('aria-label','Suivant');
        const nextImg = new Image();
        nextImg.src = 'images/right-arrow.png';
        nextImg.alt = 'Suivant';
        nextImg.width = 24; nextImg.height = 24;
        nextImg.onerror = function(){
          if(nextImg.parentNode) next.removeChild(nextImg);
          next.textContent = '▶';
          next.classList.add('no-img');
        };
        next.appendChild(nextImg);

        content.appendChild(next);
      }

      // scrolling behavior: move by the visible width (track.clientWidth)
      prev.addEventListener('click', () => {
        track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
      });
      next.addEventListener('click', () => {
        track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
      });

      // enable keyboard focus on buttons
      prev.tabIndex = 0; next.tabIndex = 0;

      // mark processed
      content.dataset.carouselProcessed = '1';
    });
  });
})();

(function(){
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    burger && burger.addEventListener('click', ()=> {
      nav && nav.classList.toggle('open');
      burger.classList.toggle('open');
    });
  })();

  // demo : update compteur panier (ex : tu peux lier ça à ton panier réel)
  (function() {
    const cartCount = document.querySelector('.cart-count');
    // si tu veux tester : incrémente toutes les 4s (enlever en prod)
    // setInterval(()=> cartCount.textContent = parseInt(cartCount.textContent) + 1, 4000);
  })();