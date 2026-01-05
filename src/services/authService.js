import api from './api';

export const signUp = async (formData) => {
  try {
    const data = await api('/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (formData) => {
  try {
    const data = await api('/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};