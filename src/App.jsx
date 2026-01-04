// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import MovieList from './pages/MovieList/MovieList';
import AddMovie from './pages/AddMovie/AddMovie';
import EditMovie from './pages/EditMovie/EditMovie';
import SignInForm from './components/SignInForm/SignInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import FavoritesList from './pages/favorites/FavoritesList/FavoritesList';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies/new" element={<AddMovie />} />
            <Route path="/movies/:movieId/edit" element={<EditMovie />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/favourites" element={<FavoritesList />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;