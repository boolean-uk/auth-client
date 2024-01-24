# Login a user

Work inside `src/App.jsx`.

1. Create another form with two inputs, one for a username and one for a password, and a submit button.
2. When the submit button is pressed, send a request to the login route of your [auth-hashing](https://github.com/boolean-uk/auth-hashing) API using the input values. Make sure you structure the body in the way your API is expecting.
3. A successful response should contain a JSON Web Token. Save this in state and render it on the page.
4. Render an error message on the page if invalid login credentials are entered into the form.
