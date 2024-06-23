'use strict';
// Modal window


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



// scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

//section1.scrollIntoView({behavior: 'smooth'});
btnScrollTo.addEventListener("click", function(e){
 const s1coords = section1.getBoundingClientRect();
 console.log(s1coords);

 console.log(e.target.getBoundingClientRect());

 console.log("current.scroll(X/Y)", window.pageXOffset, 
  window.pageYOffset);


 // height/width viewport
 console.log(
  'height/width viewport',
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
 );



section1.scrollIntoView({behavior: 'smooth'});
 
});




//page navigation
// implementing event delegations

document.querySelector('.nav__links').addEventListener
('click',function(e){
  e.preventDefault();

  //matching strategy
  if (e.target.classList.contains('nav__link')){
    e.preventDefault();
    const id =e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: "smooth"
    });
  }
});




//DOM traversing
// const h1 = document.querySelector('h1');

// //going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children); 
// h1.firstElementChild.style.color = 'white';


// //going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background =
//  'var(--gradient-secondary)';
//  h1.closest('h1').style.background =
//  'var(--gradient-primary)';

//  console.log(h1.parentElement.children);
//  [...h1.parentElement.children].forEach(function(el){
//   if(el !== h1) el.style.transform = 'scale(0.5)';
//  });





//Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){

  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //guard clause
  if(!clicked) return;

//remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //activate tab
  clicked.classList.add('operations__tab--active'); 

  //activate content area
  console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');

});



 
//menu fade animation
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelectorAll('img');
    siblings.forEach(el => {
      if(el !== link) el.style.opacity=this;
    });
    logo.style.opacity = this;
  };

};

nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));







// //sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function(){
//   console.log(window.scrollY);
//   if (this.scrollY > initialCoords.top){
//     nav.classList.add('sticky');
//   }

// });


//sticky navigation: intersection observer API
// const obsCallback = function(entries, observer){
//   entries.forEach(entry =>{
//     console.log(entry);
//   });

// };

// //object
// const obsOptions = {
//   root: null,
//   threshold: 0.1,

// };

// const observer = new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);




const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  // distructuring
  const[entry] = entries;
  
  if(!entry.isIntersecting){
  nav.classList.add('sticky');
  }else{
    nav.classList.remove('sticky');
  }
};
const headerObserver =new IntersectionObserver
(stickyNav,
  {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);






//reveal sections 
const allSelections = document.querySelectorAll('.section'); 

const revealSection = function(entries,observe){
 const [entry] = entries;
//  console.log(entry);

 if (!entry.isIntersecting) return;

entry.target.classList.remove('section--hidden');
observe.unobserve(entry.target);

};

const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold: 0.15
});
allSelections.forEach(section=> {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


//lazy loading image
const imgTargets = document.querySelectorAll('img[data-src]');
const loading = function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;


    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function() {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  });
};

const imgObserve = new IntersectionObserver(loading, {
  root: null,
  threshold: 0.5,
});

imgTargets.forEach(img => imgObserve.observe(img));




//slider
const slides = document.querySelectorAll('.slide');
const btnleft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');

const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.9)';
slider.style.overflow = 'visible';


slides.forEach((s, i) => s.style.transform = `translateX(${100*i}%)`);
//Start form => 0%, 100%, 200%
let currentSlide = 0;
const maxSlide = slides.length;



//go to next slide
btnright.addEventListener('click', function(){
  if(currentSlide === maxSlide - 1){
    currentSlide = 0;
  }else {
    currentSlide++;

  } 
    slides.forEach((s, i) => s.style.transform = `translateX(${100*(i-currentSlide)}%)`);

});



//go to previous slide
btnleft.addEventListener('click',function(){
  if(currentSlide === 0){
    currentSlide = maxSlide -1;
    
  }else {
    currentSlide--;
  }
  slides.forEach((s, i) => s.style.transform = `translateX(${100*(i-currentSlide)}%)`);
});



//creating Dots and making them function
const createDots = function(){
  slides.forEach(function(_,i){
  });
};
































































// const h1 = document.querySelector('h1');
// const alertH1 = function (e){
//   alert('you are reading the heading');
// };
// h1.'mouseenter', function(e){}
  
// h1.addEventListener('mouseenter',alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1),3000);
 

// //responsive navigation menu with js
// const nav = document.querySelector('.nav');
// const navToggle = document.querySelector('.nav__toggle');
// navToggle.addEventListener('click',function(){
//   const visibility = nav.target.getAttribute('data-visible');
//   if(visibility === 'false'){
//     nav.target.getAttribute('data-visible',true);
//   }
//   else {
//     nav.target.getAttribute('data-visible',false);
//   }
//   });

//   //rgb(255,255,255)
//   const randomInt = (max,min) => 
//     Math.floor(Math.random() * (max - min + 1) + min);
//   const randomcolor = () => 
//     `rgb(${randomInt(255,0)}, 
//   ${randomInt(255,0)}, ${randomInt(255,0)})`;


//page navigation



