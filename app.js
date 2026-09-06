// Shared behaviour used across every Avyra page: nav, mobile menu,
// smooth scroll, the letter-reveal headings, and the hero parallax.

const nav = document.getElementById('siteNav');
if (nav){
  const onScroll = () => { nav.classList.toggle('scrolled', window.scrollY > 12); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });
}

const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function openMenu(){
  mobileMenu.classList.add('open');
  burger.setAttribute('aria-expanded','true');
}
function closeMenu(){
  mobileMenu.classList.remove('open');
  burger.setAttribute('aria-expanded','false');
}
if (burger && mobileMenu && mobileClose){
  burger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// smooth scroll for same-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target || reduceMotion || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    const start = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + start;
    const distance = targetPosition - start;
    const duration = Math.min(1400, Math.max(900, Math.abs(distance) * 0.7));
    const startTime = performance.now();

    const scrollStep = currentTime => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, start + distance * easedProgress);
      if (progress < 1) requestAnimationFrame(scrollStep);
      else history.pushState(null, '', link.getAttribute('href'));
    };

    requestAnimationFrame(scrollStep);
  });
});

// split headings into letters that rise into place on scroll
function splitIntoLetters(el){
  const text = el.textContent;
  el.textContent = '';
  let letterIndex = 0;
  text.split(' ').forEach((word, wIdx, arr) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    [...word].forEach(ch => {
      const letterSpan = document.createElement('span');
      letterSpan.className = 'letter';
      letterSpan.textContent = ch;
      letterSpan.style.setProperty('--d', (letterIndex * 0.022) + 's');
      letterIndex++;
      wordSpan.appendChild(letterSpan);
    });
    el.appendChild(wordSpan);
    if (wIdx < arr.length - 1) el.appendChild(document.createTextNode(' '));
  });
}

const splitEls = document.querySelectorAll('.split-text');
if (!reduceMotion && splitEls.length){
  splitEls.forEach(splitIntoLetters);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -8% 0px' });

  splitEls.forEach(el => revealObserver.observe(el));
}

// gentle hero image parallax
const heroImg = document.querySelector('.hero-art-frame img');
if (heroImg && !reduceMotion){
  let ticking = false;
  const applyParallax = () => {
    const rect = heroImg.parentElement.getBoundingClientRect();
    const offset = rect.top * 0.06;
    heroImg.style.transform = `translateY(${offset}px) scale(1.08)`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking){
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }, { passive:true });
  applyParallax();
}
