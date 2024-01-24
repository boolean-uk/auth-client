import { useState } from "react";
import "./App.css";

const DEFAULT_FORM = {
  username: undefined,
  password: undefined,
};

export default function App() {
  const [form, setForm] = useState(DEFAULT_FORM);

  return (
    <div className="App">
      <form>
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
      <div>
        <h2>username</h2>
        <p></p>
      </div>
      <div>
        <h2>password</h2>
        <p></p>
      </div>
    </div>
  );
}
