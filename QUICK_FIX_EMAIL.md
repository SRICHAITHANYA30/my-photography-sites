# ⚡ QUICK FIX: Emails Not Received

## 🎯 The Problem
Emails are sent (EmailJS shows "OK") but not reaching your inbox.

## ✅ THE FIX (2 Minutes)

### Step 1: Open EmailJS Template
1. Go to: https://dashboard.emailjs.com/admin/templates
2. Click on **"Contact Us"** template
3. Click **Edit** (pencil icon)

### Step 2: Set "To Email" Field
1. Find **"To Email"** field
2. Type: `srichaithanyacseaiml@gmail.com`
3. Click **Save**
4. Make sure it's **Published** (not Draft)

### Step 3: Test
1. Submit a booking from your website
2. Check Gmail inbox
3. Check spam folder

**That's it!** This should fix it. 🎉

---

## 📧 If Still Not Working

### Check These:
1. **Spam Folder** - Check Gmail spam
2. **EmailJS Email History** - Click on "OK" entry, check "To" field
3. **Gmail Service** - Make sure it's "Connected" in EmailJS

---

## 🔍 Verify Template Settings

**Required Settings:**
- **To Email:** `srichaithanyacseaiml@gmail.com` ✅
- **Status:** Published ✅
- **Subject:** `New Photoshoot Booking - {{from_name}}`
- **Content:** Uses `{{from_name}}`, `{{from_email}}`, `{{message}}`

---

**The "To Email" field is almost certainly empty or wrong. Fix that first!**

