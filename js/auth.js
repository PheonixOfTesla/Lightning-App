/**
 * Lightning Pass - Shared Auth Module
 * Single source of truth for authentication state across all portals.
 *
 * CANONICAL KEY: 'token' in localStorage
 *
 * Usage:
 *   import { getToken, setToken, clearAuth, authFetch, isAuthenticated, validateToken } from './auth.js';
 *
 *   // Check auth
 *   if (isAuthenticated()) { ... }
 *
 *   // Make authenticated request
 *   const res = await authFetch('/api/v1/admin/users/list');
 *
 *   // Logout
 *   clearAuth();
 */

// API base URL (matches js/api.js)
const AUTH_API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://lightning-backend-production.up.railway.app';

// Canonical storage key
const TOKEN_KEY = 'token';

// Legacy keys to migrate/clear (from the June 28 sprawl fix)
const LEGACY_KEYS = [
    'authToken',
    'adminToken',
    'venueToken',
    'hostToken',
    'partnerToken',
    'djToken',
    'memberToken',
    'staffToken',
    'dealToken',
    'user',
    'userType',
    'userId'
];

// Keys to clear on logout (canonical + legacy + cached user data)
const ALL_AUTH_KEYS = [
    TOKEN_KEY,
    ...LEGACY_KEYS,
    'userEmail',
    'userRole',
    'userRoles'
];

/**
 * Migrate legacy token keys to canonical key on first load.
 * Only runs once per page load.
 */
let migrationRun = false;
function migrateLegacyKeys() {
    if (migrationRun) return;
    migrationRun = true;

    // If canonical token exists, just clear legacy keys
    if (localStorage.getItem(TOKEN_KEY)) {
        LEGACY_KEYS.forEach(key => localStorage.removeItem(key));
        return;
    }

    // Try to find a token in legacy keys
    for (const key of LEGACY_KEYS) {
        const legacyToken = localStorage.getItem(key);
        if (legacyToken && legacyToken.startsWith('eyJ')) {
            // Found a JWT in a legacy key - migrate it
            localStorage.setItem(TOKEN_KEY, legacyToken);
            console.log(`[Auth] Migrated token from '${key}' to '${TOKEN_KEY}'`);
            break;
        }
    }

    // Clear all legacy keys
    LEGACY_KEYS.forEach(key => localStorage.removeItem(key));
}

/**
 * Get the current auth token.
 * @returns {string|null} The JWT token or null if not authenticated
 */
function getToken() {
    migrateLegacyKeys();
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Set the auth token (after successful login).
 * @param {string} token - The JWT token
 */
function setToken(token) {
    if (!token) {
        console.warn('[Auth] setToken called with empty token');
        return;
    }
    localStorage.setItem(TOKEN_KEY, token);
    // Clear any legacy keys that might exist
    LEGACY_KEYS.forEach(key => localStorage.removeItem(key));
}

/**
 * Clear all auth state (logout).
 */
function clearAuth() {
    ALL_AUTH_KEYS.forEach(key => localStorage.removeItem(key));
}

/**
 * Check if user is authenticated (has a token).
 * Note: This checks token EXISTS, not that it's valid.
 * Use validateToken() to check validity.
 * @returns {boolean}
 */
function isAuthenticated() {
    return !!getToken();
}

/**
 * Decode JWT payload without verification.
 * @param {string} token - The JWT token
 * @returns {object|null} Decoded payload or null if invalid
 */
function decodeToken(token) {
    if (!token) return null;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(payload);
    } catch (e) {
        console.error('[Auth] Failed to decode token:', e);
        return null;
    }
}

/**
 * Validate token structure and expiration (client-side only).
 * @returns {object} { valid: boolean, expired: boolean, payload: object|null, error: string|null }
 */
function validateToken() {
    const token = getToken();
    if (!token) {
        return { valid: false, expired: false, payload: null, error: 'No token' };
    }

    const payload = decodeToken(token);
    if (!payload) {
        return { valid: false, expired: false, payload: null, error: 'Invalid token format' };
    }

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
        return { valid: false, expired: true, payload, error: 'Token expired' };
    }

    return { valid: true, expired: false, payload, error: null };
}

/**
 * Get user roles from token.
 * @returns {string[]} Array of roles, defaults to ['member'] if none found
 */
function getUserRoles() {
    const { valid, payload } = validateToken();
    if (!valid || !payload) return ['member'];

    if (payload.roles && Array.isArray(payload.roles) && payload.roles.length > 0) {
        return payload.roles;
    }
    if (payload.role) {
        return [payload.role];
    }
    return ['member'];
}

/**
 * Check if user has a specific role.
 * @param {string} role - Role to check
 * @returns {boolean}
 */
function hasRole(role) {
    return getUserRoles().includes(role);
}

/**
 * Get user email from token or localStorage.
 * @returns {string|null}
 */
function getUserEmail() {
    // First try localStorage (set during login)
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) return storedEmail;

    // Fall back to token
    const { valid, payload } = validateToken();
    if (valid && payload && payload.email) {
        return payload.email;
    }
    return null;
}

/**
 * Authenticated fetch wrapper.
 * Automatically adds Authorization header if token exists.
 *
 * @param {string} endpoint - API endpoint (with or without base URL)
 * @param {object} options - Fetch options
 * @returns {Promise<Response>}
 */
async function authFetch(endpoint, options = {}) {
    const token = getToken();

    // Build full URL if endpoint doesn't start with http
    const url = endpoint.startsWith('http') ? endpoint : `${AUTH_API_BASE}${endpoint}`;

    // Merge headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Add auth header if we have a token
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    // Handle 401 - session expired or invalid token
    if (response.status === 401) {
        clearAuth();
        window.location.href = '/?login=true&expired=true';
        return response; // Return for any code that catches before redirect
    }

    return response;
}

/**
 * Authenticated fetch that also parses JSON response.
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<{response: Response, data: any}>}
 */
async function authFetchJSON(endpoint, options = {}) {
    const response = await authFetch(endpoint, options);
    const data = await response.json();
    return { response, data };
}

// Run migration on load
migrateLegacyKeys();

// Export for ES modules
if (typeof window !== 'undefined') {
    window.LPAuth = {
        getToken,
        setToken,
        clearAuth,
        isAuthenticated,
        validateToken,
        decodeToken,
        getUserRoles,
        hasRole,
        getUserEmail,
        authFetch,
        authFetchJSON,
        TOKEN_KEY,
        API_BASE: AUTH_API_BASE
    };
}

// CommonJS export (for testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getToken,
        setToken,
        clearAuth,
        isAuthenticated,
        validateToken,
        decodeToken,
        getUserRoles,
        hasRole,
        getUserEmail,
        authFetch,
        authFetchJSON,
        TOKEN_KEY,
        API_BASE: AUTH_API_BASE
    };
}
