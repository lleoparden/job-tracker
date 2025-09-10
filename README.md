# 📌 Job Tracker

A **Job Application Tracking System** that helps users manage their job applications efficiently across **web, mobile, and browser extension platforms**.  

This project is built with a **FastAPI backend** and a **React + Vite frontend**, using **Firebase (Auth + Firestore)** for authentication and database.  
Designed to run on completely free hosting solutions (no credit card required).  

---

## 🚀 Features (Planned)
- Track job applications across different platforms.
- Categorize jobs as **Applied**, **Saved**, or **Future Opportunities**.
- Share job applications directly from job boards to the app (via mobile share sheet & browser extension).
- Sync seamlessly across **Web**, **Mobile App**, and **Browser Extension**.
- Free deployment & hosting.

---

## 📂 Project Structure

```
job-tracker/
│
├── backend/
| ├── app/
│ |  ├── main.py # FastAPI entry point
│ |  ├── auth.py # Firebase auth validation
│ |  └── routers
| |     ├── jobs.py
| |     └── scraper.py
│ ├── firebase-service-account.json # Service account for backend (ignored in git)
│ ├── requirements.txt # Backend dependencies
│ ├── venv/ # Python virtual environment (ignored in git)
| └── .env
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
├── mobile/ # React Native app
│ ├── App.tsx
│ └── ...
│
├── extension/ # Browser extension
│ ├── manifest.json
│ ├── popup.html
│ ├── popup.js
│ └── ...
│
├── README.md # Project overview
└── .gitignore
```

---

## 🗄️ Database Structure (Firestore)

**Jobs Collection (Global)**
```
jobs/{jobId} → {
  id: string,
  title: string,
  company: string,
  link: string,
  tags: [string],
  createdAt: string (ISO timestamp),
  createdBy: string (uid)
}
```

**User-Specific Jobs (Nested under each user)**
```
users/{uid}/jobs/{jobId} → {
  jobId: string,
  status: string (default: "saved"),
  notes: string,
  appliedDate: string | null,
  createdAt: string (ISO timestamp),
  updatedAt: string (ISO timestamp)
}
```

This structure ensures:
- Global job info stored once under `/jobs`
- Each user has their own `/users/{uid}/jobs` subcollection with status, notes, and personalized info

---

## ⚙️ Tech Stack

- **Backend:** FastAPI, Firebase Admin SDK  
- **Frontend:** React (Vite, TypeScript), Tailwind CSS  
- **Database:** Firebase Firestore  
- **Auth:** Firebase Authentication  
- **Mobile App (upcoming):** React Native  
- **Browser Extension (upcoming):** Manifest V3 + React  
- **Deployment:** Free-tier hosting (Firebase Hosting for frontend, Deta/Render for backend)  

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/lleoparden/job-tracker.git
cd job-tracker
```
