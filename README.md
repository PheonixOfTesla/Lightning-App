# Lightning App

**Vanilla JS frontend for event ticketing with Stripe payments and real-time DJ queue.**

> **Strongest proof**: `Lightning-Sauce.js` — 10,000+ lines handling payment flows, Socket.IO updates, and multi-page state without a framework.

---

## What's Real

| Feature | Status | Proof |
|---------|--------|-------|
| 3-step Stripe payment flow | Working | `Lightning-Sauce.js` |
| DJ song request UI with live queue | Working | `dj.html`, `dj-display.html` |
| QR code pass display | Working | Pass confirmation pages |
| Socket.IO real-time updates | Working | Socket handlers in JS |
| Guest checkout (no account required) | Working | Payment flow |
| Mobile-responsive | Working | CSS media queries |

## What's Scaffolded

- Mobile app (Capacitor): packages installed, no native code
- Geofence validation: function exists, never called

---

## Tech Stack

- **Frontend**: Vanilla JavaScript (no framework)
- **Payments**: Stripe Elements
- **Real-time**: Socket.IO client
- **Hosting**: Vercel

---

## Pages

```
index.html       # Venue listing + purchase
dj.html          # Song request submission
dj-display.html  # Live queue for venues
calendar.html    # Events
login.html       # Auth
```

---

## Run

```bash
npx serve .
# or
vercel
```

---

*Pairs with lightning-backend. Functional MVP.*
