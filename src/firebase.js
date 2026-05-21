import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOK9aoRzqo_zCuQlx9xB7B5Iq-sNMGSUI",
  authDomain: "pet-adoption-b87a5.firebaseapp.com",
  projectId: "pet-adoption-b87a5",
  storageBucket: "pet-adoption-b87a5.firebasestorage.app",
  messagingSenderId: "74299014057",
  appId: "1:74299014057:web:12aebe5f9580a7d65522b8",
  measurementId: "G-0RWYC30RTH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;