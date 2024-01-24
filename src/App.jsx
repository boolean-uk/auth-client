import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

const URL = "http://localhost:4000"

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [registerResponse, setRegisterResponse] = useState('');
  const [loginResponse, setLoginResponse] = useState('');

  const register = async (e) => {
    e.preventDefault();

    const data = {
      username: user.username,
      password: user.password
    }

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }

      fetch(`${URL}/register`, options)
        .then(res => res.json())
        .then(data => {
          console.log("DATA", data)
          if (!data.user) {
            setRegisterResponse(data.error)
            return
          } else {
            setRegisterResponse(data.user.username)
            localStorage.setItem("token", data.token)
            return
          }

        })

    }
    catch (err) {
      setRegisterResponse(err.message)
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const data = {
      username: user.username,
      password: user.password
    }

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }

      fetch(`${URL}/login`, options)
        .then(res => res.json())
        .then(data => {

          if (!data.token) {
            setLoginResponse(data.error)
            return
          } else {
            setLoginResponse(data.token)
            localStorage.setItem("token", data.token)
            return
          }
        })
    }
    catch (err) {
      setLoginResponse(err.message)
    }
  }


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
