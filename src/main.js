// ============================================================
// main.js — the controller (entry point of the app)
// ------------------------------------------------------------
// The app is a single page. state.screen says which screen
// to show, and render() draws it inside <div id="app">.
//
// Flow:  tap a button → go('quiz') → state.screen = 'quiz'
//        → render() → the Quiz screen is drawn
// ============================================================
 
import './style.css'
import questions from './data/questions.json'
import { state } from './state.js'
import { renderHome } from './screens/home.js'
import { renderQuiz } from './screens/quiz.js'

// The one element every screen draws into
const app = document.querySelector('#app')

// Switch  to another screen, then redraw
// Every screen change goes through here, so screen switching only happens in one place
function go(screen) {
  state.screen = screen
  render()
}

// Look at state.screen & draw the matching screen
// New screens are added here as the app grows
function render() {
  if (state.screen === 'home') renderHome(app, go)
  else if (state.screen === 'quiz') renderQuiz(app, go)
  else renderComingSoon()
}

// TEMPORARY: placeholder until the quiz and grid are built.
// Lets us test that screen switching works right now.
function renderComingSoon() {
  app.innerHTML = `
    <main class="screen">
      <p class="card">${state.screen} screen coming soon<br>Score: ${state.score} / ${state.maxScore}</p>
      <button class="btn" id="back">Back</button>
    </main>
  `
  document.querySelector('#back').addEventListener('click', () => go('home'))
}

// Draw the first screen (Home) when the page loads.
render()