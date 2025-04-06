import React from "react";
import Profilepic from './assets/Profilepic.png';
import "./Homepage.css"; 


const UserProfile: React.FC = () => {
  return (
    <div className="profile">
    <h3>Hello Imaginary WonderWoman</h3><br/>
      <ul className="profilelist">
          <li className="profileitems">
            <img src={Profilepic} alt="Profile"/>
              <ul>
                <li className="profileitems">Change Profile</li>
                <li className="profileitems">Email | Phone number</li>
                <li className="profileitems">Bio</li>
                <li className="profileitems">Logout</li>
              </ul>
          </li>
      </ul>
    </div>
  );
};

export default UserProfile;
