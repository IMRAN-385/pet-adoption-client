import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pet-adoption-server-slno.onrender.com/api',
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
    return Promise.reject(error);
  }
);

export default instance;