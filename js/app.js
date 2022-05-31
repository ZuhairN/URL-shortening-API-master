'use strict';

let linkList = [];
if (localStorage.getItem('lkList')) {
  linkList = JSON.parse(localStorage.getItem('lkList'));
}

const nav = document.querySelector('.nav');
const navLogo = document.querySelector('.nav-logo');
const form = document.querySelector('form');
const section2 = document.querySelector('.section-2');
const input = document.querySelector('#input');

if (linkList.length) {
  for (let lk of linkList) {
    const linkCard = document.createElement('div');
    linkCard.setAttribute('class', 'linkCard');
    section2.prepend(linkCard);
    const link = document.createElement('p');
    link.textContent = lk.originalLink;
    linkCard.append(link);
    const shLink = document.createElement('p');
    shLink.textContent = lk.shortLink;
    linkCard.append(shLink);
    const btn = document.createElement('button');
    btn.setAttribute('class', 'btn');
    btn.textContent = 'Copy';
    linkCard.append(btn);
  }
} else {
  console.log('no-links');
}

navLogo.addEventListener('click', (e) => {
  if (nav.getAttribute('aria-expanded') === 'true') {
    nav.setAttribute('aria-expanded', 'false');
  } else {
    nav.setAttribute('aria-expanded', 'true');
  }
});

input.addEventListener('input', () => {
  input.parentElement.classList.remove('invalid');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = e.target.elements.url;
  console.log(url);
  const urlShortener = async () => {
    try {
      if (url.value === '') {
        url.parentElement.classList.add('invalid');
      } else {
        const res = await axios.get(
          `https://api.shrtco.de/v2/shorten?url=${url.value}`
        );
        const data = res.data.result;
        linkList.push({
          shortLink: data.short_link,
          originalLink: data.original_link,
        });

        const linkCard = document.createElement('div');
        linkCard.setAttribute('class', 'linkCard');
        section2.prepend(linkCard);
        const link = document.createElement('p');
        link.textContent = data.original_link;
        linkCard.append(link);
        const shLink = document.createElement('p');
        shLink.textContent = data.short_link;
        linkCard.append(shLink);
        const btn = document.createElement('button');
        btn.setAttribute('class', 'btn');
        btn.textContent = 'Copy';
        linkCard.append(btn);
      }
      localStorage.setItem('lkList', JSON.stringify(linkList));
    } catch (e) {
      alert(e.response.data.error);
    }
  };
  urlShortener();
  url.value = '';
});
section2.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add('bg-d-violet');
    e.target.textContent = 'Copied!';
    console.log(e.target.previousElementSibling.textContent);
    navigator.clipboard.writeText(e.target.previousElementSibling.textContent);
  }
});
