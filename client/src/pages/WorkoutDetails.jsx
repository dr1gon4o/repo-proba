import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function WorkoutDetails() {
  const { id } = useParams()
  const [workout, setWorkout] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    fetch(`http://localhost:3030/data/workouts/${id}`)
      .then(r => r.json())
      .then(setWorkout)
      .catch(err => console.log('Error fetching workout:', err))
  }, [id])

  const deleteWorkout = () => {
    if (confirm('Delete this workout?')) {
      fetch(`http://localhost:3030/data/workouts/${id}`, {
        method: 'DELETE', 
        headers: { 'X-Authorization': user.accessToken }
      }).then(() => window.location.href = '/')
    }
  }

  // DEBUG: Check if user can edit
  console.log('Current user:', user)
  console.log('Workout author:', workout?.author)
  console.log('Can edit:', user && workout && user._id === workout.author?._id)

  return workout ? (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="features-small-item">
              <div className="section-heading" style={{textAlign: 'left', marginBottom: '30px'}}>
                <h2>{workout.title}</h2>
                <p>By {workout.author?.username} • {workout.difficulty} • {workout.duration}</p>
              </div>
              
              <div className="left-text">
                <div style={{whiteSpace: 'pre-line', lineHeight: '1.8', fontSize: '15px'}}>
                  {workout.content}
                </div>
              </div>

              {/* EDIT/DELETE BUTTONS - FIXED CONDITION */}
              {user && workout.author && user._id === workout.author._id && (
                <div style={{marginTop: '40px', textAlign: 'center'}}>
                  <a href={`/edit/${workout._id}`} className="main-button" style={{marginRight: '15px'}}>
                    Edit Workout
                  </a>
                  <button onClick={deleteWorkout} className="main-button">
                    Delete Workout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="loading">Loading workout...</div>
          </div>
        </div>
      </div>
    </section>
  )
}