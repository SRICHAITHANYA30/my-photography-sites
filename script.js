// ============================================
// Google Authentication & User Management
// ============================================

let currentUser = null;

// Check if user is logged in on page load
function checkAuthStatus() {
    console.log('🔍 Checking authentication status...');
    const savedUser = localStorage.getItem('galleryUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            console.log('✅ User found in localStorage:', currentUser.email);
            updateUIForLoggedInUser();
        } catch (e) {
            console.error('❌ Error parsing saved user:', e);
            localStorage.removeItem('galleryUser');
            updateUIForLoggedOutUser();
        }
    } else {
        console.log('ℹ️ No user found - showing login options');
        updateUIForLoggedOutUser();
    }
}

// Update UI when user is logged in
function updateUIForLoggedInUser() {
    if (!currentUser) return;
    
    // Show user info in navbar
    const userAuth = document.getElementById('user-auth');
    const loginBtnNav = document.getElementById('login-btn-nav');
    const contactForm = document.getElementById('contact-form');
    const loginPrompt = document.getElementById('login-prompt');
    
    if (userAuth) {
        userAuth.style.display = 'flex';
        const userAvatar = document.getElementById('user-avatar');
        const userName = document.getElementById('user-name');
        
        if (userAvatar && currentUser.picture) {
            userAvatar.src = currentUser.picture;
        }
        if (userName) {
            userName.textContent = currentUser.name || currentUser.email;
        }
    }
    
    if (loginBtnNav) {
        loginBtnNav.style.display = 'none';
    }
    
    // Show booking form, hide login prompt
    if (contactForm) {
        contactForm.style.display = 'block';
    }
    if (loginPrompt) {
        loginPrompt.style.display = 'none';
    }
    
    // Pre-fill form with user info
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    if (nameInput && currentUser.name) {
        nameInput.value = currentUser.name;
    }
    if (emailInput && currentUser.email) {
        emailInput.value = currentUser.email;
    }
}

// Update UI when user is logged out
function updateUIForLoggedOutUser() {
    const userAuth = document.getElementById('user-auth');
    const loginBtnNav = document.getElementById('login-btn-nav');
    const contactForm = document.getElementById('contact-form');
    const loginPrompt = document.getElementById('login-prompt');
    
    if (userAuth) {
        userAuth.style.display = 'none';
    }
    
    if (loginBtnNav) {
        loginBtnNav.style.display = 'block';
        loginBtnNav.style.visibility = 'visible';
    }
    
    // Hide booking form, show login prompt
    if (contactForm) {
        contactForm.style.display = 'none';
    }
    if (loginPrompt) {
        loginPrompt.style.display = 'block';
    }
    
    console.log('👤 User is logged out - Login button and prompt should be visible');
}

// Handle Google Sign-In
function handleCredentialResponse(response) {
    // Decode the JWT token (simplified - in production, verify on server)
    try {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        
        currentUser = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            sub: payload.sub
        };
        
        // Save to localStorage
        localStorage.setItem('galleryUser', JSON.stringify(currentUser));
        
        // Update UI
        updateUIForLoggedInUser();
        
        // Close modal
        closeLoginModal();
        
        // Show success message
        showSuccessMessage('Successfully logged in! You can now book your photoshoot.');
        
        // Scroll to booking form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        }
    } catch (error) {
        console.error('Error processing Google sign-in:', error);
        showErrorMessage('Login failed. Please try again.');
    }
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('galleryUser');
    updateUIForLoggedOutUser();
    showSuccessMessage('You have been logged out successfully.');
    
    // Clear form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.reset();
    }
}

