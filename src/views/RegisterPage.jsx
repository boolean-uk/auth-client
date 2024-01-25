import { useState } from 'react'
import Form from '../components/Form'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = ({ user, handleChange, clearForm }) => {
  const [registerResponse, setRegisterResponse] = useState('')

  const navigate = useNavigate()

  const register = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:4000/register', user)

      setRegisterResponse(
        'Successful Registration! Redirecting to login page...'
      )

      setTimeout(() => {
        clearForm()
        navigate('/login')
      }, 2000)
    } catch (error) {
      setRegisterResponse(error.response.data.error)
    }
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
