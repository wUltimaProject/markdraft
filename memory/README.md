# Memory — md_viewer

Documenti di memoria Claude specifici a questo prodotto.

Ogni memoria è un file markdown con frontmatter (vedi format sotto).

---

## Quando creare memoria

- Decisioni ricorrenti di design
- Pattern che si ripetono
- Feedback utente confermato su come lavorare
- Contesto che è difficile derivare dal codice
- Vincoli specifici del progetto

---

## Cosa NON salvare

- Codice (va nei file sorgente)
- Contenuto git history (vai nel repo)
- Task progress (va in PROGRESS.md e BACKLOG.md)
- Cose che cambiano spesso (volatile)

---

## Formato file memory

```markdown
---
name: <kebab-case-slug>
description: <one-line summary>
metadata:
  type: project | feedback | reference
---

<contenuto della memoria>

**Why:** [perché questa memoria è importante]
**How to apply:** [come usarla concretamente]
```

---

**Index locale:** (vuoto, populate quando memorie vengono create)
