# Trendies - Referral System Feature

## Overview

This repository contains the implementation of the **Referral System** feature for the Trendies marketplace platform.

The referral system tracks user signups using a `?ref=ID` query parameter in the URL. When a new user registers via a referral link, the referrer’s ID is saved and associated with the new user, enabling tracking of referral activity and potential rewards in the future.

---

## Live Demo

Access the live deployment here:  
[https://trendies-referral-web.vercel.app](https://trendies-referral-web.vercel.app/)

Note: For the best experience when testing the referral flow, I recommend using an incognito/private browser window to avoid cookie/session conflicts during sign-up.

---

## 🔧 Tech Stack

### Frontend
- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)

### Backend
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

### Deployment
- [Vercel - Frontend] 
- [Render - Backend]
- [Database - Neon]

---

---

## Feature Details

### How It Works

1. **Referral Link**  
   Users can copy and share a unique referral link from there dashboard containing their user ID, e.g.:

   ```text
   https://trendiesmaroc.com/signup?code=1234

2. **Referral Tracking**  
  When a new visitor lands on the signup page with a ?code=ID query parameter, the referral ID is saved in a cookie
  
3. **User Signup**  
During signup, the backend reads the stored referral ID from the request and associates it with the new user record

4. **Referral Attribution**  
The referral ID is stored on the new user’s database record as referredBy, enabling tracking.


## 📁 Project Structure
```
trendies_features/
│-- apps/
│   │-- api/       # NestJS backend with Prisma 
│   │-- web/       # Next.js frontend with Tailwind & Redux
│-- packages/          
│   │-- db/       # Prisma Database cCpnfig
```



1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/trendies.git
   cd books-app
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```

3. **Set up the database:**
   ```sh
    Create a .env in apps/api with your PostgreSQL credentials:
    DATABASE_URL="postgresql://username:password@localhost:5432/trendies"
   
    Run migrations:
      cd apps/api
      npx prisma migrate dev --name init
   ```
   
4. **Seed some products (optional):**
   ```sh
    Add initial products directly in your DB or create a seeder.
   ```

5. **5. Run dev servers**
   ```sh
     In separate terminals:
   
     # API
        cd apps/api
        pnpm run dev
      
     # Frontend
        cd apps/web
        pnpm run dev
   ```

---

### How to Test the Referral System

1. Visit the signup page with a referral code, e.g.:
     ```http://localhost:3000/signup?ref=1234 ```
2. Complete the signup form.
3. Verify in the database that the new user record has the referredBy field set to the referrer’s user ID (1234 in this example).

---

### Possible Improvements
 
- Referral Reward Logic: Add points or discounts for successful referrals.
- Referral Dashboard: Enable users to track their referral stats and rewards.
- Validation: Verify referral codes for authenticity and prevent abuse.
- Expiry: Set expiry dates on referral cookies.
- Analytics: Build reports to analyze referral traffic and conversions.
- Multiple Referral Sources: Track referrals from social media or campaigns.

