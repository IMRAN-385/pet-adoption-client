





// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOK9aoRzqo_zCuQlx9xB7B5Iq-sNMGSUI",
  authDomain: "pet-adoption-b87a5.firebaseapp.com",
  projectId: "pet-adoption-b87a5",
  storageBucket: "pet-adoption-b87a5.firebasestorage.app",
  messagingSenderId: "74299014057",
  appId: "1:74299014057:web:3b1180f46252fa325522b8",
  measurementId: "G-WNY61WF8GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;