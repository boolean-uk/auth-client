import './App.css'
import { useEffect, useState } from 'react'
import RegisterPage from './views/RegisterPage'
import LoginPage from './views/LoginPage'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' })
  const [isAuth, setIsAuth] = useState(false)

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

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true)
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            !isAuth ? (
              <Navigate to="/login" />
            ) : (
              <h1>
                You already logged in <br />{' '}
                <button onClick={logout}>Log out</button>
              </h1>
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuth ? (
              <RegisterPage
                user={user}
                handleChange={handleChange}
                clearForm={clearForm}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuth ? (
              <LoginPage
                user={user}
                handleChange={handleChange}
                clearForm={clearForm}
                setIsAuth={setIsAuth}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}
