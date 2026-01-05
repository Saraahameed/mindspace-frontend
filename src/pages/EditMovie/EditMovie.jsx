import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as moviesService from '../../services/moviesService';

const EditMovie = () => {
  const { user } = useContext(AuthContext);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    rating: 0,
  });

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  const fetchMovie = async () => {
    try {
      const movie = await moviesService.getMovie(movieId);
      
      if (movie.user._id !== user._id && movie.user !== user._id) {
        setError('You are not authorized to edit this movie');
        return;
      }

      setFormData({
        title: movie.title,
        description: movie.description,
        image: movie.image,
        rating: movie.rating,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? Number(value) : value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await moviesService.updateMovie(movieId, formData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="edit-movie-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="edit-movie-container">
        <h1 className="edit-movie-error">{error}</h1>
        <button onClick={() => navigate('/')} className="edit-movie-cancel-btn">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="edit-movie-container">
      <h1 className="edit-movie-title">Edit Movie</h1>
      
      {error && <p className="edit-movie-error">{error}</p>}

      <form onSubmit={handleSubmit} className="edit-movie-form">
        <div className="edit-movie-form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-movie-form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
          />
        </div>

        <div className="edit-movie-form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="edit-movie-form-group">
          <label htmlFor="rating">Rating (0-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            required
          />
        </div>

        <div className="edit-movie-button-group">
          <button type="submit" className="edit-movie-submit-btn">
            Update Movie
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="edit-movie-cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditMovie;