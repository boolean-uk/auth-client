import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

const baseURL = "http://localhost:4000"

export default function App() {
	const initUser = { username: '', password: '' }
  const [user, setUser] = useState(initUser);
  const [registerResponse, setRegisterResponse] = useState('');
  const [loginResponse, setLoginResponse] = useState('');

  const register = async (e) => {
    e.preventDefault();
    // Write your register code here

  };

  const login = async (e) => {
    e.preventDefault();
    // Write your login code here
		const options = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(user)
		}

		try {
			const response = await fetch(`${baseURL}/login`, options)
			if (response.status !== 200) throw new Error("invalid credentials")
			setLoginResponse(`${user.username} logged in`)
		} catch (error) {
			setLoginResponse(error.message)
			setUser(initUser)
		}
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
