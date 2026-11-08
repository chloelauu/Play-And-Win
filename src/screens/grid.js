// ============================================================
// grid.js — the Colour the Grid screen (the points game)
// ------------------------------------------------------------
// A 5x5 grid of squares. The player taps or drags a finger
// across squares to colour them before the timer runs out.
// Score = number of coloured squares (max 25).
// The game ends when time is up OR every square is coloured.
// ============================================================

import { state } from "../state.js";

// Game settings, kept at the top so they're easy to tune after testing with real players
const GRID_SIZE = 5; // 5x5 grid
const TIME_LIMIT = 20; // seconds to colour as many squares as possible
const COLOURS = ["#ff8a80", "#ffd166", "#80d8a0", "#7ec8ff", "#c39bff"]; // one per row

export function renderGrid(app, go) {
  const totalCells = GRID_SIZE * GRID_SIZE;

  // Reset for a fresh/new game every time the grid starts
  state.score = 0;
  state.maxScore = totalCells; // 25, used for 80% score check

  let playing = false; // true only while the timer is running
  let drawing = false; // true while a finger/mouse is held down
  let timerId = null; // so we can stop the timer later
  let endTime = 0; // the exact time the game should end

  // Build one <div> per square. data-row picks its colour.
  let cellsHtml = "";
  for (let i = 0; i < totalCells; i++) {
    cellsHtml += `<div class="cell" data-row="${Math.floor(i / GRID_SIZE)}"></div>`;
  }

  app.innerHTML = `
    <main class="screen">
      <div class="card hud">
        <span>⏱ </i><strong id="time">${TIME_LIMIT}</strong>s</span>
        <span>🎨 <strong id="count">0</strong> / ${totalCells}</span>
      </div>

      <div class="grid" id="grid">${cellsHtml}</div>

      <button class="btn" id="start">Start</button>
      <p class="card hint">Tap or drag across the squares. Colour 20 to win!</p>
    </main>
  `;

  const grid = app.querySelector("#grid");
  const timeEl = app.querySelector("#time");
  const countEl = app.querySelector("#count");
  const startBtn = app.querySelector("#start");

  // ---------- Start ----------
  // The timer only starts when the player is ready
  startBtn.addEventListener("click", () => {
    playing = true;
    startBtn.disabled = true;
    grid.classList.add("active");

    // Work out the end time once, then keep checking the clock
    endTime = Date.now() + TIME_LIMIT * 1000;
    timerId = setInterval(updateTimer, 100);
  });

  function updateTimer() {
    const secondsLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    timeEl.textContent = secondsLeft;
    if (secondsLeft === 0) endGame();
  }

  // ---------- Colouring ----------
  // Colour one square, if it isn't coloured yet
  function colour(cell) {
    if (!playing || !cell || !cell.classList.contains("cell")) return;
    if (cell.classList.contains("filled")) return; // already counted

    cell.classList.add("filled");
    cell.style.backgroundColor = COLOURS[cell.dataset.row];
    state.score++;
    countEl.textContent = state.score;

    // If the player coloured every square, the game ends early
    if (state.score === totalCells) endGame();
  }

  // Pointer events work for BOTH touch and mouse
  grid.addEventListener("pointerdown", (e) => {
    drawing = true;
    colour(e.target);
  });

  // While dragging, find which square is under the finger
  // (On touch, e.target stays the first square, so we look it up.)
  grid.addEventListener("pointermove", (e) => {
    if (!drawing) return;
    colour(document.elementFromPoint(e.clientX, e.clientY));
  });

  // Stop drawing when the finger/mouse is lifted
  window.addEventListener("pointerup", () => {
    drawing = false;
  });

  // ---------- End ----------
  function endGame() {
    if (!playing) return; // stop it running twice
    playing = false;
    clearInterval(timerId);
    grid.classList.remove("active");

    // Short pause so the player sees their final grid
    setTimeout(() => go("result"), 800);
  }
}
