// src/services/moviesService.js
import api from './api';

export const getAllMovies = async () => {
  return await api('/movies');
};

export const getMovie = async (movieId) => {
  return await api(`/movies/${movieId}`);
};

export const createMovie = async (movieData) => {
  return await api('/movies', {
    method: 'POST',
    body: JSON.stringify(movieData),
  });
};

export const updateMovie = async (movieId, movieData) => {
  return await api(`/movies/${movieId}`, {
    method: 'PUT',
    body: JSON.stringify(movieData),
  });
};

export const deleteMovie = async (movieId) => {
  return await api(`/movies/${movieId}`, {
    method: 'DELETE',
  });
};