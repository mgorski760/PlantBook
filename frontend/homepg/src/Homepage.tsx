import React, { useState } from "react";
import logo from './assets/happy-plant-logo.png';
import settings from './assets/settings-icon.png';
import HomeContent from "./HomeContent";
import YourPosts from "./UserContent";
import ChoosePlant from "./ChoosePlant";
import Profile from "./UserProfile";
import IdentifyPlant from "./IdentifyPlant";
import "./Homepage.css";

type ActivePage = "home" | "choosePlant" | "yourPosts" | "profile" | "identifyPlant";


const Homepage: React.FC = () => {
  const [language, setLanguage] = useState<string>("English");
  const [activePage, setActivePage] = useState<ActivePage>("yourPosts");
  console.log("Current Page:", activePage);

  const navItems: { id: ActivePage; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "choosePlant", label: "Choose Plant" },
    { id: "yourPosts", label: "Your Posts" },
    { id: "profile", label: "Profile" },
    { id: "identifyPlant", label: "Identify Plant" }
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
              <li key={item.id}>
                <button
                  onClick={() => setActivePage(item.id)}
                  className={activePage === item.id ? "active" : ""}>
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
