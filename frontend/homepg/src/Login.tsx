import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Homepage.css";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <button className = "button" onClick={handleLogin}>Log In</button>
  );
};

export default LoginButton;
