import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import './styles/template.css'
import './styles/overrides.css'

import Home from './pages/Home'
import WorkoutDetails from './pages/WorkoutDetails'
import CreateWorkout from './pages/CreateWorkout'
import EditWorkout from './pages/EditWorkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import PrivateRoute from './pages/PrivateRoute'

function Navigation() {
  const { user, logout } = useAuth()
  
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="/" className="logo">
                <span style={{
                  color: '#3498db',
                  fontWeight: '700',
                  fontSize: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <i className="fas fa-dumbbell" style={{color: '#2ecc71'}}></i>
                  StreetFit
                </span>
              </a>
              <ul className="nav">
                <li>
                  <a href="/">
                    <i className="fas fa-home" style={{marginRight: '8px'}}></i>
                    Home
                  </a>
                </li>
                {user ? (
                  <>
                    <li>
                      <a href="/create">
                        <i className="fas fa-plus-circle" style={{marginRight: '8px'}}></i>
                        Create Workout
                      </a>
                    </li>
                    <li>
                      <a href={`/profile/${user._id}`}>
                        <i className="fas fa-user" style={{marginRight: '8px'}}></i>
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => { e.preventDefault(); logout(); window.location.href = '/'; }}>
                        <i className="fas fa-sign-out-alt" style={{marginRight: '8px'}}></i>
                        Logout ({user.username})
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a href="/login">
                        <i className="fas fa-sign-in-alt" style={{marginRight: '8px'}}></i>
                        Login
                      </a>
                    </li>
                    <li>
                      <a href="/register">
                        <i className="fas fa-user-plus" style={{marginRight: '8px'}}></i>
                        Register
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p>Copyright © 2025 StreetFit - Fitness Blog</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* REMOVED PRELOADER COMPLETELY */}
        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workouts/:id" element={<WorkoutDetails />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/create" element={<CreateWorkout />} />
              <Route path="/edit/:id" element={<EditWorkout />} />
            </Route>
          </Routes>
        </main>
        
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App