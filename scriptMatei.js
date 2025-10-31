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

const quizContainer = document.getElementById("quiz");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart");

let quizData = [];
let current = 0;
let score = 0;

// Încarcă fișierul JSON
fetch("quiz_novalab.json")
  .then(response => {
    if (!response.ok) throw new Error("Eroare la încărcarea fișierului JSON!");
    return response.json();
  })
  .then(data => {
    quizData = data.questions;
    loadQuestion();
  })
  .catch(error => {
    quizContainer.innerHTML = "<p style='color:red;'>Eroare la încărcarea quiz-ului!</p>";
    console.error(error);
  });

function loadQuestion() {
  const q = quizData[current];
  quizContainer.innerHTML = `
    <div class="question">${q.question}</div>
    ${q.options.map((opt, i) => `<div class="option" onclick="checkAnswer(${i})">${opt}</div>`).join("")}
  `;
}

function checkAnswer(i) {
  const options = document.querySelectorAll(".option");
  options.forEach((opt, index) => {
    opt.style.pointerEvents = "none";
    if (index === quizData[current].correct_index) opt.classList.add("correct");
    else if (index === i) opt.classList.add("incorrect");
  });

  if (i === quizData[current].correct_index) score++;

  setTimeout(() => {
    current++;
    if (current < quizData.length) loadQuestion();
    else showResult();
  }, 800);
}

function showResult() {
  quizContainer.innerHTML = "";
  const messages = [
    "💪 Mai încearcă!",
    "😊 Foarte bine!",
    "🏆 Excelent! Ești un adevărat membru Nova Lab!"
  ];
  let feedback =
    score === quizData.length
      ? messages[2]
      : score >= 3
      ? messages[1]
      : messages[0];
  result.innerHTML = `Ai obținut <strong>${score}/${quizData.length}</strong> puncte!<br>${feedback}`;
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  result.innerHTML = "";
  restartBtn.style.display = "none";
  loadQuestion();
});
