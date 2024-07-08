import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [registerResponse, setRegisterResponse] = useState('');
  const [loginResponse, setLoginResponse] = useState('');

  const register = async (e) => {
    e.preventDefault();
    // Write your register code here
    if (user.username.length < 5) {
      alert('Username must be at least 5 characters long')
      return; 
    }

    if(user.password.length < 8) {
      alert('Password must be at 8 characters or longer')
      return;
    }
    const registerRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }

    fetch('http://localhost:4000/register/', registerRequest)
      .then(res => res.json())
      .then(data => setRegisterResponse(data.user))
  };

  const login = async (e) => {
    e.preventDefault();
    // Write your login code here
    const loginRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }

    fetch('http://localhost:4000/login/', loginRequest)
      .then(res => res.json())
      .then(data => setLoginResponse(data.user))
      .then(localStorage.setItem(user.username, loginResponse))
  };

  // You can safely ignore everything below this line, it's just boilerplate
  // so you can focus on the exercise requirements

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value
    });
  }

  return (
    <div className="App">

      <h1>Register</h1>

      <Form
        handleSubmit={register}
        inputs={[
          <Input
            key={1}
            type='text'
            name='username'
            placeholder='Username'
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type='password'
            name='password'
            placeholder='Password'
            value={user.password}
            handleChange={handleChange}
          />
        ]}
      />

      {registerResponse && <p>{registerResponse.username}</p>}

      <h1>Login</h1>

      <Form
        handleSubmit={login}
        inputs={[
          <Input
            key={1}
            type='text'
            name='username'
            placeholder='Username'
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type='password'
            name='password'
            placeholder='Password'
            value={user.password}
            handleChange={handleChange}
          />
        ]}
      />

      {loginResponse && <p>{loginResponse}</p>}

    </div>
  );
}
