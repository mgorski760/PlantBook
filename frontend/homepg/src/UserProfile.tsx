import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Homepage.css"; 

interface UserStats {
  totalPosts: number;
  favoritePlants: string[];
  joinDate: string;
  reputation: number;
}

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [userBio, setUserBio] = useState<string>("");
  const [userStats, setUserStats] = useState<UserStats>({
    totalPosts: 0,
    favoritePlants: [],
    joinDate: "",
    reputation: 0
  });

  useEffect(() => {
    // Set initial bio from user profile if available
    if (user && user.bio) {
      setUserBio(user.bio);
    } else {
      setUserBio("I love plants and gardening!");
    }

    // Simulate fetching user stats from an API
    const fetchUserStats = () => {
      // This would normally be an API call
      setTimeout(() => {
        setUserStats({
          totalPosts: Math.floor(Math.random() * 50),
          favoritePlants: ["Monstera", "Snake Plant", "Fiddle Leaf Fig"],
          joinDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
          reputation: Math.floor(Math.random() * 100)
        });
      }, 1000);
    };

    if (isAuthenticated) {
      fetchUserStats();
    }
  }, [user, isAuthenticated]);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const handleSaveBio = () => {
    // In a real app, this would save to the database
    setIsEditing(false);
    // API call would go here
    console.log("Bio saved:", userBio);
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="profile-loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="profile-not-logged-in">
        <h3>Please Log In</h3>
        <p>You need to log in to view and manage your profile.</p>
        <div className="login-benefits">
          <h4>Benefits of logging in:</h4>
          <ul>
            <li>Track your plant collection</li>
            <li>Share your plants with the community</li>
            <li>Get personalized plant care recommendations</li>
            <li>Connect with other plant enthusiasts</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover-photo"></div>
        <div className="profile-avatar-container">
          <img 
            src={user?.picture} 
            alt="Profile" 
            className="profile-avatar" 
          />
        </div>
        <div className="profile-name-container">
          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <div className="profile-section-header">
            <h3>About Me</h3>
            {!isEditing && (
              <button 
                className="profile-edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
          
          {isEditing ? (
            <div className="profile-bio-editor">
              <textarea
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                className="profile-bio-input"
                placeholder="Tell us about yourself and your love for plants..."
                rows={4}
              />
              <div className="profile-bio-actions">
                <button 
                  className="profile-save-button"
                  onClick={handleSaveBio}
                >
                  Save
                </button>
                <button 
                  className="profile-cancel-button"
                  onClick={() => {
                    setIsEditing(false);
                    // Reset to original bio if canceled
                    setUserBio(user?.bio || "I love plants and gardening!");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="profile-bio">{userBio}</p>
          )}
        </div>

        <div className="profile-section">
          <h3>My Plant Stats</h3>
          <div className="profile-stats-grid">
            <div className="profile-stat-card">
              <div className="profile-stat-value">{userStats.totalPosts}</div>
              <div className="profile-stat-label">Plants Posted</div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-value">{userStats.reputation}</div>
              <div className="profile-stat-label">Plant Reputation</div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-value">{userStats.joinDate}</div>
              <div className="profile-stat-label">Member Since</div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Favorite Plants</h3>
          <div className="profile-favorites-list">
            {userStats.favoritePlants.map((plant, index) => (
              <div className="profile-favorite-item" key={index}>
                <div className="profile-favorite-icon">🌿</div>
                <div className="profile-favorite-name">{plant}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-actions">
          <button 
            className="profile-logout-button"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button className="profile-settings-button">
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;