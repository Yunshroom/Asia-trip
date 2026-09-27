# Asia Trip 2026 — Change Log

All changes to trip files are recorded here with old values and revert recipes.
Each entry is appended chronologically. To revert a change, apply the inverse of the Revert recipe.

---

## [2026-09-26 20:50] · maker-pdf · trip-data.csv, index.html, pre-read-yun.html, pre-read-yan.html, BUGS.md, confirmations/

**Source:** `Gmail - Get ready! Your trip is almost here.pdf` (Chase Travel reminder email received Sep 25, 2026 · Gmail export)  
**Rationale:** Sixt car rental was reboooked with extended drop-off. New PDF is ground truth — it shows drop-off **Oct 6 12:00** (was Oct 5 20:00), new Chase conf **CN961341228250** (was CN961135523748), new Sixt counter conf **9735738700** (was 9735700791), new Chase Trip ID **1019420392** (was 1019389645), and cancellation free until **Sep 30 07:00** (was Sep 29). Price unchanged at $454.25. This extension resolves ADVISORY-02 (Sixt/hotel logistics conflict) — rental now covers Oct 6 hotel checkout and leaves 2.5 hr buffer before 14:50 YYC→BKK departure.

### Changes

| File | Key / Location | Old Value | New Value |
|------|---------------|-----------|-----------|
| trip-data.csv | `c-sixt-conf` | `CN961135523748` | `CN961341228250` |
| trip-data.csv | `c-sixt-sixt` | `9735700791` | `9735738700` |
| trip-data.csv | `c-sixt-dropoff` | `Oct 5 20:00` | `Oct 6 12:00` |
| trip-data.csv | `c-sixt-cancel` | `Free cancel until Sep 29` | `Free cancel until Sep 30 07:00` |
| index.html | Tracker tr-detail (Sixt row) | `Oct 2 07:00 pickup → Oct 5 drop-off · Free cancel before pickup` | `Oct 2 07:00 pickup → Oct 6 12:00 drop-off · Free cancel until Sep 30 07:00` |
| index.html | Itinerary card ic-hotel-cancel | `Free cancel until Sep 29` | `Free cancel until Sep 30 07:00` |
| index.html | Itinerary card ic-hotel-span | `Oct 2–5 · 4 days` | `Oct 2–6 · 5 days` |
| index.html | Oct 2 day plan conf number | `CN961135523748` | `CN961341228250` |
| index.html | Oct 5 day plan body | `⚠ Note: Sixt rental booked to drop off at YYC today at 20:00...` advisory | `Car drop-off extended to Oct 6 — no logistics issues tonight.` |
| index.html | Oct 6 day plan body | `drop Sixt at YYC airport (if extended to Oct 6)` | `drop Sixt at YYC airport by 12:00 (conf CN961341228250)` |
| index.html | Ledger ldg-route-sub | `Oct 2 07:00 pickup → Oct 5 drop-off YYC Airport · 4 days` | `Oct 2 07:00 pickup → Oct 6 12:00 drop-off YYC Airport · 5 days` |
| index.html | Ledger ldg-cancel | `Free cancel before Oct 2, 07:00 pickup` | `Free cancel until Sep 30 07:00` |
| index.html | Ledger ldg-badge | `✓ Free cancel before pickup` | `✓ Free cancel until Sep 30` |
| index.html | Ledger booking ref span | `CN961135523748` | `CN961341228250 · Chase Travel · Trip 1019420392` |
| index.html | Ledger Drop-off detail | `Oct 5 · YYC Calgary Airport` | `Oct 6 12:00 · YYC Calgary Airport` |
| index.html | Ledger cancel policy span | `Free cancel before Oct 2 07:00 pickup` | `Free cancel until Sep 30 07:00` (+ updated after-pickup text) |
| pre-read-yun.html | car-row span | `Oct 2 07:00 pickup YYC → Oct 5 20:00 drop-off · Conf CN961135523748` | `Oct 2 07:00 pickup YYC → Oct 6 12:00 drop-off · Conf CN961341228250` |
| pre-read-yun.html | Booking table Sixt dates | `Oct 2–5` | `Oct 2–6` |
| pre-read-yun.html | Booking table Sixt conf | `CN961135523748` | `CN961341228250` |
| pre-read-yan.html | car-row span | `Oct 2 07:00 pickup YYC → Oct 5 20:00 drop-off · Conf CN961135523748` | `Oct 2 07:00 pickup YYC → Oct 6 12:00 drop-off · Conf CN961341228250` |
| pre-read-yan.html | Booking table Sixt dates | `Oct 2–5` | `Oct 2–6` |
| pre-read-yan.html | Booking table Sixt conf | `CN961135523748` | `CN961341228250` |
| BUGS.md | ADVISORY-02 status | `🔴 Open — requires Yun's decision` | `✅ Fixed Sep 26 — Sixt extended to Oct 6 12:00 · new conf CN961341228250` |
| BUGS.md | Summary line | `0 open bugs · 1 open advisory · 27 items fixed total` | `0 open bugs · 0 open advisories · 28 items fixed total` |
| confirmations/ | PDF filename | `Gmail - Get ready! Your trip is almost here.pdf` | `10-02 - 🚗 - Yun - Sixt-CX5-Calgary - CN961341228250.pdf` |

