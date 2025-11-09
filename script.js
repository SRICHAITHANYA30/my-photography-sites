// Mobile Navigation Toggle (robust)
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

// EmailJS Configuration (leave as-is or update with your own keys)
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '-FPLxoEKAgrftVYRJ',
    SERVICE_ID: 'service_uovuw8h',
    TEMPLATE_ID: 'template_dele6fz'
};

if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY) {
    try { emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY); console.log('EmailJS initialized'); }
    catch (err) { console.warn('EmailJS init failed', err); }
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
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
    
    // Check if EmailJS is configured - if not, fall back to showing success and logging details
    const configured = EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.SERVICE_ID && EMAILJS_CONFIG.TEMPLATE_ID;
    if (!configured || typeof emailjs === 'undefined') {
        console.log('EmailJS not configured or library missing. Booking details:', emailParams);
        showSuccessMessage('Thank you! Your booking request has been received. We will contact you soon. (Enable EmailJS to receive email notifications)');
        contactForm.reset();
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        return;
    }

    // Send via EmailJS
    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, emailParams)
        .then(function(response) {
            showSuccessMessage('Thank you! Your booking request has been sent successfully. We will contact you soon.');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('EmailJS send error:', error);
            showErrorMessage('There was a problem sending your booking request. Please try again or contact us directly.');
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

// Initialize admin mode on page load
document.addEventListener('DOMContentLoaded', () => {
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
});

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

