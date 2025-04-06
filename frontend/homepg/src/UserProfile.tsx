import React from "react";
import Profilepic from './assets/Profilepic.png';
import "./Homepage.css"; 
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to see your profile.</div>;
  }

  return (
    <div className="profile">
    <h3>Hello {user?.name}</h3><br/>
      <ul className="profilelist">
          <li className="profileitems">
            <img src={user?.picture} alt="Profile"/>
              <ul>
                <li className="profileitems">Change Profile</li>
                <li className="profileitems">Email {user?.email}</li>
                <li className="profileitems">Bio {user?.bio || "No bio available"}</li>
                <li className="profileitems">Logout</li>
              </ul>
          </li>
      </ul>
    </div>
  );
};

export default UserProfile;