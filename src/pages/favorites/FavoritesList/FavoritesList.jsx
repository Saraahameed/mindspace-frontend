import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import * as favouritesService from '../../../services/favouritesService';
import './FavoritesList.css';

const FavoritesList = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await favouritesService.getFavourites(user._id);
        setFavorites(data.favourites || []);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = async (movieId) => {
    try {
      await favouritesService.removeFavourite(user._id, movieId);
      setFavorites(favorites.filter(fav => fav._id !== movieId));
      setMessage('Removed from favorites');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!user) {
    return (
      <main className="favorites-list-container">
        <div className="favorites-list-empty">
          <h1>Favorites</h1>
          <p>Please sign in to view your favorites.</p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="favorites-list-container">
        <div className="favorites-list-empty">
          <h1>Favorites</h1>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="favorites-list-container">
      <div className="favorites-list-header">
        <h1 className="favorites-list-title">My Favorite Movies</h1>
      </div>
      
      {message && (
        <div className="favorites-message">
          {message}
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="favorites-list-empty">
          <p>You have no favorite movies yet.</p>
          <p>Start adding movies to your favorites!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div key={movie._id} className="favorites-card">
              <img 
                src={movie.image} 
                alt={movie.title}
                className="favorites-card-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                }}
              />
              <div className="favorites-card-content">
                <h2 className="favorites-card-title">{movie.title}</h2>
                <p className="favorites-card-description">{movie.description}</p>
                <div className="favorites-card-rating">
                  {'⭐'.repeat(Math.round(movie.rating))} ({movie.rating}/5)
                </div>
                <button 
                  onClick={() => handleRemoveFavorite(movie._id)}
                  className="favorites-remove-btn"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default FavoritesList;