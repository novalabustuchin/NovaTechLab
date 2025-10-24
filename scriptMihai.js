    // Variabilă care ține scorul total
    let score = 0;

    // Evidența întrebărilor la care s-a răspuns deja
    let answered = {
        1: false,
        2: false,
        3: false
    };

    // Funcție pentru verificarea răspunsului utilizatorului
    function checkAnswer(questionNumber, userAnswer) {

        // Nu permitem răspuns dublu la aceeași întrebare
        if (answered[questionNumber]) return;
        answered[questionNumber] = true;

        // Răspunsurile corecte pentru fiecare întrebare
        let correctAnswers = {
            1: true,
            2: false,
            3: true
        };

        // Afișăm feedback pentru utilizator
        let resultElement = document.getElementById("result" + questionNumber);

        if (userAnswer === correctAnswers[questionNumber]) {
            score++;
            resultElement.textContent = "Corect!";
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = "Greșit!";
            resultElement.style.color = "red";
        }

        // Când toate întrebările au fost completate, afișăm scorul
        if (answered[1] && answered[2] && answered[3]) {
            document.getElementById("score").textContent = "Scor final: " + score + "/3";
        }
    }