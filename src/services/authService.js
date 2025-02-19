import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const signUp = async (data) => {
  const response = await api.post('/signup', data);
  return response.data;
};