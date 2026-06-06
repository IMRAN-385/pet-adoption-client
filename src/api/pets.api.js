import axios from './axios';

export const getAllPets = () => axios.get('/pets');
export const getPetById = (id) => axios.get(`/pets/${id}`);
export const getMyPets = () => axios.get('/pets/my');
export const createPet = (data) => axios.post('/pets', data);
export const updatePet = (id, data) => axios.put(`/pets/${id}`, data);
export const deletePet = (id) => axios.delete(`/pets/${id}`);