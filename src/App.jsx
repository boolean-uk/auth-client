import { useState } from "react";
import "./App.css";
import Output from "./components/Output";
import UserLogin from "./components/login/UserLogin";
import UserRegister from "./components/register/UserRegister";

export default function App() {
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  return (
    <main id="app_container">
      <UserRegister setRegisterResponse={setRegisterResponse} />
      <UserLogin setLoginResponse={setLoginResponse} />
      <Output regRes={registerResponse} loginRes={loginResponse} />
    </main>
  );
}
