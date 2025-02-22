import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api';
const API_URL = 'https://nextjs-fastapi-starter-nine-teal.vercel.app/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const imageApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const signInApi = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
});
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    imageApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("Auth token set:", api.defaults.headers.common['Authorization']);
  } else {
    delete api.defaults.headers.common['Authorization'];
    delete imageApi.defaults.headers.common['Authorization'];
   
  }
};

