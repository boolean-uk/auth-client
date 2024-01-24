import "./App.css";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

export default function App() {
  return (
    <div className="App">
      <RegistrationForm />
      <LoginForm />
    </div>
  );
}
