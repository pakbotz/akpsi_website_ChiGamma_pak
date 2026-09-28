# AKPsi, Chi Gamma Chapter Website

## Tech stack

| Layer | Tech |
|-------|------|
|  Frontend | Next.js, React, Tailwind CSS |
| Backend (Content management) | Admin Dashboard w/ Vercel + Supabase, NO backend server |
| Database | Supabase, PostgreSQL |
| Media Storage | Cloudinary |
| Deployment | Vercel |

## Deployment Architecture

```text
┌────────────────────────────────────────────────────────┐
│               Vercel (Next.js Website)                 │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
        (API / Data Flow)          (Media Assets)
                ▼                        ▼
     ┌────────────────────┐    ┌────────────────────┐
     │    Supabase SDK    │    │   Cloudinary CDN   │
     └──────────┬─────────┘    └────────────────────┘
                │
        ┌───────┴───────┐
        ▼               ▼
   ┌──────────┐   ┌──────────┐
   │ Auth RLS │   │ Database │
   └──────────┘   └──────────┘
```

Developed by Psi Tech's Jaycob Pakingan, Ethen Dhanaraj, Haatim Ali, Sara Jain, and Chintan Patwardhan
