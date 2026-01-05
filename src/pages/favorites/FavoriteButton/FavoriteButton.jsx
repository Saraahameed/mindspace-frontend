import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import * as favouritesService from '../../../services/favouritesService';
import './FavoriteButton.css';

const FavoriteButton = ({ movieId }) => {
  const { user } = useContext(AuthContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (!user) return;

      try {
        const data = await favouritesService.getFavourites(user._id);
        const favorites = data.favourites || [];
        const favorited = favorites.some(fav => fav._id === movieId);
        setIsFavorited(favorited);
      } catch (err) {
        console.log(err);
      }
    };

    checkIfFavorited();
  }, [user, movieId]);

  const handleToggleFavorite = async () => {
    setMessage('');
    setLoading(true);

    try {
      if (isFavorited) {
        await favouritesService.removeFavourite(user._id, movieId);
        setIsFavorited(false);
        setMessage('Removed from favorites');
      } else {
        await favouritesService.addFavourite(user._id, movieId);
        setIsFavorited(true);
        setMessage('Added to favorites');
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="favorite-button-container">
      <button
        className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
        onClick={handleToggleFavorite}
        disabled={loading}
      >
        {loading ? 'Loading...' : isFavorited ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
      </button>
      {message && <p className="favorite-message">{message}</p>}
    </div>
  );
};

export default FavoriteButton;