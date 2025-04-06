import React from "react";
import logo from './assets/happy-plant-logo.png';
import settings from './assets/settings-icon.png';
import "./Homepage.css";

const Homepage: React.FC = () => {
  return (
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
  );
};

export default Homepage;
