import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";

const RegisterPage = ({ userData, handleInputChange, clearForm }) => {
  const [registerResponse, setRegisterResponse] = useState("");

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/register", userData);

      setRegisterResponse(
        "Successful Registration! Redirecting to login page..."
      );

      setTimeout(() => {
        clearForm();
        navigate("/login");
      }, 2000);
    } catch (error) {
      setRegisterResponse(error.response.data.error);
    }
  };

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

      {registerResponse && <p>{registerResponse}</p>}
    </>
  );
};

export default RegisterPage;
