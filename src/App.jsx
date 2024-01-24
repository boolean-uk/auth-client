import { useState } from "react";
import "./App.css";
import { Form } from "./Form";

const DEFAULT = {
  username: undefined,
  password: undefined,
};

export default function App() {

  const [results, setResults] = useState(DEFAULT);


  return (
    <div className="App">
      <Form setResult={setResults}/>
      <div>
        <h2>username</h2>
        <p>{results.username}</p>
      </div>
      <div>
        <h2>password</h2>
        <p>{results.password}</p>
      </div>
    </div>
  );
}
