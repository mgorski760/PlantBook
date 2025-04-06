import React from "react";
import logo from './assets/happy-plant-logo.png';
import plant1 from './assets/Plant1.png';
import plant2 from './assets/Plant2.png';
import plant3 from './assets/Plant3.png';
import plant4 from './assets/Plant4.png';
import plant5 from './assets/Plant5.png';
import plant6 from './assets/Plant6.png';
import plant7 from './assets/Plant7.png';
import plant8 from './assets/Plant8.png';
import settings from './assets/settings-icon.png';
import "./Homepage.css";

const Homepage: React.FC = () => {
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

      <div className="navbar">
        <ul>
          <li><a href="#home">Home</a></li> {/* Non-Functional link */}
          <li><a href="#choose_plant">Choose Plant</a></li> {/* Functional Link */}
          <li><a href="#posts">Your Posts</a></li> {/* Functional Link */}
        </ul>
      </div>

      <div>
      <div>
      <ul className="plant-list">
        <li className="items">
          <button className="button">
            <img src={plant1} alt="Plant 1" />
            <ul>
              <li className="items">Succulent</li>
              <li className="items">Post by: Imaginary Wonderwoman</li>
              <li className="items">Comment</li>
              <li className="items">Like</li>
              <li className="items">Share</li>
            </ul>
          </button>
        </li>

        <li className="items">
          <button className="button">
            <img src={plant2} alt="Plant 2" />
            <ul>
            <li className="items">Succulent</li>
              <li className="items">Post by: Imaginary Wonderwoman</li>
              <li className="items">Comment</li>
              <li className="items">Like</li>
              <li className="items">Share</li>
            </ul>
          </button>
        </li>

        <li className="items">
          <button className="button">
            <img src={plant3} alt="Plant 3" />
            <ul>
            <li className="items">Succulent</li>
              <li className="items">Post by: Imaginary Wonderwoman</li>
              <li className="items">Comment</li>
              <li className="items">Like</li>
              <li className="items">Share</li>
            </ul>
          </button>
        </li>

        <li className="items">
          <button className="button">
            <img src={plant4} alt="Plant 4" />
            <ul>
            <li className="items">Succulent</li>
              <li className="items">Post by: Imaginary Wonderwoman</li>
              <li className="items">Comment</li>
              <li className="items">Like</li>
              <li className="items">Share</li>
            </ul>
          </button>
        </li>

        <li className="items">
          <button className="button">
            <img src={plant4} alt="Plant 4" />
            <ul>
            <li className="items">Succulent</li>
              <li className="items">Post by: Imaginary Wonderwoman</li>
              <li className="items">Comment</li>
              <li className="items">Like</li>
              <li className="items">Share</li>
            </ul>
          </button>
        </li>

        <li className="items">
          <button className="button">
            <img src={plant5} alt="Plant 5" />
            <ul>
            <li className="items">Succulent</li>
              <li className="items">Post by: Imaginary Wonderwoman</li>
              <li className="items">Comment</li>
              <li className="items">Like</li>
              <li className="items">Share</li>
            </ul>
          </button>
        </li>

        <li className="items">
          <button className="button">
            <img src={plant6} alt="Plant 6" />
            <ul>
            <li className="items">Succulent</li>
              <li className="items">Post by: Imaginary Wonderwoman</li>
              <li className="items">Comment</li>
              <li className="items">Like</li>
              <li className="items">Share</li>
            </ul>
          </button>
        </li>

        <li className="items">
          <button className="button">
            <img src={plant7} alt="Plant 7" />
            <ul>
            <li className="items">Succulent</li>
              <li className="items">Post by: Imaginary Wonderwoman</li>
              <li className="items">Comment</li>
              <li className="items">Like</li>
              <li className="items">Share</li>
            </ul>
          </button>
        </li>

        <li className="items">
          <button className="button">
            <img src={plant8} alt="Plant 8" />
            <ul>
            <li className="items">Succulent</li>
              <li className="items">Post by: Imaginary Wonderwoman</li>
              <li className="items">Comment</li>
              <li className="items">Like</li>
              <li className="items">Share</li>
            </ul>
          </button>
        </li>

      </ul>
    </div>
      </div>
    </div>
    
  );
};

export default Homepage;
