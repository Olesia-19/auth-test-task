# Babylon Auth Task (Next.js + Firebase Auth)

## Features
- Email/password sign up + login (Firebase Authentication)
- Stores and displays user's full name via `displayName`
- Protected route: `/home`
- Logout + redirect
- Basic error handling

## Tech
- Next.js (App Router) + TypeScript
- Firebase Auth

## Getting started
### 1. Install dependencies:
   ```bash
   npm install
   
   ```

### 2. Environment variables
Create a .env.local file based on .env.example and add your Firebase config:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

```

### 3. Run locally
 ```bash
   npm run dev

```
Open http://localhost:3000 in your browser.

## Approach 
- Firebase client SDK for authentication (email/password).
- Implemented a global AuthProvider using onAuthStateChanged to track user session.
- Redirects on auth state changes using Next.js useRouter.
- Stored user's full name using Firebase displayName and displayed it after login.
- Used CSS Modules for simple, scoped styling.


## Challenges
- Ensuring the authenticated user state is correctly shared across routes in Next.js App Router.
- Making sure displayName is available after registration and reflected in the UI.

## Improvements (With More Time)
- Add form validation using a library like Formik and Yup.
- Improve accessibility and UX feedback (success messages).
- Add route protection using middleware and session cookies for stronger security.
