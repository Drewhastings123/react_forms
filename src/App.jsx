import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";
import "./App.css";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} />
    </>
  );
}

export default App;
