# 📚 Code Reference & Quick Tips

## Quick Code Snippets

### 1. Change Admin Password
**File**: `script.js` (around line 80)

```javascript
// Current:
const ADMIN_PASS = 'admin123';

// Change to:
const ADMIN_PASS = 'your-secure-password-here';
```

### 2. Update Contact Information
**File**: `index.html` (search for phone number)

```html
<!-- Current -->
<p>9566381467</p>
<p>srichaithanyacseaiml@gmail.com</p>
<p>ERODE, Tamil Nadu</p>

<!-- Update to your details -->
```

### 3. Change WhatsApp Number
**File**: `index.html` (search for `wa.me`)

```html
<!-- Current -->
<a href="https://wa.me/919566381467?text=...

<!-- Change 919566381467 to your number with country code -->
<a href="https://wa.me/91YOUR_NUMBER?text=...
```

### 4. Update Package Prices
**File**: `index.html` (search for `.package-price`)

```html
<!-- Find package cards and update:-->
<p class="package-price">₹50,000</p>  <!-- Change this price -->
```

### 5. Add Real QR Code
**File**: `index.html` (search for `.qr-placeholder`)

```html
<!-- Current (placeholder):-->
<div class="qr-placeholder">
    <p>📱 Scan QR Code to Pay</p>
    <small>(QR Code Image Placeholder)</small>
</div>

<!-- Replace with: -->
<img src="path-to-your-qr-code.png" alt="UPI QR Code" style="max-width: 200px; margin: 12px auto;">
```

---

## How to Access Features Programmatically

### Get All Bookings
```javascript
const allBookings = getAllBookings();
console.log(allBookings);
// Returns array of booking objects
```

### Add a New Booking
```javascript
const newBooking = {
    id: 'b_' + Date.now(),
    createdAt: new Date().toLocaleString(),
    status: 'Pending',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    service: 'Wedding Photography',
    date: '2026-06-15',
    time: '09:00',
    location: 'Some venue',
    message: 'Custom message'
};

const bookings = getAllBookings();
bookings.push(newBooking);
saveAllBookings(bookings);
```

### Update Booking Status
```javascript
// Change any booking status
updateBookingStatus('b_1234567890', 'Confirmed');
// Status options: Pending, Confirmed, Completed, Cancelled
```

### Delete a Booking
```javascript
deleteBooking('b_1234567890'); // ID from booking
```

### Render Booking History
```javascript
// Refresh the booking history display
renderBookingHistory();
```

### Update Admin Dashboard
```javascript
// Refresh all statistics
updateAdminDashboard();
```

---

## Booking Object Structure

```javascript
{
    id: "b_1684856400000",                    // Unique ID
    createdAt: "5/23/2026, 3:00:00 PM",      // Creation date
    status: "Pending",                         // Pending|Confirmed|Completed|Cancelled
    name: "Priya Sharma",                      // Customer name
    email: "priya@email.com",                  // Customer email
    phone: "9876543210",                       // Customer phone
    service: "Wedding Photography",            // Package selected
    date: "June 15, 2026",                     // Booking date
    time: "09:00",                             // Booking time
    location: "Grand Hotel, New Delhi",        // Venue address
    message: "Full day wedding coverage..."    // Customer message
}
```

---

## CSS Classes Reference

### Buttons
- `.btn-primary` - Gold gradient button
- `.btn-secondary` - Transparent border button
- `.filter-btn` - Filter toggle buttons
- `.select-package` - Package selection buttons
- `.action-btn` - Admin action buttons
  - `.action-btn-confirm` - Green
  - `.action-btn-complete` - Blue
  - `.action-btn-cancel` - Red

### Status Badges
- `.booking-status.Pending` - Red
- `.booking-status.Confirmed` - Green
- `.booking-status.Completed` - Blue
- `.booking-status.Cancelled` - Gray

### Sections
- `.booking-card` - Booking display card
- `.package-card` - Package display card
- `.testimonial-card` - Review card
- `.stat-card` - Dashboard stat card

### Colors
- Gold: `#d4af37` (--accent)
- Light Gold: `#e8b923` (--accent-3)
- Dark: `#0f1419` (--bg-start)
- Card: `#1a1f28` (--card)
- Muted: `#9ca3af` (--muted)
- White: `#ffffff` (--text)

---

## localStorage Commands

### View All Data (Browser Console)
```javascript
// View bookings
JSON.parse(localStorage.getItem('bookings'))

// View admin mode
localStorage.getItem('galleryAdminMode')
```

### Clear All Bookings
```javascript
localStorage.removeItem('bookings');
location.reload(); // Refresh to see empty state
```

### Backup Bookings
```javascript
// Copy and save this:
JSON.stringify(getAllBookings())
```

### Restore Bookings
```javascript
// Paste your backup data:
localStorage.setItem('bookings', '[{"id":"b_123",...}]');
location.reload();
```

---

