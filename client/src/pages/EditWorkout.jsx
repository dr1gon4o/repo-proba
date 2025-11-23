import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function EditWorkout() {
  const { workoutId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3030/data/workouts/${workoutId}`)
      .then(res => res.json())
      .then(data => {
        if (data._ownerId !== user.email) return navigate('/');
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.imageUrl || '');
      })
      .catch(() => navigate('/'));
  }, [workoutId, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3030/data/workouts/${workoutId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': user.accessToken
      },
      body: JSON.stringify({ title, description, imageUrl })
    });
    if (res.ok) navigate(`/workout/${workoutId}`);
  };

  return (
    <main>
      <section className="section">
        <h1 className="section-title">Edit Workout</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-input"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-primary" style={{ marginLeft: '0.5rem' }} onClick={() => navigate(-1)}>
            Cancel
          </button>
        </form>
      </section>
    </main>
  );
}