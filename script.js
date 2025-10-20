// ===============================================
// 🔹 SCROLL FADE-IN (pentru secțiunile vizibile la scroll)
// ===============================================
const sectionsToReveal = document.querySelectorAll('.fade-section:not(.about):not(.exercises-lab):not(.team)');

function revealSections() {
  const triggerBottom = window.innerHeight * 0.8;
  sectionsToReveal.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      sec.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSections);
revealSections();


// ===============================================
// 🔹 FUNCȚII COMUNE pentru toate secțiunile
// ===============================================
function hideSection(section) {
  section.classList.remove('visible');
  setTimeout(() => {
    section.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 800);
}

function showOnlySection(section) {
  // ascunde toate secțiunile principale
  const allSections = document.querySelectorAll('.about, .exercises-lab, .team, .gallery');
  allSections.forEach(sec => {
    if (sec !== section) {
      sec.classList.remove('visible');
      sec.style.display = 'none';
    }
  });

  // arată doar secțiunea dorită
  section.style.display = 'block';
  setTimeout(() => section.classList.add('visible'), 10);
  section.scrollIntoView({ behavior: 'smooth' });
}


// ===============================================
// 🔹 ABOUT SECTION
// ===============================================
const aboutSection = document.querySelector('.about');
const exploreBtn = document.getElementById('exploreBtn');

// Buton de închidere
let closeAboutBtn = aboutSection.querySelector('.close-about');
if (!closeAboutBtn) {
  closeAboutBtn = document.createElement('button');
  closeAboutBtn.textContent = 'Înapoi';
  closeAboutBtn.className = 'close-about';
  aboutSection.appendChild(closeAboutBtn);
}

exploreBtn.addEventListener('click', () => showOnlySection(aboutSection));
closeAboutBtn.addEventListener('click', () => hideSection(aboutSection));


// ===============================================
// 🔹 EXERCISE SECTION
// ===============================================
const exerciseSection = document.querySelector('.exercises-lab');
const exerciseBtn = document.getElementById('exerciseBtn');
let closeExercisesBtn = exerciseSection.querySelector('.close-exercises');

if (!closeExercisesBtn) {
  closeExercisesBtn = document.createElement('button');
  closeExercisesBtn.textContent = 'Înapoi';
  closeExercisesBtn.className = 'close-exercises';
  exerciseSection.appendChild(closeExercisesBtn);
}

exerciseBtn.addEventListener('click', () => showOnlySection(exerciseSection));
closeExercisesBtn.addEventListener('click', () => hideSection(exerciseSection));


// ===============================================
// 🔹 TEAM SECTION
// ===============================================
const teamSection = document.querySelector('.team.fade-section');
const teamBtn = document.getElementById('teamBtn');

let closeTeamBtn = teamSection.querySelector('.close-team');
if (!closeTeamBtn) {
  closeTeamBtn = document.createElement('button');
  closeTeamBtn.textContent = 'Înapoi';
  closeTeamBtn.className = 'close-team';
  teamSection.appendChild(closeTeamBtn);
}

teamBtn.addEventListener('click', () => showOnlySection(teamSection));
closeTeamBtn.addEventListener('click', () => hideSection(teamSection));


// ===============================================
// 🔹 PORTAL ANIMATION (apel telefon/WhatsApp)
// ===============================================
function portalAnimation(callback) {
  const portal = document.createElement('div');
  portal.classList.add('portal-effect');
  document.body.appendChild(portal);

  setTimeout(() => {
    portal.remove();
    if (callback) callback();
  }, 1000);
}

document.querySelector('.float-btn.phone')?.addEventListener('click', (e) => {
  e.preventDefault();
  portalAnimation(() => {
    window.location.href = "tel:+40771083833";
  });
});

document.querySelector('.float-btn.whatsapp')?.addEventListener('click', (e) => {
  e.preventDefault();
  portalAnimation(() => {
    window.open("https://wa.me/40771083833", "_blank");
  });
});


// ===============================================
// 🔹 HERO / SCROLL LOCK
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('header.hero');
  const body = document.body;

  body.classList.add('hero-active');

  function scrollToSection(section) {
    if (body.classList.contains('hero-active')) {
      body.classList.remove('hero-active');
      hero.style.position = 'relative';
    }
    if (section) showOnlySection(section);
  }

  exploreBtn.addEventListener('click', () => scrollToSection(aboutSection));
  exerciseBtn.addEventListener('click', () => scrollToSection(exerciseSection));
  teamBtn.addEventListener('click', () => scrollToSection(teamSection));
  galleryBtn.addEventListener('click', () => scrollToSection(gallerySection)); // ✅ nou
});


// ===============================================
// 🔹 CEAS ANALOG + DIGITAL
// ===============================================
function updateClock() {
  const now = new Date();
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // calcule unghiuri
  const hourDeg = (hour + minute / 60) * 30; // 360 / 12
  const minuteDeg = (minute + second / 60) * 6; // 360 / 60
  const secondDeg = second * 6;

  // selectăm limbile
  document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
  document.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
  document.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;

  // digital
  const digital = document.querySelector('.digital-time');
  digital.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
}

// update la fiecare secundă
setInterval(updateClock, 1000);
updateClock();

// ===============================================
// 🔹 GALLERY SECTION
// ===============================================
const gallerySection = document.querySelector('.gallery.fade-section');
const galleryBtn = document.getElementById('galleryBtn');

let closeGalleryBtn = gallerySection.querySelector('.close-gallery');
if (!closeGalleryBtn) {
  closeGalleryBtn = document.createElement('button');
  closeGalleryBtn.textContent = 'Înapoi';
  closeGalleryBtn.className = 'close-gallery';
  gallerySection.appendChild(closeGalleryBtn);
}

galleryBtn.addEventListener('click', () => showOnlySection(gallerySection));
closeGalleryBtn.addEventListener('click', () => hideSection(gallerySection));

// ====== slider logic simplu ======
const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
