// ============================================================
// api.js — the data layer
// ------------------------------------------------------------
// Every read/write of game data goes through this file.
// Demo storage is localStorage (one device only). For the real
// event, only this file changes to call a shared database
// (e.g. Supabase). The rest of the app stays the same.
//
// Stored as events (one row per play, one row per prize view),
// not running totals, matching the planned tables:
//   sessions:    id, game, score, max_score, won, redeemed, created_at, finished_at
//   prize_views: id, session_id, viewed_at
// ============================================================

const KEY = "playAndWin";

// ---------- Storage helpers ----------
function load() {
  try {
    return (
      JSON.parse(localStorage.getItem(KEY)) || { sessions: [], prizeViews: [] }
    );
  } catch {
    // Storage blocked or corrupted: start fresh instead of crashing the game
    return { sessions: [], prizeViews: [] };
  }
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Storage full or blocked: game still works, the play just isn't recorded
  }
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ---------- Writes ----------
// New play started (counts as a player)
export function startSession(game) {
  const data = load()
  const session = {
    id: makeId(),
    game,
    score: null,
    maxScore: null,
    won: null,
    redeemed: false,
    createdAt: new Date().toISOString(),
    finishedAt: null, // stays null if the player quits mid-game
  }
  data.sessions.push(session)
  save(data)
  return session.id
}

// Play finished: save score and win/loss
export function finishSession(id, score, maxScore, won) {
  const data = load()
  const session = data.sessions.find((s) => s.id === id)
  if (!session || session.finishedAt) return // never record the same play twice
  Object.assign(session, { score, maxScore, won, finishedAt: new Date().toISOString() })
  save(data)
}

// Prize screen was shown
export function logPrizeView(sessionId) {
  const data = load()
  data.prizeViews.push({ id: makeId(), sessionId, viewedAt: new Date().toISOString() })
  save(data)
}

// Staff handed over the prize
export function markRedeemed(sessionId) {
  const data = load()
  const session = data.sessions.find((s) => s.id === sessionId)
  if (session) session.redeemed = true
  save(data)
}

// ---------- Reads ----------
// The numbers the client asked for, counted from the stored rows
export function getStats() {
  const { sessions, prizeViews } = load()
  const finished = sessions.filter((s) => s.finishedAt) // quits don't count as losses

  const statsFor = (game) => ({
    picked: sessions.filter((s) => s.game === game).length,
    wins: finished.filter((s) => s.game === game && s.won).length,
    losses: finished.filter((s) => s.game === game && !s.won).length,
  })

  return {
    totalPlayers: sessions.length,
    quiz: statsFor('quiz'),
    points: statsFor('points'),
    prizeViews: prizeViews.length,
    prizesCollected: sessions.filter((s) => s.redeemed).length,
  }
}

export function clearData() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}