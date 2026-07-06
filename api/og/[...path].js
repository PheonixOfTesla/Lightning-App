/**
 * Vercel Edge Function for OG meta tags
 *
 * This proxies to the backend OG endpoint which returns
 * server-rendered HTML with proper OG/Twitter meta tags.
 */

export const config = {
  runtime: 'edge',
};

const BACKEND_URL = 'https://lightning-backend-production.up.railway.app';

export default async function handler(request) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.replace('/api/og/', '').split('/');

  // Build the backend OG path
  let ogPath;

  // Handle @handle format
  if (pathSegments[0].startsWith('@')) {
    ogPath = `/api/v1/og/${pathSegments[0]}`;
  }
  // Handle events/:slug format
  else if (pathSegments[0] === 'events' && pathSegments[1]) {
    ogPath = `/api/v1/og/events/${pathSegments[1]}`;
  }
  // Handle plain handle format (no @)
  else if (pathSegments[0]) {
    ogPath = `/api/v1/og/@${pathSegments[0]}`;
  }
  else {
    return new Response('Not found', { status: 404 });
  }

  try {
    const response = await fetch(`${BACKEND_URL}${ogPath}`, {
      headers: {
        'Accept': 'text/html',
      },
    });

    const html = await response.text();

    return new Response(html, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return new Response('Server error', { status: 500 });
  }
}
