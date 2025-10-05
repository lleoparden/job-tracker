import React, { useState, useEffect } from 'react';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthForm from './components/auth/AuthForm.jsx';
import Navbar from './components/layout/Navbar.jsx';
import AddJobPage from './pages/AddJobPage.jsx';
import BrowseJobsPage from './pages/BrowseJobsPage.jsx';
import CurrentJobsPage from './pages/CurrentJobsPage.jsx';
import LoadingSpinner from './components/ui/LoadingSpinner.jsx';

const firebaseConfig = {
  apiKey: "AIzaSyBnvK5dprgGXvSZMQugLn9MsYobIx0H8zs",
  authDomain: "job-tracker-leoparden.firebaseapp.com",
  projectId: "job-tracker-leoparden",
  storageBucket: "job-tracker-leoparden.firebasestorage.app",
  messagingSenderId: "639139726894",
  appId: "1:639139726894:web:c35c1aa3e24c31d940c1bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Router>
      {!user ? (
          <AuthForm auth={auth} />  
      ) : (
        <div className="min-h-screen bg-white text-gray-900">
          <Navbar onLogout={handleLogout} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Routes>
              <Route path="/" element={<Navigate to="/add" />} />
              <Route path="/add" element={<AddJobPage />} />
              <Route path="/browse" element={<BrowseJobsPage />} />
              <Route path="/current" element={<CurrentJobsPage />} />
              <Route path="*" element={<Navigate to="/add" />} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
}
