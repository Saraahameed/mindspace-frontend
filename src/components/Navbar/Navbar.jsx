import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          mindspace
        </Link>
        
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/" className="nav-link">Movies</Link>
              <Link to="/movies/new" className="nav-link">Add Movie</Link>
              <Link to="/favourites" className="nav-link">My Favourites</Link>
              <span className="navbar-username">Hello, {user.username}</span>
              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Movies</Link>
              <Link to="/sign-in" className="nav-link">Sign In</Link>
              <Link to="/sign-up" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;