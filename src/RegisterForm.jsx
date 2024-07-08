import "./App.css";
import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [registerResponse, setRegisterResponse] = useState({
    id: "",
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      });

      const json = await response.json()
      setError("");
      if (!response.ok) {
     
        setError(json.error);
        setTimeout(() => setError(""), 2000);
        return;
      }
      setFormData({
        username: "",
        password: "",
      });
      return setRegisterResponse(json.user);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-2 gap-2">
    <h2 className="text-2xl">Register</h2>
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
      {registerResponse.id && (
        <div>
          <p>Username: {registerResponse.username} </p>
          <p>Hashed password: {registerResponse.password}</p>
        </div>
      )}
    </form>
  );
}
