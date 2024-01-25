import { useState } from 'react'
import Form from '../components/Form'
import Input from '../components/Input'
import { Link } from 'react-router-dom'

const RegisterPage = (user, handleChange) => {
  const [registerResponse, setRegisterResponse] = useState('')

  const register = async (e) => {
    e.preventDefault()
    // Write your register code here
  }

  return (
    <>
      <h1>Register</h1>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>

      <Form
        handleSubmit={register}
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

      {registerResponse && <p>{registerResponse}</p>}
    </>
  )
}

export default RegisterPage
