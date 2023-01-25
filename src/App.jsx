import "./App.css";
import { useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";

export default function App() {
	const [user, setUser] = useState({ username: "", password: "" });
	const [registerResponse, setRegisterResponse] = useState("");
	const [loginResponse, setLoginResponse] = useState("");

	const register = async (event) => {
		event.preventDefault();
		// Write your register code here

		const username = event.target[0].value;
		const password = event.target[1].value;

		const body = {
			username: username,
			password: password,
		};

		fetch("http://localhost:4000/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then((data) => {
				// setRegisterResponse(Object.values(data)[0]);
				const keyName = Object.keys(data)[0];

				if (keyName === "user") {
					setRegisterResponse("Registered succesfully");
				} else {
					setRegisterResponse("Error: Username already exists");
				}
			});
	};

	const login = async (event) => {
		event.preventDefault();
		// Write your login code here

		const username = event.target[0].value;
		const password = event.target[1].value;

		const body = {
			username: username,
			password: password,
		};
		console.log("this is the body", body);
		console.log("before the fetch");

		fetch("http://localhost:4000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then((data) => {
				const keyName = Object.keys(data)[0];
				console.log("this is my data", data);
				if (keyName === "accessToken") {
					setLoginResponse("Login succesful");
					localStorage.setItem("LoginAccessToken", data.accessToken);
				} else {
					setLoginResponse("Error: Username or Password are invalid!");
				}
			});
	};

	// You can safely ignore everything below this line, it's just boilerplate
	// so you can focus on the exercise requirements

	const handleChange = (e) => {
		const { value, name } = e.target;

		setUser({
			...user,
			[name]: value,
		});
	};

	return (
		<div className="App">
			<h1>Register</h1>

			<Form
				handleSubmit={register}
				inputs={[
					<Input
						key={1}
						type="text"
						name="username"
						placeholder="Username"
						value={user.username}
						handleChange={handleChange}
					/>,
					<Input
						key={2}
						type="password"
						name="password"
						placeholder="Password"
						value={user.password}
						handleChange={handleChange}
					/>,
				]}
			/>

			{registerResponse && <p>{registerResponse}</p>}

			<h1>Login</h1>

			<Form
				handleSubmit={login}
				inputs={[
					<Input
						key={1}
						type="text"
						name="username"
						placeholder="Username"
						value={user.username}
						handleChange={handleChange}
					/>,
					<Input
						key={2}
						type="password"
						name="password"
						placeholder="Password"
						value={user.password}
						handleChange={handleChange}
					/>,
				]}
			/>

			{loginResponse && <p>{loginResponse}</p>}
		</div>
	);
}
