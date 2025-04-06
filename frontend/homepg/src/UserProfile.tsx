import React from "react";
import Profilepic from './assets/Profilepic.png';
import "./Homepage.css"; 


const UserProfile: React.FC = () => {
  return (
    <div className="profile">
    <h3>Hello Imaginary WonderWoman</h3><br/>
      <ul className="profilelist">
          <li className="items">
            <img src={Profilepic} alt="Profile"/>
              <ul>
                <li className="items">Change Profile</li>
                <li className="items">Email | Phone number</li>
                <li className="items">Bio</li>
                <li className="items">Logout</li>
              </ul>
          </li>
      </ul>
    </div>
  );
};

export default UserProfile;
