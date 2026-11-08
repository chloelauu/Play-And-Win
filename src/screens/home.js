// ============================================================
// home.js — the Home screen
// ------------------------------------------------------------
// Shows the app title and two big buttons, one per game.
// Each game has a one-line "how to play" so no separate
// tutorial page is needed.
// ============================================================

import { state } from "../state.js";
import { startSession } from "../api.js";

// app = the <div id="app"> we draw into
// go  = function from main.js that switches screens (passed in so the two files don't import each other)
export function renderHome(app, go) {
  // Replaces everything inside #app with the Home screen HTML
  app.innerHTML = `
        <main class="screen">
            <header class="card title">
                <h1>Play &amp; Win</h1>
                <p>FunFest @ Downtown West</p>
            </header>

            <p class="card">Pick a game to play.<br>Score 80% or more to win a prize!</p>

            <!-- data-game stores which game this button starts -->
            <button class="game-btn" data-game="quiz">
                <span class="icon">🧠</span>
                <span>
                    <strong>Quiz</strong>
                    <small>5 questions. Get 4 right to win.</small>
                </span>
            </button>
            
            <button class="game-btn" data-game="points">
                <span class="icon">🎨</span>
                <span>
                    <strong>Colour the Grid</strong>
                    <small>Colour 20 of 25 squares in 20 seconds.</small>
                </span>
            </button>
        </main>
    `;

  // The buttons only exist AFTER innerHTML runs, so we attach the click event listeners here
  app.querySelectorAll(".game-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Read data-game('quiz' or 'points') from the button that was clicked
      state.game = btn.dataset.game;

      // Record a new play (counts as a player)
      state.sessionId = startSession(state.game);

      // Go to the matching game screen
      go(state.game === "quiz" ? "quiz" : "grid");
    });
  });
}
