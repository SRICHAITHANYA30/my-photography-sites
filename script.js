// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize EmailJS
// IMPORTANT: Follow these steps to set up email notifications:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an email service (Gmail recommended)
// 3. Create an email template (see SETUP_INSTRUCTIONS.md)
// 4. Get your Public Key, Service ID, and Template ID
// 5. Replace the placeholders below with your actual credentials
// 6. Uncomment the emailjs.init() line and the emailjs.send() code

// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '-FPLxoEKAgrftVYRJ',     // Your EmailJS Public Key
    SERVICE_ID: 'service_uovuw8h',        // Your EmailJS Service ID
    TEMPLATE_ID: 'template_dele6fz'       // Your EmailJS Template ID (Contact Us)
    // NOTE: Private Key (Uf8RVcXHAVs33ajPk_1NZ) is NOT needed for client-side code
    // Private keys should never be exposed in frontend code for security reasons
};

// Initialize EmailJS automatically if configured
if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && EMAILJS_CONFIG.PUBLIC_KEY) {
    try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized successfully');
    } catch (error) {
        console.error('Error initializing EmailJS:', error);
    }
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
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
    if (!formData.name || !formData.email || !formData.location || !formData.message) {
        showErrorMessage('Please fill in all required fields (Name, Email, Location, and Message).');
        return;
    }
    
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
    // Using standard Contact Us template variables + booking details
    const emailParams = {
        // Standard Contact Us template variables
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
Booking Time: ${new Date().toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'short'
        })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE FROM CUSTOMER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This booking was submitted through your website contact form.
Please contact the customer to confirm the booking.

---
SRICHAITHANYA DIGITALS Website`,
        // Additional variables for custom templates
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone || 'Not provided',
        service_type: serviceName,
        booking_date: formattedDate,
        arrival_time: formattedTime,
        location: formData.location,
        booking_time: new Date().toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'short'
        }),
        reply_to: formData.email
    };
    
    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
        EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        // EmailJS not configured yet - show instructions
        console.log('EmailJS not configured. Booking details:', emailParams);
        showSuccessMessage('Thank you! Your booking request has been received. We will contact you soon. (Note: Please set up EmailJS to receive email notifications)');
        contactForm.reset();
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        return;
    }
    
    // Verify EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS library not loaded');
        showErrorMessage('EmailJS library not loaded. Please refresh the page and try again.');
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        return;
    }
    
    // Send email using EmailJS
    console.log('Sending email with:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: EMAILJS_CONFIG.TEMPLATE_ID,
        params: emailParams
    });
    
    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, emailParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            showSuccessMessage('Thank you! Your booking request has been sent successfully. We will contact you soon.');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('Error sending email:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            
            // More detailed error message
            let errorMsg = 'Sorry, there was an error sending your message. ';
            
            if (error.text) {
                errorMsg += 'Error: ' + error.text + '. ';
                
                // Specific error messages
                if (error.text.includes('template') || error.text.includes('Template')) {
                    errorMsg += 'Please check your EmailJS template ID. ';
                }
                if (error.text.includes('service') || error.text.includes('Service')) {
                    errorMsg += 'Please check your EmailJS service ID. ';
                }
            } else if (error.message) {
                errorMsg += 'Error: ' + error.message + '. ';
            }
            
            errorMsg += 'Please verify your EmailJS configuration or contact us directly at srichaithanyacseaiml@gmail.com or call 9566381467.';
            showErrorMessage(errorMsg);
        })
        .finally(function() {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
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

// Load gallery images when page loads
window.addEventListener('DOMContentLoaded', () => {
    if (galleryImages.length > 0) {
        galleryImages.forEach((imagePath, index) => {
            addGalleryImage(imagePath, `Photo ${index + 1}`);
        });
    }
});

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

// Set minimum date for booking form to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

