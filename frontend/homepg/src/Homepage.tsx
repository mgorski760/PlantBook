import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import logo from './assets/happy-plant-logo.png';
import settings from './assets/settings-icon.png';
import HomeContent from "./HomeContent";
import YourPosts from "./UserContent";
import ChoosePlant from "./ChoosePlant";
import Profile from "./UserProfile";
import IdentifyPlant from "./IdentifyPlant";
import Chatbot from "./Chatbot";
import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import "./Homepage.css";


type ActivePage = "home" | "choosePlant" | "yourPosts" | "profile" | "identifyPlant" | "Chatbot";


const Homepage: React.FC = () => {
  const [language, setLanguage] = useState<string>("English");
  const [activePage, setActivePage] = useState<ActivePage>("home"); // Changed initial state to "home"
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  
  console.log("Current Page:", activePage);

  const handleButtonClick = (page: ActivePage) => {
    console.log('Button clicked, setting page to:', page);
    setActivePage(page);
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const navItems: { id: ActivePage; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "choosePlant", label: "Choose Plant" },
    { id: "yourPosts", label: "Your Posts" },
    { id: "profile", label: "Profile" },
    { id: "identifyPlant", label: "Identify Plant" },
    { id: "Chatbot", label: "Chatbot" }
  ];

  const renderContent = () => {
    console.log("Rendering content for:", activePage);
    switch (activePage) {
      case "home":
        return <HomeContent />;
      case "yourPosts":
        return <YourPosts />;
      case "choosePlant":
        return <ChoosePlant />;
      case "profile":
        return <Profile />;
      case "identifyPlant":
        return <IdentifyPlant />;
      case "Chatbot":
        return <Chatbot />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="background">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo Image" width="80px" />
        </div>
        <h2 className="title">WELCOME TO PlantBook</h2>
        <div className="header-right">
          {isAuthenticated ? (
            <div className="header-user-info">
              <div className="header-user-greeting">
                <span>Hello, </span>
                <span className="header-username" onClick={() => handleButtonClick("profile")}>
                  {user?.name}
                </span>
              </div>
              <div className="header-avatar" onClick={() => handleButtonClick("profile")}>
                <img src={user?.picture} alt="Profile" />
              </div>
              <button className="header-logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <div className="header-auth">
              <Login />
            </div>
          )}
        </div>
      </header>

      <nav className="navbar">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} style={{ margin: '0 10px' }}>
              <button
                onClick={() => {
                  console.log("Clicked:", item.id);
                  handleButtonClick(item.id);
                }}
                className={`nav-button ${activePage === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Homepage;
