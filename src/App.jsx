import { useState } from "react";
import "./App.css";
import { RegisterForm } from "./Form";

export default function App() {
  const [results, setResults] = useState(undefined);

  return (
    <div className="App">
      <RegisterForm setResult={setResults} result={results} />
      <div>
        <h2>username</h2>
        <p>{results && results.registeredUser.username}</p>
      </div>
      <div>
        <h2>password</h2>
        <p>{results && results.registeredUser.password}</p>
      </div>
    </div>
  );
}
