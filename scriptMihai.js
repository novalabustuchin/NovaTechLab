
document.addEventListener('DOMContentLoaded', () => {
  // CONFIG
  const questions = [
    { text: "Nova Lab este un spațiu de tehnologie pentru elevi și tineri.", answer: true },
    { text: "Nova Lab se află pe planeta Marte.", answer: false }, // corect = false
    { text: "Nova Lab promovează învățarea prin proiecte practice.", answer: true },
    { text: "La Nova Lab poți învăța programare, robotică și design 3D.", answer: true },
    { text: "Nova Lab funcționează fără curent electric.", answer: false },
    { text: "Proiectele Nova Lab pot fi prezentate online.", answer: true },
    { text: "Nova Lab este doar pentru profesori.", answer: false },
    { text: "Nova Lab încurajează colaborarea și creativitatea.", answer: true },
  ];

  // ELEMENTS (re-query după DOMContentLoaded)
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const trueBtn = document.getElementById('true-btn');
  const falseBtn = document.getElementById('false-btn');
  const nextBtn = document.getElementById('next-btn');
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const endScreen = document.getElementById('end-screen');
  const questionText = document.getElementById('question-text');
  const feedback = document.getElementById('feedback');
  const progress = document.getElementById('progress');
  const finalScore = document.getElementById('final-score');

  // quick checks
  const required = {startBtn, trueBtn, falseBtn, nextBtn, startScreen, quizScreen, endScreen, questionText, feedback, progress, finalScore};
  for (const [k,v] of Object.entries(required)) {
    if (!v) {
      console.error(`Elementul ${k} nu există în DOM. Verifică ID-urile HTML.`);
    }
  }

  let current = 0;
  let score = 0;

  function showScreen(screenName) {
    startScreen.style.display = (screenName === 'start') ? 'block' : 'none';
    quizScreen.style.display = (screenName === 'quiz') ? 'block' : 'none';
    endScreen.style.display = (screenName === 'end') ? 'block' : 'none';
    // aria-hidden pentru accesibilitate
    startScreen.setAttribute('aria-hidden', screenName !== 'start');
    quizScreen.setAttribute('aria-hidden', screenName !== 'quiz');
    endScreen.setAttribute('aria-hidden', screenName !== 'end');
  }

  function startQuiz() {
    current = 0; score = 0;
    updateProgress(); feedback.textContent = '';
    enableAnswerButtons(true);
    showScreen('quiz');
    showQuestion();
    console.log('Quiz pornit. Intrebari:', questions.length);
  }

  function showQuestion() {
    if (current < 0 || current >= questions.length) {
      console.warn('Index întrebare invalid:', current);
      return;
    }
    const q = questions[current];
    questionText.textContent = `${current + 1}. ${q.text}`;
    feedback.textContent = '';
    nextBtn.style.display = 'none';
    enableAnswerButtons(true);
    updateProgress();
  }

  function enableAnswerButtons(enabled) {
    [trueBtn, falseBtn].forEach(b => {
      if (!b) return;
      b.disabled = !enabled;
    });
  }

  function checkAnswer(userAnswer) {
    // protecție
    if (current < 0 || current >= questions.length) {
      console.error('checkAnswer apelat cu index invalid:', current);
      return;
    }

    const q = questions[current];
    // transformăm userAnswer la boolean dacă vine ca string
    const ua = (typeof userAnswer === 'string') ? (userAnswer === 'true') : !!userAnswer;

    enableAnswerButtons(false); // nu permităm multiple apăsări
    if (ua === q.answer) {
      score++;
      feedback.textContent = '✅ Corect!';
      feedback.className = 'correct';
    } else {
      feedback.textContent = '❌ Greșit!';
      feedback.className = 'wrong';
    }
    nextBtn.style.display = 'inline-block';
    updateProgress();
    console.log(`Întrebarea ${current+1}: răspuns utilizator=${ua}, corect=${q.answer}, scor=${score}`);
  }

  function updateProgress() {
    // progres bazat pe întrebarea curentă (înainte de a apăsa next)
    const percent = Math.round((current / questions.length) * 100);
    if (progress) progress.style.width = percent + '%';
  }

  function nextQuestion() {
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    showScreen('end');
    finalScore.textContent = `Ai răspuns corect la ${score} din ${questions.length} întrebări.`;
    if (progress) progress.style.width = '100%';
    console.log('Quiz terminat. Scor:', score);
  }

  // EVENT BINDINGS - verificăm existența elementelor înainte de a atașa
  if (startBtn) startBtn.addEventListener('click', startQuiz);
  else console.error('startBtn lipsește');

  if (trueBtn) trueBtn.addEventListener('click', () => checkAnswer(true));
  else console.error('trueBtn lipsește');

  if (falseBtn) falseBtn.addEventListener('click', () => checkAnswer(false));
  else console.error('falseBtn lipsește');

  if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
  else console.error('nextBtn lipsește');

  if (restartBtn) restartBtn.addEventListener('click', () => { showScreen('start'); });
  else console.warn('restartBtn nu găsit (nu e obligatoriu)');

  // mici instrucțiuni utile în consolă
  console.info('Quiz inițializat. Apasă Start pentru a porni.');
});