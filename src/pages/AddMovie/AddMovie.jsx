import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as moviesService from '../../services/moviesService';

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    rating: 0,
  });

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
    
    if (!user) {
      setError('You must be signed in to add a movie');
      return;
    }

    try {
      await moviesService.createMovie(formData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="add-movie-container">
        <h1>Please sign in to add movies</h1>
      </div>
    );
  }

  return (
    <main className="add-movie-container">
      <h1 className="add-movie-title">Add New Movie</h1>
      
      {error && <p className="add-movie-error">{error}</p>}

      <form onSubmit={handleSubmit} className="add-movie-form">
        <div className="add-movie-form-group">
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

        <div className="add-movie-form-group">
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

        <div className="add-movie-form-group">
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

        <div className="add-movie-form-group">
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

        <div className="add-movie-button-group">
          <button type="submit" className="add-movie-submit-btn">
            Add Movie
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="add-movie-cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddMovie;