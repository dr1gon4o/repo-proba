import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const { login } = useAuth()

  const submit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3030/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(r => r.json())
    .then(data => {
      if (data.accessToken) {
        login(data, data.accessToken)
        window.location.href = '/'
      }
    })
  }

  return (
    <section className="section" id="contact-us">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-heading">
              <h2>Join <em>StreetFit</em></h2>
              <p>Create your account and start sharing workouts</p>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-3">
            <form className="contact-form" onSubmit={submit}>
              <input 
                type="text" 
                value={form.username} 
                onChange={e => setForm({...form, username: e.target.value})} 
                placeholder="Your Username" 
                required 
              />
              <input 
                type="email" 
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                placeholder="Your Email" 
                required 
              />
              <input 
                type="password" 
                value={form.password} 
                onChange={e => setForm({...form, password: e.target.value})} 
                placeholder="Your Password" 
                required 
              />
              <button type="submit" className="main-button">
                Register Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}