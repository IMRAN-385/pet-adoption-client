import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import * as authAPI from '../api/auth.api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (on page reload)
  useEffect(() => {
    authAPI.getMe()
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const registerUser = async (name, email, password, photoURL) => {
    const res = await authAPI.register({ name, email, password, photoURL });
    setUser(res.data.user);
    return res.data;
  };

  const loginUser = async (email, password) => {
    const res = await authAPI.login({ email, password });
    setUser(res.data.user);
    return res.data;
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const { displayName: name, email, photoURL } = result.user;
    const res = await authAPI.googleAuth({ name, email, photoURL });
    setUser(res.data.user);
    return res.data;
  };

  const logoutUser = async () => {
    await authAPI.logout();
    await signOut(auth).catch(() => {});
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = { user, loading, registerUser, loginUser, googleLogin, logoutUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
