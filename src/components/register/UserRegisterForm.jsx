import { useState } from "react";
import { INITIAL_STATE } from "../../constants";
import api from "../../api/axios";

export default function UserRegisterForm({ setRegisterResponse }) {
  const [userRegister, setUserRegister] = useState(INITIAL_STATE);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", userRegister);

      if (res.status === 201) {
        const form = document.querySelector(".form");

        setUserRegister(INITIAL_STATE);
        setRegisterResponse("Registration Successful");

        form.reset();
      } else {
        setRegisterResponse("Registration Failed");
      }
    } catch (err) {
      console.log(err);
      setRegisterResponse(
        `${
          err.response.data.error ??
          "An error occurred while attempting to register"
        }. Please try again later`
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserRegister({ ...userRegister, [name]: value });
  };

  return (
    <form className="form">
      <label htmlFor="username">
        <b>Username:</b>
        <input
          type="text"
          name="username"
          placeholder="user321"
          required
          onChange={(e) => handleChange(e)}
        />
      </label>

      <label htmlFor="password">
        <b>Password:</b>
        <input
          type="password"
          name="password"
          placeholder="password123"
          required
          onChange={(e) => handleChange(e)}
        />
      </label>

      <button className="submit-form register" onClick={handleRegisterSubmit}>
        Register
      </button>
    </form>
  );
}
