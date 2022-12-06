import "./App.css";
import { useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";

export default function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  const register = async (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data)
      setRegisterResponse(data)
    });
  };

  const login = async (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        // setLoginResponse(data.token)
        localStorage.setItem("token", data.token)
      });
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
