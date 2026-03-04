import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { signIn, register, logOut } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until Firebase resolves

  // Listen to Firebase auth state — fires on login, logout, and app cold start
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });
    return unsubscribe; // cleanup on unmount
  }, []);

  const handleSignIn = async (email, password) => {
    const user = await signIn(email, password);
    setUser(user);
  };

  const handleRegister = async (email, password) => {
    const user = await register(email, password);
    setUser(user);
  };

  const handleSignOut = async () => {
    await logOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        register: handleRegister,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// useAuth hook — import this everywhere instead of useContext(AuthContext) directly
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}