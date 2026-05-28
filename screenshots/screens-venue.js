const { SEED, STYLES } = require('./generate.js');

const screensVenue = {
  'venue-01-overview': () => `
    <!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Rajdhani', sans-serif; background: #0a0a0f; color: white; }
      .nav { background: #111; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .main { padding: 32px; }
      .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px; }
      .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; }
      .stat-value { font-size: 42px; font-family: 'Bebas Neue', sans-serif; }
      .event-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
      .neon-green { color: #39ff14; }
      .lightning-yellow { color: #ffdd00; }
      .electric-blue { color: #00d4ff; }
    </style></head>
    <body>
      <div class="nav">
        <h2 style="font-family: 'Bebas Neue', sans-serif;">⚡ ${SEED.event.venue.toUpperCase()}</h2>
        <div style="display: flex; gap: 24px; font-size: 14px;">
          <span style="color: #39ff14;">Dashboard</span>
          <span style="opacity: 0.7;">Events</span>
          <span style="opacity: 0.7;">Revenue</span>
          <span style="opacity: 0.7;">Sponsors</span>
          <span style="opacity: 0.7;">Settings</span>
        </div>
      </div>

      <div class="main">
        <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 36px; margin-bottom: 24px;">DASHBOARD</h1>

        <div class="stats">
          <div class="stat-card">
            <p style="font-size: 14px; opacity: 0.7; margin-bottom: 8px;">Total RSVPs</p>
            <p class="stat-value neon-green">${SEED.stats.totalRsvps}</p>
            <p style="font-size: 12px; color: #39ff14; margin-top: 8px;">↑ 23% this week</p>
          </div>
          <div class="stat-card">
            <p style="font-size: 14px; opacity: 0.7; margin-bottom: 8px;">Ticket Revenue</p>
            <p class="stat-value lightning-yellow">$${SEED.stats.ticketRevenue}</p>
            <p style="font-size: 12px; opacity: 0.7; margin-top: 8px;">VIP: $${SEED.tiers.vip.count * SEED.tiers.vip.price}</p>
          </div>
          <div class="stat-card">
            <p style="font-size: 14px; opacity: 0.7; margin-bottom: 8px;">Sponsor Attributed</p>
            <p class="stat-value electric-blue">$${SEED.stats.attributedRevenue.toLocaleString()}</p>
            <p style="font-size: 12px; opacity: 0.7; margin-top: 8px;">Metagave Tequila</p>
          </div>
          <div class="stat-card">
            <p style="font-size: 14px; opacity: 0.7; margin-bottom: 8px;">Check-in Rate</p>
            <p class="stat-value">87%</p>
            <p style="font-size: 12px; opacity: 0.7; margin-top: 8px;">215 / 247 scanned</p>
          </div>
        </div>

        <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 24px; margin-bottom: 16px;">FEATURED EVENT</h2>
        <div class="event-card" style="border-color: #39ff14; background: rgba(57,255,20,0.05);">
          <div>
            <p style="font-size: 12px; color: #39ff14; margin-bottom: 4px;">● LIVE NOW</p>
            <h3 style="font-size: 24px; font-family: 'Bebas Neue', sans-serif;">${SEED.event.name.toUpperCase()}</h3>
            <p style="font-size: 14px; opacity: 0.7;">${SEED.event.date} • ${SEED.event.dj}</p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 32px; font-family: 'Bebas Neue', sans-serif;">${SEED.stats.totalRsvps}</p>
            <p style="font-size: 12px; opacity: 0.7;">RSVPs</p>
          </div>
        </div>

        <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 24px; margin: 24px 0 16px;">UPCOMING EVENTS</h2>
        <div class="event-card">
          <div>
            <h3 style="font-size: 18px;">Summer Sessions Vol. 2</h3>
            <p style="font-size: 14px; opacity: 0.7;">Saturday, June 21 • DJ Miko</p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 24px; font-family: 'Bebas Neue', sans-serif;">89</p>
            <p style="font-size: 12px; opacity: 0.7;">RSVPs</p>
          </div>
        </div>
      </div>
    </body></html>
  `,

  'venue-02-events-list': () => `
    <!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Rajdhani', sans-serif; background: #0a0a0f; color: white; }
      .nav { background: #111; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .main { padding: 32px; }
      .event-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 16px; padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); align-items: center; }
      .event-row:hover { background: rgba(255,255,255,0.02); }
      .event-row.header { font-size: 12px; opacity: 0.7; text-transform: uppercase; }
      .badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; }
      .badge-live { background: #39ff14; color: #000; }
      .badge-upcoming { background: #00d4ff; color: #000; }
      .badge-past { background: rgba(255,255,255,0.2); }
      .neon-green { color: #39ff14; }
    </style></head>
    <body>
      <div class="nav">
        <h2 style="font-family: 'Bebas Neue', sans-serif;">⚡ ${SEED.event.venue.toUpperCase()}</h2>
        <div style="display: flex; gap: 24px; font-size: 14px;">
          <span style="opacity: 0.7;">Dashboard</span>
          <span class="neon-green">Events</span>
          <span style="opacity: 0.7;">Revenue</span>
          <span style="opacity: 0.7;">Sponsors</span>
        </div>
      </div>

      <div class="main">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 36px;">EVENTS</h1>
          <button style="padding: 12px 24px; background: linear-gradient(135deg, #39ff14, #00d4ff); border: none; border-radius: 8px; font-family: 'Bebas Neue', sans-serif; font-size: 16px; cursor: pointer;">+ CREATE EVENT</button>
        </div>

        <div class="event-row header">
          <span>Event</span><span>Date</span><span>RSVPs</span><span>Revenue</span><span>Status</span>
        </div>

        <div class="event-row" style="background: rgba(57,255,20,0.05); border-left: 3px solid #39ff14;">
          <div>
            <p style="font-weight: bold;">${SEED.event.name}</p>
            <p style="font-size: 13px; opacity: 0.7;">${SEED.event.dj} • Metagave Activation</p>
          </div>
          <span>${SEED.event.date}</span>
          <span style="font-family: 'Bebas Neue', sans-serif; font-size: 20px;">${SEED.stats.totalRsvps}</span>
          <span style="color: #ffdd00;">$${SEED.stats.ticketRevenue}</span>
          <span class="badge badge-live">● LIVE</span>
        </div>

        <div class="event-row">
          <div>
            <p style="font-weight: bold;">Summer Sessions Vol. 2</p>
            <p style="font-size: 13px; opacity: 0.7;">DJ Miko</p>
          </div>
          <span>Sat, June 21</span>
          <span style="font-family: 'Bebas Neue', sans-serif; font-size: 20px;">89</span>
          <span style="color: #ffdd00;">$280</span>
          <span class="badge badge-upcoming">UPCOMING</span>
        </div>

        <div class="event-row">
          <div>
            <p style="font-weight: bold;">Fourth of July Bash</p>
            <p style="font-size: 13px; opacity: 0.7;">DJ Rudo • Live Band</p>
          </div>
          <span>Fri, July 4</span>
          <span style="font-family: 'Bebas Neue', sans-serif; font-size: 20px;">156</span>
          <span style="color: #ffdd00;">$890</span>
          <span class="badge badge-upcoming">UPCOMING</span>
        </div>

        <div class="event-row" style="opacity: 0.6;">
          <div>
            <p style="font-weight: bold;">Memorial Day Weekend</p>
            <p style="font-size: 13px; opacity: 0.7;">Various DJs</p>
          </div>
          <span>May 24-26</span>
          <span style="font-family: 'Bebas Neue', sans-serif; font-size: 20px;">412</span>
          <span>$2,340</span>
          <span class="badge badge-past">COMPLETED</span>
        </div>
      </div>
    </body></html>
  `,

  'venue-03-event-detail': () => `
    <!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Rajdhani', sans-serif; background: #0a0a0f; color: white; }
      .nav { background: #111; padding: 16px 32px; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .main { padding: 32px; }
      .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
      .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; }
      .attendee-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 16px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
      .neon-green { color: #39ff14; }
      .lightning-yellow { color: #ffdd00; }
    </style></head>
    <body>
      <div class="nav">
        <p style="font-size: 14px; opacity: 0.7; margin-bottom: 8px;">← Back to Events</p>
        <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 32px;">${SEED.event.name.toUpperCase()}</h2>
        <p style="opacity: 0.7;">${SEED.event.date} • ${SEED.event.venue}</p>
      </div>

      <div class="main">
        <div class="stats">
          <div class="stat-card">
            <p style="font-size: 12px; opacity: 0.7;">General Entry</p>
            <p style="font-size: 32px; font-family: 'Bebas Neue', sans-serif;">${SEED.tiers.ga.count}</p>
            <p style="font-size: 12px; opacity: 0.7;">FREE</p>
          </div>
          <div class="stat-card" style="border-color: #ffdd00;">
            <p style="font-size: 12px; opacity: 0.7;">VIP</p>
            <p style="font-size: 32px; font-family: 'Bebas Neue', sans-serif; color: #ffdd00;">${SEED.tiers.vip.count}</p>
            <p style="font-size: 12px; color: #ffdd00;">$10 each</p>
          </div>
          <div class="stat-card">
            <p style="font-size: 12px; opacity: 0.7;">VIP Conversion</p>
            <p style="font-size: 32px; font-family: 'Bebas Neue', sans-serif; color: #39ff14;">${SEED.stats.vipConversion}</p>
          </div>
          <div class="stat-card">
            <p style="font-size: 12px; opacity: 0.7;">Checked In</p>
            <p style="font-size: 32px; font-family: 'Bebas Neue', sans-serif;">215</p>
            <p style="font-size: 12px; opacity: 0.7;">of ${SEED.stats.totalRsvps}</p>
          </div>
        </div>

        <h3 style="font-family: 'Bebas Neue', sans-serif; font-size: 20px; margin-bottom: 16px;">ATTENDEE LIST</h3>
        <div style="background: rgba(255,255,255,0.02); border-radius: 12px; overflow: hidden;">
          <div class="attendee-row" style="background: rgba(255,255,255,0.05); font-size: 12px; text-transform: uppercase; opacity: 0.7;">
            <span>Guest</span><span>Tier</span><span>Check-in</span><span>Promo Opt-in</span>
          </div>
          ${SEED.guests.slice(0, 8).map((g, i) => `
            <div class="attendee-row">
              <span>${g}</span>
              <span style="color: ${i % 3 === 0 ? '#ffdd00' : 'inherit'};">${i % 3 === 0 ? 'VIP' : 'GA'}</span>
              <span style="color: #39ff14;">✓ ${8 + i}:${15 + i * 3} PM</span>
              <span>${i % 2 === 0 ? '✓ Yes' : '—'}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </body></html>
  `,

  'venue-04-revenue-breakdown': () => `
    <!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Rajdhani', sans-serif; background: #0a0a0f; color: white; }
      .nav { background: #111; padding: 16px 32px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .main { padding: 32px; display: grid; grid-template-columns: 1fr 400px; gap: 32px; }
      .chart { height: 300px; display: flex; align-items: flex-end; gap: 24px; padding: 24px; background: rgba(255,255,255,0.02); border-radius: 16px; }
      .bar { flex: 1; border-radius: 8px 8px 0 0; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding-bottom: 8px; }
      .revenue-row { display: flex; justify-content: space-between; padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .neon-green { color: #39ff14; }
      .lightning-yellow { color: #ffdd00; }
      .electric-blue { color: #00d4ff; }
      .electric-purple { color: #bf00ff; }
    </style></head>
    <body>
      <div class="nav">
        <h2 style="font-family: 'Bebas Neue', sans-serif;">⚡ ${SEED.event.venue.toUpperCase()}</h2>
        <div style="display: flex; gap: 24px; font-size: 14px;">
          <span style="opacity: 0.7;">Dashboard</span>
          <span style="opacity: 0.7;">Events</span>
          <span class="neon-green">Revenue</span>
          <span style="opacity: 0.7;">Sponsors</span>
        </div>
      </div>

      <div class="main">
        <div>
          <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 36px; margin-bottom: 24px;">REVENUE BREAKDOWN</h1>
          <p style="opacity: 0.7; margin-bottom: 24px;">${SEED.event.name} • ${SEED.event.date}</p>

          <div class="chart">
            <div class="bar" style="height: 45%; background: linear-gradient(to top, #ffdd00, #ff6b00);">
              <span style="font-size: 14px; margin-top: 8px;">VIP</span>
              <span style="font-family: 'Bebas Neue', sans-serif; font-size: 18px;">$570</span>
            </div>
            <div class="bar" style="height: 75%; background: linear-gradient(to top, #00d4ff, #bf00ff);">
              <span style="font-size: 14px; margin-top: 8px;">Sponsor</span>
              <span style="font-family: 'Bebas Neue', sans-serif; font-size: 18px;">$2,394</span>
            </div>
            <div class="bar" style="height: 15%; background: linear-gradient(to top, #39ff14, #00d4ff);">
              <span style="font-size: 14px; margin-top: 8px;">Songs</span>
              <span style="font-family: 'Bebas Neue', sans-serif; font-size: 18px;">$185</span>
            </div>
            <div class="bar" style="height: 25%; background: rgba(255,255,255,0.3);">
              <span style="font-size: 14px; margin-top: 8px;">Other</span>
              <span style="font-family: 'Bebas Neue', sans-serif; font-size: 18px;">$340</span>
            </div>
          </div>
        </div>

        <div>
          <div style="background: rgba(255,255,255,0.02); border-radius: 16px; overflow: hidden;">
            <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <p style="font-size: 14px; opacity: 0.7;">Total Event Revenue</p>
              <p style="font-size: 42px; font-family: 'Bebas Neue', sans-serif; color: #39ff14;">$3,489</p>
            </div>
            <div class="revenue-row">
              <span>VIP RSVPs (57 × $10)</span>
              <span class="lightning-yellow">$570</span>
            </div>
            <div class="revenue-row">
              <span>Metagave Attribution</span>
              <span class="electric-blue">$2,394</span>
            </div>
            <div class="revenue-row">
              <span>Song Requests + Tips</span>
              <span class="neon-green">$185</span>
            </div>
            <div class="revenue-row">
              <span>Line Skip / AYCD</span>
              <span>$340</span>
            </div>
          </div>
        </div>
      </div>
    </body></html>
  `,

  'venue-05-attendee-list': () => `
    <!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Rajdhani', sans-serif; background: #0a0a0f; color: white; }
      .nav { background: #111; padding: 16px 32px; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .main { padding: 32px; }
      table { width: 100%; border-collapse: collapse; }
      th { text-align: left; padding: 12px 16px; font-size: 12px; text-transform: uppercase; opacity: 0.7; border-bottom: 1px solid rgba(255,255,255,0.1); }
      td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
      .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; }
      .badge-vip { background: #ffdd00; color: #000; }
      .badge-ga { background: rgba(255,255,255,0.2); }
      .neon-green { color: #39ff14; }
    </style></head>
    <body>
      <div class="nav">
        <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 24px;">${SEED.event.name.toUpperCase()} — ATTENDEES</h2>
        <p style="opacity: 0.7;">${SEED.stats.totalRsvps} RSVPs • 215 Checked In</p>
      </div>

      <div class="main">
        <table>
          <thead>
            <tr><th>Guest</th><th>Email</th><th>Tier</th><th>Check-in</th><th>Promo</th></tr>
          </thead>
          <tbody>
            ${SEED.guests.map((g, i) => `
              <tr>
                <td style="font-weight: bold;">${g}</td>
                <td style="opacity: 0.7;">${g.toLowerCase().replace(' ', '.').replace('.', '')}@gmail.com</td>
                <td><span class="badge ${i % 4 === 0 ? 'badge-vip' : 'badge-ga'}">${i % 4 === 0 ? 'VIP' : 'GA'}</span></td>
                <td class="neon-green">✓ ${7 + Math.floor(i / 2)}:${10 + i * 5} PM</td>
                <td>${i % 2 === 0 ? '✓' : '—'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </body></html>
  `,

  'venue-06-sponsor-panel': () => `
    <!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Rajdhani', sans-serif; background: #0a0a0f; color: white; }
      .nav { background: #111; padding: 16px 32px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .main { padding: 32px; }
      .sponsor-header { background: linear-gradient(135deg, rgba(0,212,255,0.1), rgba(191,0,255,0.1)); border: 1px solid #00d4ff; border-radius: 16px; padding: 32px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center; }
      .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px; }
      .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; }
      .electric-blue { color: #00d4ff; }
      .neon-green { color: #39ff14; }
    </style></head>
    <body>
      <div class="nav">
        <h2 style="font-family: 'Bebas Neue', sans-serif;">⚡ ${SEED.event.venue.toUpperCase()}</h2>
        <div style="display: flex; gap: 24px; font-size: 14px;">
          <span style="opacity: 0.7;">Dashboard</span>
          <span style="opacity: 0.7;">Events</span>
          <span style="opacity: 0.7;">Revenue</span>
          <span class="electric-blue">Sponsors</span>
        </div>
      </div>

      <div class="main">
        <div class="sponsor-header">
          <div>
            <p style="font-size: 14px; opacity: 0.7; margin-bottom: 8px;">FEATURED SPONSOR</p>
            <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 42px;">🍹 METAGAVE TEQUILA</h1>
            <p style="opacity: 0.7;">Active for: ${SEED.event.name}</p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 14px; opacity: 0.7;">Total Attribution</p>
            <p style="font-size: 48px; font-family: 'Bebas Neue', sans-serif; color: #00d4ff;">$${SEED.stats.attributedRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div class="stats">
          <div class="stat-card">
            <p style="font-size: 14px; opacity: 0.7; margin-bottom: 8px;">Attributed Drinks</p>
            <p style="font-size: 36px; font-family: 'Bebas Neue', sans-serif;">${SEED.stats.attributedDrinks}</p>
            <p style="font-size: 13px; opacity: 0.7;">Metagave margaritas sold</p>
          </div>
          <div class="stat-card">
            <p style="font-size: 14px; opacity: 0.7; margin-bottom: 8px;">VIP Redemptions</p>
            <p style="font-size: 36px; font-family: 'Bebas Neue', sans-serif; color: #ffdd00;">${SEED.tiers.vip.count}</p>
            <p style="font-size: 13px; opacity: 0.7;">Free shots claimed</p>
          </div>
          <div class="stat-card">
            <p style="font-size: 14px; opacity: 0.7; margin-bottom: 8px;">RSVP Database</p>
            <p style="font-size: 36px; font-family: 'Bebas Neue', sans-serif; color: #39ff14;">${SEED.stats.totalRsvps}</p>
            <p style="font-size: 13px; opacity: 0.7;">Opted-in guests delivered</p>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.02); border-radius: 16px; padding: 24px;">
          <h3 style="font-family: 'Bebas Neue', sans-serif; margin-bottom: 16px;">ACTIVATION PERKS</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="padding: 16px; background: rgba(57,255,20,0.1); border-radius: 8px;">
              <p style="color: #39ff14; font-weight: bold;">🍹 Free Shot on Arrival</p>
              <p style="font-size: 13px; opacity: 0.7;">VIP guests receive 1 free Metagave tequila shot</p>
            </div>
            <div style="padding: 16px; background: rgba(255,221,0,0.1); border-radius: 8px;">
              <p style="color: #ffdd00; font-weight: bold;">🍸 50% Off Margaritas</p>
              <p style="font-size: 13px; opacity: 0.7;">All Metagave margaritas half price for VIP</p>
            </div>
          </div>
        </div>
      </div>
    </body></html>
  `
};

module.exports = { screensVenue };
