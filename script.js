// ============================================
// Page Initialization
// ============================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page loaded - Initializing...');

    // Gate the homepage behind login so this page only opens after sign-in
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const { profile: currentProfile, role: currentRole } = getLogin();
    if ((currentPage === '' || currentPage === 'index.html') && !(currentProfile && currentProfile.email)) {
        window.location.replace('customer-login.html');
        return;
    }
    if (currentPage === 'admin.html' && currentRole !== 'owner') {
        window.location.replace('owner-login.html');
        return;
    }
    
    // Make sure booking form is always visible
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.style.display = 'block';
        
        // Attach form submission handler HERE (inside DOMContentLoaded)
        console.log('✅ Contact form found - attaching event listener...');
        attachFormHandler(contactForm);
    } else {
        console.error('❌ Contact form not found!');
    }
    
    // Load gallery images
    if (galleryImages.length > 0) {
        galleryImages.forEach((imagePath, index) => {
            addGalleryImage(imagePath, `Photo ${index + 1}`);
        });
    }
    
    // Set minimum date for booking form to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Initialize admin mode
    initializeAdminMode();

    // Render account info in navbar if logged in
    renderAccountInfo();
});

// ============================================
// Mobile Navigation Toggle (robust)
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
    const toggleNav = () => navMenu.classList.toggle('active');
    hamburger.addEventListener('click', toggleNav);
    // make hamburger keyboard accessible
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') toggleNav();
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling (safe selection)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// EmailJS Configuration
// Updated with your EmailJS account credentials
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'AkADBIUF3aHanmrFx',        // Your EmailJS Public Key
    SERVICE_ID: 'service_uovuw8h',           // Your Gmail Service ID
    TEMPLATE_ID: 'template_dele6fz'          // Your Contact Us Template ID
};

if (typeof window !== 'undefined') {
    window.EMAILJS_CONFIG = EMAILJS_CONFIG;
}

// Google Sign-In configuration
const GOOGLE_CONFIG = {
    CLIENT_ID: (typeof window !== 'undefined' && window.GOOGLE_CLIENT_ID) ? window.GOOGLE_CLIENT_ID : '985628179234-5mgkssbs8ih2jpd927vk2ajrgatq8o33.apps.googleusercontent.com',
    OWNER_EMAILS: (typeof window !== 'undefined' && window.OWNER_EMAILS) ? window.OWNER_EMAILS : ['srichaithanyacseaiml@gmail.com']
};

// Admin password for enabling upload UI (change this to your preferred secret)
// NOTE: This is a simple client-side protection and not secure for public-facing sites.
// For production, implement server-side authentication.
const ADMIN_PASS = 'admin123';

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        try { 
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY); 
            console.log('✅ EmailJS initialized successfully');
        } catch (err) { 
            console.error('❌ EmailJS init failed:', err); 
        }
    } else {
        console.warn('⚠️ EmailJS Public Key not configured. Please set up EmailJS.');
    }
} else {
    console.warn('⚠️ EmailJS library not loaded. Check if the script is included in HTML.');
}

