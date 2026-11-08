// ============================================================
// quiz.js — the Quiz screen
// ------------------------------------------------------------
// Shows the 5 questions from questions.json one at a time.
// The player taps one of 2 answers, sees right/wrong for a
// moment, then the next question appears. After the last
// question, the score is saved in state and we go to Result.
// ============================================================

import { state } from '../state.js'
import questions from '../data/questions.json'

// How long the right/wrong colours show before moving on
// Kept as constant for tuning purpose
const FEEDBACK_DELAY = 700;

export function renderQuiz(app, go) {
  // Reset for a fresh/new game every time the quiz starts
  let current = 0; // index of question being shown (0 = first)
  state.score = 0;
  state.maxScore = questions.length; // 5, used for 80% score check

  // Draw the current question
  function showQuestion() {
    const q = questions[current];

    app.innerHTML = `
            <main class="screen">
                <p class="card progress">Question ${current + 1} of ${questions.length}</p>

                <h2 class="card question">${q.question}</h2>

                <div class="answers">
                    ${q.options
                      .map(
                        // One button per option. Data-index remembers its position, which we compare with answerIndex from the JSON.
                        (option, i) =>
                          `<button class="answer-btn" data-index="${i}">${option}</button>`,
                      )
                      .join("")}
                </div>
            </main>
        `;
    app.querySelectorAll(".answer-btn").forEach((btn) => {
      btn.addEventListener("click", () => checkAnswer(btn, q));
    });
  }

  // Check if the answer is right or wrong
  function checkAnswer(btn, q) {
    const buttons = app.querySelectorAll(".answer-btn");

    // Lock all buttons so a fast double-tap cannot score twice
    buttons.forEach((b) => (b.disabled = true));

    const chosen = Number(btn.dataset.index); // data-* values are text, so convert to a number
    const correct = chosen === q.answerIndex;

    if (correct) state.score++; // Increment score if correct

    // Colour the tapped button, and always show the right answer.
    btn.classList.add(correct ? "correct" : "wrong");
    buttons[q.answerIndex].classList.add("correct");

    // Wait a moment so the player sees the result, then continue.
    setTimeout(() => {
      current++;
      if (current < questions.length) {
        showQuestion();
      } else {
        go("result"); // all questions done
      }
    }, FEEDBACK_DELAY);
  }

  showQuestion();
}
