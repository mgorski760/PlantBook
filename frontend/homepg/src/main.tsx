import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWrapper from "./Auth0ProviderWrapper"; // Import your Auth0ProviderWrapper
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWrapper>
        <App />
      </Auth0ProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>
);