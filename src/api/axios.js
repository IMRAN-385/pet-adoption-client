import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 12000,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // ❌ window.location.href = '/login' — এটা DELETE করো
    // ❌ navigate('/login') — এটাও না
    // শুধু error return করো, redirect AuthContext/PrivateRoute করবে
    return Promise.reject(error);
  }
);

export default instance;