import { createContext, useContext } from 'react';
import { authClient } from '../lib/auth-client';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, isPending: loading, refetch } = authClient.useSession();

  const user = session?.user || null;

  const registerUser = async (name, email, password, photoURL) => {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: photoURL || undefined,
    });

    if (error) throw new Error(error.message);
    await refetch();
    return data;
  };

  const loginUser = async (email, password) => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    await refetch();
    return data;
  };

  const googleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: 'https://pet-adoption-client-eta.vercel.app/',
      fetchOptions: {
        onSuccess: () => {
          window.location.href = 'https://pet-adoption-client-eta.vercel.app/';
        }
      }
    });
  };

  const logoutUser = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error('Logout failed');
      return;
    }
    await refetch();
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, session, registerUser, loginUser, googleLogin, logoutUser, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};