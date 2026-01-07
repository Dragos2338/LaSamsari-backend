import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5091/api', // Ajustează portul dacă este necesar
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pentru a adăuga token-ul JWT la fiecare cerere
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor pentru a gestiona erorile de autentificare (ex. token expirat)
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    // Dacă primim 401 sau 403, putem redirecta utilizatorul la login sau curăța starea
    // localStorage.removeItem('token');
    // window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;
