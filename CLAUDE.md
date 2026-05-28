# md_viewer

Minimalist local Markdown editor. Open, write, save `.md` files — no cloud, no AI, no dependencies.

**Status:** In sviluppo (M0 scaffold completato)
**Owner:** wultimaproject

---

## Parent project

Vedi `../../CLAUDE.md` per regole workspace wultimaproject.

---

## Pickup rapido (nuova sessione)

1. [`docs/ONBOARDING.md`](docs/ONBOARDING.md) — orientamento + contesto prodotto
2. [`docs/PROGRESS.md`](docs/PROGRESS.md) — stato avanzamento
3. [`docs/BACKLOG.md`](docs/BACKLOG.md) — task prossime
4. [`docs/input/`](docs/input/) — materiali forniti dall'utente (3 spec GPT/DeepSeek/Gemini)
5. [`docs/spec/`](docs/spec/) — specifiche tecniche approvate

---

## Stack (confermato)

| Layer | Scelta |
|-------|--------|
| Shell desktop | Tauri 2.x |
| Frontend | SolidJS + TypeScript |
| Editor | CodeMirror 6 (M3) — textarea in M1/M2 |
| Markdown renderer | markdown-it + plugins |
| Sanitizer | DOMPurify |
| Build | Vite |
| Unit tests | Vitest |
| E2E tests | WebDriver.IO + tauri-driver |
| Linting | ESLint + Prettier + Rust clippy |

---

## Roadmap milestone

- **M0** — Scaffold ✅ (struttura, package.json, src-tauri, src/, tests/)
- **M1** — Dual-pane UI base
- **M2** — Live preview con markdown-it
- **M3** — CodeMirror integration
- **M4** — File operations (Rust IPC)
- **M5** — Dirty state + unsaved warning
- **M6** — Toolbar formattazione
- **M7** — Theme light/dark
- **M8** — Split divider ridimensionabile
- **M9** — Polish + packaging unsigned
- **M10** — Distribuzione (GitHub Releases + Gumroad)

---

## Dev commands

```bash
npm install          # prima volta
npm run tauri:dev    # avvia app in dev mode
npm test             # vitest unit tests
npm run tauri:build  # build release (.dmg / .msi)
```

---

## Architettura

3 layer (Clean Architecture):

```
Presentation (SolidJS components)
    ↕
Application (state + services) — src/state/, src/lib/
    ↕ Tauri IPC
Platform (Rust) — src-tauri/src/commands/
```

---

## Decisioni chiave

- **No AI** in MVP e oltre — prodotto volutamente minimalista
- **Unsigned distribution** per ora — utenti vedranno warning OS (documentato in README)
- **Sync-scroll** out of scope MVP — milestone post-release
- **No plugin system**, no multi-tab, no cloud sync

---

## Regole specifiche prodotto

- Nessuna dipendenza remota a runtime — app offline-first
- CSP strict in tauri.conf.json: no img remote, no script external
- DOMPurify su tutto output preview (XSS prevention obbligatoria)
- Validare path lato Rust prima di read/write (path traversal prevention)

---

## Memory

Documenti di memoria specifici al prodotto in `memory/`. Consultare sempre se incerto su decisioni passate.
