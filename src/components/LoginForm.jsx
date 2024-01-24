import { useState } from "react";
import { postForm } from "../utils/fetch.util";

const INITIAL_STATE = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [response, setResponse] = useState();
  const [formSubmitted, setFormSubmitted] = useState(null);

  async function submitForm(e) {
    e.preventDefault();

    const submission = await postForm(formData, "login");
    setResponse(submission);
    if (submission.status === 201) {
      setFormSubmitted(true);
      localStorage.setItem("userToken", submission.token)
      return;
    }
    setFormSubmitted(false);
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <label>
          Username
          <input
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
            value={formData.username}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
          />
          <button type="submit">Register</button>
        </label>
      </form>
      {formSubmitted === true && <div>Successfully logged in!</div>}
      {formSubmitted === false && <div>Failed to login.</div>}
      {response && <div>{JSON.stringify(response)}</div>}
    </>
  );
}
