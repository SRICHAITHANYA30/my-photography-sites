// ============================================
// BOOKING MANAGEMENT & ADMIN FEATURES
// ============================================

// Get all bookings from localStorage
function getAllBookings() {
    try {
        return JSON.parse(localStorage.getItem('bookings') || '[]');
    } catch (e) {
        return [];
    }
}

// Save bookings to localStorage
function saveAllBookings(bookings) {
    try {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    } catch (e) {
        console.error('Failed to save bookings:', e);
    }
}

function getBookingHistoryContainer() {
    return document.querySelector('#booking-history .container');
}

function showBookingFeedback(message, type = 'success') {
    const container = getBookingHistoryContainer();
    if (!container) {
        alert(message);
        return;
    }

    const existing = container.querySelector('.booking-feedback');
    if (existing) {
        existing.remove();
    }

    const feedback = document.createElement('div');
    feedback.className = `booking-feedback ${type}`;
    feedback.textContent = message;
    const filters = container.querySelector('.booking-filters');
    if (filters) {
        filters.insertAdjacentElement('beforebegin', feedback);
    } else {
        container.insertBefore(feedback, container.firstChild);
    }

    requestAnimationFrame(() => feedback.classList.add('show'));

    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => feedback.remove(), 300);
    }, 4000);
}

function buildCancellationEmailMessage(booking) {
    return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOKING CANCELLED BY CUSTOMER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER DETAILS:
Name: ${booking.name || 'Not specified'}
Email: ${booking.email || 'Not specified'}
Phone: ${booking.phone || 'Not specified'}

BOOKING DETAILS:
Service Type: ${booking.service || 'Not specified'}
Preferred Date: ${booking.date || 'Not specified'}
Arrival Time: ${booking.time || 'Not specified'}
Location/Address: ${booking.location || 'Not specified'}
Message: ${booking.message || 'Not specified'}
Booking Status: Cancelled

Booking ID: ${booking.id || 'Not specified'}
Cancelled At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This notification was generated from the website booking history.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function sendCancellationNotification(booking) {
    const emailConfig = (typeof window !== 'undefined' && window.EMAILJS_CONFIG) ? window.EMAILJS_CONFIG : null;
    const emailjsAvailable = typeof emailjs !== 'undefined';

    if (!emailConfig || !emailConfig.SERVICE_ID || !emailConfig.TEMPLATE_ID || !emailjsAvailable) {
        console.warn('Cancellation email not sent: EmailJS is not configured or unavailable.');
        return Promise.resolve(false);
    }

    const emailParams = {
        name: booking.name || 'Not specified',
        email: booking.email || 'Not specified',
        message: buildCancellationEmailMessage(booking),
        time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' }),
        from_name: booking.name || 'Website Customer',
        from_email: booking.email || 'Not specified',
        customer_name: booking.name || 'Not specified',
        customer_email: booking.email || 'Not specified',
        customer_phone: booking.phone || 'Not specified',
        service_type: booking.service || 'Not specified',
        booking_date: booking.date || 'Not specified',
        arrival_time: booking.time || 'Not specified',
        location: booking.location || 'Not specified',
        booking_status: 'Cancelled',
        booking_id: booking.id || 'Not specified',
        reply_to: booking.email || 'Not specified',
        to_email: 'srichaithanyacseaiml@gmail.com'
    };

    return emailjs.send(emailConfig.SERVICE_ID, emailConfig.TEMPLATE_ID, emailParams)
        .then(() => true)
        .catch((error) => {
            console.error('Failed to send cancellation email:', error);
            return false;
        });
}

// Update booking status
function updateBookingStatus(bookingId, newStatus) {
    const bookings = getAllBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        const previousStatus = booking.status || 'Pending';
        booking.status = newStatus;
        saveAllBookings(bookings);
        renderBookingHistory();
        updateAdminDashboard();

        if (newStatus === 'Cancelled' && previousStatus !== 'Cancelled') {
            sendCancellationNotification(booking);
            showBookingFeedback('Your booking has been cancelled successfully.', 'success');
        }

        return true;
    }
    return false;
}

function cancelBooking(bookingId) {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    updateBookingStatus(bookingId, 'Cancelled');
}

// Delete booking
function deleteBooking(bookingId) {
    const bookings = getAllBookings();
    const filtered = bookings.filter(b => b.id !== bookingId);
    saveAllBookings(filtered);
    renderBookingHistory();
    updateAdminDashboard();
}

