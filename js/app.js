'use strict';
const nav = document.querySelector('.nav');
const navLogo = document.querySelector('.nav-logo');
const form = document.querySelector('form');
const section2 = document.querySelector('.section-2');

navLogo.addEventListener('click', (e) => {
  if (nav.getAttribute('aria-expanded') === 'true') {
    nav.setAttribute('aria-expanded', 'false');
  } else {
    nav.setAttribute('aria-expanded', 'true');
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = e.target.elements.url.value;
  console.log(url);
  const urlShortener = async () => {
    try {
      const res = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${url}`
      );
      const data = res.data.result;
      console.log(data.short_link, data.original_link);

      const linkCard = document.createElement('div');
      linkCard.setAttribute('class', 'linkCard');
      section2.prepend(linkCard);
      const link = document.createElement('p');
      link.textContent = data.original_link;
      linkCard.append(link);
      const shLink = document.createElement('p');
      shLink.textContent = data.short_link;
      linkCard.append(shLink);
      const cpbtn = document.createElement('button');
      cpbtn.textContent = 'Copy';
      linkCard.append(cpbtn);
    } catch (e) {
      alert('please try again');
      console.log(e);
    }
  };
  urlShortener();
});
// need save data in array with local storage
