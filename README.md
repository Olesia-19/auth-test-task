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
1. Install deps:
   ```bash
   npm install
   npm run dev
   
   ```

## Approach 
- Firebase client SDK for authentication
- Global AuthProvider using onAuthStateChanged
- Redirects on auth state changes using Next.js useRouter
