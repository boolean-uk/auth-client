import React, { useState } from 'react';

function Form({ type }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = type === 'register' ? 'http://localhost:4000/register' : 'http://localhost:4000/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (type === 'login' && data.token) {
      localStorage.setItem('token', data.token);
    }

    console.log('Response:', data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">
        {type === 'register' ? 'Register' : 'Login'}
      </button>
    </form>
  );
}

export default Form;
