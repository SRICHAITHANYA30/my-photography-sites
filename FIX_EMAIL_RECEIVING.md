# 📧 Fix: How to Receive Booking Emails

## ✅ What's Fixed
- ✅ Login requirement removed - anyone can book now
- ✅ Booking form is always visible
- ✅ EmailJS is configured with your credentials
- ✅ Form submission works

## ❌ Current Issue: Emails Not Received

Your EmailJS dashboard shows emails are being sent (Status: "• OK"), but you're not receiving them in Gmail.

---

## 🎯 THE FIX: Set "To Email" in EmailJS Template

This is **99% likely** the problem. Your EmailJS template needs the recipient email address.

### Step-by-Step Fix:

#### Step 1: Open EmailJS Template
1. Go to: https://dashboard.emailjs.com/admin/templates
2. Click on **"Contact Us"** template (Template ID: `template_dele6fz`)
3. Click the **Edit** button (pencil icon ✏️)

#### Step 2: Set "To Email" Field
1. Look for **"To Email"** field (or "To" or "Recipient Email")
2. **Type:** `srichaithanyacseaiml@gmail.com`
3. **Click "Save"**
4. **IMPORTANT:** Make sure template is **Published** (not Draft)

#### Step 3: Verify Template Settings

**Subject:**
```
New Photoshoot Booking - {{from_name}}
```

**Content:** (Should include these variables)
```
Hello SRICHAITHANYA DIGITALS,

{{message}}

---
Reply to: {{from_email}}
```

**Required Fields:**
- **To Email:** `srichaithanyacseaiml@gmail.com` ✅
- **From Email:** Can leave default or set to your Gmail
- **Reply To:** `{{from_email}}` (customer's email)

#### Step 4: Test
1. Submit a test booking from your website
2. Check EmailJS → Email History
3. Should show "• OK" status
4. **Check your Gmail inbox** (and spam folder)

---

## 🔍 Verify EmailJS Email History

1. Go to EmailJS Dashboard → **Email History**
2. Click on one of the "• OK" entries
3. Check the email details:
   - **To:** Should show `srichaithanyacseaiml@gmail.com`
   - **From:** Should show your Gmail or EmailJS
   - **Subject:** Should show booking subject
   - **Status:** Should be "Sent" or "Delivered"

**If "To" field is empty or wrong:**
- This confirms the template "To Email" is not set
- Go back to Step 1 and fix it

---

## 📧 Check Gmail

### 1. Check Spam Folder
- Open Gmail
- Click **"Spam"** folder
- Search for: "SRICHAITHANYA" or "Photoshoot"
- If found, mark as "Not spam"

### 2. Check All Mail
- In Gmail, search for: `from:emailjs.com`
- Or search: "SRICHAITHANYA" or "Photoshoot"

### 3. Check Gmail Filters
- Gmail Settings → Filters and Blocked Addresses
- Make sure no filters are blocking emails

---

## ✅ Quick Checklist

- [ ] **Template "To Email" =** `srichaithanyacseaiml@gmail.com`
- [ ] **Template is Published** (not Draft)
- [ ] **Gmail service is Connected** in EmailJS
- [ ] **Test booking submitted** from website
- [ ] **EmailJS Email History** shows "• OK"
- [ ] **EmailJS Email History details** show correct "To" address
- [ ] **Checked Gmail inbox** (primary)
- [ ] **Checked Gmail spam folder**
- [ ] **Checked Gmail All Mail**

---

## 🚨 Most Important Step

**Go to EmailJS Template Editor and set "To Email" to:**
```
srichaithanyacseaiml@gmail.com
```

This will fix it immediately! 🎯

---

## Current EmailJS Configuration

✅ **Public Key:** `AkADBIUF3aHanmrFx`  
✅ **Service ID:** `service_uovuw8h`  
✅ **Template ID:** `template_dele6fz`  
❌ **Template "To Email":** Needs to be set!

Once you set the "To Email" field in your template, emails will start arriving! 📧

