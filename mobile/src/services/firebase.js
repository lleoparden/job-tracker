import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnvK5dprgGXvSZMQugLn9MsYobIx0H8zs",
  authDomain: "job-tracker-leoparden.firebaseapp.com",
  projectId: "job-tracker-leoparden",
  storageBucket: "job-tracker-leoparden.firebasestorage.app",
  messagingSenderId: "639139726894",
  appId: "1:639139726894:web:c35c1aa3e24c31d940c1bf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;