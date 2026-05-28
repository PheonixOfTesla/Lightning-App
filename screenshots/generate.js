const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ==========================================
// SEED DATA - Sunset Bash Demo Event
// ==========================================
const SEED = {
  event: {
    name: 'Sunset Bash',
    tagline: 'Sunset, sound, and signature tequila on the Gulf',
    date: 'Friday, June 13, 2026',
    time: '6:00 PM – Midnight',
    venue: 'Beach Club Siesta Key',
    dj: 'DJ Rudo',
    djSet: '8:00 PM – Midnight'
  },
  partners: [
    { name: 'SRQ Social Group', role: 'Host & Promoter' },
    { name: 'Lightning Pass', role: 'Ticketing Platform' },
    { name: 'Baby L Media Group', role: 'Media & Production' },
    { name: 'Metagave Tequila', role: 'Featured Sponsor' }
  ],
  tiers: {
    ga: { name: 'General Entry RSVP', price: 0, count: 190 },
    vip: { name: 'VIP RSVP', price: 10, count: 57 }
  },
  stats: {
    expected: 300,
    totalRsvps: 247,
    vipConversion: '23%',
    ticketRevenue: 570,
    attributedDrinks: 171,
    attributedRevenue: 2394
  },
  guests: ['Madison K.', 'Jordan T.', 'Sam R.', 'Alex P.', 'Taylor W.', 'Riley B.', 'Casey M.', 'Morgan H.', 'Drew S.', 'Quinn V.', 'Avery L.', 'Parker N.'],
  songRequests: [
    { song: 'Espresso', artist: 'Sabrina Carpenter', guest: 'Madison K.', tier: 'Priority', price: 10 },
    { song: 'I Like The Way You Kiss Me', artist: 'Artemas', guest: 'Jordan T.', tier: 'Standard', price: 3 },
    { song: 'Greedy', artist: 'Tate McRae', guest: 'Sam R.', tier: 'PLAY NOW', price: 25 },
    { song: 'Beautiful Things', artist: 'Benson Boone', guest: 'Alex P.', tier: 'Standard', price: 3 },
    { song: 'Lose Control', artist: 'Teddy Swims', guest: 'Taylor W.', tier: 'Priority', price: 10 }
  ],
  djTips: 185
};

// ==========================================
// CSS STYLES
// ==========================================
const STYLES = {
  lightning: `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Rajdhani', sans-serif;
      background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%);
      color: white;
      min-height: 100vh;
    }
    .container { max-width: 100%; padding: 20px; }
    h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px; }
    .neon-green { color: #39ff14; }
    .electric-blue { color: #00d4ff; }
    .electric-purple { color: #bf00ff; }
    .lightning-yellow { color: #ffdd00; }
    .btn {
      padding: 16px 32px;
      border-radius: 12px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 18px;
      letter-spacing: 2px;
      cursor: pointer;
      border: none;
      transition: all 0.3s;
    }
    .btn-primary {
      background: linear-gradient(135deg, #39ff14, #00d4ff);
      color: #0a0a0f;
    }
    .btn-vip {
      background: linear-gradient(135deg, #ffdd00, #ff6b00);
      color: #0a0a0f;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 16px;
    }
    .card-glow {
      box-shadow: 0 0 30px rgba(57, 255, 20, 0.2);
      border-color: #39ff14;
    }
    .status-bar {
      background: #000;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }
    .partner-logos {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      padding: 16px;
      background: rgba(0,0,0,0.3);
    }
    .partner-logo {
      background: rgba(255,255,255,0.1);
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 12px;
      color: rgba(255,255,255,0.7);
    }
  `,
  beachClub: `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Lato', sans-serif;
      background: linear-gradient(135deg, #0a1628 0%, #1a2a4a 50%, #0d1a2d 100%);
      color: white;
      min-height: 100vh;
    }
    .container { max-width: 100%; padding: 20px; }
    h1, h2, h3 { font-family: 'Playfair Display', serif; }
    .gold { color: #d4a853; }
    .navy { color: #1a2a4a; }
    .btn {
      padding: 16px 32px;
      border-radius: 8px;
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      cursor: pointer;
      border: none;
    }
    .btn-primary {
      background: linear-gradient(135deg, #d4a853, #c49a47);
      color: #0a1628;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(212, 168, 83, 0.3);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 16px;
    }
    .domain-bar {
      background: #d4a853;
      color: #0a1628;
      text-align: center;
      padding: 8px;
      font-size: 12px;
      font-weight: bold;
    }
  `
};

