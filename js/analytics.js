/**
 * Lightning Pass Analytics Module
 *
 * Hybrid analytics: PostHog for heavy lifting + native layer for revenue attribution.
 * PostHog handles funnels/paths/sessions; native layer ties traffic to User/Pass/Event records.
 *
 * IMPORTANT: PostHog key is fetched from backend config endpoint - NEVER hardcoded.
 */

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'
        : 'https://lightning-backend-production.up.railway.app';

    // Session ID for anonymous tracking (persists across page loads)
    const SESSION_KEY = 'lp_session_id';
    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = 'ses_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem(SESSION_KEY, sessionId);
    }

    // PostHog instance (initialized after config fetch)
    let posthogReady = false;
    let eventQueue = []; // Queue events until PostHog loads

    // ===== UTM & REFERRER PARSING =====
    function getUTMParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get('utm_source') || null,
            utm_medium: params.get('utm_medium') || null,
            utm_campaign: params.get('utm_campaign') || null,
            utm_term: params.get('utm_term') || null,
            utm_content: params.get('utm_content') || null
        };
    }

    function getReferrer() {
        const ref = document.referrer;
        if (!ref) return { referrer: 'direct', referrer_domain: null };

        try {
            const url = new URL(ref);
            // Don't count internal referrers
            if (url.hostname === window.location.hostname) {
                return { referrer: 'internal', referrer_domain: null };
            }
            return {
                referrer: ref,
                referrer_domain: url.hostname
            };
        } catch {
            return { referrer: ref, referrer_domain: null };
        }
    }

    function getCommonProperties() {
        const utm = getUTMParams();
        const ref = getReferrer();
        return {
            session_id: sessionId,
            page_url: window.location.href,
            page_path: window.location.pathname,
            ...utm,
            ...ref,
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight,
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };
    }

    // ===== POSTHOG INITIALIZATION =====
    async function initPostHog() {
        try {
            // Fetch PostHog config from backend (key never hardcoded)
            const res = await fetch(`${API_BASE}/api/v1/config/analytics`);
            if (!res.ok) {
                console.warn('[Analytics] Config endpoint not available, PostHog disabled');
                return;
            }

            const config = await res.json();
            if (!config.posthogKey || !config.posthogHost) {
                console.warn('[Analytics] PostHog not configured');
                return;
            }

            // Load PostHog script dynamically
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

            // Initialize with config from backend
            posthog.init(config.posthogKey, {
                api_host: config.posthogHost,
                capture_pageview: false, // We'll capture manually with extra props
                capture_pageleave: true,
                autocapture: true,
                persistence: 'localStorage+cookie',
                cross_subdomain_cookie: true,
                secure_cookie: window.location.protocol === 'https:',
                property_blacklist: ['$ip'] // Don't send raw IP
            });

            posthogReady = true;
            console.log('[Analytics] PostHog initialized');

            // Flush queued events
            eventQueue.forEach(({ name, props }) => {
                posthog.capture(name, props);
            });
            eventQueue = [];

            // Capture initial pageview
            capturePageview();

        } catch (err) {
            console.warn('[Analytics] Failed to initialize PostHog:', err.message);
        }
    }

    // ===== EVENT CAPTURE =====
    function capture(eventName, properties = {}) {
        const props = { ...getCommonProperties(), ...properties };

        // PostHog capture
        if (posthogReady && window.posthog) {
            posthog.capture(eventName, props);
        } else {
            eventQueue.push({ name: eventName, props });
        }

        // Native tracking for high-value events (async, fire-and-forget)
        const highValueEvents = [
            'signup_started', 'signup_completed',
            'booking_started', 'purchase_completed',
            'perk_redeemed', 'viewed_event'
        ];

        if (highValueEvents.includes(eventName)) {
            trackNative(eventName, props).catch(() => {});
        }
    }

    function capturePageview() {
        capture('$pageview', {
            title: document.title,
            ...getCommonProperties()
        });
    }

    // ===== NATIVE TRACKING (for revenue attribution) =====
    async function trackNative(eventType, properties) {
        try {
            const payload = {
                sessionId,
                eventType,
                eventId: properties.event_id || null,
                passId: properties.pass_id || null,
                referrer: properties.referrer || null,
                utm: {
                    source: properties.utm_source,
                    medium: properties.utm_medium,
                    campaign: properties.utm_campaign
                },
                properties: {
                    page_path: properties.page_path,
                    page_url: properties.page_url
                }
            };

            // Include userId if available
            const userId = localStorage.getItem('userId');
            if (userId) {
                payload.userId = userId;
            }

            await fetch(`${API_BASE}/api/v1/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            // Silent fail - analytics shouldn't break the app
            console.debug('[Analytics] Native track failed:', err.message);
        }
    }

    // ===== USER IDENTIFICATION =====
    function identify(userId, traits = {}) {
        // Store userId for native tracking
        localStorage.setItem('userId', userId);

        // PostHog identify - links anonymous activity to real user
        if (posthogReady && window.posthog) {
            posthog.identify(userId, {
                ...traits,
                session_id: sessionId
            });
            console.log('[Analytics] User identified:', userId);
        }

        // Bridge session to user in native layer
        bridgeSessionToUser(userId).catch(() => {});
    }

    async function bridgeSessionToUser(userId) {
        try {
            await fetch(`${API_BASE}/api/v1/track/bridge`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, userId })
            });
        } catch (err) {
            console.debug('[Analytics] Session bridge failed:', err.message);
        }
    }

    function reset() {
        // Clear user identification (on logout)
        localStorage.removeItem('userId');
        if (posthogReady && window.posthog) {
            posthog.reset();
        }
    }

    // ===== FUNNEL EVENT HELPERS =====
    const LPAnalytics = {
        // Initialize (call on page load)
        init: initPostHog,

        // Core methods
        capture,
        identify,
        reset,
        pageview: capturePageview,

        // Get session ID (for backend correlation)
        getSessionId: () => sessionId,

        // ===== FUNNEL EVENTS =====

        // Event discovery
        viewedEvent: (eventId, eventName, eventSlug) => {
            capture('viewed_event', {
                event_id: eventId,
                event_name: eventName,
                event_slug: eventSlug
            });
        },

        // Signup funnel
        clickedSignup: (source = 'unknown') => {
            capture('clicked_signup', { source });
        },

        signupStarted: (method = 'email') => {
            capture('signup_started', { method });
        },

        signupCompleted: (userId, userEmail, method = 'email', partnerCode = null) => {
            capture('signup_completed', {
                user_id: userId,
                user_email: userEmail,
                method,
                partner_code: partnerCode
            });
            // Also identify the user
            identify(userId, { email: userEmail });
        },

        // Purchase funnel
        viewedExperience: (experienceId, experienceName) => {
            capture('viewed_experience', {
                experience_id: experienceId,
                experience_name: experienceName
            });
        },

        bookingStarted: (eventId, ticketType, quantity, amount) => {
            capture('booking_started', {
                event_id: eventId,
                ticket_type: ticketType,
                quantity,
                amount
            });
        },

        purchaseCompleted: (passId, eventId, eventName, amount, quantity, ticketType) => {
            capture('purchase_completed', {
                pass_id: passId,
                event_id: eventId,
                event_name: eventName,
                amount,
                quantity,
                ticket_type: ticketType,
                currency: 'USD'
            });
        },

        // Member perks
        perkRedeemed: (perkType, venueId, venueName) => {
            capture('perk_redeemed', {
                perk_type: perkType,
                venue_id: venueId,
                venue_name: venueName
            });
        },

        // Login
        loginCompleted: (userId, userEmail) => {
            capture('login_completed', {
                user_id: userId,
                user_email: userEmail
            });
            identify(userId, { email: userEmail });
        }
    };

    // Expose globally
    window.LPAnalytics = LPAnalytics;

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPostHog);
    } else {
        initPostHog();
    }

})();