## Event Listeners & Handlers

### Form Submission
Handled in `script.js`:
```javascript
// Saves booking as "Pending"
// Sends email via EmailJS
// Displays success/error message
```

### Package Selection
Handled in `bookings.js`:
```javascript
// Listens for .select-package click
// Auto-fills service field
// Scrolls to booking form
```

### Status Update
Handled in `bookings.js`:
```javascript
// Updates booking status
// Refreshes both displays
// Updates dashboard stats
```

### Payment Option Toggle
Handled in `bookings.js`:
```javascript
// Shows/hides payment details
// Based on radio button selection
```

---

## Admin Mode Workflow

### Enable Admin Mode
1. Click lock icon (🔒) in Gallery
2. Enter password prompt
3. If correct:
   - Upload section appears
   - Dashboard button (📊) appears
   - Admin mode enabled

### Access Dashboard
1. Click dashboard button (📊)
2. View statistics:
   - Total bookings
   - Pending count
   - Confirmed count
   - Completed count
3. See all bookings with actions
4. Click action buttons to update status

### Disable Admin Mode
1. Click lock icon (🔒) again
2. Or click "Exit Admin Mode" button
3. Upload section hides
4. Dashboard button hides
5. Admin mode disabled

---

## Customization Examples

### Change Primary Color (Gold to Blue)
**File**: `styles.css` (top of file)

```css
:root{
  --accent: #3b82f6;        /* Blue instead of gold */
  --accent-2: #1e40af;      /* Darker blue */
  --accent-3: #60a5fa;      /* Lighter blue */
  /* Other vars... */
}
```

### Add New Package
**File**: `index.html` (find `#packages` section)

```html
<div class="package-card">
    <h3>New Service</h3>
    <p class="package-price">₹30,000</p>
    <p class="package-desc">Description here</p>
    <ul class="package-features">
        <li>✓ Feature 1</li>
        <li>✓ Feature 2</li>
    </ul>
    <button class="btn-primary select-package" data-package="New Service">Select Package</button>
</div>
```

### Add New Testimonial
**File**: `index.html` (find `#testimonials` section)

```html
<div class="testimonial-card">
    <div class="stars">★★★★★</div>
    <p class="review-text">"Great service and professional work!"</p>
    <p class="review-author">- Customer Name</p>
</div>
```

---

## Mobile-First Responsive Strategy

### Breakpoints Used
- **Mobile**: < 480px
- **Tablet**: 480px - 900px
- **Desktop**: > 900px

### Mobile Optimizations
- Single column layouts
- Larger touch targets (44px minimum)
- Simplified navigation (hamburger menu)
- Optimized font sizes
- Reduced spacing

### Media Queries
```css
/* Tablet optimization */
@media(max-width:900px) {
  /* Tablet styles */
}

/* Mobile optimization */
@media(max-width:480px) {
  /* Mobile styles */
}
```

---

## Console Debugging

### Check If Bookings Module Loaded
```javascript
// In browser console:
typeof getAllBookings // Should return "function"
typeof updateBookingStatus // Should return "function"
```

### Monitor Booking Creation
```javascript
// Add to script.js in form submission:
console.log('New booking:', newBooking);
console.log('All bookings:', getAllBookings());
```

### Check Admin Status
```javascript
console.log('Admin mode:', isAdminMode);
console.log('Admin password:', ADMIN_PASS); // Shows in console!
```

---

## Common Issues & Solutions

### Issue: Bookings not saving
**Solution**:
1. Check browser localStorage is enabled
2. Check browser console for errors
3. Clear cache and try again
4. Try different browser

### Issue: Admin Dashboard not showing
**Solution**:
1. Click correct lock icon in Gallery
2. Enter correct password
3. Check if dashboard button appears after login
4. Refresh page

### Issue: WhatsApp link not working
**Solution**:
1. Check phone number format
2. Ensure country code (91) is included
3. Test on device with WhatsApp installed
4. Try WhatsApp Web if app not available

### Issue: Package selection not working
**Solution**:
1. Check if select-package button clicked
2. Verify service field exists in form
3. Check browser console for errors
4. Refresh page

---

## Performance Tips

### Optimize Database Queries
- Use `filter()` for status queries
- Use `find()` for single booking
- Avoid `map()` if not needed

### Reduce Rerenders
- Only call `renderBookingHistory()` when needed
- Batch multiple updates
- Avoid excessive DOM manipulation

### Cache Bookings
```javascript
// Store reference to avoid repeated localStorage reads
const bookings = getAllBookings();
// Use bookings variable multiple times
```

---

## Resources

- **Documentation**: See FEATURES_SUMMARY.md
- **Quick Start**: See QUICK_START.md
- **Verification**: See VERIFICATION_REPORT.md
- **Contact**: srichaithanyacseaiml@gmail.com

---

**Last Updated**: May 23, 2026  
**Version**: 2.0 (8 Features)
