# 📧 Email Notification Troubleshooting Guide

If you're not receiving Gmail notifications after customers book, follow these steps:

## Quick Checklist

- [ ] EmailJS account is created and verified
- [ ] Gmail service is connected in EmailJS
- [ ] Email template is created and published
- [ ] Public Key, Service ID, and Template ID are correct in script.js
- [ ] Browser console shows no errors

---

## Step 1: Check Browser Console

1. Open your website in a browser
2. Press `F12` (or right-click → Inspect)
3. Click the "Console" tab
4. Try submitting a test booking
5. Look for messages:
   - ✅ `EmailJS initialized successfully` = Good!
   - ❌ Any red error messages = Problem found

**Common Console Errors:**
- `EmailJS library not loaded` → Check if script is in HTML
- `EmailJS init failed` → Public Key is wrong
- `400 Bad Request` → Template variables don't match
- `401 Unauthorized` → Public Key is invalid
- `404 Not Found` → Service ID or Template ID is wrong

---

## Step 2: Verify EmailJS Configuration

### Check Your EmailJS Dashboard

1. Go to https://www.emailjs.com/
2. Log in to your account
3. Check these sections:

#### A. Email Services
- Go to **Email Services**
- You should see your Gmail service listed
- **Copy the Service ID** (looks like: `service_xxxxx`)
- Make sure it matches `SERVICE_ID` in `script.js`

#### B. Email Templates
- Go to **Email Templates**
- You should see your template
- **Copy the Template ID** (looks like: `template_xxxxx`)
- Make sure it matches `TEMPLATE_ID` in `script.js`
- **IMPORTANT**: Template must be **Published** (not Draft)

#### C. Account Settings
- Go to **Account** → **General**
- **Copy your Public Key** (looks like: `-xxxxxxxxxxxxx`)
- Make sure it matches `PUBLIC_KEY` in `script.js`

---

## Step 3: Verify Template Variables

Your EmailJS template must use these variable names:

**Required Variables:**
- `{{from_name}}` or `{{customer_name}}` - Customer's name
- `{{from_email}}` or `{{customer_email}}` - Customer's email
- `{{message}}` - Customer's message

**Optional Variables (for booking details):**
- `{{customer_phone}}` - Phone number
- `{{service_type}}` - Service type
- `{{booking_date}}` - Preferred date
- `{{arrival_time}}` - Arrival time
- `{{location}}` - Location/address
- `{{booking_time}}` - When booking was submitted

**Template Example:**
```
Subject: New Booking - {{from_name}}

Hello,

You have a new booking request:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{customer_phone}}

Service: {{service_type}}
Date: {{booking_date}}
Time: {{arrival_time}}
Location: {{location}}

Message:
{{message}}
```

---

## Step 4: Test EmailJS Connection

### Test 1: Check if EmailJS is Loaded
1. Open browser console (F12)
2. Type: `typeof emailjs`
3. Should show: `"object"` (not `"undefined"`)

### Test 2: Check if EmailJS is Initialized
1. In console, type: `emailjs`
2. Should show EmailJS object with methods
3. If error, Public Key is wrong

### Test 3: Send Test Email
1. Fill out the booking form
2. Submit it
3. Check console for:
   - `📧 Attempting to send email...`
   - `✅ Email sent successfully!` OR
   - `❌ EmailJS send error:`

---

## Step 5: Common Issues & Solutions

### Issue 1: "EmailJS not initialized"
**Solution:**
- Check if Public Key is correct in `script.js`
- Make sure Public Key starts with `-` (e.g., `-FPLxoEKAgrftVYRJ`)
- Make sure there are no extra spaces

### Issue 2: "400 Bad Request"
**Solution:**
- Template variables don't match
- Check your EmailJS template uses the correct variable names
- Make sure template is **Published** (not Draft)

### Issue 3: "401 Unauthorized"
**Solution:**
- Public Key is wrong or expired
- Get new Public Key from EmailJS dashboard
- Update `PUBLIC_KEY` in `script.js`

### Issue 4: "404 Not Found"
**Solution:**
- Service ID or Template ID is wrong
- Check EmailJS dashboard for correct IDs
- Update `SERVICE_ID` and `TEMPLATE_ID` in `script.js`

### Issue 5: Email Sent but Not Received
**Solution:**
- Check spam/junk folder
- Check EmailJS dashboard → **Email Logs** to see if email was sent
- Verify Gmail service is connected correctly
- Check if you've exceeded free tier limit (200 emails/month)

---

## Step 6: Update Configuration in script.js

Open `script.js` and find this section (around line 297):

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '-FPLxoEKAgrftVYRJ',        // ← Replace with your Public Key
    SERVICE_ID: 'service_uovuw8h',          // ← Replace with your Service ID
    TEMPLATE_ID: 'template_dele6fz'          // ← Replace with your Template ID
};
```

**Replace the values with your actual EmailJS credentials.**

---

## Step 7: Check EmailJS Email Logs

1. Go to EmailJS dashboard
2. Click **Email Logs** (left menu)
3. You should see all email attempts
4. Check if emails show as "Sent" or "Failed"
5. If "Failed", click to see error details

---

## Step 8: Verify Gmail Service

1. In EmailJS dashboard → **Email Services**
2. Click on your Gmail service
3. Make sure it shows "Connected" status
4. If disconnected, click "Reconnect Account"
5. Sign in with: **srichaithanyacseaiml@gmail.com**

---

## Still Not Working?

1. **Check EmailJS Dashboard → Email Logs**
   - This shows if emails are being sent
   - If no logs appear, form submission isn't reaching EmailJS

2. **Check Browser Console**
   - Look for any JavaScript errors
   - Share error messages for help

3. **Test with Simple Template**
   - Create a new simple template with just `{{message}}`
   - Test if that works
   - If yes, your template variables are the issue

4. **Contact Support**
   - EmailJS support: support@emailjs.com
   - Or check EmailJS documentation

---

## Quick Fix Checklist

Run through this checklist:

- [ ] EmailJS account created and verified
- [ ] Gmail service connected in EmailJS
- [ ] Email template created and **PUBLISHED**
- [ ] Template uses correct variable names
- [ ] Public Key copied from EmailJS dashboard
- [ ] Service ID copied from EmailJS dashboard
- [ ] Template ID copied from EmailJS dashboard
- [ ] All three IDs updated in `script.js`
- [ ] No extra spaces in IDs
- [ ] Browser console shows "EmailJS initialized successfully"
- [ ] Test booking shows "Email sent successfully" in console
- [ ] Checked spam folder
- [ ] Checked EmailJS Email Logs

---

## Need More Help?

If you've tried everything and still not receiving emails:

1. Check EmailJS dashboard → Email Logs (most important!)
2. Share the console error messages
3. Verify all three IDs are correct
4. Make sure template is Published (not Draft)

Good luck! 🍀

