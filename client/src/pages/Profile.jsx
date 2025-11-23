import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const [ownWorkouts, setOwnWorkouts] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3030/data/workouts?where=_ownerId%3D%22${encodeURIComponent(user.email)}%22`)
      .then(res => res.json())
      .then(data => setOwnWorkouts(Array.isArray(data) ? data : []))
      .catch(() => setOwnWorkouts([]));
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  if (!user) return <main>Loading...</main>;

  return (
    <main>
      <section className="section">
        <h1 className="section-title">Your Profile</h1>
        <p><strong>Email:</strong> {user.email}</p>
        <div style={{ marginTop: '1.5rem' }}>
          <h2>Your Workouts ({ownWorkouts.length})</h2>
          {ownWorkouts.length === 0 ? (
            <p>You haven’t created any workouts yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {ownWorkouts.map(w => (
                <li key={w._id} style={{ marginBottom: '0.8rem' }}>
                  <Link to={`/workout/${w._id}`}>{w.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ marginTop: '2rem' }}>
          <button onClick={() => logout()} className="btn btn-primary" style={{ background: '#e74c3c' }}>
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}