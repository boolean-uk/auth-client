import UserRegisterForm from "./UserRegisterForm";

export default function UserRegister({ setRegisterResponse }) {
  return (
    <div className="user-register">
      <h2>Register</h2>

      <UserRegisterForm setRegisterResponse={setRegisterResponse} />
    </div>
  );
}
