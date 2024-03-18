import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";

const LoginPage = ({
  userData,
  handleInputChange,
  clearForm,
  setIsAuthenticated,
}) => {
  const [loginResponse, setLoginResponse] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        userData
      );

      localStorage.setItem("token", response.data.token);
      setLoginResponse("Successful Login! Redirecting to home page...");

      setTimeout(() => {
        setIsAuthenticated(true);
        clearForm();
      }, 2000);
    } catch (error) {
      setLoginResponse(error.response.data.error);
    }
  };

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
            value={userData.username}
            handleChange={handleInputChange}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            handleChange={handleInputChange}
          />,
        ]}
      />

      {loginResponse && <p>{loginResponse}</p>}
    </>
  );
};

export default LoginPage;
