#!/usr/bin/env python3
"""
write_to_sheet.py — Write trip booking data directly to Google Sheet.

This is the CANONICAL write tool. Local CSVs are no longer the source of truth.
All new confirmations / edits go through this script → Google Sheet → website.

Usage:
  python3 write_to_sheet.py --test
  python3 write_to_sheet.py --tab Stay    --key sha-yun    field=value ...
  python3 write_to_sheet.py --tab Travel  --key pvg-ath-yun field=value ...
  python3 write_to_sheet.py --tab TripData --key pts-chase-remaining value=95982

Tabs:    Travel | Stay | Activities | TripData
Key col: Key    | Key  | Key        | key
"""

import sys, json, urllib.request, urllib.error

SHEET_URL = (
    "https://script.google.com/macros/s/"
    "AKfycbzvJXHe77hX6B89VlCL5wKZj8-2nKeIqs70yUcBBg9TmvMGhNH3Gpnd8_Ea3HnmUmYK"
    "/exec"
)

KEY_COL = {
    'Stay':       'Key',
    'Travel':     'Key',
    'Activities': 'Key',
    'TripData':   'key',
}

# ── Column headers per tab (must match Google Sheet exactly) ──────────────────

STAY_HEADERS = [
    'Key','Person','Property Name','City','Country','Check-in','Check-out',
    'Nights','Room Type','Platform','Confirmation #','Trip / Booking ID',
    'Payer','Payment Method','Amount Paid','Amount Currency','Points Used',
    'Points Program','Original Price','Original Currency','Est. Points Value',
    'Savings','Cancel Policy','Cancel Deadline','Status','Perks / Amenities',
    'Address','Notes','Data Source','Claude Generated',
]

TRAVEL_HEADERS = [
    'Key','Person','Type','Route','Origin','Destination','Date','Dep Time',
    'Arr Time','Duration','Stops','Airline / Carrier','Flight Numbers',
    'Aircraft','Booking Ref','Seat','Cabin','Payer','Payment Method',
    'Amount Paid','Amount Currency','Points Used','Points Program',
    'Original Price','Original Currency','Est. Points Value','Savings',
    'Cancel Policy','Cancel Deadline','Status','Notes','Data Source',
    'Claude Generated',
]

ACTIVITIES_HEADERS = [
    'Key','Person','Activity Name','Type','City','Country','Date','Time',
    'Duration','Platform','Confirmation #','Payer','Amount Paid',
    'Amount Currency','Original Price','Original Currency','Cancel Policy',
    'Cancel Deadline','Status','Notes','Data Source','Claude Generated',
]

TRIPDATA_HEADERS = ['key', 'value', 'notes']

HEADERS = {
    'Stay':       STAY_HEADERS,
    'Travel':     TRAVEL_HEADERS,
    'Activities': ACTIVITIES_HEADERS,
    'TripData':   TRIPDATA_HEADERS,
}

# ── Core write function ───────────────────────────────────────────────────────

def upsert(tab: str, key: str, data: dict, verbose: bool = True) -> dict:
    """
    Upsert a row into the Google Sheet.
    - tab:  Sheet tab name (Stay / Travel / Activities / TripData)
    - key:  value of the Key column identifying this row
    - data: dict of {column_header: value} — unspecified cols default to ''
    """
    if tab not in KEY_COL:
        raise ValueError(f"Unknown tab '{tab}'. Valid: {list(KEY_COL.keys())}")

    key_col = KEY_COL[tab]
    row_data = {key_col: key}
    row_data.update(data)

    payload = {
        'action': 'upsert',
        'tab':    tab,
        'keyCol': key_col,
        'key':    key,
        'data':   row_data,
    }

    req = urllib.request.Request(
        SHEET_URL,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST',
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode())
    except urllib.error.URLError as e:
        result = {'ok': False, 'error': str(e)}

    if verbose:
        status = '✓' if result.get('ok') else '✗'
        msg = result.get('error', '') if not result.get('ok') else ''
        print(f"{status} {tab}/{key}" + (f" — {msg}" if msg else ''))

    return result


def upsert_stay(key: str, **fields) -> dict:
    return upsert('Stay', key, fields)

def upsert_travel(key: str, **fields) -> dict:
    return upsert('Travel', key, fields)

def upsert_activities(key: str, **fields) -> dict:
    return upsert('Activities', key, fields)

def upsert_tripdata(key: str, value: str, notes: str = '') -> dict:
    return upsert('TripData', key, {'value': value, 'notes': notes})


# ── CLI ───────────────────────────────────────────────────────────────────────

def _test():
    print("Testing doPost endpoint …")
    r = upsert('TripData', '__test__', {'value': 'ok', 'notes': 'connectivity test'})
    if r.get('ok'):
        print("✓ Endpoint reachable and working")
    else:
        print(f"✗ Failed: {r.get('error')}")
    # Clean up test row — send blank value
    upsert('TripData', '__test__', {'value': '', 'notes': ''}, verbose=False)


if __name__ == '__main__':
    args = sys.argv[1:]

    if not args or '--test' in args:
        _test()
        sys.exit(0)

    # Parse --tab, --key, and field=value pairs
    tab = key = None
    data = {}
    i = 0
    while i < len(args):
        if args[i] == '--tab' and i + 1 < len(args):
            tab = args[i + 1]; i += 2
        elif args[i] == '--key' and i + 1 < len(args):
            key = args[i + 1]; i += 2
        elif '=' in args[i]:
            k, v = args[i].split('=', 1)
            data[k] = v; i += 1
        else:
            i += 1

    if not tab or not key:
        print(__doc__)
        sys.exit(1)

    upsert(tab, key, data)
