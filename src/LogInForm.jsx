import "./App.css";
import { useState } from "react";

export default function LogInForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [response, setResponse] = useState('');

  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error)
        setTimeout(() => setError(""), 2000);
        return;
      }
      setResponse(json.token)
      localStorage.setItem('jwt', json.token)
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-2 gap-2">
      <h2 className="text-2xl">Log In</h2>

      <label htmlFor="username">Username</label>
      <input
        onChange={handleChange}
        name="username"
        type="textbox"
        className="border w-44"
        value={formData.username}
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={handleChange}
        name="password"
        type="password"
        className="border w-44"
        value={formData.password}
      />
      <button className="w-44 h-8 bg-slate-300 rounded-md mt-2">Submit</button>
      {error && <p className="text-red-600">{error}</p>}
      {response && <p>Token: {response}</p>}
    </form>
  );
}
