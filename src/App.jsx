import { useState } from "react";
import "./App.css";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";

export default function App() {
  const [registered, setRegistered] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(undefined);

  return (
    <div className="App">
      <RegisterForm setRegistered={setRegistered} registered={registered} />
      <div>
        <h2>username</h2>
        <p>{registered && registered.registeredUser.username}</p>
      </div>
      <div>
        <h2>password</h2>
        <p>{registered && registered.registeredUser.password}</p>
      </div>
      <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div>
        <h2>token</h2>
        <p>{loggedIn && loggedIn.token}</p>
      </div>
    </div>
  );
}
