// ============================================================
// state.js — the app's memory
// ------------------------------------------------------------
// One shared object that every screen reads and changes.
// Keeping it in one place means all screens agree on
// what's happening (one "source of truth").
// ============================================================

export const state = {
    screen: 'home', // which screen the game is showing
    game: null, // 'quiz' or 'points'
    score: 0,
    maxScore: 0, // highest score player can get in respective games
}