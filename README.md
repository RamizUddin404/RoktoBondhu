# RoktoBondhu (রক্তবন্ধু) - Supabase Web App

A high-performance, responsive, and offline-capable blood donation web application powered by **Supabase**.

## Features
- **Modern UI:** Built with Tailwind CSS for a premium look.
- **Supabase Backend:** Real-time data and secure authentication.
- **PWA Ready:** Install as an app and works offline.
- **Admin Panel:** Manage donor entries easily.
- **One-Click Call:** Directly call donors from the results.

## Setup Instructions

### 1. Supabase Setup
- Create a project on [Supabase](https://supabase.com/).
- **Database:** Create a table named `donors` with these columns:
  - `id`: uuid (primary key, default: gen_random_uuid())
  - `name`: text
  - `blood_group`: text
  - `district`: text
  - `phone`: text
  - `last_donation`: text (optional)
  - `created_at`: timestamptz (default: now())
- **Authentication:** Enable Email/Password provider. Create an admin user.
- **API Settings:** Copy your `Project URL` and `anon key` to `js/supabase-config.js`.

### 2. Deployment
- Push this code to a new GitHub repository.
- Enable **GitHub Pages** in Settings -> Pages.

## Deployment Reset
This project has been re-initialized to support a web-first architecture.
