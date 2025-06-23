// script.js
// GSAP animation logic will be added here 

// GSAP animation logic for scroll-triggered profile header

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'none' });

const header = document.querySelector('.profile-header');
const bar = document.querySelector('.profile-header-bar');

// Helper: get center of profile-pic relative to header
function getProfilePicCenter() {
  const pic = document.querySelector('.profile-pic');
  const rect = pic.getBoundingClientRect();
  const headerRect = header.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 - headerRect.left,
    y: rect.top + rect.height / 2 - headerRect.top
  };
}

const iconSelectors = ['.icon1', '.icon2', '.icon3', '.icon4', '.icon5'];

function animateProfileHeader() {
  const center = getProfilePicCenter();
  const pic = document.querySelector('.profile-pic');
  const picRect = pic.getBoundingClientRect();
  const headerRect = header.getBoundingClientRect();
  const picCenterX = center.x;
  const picCenterY = center.y;

  // Calculate icon end positions (center of profile-pic)
  const iconEnd = iconSelectors.map(sel => {
    const icon = document.querySelector(sel);
    const iconRect = icon.getBoundingClientRect();
    return {
      x: picCenterX - (iconRect.left - headerRect.left) - iconRect.width / 2,
      y: picCenterY - (iconRect.top - headerRect.top) - iconRect.height / 2
    };
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.profile-header',
      start: 'top top',
      end: '+=320',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      scroller: '.phone-frame',
    }
  });

  // Animate icons toward profile-pic center, then fade out
  iconSelectors.forEach((sel, i) => {
    tl.to(sel, {
      x: iconEnd[i].x,
      y: iconEnd[i].y,
      scale: 0.3,
      opacity: 0.2,
      duration: 0.6,
    }, 0);
  });
  iconSelectors.forEach((sel, i) => {
    tl.to(sel, {
      opacity: 0,
      duration: 0.2,
    }, 0.6);
  });

  // Animate header height: shrink to 72px
  tl.to('.profile-header', {
    height: '72px',
    borderRadius: '0 0 18px 18px',
  }, 0);

  // Animate profile name row: move up, shrink
  tl.to('.profile-title-row', {
    y: -32,
    scale: 0.85,
  }, 0);

  // Animate status: fade out and move up
  tl.to('.profile-status', {
    y: -32,
    opacity: 0,
  }, 0);

  // Animate action buttons: fade out and move down
  tl.to('.profile-actions', {
    y: 40,
    opacity: 0,
  }, 0);

  // Fade out profile-pic after icons reach it
  tl.to('.profile-pic', {
    opacity: 0,
    scale: 0.5,
    duration: 0.2,
  }, 0.7);

  // Animate the fixed bar: fade in and slide up as header collapses
  tl.to(bar, {
    opacity: 1,
    y: 0,
    clearProps: 'transform',
    duration: 0.3,
    ease: 'power1.out',
  }, 0.5);
  tl.to(bar, {
    y: 0,
    duration: 0.3,
    ease: 'power1.out',
  }, 0.5);
}

window.addEventListener('load', animateProfileHeader); 