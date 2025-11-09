# EmailJS Template Setup Guide

## Your Current Configuration

✅ **Public Key:** `AkADBIUF3aHanmrFx`  
✅ **Service ID:** `service_uovuw8h` (Gmail)  
✅ **Template ID:** `template_dele6fz` (Contact Us)

---

## Email Template Variables

Your website sends these variables to EmailJS. Make sure your template uses them:

### Required Variables (Standard Contact Us Template)
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email address
- `{{message}}` - Full booking details and message (formatted)

### Optional Variables (For Detailed Templates)
- `{{customer_name}}` - Customer's name (same as from_name)
- `{{customer_email}}` - Customer's email (same as from_email)
- `{{customer_phone}}` - Customer's phone number
- `{{service_type}}` - Type of photography service
- `{{booking_date}}` - Preferred date (formatted)
- `{{arrival_time}}` - Photographer arrival time
- `{{location}}` - Location/address for photoshoot
- `{{booking_time}}` - When booking was submitted
- `{{reply_to}}` - Customer's email (for reply)
- `{{to_email}}` - Your email (srichaithanyacseaiml@gmail.com)

---

## Recommended Email Template

### Option 1: Simple Template (Uses Standard Variables)

**Subject:**
```
New Photoshoot Booking - {{from_name}}
```

**Content:**
```
Hello SRICHAITHANYA DIGITALS,

{{message}}

---
Reply to: {{from_email}}
```

---

### Option 2: Detailed Template (Uses All Variables)

**Subject:**
```
New Photoshoot Booking - {{customer_name}}
```

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
Photographer Arrival Time: {{arrival_time}}
Location: {{location}}
Booking Received: {{booking_time}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE FROM CUSTOMER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please contact the customer to confirm the booking.

Reply to: {{reply_to}}

---
SRICHAITHANYA DIGITALS Website
```

---

## How to Update Your Template

1. Go to EmailJS Dashboard: https://dashboard.emailjs.com/admin/templates
2. Click on your "Contact Us" template (Template ID: `template_dele6fz`)
3. Click the edit icon (pencil)
4. Update the Subject and Content with one of the templates above
5. **IMPORTANT:** Make sure the template is **Published** (not Draft)
6. Click "Save"

---

## Testing

1. Fill out the booking form on your website
2. Submit it
3. Check your email: **srichaithanyacseaiml@gmail.com**
4. Check spam folder if not received
5. Check EmailJS dashboard → Email Logs to see if email was sent

---

## Troubleshooting

### If emails are not received:

1. **Check EmailJS Email Logs**
   - Go to EmailJS Dashboard → Email History
   - See if emails show as "Sent" or "Failed"
   - If "Failed", click to see error details

2. **Verify Template is Published**
   - Template must be Published (not Draft)
   - Draft templates won't send emails

3. **Check Template Variables**
   - Make sure variables match exactly (case-sensitive)
   - Use `{{variable_name}}` format (double curly braces)

4. **Check Browser Console**
   - Press F12 → Console tab
   - Look for error messages
   - Should see: `✅ Email sent successfully!`

---

## Current Status

✅ Public Key: Updated  
✅ Service ID: Correct  
✅ Template ID: Correct  
✅ Code: Optimized and ready

Your EmailJS configuration is now perfect! 🎉

