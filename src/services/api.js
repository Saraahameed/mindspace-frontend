// src/services/api.js
const BASE_URL = 'http://localhost:3001';

const getToken = () => {
  return localStorage.getItem('token');
};

const api = async (url, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.err || errorData.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default api;