// Reveal animation with JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100; // distance before element is visible

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load
});
fetch("animation-config.json")
  .then(response => response.json())
  .then(config => {
    const revealElements = document.querySelectorAll(".reveal");
    const settings = config.animation;

    revealElements.forEach(el => {
      el.style.transition = `all ${settings.transitionDuration}s ${settings.transitionType}`;
      el.style.opacity = settings.startOpacity;
      el.style.transform = `scale(${settings.startScale})`;
    });

    function revealOnScroll() {
      const windowHeight = window.innerHeight;
      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - settings.triggerOffset) {
          el.style.opacity = settings.endOpacity;
          el.style.transform = `scale(${settings.endScale})`;
        } else {
          el.style.opacity = settings.startOpacity;
          el.style.transform = `scale(${settings.startScale})`;
        }
      });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  });
