# Fix Template ID Error

## Problem: "The template ID not found"

This error means EmailJS cannot find the template with ID `template_dele6f`.

## Solution: Verify and Update Template ID

### Step 1: Check Your Template ID

1. Go to EmailJS dashboard: https://dashboard.emailjs.com/admin/templates
2. Find your "Contact Us" template
3. **Check the Template ID** - it should look like: `template_xxxxx`
4. **Copy the exact Template ID**

### Step 2: Update script.js

1. Open `script.js` file
2. Find this line (around line 44):
   ```javascript
   TEMPLATE_ID: 'template_dele6f'
   ```
3. Replace `template_dele6f` with your **actual Template ID** from Step 1
4. Save the file

### Step 3: Verify Template Exists

Make sure:
- ✅ The template exists in your EmailJS account
- ✅ The template is not deleted
- ✅ You're using the correct Template ID (case-sensitive)

### Step 4: Check Template Variables

Your template should use these variables:
- `{{from_name}}` - Customer name
- `{{from_email}}` - Customer email
- `{{message}}` - Booking details and message

### Step 5: Test Again

1. Refresh your website (Ctrl+F5 to clear cache)
2. Fill out the booking form
3. Submit it
4. Check for errors in browser console (F12)

---

## Alternative: Create New Template

If the template doesn't exist, create a new one:

1. Go to EmailJS → Email Templates
2. Click "Create New Template"
3. Name it: "Photoshoot Booking"
4. Use this template:

**Subject:**
```
New Photoshoot Booking - {{from_name}}
```

**Content:**
```
Hello SRICHAITHANYA DIGITALS,

{{message}}

---
From: {{from_name}}
Email: {{from_email}}
```

5. Save and copy the new Template ID
6. Update `script.js` with the new Template ID

---

## Quick Fix Checklist

- [ ] Verify Template ID in EmailJS dashboard
- [ ] Update `script.js` with correct Template ID
- [ ] Check template uses `{{from_name}}`, `{{from_email}}`, `{{message}}`
- [ ] Refresh website (Ctrl+F5)
- [ ] Test form submission
- [ ] Check browser console (F12) for errors

---

## Still Not Working?

1. **Open browser console** (Press F12)
2. **Click "Console" tab**
3. **Submit the form**
4. **Copy the error message** and share it

The error message will tell us exactly what's wrong!


