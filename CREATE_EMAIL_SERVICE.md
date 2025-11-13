# How to Create Email Service in EmailJS

## Problem: Service ID Not Available

You don't have a Service ID because you haven't created an **Email Service** yet in EmailJS.

## Solution: Create Email Service (2 minutes)

### Step 1: Go to Email Services

1. In your EmailJS dashboard
2. Look at the **left sidebar**
3. Click on **"Email Services"** (it's in the list)

### Step 2: Add New Service

1. You'll see a page with **"Email Services"** heading
2. Look for a button that says:
   - **"Add New Service"** OR
   - **"+ Add Service"** OR
   - **"Create Service"** OR
   - A **blue button** with a **"+"** icon

3. **Click that button**

### Step 3: Choose Gmail

1. You'll see a list of email providers:
   - Gmail
   - Outlook
   - Yahoo
   - etc.

2. **Click on "Gmail"** (or choose your email provider)

### Step 4: Connect Your Gmail Account

1. Click **"Connect Account"** or **"Add Account"**
2. Sign in with: **srichaithanyacseaiml@gmail.com**
3. Allow EmailJS to access your Gmail
4. Click **"Allow"** or **"Authorize"**

### Step 5: Get Your Service ID

1. After connecting, you'll see your service listed
2. You'll see something like:
   - **Service ID:** `service_abc123xyz`
   - Or just: `service_xxxxx`

3. **📝 COPY THIS SERVICE ID!**
   - It looks like: `service_abc123` or `service_xyz789`
   - This is what you need!

### Step 6: Update script.js

Once you have the Service ID, update `script.js`:

```javascript
SERVICE_ID: 'service_abc123xyz',  // Your actual Service ID
```

---

## Visual Guide

**What you should see:**

1. **Email Services page** → Click "Add New Service"
2. **Choose Gmail** → Click "Gmail"
3. **Connect Account** → Sign in with srichaithanyacseaiml@gmail.com
4. **Service Created** → Copy the Service ID

---

## Troubleshooting

### ❌ Can't find "Add New Service" button?

- Look for a **"+"** icon or **"Create"** button
- Check if you're on the right page (Email Services)
- Try refreshing the page

### ❌ Gmail connection fails?

- Make sure you're signing in with: **srichaithanyacseaiml@gmail.com**
- Check your internet connection
- Try again after a few seconds

### ❌ Don't see Service ID?

- After connecting, the Service ID should appear
- It's usually shown as: `service_xxxxx`
- If not visible, click on the service name to see details

---

## Quick Checklist

- [ ] Go to "Email Services" in EmailJS
- [ ] Click "Add New Service"
- [ ] Choose "Gmail"
- [ ] Connect your Gmail account (srichaithanyacseaiml@gmail.com)
- [ ] Copy the Service ID (looks like `service_xxxxx`)
- [ ] Update script.js with the Service ID

---

## After You Get Service ID

Once you have the Service ID, you can:
1. Share it with me and I'll update the code, OR
2. Update `script.js` yourself by replacing `YOUR_SERVICE_ID` with your actual Service ID

---

**Need help?** Take a screenshot of what you see and I can guide you further!





