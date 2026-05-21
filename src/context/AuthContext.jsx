import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { register, login, googleAuth, logout, getMe } from '../api/auth.api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(res => setUser(res.data?.user || res.data || null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const registerUser = async (name, email, password, photoURL) => {
    const res = await register({ name, email, password, photoURL });
    setUser(res.data?.user || res.data);
    return res.data;
  };

  const loginUser = async (email, password) => {
    const res = await login({ email, password });
    setUser(res.data?.user || res.data);
    return res.data;
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const { displayName: name, email, photoURL } = result.user;
    const res = await googleAuth({ name, email, photoURL });
    setUser(res.data?.user || res.data);
    return res.data;
  };

  const logoutUser = async () => {
    try { await logout(); } catch {}
    await signOut(auth).catch(() => {});
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, registerUser, loginUser, googleLogin, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};