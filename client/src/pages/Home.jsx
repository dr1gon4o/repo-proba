// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/workouts')
      .then(res => res.json())
      .then(data => {
        const list = Object.entries(data || {}).map(([id, w]) => ({ ...w, _id: id }));
        setWorkouts(list);
      })
      .catch(() => setWorkouts([]));
  }, []);

  return (
    <>
      <div className="welcome-area">
        <div className="header-text">
          <h1>StreetFit Blog</h1>
          <p>Your daily source of street workout inspiration</p>
          {user && <Link to="/create" className="main-button">+ Add New Workout</Link>}
        </div>
      </div>

      <section className="section">
        <div className="center-heading">
          <h2 className="section-title">Latest Workouts</h2>
        </div>
        <div className="row">
          {workouts.length === 0 ? (
            <p className="center-text" style={{ gridColumn: '1 / -1', width: '100%' }}>
              No workouts yet.
            </p>
          ) : (
            workouts.map(workout => (
              <div className="col-lg-4" key={workout._id}>
                <div className="features-small-item">
                  <div className="icon">💪</div>
                  <h4 className="features-title">{workout.title}</h4>
                  <p>
                    {workout.description?.length > 100
                      ? workout.description.slice(0, 100) + '...'
                      : workout.description}
                  </p>
                  <Link to={`/workout/${workout._id}`} className="main-button">Read More</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}