import React, { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const domain = "dev-gb5k2jpc4ca2pcwt.us.auth0.com"; 
const clientId = "zzEu7QxMNGkQ7eTWUc8JxHck2ffuGnuU"; 

interface Auth0ProviderWrapperProps {
  children: ReactNode;
}

const Auth0ProviderWrapper: React.FC<Auth0ProviderWrapperProps> = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    // Redirect to the page the user was originally trying to access after login
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWrapper;
