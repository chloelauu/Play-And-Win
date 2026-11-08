// ============================================================
// state.js — the app's memory
// ------------------------------------------------------------
// One shared object that every screen reads and changes.
// Keeping it in one place means all screens agree on
// what's happening (one "source of truth").
// ============================================================

export const state = {
  screen: 'home',  // 'home' | 'quiz' | 'grid' | 'result' | 'prize'
  game: null,      // 'quiz' | 'points'
  score: 0,
  maxScore: 0,
  prizeCode: null, // set when the player wins
  redeemed: false, // set by staff once the prize is handed over
  sessionId: null, // id of the current play in the data layer
}

// Client rule: a player wins with 80% or more of the max score
// Defined once so both games always use the same rule
export const WIN_RATIO = 0.8

// Rounds up, so the quiz needs 4/5 and the grid needs 20/25
export function pointsToWin(maxScore) {
  return Math.ceil(maxScore * WIN_RATIO)
}

export function isWin() {
  return state.score >= pointsToWin(state.maxScore)
}