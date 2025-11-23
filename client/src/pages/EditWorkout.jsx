import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function EditWorkout() {
  const { id } = useParams()
  const [workout, setWorkout] = useState(null)
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    content: '',
    difficulty: 'Beginner',
    duration: '15 mins'
  })
  const { user } = useAuth()

  useEffect(() => {
    fetch(`http://localhost:3030/data/workouts/${id}`)
      .then(r => r.json())
      .then(data => {
        setWorkout(data)
        setForm({ 
          title: data.title, 
          description: data.description, 
          content: data.content,
          difficulty: data.difficulty || 'Beginner',
          duration: data.duration || '15 mins'
        })
      })
  }, [id])

  const submit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3030/data/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Authorization': user.accessToken },
      body: JSON.stringify({
        ...form,
        author: workout.author, // PRESERVE AUTHOR DATA
        likes: workout.likes || [] // PRESERVE LIKES
      })
    }).then(() => window.location.href = `/workouts/${id}`)
  }

  return workout ? (
    <section className="section" id="contact-us">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="section-heading">
              <h2>Edit <em>Workout</em></h2>
              <p>Update your fitness routine</p>
            </div>
          </div>
          <div className="col-lg-8 offset-lg-2">
            <form className="contact-form" onSubmit={submit}>
              <input 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                placeholder="Workout Title"
                required 
              />
              <input 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
                placeholder="Short Description"
                required 
              />
              <select 
                value={form.difficulty}
                onChange={e => setForm({...form, difficulty: e.target.value})}
                style={{
                  width: '100%',
                  height: '50px',
                  padding: '0 20px',
                  border: '1px solid #eee',
                  borderRadius: '25px',
                  marginBottom: '30px',
                  fontSize: '14px',
                  color: '#777'
                }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <textarea 
                value={form.content} 
                onChange={e => setForm({...form, content: e.target.value})} 
                placeholder="Detailed workout instructions..." 
                required 
                rows="6"
              />
              <button type="submit" className="main-button">
                Update Workout
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="loading">Loading...</div>
          </div>
        </div>
      </div>
    </section>
  )
}