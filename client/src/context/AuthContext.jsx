import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setUser({ email, accessToken: token });
    }
    setLoading(false);
  }, []);

  async function register(email, password) {
    const res = await fetch('http://localhost:3030/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    localStorage.setItem('authToken', data.accessToken);
    localStorage.setItem('userEmail', data.email);
    setUser({ email: data.email, accessToken: data.accessToken });
  }

  async function login(email, password) {
    const res = await fetch('http://localhost:3030/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('authToken', data.accessToken);
    localStorage.setItem('userEmail', data.email);
    setUser({ email: data.email, accessToken: data.accessToken });
  }

  function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setUser(null);
  }

  const value = { user, register, login, logout };

  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}