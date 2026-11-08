# Play & Win: starter project

A blank app for the Ransack take-home. See the **[client brief](client-brief.pdf)** for what to build.

> **The data collection part of the brief is optional.** Get the games working first. If you have time, store the data however you like (e.g. `localStorage` or a free database) and explain your choice in your notes.

## Setup

1. Click **Use this template → Create a new repository** and make it **public**. Please don't fork. Email us the link to your repo as soon as you've created it, so we can follow your progress.
2. Clone your new repo and install [Node.js](https://nodejs.org) 20.19 or newer.
3. In the project folder, run:

   ```bash
   npm install
   npm run dev
   ```

4. Open `http://localhost:5173`. You should see **"Setup works!"**.

## Testing on mobile

Use either option. Testing on a real phone is best if you can.

**Option A: your phone**

1. Run `npm run host` instead of `npm run dev`.
2. On a phone connected to the **same Wi-Fi**, open the **Network** address it prints (e.g. `http://192.168.1.23:5173`).
3. Can't connect? On Windows, allow Node.js through the firewall. Some Wi-Fi networks block this, so try your phone's hotspot instead.

**Option B: browser developer tools**

1. With `npm run dev` running, open the app in Chrome or Edge.
2. Press **F12** (Mac: **Cmd + Option + I**), then click the **phone/tablet icon** (or press **Ctrl + Shift + M**).
3. Pick a phone (e.g. iPhone 14) from the dropdown at the top.

## What's inside

```
client-brief.pdf         What the client wants
public/bg.png            Background image
src/main.js              App entry point (placeholder screen)
src/style.css            Global styles
src/data/questions.json  The 5 quiz questions
```

Each question has an `answerIndex`: the position of the correct option, counting from 0.

```json
{ "question": "Which of these is a fruit?", "options": ["Carrot", "Tomato"], "answerIndex": 1 }
```

You can use any framework or library, as long as `npm install` and `npm run dev` work.

## Your notes

Replace this section before you submit.

## Your notes

- **What I prioritised, and why:**
  I first prioritised making sure both games worked fully, since they are what players see and are the core of the brief. Next was the prize screen, because it gives out real prizes, so staff must be able to tell a real, unused win from a fake or a screenshot. Data collection came last, as the brief marked it optional. I saved one row per play so the client's counts stay accurate, even when phones finish at the same time. The data is stored in localStorage, so the app runs with just `npm install` and `npm run dev`, with no keys to share. All data code is in `src/api.js`, so moving to a shared database later only changes that one file. Staff stats are at `http://localhost:5173/#admin`.

- **What I left out or didn't finish, and why:**
  - **Native app (Android Studio / Unity):** the brief asks for a mobile web-app, so players can open it straight from a QR code without installing anything.
  - **Settings page:** the app has nothing players need to change, so it would be an empty screen.
  - **Player stats page:** the stats are company data, so they're on a hidden staff `#admin` page instead.
  - **Two sub-games in the points game (scavenger hunt + colouring):** it would make "which game was picked" unclear in the stats, and colouring has no fixed max score for the 80% rule.
  - **Multiplayer colouring:** sharing one board means no single player can colour 80% of it, so the win rule breaks, and it also needs lobbies, which wouldn't fit in 4 hours.
  - **Lobbies by GPS radius:** everyone is already at the same event and GPS is unreliable indoors, so a QR code per booth is a simpler way to group nearby players.
  - **Separate themes for kids, adults and elderly:** choosing an age group adds an extra step before playing, while one design with big buttons, short text and icons already works for all ages.
  - **Icon library (Font Awesome):** emoji look clear enough and need no extra download, which matters on weak carnival signal.
  - **Shared database (Supabase):** localStorage was chosen instead because the README allows any storage, and it runs with just `npm install` and `npm run dev` with no keys to set up, though a real event would need a shared database since localStorage only counts plays on one phone.

- **Time planned vs. time spent:**
  - Planned: about 4 hours. Setup 15m, app shell + home 30m, quiz 35m, grid game 45m, result + prize 30m, data 40m, phone test + README 35m.
  - Spent: setup ~20m, app shell + home ~30m, quiz ~50m, grid game ~20m, result + prize ~15m, data ~25m, phone test + README ~30m. About 3h 10m in total.
  - The quiz ran over because `state` was undefined in the quiz file, which crashed the screen. The home screen had a silent typo (`innterHTML`) that showed no console error, so it took time to find.

- **How I used AI** (and one suggestion I changed or didn't use):
  - Planning: talked through the brief, architecture, database design and critical points with Claude, then cut ideas that didn't fit the brief or the time limit.
  - Coding: AI drafted code block by block. I read through it, tested each block in the browser and on phone view, and committed after each one.
  - Debugging: used AI to narrow down why the home screen was blank (the typo) and why the quiz crashed (state was undefined).
  - A suggestion I didn't use: AI suggested cutting the grid timer to about 6 seconds, since dragging makes it easy. I kept 20 seconds for a family event with young kids and older players. It's one constant, so it can be tuned after testing.

- **Anything I'm unsure about:**
  - How strict the prize screen should be against cheating (screenshots, refreshing, faking a win). A page refresh returns to Home; "collected" is saved but not re-checked yet.
  - Whether 20 seconds is the right difficulty, so prizes don't run out too fast.