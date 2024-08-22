import axios from 'axios';

const api = axios.create({
  baseURL: 'http://http://127.0.0.1:8000//api', 
});

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};