// Login Modal Management
function openLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Initialize Google Sign-In button if not already done
        if (typeof google !== 'undefined' && google.accounts) {
            initializeGoogleSignIn();
        } else {
            // Wait for Google script to load
            const checkGoogle = setInterval(() => {
                if (typeof google !== 'undefined' && google.accounts) {
                    clearInterval(checkGoogle);
                    initializeGoogleSignIn();
                }
            }, 100);
        }
    }
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Initialize Google Sign-In button
function initializeGoogleSignIn() {
    const signInContainer = document.getElementById('google-signin-button');
    if (!signInContainer || !google.accounts) return;
    
    // Clear any existing button
    signInContainer.innerHTML = '';
    
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // You'll need to replace this
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
    });
    
    google.accounts.id.renderButton(
        signInContainer,
        {
            theme: 'filled_blue',
            size: 'large',
            text: 'signin_with',
            width: 300
        }
    );
}

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page loaded - Initializing authentication...');
    checkAuthStatus();
    
    // Login button handlers
    const loginBtnNav = document.getElementById('login-btn-nav');
    const loginBtnPrompt = document.getElementById('login-btn-prompt');
    const closeModal = document.getElementById('close-modal');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (loginBtnNav) {
        loginBtnNav.addEventListener('click', openLoginModal);
    }
    
    if (loginBtnPrompt) {
        loginBtnPrompt.addEventListener('click', openLoginModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeLoginModal);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLoginModal();
            }
        });
    }
    
    // Initialize Google Sign-In when page loads (if user is not logged in)
    if (!currentUser && typeof google !== 'undefined' && google.accounts) {
        // Google script loads async, so we'll initialize when needed
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

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    console.log('✅ Contact form found and event listener attached');
    
    contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('📝 Form submitted!');
    
    // Check if user is logged in
    if (!currentUser) {
        console.warn('⚠️ User not logged in - showing login modal');
        showErrorMessage('Please login first to book a photoshoot.');
        openLoginModal();
        return;
    }
    
    console.log('✅ User is logged in:', currentUser.email);
    
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
    
    if (!formData.name || !formData.email || !formData.location || !formData.message) {
        console.error('❌ Validation failed - missing required fields');
        showErrorMessage('Please fill in all required fields (Name, Email, Location, and Message).');
        return;
    }
    
    console.log('✅ All required fields validated');
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
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
    
    const emailParams = {
        // Standard Contact Us template variables (most common)
        from_name: formData.name,
        from_email: formData.email,
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
        showSuccessMessage('Thank you! Your booking request has been received. We will contact you soon. (Enable EmailJS to receive email notifications)');
        contactForm.reset();
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        return;
    }
    
    console.log('✅ EmailJS is configured and ready to send');

    // Send via EmailJS
    console.log('📧 Attempting to send email...');
    console.log('EmailJS Config:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: EMAILJS_CONFIG.TEMPLATE_ID,
        hasPublicKey: !!EMAILJS_CONFIG.PUBLIC_KEY
    });
    console.log('Email Parameters:', emailParams);
    console.log('🚀 Calling emailjs.send()...');
    
    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, emailParams)
        .then(function(response) {
            console.log('✅ Email sent successfully!', {
                status: response.status,
                text: response.text,
                response: response
            });
            console.log('📧 Check your EmailJS dashboard → Email History to verify');
            showSuccessMessage('Thank you! Your booking request has been sent successfully. We will contact you soon.');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('❌ EmailJS send error:', error);
            console.error('Error details:', {
                status: error.status,
                text: error.text,
                serviceId: EMAILJS_CONFIG.SERVICE_ID,
                templateId: EMAILJS_CONFIG.TEMPLATE_ID,
                publicKey: EMAILJS_CONFIG.PUBLIC_KEY ? 'Set' : 'Missing'
            });
            
            // More specific error messages
            let errorMessage = 'There was a problem sending your booking request. ';
            if (error.status === 400) {
                errorMessage += 'Please check your EmailJS template configuration.';
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
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
}
});

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
    
    if (uploadSection) {
        uploadSection.style.display = 'block';
    }
    if (adminToggle) {
        adminToggle.classList.add('active');
        adminToggle.textContent = '🔓';
        adminToggle.title = 'Admin Mode Active';
    }
}

// Disable admin mode
function disableAdminMode() {
    isAdminMode = false;
    localStorage.removeItem('galleryAdminMode');
    const uploadSection = document.getElementById('gallery-upload-section');
    const adminToggle = document.getElementById('admin-toggle');
    
    if (uploadSection) {
        uploadSection.style.display = 'none';
    }
    if (adminToggle) {
        adminToggle.classList.remove('active');
        adminToggle.textContent = '🔒';
        adminToggle.title = 'Enable Admin Mode';
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
            } else {
                enableAdminMode();
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
    // Add your photo paths here, for example:
    // 'images/photo1.jpg',
    // 'images/photo2.jpg',
    // 'images/photo3.jpg',
    // 'images/photo4.jpg',
    // Add as many as you want!
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
});

// Removed duplicate - now handled in main DOMContentLoaded

