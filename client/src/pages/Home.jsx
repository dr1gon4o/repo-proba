import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const [workouts, setWorkouts] = useState([])
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetch('http://localhost:3030/data/workouts')
      .then(r => {
        if (r.status === 404) return []
        if (!r.ok) throw new Error('Server error')
        return r.json()
      })
      .then(data => {
        setWorkouts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        setWorkouts([])
        setLoading(false)
      })

    fetch('https://www.7timer.info/bin/api.pl?lon=23.3242&lat=42.6975&product=civillight&output=json')
      .then(r => r.json())
      .then(data => {
        if (data.dataseries && data.dataseries[0]) {
          const today = data.dataseries[0]
          setWeather({
            location: 'Sofia',
            temp: today.temp2m.max,
            condition: today.weather
          })
        }
      })
      .catch(err => {
        setWeather({
          location: 'Sofia',
          temp: 22,
          condition: 'clear'
        })
      })
  }, [])

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="loading">Loading workouts...</div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const weatherIcons = {
    'clear': 'fas fa-sun',
    'pcloudy': 'fas fa-cloud-sun',
    'mcloudy': 'fas fa-cloud',
    'cloudy': 'fas fa-cloud',
    'rain': 'fas fa-cloud-rain',
    'lightrain': 'fas fa-cloud-rain',
    'oshower': 'fas fa-cloud-showers-heavy',
    'ishower': 'fas fa-cloud-showers-heavy',
    'snow': 'fas fa-snowflake',
    'ts': 'fas fa-bolt',
    'tsrain': 'fas fa-bolt'
  }

  return (
    <>
      {/* COMPACT HERO BANNER */}
      <section className="welcome-area compact-hero">
        <div className="header-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1>StreetFit <em>Community</em></h1>
                <p>Bodyweight workouts you can do anywhere</p>
                {user ? (
                  <Link to="/create" className="main-button-slider">Create Workout</Link>
                ) : (
                  <Link to="/register" className="main-button-slider">Join Now</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* POSTS */}
      <section className="section posts-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>Featured <em>Workouts</em></h2>
                <p>Check out workouts created by our community</p>
              </div>
            </div>
          </div>
          
          <div className="row justify-content-center">
            {workouts.length > 0 ? (
              workouts.map(w => (
                <div key={w._id} className="col-lg-4 col-md-6 post-card">
                  <div className="features-small-item text-center">
                    <div className="icon">
                      <i className="fas fa-dumbbell"></i>
                    </div>
                    <h5 className="features-title">{w.title}</h5>
                    <p>{w.description}</p>
                    <p className="post-meta">
                      By {w.author?.username} • {w.difficulty} • {w.duration}
                    </p>
                    <Link to={`/workouts/${w._id}`} className="main-button compact-button">
                      View Workout
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-lg-6">
                <div className="features-small-item text-center">
                  <div className="icon">
                    <i className="fas fa-dumbbell"></i>
                  </div>
                  <h5 className="features-title">No Workouts Yet</h5>
                  <p>Be the first to create a workout!</p>
                  {user && (
                    <Link to="/create" className="main-button">
                      Create First Workout
                    </Link>
                  )}
             
                </div>
              </div>
            )}
          </div>


            {/* WEATHER */}
      {weather && (
        <section className="section weather-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="features-small-item text-center weather-widget">
                  <div className="icon">
                    <i className={weatherIcons[weather.condition] || 'fas fa-sun'}></i>
                  </div>
                  <h5 className="features-title">Outdoor Workout Weather</h5>
                  <p><strong>{weather.location}</strong>: {weather.temp}°C</p>
                  <p className="weather-condition">
                    {weather.condition} • Perfect for outdoor exercises
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

        </div>
      </section>
    </>
  )
}