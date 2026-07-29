// Lightning Pass - Shared Navigation Component
// Single source of truth for header/nav across all pages

(function() {
    'use strict';

    // Get user roles from token (graceful degradation for old tokens)
    function getUserRolesFromToken() {
        let userRoles = [];
        try {
            userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
        } catch (e) {
            userRoles = [];
        }
        if (userRoles.length > 0) return userRoles;

        const token = localStorage.getItem('token');
        if (!token) return [];

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.roles && Array.isArray(payload.roles) && payload.roles.length > 0) {
                userRoles = payload.roles;
            } else if (payload.role) {
                userRoles = [payload.role];
            } else {
                userRoles = ['member'];
            }
            localStorage.setItem('userRoles', JSON.stringify(userRoles));
            return userRoles;
        } catch (e) {
            return [];
        }
    }

    // Get dashboard URL based on highest role
    function getDashboardUrl() {
        const roles = getUserRolesFromToken();
        if (roles.includes('admin')) return '/admin';
        if (roles.includes('venue')) return '/venue';
        if (roles.includes('host')) return '/host';
        if (roles.includes('partner')) return '/partner-portal';
        if (roles.includes('dj')) return '/dj';
        return '/members';
    }

    // Logout function
    function logout() {
        // Clear all auth-related localStorage
        const keysToRemove = [
            'token', 'userEmail', 'userRoles', 'userType', 'userId',
            'memberLoggedIn', 'adminToken', 'venueToken', 'partnerToken',
            'djToken', 'hostToken', 'authToken', 'refreshToken', 'sessionId'
        ];
        keysToRemove.forEach(key => localStorage.removeItem(key));
        window.location.href = '/';
    }

    // Make logout available globally
    window.logout = logout;

    // Update navigation based on auth state
    function updateNav() {
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.getElementById('mobileMenu');
        if (!navLinks) return;

        const token = localStorage.getItem('token');
        const isLoggedIn = !!token;
        const currentPath = window.location.pathname;

        // Determine active page
        const isEvents = currentPath === '/' || currentPath.includes('browse');
        const isExperiences = currentPath.includes('experiences');
        const isHost = currentPath === '/host' || currentPath.startsWith('/host/');
        const isCalendar = currentPath.includes('calendar');
        const isAbout = currentPath.includes('about');

        if (isLoggedIn) {
            const dashboardUrl = getDashboardUrl();
            navLinks.innerHTML = `
                <a href="${dashboardUrl}" class="nav-link">Dashboard</a>
                <a href="/?browse=1" class="nav-link${isEvents ? ' active' : ''}">Events</a>
                <a href="/experiences" class="nav-link${isExperiences ? ' active' : ''}">Experiences</a>
                <a href="/host" class="nav-link${isHost ? ' active' : ''}">Host</a>
                <a href="/calendar" class="nav-link${isCalendar ? ' active' : ''}">Calendar</a>
                <a href="/about" class="nav-link${isAbout ? ' active' : ''}">About</a>
                <a href="#" class="btn btn-logout" onclick="logout(); return false;">LOGOUT</a>
            `;
            if (mobileMenu) {
                mobileMenu.innerHTML = `
                    <a href="${dashboardUrl}">Dashboard</a>
                    <a href="/?browse=1"${isEvents ? ' class="active"' : ''}>Events</a>
                    <a href="/experiences"${isExperiences ? ' class="active"' : ''}>Experiences</a>
                    <a href="/host"${isHost ? ' class="active"' : ''}>Host</a>
                    <a href="/calendar"${isCalendar ? ' class="active"' : ''}>Calendar</a>
                    <a href="/about"${isAbout ? ' class="active"' : ''}>About</a>
                    <a href="#" onclick="logout(); return false;" style="color: var(--lightning-yellow);">Logout</a>
                `;
            }
        } else {
            navLinks.innerHTML = `
                <a href="/?browse=1" class="nav-link${isEvents ? ' active' : ''}">Events</a>
                <a href="/experiences" class="nav-link${isExperiences ? ' active' : ''}">Experiences</a>
                <a href="/host" class="nav-link${isHost ? ' active' : ''}">Host</a>
                <a href="/calendar" class="nav-link${isCalendar ? ' active' : ''}">Calendar</a>
                <a href="/about" class="nav-link${isAbout ? ' active' : ''}">About</a>
                <a href="#" class="btn btn-login" onclick="if(typeof LoginCenter!=='undefined'){LoginCenter.open();}else if(typeof showPassModal==='function'){showPassModal();}else{window.location.href='/';} return false;">LOGIN</a>
            `;
            if (mobileMenu) {
                mobileMenu.innerHTML = `
                    <a href="/?browse=1"${isEvents ? ' class="active"' : ''}>Events</a>
                    <a href="/experiences"${isExperiences ? ' class="active"' : ''}>Experiences</a>
                    <a href="/host"${isHost ? ' class="active"' : ''}>Host</a>
                    <a href="/calendar"${isCalendar ? ' class="active"' : ''}>Calendar</a>
                    <a href="/about"${isAbout ? ' class="active"' : ''}>About</a>
                    <a href="#" onclick="if(typeof LoginCenter!=='undefined'){LoginCenter.open();}else if(typeof showPassModal==='function'){showPassModal();}else{window.location.href='/';} return false;">Login</a>
                `;
            }
        }

        // Reveal nav after content is updated (prevents flash of hardcoded HTML)
        navLinks.style.visibility = 'visible';
        if (mobileMenu) {
            mobileMenu.style.visibility = 'visible';
        }
    }

    // CSS for nav - overrides page-level styles with !important
    function injectNavStyles() {
        if (document.getElementById('nav-component-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'nav-component-styles';
        styles.textContent = `
            /* Failsafe: reveal nav after 2s if JS fails */
            @keyframes navFailsafe { to { visibility: visible; } }
            #navLinks, #mobileMenu { animation: navFailsafe 0s 2s forwards; }

            /* Logo anchor - icon only, no text styling bleed-through */
            a.logo {
                color: #ffffff !important;
                text-decoration: none !important;
                font-weight: 700 !important;
            }
            a.logo:hover {
                color: #ffffff !important;
                text-decoration: none !important;
            }
            a.logo:visited {
                color: #ffffff !important;
            }
            .logo-text {
                color: #ffffff !important;
                font-weight: 700 !important;
            }
            /* Nav links - white, no underline, active = yellow */
            .nav-links .nav-link {
                color: #ffffff !important;
                text-decoration: none !important;
                font-weight: 500 !important;
                font-size: 0.95rem !important;
            }
            .nav-links .nav-link:hover {
                color: #ffdd00 !important;
            }
            .nav-links .nav-link:visited {
                color: #ffffff !important;
            }
            .nav-links .nav-link.active {
                color: #ffdd00 !important;
            }
            .nav-links .nav-link.active:visited {
                color: #ffdd00 !important;
            }
            /* Dashboard button - cyan pill */
            .btn-dashboard {
                padding: 0.5rem 1.25rem !important;
                background: #00d4ff !important;
                color: #0d1b2a !important;
                border: none !important;
                border-radius: 2rem !important;
                font-weight: 600 !important;
                font-size: 0.85rem !important;
                text-decoration: none !important;
                transition: all 0.2s ease !important;
                box-shadow: 0 0 15px rgba(0, 212, 255, 0.4) !important;
            }
            .btn-dashboard:hover {
                background: #fff !important;
                color: #0d1b2a !important;
            }
            .btn-dashboard:visited {
                color: #0d1b2a !important;
            }
            /* Login/Logout buttons - yellow pill */
            .btn-logout, .btn-login {
                padding: 0.5rem 1.25rem !important;
                background: #ffdd00 !important;
                color: #0d1b2a !important;
                border: none !important;
                border-radius: 2rem !important;
                font-weight: 600 !important;
                font-size: 0.85rem !important;
                text-decoration: none !important;
                transition: all 0.2s ease !important;
            }
            .btn-logout:hover, .btn-login:hover {
                background: #fff !important;
                color: #0d1b2a !important;
            }
            .btn-logout:visited, .btn-login:visited {
                color: #0d1b2a !important;
            }
        `;
        document.head.appendChild(styles);
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            injectNavStyles();
            updateNav();
        });
    } else {
        injectNavStyles();
        updateNav();
    }

    // Export for manual calls
    window.updateNav = updateNav;
    window.getDashboardUrl = getDashboardUrl;
    window.getUserRolesFromToken = getUserRolesFromToken;
})();
