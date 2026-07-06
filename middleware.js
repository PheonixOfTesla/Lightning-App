/**
 * Vercel Edge Middleware
 *
 * Detects social media crawlers and proxies their requests to the backend
 * OG endpoint which returns server-rendered HTML with proper meta tags.
 *
 * Regular users get the static SPA (client-side JS).
 * Crawlers get server-rendered HTML with OG tags already in the markup.
 */

const BACKEND_URL = 'https://lightning-backend-production.up.railway.app';

// Social media crawler user-agent patterns
const CRAWLER_PATTERNS = [
  'facebookexternalhit',  // Facebook, Instagram
  'Facebot',              // Facebook
  'Twitterbot',           // Twitter/X
  'LinkedInBot',          // LinkedIn
  'WhatsApp',             // WhatsApp
  'Slackbot',             // Slack
  'Discordbot',           // Discord
  'TelegramBot',          // Telegram
  'Pinterest',            // Pinterest
  'Applebot',             // Apple (iMessage previews)
  'Googlebot',            // Google (for SEO)
  'bingbot',              // Bing
  'Baiduspider',          // Baidu
  'yandex',               // Yandex
  'DuckDuckBot',          // DuckDuckGo
  'vkShare',              // VK
  'Embedly',              // Embedly
  'Quora Link Preview',   // Quora
  'redditbot',            // Reddit
  'Snapchat',             // Snapchat
];

export const config = {
  // Only run on @handle and event routes
  matcher: [
    '/@:path*',
    '/h/:path*',
    '/events/:path*',
  ],
};

export default async function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Check if this is a crawler
  const isCrawler = CRAWLER_PATTERNS.some(pattern =>
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );

  // If not a crawler, let Vercel serve the static file
  if (!isCrawler) {
    return;
  }

  // Determine which OG endpoint to call
  let ogPath = null;

  // @handle routes: /@babyl-media-group
  if (pathname.startsWith('/@')) {
    const handle = pathname.substring(2).split('/')[0]; // Remove /@ and get handle
    ogPath = `/api/v1/og/@${handle}`;
  }
  // /h/:hostSlug routes
  else if (pathname.startsWith('/h/')) {
    const hostSlug = pathname.substring(3).split('/')[0]; // Remove /h/ and get slug
    ogPath = `/api/v1/og/@${hostSlug}`;
  }
  // /events/:slug routes
  else if (pathname.startsWith('/events/')) {
    const slug = pathname.substring(8).split('/')[0]; // Remove /events/ and get slug
    ogPath = `/api/v1/og/events/${slug}`;
  }

  // If no OG path matched, serve static
  if (!ogPath) {
    return;
  }

  // Proxy to backend OG endpoint
  try {
    const ogUrl = `${BACKEND_URL}${ogPath}`;
    const response = await fetch(ogUrl, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html',
      },
    });

    // Return the server-rendered HTML
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300', // Cache for 5 min
      },
    });
  } catch (error) {
    // On error, fall back to static file
    console.error('OG proxy error:', error);
    return;
  }
}
