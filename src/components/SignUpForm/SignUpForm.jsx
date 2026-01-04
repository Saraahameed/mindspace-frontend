// src/components/SignUpForm/SignUpForm.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import './SignUpForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const { username, email, password, passwordConf } = formData;

  const checkErrors = ({ target }) => {
    if (target.name === 'username') {
      setErrors({
        ...errors,
        username:
          target.value.length < 3
            ? 'Username must be at least three characters long.'
            : '',
      });
    }
    if (target.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        email:
          !emailRegex.test(target.value)
            ? 'Please enter a valid email address.'
            : '',
      });
    }
    if (target.name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
      setErrors({
        ...errors,
        password:
          !passwordRegex.test(target.value)
            ? 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.'
            : '',
        passwordConf:
          formData.passwordConf !== target.value
            ? 'The passwords do not match.'
            : '',
      });
    }
    if (target.name === 'passwordConf') {
      setErrors({
        ...errors,
        passwordConf:
          formData.password !== target.value
            ? 'The passwords do not match.'
            : '',
      });
    }
  };

  const handleChange = (event) => {
    setMessage('');
    setFormData({ 
      ...formData, 
      [event.target.name]: event.target.value,
    });
    checkErrors(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const submitData = {
        username,
        email,
        password,
        role: 'customer'
      };

      const response = await signUp(submitData);
      const token = localStorage.getItem('token');
      login(response, token);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const formIsInvalid = Object.values(errors).some(Boolean);
  const formHasMissingData = !(username && email && password && passwordConf);

  return (
    <main className="signup-container">
      <h1>Sign Up</h1>

      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="At least 8 chars with Aa1@"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="passwordConf">Password Confirmation:</label>
          <input
            type="password"
            id="passwordConf"
            name="passwordConf"
            value={passwordConf}
            onChange={handleChange}
            required
          />
          {errors.passwordConf && <p className="error-message">{errors.passwordConf}</p>}
        </div>

        <button type="submit" className="submit-button" disabled={formIsInvalid || formHasMissingData}>
          Sign Up
        </button>
        <button type="button" className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
      </form>
      
      <p className="signin-link">
        Already have an account? <Link to='/sign-in'>Sign In</Link>
      </p>
    </main>
  );
};

export default SignUpForm;