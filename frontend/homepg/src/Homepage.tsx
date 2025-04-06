import React, { useState } from "react";
import logo from './assets/happy-plant-logo.png';
import settings from './assets/settings-icon.png';
import HomeContent from "./HomeContent";
import YourPosts from "./UserContent";
import ChoosePlant from "./ChoosePlant";
import Profile from "./UserProfile";
import IdentifyPlant from "./IdentifyPlant";
import Chatbot from "./Chatbot";
import { useEffect } from 'react'
import "./Homepage.css";

type ActivePage = "home" | "choosePlant" | "yourPosts" | "profile" | "identifyPlant" | "Chatbot";


const Homepage: React.FC = () => {
  const [language, setLanguage] = useState<string>("English");
  const [activePage, setActivePage] = useState<ActivePage>("home");
  console.log("Current Page:", activePage);

  const handleButtonClick = (page: ActivePage) => {
    console.log('Button clicked, setting page to:', page);
    setActivePage(page);
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
    <div className = "background">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo Image" width="80px" />
        </div>
        <h2 className="title">WELCOME TO THE PLANTFACE EXTRAVAGANZA!</h2>
        <ul className="headerlist">
          <li><button className="button"> Language<br />settings </button></li>
          <li className="settings">
            <button className="button">
            <img src={settings} alt="Settings Icon" width="80px" />
            </button>
          </li>
        </ul>
      </header>

      <nav className="navbar">
        <ul>
        {navItems.map((item) => (
            <li key={item.id} style={{ margin: '0 10px' }}>
              <button
                onClick={() => handleButtonClick(item.id)}
                style={{
                  padding: '10px 15px',
                  backgroundColor: activePage === item.id ? '#4CAF50' : '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
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
