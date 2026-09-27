# Asia Trip 2026 — Bug Tracker & Acceptance Criteria

**Scope:** `index.html` (main trip dashboard)  
**Audit date:** Sep 15, 2026  
**Fixed date:** Sep 26, 2026  
**Status key:** 🔴 Open · 🟡 In progress · ✅ Fixed

---

## P0 — Incorrect Information

---

### BUG-01 · Calendar shows cancelled hotel on Oct 7–8
**File:** `index.html`  
**Was:** Calendar entries read "Public House Bangkok · check in" (Oct 7) and "Public House Bangkok" (Oct 8)  
**Fix:** Both cells now read "Eastin Grand Phayathai · check in" and "Eastin Grand Phayathai"  
**Status:** ✅ Fixed Sep 26

---

### BUG-02 · Eastin Grand badge incorrectly shows "55,000 Bonvoy ✓"
**File:** `index.html`  
**Was:** Badge read `55,000 Bonvoy ✓ · Conf #88511655`. Cancel line showed "Free cancel until Oct 4 · #88511655". Maps link pointed to Public House Bangkok (Sukhumvit Soi 31).  
**Fix:** Badge now reads `48,871 Amex MR (Yan ••••2004) · Conf #9103484418003`. Cancel line shows `Non-refundable · Conf 9103484418003`. Maps updated to Eastin Grand address (18 Phaya Thai Rd).  
**Status:** ✅ Fixed Sep 26

---

### BUG-03 · Points balance: contradictory Bonvoy note
**File:** `index.html`  
**Was:** Line showed "57,447 ← 55K used for BKK" while note below read "→ 55K returned from BKK · free for future". Directly contradictory.  
**Fix:** Bonvoy balance now shows correct post-return value `112,447` (green). Stale "55K used for BKK" annotation removed.  
**Status:** ✅ Fixed Sep 26

---

### BUG-04 · Return flight calendar entry shows EWR instead of JFK
**File:** `index.html`  
**Was:** Nov 2 calendar entry read "BCN → EWR · Both". Yan's points card also said "biz class BCN→EWR".  
**Fix:** Calendar now reads "BCN → JFK · Both". Points card note updated to "BCN→JFK".  
**Status:** ✅ Fixed Sep 26

---

## P1 — Stale / Misleading UI

---

### BUG-05 · AKI Hotel Hong Kong card missing Google Maps link
**File:** `index.html`  
**Was:** AKI Hotel Hong Kong card had no `ic-hotel-acts` div — no map-pin button, no copy button.  
**Fix:** Added `ic-hotel-acts` div with map-pin (Google Maps → 239 Jaffe Road, Wan Chai) and copy-address button. Consistent with all other hotel cards.  
**Status:** ✅ Fixed Sep 26

---

### BUG-06 · Stale "Cancel Bonvoy before Oct 4" tracker warning
**File:** `index.html`  
**Was:** Tracker detail read "⚠ Cancel Bonvoy 88511655 before Oct 4" — action already completed.  
**Fix:** Now reads "✓ Public House Bangkok cancelled · 55K pts returned"  
**Status:** ✅ Fixed Sep 26

---

### BUG-07 · "Not yet booked" badge on confirmed BKK→USM flight
**File:** `index.html`  
**Was:** PG 165 BKK→USM strip showed `badge-needed` "Not yet booked" despite having conf ref CKWMQE.  
**Fix:** Stale badge removed. Strip shows only the confirmed `Both · CKWMQE ✓` badge.  
**Status:** ✅ Fixed Sep 26

---

### BUG-08 · "Not yet booked" badge on confirmed HKG→SHA flight
**File:** `index.html`  
**Was:** MU 722 HKG→SHA strip showed `badge-needed` "Not yet booked" despite having conf ref PFTV0J.  
**Fix:** Stale badge removed. Strip shows only the confirmed flight info.  
**Status:** ✅ Fixed Sep 26

---

### BUG-09 · Tip-box: pending tense for Bonvoy return
**File:** `index.html`  
**Was:** "Bonvoy Bangkok being cancelled — 55K pts returning."  
**Fix:** Now reads "Bonvoy Bangkok cancelled — 55K pts returned."  
**Status:** ✅ Fixed Sep 26

---

### BUG-10 · Residence Inn Calgary: contradictory cancel policy
**File:** `index.html`  
**Was:** Hotel card showed `cancel-warn` "Non-refundable" but ledger badge simultaneously showed `ldg-badge-ok` "✓ Free cancel 24h before". Also tracker detail said "Free cancel 24h".  
**Fix:** Ledger badge updated to `ldg-badge-no` "⚠ Non-refundable". Tracker detail updated to "Non-refundable". Policy is now consistently Non-refundable everywhere.  
**Status:** ✅ Fixed Sep 26

---

## P2 — Polish / Edge Cases

---

### BUG-11 · Barcelona missing from hero art rotation
**File:** `index.html`  
**Was:** The `ART` object had no `barcelona` key — hovering Barcelona on the route bar silently returned with no image shown.  
**Fix:** Added `barcelona` entry to both `hammershoi` and `pissarro` styles (fallback to Athens painting). Hovering Barcelona now loads a valid image with no JS error.  
**Status:** ✅ Fixed Sep 26

---

