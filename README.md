## AKPsi, Chi Gamma Chapter Website

Tech Stack:
# Frontend
* Next.js
* React
* Tailwind CSS
* Hosted on Vercel

# Backend / CMS
* Django
* Django REST Framework
* Django Admin for content management

# Database
* PostgreSQL
* Hosted on Render

# Media Storage
* Cloudinary
* Stores member photos, event galleries, and recruitment images 
* CDN-delivered and automatically optimized

Deployment Architecture
Vercel (Next.js Frontend)
            ↓
Render (Django REST API + Admin)
            ↓
Render PostgreSQL
            ↓
Cloudinary (Images/CDN)