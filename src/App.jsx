import "./App.css";
import { useEffect, useState } from "react";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  const [userState, setUserState] = useState({ username: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const clearForm = () => {
    setUserState({ username: "", password: "" });
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" />
            ) : (
              <h1>
                You're already logged in <br />{" "}
                <button onClick={logout}>Log out</button>
              </h1>
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <RegisterPage
                userData={userState}
                handleInputChange={handleInputChange}
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
            !isAuthenticated ? (
              <LoginPage
                userData={userState}
                handleInputChange={handleInputChange}
                clearForm={clearForm}
                setIsAuthenticated={setIsAuthenticated}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
