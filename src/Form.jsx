import { useState } from "react";

const DEFAULT = {
    username: undefined,
    password: undefined,
  };
const BASE_URL = "http://localhost:4000"

function Form({ setResults }) {
    const [form, setForm] = useState(DEFAULT);


    function handleSubmission() {
        
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
        .then(setResults)
    }

  return (
    <>
      <form onSubmit={handleSubmission}>
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

export { Form };
