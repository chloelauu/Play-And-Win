// ============================================================
// admin.js — staff-only stats page
// ------------------------------------------------------------
// Opened by adding #admin to the URL. Not linked from any
// player screen, since the stats are company data.
// ============================================================

import { getStats, clearData } from '../api.js'

export function renderAdmin(app) {
  const s = getStats()

  app.innerHTML = `
    <main class="screen">
      <header class="card title">
        <h1>Staff stats</h1>
        <p>Data on this device</p>
      </header>

      <table class="card stats">
        <tr><th>Total players</th><td>${s.totalPlayers}</td></tr>
        <tr><th>Picked Quiz</th><td>${s.quiz.picked}</td></tr>
        <tr><th>Picked Colour the Grid</th><td>${s.points.picked}</td></tr>
        <tr><th>Quiz wins / losses</th><td>${s.quiz.wins} / ${s.quiz.losses}</td></tr>
        <tr><th>Grid wins / losses</th><td>${s.points.wins} / ${s.points.losses}</td></tr>
        <tr><th>Prize screen views</th><td>${s.prizeViews}</td></tr>
        <tr><th>Prizes collected</th><td>${s.prizesCollected}</td></tr>
      </table>

      <button class="btn" id="refresh">Refresh</button>
      <button class="btn staff-btn" id="clear">Clear data</button>
      <a class="card" href="#">Back to the game</a>
    </main>
  `

  app.querySelector('#refresh').addEventListener('click', () => renderAdmin(app))
  app.querySelector('#clear').addEventListener('click', () => {
    clearData()
    renderAdmin(app)
  })
}