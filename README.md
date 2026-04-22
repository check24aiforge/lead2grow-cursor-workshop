# Lead2Grow Cursor Workshop — Starter

Starter-Repo für den Workshop. Was du inhaltlich baust, steht auf deiner Briefing-Karte — dieses Repo stellt nur den technischen Unterbau bereit.

## Tech-Stack

- [Vite](https://vitejs.dev/) als Build-Tool
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) für UI-Primitives
- [papaparse](https://www.papaparse.com/) fürs CSV-Parsen

## Setup in 3 Schritten

```bash
git clone <repo-url>
cd lead2grow-cursor-workshop
npm install
npm run dev
```

Die App läuft danach unter <http://localhost:5173>. Fertig.

> **Wichtig:** `npm run dev` ist ein laufender Prozess — das Terminal bleibt die ganze Session offen. Schließen = Server weg. Für andere Befehle (z. B. `npm run build`) öffne ein **zweites** Terminal-Tab (in Cursor: Tastenkürzel `` Ctrl + Shift + ` `` oder das `+`-Icon oben rechts im Terminal-Panel).

### Terminal in Cursor öffnen

- Tastenkürzel: `` Ctrl + ` `` (Backtick — die Taste links von der `1`).
- Alternativ über das Menü: **View → Terminal**.

Voraussetzung: **Node.js ≥ 20** (prüfen mit `node -v`).

## Scripts

| Befehl            | Was passiert                                       |
|-------------------|----------------------------------------------------|
| `npm run dev`     | Dev-Server starten (Hot-Reload)                    |
| `npm run build`   | TypeScript-Check + Produktions-Build nach `dist/` |
| `npm run preview` | Produktions-Build lokal ausprobieren               |
| `npm run lint`    | ESLint über das Projekt laufen lassen              |

## Wo liegt was?

```
src/
├── components/
│   ├── ui/            # shadcn-Primitives (per CLI generiert)
│   └── …              # deine eigenen Komponenten (ShopCard, FilterBar, …)
├── hooks/             # eigene React-Hooks
├── lib/
│   └── utils.ts       # cn()-Helper (von shadcn)
├── App.tsx            # Root-Komponente
├── main.tsx           # Einstiegspunkt
└── index.css          # EINZIGES Stylesheet (Tailwind + Theme)

public/
├── data/              # CSV- / JSON-Dateien
├── logos/             # Logos
├── images/            # Bilder
└── favicon.svg
```

Alles unter `public/` ist direkt erreichbar — `public/data/foo.csv` fetchest du mit `fetch("/data/foo.csv")`, **ohne** `public/` im Pfad.

## Statische Dateien ablegen

Lege deine CSV-Daten unter `public/data/` ab, Bilder unter `public/images/`, Logos unter `public/logos/`. Wie die Dateien heißen und welche Spalten in deinem CSV stehen, entscheidest du (oder die Workshop-Leitung).

## shadcn — neue Komponente hinzufügen

Nie selbst schreiben, immer über die CLI:

```bash
npx shadcn@latest add select
npx shadcn@latest add dialog checkbox badge   # mehrere auf einmal
```

Die neue Datei landet in `src/components/ui/<name>.tsx` und wird mit `@/components/ui/<name>` importiert. Eine Übersicht gängiger Namen findest du im Cursor-Skill `shadcn-add-component`.

## Theme ändern

Die Farben sind absichtlich **violett + gelb** auf warmem Stein-Neutral — ein Platzhalter. Deinen Brand bauen wir im Workshop:

1. Öffne `src/index.css`.
2. Ändere die Werte im `@theme { … }`-Block (`--color-brand`, `--color-highlight`, `--color-surface`, `--color-ink`).
3. Wenn du die shadcn-Primitives (Button etc.) mit-rethemen willst, passe auch `--primary` / `--ring` im `:root`- und `.dark`-Block an.

Alle Komponenten, die `bg-brand`, `text-brand`, `bg-highlight` usw. verwenden, übernehmen die neuen Werte automatisch.

## So redest du mit Cursor

- *"Erklär mir kurz, was in `src/App.tsx` passiert."*
- *"Bau einen Header mit Logo links und einem Button rechts."*
- *"Füg eine shadcn-Select-Komponente hinzu und zeig sie in der App."*
- *"Mach aus den Daten in `public/data/shops.csv` eine Liste von Karten."*

Sei konkret: Sag *was* du sehen willst, nicht *wie* er es bauen soll.

## Wenn etwas kaputt ist

| Problem                              | Schneller Fix                                                                                 |
|--------------------------------------|-----------------------------------------------------------------------------------------------|
| Seite lädt nicht / weiß              | Läuft `npm run dev` noch? In das Terminal mit dem Dev-Server schauen; ggf. neu starten        |
| Port 5173 belegt (macOS/Linux)       | `lsof -ti:5173 \| xargs kill -9` und nochmal `npm run dev`                                   |
| Port 5173 belegt (Windows)           | PowerShell: `Stop-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess -Force`   |
| `node` zu alt                        | Node auf Version ≥ 20 bringen (`nvm install 20` z. B.)                                        |
| Installation hängt / komische Fehler | `rm -rf node_modules package-lock.json && npm install`                                        |
| Cursor reagiert seltsam              | Cursor neu starten                                                                            |
| Tailwind-Klassen greifen nicht       | Im Dev-Server-Terminal `Ctrl+C`, dann `npm run dev`                                           |

## Ordner, die du (meistens) nicht anfassen musst

- `docs/` — Workshop-Briefings (werden von den Presenter:innen gepflegt).
- `.cursor/` — Rules & Skills, die Cursor selbstständig liest.
- `node_modules/`, `dist/` — generiert, gehören nicht ins Repo.
