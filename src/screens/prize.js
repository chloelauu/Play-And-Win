// ============================================================
// prize.js — the Prize screen (shown to staff)
// ------------------------------------------------------------
// Staff need to tell a REAL, UNUSED win from a fake.
//  - Unique code: identifies this win.
//  - Live clock + moving badge: a screenshot can't tick or move.
//  - "Mark as collected": staff tap it after giving the prize,
//    so the same screen can't claim a second prize.
// ============================================================

import { state } from '../state.js'

export function renderPrize(app, go) {
  const gameName = state.game === 'quiz' ? 'Quiz' : 'Colour the Grid'

  // ---------- Already collected ----------
  if (state.redeemed) {
    app.innerHTML = `
      <main class="screen">
        <div class="card prize collected">
          <p class="big-emoji">✅</p>
          <h1>Prize collected</h1>
          <p class="code">${state.prizeCode}</p>
          <p>Thanks for playing!</p>
        </div>
        <button class="btn" id="home">Back to home</button>
      </main>
    `
    app.querySelector('#home').addEventListener('click', () => go('home'))
    return
  }

  // ---------- Winner screen ----------
  app.innerHTML = `
    <main class="screen">
      <div class="card prize">
        <p class="badge">🏆</p>
        <h1>WINNER</h1>
        <p>${gameName}: ${state.score} / ${state.maxScore}</p>
        <p class="code">${state.prizeCode}</p>
        <p class="clock" id="clock"></p>
        <p>Show this screen to a staff member.</p>
      </div>
      <button class="btn staff-btn" id="collect">Staff only: mark as collected</button>
    </main>
  `

  // Live clock, updated every second
  const clockEl = app.querySelector('#clock')
  function tick() {
    clockEl.textContent = new Date().toLocaleTimeString()
  }
  tick()
  const clockId = setInterval(tick, 1000)

  // Staff tap once to arm, tap again to confirm
  // (Avoids a pop-up, and stops the player tapping it by accident.)
  const collectBtn = app.querySelector('#collect')
  let armed = false
  collectBtn.addEventListener('click', () => {
    if (!armed) {
      armed = true
      collectBtn.textContent = 'Tap again to confirm'
      collectBtn.classList.add('armed')
      return
    }
    clearInterval(clockId) // stop the clock before leaving this screen
    state.redeemed = true
    renderPrize(app, go) // redraw as "Prize collected"
  })
}