// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import WorkoutDetails from './pages/WorkoutDetails';
import CreateWorkout from './pages/CreateWorkout';
import EditWorkout from './pages/EditWorkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './pages/PrivateRoute';
import { Link } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="header-area">
      <nav className="main-nav">
        <Link to="/" className="logo">StreetFit</Link>
        <div className="nav">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={logout} className="main-button" style={{ padding: '5px 15px', fontSize: '12px' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workout/:workoutId" element={<WorkoutDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<PrivateRoute><CreateWorkout /></PrivateRoute>} />
            <Route path="/edit/:workoutId" element={<PrivateRoute><EditWorkout /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </div>
        <footer>
          <p className="copyright">&copy; {new Date().getFullYear()} StreetFit Blog</p>
        </footer>
      </BrowserRouter>
    </AuthProvider>
  );
}