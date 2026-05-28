const { SEED, STYLES, generateQRPattern } = require('./generate.js');

const screensP2 = {
  'flow-11-sms': () => `
    <!DOCTYPE html><html><head><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #000; min-height: 100vh; }
      .status-bar { background: #000; padding: 12px 24px; display: flex; justify-content: space-between; color: white; font-size: 14px; }
      .messages { padding: 20px; }
      .bubble { background: #34c759; color: white; padding: 12px 16px; border-radius: 18px 18px 4px 18px; max-width: 280px; margin-left: auto; margin-bottom: 8px; font-size: 15px; line-height: 1.4; }
      .bubble.incoming { background: #3a3a3c; margin-left: 0; margin-right: auto; border-radius: 18px 18px 18px 4px; }
      .time { text-align: center; color: #8e8e93; font-size: 12px; margin: 16px 0; }
    </style></head>
    <body>
      <div class="status-bar"><span>9:44</span><span>5G 📶</span></div>
      <div style="background: #1c1c1e; padding: 12px 20px; border-bottom: 1px solid #3a3a3c;">
        <p style="color: white; font-weight: 600; text-align: center;">Lightning Pass</p>
      </div>
      <div class="messages">
        <div class="time">Today 9:44 AM</div>
        <div class="bubble incoming">
          🎉 You're confirmed for <strong>${SEED.event.name}</strong>!<br><br>
          📅 ${SEED.event.date}<br>
          🕕 ${SEED.event.time}<br>
          📍 ${SEED.event.venue}<br><br>
          🎫 VIP Pass - Yellow Wristband<br><br>
          🍹 Don't forget your FREE Metagave shot on arrival!<br><br>
          Show your QR code at the VIP entry lane.<br><br>
          View pass: thelightningpass.com/p/MK2026
        </div>
      </div>
    </body></html>
  `,

  'flow-12-qr-redirect': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar"><span>8:15</span><span>⚡ 5G 100%</span></div>
      <div class="container" style="text-align: center; display: flex; flex-direction: column; justify-content: center; min-height: calc(100vh - 50px);">
        <div style="font-size: 100px; margin-bottom: 16px;">✅</div>
        <h1 class="neon-green" style="font-size: 42px; margin-bottom: 16px;">WELCOME!</h1>
        <h2 style="margin-bottom: 24px;">Madison Kennedy</h2>

        <div class="card" style="background: linear-gradient(135deg, rgba(255,221,0,0.2), rgba(255,107,0,0.1)); border-color: #ffdd00;">
          <div style="font-size: 48px; margin-bottom: 8px;">👉</div>
          <h3 class="lightning-yellow">VIP ENTRY</h3>
          <p style="font-size: 18px; margin-top: 8px;">Head to the <strong>VIP lane</strong> on your right</p>
        </div>

        <div class="card" style="margin-top: 16px;">
          <p class="neon-green" style="font-size: 14px; margin-bottom: 8px;">🍹 YOUR VIP PERKS</p>
          <p style="font-size: 13px;">1 FREE Metagave shot at the bar</p>
          <p style="font-size: 13px;">50% OFF Metagave margaritas all night</p>
        </div>

        <p style="opacity: 0.6; font-size: 14px; margin-top: 24px;">${SEED.event.name} • ${SEED.event.venue}</p>
      </div>
    </body></html>
  `,

  'dj-song-request-guest': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}</style></head>
    <body>
      <div class="status-bar"><span>9:30</span><span>⚡ 5G 92%</span></div>
      <div class="container">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #bf00ff, #00d4ff); border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; font-size: 32px;">🎧</div>
          <h2>${SEED.event.dj}</h2>
          <p style="opacity: 0.7; font-size: 14px;">Live at ${SEED.event.venue}</p>
        </div>

        <h3 style="text-align: center; margin-bottom: 16px;">REQUEST A SONG</h3>

        <div class="card" style="cursor: pointer;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h4>STANDARD</h4>
              <p style="font-size: 12px; opacity: 0.7;">Added to queue</p>
            </div>
            <span class="neon-green" style="font-size: 24px; font-family: 'Bebas Neue';">$3</span>
          </div>
        </div>

        <div class="card" style="border-color: #ffdd00; background: rgba(255,221,0,0.05); cursor: pointer;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h4 class="lightning-yellow">PRIORITY</h4>
              <p style="font-size: 12px; opacity: 0.7;">Jumps ahead in queue</p>
            </div>
            <span class="lightning-yellow" style="font-size: 24px; font-family: 'Bebas Neue';">$10</span>
          </div>
        </div>

        <div class="card" style="border-color: #ff4444; background: rgba(255,68,68,0.1); cursor: pointer;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h4 style="color: #ff4444;">🔥 PLAY NOW</h4>
              <p style="font-size: 12px; opacity: 0.7;">Next song guaranteed</p>
            </div>
            <span style="color: #ff4444; font-size: 24px; font-family: 'Bebas Neue';">$25</span>
          </div>
        </div>

        <div class="card" style="margin-top: 24px; text-align: center;">
          <p style="font-size: 14px; margin-bottom: 12px;">💸 Want to tip ${SEED.event.dj}?</p>
          <div style="display: flex; gap: 8px; justify-content: center;">
            <button class="btn" style="background: rgba(255,255,255,0.1); color: white; padding: 8px 16px; font-size: 14px;">$5</button>
            <button class="btn" style="background: rgba(255,255,255,0.1); color: white; padding: 8px 16px; font-size: 14px;">$10</button>
            <button class="btn" style="background: rgba(255,255,255,0.1); color: white; padding: 8px 16px; font-size: 14px;">$20</button>
            <button class="btn" style="background: rgba(255,255,255,0.1); color: white; padding: 8px 16px; font-size: 14px;">Custom</button>
          </div>
        </div>
      </div>
    </body></html>
  `,

  'dj-dashboard': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}
      body { background: #0a0a0f; }
      .sidebar { width: 240px; background: #111; height: 100vh; position: fixed; left: 0; top: 0; padding: 20px; border-right: 1px solid rgba(255,255,255,0.1); }
      .main { margin-left: 260px; padding: 24px; }
      .queue-item { display: flex; align-items: center; gap: 16px; padding: 16px; border-radius: 12px; margin-bottom: 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); }
      .queue-item.now-playing { border-color: #39ff14; background: rgba(57,255,20,0.1); }
      .badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; }
      .badge-standard { background: rgba(255,255,255,0.2); color: white; }
      .badge-priority { background: #ffdd00; color: #000; }
      .badge-playnow { background: #ff4444; color: white; }
    </style></head>
    <body>
      <div class="sidebar">
        <h2 style="margin-bottom: 32px;">🎧 ${SEED.event.dj}</h2>
        <div class="card" style="background: rgba(57,255,20,0.1); border-color: #39ff14;">
          <p style="font-size: 12px; opacity: 0.7;">Tonight's Tips</p>
          <p class="neon-green" style="font-size: 32px; font-family: 'Bebas Neue';">$${SEED.djTips}</p>
        </div>
        <div class="card">
          <p style="font-size: 12px; opacity: 0.7;">Active Requests</p>
          <p style="font-size: 24px; font-family: 'Bebas Neue';">5</p>
        </div>
        <div class="card">
          <p style="font-size: 12px; opacity: 0.7;">Event</p>
          <p style="font-size: 14px;">${SEED.event.name}</p>
          <p style="font-size: 12px; opacity: 0.7;">${SEED.event.venue}</p>
        </div>
      </div>

      <div class="main">
        <h2 style="margin-bottom: 24px;">SONG REQUEST QUEUE</h2>

        <div class="queue-item now-playing">
          <div style="font-size: 24px;">▶️</div>
          <div style="flex: 1;">
            <p style="font-weight: bold;">Espresso</p>
            <p style="font-size: 13px; opacity: 0.7;">Sabrina Carpenter</p>
          </div>
          <span class="badge badge-priority">PRIORITY $10</span>
          <p style="font-size: 13px; opacity: 0.7;">Madison K.</p>
          <span class="neon-green">NOW PLAYING</span>
        </div>

        <div class="queue-item" style="border-color: #ff4444; background: rgba(255,68,68,0.05);">
          <div style="font-size: 24px;">🔥</div>
          <div style="flex: 1;">
            <p style="font-weight: bold;">Greedy</p>
            <p style="font-size: 13px; opacity: 0.7;">Tate McRae</p>
          </div>
          <span class="badge badge-playnow">PLAY NOW $25</span>
          <p style="font-size: 13px; opacity: 0.7;">Sam R.</p>
          <button class="btn btn-primary" style="padding: 8px 16px; font-size: 12px;">PLAY NEXT</button>
        </div>

        <div class="queue-item">
          <div style="font-size: 24px; opacity: 0.5;">2</div>
          <div style="flex: 1;">
            <p style="font-weight: bold;">Lose Control</p>
            <p style="font-size: 13px; opacity: 0.7;">Teddy Swims</p>
          </div>
          <span class="badge badge-priority">PRIORITY $10</span>
          <p style="font-size: 13px; opacity: 0.7;">Taylor W.</p>
        </div>

        <div class="queue-item">
          <div style="font-size: 24px; opacity: 0.5;">3</div>
          <div style="flex: 1;">
            <p style="font-weight: bold;">I Like The Way You Kiss Me</p>
            <p style="font-size: 13px; opacity: 0.7;">Artemas</p>
          </div>
          <span class="badge badge-standard">STANDARD $3</span>
          <p style="font-size: 13px; opacity: 0.7;">Jordan T.</p>
        </div>

        <div class="queue-item">
          <div style="font-size: 24px; opacity: 0.5;">4</div>
          <div style="flex: 1;">
            <p style="font-weight: bold;">Beautiful Things</p>
            <p style="font-size: 13px; opacity: 0.7;">Benson Boone</p>
          </div>
          <span class="badge badge-standard">STANDARD $3</span>
          <p style="font-size: 13px; opacity: 0.7;">Alex P.</p>
        </div>
      </div>
    </body></html>
  `,

  'dj-live-display': () => `
    <!DOCTYPE html><html><head><style>${STYLES.lightning}
      body { background: #000; overflow: hidden; }
      .display { height: 100vh; display: grid; grid-template-columns: 1fr 400px; }
      .now-playing { padding: 60px; display: flex; flex-direction: column; justify-content: center; }
      .qr-section { background: rgba(255,255,255,0.02); border-left: 1px solid rgba(255,255,255,0.1); padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
      .request-scroll { position: absolute; bottom: 0; left: 0; right: 400px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); padding: 20px 60px; }
      .scroll-item { display: inline-block; margin-right: 60px; animation: scroll 20s linear infinite; }
      @keyframes scroll { from { transform: translateX(100%); } to { transform: translateX(-100%); } }
    </style></head>
    <body>
      <div class="display">
        <div class="now-playing">
          <p style="font-size: 24px; opacity: 0.7; margin-bottom: 16px;">NOW PLAYING</p>
          <h1 style="font-size: 72px; margin-bottom: 8px;">Espresso</h1>
          <p style="font-size: 36px; opacity: 0.8;">Sabrina Carpenter</p>
          <p class="lightning-yellow" style="margin-top: 24px; font-size: 20px;">Requested by Madison K. • Priority</p>

          <div style="margin-top: 60px; padding: 24px; background: rgba(255,68,68,0.1); border: 2px solid #ff4444; border-radius: 16px;">
            <p style="font-size: 18px; opacity: 0.7;">🔥 UP NEXT</p>
            <p style="font-size: 32px; margin-top: 8px;"><strong>Greedy</strong> — Tate McRae</p>
            <p style="color: #ff4444; margin-top: 8px;">PLAY NOW request from Sam R.</p>
          </div>
        </div>

        <div class="qr-section">
          <h2 style="margin-bottom: 16px; text-align: center;">📱 REQUEST A SONG</h2>
          <div style="background: white; padding: 24px; border-radius: 16px; margin-bottom: 24px;">
            <svg viewBox="0 0 200 200" width="280" height="280">
              <rect fill="white" width="200" height="200"/>
              ${generateQRPattern()}
            </svg>
          </div>
          <p class="electric-blue" style="font-size: 18px; text-align: center; margin-bottom: 8px;">Scan to request</p>
          <p style="opacity: 0.7; font-size: 14px; text-align: center;">${SEED.event.dj} • ${SEED.event.venue}</p>
          <div style="margin-top: 24px; padding: 16px; background: rgba(57,255,20,0.1); border: 1px solid #39ff14; border-radius: 12px;">
            <p class="neon-green" style="font-size: 14px; text-align: center;">${SEED.event.name}</p>
          </div>
        </div>

        <div class="request-scroll">
          <div style="white-space: nowrap; overflow: hidden;">
            ${SEED.songRequests.map(r => `<span class="scroll-item" style="opacity: 0.7;">${r.guest} requested "${r.song}" • </span>`).join('')}
          </div>
        </div>
      </div>
    </body></html>
  `
};

module.exports = { screensP2 };
