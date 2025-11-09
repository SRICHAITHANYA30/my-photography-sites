# Setup Instructions for SRICHAITHANYA DIGITALS Website

## 📧 Setting Up Email Notifications (EmailJS)

To receive booking emails when someone submits the contact form, follow these steps:

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (free tier allows 200 emails/month)
3. Verify your email address

### Step 2: Create an Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account (srichaithanyacseaiml@gmail.com)
5. Note down your **Service ID** (e.g., `service_xxxxx`)

### Step 3: Create an Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Subject:** New Photoshoot Booking - {{customer_name}}

**Content:**
```
Hello SRICHAITHANYA DIGITALS,

You have received a new photoshoot booking request from your website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOKING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service Type: {{service_type}}
Preferred Date: {{booking_date}}
Booking Received: {{booking_time}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE FROM CUSTOMER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This booking was submitted through your website contact form.
Please contact the customer to confirm the booking.

---
SRICHAITHANYA DIGITALS Website
```

**Important:** Make sure to use these exact variable names:
- `{{customer_name}}`
- `{{customer_email}}`
- `{{customer_phone}}`
- `{{service_type}}`
- `{{booking_date}}`
- `{{booking_time}}`
- `{{message}}`

4. Click **Save** and note down your **Template ID** (e.g., `template_xxxxx`)

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

### Step 5: Update script.js
1. Open `script.js`
2. Find the `EMAILJS_CONFIG` section (around line 41)
3. Replace these three values with your actual credentials:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_ACTUAL_PUBLIC_KEY',      // From Step 4
    SERVICE_ID: 'YOUR_ACTUAL_SERVICE_ID',      // From Step 2
    TEMPLATE_ID: 'YOUR_ACTUAL_TEMPLATE_ID'     // From Step 3
};
```

4. **That's it!** EmailJS will automatically initialize once you've added your Public Key.

### Step 6: Test
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email (srichaithanyacseaiml@gmail.com) - you should receive the booking request!

---

## 📸 Adding Photos to Gallery

### Method 1: Using the galleryImages Array (Recommended)

1. Create an `images` folder in your project directory (if it doesn't exist)
2. Add your photos to the `images` folder
3. Open `script.js`
4. Find the `galleryImages` array (around line 167)
5. Add your photo paths like this:

```javascript
const galleryImages = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg',
    // Add as many as you want!
];
```

6. Save the file and refresh your website
7. Your photos will automatically appear in the gallery!

### Method 2: Using the addGalleryImage Function

You can also add photos programmatically:

```javascript
addGalleryImage('images/photo1.jpg', 'Description of photo');
addGalleryImage('images/photo2.jpg', 'Another description');
```

### Tips:
- Use JPG or PNG format for best compatibility
- Optimize your images before uploading (keep file sizes reasonable)
- Recommended image size: 1200x800px or similar aspect ratio
- Name your files clearly (e.g., `wedding-1.jpg`, `portrait-2.jpg`)

---

## 📱 Mobile & Desktop Optimization

The website is already optimized for both mobile and desktop devices. The responsive design includes:

- ✅ Mobile-friendly navigation menu
- ✅ Responsive gallery grid
- ✅ Touch-friendly buttons and forms
- ✅ Optimized font sizes for all screen sizes
- ✅ Proper spacing and padding for mobile devices

**No additional setup needed!** The website will automatically adapt to any screen size.

---

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css` (around line 7):
```css
:root {
    --primary-color: #000000;  /* Black */
    --accent-color: #D4AF37;    /* Gold */
    /* Change these to your preferred colors */
}
```

### Changing Fonts
The website uses Poppins and Roboto fonts. To change:
1. Update the Google Fonts link in `index.html`
2. Update font-family in `styles.css`

---

## 🚀 Deployment

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload your files
3. Go to Settings → Pages
4. Select your branch and save
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)
1. Go to https://www.netlify.com/
2. Drag and drop your project folder
3. Your site will be live instantly!

### Option 3: Traditional Web Hosting
1. Upload all files to your web hosting via FTP
2. Make sure `index.html` is in the root directory
3. Your site will be live!

---

## ❓ Troubleshooting

### Email not sending?
- Check that you've uncommented the EmailJS code
- Verify your Service ID, Template ID, and Public Key are correct
- Check EmailJS dashboard for any errors
- Make sure your email service is connected properly

### Photos not showing?
- Check that the image paths are correct
- Make sure images are in the `images` folder
- Check browser console for any errors (F12)
- Verify image file names match exactly (case-sensitive)

### Mobile menu not working?
- Clear browser cache
- Check that `script.js` is loaded properly
- Verify JavaScript is enabled in browser

---

## 📞 Support

If you need help, check:
- EmailJS Documentation: https://www.emailjs.com/docs/
- Browser Console (F12) for error messages
- Make sure all files are in the correct locations

---

**Good luck with your photography business! 📸**

