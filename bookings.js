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

// Update booking status
function updateBookingStatus(bookingId, newStatus) {
    const bookings = getAllBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        booking.status = newStatus;
        saveAllBookings(bookings);
        renderBookingHistory();
        updateAdminDashboard();
        return true;
    }
    return false;
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
            <div class="booking-detail"><strong>💬 Message:</strong> ${booking.message.substring(0, 100)}...</div>
    `;
    
    if (isAdmin) {
        html += `
            <div class="booking-actions">
                <button class="action-btn action-btn-confirm" onclick="updateBookingStatus('${booking.id}', 'Confirmed')">✓ Confirm</button>
                <button class="action-btn action-btn-complete" onclick="updateBookingStatus('${booking.id}', 'Completed')">✓ Complete</button>
                <button class="action-btn action-btn-cancel" onclick="updateBookingStatus('${booking.id}', 'Cancelled')">✕ Cancel</button>
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
