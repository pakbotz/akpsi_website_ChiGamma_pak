# AKPsi, Chi Gamma Chapter Website

## Tech Stack:
* Frontend: Next.js, React, Tailwind CSS
* Backend (Content management): Django (REST Framework, Admin)
* Database: PostgreSQL
* Media Storage (Cloud): Cloudinary
* Deployment: Vercel, Render

## Deployment Architecture
Vercel (Next.js Frontend)
            ↓
Render (Django REST API + Admin)
            ↓
Render PostgreSQL
            ↓
Cloudinary (Images/CDN)