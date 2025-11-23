import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function WorkoutDetails() {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3030/data/workouts/${workoutId}`)
      .then(res => res.json())
      .then(data => setWorkout(data))
      .catch(() => navigate('/'));
  }, [workoutId, navigate]);

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this workout?')) return;
    fetch(`http://localhost:3030/data/workouts/${workoutId}`, {
      method: 'DELETE',
      headers: { 'X-Authorization': user.accessToken }
    })
      .then(() => navigate('/'));
  };

  if (!workout) return <main>Loading...</main>;

  return (
    <main>
      <section className="section">
        <h1 className="section-title">{workout.title}</h1>
        {workout.imageUrl && <img src={workout.imageUrl} alt={workout.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '1rem' }} />}
        <p>{workout.description}</p>
        {user?.email === workout._ownerId && (
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button onClick={() => navigate(`/edit/${workoutId}`)} className="btn btn-primary">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-primary" style={{ background: '#e74c3c' }}>
              Delete
            </button>
          </div>
        )}
      </section>
    </main>
  );
}