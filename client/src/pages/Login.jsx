import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const submit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    fetch('http://localhost:3030/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(r => {
      if (!r.ok) throw new Error('Invalid email or password')
      return r.json()
    })
    .then(data => {
      if (data.accessToken) {
        login(data, data.accessToken)
        window.location.href = '/'
      } else {
        throw new Error('Login failed')
      }
    })
    .catch(err => {
      setError(err.message)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <section className="section" id="contact-us">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-heading">
              <h2>Welcome <em>Back</em></h2>
              <p>Sign in to your StreetFit account</p>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-3">
            <form className="contact-form" onSubmit={submit}>
              {error && (
                <div style={{
                  background: '#ffebee',
                  color: '#c62828',
                  padding: '12px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  {error}
                </div>
              )}
              
              <input 
                type="email" 
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                placeholder="Your Email" 
                required 
                disabled={loading}
              />
              <input 
                type="password" 
                value={form.password} 
                onChange={e => setForm({...form, password: e.target.value})} 
                placeholder="Your Password" 
                required 
                disabled={loading}
              />
              <button 
                type="submit" 
                className="main-button"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              <div style={{textAlign: 'center', marginTop: '20px'}}>
                <p>Don't have an account? <a href="/register" style={{color: '#3498db'}}>Register here</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}