import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,        // Important for cookies / JWT in httpOnly
  timeout: 10000,               // Prevent hanging requests
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed in future
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Clear any stored tokens if you have them
      // localStorage.removeItem('token'); // if using localStorage
      window.location.href = '/login';
    }

    if (status === 500) {
      console.error('Server error occurred');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;