// ==========================================
// SCREEN TEMPLATES
// ==========================================
const screens = {
  'flow-01-landing': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar">
        <span>9:41</span>
        <span>⚡ 5G 100%</span>
      </div>
      <div class="container">
        <div style="height: 200px; background: linear-gradient(to bottom, rgba(255,140,0,0.4), transparent), url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22><rect fill=%22%231a1a2e%22 width=%22400%22 height=%22200%22/><circle cx=%22350%22 cy=%2260%22 r=%2240%22 fill=%22%23ff6b00%22 opacity=%220.8%22/></svg>'); background-size: cover; border-radius: 16px; display: flex; align-items: flex-end; padding: 20px; margin-bottom: 20px;">
          <div>
            <h1 style="font-size: 42px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${SEED.event.name.toUpperCase()}</h1>
            <p style="font-size: 16px; opacity: 0.9;">${SEED.event.tagline}</p>
          </div>
        </div>

        <div class="card">
          <p class="lightning-yellow" style="font-size: 14px; margin-bottom: 8px;">📅 ${SEED.event.date}</p>
          <p style="font-size: 14px; margin-bottom: 8px;">🕕 ${SEED.event.time}</p>
          <p style="font-size: 14px; margin-bottom: 8px;">📍 ${SEED.event.venue}</p>
          <p class="electric-purple" style="font-size: 14px;">🎧 ${SEED.event.dj} • Live ${SEED.event.djSet}</p>
        </div>

        <div class="card" style="background: rgba(57,255,20,0.1); border-color: #39ff14;">
          <p style="text-align: center; margin-bottom: 12px;">🍹 <span class="neon-green">METAGAVE TEQUILA</span> Night</p>
          <p style="text-align: center; font-size: 14px; opacity: 0.8;">VIP: Free shot + 50% off margaritas all night</p>
        </div>

        <button class="btn btn-primary" style="width: 100%; margin-top: 20px; font-size: 24px;">
          ⚡ RSVP NOW
        </button>

        <div class="partner-logos" style="margin-top: 24px;">
          ${SEED.partners.map(p => `<div class="partner-logo">${p.name}</div>`).join('')}
        </div>
      </div>
    </body></html>
  `,

  'flow-02-tier-select': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar"><span>9:41</span><span>⚡ 5G 100%</span></div>
      <div class="container">
        <h2 style="text-align: center; margin-bottom: 8px;">SELECT YOUR PASS</h2>
        <p style="text-align: center; opacity: 0.7; margin-bottom: 24px;">${SEED.event.name} • ${SEED.event.date}</p>

        <div class="card" style="cursor: pointer;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3>GENERAL ENTRY</h3>
            <span class="neon-green" style="font-size: 24px; font-family: 'Bebas Neue';">FREE</span>
          </div>
          <ul style="list-style: none; font-size: 14px; opacity: 0.8;">
            <li>✓ Confirmed entry</li>
            <li>✓ Lightning Pass QR code</li>
            <li>✓ Event reminders</li>
          </ul>
        </div>

        <div class="card" style="cursor: pointer; border-color: #ffdd00; background: rgba(255,221,0,0.05);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
              <h3 class="lightning-yellow">VIP PASS</h3>
              <span style="font-size: 12px; background: #ffdd00; color: #000; padding: 2px 8px; border-radius: 4px;">RECOMMENDED</span>
            </div>
            <span class="lightning-yellow" style="font-size: 24px; font-family: 'Bebas Neue';">$10</span>
          </div>
          <ul style="list-style: none; font-size: 14px; opacity: 0.8;">
            <li>✓ Everything in GA</li>
            <li class="lightning-yellow">🍹 1 FREE Metagave tequila shot on arrival</li>
            <li class="lightning-yellow">🍸 50% OFF all Metagave margaritas all night</li>
            <li>⚡ VIP entry lane / priority access</li>
            <li>🎫 Yellow VIP wristband</li>
          </ul>
        </div>
      </div>
    </body></html>
  `,

  'flow-03-tier-vip-selected': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar"><span>9:41</span><span>⚡ 5G 100%</span></div>
      <div class="container">
        <h2 style="text-align: center; margin-bottom: 8px;">SELECT YOUR PASS</h2>
        <p style="text-align: center; opacity: 0.7; margin-bottom: 24px;">${SEED.event.name} • ${SEED.event.date}</p>

        <div class="card" style="opacity: 0.5;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3>GENERAL ENTRY</h3>
            <span style="font-size: 24px; font-family: 'Bebas Neue';">FREE</span>
          </div>
        </div>

        <div class="card card-glow" style="border: 2px solid #ffdd00; background: rgba(255,221,0,0.1);">
          <div style="position: absolute; top: -12px; right: 20px; background: #ffdd00; color: #000; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">✓ SELECTED</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 class="lightning-yellow">VIP PASS</h3>
            <span class="lightning-yellow" style="font-size: 28px; font-family: 'Bebas Neue';">$10</span>
          </div>
          <ul style="list-style: none; font-size: 14px;">
            <li style="margin-bottom: 8px;">✓ Everything in GA</li>
            <li style="margin-bottom: 8px; color: #ffdd00;">🍹 1 FREE Metagave tequila shot on arrival</li>
            <li style="margin-bottom: 8px; color: #ffdd00;">🍸 50% OFF all Metagave margaritas all night</li>
            <li style="margin-bottom: 8px;">⚡ VIP entry lane / priority access</li>
            <li>🎫 Yellow VIP wristband at door</li>
          </ul>
        </div>

        <button class="btn btn-vip" style="width: 100%; margin-top: 20px; font-size: 20px;">
          CONTINUE → $10
        </button>
      </div>
    </body></html>
  `,

  'flow-04-promo-prompt': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar"><span>9:42</span><span>⚡ 5G 100%</span></div>
      <div class="container" style="display: flex; flex-direction: column; justify-content: center; min-height: calc(100vh - 50px);">
        <div class="card" style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">📱</div>
          <h2 style="margin-bottom: 16px;">STAY IN THE LOOP?</h2>
          <p style="opacity: 0.8; margin-bottom: 24px; font-size: 14px;">
            Want event updates, drink specials, and exclusive Metagave offers?
          </p>

          <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="btn" style="background: rgba(255,255,255,0.1); color: white; flex: 1;">NO THANKS</button>
            <button class="btn btn-primary" style="flex: 1;">YES, I'M IN! 🎉</button>
          </div>
        </div>
      </div>
    </body></html>
  `,

  'flow-05-promo-yes': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar"><span>9:42</span><span>⚡ 5G 100%</span></div>
      <div class="container" style="display: flex; flex-direction: column; justify-content: center; min-height: calc(100vh - 50px);">
        <div class="card" style="text-align: center; border-color: #39ff14; background: rgba(57,255,20,0.1);">
          <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
          <h2 class="neon-green" style="margin-bottom: 16px;">YOU'RE ON THE LIST!</h2>
          <p style="opacity: 0.8; margin-bottom: 24px; font-size: 14px;">
            You'll receive SMS reminders and exclusive sponsor specials from <span class="lightning-yellow">Metagave Tequila</span>
          </p>

          <button class="btn btn-primary" style="width: 100%;">CONTINUE</button>
        </div>
      </div>
    </body></html>
  `,

  'flow-06-info-form': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}
      input { width: 100%; padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: white; font-size: 16px; margin-bottom: 16px; }
      input:focus { outline: none; border-color: #39ff14; }
      label { display: block; font-size: 12px; opacity: 0.7; margin-bottom: 8px; }
    </style></head>
    <body>
      <div class="status-bar"><span>9:42</span><span>⚡ 5G 100%</span></div>
      <div class="container">
        <h2 style="text-align: center; margin-bottom: 8px;">YOUR INFO</h2>
        <p style="text-align: center; opacity: 0.7; margin-bottom: 24px;">VIP Pass • ${SEED.event.name}</p>

        <div class="card">
          <label>FULL NAME</label>
          <input type="text" value="Madison Kennedy" />

          <label>EMAIL</label>
          <input type="email" value="madison.k@gmail.com" />

          <label>PHONE NUMBER</label>
          <input type="tel" value="(941) 555-0123" />
        </div>

        <button class="btn btn-vip" style="width: 100%; margin-top: 20px;">
          CONTINUE TO PAYMENT
        </button>
      </div>
    </body></html>
  `,

  'flow-07-id-verify': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar"><span>9:43</span><span>⚡ 5G 100%</span></div>
      <div class="container" style="display: flex; flex-direction: column; justify-content: center; min-height: calc(100vh - 50px);">
        <div class="card" style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">🪪</div>
          <h2 style="margin-bottom: 16px;">AGE VERIFICATION</h2>
          <p style="opacity: 0.8; margin-bottom: 8px; font-size: 14px;">
            Your VIP pass includes alcoholic beverage perks
          </p>
          <p style="opacity: 0.6; margin-bottom: 24px; font-size: 12px;">
            Quick ID scan to confirm you're 21+
          </p>

          <div class="card" style="background: rgba(0,212,255,0.1); border-color: #00d4ff;">
            <p style="font-size: 12px; margin-bottom: 8px;">Powered by</p>
            <p class="electric-blue" style="font-size: 18px; font-weight: bold;">Stripe Identity</p>
          </div>

          <button class="btn btn-primary" style="width: 100%; margin-top: 16px;">
            📷 SCAN ID
          </button>
          <p style="font-size: 11px; opacity: 0.5; margin-top: 12px;">Your ID is encrypted and not stored</p>
        </div>
      </div>
    </body></html>
  `,

  'flow-08-checkout-stripe': () => `
    <!DOCTYPE html><html><head><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f6f9fc; min-height: 100vh; }
      .stripe-header { background: #0a2540; color: white; padding: 20px; }
      .stripe-body { padding: 24px; max-width: 400px; margin: 0 auto; }
      .amount { font-size: 32px; font-weight: 600; margin: 24px 0; }
      .field { margin-bottom: 20px; }
      .field label { display: block; font-size: 14px; color: #30313d; margin-bottom: 8px; font-weight: 500; }
      .field input { width: 100%; padding: 12px; border: 1px solid #e6e6e6; border-radius: 6px; font-size: 16px; }
      .pay-btn { width: 100%; padding: 16px; background: #635bff; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; }
    </style></head>
    <body>
      <div class="stripe-header">
        <p style="font-size: 14px; opacity: 0.8;">Lightning Pass</p>
        <p style="font-size: 18px; font-weight: 600;">${SEED.event.name} — VIP RSVP</p>
      </div>
      <div class="stripe-body">
        <div class="amount">$10.00</div>

        <div class="field">
          <label>Card number</label>
          <input type="text" value="4242 4242 4242 4242" />
        </div>

        <div style="display: flex; gap: 16px;">
          <div class="field" style="flex: 1;">
            <label>Expiration</label>
            <input type="text" value="12 / 28" />
          </div>
          <div class="field" style="flex: 1;">
            <label>CVC</label>
            <input type="text" value="123" />
          </div>
        </div>

        <div class="field">
          <label>Country</label>
          <input type="text" value="United States" />
        </div>

        <button class="pay-btn">Pay $10.00</button>

        <p style="text-align: center; font-size: 12px; color: #697386; margin-top: 16px;">
          Powered by <strong>Stripe</strong>
        </p>
      </div>
    </body></html>
  `,

  'flow-09-confirmation': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar"><span>9:44</span><span>⚡ 5G 100%</span></div>
      <div class="container" style="text-align: center; padding-top: 40px;">
        <div style="font-size: 80px; margin-bottom: 16px;">🎉</div>
        <h1 class="neon-green" style="font-size: 48px; margin-bottom: 8px;">YOU'RE IN!</h1>
        <p style="opacity: 0.8; margin-bottom: 32px;">VIP Pass Confirmed</p>

        <div class="card">
          <h3 style="margin-bottom: 16px;">${SEED.event.name.toUpperCase()}</h3>
          <p style="margin-bottom: 8px;">📅 ${SEED.event.date}</p>
          <p style="margin-bottom: 8px;">🕕 ${SEED.event.time}</p>
          <p style="margin-bottom: 16px;">📍 ${SEED.event.venue}</p>

          <div style="background: #ffdd00; color: #000; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
            <p style="font-weight: bold;">🎫 VIP — YELLOW WRISTBAND</p>
            <p style="font-size: 12px;">Show this pass at the VIP entry lane</p>
          </div>

          <div style="background: rgba(57,255,20,0.1); border: 1px solid #39ff14; padding: 12px; border-radius: 8px;">
            <p class="neon-green" style="font-weight: bold;">🍹 Your VIP Perks</p>
            <p style="font-size: 13px;">1 FREE Metagave shot on arrival</p>
            <p style="font-size: 13px;">50% OFF Metagave margaritas all night</p>
          </div>
        </div>

        <button class="btn btn-primary" style="width: 100%; margin-top: 16px;">
          VIEW YOUR PASS
        </button>
      </div>
    </body></html>
  `,

  'flow-10-pass-qr': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar"><span>9:44</span><span>⚡ 5G 100%</span></div>
      <div class="container" style="text-align: center;">
        <div style="background: #ffdd00; color: #000; padding: 8px; border-radius: 8px 8px 0 0; font-weight: bold;">
          ⚡ VIP PASS
        </div>

        <div class="card" style="border-radius: 0 0 16px 16px; margin-top: 0;">
          <h2 style="margin-bottom: 4px;">${SEED.event.name.toUpperCase()}</h2>
          <p style="opacity: 0.7; margin-bottom: 16px;">${SEED.event.date}</p>

          <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
            <svg viewBox="0 0 200 200" width="180" height="180">
              <rect fill="white" width="200" height="200"/>
              ${generateQRPattern()}
            </svg>
          </div>

          <p style="font-size: 14px; margin-bottom: 4px;">Madison Kennedy</p>
          <p style="font-size: 12px; opacity: 0.6; margin-bottom: 16px;">madison.k@gmail.com</p>

          <div style="background: #ffdd00; color: #000; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
            <p style="font-weight: bold; font-size: 14px;">🎫 YELLOW WRISTBAND</p>
            <p style="font-size: 11px;">Present at VIP entry lane</p>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn" style="flex: 1; background: rgba(255,255,255,0.1); color: white; padding: 12px; font-size: 12px;">
              📲 Add to Wallet
            </button>
            <button class="btn" style="flex: 1; background: rgba(255,255,255,0.1); color: white; padding: 12px; font-size: 12px;">
              📤 Share
            </button>
          </div>
        </div>

        <p style="font-size: 11px; opacity: 0.5; margin-top: 16px;">📍 ${SEED.event.venue}</p>
      </div>
    </body></html>
  `
};

// Helper function to generate QR-like pattern
function generateQRPattern() {
  let pattern = '';
  const size = 8;
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      // Corner squares
      if ((x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)) {
        if ((x === 0 || x === 6 || y === 0 || y === 6 || (x > 1 && x < 5 && y > 1 && y < 5)) ||
            (x > 13 && (x === 14 || x === 20 || y === 0 || y === 6 || (x > 15 && x < 19 && y > 1 && y < 5))) ||
            (y > 13 && (x === 0 || x === 6 || y === 14 || y === 20 || (x > 1 && x < 5 && y > 15 && y < 19)))) {
          pattern += `<rect x="${20 + x * size}" y="${20 + y * size}" width="${size}" height="${size}" fill="black"/>`;
        }
      } else if (Math.random() > 0.5) {
        pattern += `<rect x="${20 + x * size}" y="${20 + y * size}" width="${size}" height="${size}" fill="black"/>`;
      }
    }
  }
  return pattern;
}

// Continue in next part...
module.exports = { SEED, STYLES, screens, generateQRPattern };