### Revert recipe

| File | Find | Replace with |
|------|------|-------------|
| trip-data.csv | `c-sixt-conf,CN961341228250` | `c-sixt-conf,CN961135523748` |
| trip-data.csv | `c-sixt-sixt,9735738700` | `c-sixt-sixt,9735700791` |
| trip-data.csv | `c-sixt-dropoff,Oct 6 12:00` | `c-sixt-dropoff,Oct 5 20:00` |
| trip-data.csv | `c-sixt-cancel,Free cancel until Sep 30 07:00` | `c-sixt-cancel,Free cancel until Sep 29` |
| index.html | `Oct 6 12:00 drop-off · Free cancel until Sep 30 07:00` (tracker) | `Oct 5 drop-off · Free cancel before pickup` |
| index.html | `Free cancel until Sep 30 07:00` (ic-hotel-cancel) | `Free cancel until Sep 29` |
| index.html | `Oct 2–6 · 5 days` (ic-hotel-span) | `Oct 2–5 · 4 days` |
| index.html | `CN961341228250` (Oct 2 day plan) | `CN961135523748` |
| index.html | Oct 5 day plan — restore `⚠ Note: Sixt rental booked to drop off at YYC today at 20:00...` advisory text | current clean text |
| index.html | Oct 6 day plan — restore `(if extended to Oct 6)` phrasing | current definitive text |
| index.html | `Oct 6 12:00 drop-off YYC Airport · 5 days` (ldg-route-sub) | `Oct 5 drop-off YYC Airport · 4 days` |
| index.html | `CN961341228250 · Chase Travel · Trip 1019420392` (ldg booking ref) | `CN961135523748` |
| index.html | `Oct 6 12:00 · YYC Calgary Airport` (ldg drop-off) | `Oct 5 · YYC Calgary Airport` |
| pre-read-yun.html | `Oct 6 12:00 drop-off · Conf CN961341228250` | `Oct 5 20:00 drop-off · Conf CN961135523748` |
| pre-read-yun.html | `Oct 2–6` + `CN961341228250` (booking table) | `Oct 2–5` + `CN961135523748` |
| pre-read-yan.html | same as Yun | same old values |
| confirmations/ | rename PDF back to | `Gmail - Get ready! Your trip is almost here.pdf` |
| BUGS.md | restore ADVISORY-02 status to `🔴 Open` | — |

### Notes
- Price unchanged at $454.25 — new confirmation PDF does not display a price; assumed same rate applies.
- Drop-off Oct 6 12:00 → hotel checkout 11:00 → drive 1.5 hrs → YYC 12:30 → fly 14:50. Buffer is 2h20m to flight. ADVISORY-02 fully resolved.
- New Chase Trip ID 1019420392 (old: 1019389645) added to ledger booking ref for reference; not stored as a separate CSV key.
- Old PDF `Gmail - Get ready! Your trip is almost here.pdf` renamed to `10-02 - 🚗 - Yun - Sixt-CX5-Calgary - CN961341228250.pdf`.

---

## [2026-09-26 17:01] · checker-qa · index.html, BUGS.md

**Source:** Manual QA pass against BUGS.md (BUG-01 through BUG-11 + Advisory)  
**Rationale:** 12 bugs were identified across the trip dashboard ranging from wrong hotel names in the calendar to stale "Not yet booked" badges on confirmed flights. All were corrected against `trip-data.csv` as source of truth and the original confirmation PDFs.

### Changes

