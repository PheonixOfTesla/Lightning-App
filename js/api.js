/**
 * Lightning Pass - Shared API Configuration
 * Centralizes API_BASE environment detection
 */

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://lightning-backend-production.up.railway.app';

// Export for ES modules (future use)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_BASE };
}
