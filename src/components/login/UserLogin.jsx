import UserLoginForm from "./UserLoginForm";

export default function UserLogin({ setLoginResponse }) {
  return (
    <div className="user-login">
      <h2>Login</h2>

      <UserLoginForm setLoginResponse={setLoginResponse} />
    </div>
  );
}
