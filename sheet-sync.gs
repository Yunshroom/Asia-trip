// ─── ONE-TIME SYNC ───────────────────────────────────────────────
function syncFromLocalData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  writeTab(ss, 'Travel',     TRAVEL_DATA);
  writeTab(ss, 'Stay',       STAY_DATA);
  writeTab(ss, 'Activities', ACTIVITIES_DATA);
  writeTab(ss, 'TripData',   TRIPDATA_DATA);
  SpreadsheetApp.getUi().alert('✅ Sync complete — all 4 tabs updated');
}

function writeTab(ss, name, data) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  sheet.clearContents();
  if (data.length > 0)
    sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  sheet.setFrozenRows(1);
}

// ─── FUTURE WRITES via doPost ────────────────────────────────────
function doPost(e) {
  try {
    const body  = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.openById('1798wSijiSRbJcY05bl4oyiVT2e5W1cTTXw-QxO92YaQ');
    const sheet = ss.getSheetByName(body.tab);
    if (!sheet) throw new Error('Tab not found: ' + body.tab);

    if (body.action === 'upsert') {
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const keyCol  = headers.indexOf(body.keyCol);
      if (keyCol < 0) throw new Error('Key column not found: ' + body.keyCol);
      const colVals = sheet.getRange(1, keyCol + 1, sheet.getLastRow(), 1).getValues().flat();
      const rowIdx  = colVals.indexOf(body.key);
      const rowData = headers.map(h => body.data[h] !== undefined ? body.data[h] : '');
      if (rowIdx > 0) {
        sheet.getRange(rowIdx + 1, 1, 1, rowData.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── DATA ────────────────────────────────────────────────────────
const TRAVEL_DATA = [
    ['Key', 'Person', 'Type', 'Route', 'Origin', 'Destination', 'Date', 'Dep Time', 'Arr Time', 'Duration', 'Stops', 'Airline / Carrier', 'Flight Numbers', 'Aircraft', 'Booking Ref', 'Seat', 'Cabin', 'Payer', 'Payment Method', 'Amount Paid', 'Amount Currency', 'Points Used', 'Points Program', 'Original Price', 'Original Currency', 'Est. Points Value', 'Savings', 'Cancel Policy', 'Cancel Deadline', 'Status', 'Notes', 'Data Source', 'Claude Generated'],
    ['ewr-yyc-yun', 'Yun', 'Flight', 'EWR → YYC', 'EWR', 'YYC', 'Oct 1', '14:25', '17:30', '5h 05m', 'Nonstop', 'Air Canada', 'AC585', 'Boeing 737 MAX 8', 'BCFAML', '16A', 'Economy - Flex Reward', 'Yun', 'Aeroplan ••••8773', '39.90', 'USD', '34190', 'Aeroplan', '', '', '', '', 'Points award - cancel returns pts with Aeroplan fee', '', 'Confirmed', 'Ticket# 0142328353008; fees: $32.20 tax recovery + $7.70 Sep 11 fee', 'Confirmation', 'Yes'],
    ['ewr-yyc-yan', 'Yan', 'Flight', 'EWR → YYC', 'EWR', 'YYC', 'Oct 1', '14:25', '17:30', '5h 05m', 'Nonstop', 'Air Canada', 'AC585', 'Boeing 737 MAX 8', 'BCFEFG', 'TBA', 'Economy - Flex Reward', 'Yan', 'Aeroplan ••••1922 + TD ••••1431', '279.80', 'CAD', '18400', 'Aeroplan', '', '', '', '', 'Points + surcharge - cancel returns pts & refunds surcharge (fee applies)', '', 'Confirmed', 'Base fare 18400 pts + CAD $233.70 surcharge + taxes', 'Confirmation', 'Yes'],
    ['yyc-bkk-yun', 'Yun', 'Flight', 'YYC → BKK', 'YYC', 'BKK', 'Oct 6', '14:50', '23:00 +1', '19h 10m', '1 stop - NRT 2h 05m', 'WestJet / JAL', 'WS80 + WS5930', 'B787-9 + B787-8 (JAL-operated 2nd leg)', 'KXOXGQ', '', 'Economy', 'Yun', 'CSR ••••7559', '2209.20', 'USD', '0', '', '2209.20', 'USD', '', '0', 'Non-refundable - no changes allowed', '', 'Confirmed', 'Chase Travel Trip# 1019416112; covers both Yun + Yan on one booking', 'Confirmation', 'No'],
    ['yyc-bkk-yan', 'Yan', 'Flight', 'YYC → BKK', 'YYC', 'BKK', 'Oct 6', '14:50', '23:00 +1', '19h 10m', '1 stop - NRT 2h 05m', 'WestJet / JAL', 'WS80 + WS5930', 'B787-9 + B787-8', 'KXOXGQ', '', 'Economy', 'Yun', '', '0', '', '0', '', '', '', '', '0', 'Non-refundable', '', 'Confirmed', 'Paid by Yun - same booking as yyc-bkk-yun', 'Confirmation', 'No'],
    ['bkk-usm-yun', 'Yun', 'Flight', 'BKK → USM', 'BKK', 'USM', 'Oct 9', '15:30', '16:35', '1h 05m', 'Nonstop', 'Bangkok Airways', 'PG165', 'Airbus A319', 'CKWMQE', '', 'Economy', 'Yan', 'Chase UR (Yan\'s acct)', '0', 'USD', '0', '', '373.80', 'USD', '', '373.80', 'Refundable', '', 'Confirmed', 'Chase Travel Trip# 1028902776; covers both Yun + Yan on one booking; paid by Yan\'s 34403 Chase UR pts', 'Confirmation', 'No'],
    ['bkk-usm-yan', 'Yan', 'Flight', 'BKK → USM', 'BKK', 'USM', 'Oct 9', '15:30', '16:35', '1h 05m', 'Nonstop', 'Bangkok Airways', 'PG165', 'Airbus A319', 'CKWMQE', '', 'Economy', 'Yan', 'Chase UR ••••', '0', 'USD', '34403', 'Chase UR', '373.80', 'USD', '373.80', '373.80', 'Refundable', '', 'Confirmed', 'Chase Travel Trip# 1028902776; airline conf CKWMQE; 11908 pts at 1.25× + 22495 pts at 1×; YAN LIU + YUN YANG', 'Confirmation', 'No'],
    ['usm-hkg-yun', 'Yun', 'Flight', 'USM → HKG', 'USM', 'HKG', 'Oct 12', '11:55', '16:20', '4h 25m', 'Nonstop', 'Bangkok Airways', 'PG807', 'Airbus A319', 'FVZ2OD', '16A', 'Economy', 'Yun', 'TD Aeroplan ••••1431', '18090', 'THB', '0', '', '18090', 'THB', '', '0', 'Non-endorsable - no refund - change-restricted', '', 'Confirmed', 'Covers both Yun + Yan; HKG Terminal 2; THB 18090 = ~USD 549.94', 'Confirmation', 'No'],
    ['usm-hkg-yan', 'Yan', 'Flight', 'USM → HKG', 'USM', 'HKG', 'Oct 12', '11:55', '16:20', '4h 25m', 'Nonstop', 'Bangkok Airways', 'PG807', 'Airbus A319', 'FVZ2OD', '16B', 'Economy', 'Yun', '', '0', '', '0', '', '', '', '', '0', 'Non-endorsable', '', 'Confirmed', 'Paid by Yun - same booking FVZ2OD', 'Confirmation', 'No'],
    ['hkg-pvg-yun', 'Yun', 'Flight', 'HKG → PVG', 'HKG', 'PVG', 'Oct 14', '', '', '~2h 30m', 'Nonstop', '', '', '', '', '', 'Economy', '', '', '', '', '', '', '', '', '', '', '', '', 'Needed', '', '', 'No'],
    ['hkg-pvg-yan', 'Yan', 'Flight', 'HKG → PVG', 'HKG', 'PVG', 'Oct 14', '', '', '~2h 30m', 'Nonstop', '', '', '', '', '', 'Economy', '', '', '', '', '', '', '', '', '', '', '', '', 'Needed', '', '', 'No'],
    ['pvg-ath-yun', 'Yun', 'Flight', 'PVG → ATH', 'PVG', 'ATH', 'Oct 24', '01:10', '07:55 +1', '11h 45m', 'Nonstop', 'Juneyao Air (Aegean codeshare HO/A3)', 'HO1657', 'Boeing 787-9', 'PFM44G', '39G', 'Economy (Class S)', 'Yun', 'CSR ••••7559', '538.00', 'USD', '', '', '', '', '', '', '', '', 'Confirmed', 'Ticket# 0182107589873; seat confirmed; $538.00 USD via CSR ••••7559', 'Confirmation', 'No'],
    ['pvg-ath-yan', 'Yan', 'Flight', 'PVG → ATH', 'PVG', 'ATH', 'Oct 24', '01:10', '07:55 +1', '11h 45m', 'Nonstop', 'Juneyao Air / Aegean', 'HO1657', 'Boeing 787-9', 'AZ5QGD / EHMJVO (Amex GBT)', '', 'Economy', 'BCG', 'Lodge card', '0', '', '0', '', '', '', '', '0', 'BCG travel policy', '', 'Confirmed', 'BCG company-covered; EHMJVO = Amex GBT ref', 'Confirmation', 'No'],
    ['ath-bcn-yun', 'Yun', 'Flight', 'ATH → BCN', 'ATH', 'BCN', 'Oct 29', '16:40', '18:50', '3h 10m', 'Nonstop', 'Aegean Airlines', 'A3 712', 'Airbus A321neo', '76QQ85', '6B (Up Front)', 'Economy - ComfortFlex', 'Yan', '', '0', 'EUR', '0', '', '162.44', 'EUR', '', '162.44', 'ComfortFlex - changes allowed', '', 'Confirmed', 'Ticket# 390-2485249906; Yan paid full EUR 324.88 for both — 50/50 split shown', 'Confirmation', 'Yes'],
    ['ath-bcn-yan', 'Yan', 'Flight', 'ATH → BCN', 'ATH', 'BCN', 'Oct 29', '16:40', '18:50', '3h 10m', 'Nonstop', 'Aegean Airlines', 'A3 712', 'Airbus A321neo', '76QQ85', '6A (Up Front)', 'Economy - ComfortFlex', 'Yan', 'Yan\'s card', '324.88', 'EUR', '0', '', '324.88', 'EUR', '', '0', 'ComfortFlex - changes allowed', '', 'Confirmed', 'Ticket# 390-2485249907; FF# A3 189304555; paid full EUR 324.88 for both', 'Confirmation', 'No'],
    ['bcn-jfk-yun', 'Yun', 'Flight', 'BCN → JFK', 'BCN', 'JFK', 'Nov 2', '11:55', '15:25', '9h 30m', 'Nonstop', 'American Airlines (BA1557 codeshare)', 'BA1557 / AA67', 'Airbus A321neo', 'AM2LKL', '', 'Economy - Basic', 'Yun', 'CSR ••••7559', '543.13', 'USD', '0', '', '543.13', 'USD', '', '0', 'Non-refundable', '', 'Confirmed', 'Chase Travel Trip# 1020795844; no seat assignment; BCN T1 → JFK T8', 'Confirmation', 'No'],
    ['bcn-jfk-yan', 'Yan', 'Flight', 'BCN → JFK', 'BCN', 'JFK', 'Nov 2', '11:55', '15:25', '9h 30m', 'Nonstop', 'American Airlines', 'AA67', '', 'IHTZNM / USXNZA (Amex GBT)', '3A', 'Business', 'BCG', 'Lodge card', '0', '', '0', '', '', '', '', '0', 'BCG travel policy', '', 'Confirmed', 'BCG company-covered; Seat 3A Business class', 'Confirmation', 'No'],
    ['ath-ewr-yan', 'Yan', 'Flight', 'ATH → EWR', 'ATH', 'EWR', 'Oct 30', '', '', '', '', '', '', '', '', '', '', 'BCG', 'Lodge card', '0', '', '0', '', '', '', '', '0', 'BCG travel policy', '', 'Rebooked', 'Original return; modified to allow BCN leg extension', 'Confirmation', 'No'],
    ['sixt-yun', 'Yun', 'Car', 'YYC Airport', 'YYC', 'YYC', 'Oct 2–5', '07:00', '20:00', '4 days', '', 'Sixt', '', 'Mazda CX-5', 'CN961135523748', '', '', 'Yun', 'CSR ••••7559', '454.25', 'USD', '0', '', '454.25', 'USD', '', '0', 'Free cancel before Oct 2 07:00 pickup', 'Oct 2 07:00', 'Confirmed', 'Sixt counter conf# 9735700791; no refund for unused days after pickup', 'Confirmation', 'No']
  ];

const STAY_DATA = [
    ['Key', 'Person', 'Property Name', 'City', 'Country', 'Check-in', 'Check-out', 'Nights', 'Room Type', 'Platform', 'Confirmation #', 'Trip / Booking ID', 'Payer', 'Payment Method', 'Amount Paid', 'Amount Currency', 'Points Used', 'Points Program', 'Original Price', 'Original Currency', 'Est. Points Value', 'Savings', 'Cancel Policy', 'Cancel Deadline', 'Status', 'Perks / Amenities', 'Address', 'Notes', 'Data Source', 'Claude Generated'],
    ['calgary-yun', 'Yun', 'Residence Inn by Marriott Calgary Downtown/Beltline District', 'Calgary', 'Canada', 'Oct 1', 'Oct 2', '1', 'Studio 1 King Bed', 'Chase Travel', '2491461985', '1019392378', 'Yun', 'CSR ••••7559', '211.16', 'USD', '0', '', '211.16', 'USD', '', '0', 'Non-refundable - full charge on cancellation', '', 'Confirmed', '', '610 10th Avenue SW Calgary AB T2R 1M3', 'Property fee $10.77 included in total', 'Confirmation', 'No'],
    ['jasper-yun', 'Yun', 'Miette Mountain Cabins', 'Jasper', 'Canada', 'Oct 2', 'Oct 3', '1', 'Cedar Lodge', 'Expedia', '72075854441977', '', 'Yun', 'Expedia / TD Aeroplan ••••1431', '440.27', 'CAD', '0', '', '440.27', 'CAD', '', '0', 'Free cancel until Sep 29 18:00 - after: 100% charged', 'Sep 29 18:00', 'Confirmed', 'In-room coffee; pool access', 'Highway 16 East Pocahontas AB T0E 1E0', 'CA$415.72 to Expedia + CA$24.55 resort fee at property', 'Confirmation', 'No'],
    ['banff-yun', 'Yun', 'Otter Hotel', 'Banff', 'Canada', 'Oct 3', 'Oct 5', '2', 'Superior Room 1 King Bed', 'Expedia', '72075854361589', '', 'Yun', 'Expedia / TD Aeroplan ••••1431', '1485.67', 'CAD', '0', '', '1485.67', 'CAD', '', '0', 'Free cancel until Sep 30 18:00 - after: first night + taxes charged', 'Sep 30 18:00', 'Confirmed', '', '600 Banff Ave Banff AB T1L 1H8', 'Avg CA$656.10/nt base + CA$38.65 property fee + CA$134.82 taxes', 'Confirmation', 'No'],
    ['bangkok-yun', 'Yun', 'Public House Bangkok (Design Hotels / Marriott Bonvoy)', 'Bangkok', 'Thailand', 'Oct 7', 'Oct 9', '2', 'Uptown King Room City View', 'Marriott Bonvoy', '88511655', '', 'Yun', 'Bonvoy ••••8773', '0', '', '55000', 'Bonvoy', '', '', '', '', 'Free cancel until Oct 4 23:59 local - after: 99% of total charged', 'Oct 4', 'Confirmed', '', '249 Soi Sukhumvit 31 Khlong Tan Nuea Bangkok 10110', 'Night 1: 27000 pts; Night 2: 28000 pts; Bonvoy balance after: 57447 pts', 'Confirmation', 'No'],
    ['bangkok-yan', 'Yan', 'Public House Bangkok (Design Hotels / Marriott Bonvoy)', 'Bangkok', 'Thailand', 'Oct 7', 'Oct 9', '2', 'Uptown King Room City View', 'Marriott Bonvoy', '88511655', '', 'Yun', '', '0', '', '0', '', '', '', '', '0', 'Free cancel until Oct 4', 'Oct 4', 'Confirmed', '', '249 Soi Sukhumvit 31 Bangkok', 'Paid by Yun\'s Bonvoy pts - same booking as bangkok-yun', 'Confirmation', 'No'],
    ['hk-yun', 'Yun', 'The Murray Hong Kong (Bonvoy Autograph Collection)', 'Hong Kong', 'Hong Kong SAR', 'Oct 12', 'Oct 14', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Needed', 'Foster+Partners heritage redesign of 1960s gov tower; Central location', '22 Cotton Tree Drive Central HK', 'Recommended - ~15-20K Bonvoy pts/nt', '', 'No'],
    ['hk-yan', 'Yan', 'The Murray Hong Kong (Bonvoy Autograph Collection)', 'Hong Kong', 'Hong Kong SAR', 'Oct 12', 'Oct 14', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Needed', '', '22 Cotton Tree Drive Central HK', 'Recommended', '', 'No'],
    ['sha-yun', 'Yun', 'The Shanghai EDITION', 'Shanghai', 'China', 'Oct 14', 'Oct 17', '3', 'Premium City View Room 1 King', 'Chase Travel (The Edit)', '72389014', '1020733455', 'Yun', 'Chase UR', '0', 'USD', '87196', 'Chase UR', '1438.74', 'USD', '1438.74', '1438.74', 'Free cancel until Oct 13 12:00am local', 'Oct 13', 'Confirmed', 'Daily breakfast for 2; $100 property credit; welcome amenity; Wi-Fi; room upgrade; early check-in/late check-out', '199 Nanjing Road East Shanghai 200002', 'Saved 56677 pts with Points Boost at 1.65x; service charge $204.82 included', 'Confirmation', 'No'],
    ['sha-yan', 'Yan', 'The Shanghai EDITION', 'Shanghai', 'China', 'Oct 14', 'Oct 17', '3', 'Deluxe Room', '', '77732471', '', 'Yan', '', '', '', '0', '', '', '', '', '', 'Free cancel until Oct 13', 'Oct 13', 'Confirmed', 'Breakfast for 2; $100 property credit; room upgrade', '199 Nanjing Road East Shanghai 200002', 'Confirmation PDF is scanned image - amounts not readable', 'Partial', 'Yes'],
    ['sha-mom', 'Yan\'s mom', 'The Shanghai EDITION', 'Shanghai', 'China', 'Oct 14', 'Oct 17', '3', 'Deluxe Room (shared with Yan)', '', '77732471', '', 'Yan', '', '0', '', '0', '', '', '', '', '', 'Free cancel until Oct 13', 'Oct 13', 'Confirmed', 'Shares room with Yan', '199 Nanjing Road East Shanghai 200002', 'Same booking as sha-yan; Yan\'s mom is additional guest', 'Confirmation', 'No'],
    ['milos-yun', 'Yun', 'D3 Milos (Cycladic Living)', 'Milos', 'Greece', 'Oct 24', 'Oct 26', '2', 'Exclusive Suite with Private Pool & Sea View', 'D3 direct', '63164966', '', 'Yan', 'Credit card (Yan\'s)', '0', 'EUR', '0', '', '610.80', 'EUR', '', '610.80', 'Non-refundable — 100% cancellation fee', '', 'Confirmed', 'Private pool; sea view terrace; breakfast incl.; 65 sqm king suite', 'Plaka 84800 Milos Greece', 'Paid by Yan; same booking 63164966; €4 climate tax (€2/nt) due at property', 'Confirmation', 'No'],
    ['milos-yan', 'Yan', 'D3 Milos (Cycladic Living)', 'Milos', 'Greece', 'Oct 24', 'Oct 26', '2', 'Exclusive Suite with Private Pool & Sea View', 'D3 direct', '63164966', '', 'Yan', 'Credit card', '610.80', 'EUR', '0', '', '610.80', 'EUR', '', '0', 'Non-refundable — 100% cancellation fee', '', 'Confirmed', 'Private pool; sea view terrrace; breakfast incl.; 65 sqm king suite', 'Plaka 84800 Milos Greece', '€606.80 prepaid + €4 climate resilience tax at property = €610.80 total; Yan Liu primary guest; arrival Oct 24 ~13:30', 'Confirmation', 'No'],
    ['ath-yun', 'Yun', 'TBD Athens hotel', 'Athens', 'Greece', 'Oct 26', 'Oct 29', '3', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Needed', '', 'Athens', 'Updated: Oct 24-26 now at D3 Milos; Athens stay needed Oct 26-29', '', 'No'],
    ['ath-yan', 'Yan', 'BHI Conference hotel', 'Athens', 'Greece', 'Oct 27', 'Oct 29', '2', '', 'BCG', '', '', 'BCG', 'Lodge card', '0', '', '0', '', '', '', '', '0', 'BCG policy', '', 'Needed', 'BCG company-covered', 'Athens', 'Company-arranged; 2 nights during BHI Conference Oct 27-29', '', 'No'],
    ['bcn-yun', 'Yun', 'Yurbban Passage Hotel & Spa', 'Barcelona', 'Spain', 'Oct 29', 'Nov 2', '4', 'Premium Double Room Terrace 1 King', 'Chase Travel', '2535421155', '1027885653', 'Yun', 'Chase UR + CSR ••••7559', '72.34', 'USD', '120893', 'Chase UR', '2092.15', 'USD', '2019.81', '2019.81', 'Free cancel until Oct 28 15:00 local - after: 1 night penalty + taxes', 'Oct 28 15:00', 'Confirmed', 'Rooftop spa; Low Emission Zone (non-Spanish plates must register in advance)', 'Carrer de Trafalgar 26 Barcelona 08003', 'Saved 72535 pts at 1.6x Points Boost; $85.51 resort fee due at property', 'Confirmation', 'No'],
    ['bcn-yan', 'Yan', 'Yurbban Passage Hotel & Spa', 'Barcelona', 'Spain', 'Oct 29', 'Nov 2', '4', 'Premium Double Room Terrace 1 King (shared)', 'Chase Travel', '2535421155', '1027885653', 'Yun', '', '0', '', '0', '', '2092.15', 'USD', '', '2092.15', 'Free cancel until Oct 28 15:00', 'Oct 28 15:00', 'Confirmed', 'Shares room with Yun', 'Carrer de Trafalgar 26 Barcelona 08003', 'Paid by Yun - same booking as bcn-yun', 'Confirmation', 'No']
  ];

const ACTIVITIES_DATA = [
    ['Key', 'Person', 'Activity Name', 'Type', 'City', 'Country', 'Date', 'Time', 'Duration', 'Platform', 'Confirmation #', 'Payer', 'Amount Paid', 'Amount Currency', 'Original Price', 'Original Currency', 'Cancel Policy', 'Cancel Deadline', 'Status', 'Notes', 'Data Source', 'Claude Generated'],
    ['moraine-yun', 'Yun', 'Moraine Lake Shuttle', 'Shuttle', 'Banff', 'Canada', 'Oct 4', '07:00', 'Half day', 'Parks Canada', 'INPC26-13891950B1', 'Yun', '29.00', 'CAD', '29.00', 'CAD', '', '', 'Confirmed', '7am Lake Louise slot; Larch Valley trail (5.8 km); peak larch color early Oct', 'Partial', 'Yes'],
    ['moraine-yan', 'Yan', 'Moraine Lake Shuttle', 'Shuttle', 'Banff', 'Canada', 'Oct 4', '07:00', 'Half day', 'Parks Canada', 'INPC26-13891950B1', 'Yun', '0', '', '', '', '', '', '', 'Confirmed', 'Same booking as moraine-yun; paid by Yun', 'Partial'],
    ['wedding-yun', 'Yun', 'Meryl & Michael Wedding', 'Wedding', 'Koh Samui', 'Thailand', 'Oct 9–12', '', '', '', '', '', '', '', '', '', '', '', '', 'Schedule PDF is scanned image', 'Partial', 'Yes'],
    ['wedding-yan', 'Yan', 'Meryl & Michael Wedding', 'Wedding', 'Koh Samui', 'Thailand', 'Oct 9–12', '', '', '', '', '', '', '', '', '', '', '', '', 'Same as wedding-yun', 'Partial', 'Yes'],
    ['bhi-yan', 'Yan', 'BHI Conference', 'Conference', 'Athens', 'Greece', 'Oct 27–29', '', '2 days', 'BCG', '', 'BCG', '0', '', '', '', 'BCG policy', '', 'Confirmed', 'BCG-covered; hotel also covered (see ath-yan in Stay)', '', 'No']
  ];

const TRIPDATA_DATA = [
    ['key', 'value', 'notes'],
    ['f-ewr-yyc-dep', '14:25', 'EWR→YYC departure time'],
    ['f-ewr-yyc-arr', '17:30', 'EWR→YYC arrival time'],
    ['f-ewr-yyc-date', 'Oct 1', 'EWR→YYC date'],
    ['f-ewr-yyc-yun-ref', 'BCFAML', 'Yun booking ref'],
    ['f-ewr-yyc-yun-seat', '16A', 'Yun seat'],
    ['f-ewr-yyc-yan-ref', 'BCFEFG', 'Yan booking ref'],
    ['f-ewr-yyc-yan-seat', 'TBA', 'Yan seat'],
    ['f-yyc-bkk-dep', '14:50', 'YYC→BKK departure time'],
    ['f-yyc-bkk-arr', '23:00 +1', 'YYC→BKK arrival time (next day)'],
    ['f-yyc-bkk-date', 'Oct 6–7', 'YYC→BKK travel dates'],
    ['f-yyc-bkk-ref', 'KXOXGQ', 'Booking ref'],
    ['f-yyc-bkk-price', '$2209.20', 'Total price paid'],
    ['f-bkk-usm-date', 'Oct 9', 'BKK→USM date'],
    ['f-bkk-usm-dep', '15:30', 'BKK→USM departure time'],
    ['f-bkk-usm-arr', '16:35', 'BKK→USM arrival time'],
    ['f-bkk-usm-flight', 'PG165', 'Bangkok Airways flight number'],
    ['f-bkk-usm-ref', 'CKWMQE', 'Airline confirmation'],
    ['f-bkk-usm-chase-trip', '1028902776', 'Chase Travel Trip ID'],
    ['f-bkk-usm-pts', '34,403', 'Chase UR points used (Yan\'s account)'],
    ['f-bkk-usm-est-value', '373.80', 'Documented USD equivalent (Chase Travel receipt)'],
    ['f-usm-hkg-dep', '11:55', 'USM→HKG departure time'],
    ['f-usm-hkg-arr', '16:20', 'USM→HKG arrival time'],
    ['f-usm-hkg-date', 'Oct 12', 'USM→HKG date'],
    ['f-usm-hkg-ref', 'FVZ2OD', 'Booking ref (both)'],
    ['f-usm-hkg-yun-seat', '16A', 'Yun seat'],
    ['f-usm-hkg-yan-seat', '16B', 'Yan seat'],
    ['f-usm-hkg-price', 'THB 18,090', 'Price paid'],
    ['f-hkg-pvg-date', 'Oct 14', 'HKG→PVG date (not yet booked)'],
    ['f-pvg-ath-dep', '01:10', 'PVG→ATH departure time (CST)'],
    ['f-pvg-ath-arr', '07:55', 'PVG→ATH arrival time (EEST)'],
    ['f-pvg-ath-date', 'Oct 24', 'PVG→ATH date'],
    ['f-pvg-ath-yun-ref', 'PFM44G', 'Yun booking ref'],
    ['f-pvg-ath-yun-seat', '39G', 'Yun seat'],
    ['f-pvg-ath-yan-ref', 'AZ5QGD', 'Yan airline ref'],
    ['f-pvg-ath-yan-amex', 'EHMJVO', 'Yan Amex GBT ref'],
    ['f-ath-bcn-dep', '16:40', 'ATH→BCN departure time'],
    ['f-ath-bcn-arr', '18:50', 'ATH→BCN arrival time'],
    ['f-ath-bcn-date', 'Oct 29', 'ATH→BCN date'],
    ['f-ath-bcn-ref', '76QQ85', 'Booking ref (both)'],
    ['f-bcn-jfk-dep', '11:55', 'BCN→JFK departure time'],
    ['f-bcn-jfk-arr', '15:25', 'BCN→JFK arrival time'],
    ['f-bcn-jfk-date', 'Nov 2', 'BCN→JFK date'],
    ['f-bcn-jfk-yun-ref', 'AM2LKL', 'Yun booking ref'],
    ['f-bcn-jfk-yan-ref', 'IHTZNM', 'Yan airline ref'],
    ['f-bcn-jfk-yan-amex', 'USXNZA', 'Yan Amex GBT ref'],
    ['f-bcn-jfk-yan-seat', '3A', 'Yan seat (Business)'],
    ['s-calgary-conf', '2491461985', 'Residence Inn Calgary conf'],
    ['s-calgary-checkin', 'Oct 1', 'Check-in date'],
    ['s-calgary-checkout', 'Oct 2', 'Check-out date'],
    ['s-calgary-price', '$211.16', 'Price paid'],
    ['s-calgary-cancel', 'Non-refundable', 'Cancellation policy'],
    ['s-jasper-conf', '72075854441977', 'Miette Mountain Cabins Expedia ref'],
    ['s-jasper-checkin', 'Oct 2', 'Check-in date'],
    ['s-jasper-checkout', 'Oct 3', 'Check-out date'],
    ['s-jasper-cancel', 'Free cancel until Sep 29', 'Cancellation policy'],
    ['s-banff-conf', '72075854361589', 'Otter Hotel Banff Expedia ref'],
    ['s-banff-checkin', 'Oct 3', 'Check-in date'],
    ['s-banff-checkout', 'Oct 5', 'Check-out date'],
    ['s-banff-cancel', 'Free cancel until Sep 30', 'Cancellation policy'],
    ['s-bangkok-conf', '88511655', 'Public House Bangkok Bonvoy conf'],
    ['s-bangkok-checkin', 'Oct 7', 'Check-in date'],
    ['s-bangkok-checkout', 'Oct 9', 'Check-out date'],
    ['s-bangkok-pts', '55,000', 'Bonvoy points used'],
    ['s-bangkok-cancel', 'Free cancel until Oct 4', 'Cancellation policy'],
    ['s-sha-yun-conf', '72389014', 'Shanghai EDITION Yun conf'],
    ['s-sha-yun-trip', '1020733455', 'Chase Travel trip ID'],
    ['s-sha-yun-checkin', 'Oct 14', 'Check-in date'],
    ['s-sha-yun-checkout', 'Oct 17', 'Check-out date'],
    ['s-sha-yun-pts', '87,196', 'Chase UR points used'],
    ['s-sha-yun-est-value', '1438.74', 'Documented USD equiv — Chase Travel Trip# 1020733455 receipt'],
    ['s-sha-yun-cancel', 'Free cancel until Oct 13', 'Cancellation policy'],
    ['s-sha-yan-conf', '77732471', 'Shanghai EDITION Yan+Mom conf'],
    ['s-sha-yan-trip', '1020790091', 'Chase Travel trip ID'],
    ['s-sha-yan-checkin', 'Oct 14', 'Check-in date'],
    ['s-sha-yan-checkout', 'Oct 17', 'Check-out date'],
    ['s-sha-yan-price', '$1385.96', 'Price paid'],
    ['s-sha-yan-cancel', 'Free cancel until Oct 13', 'Cancellation policy'],
    ['s-bcn-conf', '2535421155', 'Yurbban Passage conf'],
    ['s-bcn-trip', '1027885653', 'Chase Travel trip ID'],
    ['s-bcn-checkin', 'Oct 29', 'Check-in date'],
    ['s-bcn-checkout', 'Nov 2', 'Check-out date'],
    ['s-bcn-pts', '120,893', 'Chase UR points used'],
    ['s-bcn-est-value', '2019.81', 'Documented USD equiv — Chase Travel Trip# 1027885653 receipt'],
    ['s-bcn-cancel', 'Free cancel until Oct 28 15:00', 'Cancellation policy'],
    ['a-moraine-ref', 'INPC26-13891950B1', 'Moraine Lake shuttle ref'],
    ['a-moraine-date', 'Oct 4', 'Date'],
    ['a-moraine-price', 'CAD $29.00', 'Price paid'],
    ['c-sixt-conf', 'CN961135523748', 'Chase Travel car conf'],
    ['c-sixt-sixt', '9735700791', 'Sixt counter conf number'],
    ['c-sixt-pickup', 'Oct 2 07:00', 'Pickup date/time'],
    ['c-sixt-dropoff', 'Oct 5 20:00', 'Drop-off date/time'],
    ['c-sixt-price', '$454.25', 'Total price paid'],
    ['c-sixt-cancel', 'Free cancel until Sep 29', 'Cancellation policy'],
    ['pts-chase-remaining', '95,982', 'Chase UR pts remaining (after 87K EDITION + 121K Barcelona)'],
    ['pts-bonvoy-remaining', '57,447', 'Bonvoy pts remaining (after 55K BKK hotel)'],
    ['pts-total-redeemed', '350,082', 'Total pts redeemed (6 redemptions across 3 programs)'],
    ['pts-total-value', '$4790', 'Estimated total value extracted'],
    ['pts-avg-cpp', '1.37', 'Average cents per point weighted'],
    ['s-milos-conf', '63164966', 'D3 Milos booking confirmation'],
    ['s-milos-checkin', 'Oct 24', 'Check-in date (3:00 PM)'],
    ['s-milos-checkout', 'Oct 26', 'Check-out date (11:00 AM)'],
    ['s-milos-price', '€610.80', 'Total price (€606.80 prepaid + €4 climate tax at property)'],
    ['s-milos-cancel', 'Non-refundable — 100% fee', 'Cancellation policy'],
    ['s-milos-suite', 'Exclusive Suite with Private Pool & Sea View', 'Room type']
  ];
