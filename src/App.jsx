import { useState } from 'react';
import './App.css';


export default function App() {

    const newUser = {
        username: "",
        password: ""
    }

    const [user, setUser] = useState(newUser)

    function handleChange(e) {
        const inputName = e.target.name
        const inputValue = e.target.value

        if(inputName === "username"){
            setUser({...user, username: inputValue})
            // console.log(user)
        } else {
            setUser({...user, password: inputValue})
            // console.log(user)

        }

    }

    function handleSubmit(e) {
        e.preventdefault()
        
        fetch(`http://localhost:4000/npcs`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
    })
    }
    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    Username
                    <input type="text" name="username" onChange={handleChange}/>
                </label>
                <label htmlFor="">
                    Password
                    <input type="password" name="password" onChange={handleChange} />
                </label>
                <input type='submit' />
            </form>

        </div>
    );
}
