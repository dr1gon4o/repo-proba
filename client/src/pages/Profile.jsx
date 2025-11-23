import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Profile() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Profile userId:', userId) // Debug
    
    // Get ALL workouts first, then extract user info from workouts
    fetch('http://localhost:3030/data/workouts')
      .then(r => {
        if (r.status === 404) return [] // Handle no workouts yet
        if (!r.ok) throw new Error('Server error')
        return r.json()
      })
      .then(allWorkouts => {
        console.log('All workouts:', allWorkouts)
        
        // Filter workouts by author ID
        const userWorkouts = Array.isArray(allWorkouts) 
          ? allWorkouts.filter(w => w.author && w.author._id === userId)
          : []
        console.log('User workouts:', userWorkouts)
        
        // If we found workouts, extract user info from first workout
        if (userWorkouts.length > 0) {
          setUser(userWorkouts[0].author) // Use author info from workout
        } else {
          // If no workouts but we have userId, create a basic user object
          setUser({ username: 'User', _id: userId })
        }
        
        setWorkouts(userWorkouts)
        setLoading(false)
      })
      .catch(err => {
        console.log('Profile error:', err)
        // Create basic user object even on error
        setUser({ username: 'User', _id: userId })
        setWorkouts([])
        setLoading(false)
      })
  }, [userId])

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="loading">Loading profile...</div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return user ? (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>{user.username}'s <em>Profile</em></h2>
              <p>Workouts created by {user.username}</p>
            </div>
          </div>
        </div>
        
        <div className="row">
          {workouts.length > 0 ? (
            workouts.map(w => (
              <div key={w._id} className="col-lg-4">
                <div className="features-small-item">
                  <div className="icon">
                    <i className="fas fa-dumbbell"></i>
                  </div>
                  <h5 className="features-title">{w.title}</h5>
                  <p>{w.description}</p>
                  <p><small>{w.difficulty} • {w.duration}</small></p>
                  <a href={`/workouts/${w._id}`} className="main-button">
                    View Workout
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-lg-12 text-center">
              <div className="features-small-item">
                <h5>No Workouts Created Yet</h5>
                <p>{user.username} hasn't created any workouts yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  ) : (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="features-small-item">
              <h5>User Not Found</h5>
              <p>The requested user profile doesn't exist.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}