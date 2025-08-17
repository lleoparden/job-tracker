# 📌 Job Tracker

A **Job Application Tracking System** that helps users manage their job applications efficiently across **web, mobile, and browser extension platforms**.  

This project is built with a **FastAPI backend** and a **React + Vite frontend**, designed to run on completely free hosting solutions (no credit card required).  

---

## 🚀 Features (Planned)
- Track job applications across different platforms.
- Categorize jobs as **Applied**, **Saved**, or **Future Opportunities**.
- Share job applications directly from job boards to the app (via mobile share sheet & browser extension).
- Sync seamlessly across **Web**, **Mobile App**, and **Browser Extension**.
- Free deployment & hosting.

---

## 📂 Project Structure

```plaintext
job-tracker/
│
├── backend/ # FastAPI backend
│   ├── app/
│   │   ├── main.py # FastAPI entry point
│   │   ├── routers/ # API routes
│   │   ├── models/ # Data models
│   │   └── database.py # Database connection
│   ├── requirements.txt # Backend dependencies
│   └── venv/ # Python virtual environment (not pushed to git)
│
├── frontend/ # React + Vite frontend
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── pages/ # Pages (Dashboard, Login, etc.)
│   │   ├── App.tsx # Main app
│   │   └── main.tsx # React entry point
│   ├── package.json # Frontend dependencies
│   └── vite.config.ts # Vite config
│
├── mobile/ # Placeholder for future React Native app
│
├── extension/ # Placeholder for future browser extension
│
├── README.md # Project overview
│
└── .gitignore
```


---

## ⚙️ Tech Stack

- **Backend:** FastAPI, SQLite (initially), PostgreSQL (production-ready)
- **Frontend:** React (Vite, TypeScript), Tailwind CSS
- **Mobile App (upcoming):** React Native
- **Browser Extension (upcoming):** Manifest V3 + React
- **Deployment:** Free-tier hosting (Render, Netlify, Vercel, GitHub Pages)

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/lleoparden/job-tracker.git
cd job-tracker
