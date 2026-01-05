import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import FavoriteButton from '../../pages/favorites/FavoriteButton/FavoriteButton';
import './MovieCard.css';

const MovieCard = ({ movie, onDelete }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isOwner = user && movie.user && (movie.user._id === user._id || movie.user === user._id);

  const handleEdit = () => {
    navigate(`/movies/${movie._id}/edit`);
  };

  return (
    <div className="movie-card">
      <img 
        src={movie.image} 
        alt={movie.title} 
        className="movie-card-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
        }}
      />
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-description">{movie.description}</p>
        <div className="movie-card-rating">
          {'⭐'.repeat(Math.round(movie.rating))} ({movie.rating}/5)
        </div>
        <p className="movie-card-author">
          Added by: {movie.user?.username || 'Unknown'}
        </p>
        
        <div className="movie-card-actions">
          {user && <FavoriteButton movieId={movie._id} />}
          
          {isOwner && (
            <div className="movie-card-owner-actions">
              <button onClick={handleEdit} className="movie-card-edit-btn">
                Edit
              </button>
              <button onClick={() => onDelete(movie._id)} className="movie-card-delete-btn">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;