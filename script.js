// ============================================
// Page Initialization
// ============================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page loaded - Initializing...');
    
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
            // First image is the Canon R6 camera
            const altText = index === 0 ? 'Canon R6 Camera - Professional Photography Equipment' : `Photo ${index + 1}`;
            addGalleryImage(imagePath, altText);
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
        
        if (!formData.name || !formData.email || !formData.location || !formData.message) {
            console.error('❌ Validation failed - missing required fields');
            showErrorMessage('Please fill in all required fields (Name, Email, Location, and Message).');
            return;
        }
        
        console.log('✅ All required fields validated');
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
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
        showSuccessMessage('Thank you! Your booking request has been received. We will contact you soon. (Enable EmailJS to receive email notifications)');
        form.reset();
        submitButton.textContent = originalButtonText;
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
            showSuccessMessage('Thank you! Your booking request has been sent successfully. Please check your EmailJS Email History to verify delivery. If not received, check spam folder.');
            form.reset();
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
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
    
    console.log('✅ Form event listener attached successfully!');
}

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

// Admin Mode Management (Password Protected - Only for Host)
let isAdminMode = false;

// Admin Password - Change this to your desired password
// IMPORTANT: Keep this password secret! Only you (the host) should know it.
const ADMIN_PASSWORD = 'admin2024'; // Change this to your own secure password

// Check if admin mode was previously enabled (with session timeout)
function checkAdminMode() {
    const savedAdminMode = localStorage.getItem('galleryAdminMode');
    const adminModeTime = localStorage.getItem('galleryAdminModeTime');
    
    // Check if admin mode was enabled within the last 24 hours
    if (savedAdminMode === 'true' && adminModeTime) {
        const timeDiff = Date.now() - parseInt(adminModeTime);
        const hours24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        if (timeDiff < hours24) {
            enableAdminMode();
        } else {
            // Session expired, require password again
            localStorage.removeItem('galleryAdminMode');
            localStorage.removeItem('galleryAdminModeTime');
        }
    }
}

// Prompt for admin password
function promptAdminPassword() {
    const password = prompt('Enter admin password to access photo upload:');
    
    if (password === ADMIN_PASSWORD) {
        enableAdminMode();
        return true;
    } else if (password !== null) {
        // User entered something but it was wrong
        alert('Incorrect password. Access denied.');
        return false;
    }
    // User cancelled the prompt
    return false;
}

// Enable admin mode
function enableAdminMode() {
    isAdminMode = true;
    localStorage.setItem('galleryAdminMode', 'true');
    localStorage.setItem('galleryAdminModeTime', Date.now().toString());
    
    const uploadSection = document.getElementById('gallery-upload-section');
    if (uploadSection) {
        uploadSection.style.display = 'block';
        // Scroll to upload section smoothly
        uploadSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    console.log('✅ Admin mode enabled');
}

// Disable admin mode
function disableAdminMode() {
    isAdminMode = false;
    localStorage.removeItem('galleryAdminMode');
    localStorage.removeItem('galleryAdminModeTime');
    
    const uploadSection = document.getElementById('gallery-upload-section');
    if (uploadSection) {
        uploadSection.style.display = 'none';
    }
    
    console.log('🔒 Admin mode disabled');
}

// Admin mode initialization (called from main DOMContentLoaded)
function initializeAdminMode() {
    // Check if admin mode was previously enabled (within 24 hours)
    checkAdminMode();
    
    // Secret keyboard shortcut to access admin mode: Press 'A' key 3 times quickly
    let keyPressCount = 0;
    let keyPressTimer = null;
    
    document.addEventListener('keydown', function(e) {
        // Only trigger if not typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Secret shortcut: Press 'A' key 3 times (or 'a')
        if (e.key.toLowerCase() === 'a') {
            keyPressCount++;
            
            // Reset counter after 2 seconds
            clearTimeout(keyPressTimer);
            keyPressTimer = setTimeout(() => {
                keyPressCount = 0;
            }, 2000);
            
            // If 'A' is pressed 3 times, prompt for password
            if (keyPressCount === 3) {
                keyPressCount = 0;
                if (!isAdminMode) {
                    promptAdminPassword();
                }
            }
        }
    });
    
    // Exit admin button
    const exitAdmin = document.getElementById('exit-admin');
    if (exitAdmin) {
        exitAdmin.addEventListener('click', () => {
            if (confirm('Exit admin mode? You will need to enter the password again to access upload features.')) {
                disableAdminMode();
            }
        });
    }
    
    // Additional security: Double-click on gallery title to access admin (hidden feature)
    const galleryTitle = document.querySelector('#gallery .section-title');
    if (galleryTitle) {
        let clickCount = 0;
        let clickTimer = null;
        
        galleryTitle.addEventListener('click', function() {
            clickCount++;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
            
            if (clickCount === 2 && !isAdminMode) {
                clickCount = 0;
                promptAdminPassword();
            }
        });
    }
}

// Photo Upload Functionality (Only works in admin mode with password)
const photoUpload = document.getElementById('photo-upload');
if (photoUpload) {
    photoUpload.addEventListener('change', function(e) {
        // Double-check admin mode is enabled (security)
        if (!isAdminMode) {
            alert('Access denied. Admin mode is required to upload photos.');
            this.value = '';
            // Try to prompt for password
            if (promptAdminPassword()) {
                // If password correct, allow upload by triggering change again
                this.click();
            }
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
    // Canon R6 Camera showcase image
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&q=80',
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

