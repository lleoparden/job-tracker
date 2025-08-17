I am building a Job Application Tracking System with three platforms:
1. Web App (Next.js/React + Tailwind) ✅ (currently being developed).
2. Mobile App (React Native) ❌ (still needs to be built).
3. Browser Extension ❌ (still needs to be built) – should let me save jobs from LinkedIn/other sites directly into the system.

I want one **shared backend** (Node.js/FastAPI or similar) that powers all three platforms via REST APIs/GraphQL.  
The backend should also be **deployable for free** (no credit card required, completely free hosting).  

Current project structure (for the web app):

job-tracker/
│
├── backend/ # FastAPI backend
│ ├── app/
│ │ ├── main.py # FastAPI entry point
│ │ ├── routers/ # API routes
│ │ ├── models/ # Data models
│ │ └── database.py # Database connection
│ ├── requirements.txt # Backend dependencies
│ └── venv/ # Python virtual environment (not pushed to git)
│
├── frontend/ # React + Vite frontend
│ ├── src/
│ │ ├── components/ # Reusable React components
│ │ ├── pages/ # Pages (Dashboard, Login, etc.)
│ │ ├── App.tsx # Main app
│ │ └── main.tsx # React entry point
│ ├── package.json # Frontend dependencies
│ └── vite.config.ts # Vite config
│
├── mobile/ # Placeholder for future React Native app
│
├── extension/ # Placeholder for future browser extension
│
├── README.md # Project overview
|
└── .gitignore


The **features I want across all platforms**:
- Job application tracking (title, company, status, date applied, notes).
- Tags/filters/search for easy management.
- Export/import job applications (CSV/JSON).
- Authentication (free option, maybe Firebase Auth).
- Free database option (like Supabase free tier or Firebase free tier).
- Simple analytics (applied count, interview count, offer count, rejection count).
- Share option: when applying to a job, I can **share to the extension/app** and mark as "applied" or "save for later".

The **website (Next.js app)** is already initialized. Now, I need:
1. A clear plan for setting up the backend and connecting it to the frontend.  
2. Later, extend the same backend for the **React Native mobile app**.  
3. A **browser extension** that integrates with the backend and frontend.  
4. Instructions for **free deployment** (no credit card, no trial).

Please give me a step-by-step guide with code examples and deployment instructions.  
