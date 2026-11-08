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
import { state } from './state.js'
import { renderHome } from './screens/home.js'
import { renderQuiz } from './screens/quiz.js'
import { renderGrid } from './screens/grid.js'
import { renderResult } from './screens/result.js'
import { renderPrize } from './screens/prize.js'

// The one element every screen draws into
const app = document.querySelector('#app')

// Switch to another screen, then redraw
// Every screen change goes through here, so screen switching only happens in one place
function go(screen) {
  state.screen = screen
  render()
}

// Look at state.screen and draw the matching screen
function render() {
  if (state.screen === 'home') renderHome(app, go)
  else if (state.screen === 'quiz') renderQuiz(app, go)
  else if (state.screen === 'grid') renderGrid(app, go)
  else if (state.screen === 'result') renderResult(app, go)
  else if (state.screen === 'prize') renderPrize(app, go)
}

// Draw the first screen (Home) when the page loads
render()