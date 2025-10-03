// src/hooks/useAuth.js
"use client";

import { useEffect, useState, useContext, createContext } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

// Create a context so we can share auth state easily
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase user changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => 
    signInWithEmailAndPassword(auth, email, password);

  const signup = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the AuthContext in any component
export function useAuth() {
  return useContext(AuthContext);
}
