# AKPsi, Chi Gamma Chapter Website

## Tech Stack:
* Frontend: Next.js, React, Tailwind CSS
* Backend (Content management): Admin Dashboard w/ Vercel + Supabase, NO backend server
* Database: Supabase, PostgreSQL
* Media Storage (Cloud): Cloudinary
* Deployment: Vercel

## Deployment Architecture
Vercel (Next.js Website)  
↓
Supabase SDK
↓  
Supabase Authentication (RLS), Supabase Database
↓
Cloudinary (Images/CDN)

Developed by Psi Tech