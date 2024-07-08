import "./App.css";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";

export default function App() {

  return (
    <div className="App p-2">
      <p className="text-4xl">Mighty Authing Power Rangers</p>
      <RegisterForm />
      <LogInForm />
    </div>
  );
}
