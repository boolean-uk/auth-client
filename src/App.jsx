import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const newUser = {
    username: "",
    password: "",
    token: "",
  };

//   Request state
  const [user, setUser] = useState(newUser);

//   Response state
  const [saveUser, setSaveUser] = useState(newUser);
  const [error, setError] = useState("")

  function handleChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    if (inputName === "username") {
      setUser({ ...user, username: inputValue });
      // console.log(user)
    } else {
      setUser({ ...user, password: inputValue });
      // console.log(user)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(JSON.stringify(user));
    const inputName = e.target.name;

    
    fetch(`http://localhost:4000/${inputName}`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
          res.json()
          if(res.status === 401){
        setError('Invalid username or password')
        } 
      }
      )
      .then((data) => {
        if(inputName === 'login') {
        setSaveUser({...saveUser, token: data.token});
        localStorage.setItem("token", `${saveUser.token}`)

        } else {
        setSaveUser({...saveUser, username: data.user.username});
        }
      })


  }
  return (
    <>
      <div className="App">
        <form>
          <label htmlFor="">
            Username
            <input type="text" name="username" onChange={handleChange} />
          </label>
          <label htmlFor="">
            Password
            <input type="password" name="password" onChange={handleChange} />
          </label>
          <input type="submit" name="register" onClick={handleSubmit} />
        </form>

        <div>
          <p>{`Your username is: ${saveUser.username}`}</p>
          {/* <p>{`Your password is: ${saveUser.password}`}</p> */}
        </div>
      </div>
      <div>
        <form>
          <p>LOGIN</p>
          <label htmlFor="">
            Username
            <input type="text" name="username" onChange={handleChange} />
          </label>
          <label htmlFor="">
            Password
            <input type="password" name="password" onChange={handleChange} />
          </label>
          <input type="submit" name="login" onClick={handleSubmit} />
        </form>

        <div>
          <p>{`Your token is: ${saveUser.token}`}</p>
          <p>{`Error?: ${error}`}</p>
        </div>
      </div>
    </>
  );
}
