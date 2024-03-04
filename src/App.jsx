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
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setRegisterResponse(data.message);
    } catch (error) {
      console.error('Error registering:', error);
      setRegisterResponse('Error registering. Please try again.');
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token); // Saving token to local storage
      }
      setLoginResponse(data.message);
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginResponse('Error logging in. Please try again.');
    }
  };


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

      {registerResponse && <p>{registerResponse}</p>}

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
