/**
 * Login Center Modal - Shared Component
 *
 * Usage:
 *   1. Include this script in your HTML
 *   2. Call LoginCenter.init({ apiBase: 'http://...', onSuccess: callback })
 *   3. Call LoginCenter.open() to show the modal
 *
 * The onSuccess callback receives { token, email, roles } and should handle
 * what happens after login (e.g., apply member discount, redirect, etc.)
 */

const LoginCenter = (function() {
    let config = {
        apiBase: '',
        onSuccess: null,  // Called after successful login/signup
        onClose: null     // Called when modal is closed
    };

    let selectedRoles = ['member'];
    let loginUserEmail = '';
    let loginUserRoles = [];

    // Modal HTML template
    const modalHTML = `
    <div class="pass-modal-overlay" id="loginCenterModal">
        <div class="pass-modal-wrapper" onclick="if(event.target === this) LoginCenter.close()">
        <div class="pass-modal">
            <span class="pass-modal-close" onclick="LoginCenter.close()">&times;</span>
            <div class="pass-modal-form-container">
                <div class="pass-modal-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--lightning-yellow)"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <h2 style="margin-bottom: 0.5rem;">Login Center</h2>
                <p id="lcSubtitle" style="color: var(--gray); margin-bottom: 1.5rem;">Select your account type</p>

                <!-- User Type Selection -->
                <div id="lcUserTypeSelect" style="margin-bottom: 1.5rem;">
                    <p style="color: var(--gray); font-size: 0.85rem; margin-bottom: 1rem; text-align: center;">Select your role(s)</p>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label class="user-type-btn" data-type="member" style="padding: 0.75rem 1rem; background: rgba(255,221,0,0.1); border: 2px solid var(--lightning-yellow); border-radius: 8px; color: white; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.75rem;">
                            <input type="checkbox" name="lcUserTypes" value="member" checked disabled style="display: none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <div style="flex: 1;"><span style="font-weight: 600;">Member</span> <span style="font-size: 0.75rem; color: var(--neon-green);">Always included</span></div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--lightning-yellow)" stroke="none"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        </label>
                        <label class="user-type-btn" data-type="dj" onclick="LoginCenter.toggleRole(this)" style="padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-dark); border-radius: 8px; color: white; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.75rem;">
                            <input type="checkbox" name="lcUserTypes" value="dj" style="display: none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                            <div style="flex: 1;"><span style="font-weight: 600;">DJ</span> <span style="font-size: 0.75rem; color: var(--gray);">Song request system access</span></div>
                        </label>
                        <label class="user-type-btn" data-type="partner" onclick="LoginCenter.toggleRole(this)" style="padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-dark); border-radius: 8px; color: white; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.75rem;">
                            <input type="checkbox" name="lcUserTypes" value="partner" style="display: none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            <div style="flex: 1;"><span style="font-weight: 600;">Partner</span> <span style="font-size: 0.75rem; color: var(--gray);">Referral program</span></div>
                        </label>
                        <label class="user-type-btn" data-type="host" onclick="LoginCenter.toggleRole(this)" style="padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-dark); border-radius: 8px; color: white; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.75rem;">
                            <input type="checkbox" name="lcUserTypes" value="host" style="display: none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                            <div style="flex: 1;"><span style="font-weight: 600;">Host</span> <span style="font-size: 0.75rem; color: var(--lightning-yellow);">Requires approval</span></div>
                        </label>
                        <label class="user-type-btn" data-type="venue" onclick="LoginCenter.toggleRole(this)" style="padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-dark); border-radius: 8px; color: white; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.75rem;">
                            <input type="checkbox" name="lcUserTypes" value="venue" style="display: none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>
                            <div style="flex: 1;"><span style="font-weight: 600;">Venue</span> <span style="font-size: 0.75rem; color: var(--lightning-yellow);">Requires approval</span></div>
                        </label>
                        <label class="user-type-btn" data-type="admin" onclick="LoginCenter.toggleRole(this)" style="padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-dark); border-radius: 8px; color: white; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.75rem;">
                            <input type="checkbox" name="lcUserTypes" value="admin" style="display: none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            <div style="flex: 1;"><span style="font-weight: 600;">Admin</span> <span style="font-size: 0.75rem; color: var(--lightning-yellow);">Requires approval</span></div>
                        </label>
                    </div>
                    <div style="text-align: center; margin-top: 1.5rem;">
                        <button onclick="LoginCenter.proceedToSignup()" class="btn btn-primary" style="width: 100%; padding: 1rem; background: var(--lightning-yellow); color: #000; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 700; cursor: pointer;">CONTINUE</button>
                    </div>
                    <p style="text-align: center; margin-top: 1rem; color: var(--gray); font-size: 0.85rem;">
                        Already have an account? <a href="#" onclick="LoginCenter.showQuickLogin(); return false;" style="color: var(--lightning-yellow);">Login</a>
                    </p>
                </div>

                <!-- Quick Login - Step 1: Email -->
                <div id="lcQuickLoginSection" style="display: none;">
                    <p style="color: var(--gray); font-size: 0.9rem; margin-bottom: 1rem; text-align: center;">Enter your email</p>
                    <form class="pass-modal-form" onsubmit="LoginCenter.lookupUserRoles(event); return false;">
                        <input type="email" id="lcLoginEmailInput" placeholder="Email" required>
                        <button type="submit" id="lcLookupBtn">CONTINUE</button>
                    </form>
                    <div id="lcLoginLookupError" style="display: none; color: #ff4444; text-align: center; margin-top: 0.5rem; font-size: 0.85rem;"></div>
                    <p style="text-align: center; color: var(--gray); font-size: 0.85rem; margin-top: 1rem;">
                        <a href="#" onclick="LoginCenter.showUserTypes(); return false;" style="color: var(--lightning-yellow);">Back to signup</a>
                    </p>
                </div>

                <!-- Quick Login - Step 2: Password -->
                <div id="lcLoginPasswordSection" style="display: none;">
                    <p id="lcLoginEmailDisplay" style="color: var(--lightning-yellow); font-size: 1rem; margin-bottom: 1rem; text-align: center; font-weight: 500;"></p>
                    <div id="lcUserRolesDisplay" style="margin-bottom: 1rem;"></div>
                    <div id="lcPendingRolesNotice" style="display: none; background: rgba(255,221,0,0.1); border: 1px solid var(--lightning-yellow); border-radius: 8px; padding: 0.75rem; margin-bottom: 1rem; font-size: 0.8rem; color: var(--lightning-yellow);"></div>
                    <form class="pass-modal-form" onsubmit="LoginCenter.submitLogin(event); return false;">
                        <input type="password" id="lcLoginPassword" placeholder="Enter Password" required style="text-align: center;">
                        <button type="submit" id="lcLoginBtn">LOGIN</button>
                    </form>
                    <div id="lcLoginError" style="display: none; color: #ff4444; text-align: center; margin-top: 0.5rem; font-size: 0.85rem;"></div>
                    <p style="text-align: center; color: var(--gray); font-size: 0.85rem; margin-top: 1rem;">
                        <a href="#" onclick="LoginCenter.showForgotPassword(); return false;" style="color: var(--lightning-yellow);">Forgot password?</a>
                    </p>
                    <p style="text-align: center; color: var(--gray); font-size: 0.85rem; margin-top: 0.5rem;">
                        <a href="#" onclick="LoginCenter.showQuickLogin(); return false;" style="color: var(--gray);">Use different email</a>
                    </p>
                </div>

                <!-- Forgot Password Section -->
                <div id="lcForgotPasswordSection" style="display: none;">
                    <p style="color: var(--gray); font-size: 0.9rem; margin-bottom: 1rem; text-align: center;">Enter your phone number to reset your password</p>
                    <form class="pass-modal-form" onsubmit="LoginCenter.submitForgotPassword(event); return false;">
                        <input type="tel" id="lcForgotPhone" placeholder="Phone number" required>
                        <button type="submit" id="lcForgotBtn">SEND CODE</button>
                    </form>
                    <div id="lcForgotError" style="display: none; color: #ff4444; text-align: center; margin-top: 0.5rem; font-size: 0.85rem;"></div>
                    <div id="lcForgotSuccess" style="display: none; color: var(--neon-green); text-align: center; margin-top: 0.5rem; font-size: 0.85rem;"></div>
                    <p style="text-align: center; color: var(--gray); font-size: 0.85rem; margin-top: 1rem;">
                        <a href="#" onclick="LoginCenter.showQuickLogin(); return false;" style="color: var(--lightning-yellow);">Back to login</a>
                    </p>
                </div>

                <!-- Create Account Form -->
                <div id="lcCreateAccountForm" style="display: none;">
                    <div style="text-align: center; margin-bottom: 1rem;">
                        <span id="lcCreateTypeLabel" style="background: var(--lightning-yellow); color: #000; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;"></span>
                    </div>
                    <div id="lcVenueNotice" style="display: none; background: rgba(255,221,0,0.1); border: 1px solid var(--lightning-yellow); border-radius: 8px; padding: 0.75rem; margin-bottom: 1rem; font-size: 0.85rem; color: var(--lightning-yellow);">Venue/Host/Admin access requires approval. You'll be notified once approved.</div>
                    <form class="pass-modal-form" onsubmit="LoginCenter.submitCreateAccount(event); return false;">
                        <input type="text" id="lcCreateFirstName" placeholder="First name" required>
                        <input type="text" id="lcCreateLastName" placeholder="Last name" required>
                        <input type="email" id="lcCreateEmail" placeholder="Email" required>
                        <input type="tel" id="lcCreatePhone" placeholder="Phone">
                        <input type="password" id="lcCreatePassword" placeholder="Password" required>
                        <input type="password" id="lcCreatePasswordConfirm" placeholder="Confirm password" required>
                        <input type="text" id="lcCreatePartnerCode" placeholder="Partner code (optional)" style="text-transform: uppercase;">
                        <button type="submit" id="lcCreateBtn">CREATE ACCOUNT</button>
                    </form>
                    <div id="lcCreateError" style="display: none; color: #ff4444; text-align: center; margin-top: 0.5rem; font-size: 0.85rem;"></div>
                    <div style="text-align: center; margin-top: 1rem;">
                        <a href="#" onclick="LoginCenter.showQuickLogin(); return false;" style="color: var(--gray); font-size: 0.85rem;">Already have an account? Login</a>
                    </div>
                    <div style="text-align: center; margin-top: 0.5rem;">
                        <a href="#" onclick="LoginCenter.showUserTypes(); return false;" style="color: var(--gray); font-size: 0.85rem;">Back to account types</a>
                    </div>
                </div>
            </div>
            <div class="pass-modal-success" id="lcSuccess">
                <div class="pass-modal-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--neon-green)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
                <h2>You're In!</h2>
                <p>Your Lightning Pass is active.</p>
                <button onclick="LoginCenter.onSuccessClick()" style="margin-top: 1rem; padding: 1rem 2rem; background: var(--lightning-yellow); color: #000; border: none; border-radius: 10px; font-weight: 700; cursor: pointer;">CONTINUE</button>
            </div>
        </div>
        </div>
    </div>
    `;

    // CSS styles for the modal
    const modalCSS = `
    <style id="login-center-styles">
        .pass-modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            z-index: 10000;
            overflow-y: auto;
            overscroll-behavior: contain;
            backdrop-filter: blur(5px);
        }
        .pass-modal-overlay.active {
            display: block;
        }
        .pass-modal-wrapper {
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        .pass-modal {
            background: linear-gradient(135deg, #1a1a2e 0%, #0a0a0f 100%);
            border: 2px solid var(--lightning-yellow);
            border-radius: 20px;
            padding: 2rem;
            max-width: 450px;
            width: 100%;
            text-align: center;
            position: relative;
            box-shadow: 0 0 50px rgba(255, 221, 0, 0.3);
        }
        .pass-modal-close {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            font-size: 2rem;
            color: #666;
            cursor: pointer;
            transition: color 0.2s;
        }
        .pass-modal-close:hover {
            color: #fff;
        }
        .pass-modal-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        .pass-modal h2 {
            color: var(--lightning-yellow);
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
        }
        .pass-modal p {
            color: #aaa;
            margin-bottom: 1.5rem;
        }
        .pass-modal-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .pass-modal-form input {
            padding: 1rem;
            border: 1px solid #333;
            border-radius: 10px;
            background: #0a0a0f;
            color: #fff;
            font-size: 1rem;
        }
        .pass-modal-form input:focus {
            outline: none;
            border-color: var(--lightning-yellow);
        }
        .pass-modal-form button {
            padding: 1rem;
            background: var(--lightning-yellow);
            color: #000;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
        }
        .pass-modal-form button:hover {
            background: #fff;
            transform: scale(1.02);
        }
        .pass-modal-success {
            display: none;
        }
        .pass-modal-success.active {
            display: block;
        }
        .pass-modal-success h2 {
            color: var(--neon-green);
        }
        @media (max-width: 480px) {
            .pass-modal {
                padding: 1.5rem;
            }
            .pass-modal h2 {
                font-size: 1.4rem;
            }
            .pass-modal-icon svg {
                width: 36px;
                height: 36px;
            }
            .user-type-btn {
                padding: 0.75rem !important;
            }
        }
    </style>
    `;

    function init(options) {
        config = { ...config, ...options };

        // Only inject if not already present
        if (!document.getElementById('loginCenterModal')) {
            // Inject CSS if not already present
            if (!document.getElementById('login-center-styles')) {
                document.head.insertAdjacentHTML('beforeend', modalCSS);
            }
            // Inject modal HTML
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        // Escape key closes modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });
    }

    function open() {
        const modal = document.getElementById('loginCenterModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            showUserTypes(); // Reset to initial state
        }
    }

    function close() {
        const modal = document.getElementById('loginCenterModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (config.onClose) config.onClose();
    }

    function toggleRole(label) {
        const checkbox = label.querySelector('input[type="checkbox"]');
        const type = label.dataset.type;

        if (type === 'member') return;

        checkbox.checked = !checkbox.checked;

        if (checkbox.checked) {
            label.style.border = '2px solid var(--lightning-yellow)';
            label.style.background = 'rgba(255,221,0,0.1)';
            if (!selectedRoles.includes(type)) selectedRoles.push(type);
        } else {
            label.style.border = '1px solid var(--border-dark)';
            label.style.background = 'rgba(255,255,255,0.05)';
            selectedRoles = selectedRoles.filter(r => r !== type);
        }
    }

    function showUserTypes() {
        document.getElementById('lcSubtitle').style.display = 'block';
        document.getElementById('lcUserTypeSelect').style.display = 'block';
        document.getElementById('lcQuickLoginSection').style.display = 'none';
        document.getElementById('lcLoginPasswordSection').style.display = 'none';
        document.getElementById('lcForgotPasswordSection').style.display = 'none';
        document.getElementById('lcCreateAccountForm').style.display = 'none';
        document.querySelector('#loginCenterModal .pass-modal-form-container').style.display = 'block';
        document.querySelector('#loginCenterModal .pass-modal-success').classList.remove('active');
        selectedRoles = ['member'];
        loginUserEmail = '';
        loginUserRoles = [];

        // Reset role checkboxes
        document.querySelectorAll('#lcUserTypeSelect .user-type-btn').forEach(btn => {
            const type = btn.dataset.type;
            if (type !== 'member') {
                btn.style.border = '1px solid var(--border-dark)';
                btn.style.background = 'rgba(255,255,255,0.05)';
                const checkbox = btn.querySelector('input[type="checkbox"]');
                if (checkbox) checkbox.checked = false;
            }
        });
    }

    function proceedToSignup() {
        document.getElementById('lcUserTypeSelect').style.display = 'none';
        document.getElementById('lcCreateAccountForm').style.display = 'block';

        const rolesText = selectedRoles.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(' + ');
        document.getElementById('lcCreateTypeLabel').textContent = rolesText;

        // Show venue notice if needed
        const venueNotice = document.getElementById('lcVenueNotice');
        if (selectedRoles.includes('venue') || selectedRoles.includes('admin') || selectedRoles.includes('host')) {
            venueNotice.style.display = 'block';
        } else {
            venueNotice.style.display = 'none';
        }
    }

    function showQuickLogin() {
        document.getElementById('lcSubtitle').style.display = 'block';
        document.getElementById('lcUserTypeSelect').style.display = 'none';
        document.getElementById('lcQuickLoginSection').style.display = 'block';
        document.getElementById('lcLoginPasswordSection').style.display = 'none';
        document.getElementById('lcForgotPasswordSection').style.display = 'none';
        document.getElementById('lcCreateAccountForm').style.display = 'none';
        document.getElementById('lcLoginEmailInput').value = '';
        document.getElementById('lcLoginLookupError').style.display = 'none';
    }

    async function lookupUserRoles(event) {
        event.preventDefault();
        const email = document.getElementById('lcLoginEmailInput').value.trim().toLowerCase();
        const btn = document.getElementById('lcLookupBtn');
        const errorDiv = document.getElementById('lcLoginLookupError');

        btn.textContent = 'LOADING...';
        btn.disabled = true;
        errorDiv.style.display = 'none';

        try {
            const response = await fetch(`${config.apiBase}/api/v1/auth/user-roles?email=${encodeURIComponent(email)}`);
            const data = await response.json();

            if (!response.ok) {
                errorDiv.textContent = data.error || 'User not found';
                errorDiv.style.display = 'block';
                btn.textContent = 'CONTINUE';
                btn.disabled = false;
                return;
            }

            loginUserEmail = email;
            loginUserRoles = data.availableRoles || ['member'];

            document.getElementById('lcLoginEmailDisplay').textContent = email;

            // Display roles as badges
            const roleConfig = {
                member: { label: 'Member', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
                dj: { label: 'DJ', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>' },
                partner: { label: 'Partner', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
                host: { label: 'Host', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>' },
                venue: { label: 'Venue', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>' },
                admin: { label: 'Admin', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightning-yellow)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' }
            };
            const roleBadges = loginUserRoles.map(r => {
                const cfg = roleConfig[r] || { label: r, icon: '' };
                return `<div style="padding: 0.75rem 1rem; background: rgba(255,221,0,0.1); border: 1px solid var(--lightning-yellow); border-radius: 8px; color: white; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">${cfg.icon}<span style="font-weight: 600;">${cfg.label}</span></div>`;
            }).join('');
            document.getElementById('lcUserRolesDisplay').innerHTML = `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1.5rem;">${roleBadges}</div>`;

            // Show pending roles notice
            const pendingNotice = document.getElementById('lcPendingRolesNotice');
            const pendingRoles = [];
            if (data.pendingRoles?.venue) pendingRoles.push('Venue');
            if (data.pendingRoles?.admin) pendingRoles.push('Admin');
            if (data.pendingRoles?.host) pendingRoles.push('Host');

            if (pendingRoles.length > 0) {
                pendingNotice.textContent = `Pending approval: ${pendingRoles.join(', ')}`;
                pendingNotice.style.display = 'block';
            } else {
                pendingNotice.style.display = 'none';
            }

            // Show password section
            document.getElementById('lcSubtitle').style.display = 'none';
            document.getElementById('lcQuickLoginSection').style.display = 'none';
            document.getElementById('lcLoginPasswordSection').style.display = 'block';
            document.getElementById('lcLoginPassword').value = '';
            document.getElementById('lcLoginPassword').focus();
            document.getElementById('lcLoginError').style.display = 'none';

        } catch (error) {
            console.error('Lookup error:', error);
            errorDiv.textContent = 'Connection error. Please try again.';
            errorDiv.style.display = 'block';
        }

        btn.textContent = 'CONTINUE';
        btn.disabled = false;
    }

    async function submitLogin(event) {
        event.preventDefault();
        const password = document.getElementById('lcLoginPassword').value;
        const btn = document.getElementById('lcLoginBtn');
        const errorDiv = document.getElementById('lcLoginError');

        btn.textContent = 'LOGGING IN...';
        btn.disabled = true;
        errorDiv.style.display = 'none';

        try {
            let loginSuccess = false;
            let loginData = null;
            let successRole = null;

            for (const role of loginUserRoles) {
                try {
                    const loginRes = await fetch(`${config.apiBase}/api/v1/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: loginUserEmail, password: password, userType: role })
                    });
                    const data = await loginRes.json();

                    if (data.token) {
                        loginSuccess = true;
                        loginData = data;
                        successRole = role;
                        break;
                    }
                } catch (e) {
                    // Try next role
                }
            }

            if (!loginSuccess) {
                errorDiv.textContent = 'Invalid password';
                errorDiv.style.display = 'block';
                btn.textContent = 'LOGIN';
                btn.disabled = false;
                return;
            }

            // Store token using canonical key: 'token'
            localStorage.setItem('token', loginData.token);
            localStorage.setItem('userEmail', loginUserEmail);
            localStorage.setItem('userRole', successRole);
            localStorage.setItem('userRoles', JSON.stringify(loginUserRoles));

            // Call success callback if provided
            if (config.onSuccess) {
                try {
                    config.onSuccess({
                        token: loginData.token,
                        email: loginUserEmail,
                        roles: loginUserRoles,
                        userId: loginData.userId
                    });
                } catch (e) {
                    console.error('LoginCenter onSuccess error:', e);
                }
            } else {
                // Default behavior: redirect based on role
                const rolePriority = ['admin', 'venue', 'host', 'partner', 'dj', 'member'];
                const primaryRole = rolePriority.find(r => loginUserRoles.includes(r)) || 'member';
                const roleRedirects = {
                    admin: '/admin',
                    venue: '/venue',
                    host: '/host',
                    partner: '/partners',
                    dj: '/dj',
                    member: '/members'
                };
                window.location.href = roleRedirects[primaryRole];
            }

        } catch (error) {
            console.error('Login error:', error);
            errorDiv.textContent = 'Connection error. Please try again.';
            errorDiv.style.display = 'block';
        }

        btn.textContent = 'LOGIN';
        btn.disabled = false;
    }

    function showForgotPassword() {
        document.getElementById('lcLoginPasswordSection').style.display = 'none';
        document.getElementById('lcForgotPasswordSection').style.display = 'block';
        document.getElementById('lcForgotPhone').value = '';
        document.getElementById('lcForgotError').style.display = 'none';
        document.getElementById('lcForgotSuccess').style.display = 'none';
    }

    async function submitForgotPassword(event) {
        event.preventDefault();
        const phone = document.getElementById('lcForgotPhone').value;
        const btn = document.getElementById('lcForgotBtn');
        const errorDiv = document.getElementById('lcForgotError');
        const successDiv = document.getElementById('lcForgotSuccess');

        btn.textContent = 'SENDING...';
        btn.disabled = true;
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';

        try {
            const response = await fetch(`${config.apiBase}/api/v1/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });
            const data = await response.json();

            if (data.success) {
                successDiv.textContent = 'If an account exists with this phone, a code has been sent.';
                successDiv.style.display = 'block';
            } else {
                errorDiv.textContent = data.error || 'Failed to send code';
                errorDiv.style.display = 'block';
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            errorDiv.textContent = 'Connection error. Please try again.';
            errorDiv.style.display = 'block';
        }

        btn.textContent = 'SEND CODE';
        btn.disabled = false;
    }

    async function submitCreateAccount(event) {
        event.preventDefault();
        const firstName = document.getElementById('lcCreateFirstName').value;
        const lastName = document.getElementById('lcCreateLastName').value;
        const email = document.getElementById('lcCreateEmail').value;
        const phone = document.getElementById('lcCreatePhone').value;
        const password = document.getElementById('lcCreatePassword').value;
        const passwordConfirm = document.getElementById('lcCreatePasswordConfirm').value;
        const partnerCode = document.getElementById('lcCreatePartnerCode').value.trim().toUpperCase();
        const btn = document.getElementById('lcCreateBtn');
        const errorDiv = document.getElementById('lcCreateError');

        errorDiv.style.display = 'none';

        // Validate passwords match
        if (password !== passwordConfirm) {
            errorDiv.textContent = 'Passwords do not match';
            errorDiv.style.display = 'block';
            return;
        }

        if (password.length < 4) {
            errorDiv.textContent = 'Password must be at least 4 characters';
            errorDiv.style.display = 'block';
            return;
        }

        btn.textContent = 'Creating...';
        btn.disabled = true;

        // Determine primary role
        const primaryRole = selectedRoles.includes('venue') ? 'venue' :
                           selectedRoles.includes('dj') ? 'dj' : 'member';

        try {
            const response = await fetch(`${config.apiBase}/api/v1/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password,
                    userType: primaryRole,
                    roles: selectedRoles,
                    venueStatus: selectedRoles.includes('venue') ? 'pending' : null,
                    adminStatus: selectedRoles.includes('admin') ? 'pending' : null,
                    hostStatus: selectedRoles.includes('host') ? 'pending' : null,
                    partnerCode: partnerCode || null
                })
            });

            const data = await response.json();

            if (data.token || data.success) {
                if (data.token) {
                    // Store token using canonical key: 'token'
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userRole', primaryRole);
                    localStorage.setItem('userRoles', JSON.stringify(selectedRoles));
                    if (data.userId) localStorage.setItem('userId', data.userId);
                }

                // Show success message
                const successEl = document.getElementById('lcSuccess');
                if (selectedRoles.includes('venue') || selectedRoles.includes('admin') || selectedRoles.includes('host')) {
                    const pendingRoles = [];
                    if (selectedRoles.includes('admin')) pendingRoles.push('Admin');
                    if (selectedRoles.includes('venue')) pendingRoles.push('Venue');
                    if (selectedRoles.includes('host')) pendingRoles.push('Host');
                    const pendingRole = pendingRoles.join(', ');
                    successEl.innerHTML = `
                        <div style="font-size: 60px; margin-bottom: 1rem;">&#9203;</div>
                        <h3 style="margin-bottom: 0.5rem; color: var(--lightning-yellow);">Account Created!</h3>
                        <p style="color: var(--lightning-yellow); margin-bottom: 1rem;">${pendingRole} access is pending approval</p>
                        <p style="color: var(--gray); font-size: 0.9rem;">You can access member features right away.</p>
                        <button onclick="LoginCenter.onSuccessClick()" style="margin-top: 1.5rem; padding: 1rem 2rem; background: var(--lightning-yellow); color: #000; border: none; border-radius: 10px; font-weight: 700; cursor: pointer;">CONTINUE</button>
                    `;
                }

                document.querySelector('#loginCenterModal .pass-modal-form-container').style.display = 'none';
                successEl.classList.add('active');

                // Store data for callback
                loginUserEmail = email;
                loginUserRoles = selectedRoles;

                // Call onSuccess immediately (discount applied NOW, not on CONTINUE click)
                if (config.onSuccess) {
                    try {
                        config.onSuccess({
                            token: localStorage.getItem('token'),
                            email: email,
                            roles: selectedRoles,
                            userId: localStorage.getItem('userId')
                        });
                    } catch (e) {
                        console.error('LoginCenter onSuccess error:', e);
                    }
                }

            } else {
                errorDiv.textContent = data.error || 'Registration failed';
                errorDiv.style.display = 'block';
                btn.textContent = 'CREATE ACCOUNT';
                btn.disabled = false;
            }
        } catch (error) {
            console.error('Registration error:', error);
            errorDiv.textContent = 'Registration failed. Please try again.';
            errorDiv.style.display = 'block';
            btn.textContent = 'CREATE ACCOUNT';
            btn.disabled = false;
        }
    }

    function onSuccessClick() {
        // Just close the modal - onSuccess was already called when success state was shown
        close();
    }

    return {
        init,
        open,
        close,
        toggleRole,
        showUserTypes,
        proceedToSignup,
        showQuickLogin,
        lookupUserRoles,
        submitLogin,
        showForgotPassword,
        submitForgotPassword,
        submitCreateAccount,
        onSuccessClick
    };
})();
