import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';
import axios from 'axios';

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [registerResponse, setRegisterResponse] = useState('');
  const [loginResponse, setLoginResponse] = useState('');

  const register = async (e) => {
    e.preventDefault();

    const registerUsername = e.target.username.value
    const registerPassword = e.target.password.value

    try {
      const { data } = await axios.post('http://localhost:4000/register', {
        headers: {
          'Content-Type': 'application/json'
        },
        username: registerUsername,
        password: registerPassword
      })
      setRegisterResponse(data.success)
    }
    catch (err) {
      setRegisterResponse(err.response.data.error)
    }
  }

  const login = async (e) => {
    e.preventDefault();
    
    const loginUsername = e.target.username.value
    const loginPassword = e.target.password.value

    try {
      const { data } = await axios.post('http://localhost:4000/login', {
        headers: {
          'Content-Type': 'application/json'
        },
        username: loginUsername,
        password: loginPassword
      })
      console.log(data)
      setLoginResponse(`${data.success} ${data.token}`)
    }
    catch (err) {
      setLoginResponse(err.response.data.error)
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
