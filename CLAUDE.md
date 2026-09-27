# Asia Trip 2026 — Project Instructions

## Trigger: "new confirmation added"

When the user says **"new confirmation added"** (or any close variant like "I added a confirmation", "new PDF added", "new booking"), immediately:

1. Spawn the **trip-maker** agent — it reads the newest PDF in `confirmations/`, extracts all data, and propagates across all files
2. Maker calls the **trip-log-tracer** agent at the end of its run — logs all changes to `CHANGELOG.md` with revert recipes
3. After maker completes, spawn the **trip-checker** agent — it runs all 17 acceptance criteria and reports PASS/FAIL

Do not ask clarifying questions before starting. The maker agent will identify the correct file.

---

## File Roles

| File | Role |
|------|------|
| `trip-data.csv` | **Source of truth** — every booking fact lives here first |
| `confirmations/*.pdf` | **Ground truth** — PDFs override CSV if they conflict |
| `index.html` | Main trip dashboard — derived from CSV |
| `stays.ics` | Calendar export — hotel stays only |
| `pre-read-yun.html` | Yun's pre-read magazine |
| `pre-read-yan.html` | Yan's pre-read magazine (with coffee callouts) |
| `BUGS.md` | Open bug tracker and acceptance criteria |

---

## Data Conventions

- **Airport codes**: always IATA 3-letter (EWR, JFK, ATH, BCN — never spelled out)
- **CSV key prefixes**: `f-` flights · `s-` stays · `a-` activities · `c-` cars
- **Who**: Yan · Yun · Both · Yan+Mom
- **Points programs**: Chase UR · Bonvoy · Amex MR (always name the program)
- **Company flights**: BCG Lodge card bookings are NOT added to the cost ledger — company-expensed
- **Cancelled bookings**: move PDF to `confirmations/_cancelled/` — update all active references in index.html

---

## Known Travelers

- **Yang Yun** (Yun): carolyun24@gmail.com · Chase Sapphire Reserve (CSR) primary
- **Liu Yan** (Yan): Liu.Yan@bcg.com · Amex Platinum ••••2004 · BCG Lodge card for company travel

---

## Resolved Conflicts

**BUG-13 ✅ — ATH→EWR Oct 30 (EIGQSX) cancelled.** Yan keeping Barcelona. Active return: BCN→JFK Nov 2 (IHTZNM/USXNZA).
