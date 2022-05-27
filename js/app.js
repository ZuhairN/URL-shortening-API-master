'use strict';
const nav = document.querySelector('.nav');
const navLogo = document.querySelector('.nav-logo');

navLogo.addEventListener('click', (e) => {
  if (nav.getAttribute('aria-expanded') === 'true') {
    nav.setAttribute('aria-expanded', 'false');
  } else {
    nav.setAttribute('aria-expanded', 'true');
  }
});
