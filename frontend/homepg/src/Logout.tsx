// LogoutButton.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton: React.FC = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
    logout({
        returnTo: window.location.origin,  // or use any valid URL for post-logout redirect
    });
    };


  return (
    <button onClick={handleLogout}>Log Out</button>
  );
};

export default LogoutButton;
