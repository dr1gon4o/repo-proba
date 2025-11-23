import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function CreateWorkout() {
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    content: '',
    difficulty: 'Beginner',
    duration: '15 mins' // Default duration
  })
  const { user } = useAuth()

  // Update duration when difficulty changes
  const handleDifficultyChange = (difficulty) => {
    const durations = {
      'Beginner': '15 mins',
      'Intermediate': '30 mins', 
      'Advanced': '45 mins'
    }
    setForm({
      ...form,
      difficulty,
      duration: durations[difficulty]
    })
  }

  const submit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3030/data/workouts', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'X-Authorization': user.accessToken 
      },
      body: JSON.stringify({
        ...form,
        author: { _id: user._id, username: user.username },
        likes: []
      })
    }).then(() => window.location.href = '/')
  }

  return (
    <section className="section" id="contact-us">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="section-heading">
              <h2>Create <em>Workout</em></h2>
              <p>Share your fitness routine with the community</p>
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
                onChange={e => handleDifficultyChange(e.target.value)}
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
                <option value="Beginner">Beginner (15 mins)</option>
                <option value="Intermediate">Intermediate (30 mins)</option>
                <option value="Advanced">Advanced (45 mins)</option>
              </select>
              <textarea 
                value={form.content} 
                onChange={e => setForm({...form, content: e.target.value})} 
                placeholder="Detailed workout instructions..." 
                required 
                rows="6"
              />
              <button type="submit" className="main-button">
                Publish Workout
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}