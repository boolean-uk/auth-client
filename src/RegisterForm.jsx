import { useEffect, useState } from "react";

const DEFAULT = {
    username: undefined,
    password: undefined,
  };
const BASE_URL = "http://localhost:4000"

function RegisterForm({ setRegistered }) {
    const [form, setForm] = useState(DEFAULT);

    function handleSubmission(e) {
      e && e.preventDefault()
        const data = {
            username: form.username,
            password: form.password
        }

        const options = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
        }
        
        fetch(BASE_URL + "/register", options, data)
        .then(res => res.json())
        .then(setRegistered)
    }

    useEffect(handleSubmission, [])
  return (
    <>
      <form onSubmit={handleSubmission}>
        <h2>REGISTER</h2>
        <label>
          username:
          <input
            name="username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            type="text"
          />
        </label>
        <label>
          password:
          <input
            name="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            type="text"
          />
        </label>
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
}

export { RegisterForm };
