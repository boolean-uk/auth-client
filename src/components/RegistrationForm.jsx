import { useState } from "react";
import { postForm } from "../utils/fetch.util";

const INITIAL_STATE = {
  username: "",
  password: "",
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [response, setResponse] = useState();
  const [formSubmitted, setFormSubmitted] = useState(null);

  async function submitForm(e) {
    e.preventDefault();

    const submission = await postForm(formData, "register");
    setResponse(submission);
    if (submission.status === 201) {
      setFormSubmitted(true);
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
      {formSubmitted === true && <div>Successfully Registered!</div>}
      {formSubmitted === false && <div>Failed to register.</div>}
      {response && <div>{JSON.stringify(response)}</div>}
    </>
  );
}
