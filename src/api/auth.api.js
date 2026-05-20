import axios from './axios';

export const register = (data) => axios.post('/auth/register', data);
export const login = (data) => axios.post('/auth/login', data);
export const googleAuth = (data) => axios.post('/auth/google', data);
export const logout = () => axios.post('/auth/logout');
export const getMe = () => axios.get('/auth/me');
