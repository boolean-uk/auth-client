import { useState } from "react";
import "./App.css";
import { Form } from "./Form";

const DEFAULT_FORM = {
  username: undefined,
  password: undefined,
};

export default function App() {
  const [form, setForm] = useState(DEFAULT_FORM);
  return (
    <div className="App">
      <Form form={form} setForm={setForm}/>
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
