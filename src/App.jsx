import "./App.css";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";

export default function App() {
  const [user, setUser] = useState(() => {
    // Retrieve stored user data from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { username: "", password: "" };
  });
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  const register = async (e) => {
    e.preventDefault();
    // Write your register code here
    const { username, password } = user;

    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      };
      const response = await fetch("http://localhost:4000/register", option);

      if (response.ok) {
        const result = await response.json();
        setRegisterResponse(result.user.username);
        setUser({ username: "", password: "" });
        localStorage.clear();
      } else {
        const errorResult = await response.json();
        setRegisterResponse(errorResult.error);
      }
    } catch (error) {
      setRegisterResponse(error.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    // Write your login code here
    const { username, password } = user;

    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      };

      const response = await fetch("http://localhost:4000/login", option);

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.token);
        setLoginResponse(result.token);
        setUser({ username: "", password: "" });
        localStorage.removeItem("user");
      } else {
        const errorResult = await response.json();
        setLoginResponse(errorResult.error);
      }
    } catch (error) {
      setLoginResponse(error.message);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser((prevUser) => {
      const updatedUser = { ...prevUser, [name]: value };
      // Store updated user data in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <div className="App">
      <h1>Register</h1>

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
          />,
        ]}
      />

      {registerResponse && <p>{registerResponse}</p>}

      <h1>Login</h1>

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
          />,
        ]}
      />

      {loginResponse && <p>{loginResponse}</p>}
    </div>
  );
}
