# 📧 Simple Email Setup Guide

## What is EmailJS?

**EmailJS** is a free service that sends emails from your website **without needing a server**.

Think of it like this:
- Your website form → EmailJS → Your email inbox
- It's like a mailman that takes messages from your website and delivers them to your email

**It's FREE** (200 emails per month) and **EASY** to set up!

---

## Why You're Not Receiving Emails

You're not receiving emails because **EmailJS is not set up yet**. 

Right now, your website form is trying to send emails, but it doesn't know WHERE to send them or HOW to send them. EmailJS is the "mailman" that needs to be configured.

---

## What You Need to Do (5 Simple Steps)

You need to provide **3 pieces of information** to your website:

1. **Public Key** - Like your house address
2. **Service ID** - Like your mailbox number  
3. **Template ID** - Like the mail format

**Don't worry!** I'll guide you step by step. It takes about 5 minutes.

---

## Step-by-Step Setup

### Step 1: Create EmailJS Account (2 minutes)

1. Open your web browser
2. Go to: **https://www.emailjs.com/**
3. Click **"Sign Up"** (top right corner)
4. Sign up with your email: **srichaithanyacseaiml@gmail.com**
5. Verify your email (check your inbox)
6. You're now logged in!

**✅ Done!** You now have an EmailJS account.

---

### Step 2: Connect Your Gmail (1 minute)

1. In EmailJS dashboard, click **"Email Services"** (left menu)
2. Click **"Add New Service"** button
3. Choose **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with: **srichaithanyacseaiml@gmail.com**
6. Allow EmailJS to access your Gmail
7. You'll see a **Service ID** (looks like: `service_abc123`)
   - **📝 COPY THIS!** You'll need it later
   - Example: `service_abc123xyz`

**✅ Done!** Your Gmail is connected.

---

### Step 3: Create Email Template (2 minutes)

1. In EmailJS dashboard, click **"Email Templates"** (left menu)
2. Click **"Create New Template"** button
3. Fill in these details:

**Template Name:** `Photoshoot Booking`

**Subject Line:** 
```
New Photoshoot Booking - {{customer_name}}
```

**Content (copy and paste this exactly):**
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

4. Click **"Save"** button
5. You'll see a **Template ID** (looks like: `template_abc123`)
   - **📝 COPY THIS!** You'll need it later
   - Example: `template_xyz789`

**✅ Done!** Your email template is ready.

---

### Step 4: Get Your Public Key (30 seconds)

1. In EmailJS dashboard, click **"Account"** (top right)
2. Click **"General"** (left menu)
3. Find **"Public Key"**
   - **📝 COPY THIS!** You'll need it later
   - Example: `abc123xyz789`

**✅ Done!** You have all 3 pieces of information!

---

### Step 5: Update Your Website (1 minute)

Now you need to give these 3 pieces of information to your website:

1. Open the file: **`script.js`** (in your project folder)
2. Find this section (around line 41):

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',        // Get from EmailJS Account → General
    SERVICE_ID: 'YOUR_SERVICE_ID',         // Get from EmailJS Email Services
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID'        // Get from EmailJS Email Templates
};
```

3. Replace the values with YOUR actual values:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'abc123xyz789',              // Your Public Key from Step 4
    SERVICE_ID: 'service_abc123xyz',          // Your Service ID from Step 2
    TEMPLATE_ID: 'template_xyz789'           // Your Template ID from Step 3
};
```

**Important:** 
- Keep the quotes `' '` around each value
- Don't add any spaces
- Make sure the commas `,` are there

4. **Save** the file

**✅ Done!** Your website is now configured!

---

## Test It! 🎉

1. Open your website (`index.html` in a browser)
2. Fill out the booking form
3. Click **"Send Message"**
4. Check your email: **srichaithanyacseaiml@gmail.com**
5. You should receive an email with the booking details!

---

## Troubleshooting

### ❌ Still not receiving emails?

**Check these:**

1. **Did you save `script.js`?** - Make sure you saved the file after updating
2. **Are the values correct?** - Double-check you copied the IDs correctly
3. **Did you refresh the website?** - Close and reopen your website
4. **Check browser console:**
   - Press `F12` on your keyboard
   - Click "Console" tab
   - Look for any red error messages
   - Take a screenshot and check what it says

5. **Check EmailJS dashboard:**
   - Go to EmailJS dashboard
   - Click "Logs" (left menu)
   - See if there are any errors

### Common Mistakes:

- ❌ Forgot the quotes `' '` around the values
- ❌ Added extra spaces
- ❌ Copied the wrong ID
- ❌ Didn't save the file
- ❌ Using old cached version of website (clear browser cache)

---

## What Information Do You Need to Give Me?

**You don't need to give me anything!** 

You need to:
1. Set up EmailJS yourself (follow steps above)
2. Get your 3 IDs (Public Key, Service ID, Template ID)
3. Update `script.js` with those 3 IDs

**I can't do this for you** because:
- I can't access your email account
- I can't create EmailJS accounts
- You need to connect your own Gmail account

But don't worry! The steps above are very simple. Just follow them one by one.

---

## Need Help?

If you get stuck:
1. Take a screenshot of where you're stuck
2. Check the browser console (F12) for errors
3. Make sure you followed all 5 steps
4. Double-check that you saved `script.js` after updating

---

## Summary

**EmailJS** = Free email service that sends emails from your website

**What you need to do:**
1. ✅ Create EmailJS account
2. ✅ Connect your Gmail
3. ✅ Create email template
4. ✅ Get your 3 IDs
5. ✅ Update `script.js` with your 3 IDs

**That's it!** After this, you'll receive emails for every booking! 📧✨




