// ============================================================
// result.js — the Result screen (shared by both games)
// ------------------------------------------------------------
// Shows the score and whether the player won (80% rule).
// Winners get a short prize code and a button to the Prize
// screen. Everyone else can play again.
// ============================================================

import { state, isWin, pointsToWin } from '../state.js'

// Letters/numbers that are hard to mix up when read aloud
// (no 0/O, 1/I/L), so staff can read the code easily
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

// Make a code like "PW-7K3Q"
function makePrizeCode() {
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
  }
  return 'PW-' + code
}

export function renderResult(app, go) {
  const won = isWin()
  const gameName = state.game === 'quiz' ? 'Quiz' : 'Colour the Grid'

  if (won) {
    // New code for each win; reset "collected" for this new prize
    state.prizeCode = makePrizeCode()
    state.redeemed = false

    app.innerHTML = `
      <main class="screen">
        <div class="card result win">
          <p class="big-emoji">🎉</p>
          <h1>You won!</h1>
          <p>${gameName}: <strong>${state.score} / ${state.maxScore}</strong></p>
        </div>
        <button class="btn" id="prize">Show my prize screen</button>
      </main>
    `
    app.querySelector('#prize').addEventListener('click', () => go('prize'))
  } else {
    app.innerHTML = `
      <main class="screen">
        <div class="card result">
          <p class="big-emoji">💪</p>
          <h1>So close!</h1>
          <p>${gameName}: <strong>${state.score} / ${state.maxScore}</strong></p>
          <p>You needed ${pointsToWin(state.maxScore)} to win.</p>
        </div>
        <button class="btn" id="again">Play again</button>
      </main>
    `
    app.querySelector('#again').addEventListener('click', () => go('home'))
  }
}