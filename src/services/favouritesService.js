import api from './api';

export const getFavourites = async (userId) => {
  return await api(`/favourites/${userId}`);
};

export const addFavourite = async (userId, movieId) => {
  return await api('/favourites', {
    method: 'POST',
    body: JSON.stringify({ userId, movieId }),
  });
};

export const removeFavourite = async (userId, movieId) => {
  return await api('/favourites', {
    method: 'DELETE',
    body: JSON.stringify({ userId, movieId }),
  });
};