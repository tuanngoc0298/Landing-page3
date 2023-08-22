'use strict';

// Open and close modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }
});

// Navigation
// Event khi click thanh điều hướng
const navBar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav__links');
const navLink = document.querySelectorAll('.nav__link');
navLinks.addEventListener('click', e => {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    navLink.forEach(nav => {
      nav.classList.remove('nav__item--active');
    });
    e.target.classList.add('nav__item--active');
    // document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

    const targetElement = document.querySelector(id);
    const offset = 100; // Số px bạn muốn cộng thêm

    let x;
    if (targetElement.classList.contains('section--hidden'))
      x = targetElement.getBoundingClientRect().top - 80;
    else x = targetElement.getBoundingClientRect().top;
    const targetPosition = x + window.scrollY;
    window.scrollTo({
      top: targetPosition - offset,
      behavior: 'smooth',
    });
    console.log(targetPosition - offset);
  }
});

// Event khi di chuột vào nav
const handleMover = function (e) {
  const link = e.target;
  if (link.classList.contains('nav__link')) {
    const siblings = link.closest('.navbar').querySelectorAll('.nav__link');
    const logo = link.closest('.navbar').querySelector('.logo');
    siblings.forEach(item => {
      if (item != link) {
        item.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

navBar.addEventListener('mouseover', handleMover.bind(0.6));
navBar.addEventListener('mouseout', handleMover.bind(1));

// Tabbed components
const featuresBtns = document.querySelectorAll('.features__btn');
const featuresContents = document.querySelectorAll('.features__item');
const featuresTabs = document.querySelector('.features__tab-container');
const featuresWrap = document.querySelector('.features__wrap');

featuresTabs.addEventListener('click', function (e) {
  const link = e.target;
  if (link.classList.contains('features__btn')) {
    featuresBtns.forEach(item =>
      item.classList.remove('features__btn--active')
    );
    link.classList.add('features__btn--active');

    featuresContents.forEach(item =>
      item.classList.remove('features__item--active')
    );
    const itemActive = document.querySelector(
      `.features__item--${link.dataset.tab}`
    );

    itemActive.classList.add('features__item--active');
    featuresWrap.style.backgroundColor = `${link.dataset.bgcolor}`;
  }
});

// Reveal sections
const sections = document.querySelectorAll('section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

sections.forEach(el => sectionObserver.observe(el));

// Building slider component
const sliders = function () {
  const slidebtnLeft = document.querySelector('.slider__btn--left');
  const slidebtnRight = document.querySelector('.slider__btn--right');

  const slides = document.querySelectorAll('.testimonial__slide');
  const avatars = document.querySelectorAll('.testimonial__avatars');
  slides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${i * 100}%)`)
  );

  const goToFeedback = function (currSlide) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${(i - currSlide) * 100}%)`)
    );
  };
  const goToAvatar = function (currSlide) {
    avatars.forEach(slide =>
      slide.classList.remove('testimonial__avatars--active')
    );
    console.log(avatars);
    document
      .querySelector(`.testimonial__avatars--${currSlide + 1}`)
      .classList.add('testimonial__avatars--active');
  };

  goToFeedback(0);

  let currSlide = 0;

  const nextSlide = function () {
    currSlide++;
    if (currSlide > slides.length - 1) currSlide = 0;
    goToFeedback(currSlide);
    goToAvatar(currSlide);
  };

  const prevSlide = function () {
    currSlide--;
    if (currSlide < 0) currSlide = slides.length - 1;
    goToFeedback(currSlide);
    goToAvatar(currSlide);
  };
  slidebtnRight.addEventListener('click', nextSlide);

  slidebtnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') nextSlide();
    else if (e.key === 'ArrowRight') prevSlide();
  });
};

sliders();