| File | Key / Location | Old Value | New Value |
|------|---------------|-----------|-----------|
| index.html | Oct 7 calendar ce-hotel | `Public House Bangkok · check in` | `Eastin Grand Phayathai · check in` |
| index.html | Oct 8 calendar ce-hotel | `Public House Bangkok` | `Eastin Grand Phayathai` |
| index.html | Eastin Grand ic-hotel-cancel (line ~3417) | `Free cancel until Oct 4, 2026 · #88511655` | `Non-refundable · Conf 9103484418003` |
| index.html | Eastin Grand ic-badge (line ~3420) | `55,000 Bonvoy ✓ · Conf #88511655` | `48,871 Amex MR (Yan ••••2004) · Conf #9103484418003` |
| index.html | Eastin Grand maps href (line ~3422) | `https://maps.google.com/?q=249+Soi+Sukhumvit+31...` | `https://maps.google.com/?q=18+Phaya+Thai+Road,+Ratchathewi,+Bangkok...` |
| index.html | Eastin Grand maps clipboard (line ~3423) | `249 Soi Sukhumvit 31, Khlong Tan Nuea, Bangkok, Thailand 10110` | `18 Phaya Thai Road, Ratchathewi, Bangkok, Thailand 10400` |
| index.html | Yun points balance Bonvoy row | `57,447 ← 55K used for BKK` | `112,447` (green, data-trip=pts-bonvoy-remaining) |
| index.html | Nov 2 calendar flight destination | `BCN → EWR · Both` | `BCN → JFK · Both` |
| index.html | Yan points card Amex MR note | `1:1 transfer · biz class BCN→EWR` | `1:1 transfer · biz class BCN→JFK` |
| index.html | AKI Hotel HKG — added ic-hotel-acts div (after ic-badge) | `[div absent]` | `ic-hotel-acts with Maps link to 239 Jaffe Road, Wan Chai` |
| index.html | Tracker BKK detail text | `⚠ Cancel Bonvoy 88511655 before Oct 4` | `✓ Public House Bangkok cancelled · 55K pts returned` |
| index.html | BKK→USM flight strip badge | `<span class="badge badge-needed">Not yet booked</span>` | `[removed]` |
| index.html | HKG→SHA flight strip badge | `<span class="badge badge-needed">Not yet booked</span>` | `[removed]` |
| index.html | tip-box tense | `Bonvoy Bangkok being cancelled — 55K pts returning` | `Bonvoy Bangkok cancelled — 55K pts returned` |
| index.html | Calgary ledger badge | `<span class="ldg-badge ldg-badge-ok">✓ Free cancel 24h before</span>` | `<span class="ldg-badge ldg-badge-no">⚠ Non-refundable</span>` |
| index.html | Calgary tracker detail | `Oct 1–2 · 1 nt · $211/nt · Free cancel 24h` | `Oct 1–2 · 1 nt · $211/nt · Non-refundable` |
| index.html | ART.hammershoi (JS object) | `[no barcelona key]` | `barcelona: 'images/athens_h.png'` |
| index.html | ART.pissarro (JS object) | `[no barcelona key]` | `barcelona: 'images/athens_p.png'` |
| index.html | Scenario A — added ATH↔MLO labeled row | `[row absent — deduction silent]` | `Less: Yan paid ATH↔MLO · SKY Express · Yun's half — −$146.65` |

### Revert recipe

