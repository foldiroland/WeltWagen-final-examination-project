import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');

    } catch (error) { 
      setError('Nem sikerült csatlakozni a szerverhez.');
    }
  } 

  return (
    <div>
      <h1>login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='nev'/>
        <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder='jelszo' onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Bejelentkezes</button>
      </form>
    </div>
  )
}

export default Login
