import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CreateWorkout() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  const newWorkout = {
    title,
    description,
    imageUrl,
    _ownerId: user.email,
    _createdOn: new Date().toISOString() // ← add this
  };

  await fetch('http://localhost:3030/jsonstore/workouts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newWorkout)
  });

  navigate('/');
};

  return (
    <main>
      <section className="section">
        <h1 className="section-title">Create New Workout</h1>
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
          <button type="submit" className="btn btn-primary">Create</button>
          <button type="button" className="btn btn-primary" style={{ marginLeft: '0.5rem' }} onClick={() => navigate(-1)}>
            Cancel
          </button>
        </form>
      </section>
    </main>
  );
}