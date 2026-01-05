import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import * as moviesService from '../../services/moviesService';
import MovieCard from '../../components/MovieCard/MovieCard';

const MovieList = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await moviesService.getAllMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await moviesService.deleteMovie(movieId);
        setMovies(movies.filter(movie => movie._id !== movieId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="movie-list-container">
        <h1>Loading movies...</h1>
      </div>
    );
  }

  return (
    <main className="movie-list-container">
      <div className="movie-list-header">
        <h1 className="movie-list-title">All Movies</h1>
        {!user && (
          <p className="movie-list-subtitle">Sign in to add movies and manage favorites</p>
        )}
      </div>

      {error && <p className="movie-list-error">{error}</p>}

      {movies.length === 0 ? (
        <div className="movie-list-empty">
          <p>No movies available yet.</p>
          {user && <p>Be the first to add a movie!</p>}
        </div>
      ) : (
        <div className="movie-list-grid">
          {movies.map((movie) => (
            <MovieCard 
              key={movie._id} 
              movie={movie} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default MovieList;