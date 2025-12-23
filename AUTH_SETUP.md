# Authentication Setup Guide

To enable login functionality, you need to provide credentials for Google OAuth and an Email SMTP server. Follow these steps:

## 1. Google Login (OAuth 2.0)

You need a Google Cloud Project to get the Client ID and Secret.

1.  **Go to Google Cloud Console**: [console.cloud.google.com](https://console.cloud.google.com/)
2.  **Create a New Project**:
    *   Click the project dropdown (top left) > **New Project**.
    *   Name it "Global Finance" and click **Create**.
3.  **Configure Consent Screen**:
    *   Go to **APIs & Services** > **OAuth consent screen**.
    *   Select **External** (for testing) and click **Create**.
    *   Fill in the required fields (App Name, Support Email, Developer Email).
    *   Click **Save and Continue** (you can skip Scopes and Test Users for now).
4.  **Get Credentials**:
    *   Go to **APIs & Services** > **Credentials**.
    *   Click **+ CREATE CREDENTIALS** > **OAuth client ID**.
    *   **Application type**: Select **Web application**.
    *   **Name**: "NextAuth Client".
    *   **Authorized JavaScript origins**: `http://localhost:3000`
    *   **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
    *   Click **Create**.
5.  **Copy Keys**:
    *   Copy the **Client ID** and **Client Secret**.
    *   Paste them into your `.env` file:
        ```env
        GOOGLE_CLIENT_ID=your_client_id_here
        GOOGLE_CLIENT_SECRET=your_client_secret_here
        ```

---

## 2. Magic Link (Email Login)

You need an SMTP server to send the "Magic Link" emails. The easiest way for development is using a **Gmail App Password**.

### Option A: Gmail (Free, Easiest for Dev)
1.  **Go to Google Account Security**: [myaccount.google.com/security](https://myaccount.google.com/security)
2.  **Enable 2-Step Verification** (if not already enabled).
3.  **Create App Password**:
    *   Search for **"App passwords"** in the search bar.
    *   Create a new app password named "Global Finance".
    *   Copy the 16-character password generated (spaces don't matter).
4.  **Update `.env`**:
    ```env
    EMAIL_SERVER_HOST=smtp.gmail.com
    EMAIL_SERVER_PORT=587
    EMAIL_SERVER_USER=your_gmail_address@gmail.com
    EMAIL_SERVER_PASSWORD=heyzzqusewvjxzpa
    EMAIL_FROM=your_gmail_address@gmail.com
    ```

### Option B: Resend (Recommended for Production)
1.  Sign up at [resend.com](https://resend.com).
2.  Get your API Key.
3.  Use their SMTP settings provided in the dashboard.

---

## 3. Apply Changes
After updating your `.env` file, **restart your development server**:
1.  Press `Ctrl + C` in your terminal to stop the server.
2.  Run `npm run dev` again.
