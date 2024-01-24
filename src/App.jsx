import "./App.css";
import { useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";

export default function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const URL = "http://localhost:4000";
  const register = async (e) => {
    e.preventDefault();
    // Write your register code here
    const data = {
      username: user.username,
      password: user.password,
    };

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(`${URL}/register`, options);
      const responseData = await response.json();

      if (!responseData.user) {
        setRegisterResponse(responseData.error);
      } else {
        const { user: registeredUser, token } = responseData;
        setRegisterResponse(registeredUser.username);
        localStorage.setItem("token", token);
      }
    } catch (err) {
      setRegisterResponse(err.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const data = {
      username: user.username,
      password: user.password,
    };

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(`${URL}/login`, options);
      const responseData = await response.json();

      if (!responseData.token) {
        setLoginResponse(responseData.error);
      } else {
        const { token } = responseData;
        setLoginResponse(token);
        localStorage.setItem("token", token);
      }
    } catch (err) {
      setLoginResponse(err.message);
    }
  };

  // You can safely ignore everything below this line, it's just boilerplate
  // so you can focus on the exercise requirements

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value,
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
