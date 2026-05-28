const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

// Import all screen templates
const { SEED, screens, generateQRPattern } = require('./generate.js');
const { screensP2 } = require('./screens-part2.js');
const { screensVenue } = require('./screens-venue.js');
const { screensFinal } = require('./screens-final.js');

// Merge all screens
const allScreens = { ...screens, ...screensP2, ...screensVenue, ...screensFinal };

// Screenshot configurations
const configs = {
  // Mobile screens (390x844 @ 2x = 780x1688)
  mobile: {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    screens: [
      'flow-01-landing', 'flow-02-tier-select', 'flow-03-tier-vip-selected',
      'flow-04-promo-prompt', 'flow-05-promo-yes', 'flow-06-info-form',
      'flow-07-id-verify', 'flow-08-checkout-stripe', 'flow-09-confirmation',
      'flow-10-pass-qr', 'flow-11-sms', 'flow-12-qr-redirect',
      'dj-song-request-guest', 'brand-lightning', 'brand-beach-club'
    ]
  },
  // Desktop screens (1440x900 @ 2x = 2880x1800)
  desktop: {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    screens: [
      'dj-dashboard', 'venue-01-overview', 'venue-02-events-list',
      'venue-03-event-detail', 'venue-04-revenue-breakdown', 'venue-05-attendee-list',
      'venue-06-sponsor-panel', 'venue-07-create-event', 'venue-08-scanner',
      'venue-09-payouts', 'venue-10-promo-marketing'
    ]
  },
  // TV display (1920x1080 @ 2x = 3840x2160)
  tv: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2,
    screens: ['dj-live-display']
  }
};

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const outputDir = path.join(__dirname);
  const results = [];

  for (const [configName, config] of Object.entries(configs)) {
    console.log(`\n📱 Capturing ${configName} screens (${config.width}x${config.height} @2x)...\n`);

    for (const screenName of config.screens) {
      if (!allScreens[screenName]) {
        console.log(`  ⚠️  ${screenName} - template not found, skipping`);
        continue;
      }

      const page = await browser.newPage();
      await page.setViewport({
        width: config.width,
        height: config.height,
        deviceScaleFactor: config.deviceScaleFactor
      });

      // Generate HTML and load it
      const html = allScreens[screenName]();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      // Wait for fonts to load
      await page.evaluate(() => document.fonts.ready);
      await new Promise(r => setTimeout(r, 500)); // Extra delay for rendering

      // Capture screenshot
      const filename = `${screenName}.png`;
      const filepath = path.join(outputDir, filename);
      await page.screenshot({ path: filepath, fullPage: false });

      // Get file stats
      const stats = fs.statSync(filepath);
      const sizeKB = (stats.size / 1024).toFixed(1);

      results.push({
        name: filename,
        size: `${sizeKB} KB`,
        dimensions: `${config.width * config.deviceScaleFactor}x${config.height * config.deviceScaleFactor}`
      });

      console.log(`  ✅ ${filename} (${sizeKB} KB)`);
      await page.close();
    }
  }

  await browser.close();

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SCREENSHOT SUMMARY');
  console.log('='.repeat(60));
  console.log(`\n${'Filename'.padEnd(35)} ${'Size'.padEnd(12)} Dimensions`);
  console.log('-'.repeat(60));

  for (const r of results) {
    console.log(`${r.name.padEnd(35)} ${r.size.padEnd(12)} ${r.dimensions}`);
  }

  console.log('-'.repeat(60));
  console.log(`Total: ${results.length} screenshots captured`);
  console.log(`Output: ${outputDir}\n`);

  return results;
}

async function recordWorkflowVideo() {
  console.log('\n🎬 Recording workflow video...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2
  });

  const recorder = new PuppeteerScreenRecorder(page, {
    fps: 30,
    videoFrame: { width: 780, height: 1688 }
  });

  const videoPath = path.join(__dirname, 'workflow-guest-rsvp.mp4');
  await recorder.start(videoPath);

  // Flow through screens with transitions
  const flowScreens = [
    'flow-01-landing', 'flow-02-tier-select', 'flow-03-tier-vip-selected',
    'flow-04-promo-prompt', 'flow-05-promo-yes', 'flow-06-info-form',
    'flow-07-id-verify', 'flow-08-checkout-stripe', 'flow-09-confirmation',
    'flow-10-pass-qr'
  ];

  for (const screenName of flowScreens) {
    if (allScreens[screenName]) {
      const html = allScreens[screenName]();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      await new Promise(r => setTimeout(r, 2000)); // 2 seconds per screen
    }
  }

  await recorder.stop();
  await browser.close();

  const stats = fs.statSync(videoPath);
  console.log(`✅ Video saved: workflow-guest-rsvp.mp4 (${(stats.size / 1024 / 1024).toFixed(1)} MB)\n`);
}

// Main execution
async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('⚡ LIGHTNING PASS - PITCH DECK SCREENSHOT GENERATOR');
  console.log('='.repeat(60));
  console.log(`\nEvent: ${SEED.event.name}`);
  console.log(`Venue: ${SEED.event.venue}`);
  console.log(`DJ: ${SEED.event.dj}`);
  console.log(`Date: ${SEED.event.date}\n`);

  try {
    await captureScreenshots();

    // Try video recording (may fail if ffmpeg not installed)
    try {
      await recordWorkflowVideo();
    } catch (e) {
      console.log('⚠️  Video recording skipped (ffmpeg may not be installed)');
      console.log('   To enable: brew install ffmpeg\n');
    }

    console.log('🎉 All done! Screenshots ready for your pitch deck.\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