// Create booking card HTML
function createBookingCard(booking, isAdmin = false) {
    const statusClass = booking.status || 'Pending';
    const messageText = booking.message ? (booking.message.length > 100 ? `${booking.message.substring(0, 100)}...` : booking.message) : 'Not specified';
    const isCancelled = statusClass === 'Cancelled';
    let html = `
        <div class="booking-card" data-id="${booking.id}">
            <div class="booking-header">
                <div class="booking-name">${booking.name}</div>
                <span class="booking-status ${statusClass}">${statusClass}</span>
            </div>
            <div class="booking-detail"><strong>📧 Email:</strong> ${booking.email}</div>
            <div class="booking-detail"><strong>📞 Phone:</strong> ${booking.phone}</div>
            <div class="booking-detail"><strong>📸 Service:</strong> ${booking.service || 'Not specified'}</div>
            <div class="booking-detail"><strong>📅 Date:</strong> ${booking.date || 'Not specified'}</div>
            <div class="booking-detail"><strong>⏰ Time:</strong> ${booking.time || 'Not specified'}</div>
            <div class="booking-detail"><strong>📍 Location:</strong> ${booking.location}</div>
            <div class="booking-detail"><strong>💬 Message:</strong> ${messageText}</div>
    `;

    if (!isAdmin) {
        html += `
            <div class="booking-actions booking-actions-user">
                <button class="action-btn action-btn-cancel" onclick="cancelBooking('${booking.id}')" ${isCancelled ? 'disabled aria-disabled="true"' : ''}>
                    ${isCancelled ? 'Cancelled' : 'Cancel Booking'}
                </button>
            </div>
        `;
    }
    
    if (isAdmin) {
        html += `
            <div class="booking-actions">
                <button class="action-btn action-btn-confirm" onclick="updateBookingStatus('${booking.id}', 'Confirmed')">✓ Confirm</button>
                <button class="action-btn action-btn-complete" onclick="updateBookingStatus('${booking.id}', 'Completed')">✓ Complete</button>
                <button class="action-btn action-btn-cancel" onclick="updateBookingStatus('${booking.id}', 'Cancelled')" ${isCancelled ? 'disabled aria-disabled="true"' : ''}>✕ Cancel</button>
            </div>
        `;
    }
    
    html += `</div>`;
    return html;
}

// Render booking history
function renderBookingHistory() {
    const bookingsList = document.getElementById('bookings-list');
    if (!bookingsList) return;
    
    const bookings = getAllBookings();
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    let filtered = bookings;
    if (activeFilter !== 'all') {
        filtered = bookings.filter(b => (b.status || 'Pending') === activeFilter);
    }
    
    if (filtered.length === 0) {
        bookingsList.innerHTML = `
            <div class="empty-state">
                <p>📅 No bookings found</p>
                <small>Your bookings will appear here</small>
            </div>
        `;
        return;
    }
    
    bookingsList.innerHTML = filtered
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(booking => createBookingCard(booking, false))
        .join('');
}

// Render admin dashboard
function updateAdminDashboard() {
    const bookings = getAllBookings();
    
    const total = bookings.length;
    const pending = bookings.filter(b => (b.status || 'Pending') === 'Pending').length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
    const completed = bookings.filter(b => b.status === 'Completed').length;
    
    // Update stats
    const statTotal = document.getElementById('stat-total');
    const statPending = document.getElementById('stat-pending');
    const statConfirmed = document.getElementById('stat-confirmed');
    const statCompleted = document.getElementById('stat-completed');
    
    if (statTotal) statTotal.textContent = total;
    if (statPending) statPending.textContent = pending;
    if (statConfirmed) statConfirmed.textContent = confirmed;
    if (statCompleted) statCompleted.textContent = completed;
    
    // Render bookings list
    const adminList = document.getElementById('admin-bookings-list');
    if (!adminList) return;
    
    if (bookings.length === 0) {
        adminList.innerHTML = `
            <div class="empty-state">
                <p>📊 No bookings to manage</p>
            </div>
        `;
        return;
    }
    
    adminList.innerHTML = bookings
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(booking => `
            <div class="admin-booking-card">
                ${createBookingCard(booking, true).replace('<div class="booking-card"', '<div class="booking-card" style="border:none;padding:0;background:transparent"')}
            </div>
        `)
        .join('');
}

// Initialize booking features
document.addEventListener('DOMContentLoaded', () => {
    // Setup filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderBookingHistory();
        });
    });
    
    // Setup package selection
    document.querySelectorAll('.select-package').forEach(btn => {
        btn.addEventListener('click', () => {
            const packageName = btn.dataset.package;
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                serviceSelect.value = packageName;
                // Scroll to booking form
                const form = document.getElementById('contact-form');
                if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Setup payment options
    const advancePayment = document.getElementById('advance-payment');
    const afterConfirmation = document.getElementById('after-confirmation');
    const paymentDetails = document.getElementById('payment-details');
    
    if (advancePayment && paymentDetails) {
        advancePayment.addEventListener('change', () => {
            paymentDetails.style.display = paymentDetails.style.display === 'none' ? 'block' : 'none';
        });
    }
    if (afterConfirmation && paymentDetails) {
        afterConfirmation.addEventListener('change', () => {
            paymentDetails.style.display = 'none';
        });
    }
    
    // Setup admin dashboard toggle
    const adminDashboardBtn = document.getElementById('admin-dashboard-btn');
    const adminDashboard = document.getElementById('admin-dashboard');
    const closeBtn = document.getElementById('close-dashboard');
    
    if (adminDashboardBtn) {
        adminDashboardBtn.addEventListener('click', () => {
            if (adminDashboard) {
                adminDashboard.style.display = 'block';
                updateAdminDashboard();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (adminDashboard) {
                adminDashboard.style.display = 'none';
            }
        });
    }
    
    // Initial renders
    renderBookingHistory();
    updateAdminDashboard();
});