// Contact Form Handling Function
function attachFormHandler(form) {
    console.log('✅ Attaching form submission handler...');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('📝 Form submitted! (preventDefault called)');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            location: document.getElementById('location').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate required fields
        console.log('📋 Form data collected:', formData);
    
        if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.message) {
            console.error('❌ Validation failed - missing required fields');
            showErrorMessage('Please fill in all required fields (Name, Email, Phone, Location, and Message).');
            return;
        }
        
        console.log('✅ All required fields validated');
        
        // Show loading state (visual + text)
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        // Add label wrapper if not present
        if (!submitButton.querySelector('.btn-label')) {
            const labelSpan = document.createElement('span');
            labelSpan.className = 'btn-label';
            labelSpan.textContent = originalButtonText;
            submitButton.textContent = '';
            submitButton.appendChild(labelSpan);
        }
        submitButton.classList.add('btn-loading');
        // add spinner
        let spinner = submitButton.querySelector('.btn-spinner');
        if (!spinner) {
            spinner = document.createElement('span');
            spinner.className = 'btn-spinner';
            submitButton.appendChild(spinner);
        }
        submitButton.disabled = true;
    
    // Format date for display
    const formattedDate = formData.date ? formatDate(formData.date) : 'Not specified';
    
    // Format time for display
    const formattedTime = formData.time ? formatTime(formData.time) : 'Not specified';
    
    // Format service name
    const serviceNames = {
        'portrait': 'Portrait Photography',
        'wedding': 'Wedding Photography',
        'event': 'Event Photography',
        'nature': 'Nature & Landscape',
        'other': 'Other'
    };
    const serviceName = serviceNames[formData.service] || formData.service || 'Not specified';
    
    // Prepare email template parameters
    // All variables that can be used in your EmailJS template
    const bookingTime = new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short'
    });

    // Save booking locally for admin dashboard
    try {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const newBooking = {
            id: 'b_' + Date.now(),
            createdAt: bookingTime,
            status: 'Pending',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: serviceName,
            date: formattedDate,
            time: formattedTime,
            location: formData.location,
            message: formData.message
        };
        bookings.push(newBooking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        console.log('🗂️ Booking saved with status: Pending');
    } catch (err) {
        console.warn('⚠️ Failed to save booking locally:', err);
    }
    
    // Prepare email template parameters
    // Match your EmailJS template variable names: {{name}}, {{email}}, {{message}}, {{time}}
    const emailParams = {
        // Template variables (matching your EmailJS template)
        name: formData.name,
        email: formData.email,
        message: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOKING REQUEST FROM WEBSITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER DETAILS:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOKING DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service Type: ${serviceName}
Preferred Date: ${formattedDate}
Photographer Arrival Time: ${formattedTime}
Location/Address: ${formData.location}
Booking Time: ${bookingTime}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE FROM CUSTOMER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This booking was submitted through your website contact form.
Please contact the customer to confirm the booking.

---
SRICHAITHANYA DIGITALS Website`,
        time: bookingTime,
        // Also include standard variables for compatibility
        from_name: formData.name,
        from_email: formData.email,
        // Additional variables for detailed templates
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone || 'Not provided',
        service_type: serviceName,
        booking_date: formattedDate,
        arrival_time: formattedTime,
        location: formData.location,
        booking_time: bookingTime,
        reply_to: formData.email,
        // To email (your email address)
        to_email: 'srichaithanyacseaiml@gmail.com'
    };
    
    // Check if EmailJS is configured - if not, fall back to showing success and logging details
    const configured = EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.SERVICE_ID && EMAILJS_CONFIG.TEMPLATE_ID;
    console.log('🔧 EmailJS Configuration Check:', {
        hasPublicKey: !!EMAILJS_CONFIG.PUBLIC_KEY,
        hasServiceId: !!EMAILJS_CONFIG.SERVICE_ID,
        hasTemplateId: !!EMAILJS_CONFIG.TEMPLATE_ID,
        emailjsLoaded: typeof emailjs !== 'undefined',
        configured: configured
    });
    
    if (!configured || typeof emailjs === 'undefined') {
        console.error('❌ EmailJS not configured or library missing');
        console.log('Booking details that would be sent:', emailParams);
        // show visual success briefly
        submitButton.classList.remove('btn-loading');
        submitButton.classList.add('btn-success');
        // add check icon
        if (!submitButton.querySelector('.btn-check')) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
            svg.setAttribute('viewBox','0 0 24 24');
            svg.classList.add('btn-check');
            svg.innerHTML = '<path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.21-4.186-4.186a1 1 0 1 0-1.414 1.414l4.888 4.889a1 1 0 0 0 1.414 0l10.604-10.909z"/>';
            submitButton.appendChild(svg);
        }
        showSuccessMessage('Thank you! Your booking request has been received. We will contact you soon. (Enable EmailJS to receive email notifications)');
        setTimeout(() => {
            submitButton.classList.remove('btn-success');
            const check = submitButton.querySelector('.btn-check'); if (check) check.remove();
        }, 2200);
        form.reset();
        submitButton.disabled = false;
        return;
    }
    
    console.log('✅ EmailJS is configured and ready to send');
    console.log('📧 EmailJS object:', typeof emailjs, emailjs);
    console.log('📧 EmailJS.send function:', typeof emailjs.send);

    // Send via EmailJS
    console.log('📧 Attempting to send email...');
    console.log('EmailJS Config:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: EMAILJS_CONFIG.TEMPLATE_ID,
        hasPublicKey: !!EMAILJS_CONFIG.PUBLIC_KEY
    });
    console.log('📧 Email Parameters being sent:', emailParams);
    console.log('📧 Template expects: name, email, message, time');
    console.log('📧 We are sending:', {
        name: emailParams.name,
        email: emailParams.email,
        message: emailParams.message ? 'Yes (length: ' + emailParams.message.length + ')' : 'No',
        time: emailParams.time
    });
    console.log('🚀 Calling emailjs.send()...');
    
    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, emailParams)
        .then(function(response) {
            console.log('✅ Email sent successfully!', {
                status: response.status,
                text: response.text,
                response: response
            });
            console.log('📧 EmailJS Response:', response);
            console.log('📧 IMPORTANT: Check your EmailJS dashboard → Email History');
            console.log('📧 Go to: https://dashboard.emailjs.com/admin/inbox');
            console.log('📧 Click on the most recent entry and check:');
            console.log('   - "To" field should show: srichaithanyacseaiml@gmail.com');
            console.log('   - "From" field - what does it show?');
            console.log('   - "Status" - what does it say?');
            console.log('📧 If email shows "OK" but not received:');
            console.log('   1. Check Gmail spam folder (most common issue!)');
            console.log('   2. Use "Test It" button in EmailJS template');
            console.log('   3. Verify Gmail service is "Connected"');
            console.log('   4. Try setting "From Email" to: srichaithanyacseaiml@gmail.com');
            // success visual
            submitButton.classList.remove('btn-loading');
            // replace spinner with check
            const spinnerEl = submitButton.querySelector('.btn-spinner'); if (spinnerEl) spinnerEl.remove();
            if (!submitButton.querySelector('.btn-check')) {
                const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
                svg.setAttribute('viewBox','0 0 24 24');
                svg.classList.add('btn-check');
                svg.innerHTML = '<path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.21-4.186-4.186a1 1 0 1 0-1.414 1.414l4.888 4.889a1 1 0 0 0 1.414 0l10.604-10.909z"/>';
                submitButton.appendChild(svg);
            }
            submitButton.classList.add('btn-success');
            showSuccessMessage('Thank you! Your booking request has been sent successfully. Please check your EmailJS Email History to verify delivery. If not received, check spam folder.');
            form.reset();
            // after a short delay remove success state
            setTimeout(() => {
                submitButton.classList.remove('btn-success');
                const check = submitButton.querySelector('.btn-check'); if (check) check.remove();
            }, 2200);
        })
        .catch(function(error) {
            console.error('❌ EmailJS send error:', error);
            console.error('❌ Full error object:', JSON.stringify(error, null, 2));
            console.error('Error details:', {
                status: error.status,
                text: error.text,
                serviceId: EMAILJS_CONFIG.SERVICE_ID,
                templateId: EMAILJS_CONFIG.TEMPLATE_ID,
                publicKey: EMAILJS_CONFIG.PUBLIC_KEY ? 'Set' : 'Missing',
                errorType: error.constructor.name
            });
            
            // More specific error messages
            let errorMessage = 'There was a problem sending your booking request. ';
            if (error.status === 400) {
                errorMessage += 'Template variables may not match. Check console for details.';
                console.error('💡 TIP: Your template uses: {{name}}, {{email}}, {{message}}, {{time}}');
                console.error('💡 We sent:', Object.keys(emailParams));
            } else if (error.status === 401) {
                errorMessage += 'EmailJS authentication failed. Please check your Public Key.';
            } else if (error.status === 404) {
                errorMessage += 'EmailJS service or template not found. Please check your Service ID and Template ID.';
            } else {
                errorMessage += 'Please try again or contact us directly at srichaithanyacseaiml@gmail.com';
            }
            
            showErrorMessage(errorMessage);
        })
        .finally(function() {
            // ensure loading removed if still present
            submitButton.classList.remove('btn-loading');
            const spinnerEl = submitButton.querySelector('.btn-spinner'); if (spinnerEl) spinnerEl.remove();
            // restore label text if label wrapper exists
            const label = submitButton.querySelector('.btn-label');
            if (label) {
                // leave the label text as original
            } else {
                submitButton.textContent = originalButtonText;
            }
            submitButton.disabled = false;
        });
    });
    
    console.log('✅ Form event listener attached successfully!');
}

// ============================================
// Google Sign-In (GIS) Helpers
// ============================================

function decodeJwt(token) {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    try {
        const json = decodeURIComponent(atob(payload).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(json);
    } catch (e) {
        console.error('Failed to decode JWT payload', e);
        return null;
    }
}

function saveLogin(profile, role) {
    try {
        localStorage.setItem('userProfile', JSON.stringify(profile));
        localStorage.setItem('userRole', role || 'customer');
    } catch (e) {
        console.error('Failed to save login', e);
    }
}

function getLogin() {
    try {
        const profile = JSON.parse(localStorage.getItem('userProfile') || 'null');
        const role = localStorage.getItem('userRole') || null;
        return { profile, role };
    } catch (e) {
        return { profile: null, role: null };
    }
}

function logout() {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userRole');
    renderAccountInfo();
    // Optional: disable admin mode if it was enabled
    try { disableAdminMode(); } catch (_) {}
}

function renderAccountInfo() {
    const { profile, role } = getLogin();
    const infoEl = document.getElementById('account-info');
    const avatarEl = document.getElementById('user-avatar');
    const nameEl = document.getElementById('user-name');
    const customerLink = document.getElementById('customer-login-link');
    const ownerLink = document.getElementById('owner-login-link');
    const adminLink = document.getElementById('admin-dashboard-link');
    const logoutBtn = document.getElementById('logout-btn');

    if (!infoEl) return; // navbar not present on some pages

    if (profile && profile.email) {
        infoEl.style.display = 'flex';
        if (avatarEl) {
            if (profile.picture) {
                avatarEl.src = profile.picture;
                avatarEl.style.display = 'block';
            } else {
                avatarEl.style.display = 'none';
            }
        }
        if (nameEl) {
            nameEl.textContent = profile.name || profile.email || 'My Account';
        }
        if (customerLink) customerLink.style.display = 'none';
        if (ownerLink) ownerLink.style.display = 'none';
        if (adminLink) adminLink.style.display = (role === 'owner') ? 'inline-block' : 'none';
        if (logoutBtn) {
            logoutBtn.onclick = logout;
        }
    } else {
        infoEl.style.display = 'none';
        if (customerLink) customerLink.style.display = 'inline-block';
        if (ownerLink) ownerLink.style.display = 'inline-block';
        if (adminLink) adminLink.style.display = 'none';
        if (logoutBtn) logoutBtn.onclick = null;
    }
}

function initGoogleSignIn(role) {
    const cid = GOOGLE_CONFIG.CLIENT_ID;
    if (!cid || cid === 'YOUR_GOOGLE_CLIENT_ID') {
        alert('Google Client ID is not configured. See GOOGLE_LOGIN_SETUP.md for setup.');
        return;
    }

    setupLoginForm(role);

    function initialize() {
        if (!window.google || !google.accounts || !google.accounts.id) {
            console.warn('Google Identity Services not available yet.');
            return;
        }
        google.accounts.id.initialize({
            client_id: cid,
            callback: (response) => handleCredentialResponse(response, role),
            ux_mode: 'popup',
            auto_select: false,
            context: 'signin'
        });
        const btnContainer = document.getElementById('google-signin-container');
        if (btnContainer) {
            google.accounts.id.renderButton(btnContainer, { theme: 'outline', size: 'large', type: 'standard', text: 'signin_with', shape: 'pill' });
        } else {
            google.accounts.id.prompt();
        }
    }

    if (window.google && google.accounts && google.accounts.id) {
        initialize();
    } else {
        window.addEventListener('load', initialize);
    }
}

function setupLoginForm(role) {
    const formId = role === 'owner' ? 'owner-login-form' : 'customer-login-form';
    const emailId = role === 'owner' ? 'owner-email' : 'customer-email';
    const form = document.getElementById(formId);
    const emailInput = document.getElementById(emailId);
    if (!form || form.dataset.bound === 'true') return;

    form.dataset.bound = 'true';
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = (emailInput && emailInput.value ? emailInput.value.trim() : '');
        if (!email) {
            alert('Please enter your Gmail address.');
            if (emailInput) emailInput.focus();
            return;
        }
        if (!/^[^\s@]+@gmail\.com$/i.test(email)) {
            alert('Please use a Gmail address to continue.');
            if (emailInput) emailInput.focus();
            return;
        }

        try {
            localStorage.setItem('loginEmailHint', email);
        } catch (_) {}

        if (window.google && google.accounts && google.accounts.id) {
            google.accounts.id.prompt();
        } else {
            alert('Google Sign-In is still loading. Please wait a moment and try again.');
        }
    });

    if (emailInput) {
        emailInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                form.requestSubmit();
            }
        });
    }
}

function handleCredentialResponse(response, role) {
    try {
        const jwt = response && response.credential;
        const profile = decodeJwt(jwt) || {};
        if (!profile || !profile.email) {
            alert('Sign-in failed. No email found.');
            return;
        }
        if (role === 'owner') {
            const allowed = (GOOGLE_CONFIG.OWNER_EMAILS || []).some(e => String(e).toLowerCase() === String(profile.email).toLowerCase());
            if (!allowed) {
                alert('Owner access denied for: ' + profile.email);
                return;
            }
        }
        saveLogin({ email: profile.email, name: profile.name, picture: profile.picture }, role || 'customer');
        // Auto-enable admin mode for owners
        if (role === 'owner') {
            try { enableAdminMode(); } catch (_) {}
        }
        // Redirect to home after successful login
        window.location.href = 'index.html';
    } catch (e) {
        console.error('Google sign-in error', e);
        alert('Google sign-in error. Please check console.');
    }
}

// Ripple effect for interactive buttons (anchors and buttons)
function addGlobalRipple() {
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-primary, .btn-secondary, .cta, .upload-btn, button[type="submit"]');
        if (!btn) return;
        // create ripple
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height) * 0.8;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        btn.appendChild(ripple);
        // remove after animation
        setTimeout(() => ripple.remove(), 700);
    }, { passive: true });
}

addGlobalRipple();

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    };
    return date.toLocaleDateString('en-IN', options);
}

// Helper function to format time
function formatTime(timeString) {
    if (!timeString) return 'Not specified';
    
    // Convert 24-hour format (HH:MM) to 12-hour format (HH:MM AM/PM)
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

function showSuccessMessage(message = 'Thank you! Your message has been sent. We will get back to you soon.') {
    // Remove any existing messages
    const existingMsg = document.querySelector('.success-message, .error-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = message;
    contactForm.insertBefore(successMsg, contactForm.firstChild);
    successMsg.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
        setTimeout(() => successMsg.remove(), 500);
    }, 5000);
}

function showErrorMessage(message) {
    // Remove any existing messages
    const existingMsg = document.querySelector('.success-message, .error-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    contactForm.insertBefore(errorMsg, contactForm.firstChild);
    errorMsg.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        errorMsg.classList.remove('show');
        setTimeout(() => errorMsg.remove(), 500);
    }, 5000);
}

// Gallery Image Loading
// This function can be used to dynamically add images to the gallery
function addGalleryImage(imagePath, altText = '') {
    const galleryGrid = document.getElementById('gallery-grid');
    const placeholder = document.querySelector('.gallery-placeholder');
    
    // Remove placeholder on first image
    if (placeholder) {
        placeholder.remove();
    }
    
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = altText;
    img.loading = 'lazy';
    
    galleryItem.appendChild(img);
    galleryGrid.appendChild(galleryItem);
}

// Admin Mode Management
let isAdminMode = false;

// Check if admin mode was previously enabled
function checkAdminMode() {
    const savedAdminMode = localStorage.getItem('galleryAdminMode');
    if (savedAdminMode === 'true') {
        enableAdminMode();
    }
}

// Enable admin mode
function enableAdminMode() {
    isAdminMode = true;
    localStorage.setItem('galleryAdminMode', 'true');
    const uploadSection = document.getElementById('gallery-upload-section');
    const adminToggle = document.getElementById('admin-toggle');
    const dashboardBtn = document.getElementById('admin-dashboard-btn');
    
    if (uploadSection) {
        uploadSection.style.display = 'block';
    }
    if (adminToggle) {
        adminToggle.classList.add('active');
        adminToggle.textContent = '🔓';
        adminToggle.title = 'Admin Mode Active';
    }
    if (dashboardBtn) {
        dashboardBtn.style.display = 'inline-block';
    }
}

// Disable admin mode
function disableAdminMode() {
    isAdminMode = false;
    localStorage.removeItem('galleryAdminMode');
    const uploadSection = document.getElementById('gallery-upload-section');
    const adminToggle = document.getElementById('admin-toggle');
    const dashboardBtn = document.getElementById('admin-dashboard-btn');
    
    if (uploadSection) {
        uploadSection.style.display = 'none';
    }
    if (adminToggle) {
        adminToggle.classList.remove('active');
        adminToggle.textContent = '🔒';
        adminToggle.title = 'Enable Admin Mode';
    }
    if (dashboardBtn) {
        dashboardBtn.style.display = 'none';
    }
}

// Admin mode initialization (called from main DOMContentLoaded)
function initializeAdminMode() {
    checkAdminMode();
    
    // Admin toggle button
    const adminToggle = document.getElementById('admin-toggle');
    if (adminToggle) {
        adminToggle.addEventListener('click', () => {
            if (isAdminMode) {
                disableAdminMode();
                return;
            }

            // Ask for admin password before enabling admin mode
            const attempt = prompt('Enter admin password to enable admin mode:');
            if (attempt === null) return; // user cancelled
            if (attempt === ADMIN_PASS) {
                enableAdminMode();
            } else {
                alert('Incorrect password. Admin mode not enabled.');
            }
        });
    }
    
    // Exit admin button
    const exitAdmin = document.getElementById('exit-admin');
    if (exitAdmin) {
        exitAdmin.addEventListener('click', () => {
            disableAdminMode();
        });
    }
}

// Photo Upload Functionality (Only works in admin mode)
const photoUpload = document.getElementById('photo-upload');
if (photoUpload) {
    photoUpload.addEventListener('change', function(e) {
        // Check if admin mode is enabled
        if (!isAdminMode) {
            alert('Admin mode is required to upload photos.');
            this.value = '';
            return;
        }
        
        const files = e.target.files;
        
        if (files.length === 0) return;
        
        const galleryGrid = document.getElementById('gallery-grid');
        const placeholder = document.querySelector('.gallery-placeholder');
        
        // Remove placeholder on first upload
        if (placeholder) {
            placeholder.remove();
        }
        
        // Process each selected file
        Array.from(files).forEach((file, index) => {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                console.warn(`File ${file.name} is not an image, skipping.`);
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name || `Photo ${index + 1}`;
                img.loading = 'lazy';
                
                // Add fade-in animation
                galleryItem.style.opacity = '0';
                galleryItem.style.transform = 'scale(0.9)';
                
                galleryItem.appendChild(img);
                galleryGrid.appendChild(galleryItem);
                
                // Animate in
                setTimeout(() => {
                    galleryItem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    galleryItem.style.opacity = '1';
                    galleryItem.style.transform = 'scale(1)';
                }, index * 100);
            };
            
            reader.onerror = function() {
                console.error('Error reading file:', file.name);
            };
            
            reader.readAsDataURL(file);
        });
        
        // Reset input to allow selecting the same file again
        photoUpload.value = '';
    });
}

// Gallery Images - Add your photos here
// Simply add your image paths to the array below
// Place your images in the 'images' folder and update the paths

const galleryImages = [
    // Using the image files you added to the `images/` folder
    'images/c1.jpg',
    'images/c2.jpg',
    'images/c3.webp',
    'images/c4.webp'
];

// Load gallery images when page loads (moved to main DOMContentLoaded)

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;

    // Keep hamburger icon animated state in sync with nav (adds X animation)
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
        });
    }

    // Scroll / reveal animations using IntersectionObserver
    (function setupRevealObserver(){
        const revealElems = document.querySelectorAll('.reveal');
        if (!revealElems || revealElems.length === 0) return;

        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            revealElems.forEach(el => obs.observe(el));
        } else {
            // Fallback: make all visible
            revealElems.forEach(el => el.classList.add('visible'));
        }
    })();
});

// Removed duplicate - now handled in main DOMContentLoaded

// ============================================
// Booking Storage (Local)
// ============================================
function getBookings(){
    try { return JSON.parse(localStorage.getItem('bookings')||'[]'); } catch(e){ return []; }
}
function setBookings(list){
    try { localStorage.setItem('bookings', JSON.stringify(list)); } catch(e){}
}
function saveBooking(data, meta){
    const list = getBookings();
    const booking = {
        id: 'b_' + Date.now(),
        createdAt: (meta && meta.bookingTime) ? meta.bookingTime : new Date().toLocaleString(),
        status: 'new',
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        date: data.date,
        time: data.time,
        location: data.location,
        message: data.message
    };
    list.push(booking);
    setBookings(list);
    return booking;
}

