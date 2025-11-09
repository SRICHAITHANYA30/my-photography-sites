# 🔐 Admin Access Instructions

## How to Access Photo Upload (Admin Only)

The photo upload feature is now **password-protected** and hidden from customers. Only you (the host) can access it.

### Method 1: Keyboard Shortcut (Easiest)
1. Make sure you're not typing in any input field
2. Press the **'A' key 3 times quickly** (within 2 seconds)
3. A password prompt will appear
4. Enter your admin password: `admin2024`
5. The upload section will appear

### Method 2: Double-Click Gallery Title
1. Go to the Gallery section
2. **Double-click** on the "Gallery" title
3. A password prompt will appear
4. Enter your admin password: `admin2024`
5. The upload section will appear

---

## 🔑 Changing Your Admin Password

To change the password, edit `script.js` and find this line:

```javascript
const ADMIN_PASSWORD = 'admin2024'; // Change this to your own secure password
```

Replace `'admin2024'` with your own secure password.

**Important:** Keep your password secret! Only you should know it.

---

## ⏰ Session Duration

- Admin mode stays active for **24 hours** after you enter the password
- After 24 hours, you'll need to enter the password again
- You can manually exit admin mode by clicking the "Exit Admin Mode" button

---

## 🛡️ Security Features

✅ Upload section is completely hidden from customers  
✅ Password protection required to access upload  
✅ Session timeout after 24 hours  
✅ No visible admin buttons for customers  
✅ Double verification before allowing uploads  

---

## 📝 Notes

- The upload section only appears after entering the correct password
- Customers cannot see or access the upload feature
- If you forget your password, you can change it in `script.js`

