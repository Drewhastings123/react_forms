/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [userMessage, setUserMessage] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("The button has been clicked");
    try {
      const response = await axios.get(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.data;
      console.log(result);
      console.log(result.data);
      setSuccessMessage(result.message);
      setUserMessage(response?.data?.data?.username);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="auth">
        <h2>Authenticate!</h2>
        {successMessage && <p>{successMessage}</p>}

        {error && <p>{error}</p>}
        <button onClick={handleClick} type="button" className="btn btn-success">
          Authenticate Token
        </button>
        <br />
        {userMessage && <p>For User: {userMessage}</p>}
      </div>
    </>
  );
}
