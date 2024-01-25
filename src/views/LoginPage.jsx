import { useState } from 'react'
import Form from '../components/Form'
import Input from '../components/Input'
import { Link } from 'react-router-dom'

const LoginPage = (user, handleChange) => {
  const [loginResponse, setLoginResponse] = useState('')

  const login = async (e) => {
    e.preventDefault()
    // Write your login code here
  }

  return (
    <>
      <h1>Login</h1>
      <p>
        Need an account? <Link to="/register">Sign up</Link>
      </p>

      <Form
        handleSubmit={login}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            handleChange={handleChange}
          />
        ]}
      />

      {loginResponse && <p>{loginResponse}</p>}
    </>
  )
}

export default LoginPage
