import { useState } from "react";

const DEFAULT = {
    username: undefined,
    password: undefined,
  };
const BASE_URL = "http://localhost:4000"

function LoginForm({ setLoggedIn }) {
    const [form, setForm] = useState(DEFAULT);

    function handleSubmission(e) {
      e.preventDefault()
        const data = {
            username: form.username,
            password: form.password
        }

        const options = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
        }
        
        fetch(BASE_URL + "/login", options, data)
        .then(res => res.json())
        .then(data => console.log(data))
        .then(setLoggedIn)
    }

  return (
    <>
      <form onSubmit={handleSubmission}>
        <h2>LOGIN</h2>
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

export { LoginForm };
