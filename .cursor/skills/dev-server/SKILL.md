---
name: dev-server
description: Verify, troubleshoot, and (only if truly necessary) start the Vite dev server. Use whenever the user asks about running the app, reports the page not loading, or when you need to confirm a change still works.
when_to_use:
  - The user reports "page doesn't load" / "nothing happens" / "I don't see my change" — check reachability first.
  - The user asks "how do I start the app?" — walk them through opening the Cursor terminal and running the command.
  - You just finished a code change and want to verify the project still compiles — run `npm run build` (NOT `npm run dev`).
  - The user asks to stop or restart the dev server — walk them through it in their own terminal.
---

# Dev Server

The project uses **Vite**. Default dev-server port is **5173**.

## The contract

**The participant starts the dev server once at the start of the workshop and leaves it running.** It stays open in a dedicated Cursor terminal for the whole session. Vite's Hot Module Reload (HMR) picks up code and style changes automatically — the server does not need to be restarted for normal work.

**As an AI agent, do not start, stop, or restart the dev server yourself during a task.** `npm run dev` is a long-running process: running it in your normal foreground shell will block your next tool call and you will get stuck. Either:

- ask the user to (re)start it in their own terminal (preferred — see the instructions below), or
- as a last resort, start it in **background mode** (see "Last-resort: agent-started dev server").

## Step 1 — Verify the server is reachable

Before doing anything else when the user mentions the app or a visual problem, check whether the dev server is already running:

```bash
curl -fsS -o /dev/null -w "%{http_code}\n" http://localhost:5173/
```

- `200` → server is up. Proceed with the real task.
- Anything else (connection refused, non-200) → server is down. Tell the user:
  > "Dein Dev-Server läuft gerade nicht. Starte ihn in einem Cursor-Terminal mit `npm run dev` — das Terminal muss danach offen bleiben."

Always check reachability first. Do not assume.

## Step 2 — Tell the user how to (re)start the server

When the user needs to start, stop, or restart the dev server, guide them explicitly. Most workshop participants do not know how to open a terminal — spell it out:

### Open a terminal in Cursor

- **Shortcut**: `` Ctrl + ` `` (macOS, Linux, Windows — the backtick key). This opens Cursor's integrated terminal panel.
- **Menu**: `View` → `Terminal`, or `Terminal` → `New Terminal`.
- The terminal opens at the repo root. Confirm by running `pwd` (macOS/Linux) or `cd` (Windows) — it should end in `lead2grow-cursor-workshop`.

### Start

```bash
npm run dev
```

- Vite prints `Local: http://localhost:5173/`.
- **Leave this terminal open for the rest of the workshop.** Closing it kills the server.
- Open a **separate** terminal tab (the `+` icon, or `` Ctrl + Shift + ` ``) for any other commands (like `npm run build`).

### Stop

- In the terminal running `npm run dev`: press `Ctrl + C`.
- Orphaned process on port 5173 (macOS / Linux): `lsof -ti:5173 | xargs kill -9`
- Orphaned process on port 5173 (Windows PowerShell):
  ```powershell
  $pid = (Get-NetTCPConnection -LocalPort 5173).OwningProcess
  Stop-Process -Id $pid -Force
  ```

### Restart

HMR handles almost everything live. A restart is **only** needed when:

- `vite.config.ts` changes.
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` changes.
- `components.json` changes (after `shadcn init` or a major shadcn config edit).
- A new dev dependency that affects startup is installed.

To restart: `Ctrl + C` in the dev-server terminal, then `npm run dev` again.

## Step 3 — Agent's correctness check: `npm run build`

When you (the agent) want to verify that a change is valid, use `npm run build`, not the dev server. It:

- runs `tsc -b && vite build`,
- catches TypeScript errors that HMR silently ignores,
- exits cleanly (no long-running process),
- can safely run in your foreground shell.

A green `npm run build` is the minimum bar for "done".

## Preview built output

```bash
npm run preview
```

Serves the `dist/` folder locally. Useful for sanity-checking the production build. Same long-running caveat as `npm run dev` — tell the user to run it.

## Last-resort: agent-started dev server

If you (the agent) truly must spawn the dev server yourself (e.g. the user explicitly asked you to, or you're running unattended), **never** start it in a blocking foreground shell. Use background mode:

- **Inside Cursor's Shell tool**: call it with `block_until_ms: 0`. The command is detached immediately, output streams to a terminal file you can poll later. Then verify readiness with the `curl` one-liner from Step 1.
- **Plain shell (fallback)**:
  ```bash
  nohup npm run dev > /tmp/vite.log 2>&1 &
  # wait until the port responds
  for i in {1..30}; do curl -fsS http://localhost:5173/ >/dev/null && break; sleep 0.5; done
  ```

Never start a second dev server if one is already bound to port 5173 — check with `curl` first.

## Troubleshooting cheat sheet

| Symptom                                  | First thing to try                                                                                             |
|------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| Page doesn't load                        | `curl -fsS http://localhost:5173/` — if non-200, have the user run `npm run dev` in a Cursor terminal          |
| `EADDRINUSE` / port busy                 | `lsof -ti:5173 \| xargs kill -9` (macOS/Linux) and retry; Windows equivalent above                            |
| Blank page, no console error             | Have the user restart the dev server; check `index.html` has a `#root` div                                     |
| Tailwind classes not applying            | Confirm `@import "tailwindcss"` is at the top of `src/index.css` and the Tailwind Vite plugin is in `vite.config.ts`; then restart the dev server |
| New shadcn component not found           | Confirm the file exists in `src/components/ui/` and the import uses `@/components/ui/<name>`                   |
| `Module not found: @/…`                  | Have the user restart the dev server; verify `resolve.alias["@"]` in `vite.config.ts` and `paths` in `tsconfig.json` / `tsconfig.app.json` |
| TypeScript error only in `npm run build` | `noUnusedLocals` / `noUnusedParameters` are relaxed in this project — the error is a real type error, fix it   |
