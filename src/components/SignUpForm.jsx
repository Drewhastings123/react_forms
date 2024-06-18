/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("The form is being submitted");
    setErrorMessage(null);
    if (!username || username.length < 8) {
      setErrorMessage("Username must be at least 8 characters long");
      return;
    }
    try {
      const response = await axios.post(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        { username: username, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data;
      setToken(result.token);
      setError(null);
      setSuccessMessage(result.message);
      setUsername("");
      setPassword("");
      //   setErrorMessage(null);
      console.log(result);
      //   .then((response) => {result(response.data);})
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="signupForm">
        <h2>Sign Up!</h2>
        {error && <p>{error}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br />
        <div>{successMessage && <p>{successMessage}</p>}</div>
      </div>
    </>
  );
}
