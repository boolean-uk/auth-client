import { useState } from "react";
import { INITIAL_STATE } from "../../constants";
import api from "../../api/axios";

export default function UserLoginForm({ setLoginResponse }) {
  const [userLogin, setUserLogin] = useState(INITIAL_STATE);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", userLogin);

      if (res.status === 201) {
        const form = document.querySelector(".form");

        console.log(res);

        setUserLogin(INITIAL_STATE);
        setLoginResponse(res.data.token);

        form.reset();
      } else {
        setLoginResponse("Login Failed");
      }
    } catch (err) {
      console.log(err);
      setLoginResponse(
        `${
          err.response.data.error ??
          "An error occurred while attempting to login"
        }. Please try again later`
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserLogin({ ...userLogin, [name]: value });
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

      <button className="submit-form login" onClick={handleLoginSubmit}>
        Login
      </button>
    </form>
  );
}
