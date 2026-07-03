/**
 * Lightning Pass First-Party Analytics
 * Fire-and-forget tracking - NEVER blocks or breaks pages
 *
 * Usage:
 *   <script src="/js/lp-tracker.js" defer></script>
 *
 * Manual events:
 *   LPTracker.event('checkout_started', { eventSlug: 'sunset-bash' });
 */
(function() {
  'use strict';

  // API endpoint - uses same env detection as rest of app
  const TRACK_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000/api/v1/track'
    : 'https://lightning-backend-production.up.railway.app/api/v1/track';

  // Session management
  const SESSION_KEY = 'lp_session_id';
  const SESSION_EXPIRY_KEY = 'lp_session_expiry';
  const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes

  let sessionId = null;
  let pageLoadTime = Date.now();

  /**
   * Get or create session ID
   * Sessions expire after 30 minutes of inactivity
   */
  function getSessionId() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      const expiry = localStorage.getItem(SESSION_EXPIRY_KEY);

      // Check if session exists and is still valid
      if (stored && expiry && Date.now() < parseInt(expiry, 10)) {
        // Extend session
        localStorage.setItem(SESSION_EXPIRY_KEY, String(Date.now() + SESSION_DURATION_MS));
        return stored;
      }

      // Create new session
      const newId = 'lp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(SESSION_KEY, newId);
      localStorage.setItem(SESSION_EXPIRY_KEY, String(Date.now() + SESSION_DURATION_MS));
      return newId;
    } catch (e) {
      // localStorage blocked - generate temporary session ID
      return 'tmp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
  }

  /**
   * Get UTM parameters from URL
   */
  function getUTMParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      return {
        utmSource: params.get('utm_source') || '',
        utmMedium: params.get('utm_medium') || '',
        utmCampaign: params.get('utm_campaign') || '',
        utmContent: params.get('utm_content') || '',
        utmTerm: params.get('utm_term') || ''
      };
    } catch (e) {
      return {};
    }
  }

  /**
   * Get current page path (without query params)
   */
  function getPath() {
    return window.location.pathname || '/';
  }

  /**
   * Send tracking data - ALWAYS non-blocking
   * Priority: sendBeacon > fetch+keepalive > silent fail
   */
  function send(endpoint, data) {
    try {
      const url = TRACK_URL + '/' + endpoint;
      const payload = JSON.stringify(data);

      // 1. Try sendBeacon first (works even on page unload)
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        const sent = navigator.sendBeacon(url, blob);
        if (sent) return; // Success - done
      }

      // 2. Fallback to fetch with keepalive (non-blocking)
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true // Request survives page close
      }).catch(function() {}); // Silent fail - CRITICAL

    } catch (e) {
      // Silent fail - tracking NEVER throws
    }
  }

  /**
   * Track page view
   * Called automatically on page load
   */
  function trackPageview() {
    const utm = getUTMParams();

    send('pageview', {
      sessionId: sessionId,
      path: getPath(),
      referrer: document.referrer || '',
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      utmContent: utm.utmContent,
      utmTerm: utm.utmTerm,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height
    });
  }

  /**
   * Track time on page when user leaves
   */
  function trackLeave() {
    const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);

    send('leave', {
      sessionId: sessionId,
      path: getPath(),
      timeOnPage: timeOnPage
    });
  }

  /**
   * Track custom event
   * @param {string} eventType - Event type (see AnalyticsEvent model enum)
   * @param {object} metadata - Optional event metadata
   */
  function trackEvent(eventType, metadata) {
    try {
      send('event', {
        sessionId: sessionId,
        eventType: eventType,
        path: getPath(),
        metadata: metadata || {}
      });
    } catch (e) {
      // Silent fail
    }
  }

  // Initialize
  sessionId = getSessionId();

  // Track page view when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageview);
  } else {
    trackPageview();
  }

  // Track time on page when leaving
  // Use multiple events for cross-browser compatibility
  window.addEventListener('pagehide', trackLeave);
  window.addEventListener('beforeunload', trackLeave);
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
      trackLeave();
    }
  });

  // Expose public API
  window.LPTracker = {
    event: trackEvent,
    getSessionId: function() { return sessionId; }
  };

})();