| File | Find | Replace with |
|------|------|-------------|
| index.html | `Eastin Grand Phayathai · check in` (Oct 7 cal) | `Public House Bangkok · check in` |
| index.html | `Eastin Grand Phayathai` (Oct 8 cal, inside ce-hotel span) | `Public House Bangkok` |
| index.html | `cancel-warn"><i class="ri-error-warning-line"></i> Non-refundable · Conf 9103484418003` | `ri-shield-check-line"></i> Free cancel until Oct 4, 2026 · #88511655` |
| index.html | `48,871 Amex MR (Yan ••••2004) · Conf #9103484418003` (ic-badge) | `<span data-trip="bangkok-yun-points-used">55,000</span> Bonvoy ✓ · Conf #<span data-trip="bangkok-yun-confirmation">88511655</span>` |
| index.html | `18+Phaya+Thai+Road` (Maps href) | `249+Soi+Sukhumvit+31,+Khlong+Tan+Nuea,+Bangkok,+Thailand+10110` |
| index.html | `pts-bonvoy-remaining">112,447` | `57,447 <span style="font-size:10px;color:var(--muted);">← 55K used for BKK</span>` |
| index.html | `BCN → JFK · Both` (Nov 2 cal) | `BCN → EWR · Both` |
| index.html | `biz class BCN→JFK` | `biz class BCN→EWR` |
| index.html | `ic-hotel-acts` div block with 239 Jaffe Road | `[delete the entire div]` |
| index.html | `✓ Public House Bangkok cancelled · 55K pts returned` (tr-detail) | `⚠ Cancel Bonvoy 88511655 before Oct 4` |
| index.html | `ldg-badge-no">⚠ Non-refundable` (Calgary ledger badge) | `ldg-badge-ok">✓ Free cancel 24h before` |
| index.html | `Oct 1–2 · 1 nt · $211/nt · Non-refundable` (Calgary tracker) | `Oct 1–2 · 1 nt · $211/nt · Free cancel 24h` |
| index.html | `barcelona: 'images/athens_h.png'` (ART.hammershoi) | `[delete line]` |
| index.html | `barcelona: 'images/athens_p.png'` (ART.pissarro) | `[delete line]` |
| index.html | `Less: Yan paid ATH↔MLO · SKY Express · Yun's half` row | `[delete the entire div row]` |
| index.html | `Bonvoy Bangkok cancelled — 55K pts returned` (tip-box) | `Bonvoy Bangkok being cancelled — 55K pts returning` |

### Notes
- BUG-11 (Barcelona in ART): fallback uses Athens painting — if a Barcelona-specific painting is ever added, update both `barcelona` keys to `images/barcelona_h.png` / `images/barcelona_p.png`
- Advisory ATH↔MLO row: the −$146.65 value in the Scenario A row is cosmetic only; the underlying JS calculation already included it — no JS changes needed
- All 12 bugs + advisory are now marked ✅ in BUGS.md

---

## [2026-09-26 16:54] · conflict-resolution · trip-data.csv, confirmations/

**Source:** User decision — Yan keeping Barcelona (BCN→JFK Nov 2 active; ATH→EWR Oct 30 cancelled)  
**Rationale:** BUG-13 — Yan had two incompatible return flights from Europe. ATH→EWR (EIGQSX) departs Oct 30 but Yan flew ATH→BCN Oct 29 and has Barcelona hotel Oct 29–Nov 2. User confirmed: keep Barcelona, cancel ATH→EWR.

### Changes

| File | Key / Location | Old Value | New Value |
|------|---------------|-----------|-----------|
| trip-data.csv | f-ath-ewr block (11 rows) | `f-ath-ewr-flight,A3 3415` … (full block) | `f-ath-ewr-status,CANCELLED,A3 3415 ATH→EWR Oct 30 — superseded by BCN→JFK Nov 2 · PDF in _cancelled/` |
| confirmations/ | ATH-EWR PDF location | `confirmations/10-30 - ✈️ - Yan-company - ATH-EWR - EIGQSX.pdf` | `confirmations/_cancelled/10-30 - ✈️ - Yan-company - ATH-EWR - EIGQSX.pdf` |

### Revert recipe

| File | Find | Replace with |
|------|------|-------------|
| trip-data.csv | `f-ath-ewr-status,CANCELLED,...` | Restore original 11-row block (see git history or PDF) |
| confirmations/_cancelled/ | Move PDF back to | `confirmations/` root |

