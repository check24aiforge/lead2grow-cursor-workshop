---
name: dev-server
description: Start, stop, restart, and verify the Vite dev server. Use whenever the user asks to run the app, check whether it builds, or when finishing a feature and wanting to confirm it works.
when_to_use:
  - The user asks to "start", "run", "stop", or "restart" the dev server.
  - You just finished a change and want to verify the app still runs or still builds.
  - A new package was installed that affects runtime config (`vite.config.ts`, `tsconfig.*`, `components.json`).
  - The user reports "the page is blank" / "nothing loads" and you need to confirm the server is healthy.
---

# Dev Server

The project uses **Vite**. Default dev-server port is **5173**.

## Start

```bash
npm run dev
```

- Prints a local URL (usually `http://localhost:5173`).
- Run in the foreground when you want to tail output, or in the background when the user wants to keep working in the same terminal.
- Before starting, **check whether a dev server is already running** (inspect the terminals folder or run `lsof -ti:5173`). Do not spawn multiple parallel dev servers.
- If port 5173 is busy, Vite auto-increments (5174, 5175, …) and prints the URL it actually bound to. Tell the user that URL.

## Stop

- If running in the foreground: press **Ctrl+C** in the same terminal.
- If orphaned / background: `lsof -ti:5173 | xargs kill -9` (macOS / Linux).

## Restart

Vite's HMR handles almost everything live. You **must** restart the dev server when:

- `vite.config.ts` changes.
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` changes.
- `components.json` changes (after `shadcn init` or a major shadcn config edit).
- Tailwind plugin setup in `vite.config.ts` changes.
- A new dependency is installed that affects startup (rare — usually HMR picks it up).

HMR handles: component edits, style edits, `index.css` edits (including `@theme` changes), adding new files.

## Build check

Before declaring a feature "done":

```bash
npm run build
```

This runs `tsc -b && vite build`. It catches TypeScript errors that HMR happily ignores. **A green `npm run build` is the minimum bar for "done".**

## Preview built output

```bash
npm run preview
```

Serves the `dist/` folder locally so you can sanity-check the production build.

## Troubleshooting cheat sheet

| Symptom                                | First thing to try                                     |
|----------------------------------------|--------------------------------------------------------|
| `EADDRINUSE` / port busy               | `lsof -ti:5173 \| xargs kill -9` and retry            |
| Blank page, no console error           | Restart dev server; check `index.html` has `#root` div |
| Tailwind classes not applying          | Confirm `@import "tailwindcss"` is at the top of `src/index.css` and the Tailwind Vite plugin is in `vite.config.ts` |
| New shadcn component not found         | Confirm the file exists in `src/components/ui/` and the import uses `@/components/ui/<name>` |
| `Module not found: @/…`                | Restart dev server; verify `resolve.alias["@"]` in `vite.config.ts` and `paths` in `tsconfig.json` / `tsconfig.app.json` |
| TypeScript error only in `npm run build` | `noUnusedLocals` / `noUnusedParameters` are relaxed in this project — the error is a real type error, fix it |
