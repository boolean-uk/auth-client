import './App.css'
import { useState } from 'react'
import RegisterPage from './views/RegisterPage'
import LoginPage from './views/LoginPage'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { value, name } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const clearForm = () => {
    setUser({ username: '', password: '' })
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/register"
          element={
            <RegisterPage
              user={user}
              handleChange={handleChange}
              clearForm={clearForm}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              user={user}
              handleChange={handleChange}
              clearForm={clearForm}
            />
          }
        />
      </Routes>
    </div>
  )
}
