# Smart Bookmark App

A real-time bookmark manager built with **Next.js (App Router)** and **Supabase**.

Users can log in using Google OAuth, add private bookmarks, delete them, and see real-time updates across multiple tabs.

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS
- **Backend & Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Google OAuth
- **Realtime:** Supabase Realtime Subscriptions
- **Deployment:** Vercel

## Features

- Google OAuth login (no email/password)
- User-specific private bookmarks (Row Level Security enabled)
- Add bookmarks (title + URL)
- Delete bookmarks
- Real-time updates across multiple browser tabs
- Deployed on Vercel

---

## Architecture Overview

- Next.js handles the frontend (App Router)
- Supabase handles:
  - Authentication
  - Database (PostgreSQL)
  - Realtime updates
- Row Level Security ensures users can only access their own data

---

## Project Structure

```
src/
│
├── app/
│   ├── page.js              # Root redirect
│   ├── login/
│   │     └── page.js        # Login page
│   ├── dashboard/
│   │     └── page.js        # Bookmark dashboard
│   └── lib/
│         └── supabase.js    # Supabase client config

````

---

## 🔐 Database Schema

```sql
create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp with time zone default now()
);
````

## ⚙️ Environment Variables

Create a `.env.local` file:

```

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

```

---

## Run Locally

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Deployment

Deployed using **Vercel**.

Environment variables were configured in the Vercel dashboard.

Google OAuth redirect URLs were configured in:

* Supabase Authentication settings
* Google Cloud Console OAuth credentials

---

## Author

Muhammed Ashique
