const { SEED, STYLES, generateQRPattern } = require('./generate.js');

const screensFinal = {
  'venue-07-create-event': () => `
    <!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Rajdhani', sans-serif; background: #0a0a0f; color: white; }
      .nav { background: #111; padding: 16px 32px; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .main { padding: 32px; max-width: 800px; }
      .form-group { margin-bottom: 24px; }
      label { display: block; font-size: 12px; text-transform: uppercase; opacity: 0.7; margin-bottom: 8px; }
      input, textarea, select { width: 100%; padding: 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: white; font-size: 16px; font-family: inherit; }
      input:focus, textarea:focus { outline: none; border-color: #39ff14; }
      .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .neon-green { color: #39ff14; }
    </style></head>
    <body>
      <div class="nav">
        <p style="font-size: 14px; opacity: 0.7; margin-bottom: 4px;">← Back to Events</p>
        <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 28px;">CREATE NEW EVENT</h2>
      </div>

      <div class="main">
        <div style="display: flex; gap: 8px; margin-bottom: 32px;">
          <span style="padding: 8px 16px; background: #39ff14; color: #000; border-radius: 20px; font-size: 13px;">1. Details</span>
          <span style="padding: 8px 16px; background: rgba(255,255,255,0.1); border-radius: 20px; font-size: 13px;">2. Tickets</span>
          <span style="padding: 8px 16px; background: rgba(255,255,255,0.1); border-radius: 20px; font-size: 13px;">3. Sponsors</span>
          <span style="padding: 8px 16px; background: rgba(255,255,255,0.1); border-radius: 20px; font-size: 13px;">4. Publish</span>
        </div>

        <div class="form-group">
          <label>Event Name</label>
          <input type="text" value="${SEED.event.name}" />
        </div>

        <div class="form-group">
          <label>Tagline</label>
          <input type="text" value="${SEED.event.tagline}" />
        </div>

        <div class="row">
          <div class="form-group">
            <label>Date</label>
            <input type="text" value="June 13, 2026" />
          </div>
          <div class="form-group">
            <label>Time</label>
            <input type="text" value="6:00 PM – Midnight" />
          </div>
        </div>

        <div class="form-group">
          <label>Featured DJ</label>
          <input type="text" value="${SEED.event.dj}" />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea rows="4" style="resize: none;">Join us for an unforgettable evening of sunset views, premium tequila, and live DJ sets on the Gulf Coast. VIP guests enjoy exclusive Metagave Tequila perks all night long.</textarea>
        </div>

        <div style="display: flex; gap: 16px; margin-top: 32px;">
          <button style="padding: 14px 32px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: white; font-size: 16px; cursor: pointer;">Save Draft</button>
          <button style="padding: 14px 32px; background: linear-gradient(135deg, #39ff14, #00d4ff); border: none; border-radius: 8px; color: #000; font-family: 'Bebas Neue', sans-serif; font-size: 18px; cursor: pointer; flex: 1;">CONTINUE TO TICKETS →</button>
        </div>
      </div>
    </body></html>
  `,

  'venue-08-scanner': () => `
    <!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Rajdhani', sans-serif; background: #0a0a0f; color: white; min-height: 100vh; display: flex; flex-direction: column; }
      .header { background: #111; padding: 16px 24px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px; }
      .success-card { background: rgba(57,255,20,0.1); border: 3px solid #39ff14; border-radius: 24px; padding: 48px; text-align: center; max-width: 500px; }
      .neon-green { color: #39ff14; }
    </style></head>
    <body>
      <div class="header">
        <h2 style="font-family: 'Bebas Neue', sans-serif;">⚡ ${SEED.event.venue.toUpperCase()} — SCANNER</h2>
        <p style="opacity: 0.7; font-size: 14px;">${SEED.event.name} • 215 / 247 scanned</p>
      </div>

      <div class="main">
        <div class="success-card">
          <div style="font-size: 80px; margin-bottom: 16px;">✅</div>
          <h1 class="neon-green" style="font-family: 'Bebas Neue', sans-serif; font-size: 48px; margin-bottom: 8px;">ENTRY ACCEPTED</h1>

          <div style="background: #ffdd00; color: #000; padding: 12px 24px; border-radius: 12px; display: inline-block; margin: 16px 0;">
            <p style="font-family: 'Bebas Neue', sans-serif; font-size: 24px;">⚡ VIP PASS</p>
          </div>

          <h2 style="font-size: 28px; margin-bottom: 8px;">Madison Kennedy</h2>
          <p style="opacity: 0.7; margin-bottom: 24px;">madison.k@gmail.com</p>

          <div style="background: rgba(255,221,0,0.1); border: 1px solid #ffdd00; border-radius: 12px; padding: 16px; text-align: left;">
            <p style="font-size: 14px; font-weight: bold; color: #ffdd00; margin-bottom: 8px;">🎫 YELLOW WRISTBAND</p>
            <p style="font-size: 13px; opacity: 0.8;">• 1 FREE Metagave shot at bar</p>
            <p style="font-size: 13px; opacity: 0.8;">• 50% OFF Metagave margaritas</p>
          </div>
        </div>

        <button style="margin-top: 32px; padding: 16px 48px; background: linear-gradient(135deg, #39ff14, #00d4ff); border: none; border-radius: 12px; font-family: 'Bebas Neue', sans-serif; font-size: 20px; cursor: pointer;">
          📷 SCAN NEXT GUEST
        </button>
      </div>
    </body></html>
  `,

  'venue-09-payouts': () => `
    <!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Rajdhani', sans-serif; background: #0a0a0f; color: white; }
      .nav { background: #111; padding: 16px 32px; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .main { padding: 32px; }
      .payout-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; margin-bottom: 16px; }
      .split-bar { height: 24px; border-radius: 12px; display: flex; overflow: hidden; margin: 16px 0; }
      .neon-green { color: #39ff14; }
      .lightning-yellow { color: #ffdd00; }
    </style></head>
    <body>
      <div class="nav">
        <h2 style="font-family: 'Bebas Neue', sans-serif;">⚡ ${SEED.event.venue.toUpperCase()} — PAYOUTS</h2>
      </div>

      <div class="main">
        <div class="payout-card" style="border-color: #39ff14; background: rgba(57,255,20,0.05);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
              <p style="font-size: 14px; opacity: 0.7;">${SEED.event.name}</p>
              <p style="font-size: 32px; font-family: 'Bebas Neue', sans-serif; color: #39ff14;">$${SEED.stats.ticketRevenue}</p>
            </div>
            <span style="padding: 8px 16px; background: #39ff14; color: #000; border-radius: 20px; font-size: 13px;">PAID OUT</span>
          </div>

          <p style="font-size: 14px; margin-bottom: 8px;">Revenue Split</p>
          <div class="split-bar">
            <div style="width: 80%; background: #39ff14;"></div>
            <div style="width: 20%; background: #00d4ff;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 14px;">
            <span><span class="neon-green">■</span> Beach Club: $456 (80%)</span>
            <span><span style="color: #00d4ff;">■</span> Lightning Pass: $114 (20%)</span>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="font-size: 13px; opacity: 0.7;">Payout Details</p>
            <p style="font-size: 14px;">Bank: ****4892 • Processed: June 14, 2026</p>
          </div>
        </div>

        <div class="payout-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="font-size: 14px; opacity: 0.7;">Memorial Day Weekend</p>
              <p style="font-size: 24px; font-family: 'Bebas Neue', sans-serif;">$2,340</p>
            </div>
            <span style="padding: 8px 16px; background: rgba(57,255,20,0.2); color: #39ff14; border-radius: 20px; font-size: 13px;">PAID OUT</span>
          </div>
        </div>

        <div class="payout-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="font-size: 14px; opacity: 0.7;">Summer Sessions Vol. 2</p>
              <p style="font-size: 24px; font-family: 'Bebas Neue', sans-serif; color: #ffdd00;">$280</p>
            </div>
            <span style="padding: 8px 16px; background: rgba(255,221,0,0.2); color: #ffdd00; border-radius: 20px; font-size: 13px;">PENDING</span>
          </div>
        </div>
      </div>
    </body></html>
  `,

  'venue-10-promo-marketing': () => `
    <!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Rajdhani', sans-serif; background: #0a0a0f; color: white; }
      .nav { background: #111; padding: 16px 32px; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .main { padding: 32px; display: grid; grid-template-columns: 1fr 400px; gap: 32px; }
      textarea { width: 100%; padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: white; font-size: 16px; font-family: inherit; resize: none; }
      .preview { background: #1c1c1e; border-radius: 16px; padding: 20px; }
      .neon-green { color: #39ff14; }
    </style></head>
    <body>
      <div class="nav">
        <h2 style="font-family: 'Bebas Neue', sans-serif;">⚡ SMS MARKETING</h2>
        <p style="opacity: 0.7;">${SEED.stats.totalRsvps} opted-in guests from ${SEED.event.name}</p>
      </div>

      <div class="main">
        <div>
          <h3 style="font-family: 'Bebas Neue', sans-serif; margin-bottom: 16px;">COMPOSE MESSAGE</h3>
          <textarea rows="8">🎉 You rocked Sunset Bash! Don't miss Summer Sessions Vol. 2 this Saturday.

🎧 DJ Miko • Live at 8PM
📍 Beach Club Siesta Key
🍹 VIP: Free drink + skip the line

RSVP FREE: thelightningpass.com/e/summer2

Reply STOP to unsubscribe</textarea>

          <div style="display: flex; justify-content: space-between; margin-top: 16px;">
            <span style="font-size: 14px; opacity: 0.7;">Characters: 248 / 320</span>
            <span style="font-size: 14px; opacity: 0.7;">1 SMS segment</span>
          </div>

          <div style="margin-top: 24px; padding: 16px; background: rgba(255,221,0,0.1); border: 1px solid #ffdd00; border-radius: 12px;">
            <p style="font-size: 14px; color: #ffdd00; margin-bottom: 8px;">📊 AUDIENCE</p>
            <p style="font-size: 24px; font-family: 'Bebas Neue', sans-serif;">${SEED.stats.totalRsvps} guests</p>
            <p style="font-size: 13px; opacity: 0.7;">Opted-in from ${SEED.event.name}</p>
          </div>

          <button style="width: 100%; margin-top: 24px; padding: 16px; background: linear-gradient(135deg, #39ff14, #00d4ff); border: none; border-radius: 12px; font-family: 'Bebas Neue', sans-serif; font-size: 18px; cursor: pointer;">
            📤 SEND TO ${SEED.stats.totalRsvps} GUESTS
          </button>
        </div>

        <div>
          <h3 style="font-family: 'Bebas Neue', sans-serif; margin-bottom: 16px;">PREVIEW</h3>
          <div class="preview">
            <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
              <span style="color: #8e8e93; font-size: 14px;">Beach Club</span>
              <span style="color: #8e8e93; font-size: 14px;">now</span>
            </div>
            <div style="background: #3a3a3c; padding: 12px 16px; border-radius: 18px; font-size: 15px; line-height: 1.5;">
              🎉 You rocked Sunset Bash! Don't miss Summer Sessions Vol. 2 this Saturday.<br><br>
              🎧 DJ Miko • Live at 8PM<br>
              📍 Beach Club Siesta Key<br>
              🍹 VIP: Free drink + skip the line<br><br>
              RSVP FREE: thelightningpass.com/e/summer2
            </div>
          </div>
        </div>
      </div>
    </body></html>
  `,

  'brand-lightning': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar"><span>9:41</span><span>⚡ 5G 100%</span></div>
      <div class="container">
        <div style="text-align: center; margin-bottom: 16px;">
          <p style="font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 4px; opacity: 0.7;">POWERED BY</p>
          <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 28px; background: linear-gradient(135deg, #39ff14, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">⚡ LIGHTNING PASS</h1>
        </div>

        <div style="height: 180px; background: linear-gradient(to bottom, rgba(255,140,0,0.4), transparent), linear-gradient(135deg, #1a1a2e, #2a2a4e); border-radius: 16px; display: flex; align-items: flex-end; padding: 20px; margin-bottom: 20px;">
          <div>
            <h1 style="font-size: 36px; font-family: 'Bebas Neue', sans-serif;">${SEED.event.name.toUpperCase()}</h1>
            <p style="font-size: 14px; opacity: 0.9;">${SEED.event.tagline}</p>
          </div>
        </div>

        <div class="card">
          <p class="lightning-yellow" style="font-size: 14px; margin-bottom: 8px;">📅 ${SEED.event.date}</p>
          <p style="font-size: 14px; margin-bottom: 8px;">📍 ${SEED.event.venue}</p>
          <p class="electric-purple" style="font-size: 14px;">🎧 ${SEED.event.dj}</p>
        </div>

        <div class="card" style="background: rgba(57,255,20,0.1); border-color: #39ff14;">
          <p style="text-align: center; margin-bottom: 8px;">🍹 <span class="neon-green">METAGAVE</span> VIP Night</p>
          <p style="text-align: center; font-size: 13px; opacity: 0.8;">Free shot + 50% off margaritas</p>
        </div>

        <button class="btn btn-primary" style="width: 100%; margin-top: 16px; font-size: 22px;">⚡ RSVP NOW</button>

        <div class="partner-logos" style="margin-top: 20px;">
          ${SEED.partners.map(p => `<div class="partner-logo">${p.name}</div>`).join('')}
        </div>
      </div>
    </body></html>
  `,

  'brand-beach-club': () => `
    <!DOCTYPE html><html><head><style>${STYLES.beachClub}</style></head>
    <body>
      <div class="domain-bar">🔒 pass.beachclubsiestakey.com</div>
      <div class="status-bar" style="background: #0a1628; padding: 12px 24px; display: flex; justify-content: space-between; color: white; font-size: 14px;">
        <span>9:41</span><span>5G 📶</span>
      </div>

      <div class="container">
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #d4a853, #c49a47); border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
            <span style="font-size: 32px;">🏖️</span>
          </div>
          <h1 style="font-family: 'Playfair Display', serif; font-size: 22px; color: #d4a853;">Beach Club Pass</h1>
        </div>

        <div style="height: 180px; background: linear-gradient(to bottom, rgba(212,168,83,0.3), transparent), linear-gradient(135deg, #1a2a4a, #0d1a2d); border-radius: 12px; display: flex; align-items: flex-end; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(212,168,83,0.3);">
          <div>
            <h1 style="font-size: 32px; font-family: 'Playfair Display', serif;">${SEED.event.name}</h1>
            <p style="font-size: 14px; opacity: 0.9; font-style: italic;">${SEED.event.tagline}</p>
          </div>
        </div>

        <div class="card">
          <p class="gold" style="font-size: 14px; margin-bottom: 8px;">📅 ${SEED.event.date}</p>
          <p style="font-size: 14px; margin-bottom: 8px;">📍 ${SEED.event.venue}</p>
          <p style="font-size: 14px; color: #8ab4d8;">🎧 ${SEED.event.dj}</p>
        </div>

        <div class="card" style="background: rgba(212,168,83,0.1); border-color: #d4a853;">
          <p style="text-align: center; margin-bottom: 8px; font-family: 'Playfair Display', serif;">🍹 <span class="gold">Metagave Tequila</span> VIP Experience</p>
          <p style="text-align: center; font-size: 13px; opacity: 0.8;">Complimentary shot + half-price margaritas</p>
        </div>

        <button class="btn btn-primary" style="width: 100%; margin-top: 16px; font-size: 18px;">Reserve Your Spot</button>

        <div style="display: flex; justify-content: center; gap: 16px; margin-top: 20px; flex-wrap: wrap;">
          ${SEED.partners.map(p => `<span style="font-size: 11px; opacity: 0.6; padding: 6px 12px; background: rgba(255,255,255,0.05); border-radius: 6px;">${p.name}</span>`).join('')}
        </div>
      </div>
    </body></html>
  `
};

module.exports = { screensFinal };
