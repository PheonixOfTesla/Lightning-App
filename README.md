<p align="center">
  <img src="https://img.shields.io/badge/vanilla-JS-yellow.svg" alt="JavaScript">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/stripe-payments-blueviolet" alt="Stripe">
  <img src="https://img.shields.io/badge/realtime-socket.io-black" alt="Socket.IO">
</p>

<h1 align="center">⚡ Lightning App</h1>

<p align="center">
  <strong>Vanilla JS event ticketing frontend with Stripe payments, DJ queue interface, and real-time updates.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#pages">Pages</a> •
  <a href="#setup">Setup</a>
</p>

---

## Features

### 🎫 Ticketing
- **Venue Listing**: Browse events
- **Stripe Checkout**: 3-step payment flow
- **QR Pass**: Display ticket for door scan
- **Guest Checkout**: No account required

### 🎧 DJ Requests
- **Song Queue**: Request songs at live events
- **Bolt Tiers**: Pay to skip the queue
- **Live Display**: Real-time queue on venue screens

### 📡 Real-Time
- **Socket.IO**: Live queue updates
- **Instant Feedback**: See your position change
- **Push Notifications**: Queue status alerts

---

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Venue listing |
| `pay.html` | Stripe checkout |
| `receipt.html` | QR pass display |
| `checkin.html` | Door scanner |
| `dj.html` | Song request form |
| `dj-display.html` | Live queue display |
| `calendar.html` | Event calendar |

---

## Setup

```bash
# Clone
git clone https://github.com/PheonixOfTesla/Lightning-App.git
cd Lightning-App

# Install (optional, for dev server)
npm install

# Configure
# Update API_URL in Lightning-Sauce.js to point to your backend

# Run locally
npx serve .

# Or deploy to Vercel
vercel
```

### Backend Required

This frontend connects to [lightning-pass](https://github.com/PheonixOfTesla/lightning-pass) backend.

---

## Tech Stack

- **Frontend**: Vanilla JavaScript (no framework)
- **Payments**: Stripe Elements
- **Real-time**: Socket.IO client
- **Hosting**: Vercel
- **Styling**: Custom CSS

---

## File Structure

```
├── index.html          # Venue listing
├── pay.html            # Checkout flow
├── receipt.html        # QR pass
├── dj.html             # Song requests
├── dj-display.html     # Queue display
├── Lightning-Sauce.js  # Main logic (10k+ lines)
├── styles.css          # Styling
└── assets/             # Images, audio
```

---

## License

MIT License

---

<p align="center">
  <strong>Frontend for <a href="https://github.com/PheonixOfTesla/lightning-pass">Lightning Pass</a></strong>
</p>
