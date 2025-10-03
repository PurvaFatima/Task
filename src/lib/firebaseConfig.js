import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjTxgLbFJIvM_LQxEZsbVTKJ2iCXqqj_8",
  authDomain: "task-2fdcc.firebaseapp.com",
  projectId: "task-2fdcc",
  storageBucket: "task-2fdcc.firebasestorage.app",
  messagingSenderId: "856373549779",
  appId: "1:856373549779:web:bb8b954305cb5e43ed9226",
  measurementId: "G-437P7NF3KT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Analytics only in browser
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Auth instance
export const auth = getAuth(app);