import React, { useState } from 'react';

function App() {
  const [registerResponse, setRegisterResponse] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);

  const register = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setRegisterResponse(data);
  };

  const login = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setLoginResponse(data);

    // Store the JWT in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={register}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      {registerResponse && <p>{JSON.stringify(registerResponse)}</p>}

      <h1>Login</h1>
      <form onSubmit={login}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      {loginResponse && <p>{JSON.stringify(loginResponse)}</p>}
    </div>
  );
}

export default App;
