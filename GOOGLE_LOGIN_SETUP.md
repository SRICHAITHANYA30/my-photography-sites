# Google Sign-In Setup Guide

This guide will help you set up Google Sign-In for your photography website so customers can log in with their Gmail accounts.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "SRICHAITHANYA DIGITALS Website")
5. Click "Create"

## Step 2: Enable Google Identity Services API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Identity Services API"
3. Click on it and click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" (unless you have a Google Workspace account)
3. Click "Create"
4. Fill in the required information:
   - **App name**: SRICHAITHANYA DIGITALS
   - **User support email**: Your email (srichaithanyacseaiml@gmail.com)
   - **Developer contact information**: Your email
5. Click "Save and Continue"
6. On "Scopes" page, click "Save and Continue" (no need to add scopes)
7. On "Test users" page, you can add test users or skip for now
8. Click "Save and Continue"
9. Review and go back to dashboard

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Give it a name (e.g., "Website Client")
5. Under "Authorized JavaScript origins", add:
   - `http://localhost` (for local testing)
   - `http://localhost:8000` (if using a local server)
   - Your actual website URL (e.g., `https://yourdomain.com`)
6. Under "Authorized redirect URIs", add:
   - `http://localhost` (for local testing)
   - Your actual website URL
7. Click "Create"
8. **IMPORTANT**: Copy the "Client ID" (it looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)

## Step 5: Add Client ID to Your Website

1. Open `script.js` in your project
2. Find the Google config section near the top:
   ```javascript
   const GOOGLE_CONFIG = {
       CLIENT_ID: (typeof window !== 'undefined' && window.GOOGLE_CLIENT_ID) ? window.GOOGLE_CLIENT_ID : 'YOUR_GOOGLE_CLIENT_ID',
       OWNER_EMAILS: (typeof window !== 'undefined' && window.OWNER_EMAILS) ? window.OWNER_EMAILS : ['srichaithanyacseaiml@gmail.com']
   };
   ```
3. Replace `'YOUR_GOOGLE_CLIENT_ID'` with your actual Client ID from Step 4.
   Example:
   ```javascript
   CLIENT_ID: '123456789-abcdefghijklmnop.apps.googleusercontent.com'
   ```
4. Optionally set approved owner emails:
   - Edit `OWNER_EMAILS` array in `script.js`, or
   - Define `window.OWNER_EMAILS = ['owner1@gmail.com', 'owner2@gmail.com']` in a small inline script before `script.js` on `owner-login.html`.
5. Save the file(s).

## Step 6: Test the Login

1. Open your website in a browser
2. Click "Customer Login" or "Owner Login" in the top right
3. You should see a Google Sign-In button
4. Click it and sign in with a Google account
5. After successful login, you will be redirected to the home page
6. Your account details (name/email/avatar) will appear in the top corner

## Important Notes

- **For Production**: Make sure to add your actual website domain to "Authorized JavaScript origins" in Google Cloud Console
- **Security**: The Client ID is safe to expose in frontend code, but never share your Client Secret
- **Testing**: You can test with your own Google account first
- **Publishing**: If you want to make the app available to all users, you'll need to submit it for verification in the OAuth consent screen (this is required for apps with more than 100 users)

## Troubleshooting

**Problem**: "Error 400: redirect_uri_mismatch"
- **Solution**: Make sure your website URL is added to "Authorized JavaScript origins" in Google Cloud Console

**Problem**: "This app isn't verified"
- **Solution**: This is normal for testing. Click "Advanced" > "Go to [Your App] (unsafe)" to proceed. For production, you'll need to verify your app.

**Problem**: Google Sign-In button doesn't appear
- **Solution**: 
  1. Check browser console for errors
  2. Verify the Google Identity Services script is loaded
   3. Make sure your Client ID is correctly set in `script.js`
   4. Ensure you are serving the site from `http://localhost` or an HTTPS domain (GIS requires a valid origin)

## Need Help?

If you encounter any issues, check:
- Browser console for error messages
- Google Cloud Console for API status
- Make sure all URLs match exactly (including http vs https)

