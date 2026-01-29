/* =======================
   FULL-PAGE ROUND PARTICLES (Glowing Style)
======================= */

const canvas = document.createElement("canvas");
document.body.prepend(canvas); // behind all content
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1"; // behind content
canvas.style.pointerEvents = "none";

const ctx = canvas.getContext("2d");
let particlesArray;

// Set canvas size
function resizeCanvas() {
  canvas.width = document.body.scrollWidth;
  canvas.height = document.body.scrollHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 2;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = "rgba(0,230,255,0.6)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // perfect circle
    ctx.fill();
  }
}

// Initialize particles
function initParticles() {
  particlesArray = [];
  const numberOfParticles = 200; // increased particle count
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* =======================
   HERO IMAGE SLIDER
======================= */
const slides = document.querySelectorAll(".hero-slider .slide");
let currentSlide = 0;
const slideInterval = 4000;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "flex" : "none";
    slide.style.opacity = i === index ? "1" : "0";
    slide.style.transition = "opacity 1s ease-in-out";
  });
}
showSlide(currentSlide);

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, slideInterval);

/* =======================
   SMOOTH SCROLL NAVIGATION + FADE ANIMATION
======================= */
const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll("section");

function scrollAnimations() {
  const triggerBottom = window.innerHeight / 1.2;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add("show");
    } else {
      section.classList.remove("show");
    }
  });
}
window.addEventListener("scroll", scrollAnimations);
scrollAnimations(); // initial trigger

// Smooth scroll for nav
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    const targetPosition = targetSection.offsetTop;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      scrollAnimations(); // trigger fade animation during scroll
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  });
});;
