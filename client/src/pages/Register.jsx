import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePass] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePass) return alert('Passwords do not match');
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      alert(err.message || 'Registration failed');
    }
  };

  return (
    <main>
      <section className="section">
        <h1 className="section-title">Register</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Repeat Password</label>
            <input
              type="password"
              className="form-input"
              value={rePass}
              onChange={e => setRePass(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Already have an account? <Link to="/login" style={{ color: '#ff6f61' }}>Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}