### Notes
- If Yan changes plan and wants to revert to ATH→EWR: restore the 11 CSV rows AND check if BCN→JFK AM2LKL (Yun's return) needs rebooking separately

---

## [2026-09-26 20:17] · maker-pdf · trip-data.csv, index.html, stays.ics, pre-read-yun.html, pre-read-yan.html, confirmations/

**Source:** `Gmail - Otter Hotel, 1000 600 Banff Ave, Banff, AB, T1L1H8 Canada, Sat, Oct 3 - Tue, Oct 6(Itinerary #72075854361589).pdf`  
**Rationale:** New confirmation PDF added for Otter Hotel Banff. PDF is ground truth — it shows **3 nights (Oct 3–6)** and **CA$2,187.75**. All files previously showed 2 nights (Oct 3–5) and CA$1,485.67 — inconsistent with the actual booking. PDF renamed to follow project naming convention.

### Changes

| File | Key / Location | Old Value | New Value |
|------|---------------|-----------|-----------|
| trip-data.csv | `s-banff-checkout` | `Oct 5` | `Oct 6` |
| trip-data.csv | `s-banff-cancel` | `Free cancel until Sep 30` | `Free cancel until Sep 30 18:00 (property local time); after: first night + taxes; no-show: up to 100%` |
| stays.ics | Banff VEVENT DTEND | `DTEND;VALUE=DATE:20261005` | `DTEND;VALUE=DATE:20261006` |
| stays.ics | Banff VEVENT DESCRIPTION price | `CA$1,485.67` | `CA$2,187.75` |
| index.html | Tracker row Banff tr-detail | `Oct 3–5 · 2 nts · CA$656/nt` | `Oct 3–6 · 3 nts · CA$644/nt` |
| index.html | Itinerary card Banff ic-hotel | `Oct 3–5 · 2 nights` | `Oct 3–6 · 3 nights` |
| index.html | Ledger route-sub checkout | `Oct 5 11:00 · 2 nights · CA $656/nt` | `Oct 6 11:00 · 3 nights · CA $644/nt` |
| index.html | Ledger rate detail | `CA $656.10/nt avg` | `CA $644.10/nt avg` |
| index.html | Ledger original charge | `CA$1,485.67 (2 nts + fee + tax)` | `CA$2,187.75 (3 nts avg CA$644.10 + CA$38.65 fee + CA$216.80 tax)` |
| index.html | Ledger `data-usd` Banff row | `data-usd="1049.24"` | `data-usd="1545.29"` |
| index.html | Oct 5 calendar cell | `[no hotel event]` | `Otter Hotel · Banff` ce-hotel event added |
| pre-read-yun.html | Banff hotel-meta | `Oct 3–5 · 2 nights` | `Oct 3–6 · 3 nights` |
| pre-read-yun.html | Banff footnote price | `CA$1,485.67` | `CA$2,187.75` |
| pre-read-yun.html | Booking table Banff row | `Oct 3–5` | `Oct 3–6` |
| pre-read-yan.html | (same 3 changes as Yun's) | same old values | same new values |
| confirmations/ | PDF filename | `Gmail - Otter Hotel...Itinerary #72075854361589.pdf` | `10-03 - 🏨 - Both - OtterHotelBanff - 72075854361589.pdf` |

### Revert recipe

| File | Find | Replace with |
|------|------|-------------|
| trip-data.csv | `s-banff-checkout,Oct 6` | `s-banff-checkout,Oct 5` |
| trip-data.csv | `s-banff-cancel,Free cancel until Sep 30 18:00...` | `s-banff-cancel,Free cancel until Sep 30` |
| stays.ics | `DTEND;VALUE=DATE:20261006` (Banff event) | `DTEND;VALUE=DATE:20261005` |
| stays.ics | `CA$2,187.75` in Banff DESCRIPTION | `CA$1,485.67` |
| index.html | `data-usd="1545.29"` (banff-yun-amount-paid) | `data-usd="1049.24"` |
| index.html | `Oct 3–6 · 3 nts · CA$644/nt` (tracker) | `Oct 3–5 · 2 nts · CA$656/nt` |
| index.html | `Oct 6 11:00 · 3 nights · CA $644/nt` (ledger) | `Oct 5 11:00 · 2 nights · CA $656/nt` |
| index.html | `CA$2,187.75` (ledger charge) | `CA$1,485.67` |
| index.html | Oct 5 cal-event ce-hotel Otter Hotel row | `[delete the span]` |
| pre-read-*.html | `Oct 3–6 · 3 nights` (Banff) | `Oct 3–5 · 2 nights` |
| pre-read-*.html | `CA$2,187.75` (Banff footnote) | `CA$1,485.67` |
| pre-read-*.html | `Oct 3–6` (booking table) | `Oct 5` |
| confirmations/ | Rename PDF back | `Gmail - Otter Hotel...Itinerary #72075854361589.pdf` |

### Notes
- Ledger USD display was estimated at CA$2,187.75 ÷ 1.416 ≈ $1,545.29. All derived totals (ldg-stay-cat, grand total, Scenario A/B) are computed dynamically by JS from data-usd attributes — no hardcoded totals needed.
- **⚠ New conflict discovered:** Sixt rental (CN961135523748) confirmed drop-off Oct 5 20:00 per original PDF. Now that hotel checkout is Oct 6, there is a logistics gap — flagged as ADVISORY-02 in BUGS.md. Sixt must be extended OR alternative transport booked for Oct 6 Banff→YYC.
- The Oct 5 day-plan text in index.html says "Checkout Otter Hotel by 11am" — this is now stale (checkout is Oct 6). The maker did not update this body text; it should be reviewed.
