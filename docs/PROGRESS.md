# PROGRESS — md_viewer

Stato avanzamento del progetto.

**Ultima modifica:** 2026-05-23  
**Sessione corrente:** struttura iniziale  

---

## Macro-fasi

| Fase | Stato | Note |
|------|-------|------|
| **0. Analisi brief utente** | ⏳ In attesa | Utente fornisce materiali in `docs/input/` |
| **1. Specifiche tecniche** | ⏳ Da iniziare | Dipende da fase 0 |
| **2. Sviluppo** | ⏳ Da iniziare | Dipende da fase 1 |
| **3. Test + Launch** | ⏳ Da iniziare | Dipende da fase 2 |

---

## Step completati

### ✅ Setup struttura

- [x] Cartelle create (docs/input, docs/spec, src, memory, output)
- [x] File skeleton (CLAUDE.md, README.md, ONBOARDING.md, PROGRESS.md, BACKLOG.md)
- [x] .gitignore
- [x] Repository git inizializzato (pending)

---

## Step in corso

Nessuno — in attesa di input utente.

---

## Step bloccati / in attesa

| Task | Bloccata da | Azione richiesta |
|------|-------------|------------------|
| Definire scope + stack | Input utente | Utente carica materiali in `docs/input/` |
| Creare specifiche | Scope definito | Dipende da fase precedente |
| Avviare sviluppo | Specifiche approvate | Dipende da fase precedente |

---

## Prossimi step (quando sbloccato)

1. Utente carica materiali in `docs/input/` (brief, wireframe, requisiti, screenshot, ecc.)
2. Claude legge materiali → propone specifiche tecniche in `docs/spec/`
3. Utente approva specifiche
4. Inizio sviluppo vero
5. Update BACKLOG con task concrete

---

## Note

- Progetto appena creato: nessun codice sorgente ancora
- Stack TBD (dipende dall'uso case che utente descriverà)
- Memory locale: `memory/` (empty per ora)
