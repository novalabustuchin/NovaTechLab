// ===============================================
// 🔹 SCROLL FADE-IN (pentru secțiunile vizibile la scroll)
// ===============================================
const sectionsToReveal = document.querySelectorAll('.fade-section:not(.about):not(.exercises-lab):not(.team):not(.gallery):not(.footpath)');

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
  const allSections = document.querySelectorAll('.about, .exercises-lab, .team, .gallery, .footpath');
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
   footpathBtn.addEventListener('click', () => scrollToSection(footpathSection));
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

// ====== slider logic ======
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

// 🔹 Navigare prin butoane (doar pe desktop)
if (window.innerWidth > 768) {
  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
} else {
  // 🔹 Pe mobile: activăm swipe cu degetul
  let startX = 0;
  let endX = 0;

  slidesContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slidesContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  slidesContainer.addEventListener('touchend', () => {
    const diff = startX - endX;
    const swipeThreshold = 50; // minim 50px pentru a fi considerat swipe

    if (diff > swipeThreshold) {
      // glisare spre stânga → următorul slide
      showSlide(currentSlide + 1);
    } else if (diff < -swipeThreshold) {
      // glisare spre dreapta → slide anterior
      showSlide(currentSlide - 1);
    }
  });
}

// 🔹 Ascundem butoanele pe mobile
if (window.innerWidth <= 768) {
  if (prevBtn) prevBtn.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';
}



 const apiKey = '658ab63cff086fa13b7cf1215d8a20ed';
    const rightPanel = document.getElementById('weather-panel');

    function isDaytime(time) {
      const hour = time.getHours();
      return hour >= 6 && hour <= 18;
    }

    function getWeatherIcon(weather, isDaytime) {
      const icons = {
        'Clear': isDaytime ? '<i class="fas fa-sun weather-icon"></i>' : '<i class="fas fa-moon weather-icon"></i>',
        'Rain': '<i class="fas fa-cloud-showers-heavy weather-icon"></i>',
        'Clouds': isDaytime ? '<i class="fas fa-cloud-sun weather-icon"></i>' : '<i class="fas fa-cloud-moon weather-icon"></i>',
        'Snow': '<i class="fas fa-snowflake weather-icon"></i>',
        'Thunderstorm': '<i class="fas fa-bolt weather-icon"></i>',
        'Mist': '<i class="fas fa-smog weather-icon"></i>'
      };
      return icons[weather] || '<i class="fas fa-question-circle weather-icon"></i>';
    }

    async function fetchWeatherByCoords(lat, lon) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Eroare la preluarea vremii");
      const data = await response.json();

      const localTime = new Date(data.dt * 1000);
      return {
        name: data.name || "Loc necunoscut",
        temp: Math.round(data.main.temp),
        weather: data.weather[0].main,
        isDaytime: isDaytime(localTime)
      };
    }

    async function fetchWeatherByCity(city = "Bustuchin") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},ro&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Eroare la preluarea vremii default");
      const data = await response.json();

      const localTime = new Date(data.dt * 1000);
      return {
        name: data.name,
        temp: Math.round(data.main.temp),
        weather: data.weather[0].main,
        isDaytime: isDaytime(localTime)
      };
    }

    function showWeather(info) {
      rightPanel.innerHTML = `
        <div class="weather-widget">
          <h3>${info.name}</h3>
          ${getWeatherIcon(info.weather, info.isDaytime)}
          <p class="temperature">${info.temp}°C</p>
          <p class="condition">${info.weather}</p>
        </div>
      `;
    }

    async function showLocalWeather() {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            const weather = await fetchWeatherByCoords(latitude, longitude);
            showWeather(weather);
          }, async (error) => {
            console.warn("Geolocație refuzată, se folosește Bustuchin");
            const weather = await fetchWeatherByCity();
            showWeather(weather);
          });
        } else {
          const weather = await fetchWeatherByCity();
          showWeather(weather);
        }
      } catch (error) {
        console.error(error);
        rightPanel.innerHTML = "<p>Eroare la obținerea datelor meteo.</p>";
      }
    }

    // 🔁 actualizează automat la încărcarea paginii
    document.addEventListener("DOMContentLoaded", showLocalWeather);


/* ===== PRELOADER VIDEO ===== */
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  const video = document.getElementById('preloader-video');

  if (!preloader || !video) return;

  // 🔸 Ascundem scroll-ul doar temporar
  document.body.style.overflow = 'hidden';

  video.addEventListener('ended', () => {
    preloader.classList.add('fade-out');

    setTimeout(() => {
      preloader.remove();
      // 🔸 Reactivăm scroll-ul normal după dispariția preloaderului
      document.body.style.overflow = '';
    }, 800);
  });

  // 🔸 Fallback – în caz că video-ul nu pornește
  setTimeout(() => {
    if (document.body.contains(preloader)) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.remove();
        document.body.style.overflow = '';
      }, 800);
    }
  }, 10000);
});



// ===============================================
// 🔹 FOOTPATH SECTION
// ===============================================
// selectăm secțiunea footpath și butonul principal
const footpathSection = document.querySelector('.footpath.fade-section');
const footpathBtn = document.getElementById('openFootpathBtn');

if (footpathSection && footpathBtn) {
  // ✅ buton de închidere (înapoi)
  let closeFootpathBtn = footpathSection.querySelector('.close-footpath');
  if (!closeFootpathBtn) {
    closeFootpathBtn = document.createElement('button');
    closeFootpathBtn.textContent = 'Înapoi';
    closeFootpathBtn.className = 'close-footpath';
    footpathSection.appendChild(closeFootpathBtn);
  }

  // ✅ deschidere secțiune Footpath
  footpathBtn.addEventListener('click', () => showOnlySection(footpathSection));

  // ✅ închidere secțiune Footpath
  closeFootpathBtn.addEventListener('click', () => hideSection(footpathSection));

  // comutare trasee (dacă există mai multe trasee)
  footpathSection.querySelectorAll('.path-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const path = btn.dataset.path;
      footpathSection.querySelectorAll('.footpath-map').forEach(map => {
        map.style.display = map.dataset.path === path ? 'flex' : 'none';
      });
    });
  });

  // click pe noduri – deschide pagina curs
  footpathSection.querySelectorAll('.node').forEach(node => {
    node.addEventListener('click', () => {
      const topic = node.dataset.topic;
      window.open(`footpath/${topic}.html`, '_blank');
    });
  });
}