### ADVISORY · Scenario A net box: ATH↔MLO not shown as labeled line item
**File:** `index.html`  
**Was:** ATH↔MLO (SKY Express, ~$146.65 Yun's half) was silently folded into the Scenario A total without a visible row.  
**Fix:** Added dedicated labeled row "Less: Yan paid ATH↔MLO · SKY Express · Yun's half — −$146.65" between the Milos and Yan's-own-EWR→YYC rows. All five Yan-fronted shared costs are now visible.  
**Status:** ✅ Fixed Sep 26

---

## P0 — Conflicting Bookings (requires human decision)

---

### BUG-13 · Yan has two incompatible return flights from Europe
**Resolution:** Yan is keeping Barcelona (BCN→JFK Nov 2). ATH→EWR Oct 30 moved to `_cancelled/`.  
**Status:** ✅ Fixed — PDF moved to `_cancelled/` Sep 24, 2026

---

## All Fixed (this session)

| Item | Fix applied |
|------|-------------|
| AKI Hotel HKG added to ledger | ✅ `data-usd="3071.82"` both stay-cat and stay-sub |
| HKD added to fxRates fallback + fetch URL | ✅ |
| Oct 30 itinerary: Casa Batlló 08:30 added before Sagrada Família | ✅ |
| ATH→BCN flight (A3 712) added to Greece chapter in both magazines | ✅ |
| Bonvoy note updated ("55K returned from BKK") | ✅ in points balance label |
| Pre-read magazines: all 7 intro paragraphs removed | ✅ |
| Pre-read magazines: chapter counters added (5/2/3/2/10/5/4) | ✅ |
| Pre-read magazines: night dots visualization added | ✅ |
| stays.ics: AKI Hotel HKG event added | ✅ |
| trip-data.csv: AKI HKG rows + Casa Batlló rows added | ✅ |
| Confirmation PDFs: renamed with MM-DD prefix for chronological sort | ✅ |
| Public House Bangkok PDF: moved to `_cancelled/` | ✅ |
| BUG-01: Calendar Oct 7–8 now shows Eastin Grand Phayathai | ✅ Sep 26 |
| BUG-02: Eastin Grand badge corrected to 48,871 Amex MR + right conf# + right address | ✅ Sep 26 |
| BUG-03: Bonvoy balance shows 112,447 — stale "55K used" annotation removed | ✅ Sep 26 |
| BUG-04: Calendar Nov 2 + points card corrected to JFK (not EWR) | ✅ Sep 26 |
| BUG-05: AKI Hotel HKG Maps + copy-address buttons added | ✅ Sep 26 |
| BUG-06: Tracker cancellation warning replaced with ✓ confirmed note | ✅ Sep 26 |
| BUG-07: BKK→USM "Not yet booked" badge removed | ✅ Sep 26 |
| BUG-08: HKG→SHA "Not yet booked" badge removed | ✅ Sep 26 |
| BUG-09: Tip-box tense corrected to past tense | ✅ Sep 26 |
| BUG-10: Calgary cancel policy consistently Non-refundable everywhere | ✅ Sep 26 |
| BUG-11: Barcelona added to ART hero rotation (Athens fallback) | ✅ Sep 26 |
| Advisory: ATH↔MLO labeled line item added to Scenario A | ✅ Sep 26 |

---

## P1 — Logistics Conflict (resolved)

---

### ADVISORY-02 · Sixt rental ends Oct 5 but hotel checkout is Oct 6

**Source:** Sixt PDF (drop-off Mon Oct 5 20:00, CN961135523748) + Otter Hotel PDF (checkout Tue Oct 6 11:00)

**Conflict:**
| | Date | Details |
|--|------|---------|
| Sixt drop-off (booked) | Mon Oct 5, 20:00 | Calgary Int Airport · CN961135523748 |
| Otter Hotel checkout | Tue Oct 6, 11:00 | 600 Banff Ave · 72075854361589 |
| YYC→BKK departure | Tue Oct 6, 14:50 | WestJet WS80 · KXOXGQ |

**Gap:** Sixt must be returned Oct 5 at 8pm, but hotel checkout is Oct 6 at 11am and flight is Oct 6 at 14:50. After dropping the car on Oct 5 evening, there is no transportation from Banff to YYC on Oct 6 morning, and no overnight accommodation near YYC is booked.

**Resolution:** Yun extended the Sixt booking to Oct 6 12:00 drop-off. New conf CN961341228250 (Sixt counter 9735738700), Chase Trip 1019420392. Drive Banff→YYC after hotel checkout 11:00, drop car 12:00, board flight 14:50. ~2.5 hr buffer confirmed adequate.

**Status:** ✅ Fixed Sep 26 — Sixt extended to Oct 6 12:00 · new conf CN961341228250

---

## Already Fixed (this session, continued)

| Item | Fix applied |
|------|-------------|
| Otter Hotel Banff: checkout corrected Oct 5 → Oct 6 (PDF ground truth) | ✅ Sep 26 — trip-data.csv, stays.ics, index.html, both magazines |
| Otter Hotel Banff: price corrected CA$1,485.67 → CA$2,187.75 (3 nts vs 2) | ✅ Sep 26 |
| Banff Gmail PDF renamed to 10-03 - 🏨 - Both - OtterHotelBanff - 72075854361589.pdf | ✅ Sep 26 |

---

*0 open bugs · 0 open advisories · 28 items fixed total*
