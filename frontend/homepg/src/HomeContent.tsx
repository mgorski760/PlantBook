import React, { useEffect, useState } from "react";
import plant1 from './assets/Plant1.png';
import plant2 from './assets/Plant2.png';
import plant3 from './assets/Plant3.png';
import plant4 from './assets/Plant4.png';
import plant5 from './assets/Plant5.png';
import plant6 from './assets/Plant6.png';
import plant7 from './assets/Plant7.png';
import plant8 from './assets/Plant8.png';
import "./Homepage.css"; 

const plantImages = [plant1, plant2, plant3, plant4, plant4, plant5, plant6, plant7, plant8];

const plantNames = [
  "Aloe Vera",
  "Snake Plant",
  "Fiddle Leaf Fig",
  "Monstera Deliciosa",
  "Pothos",
  "Succulent Collection",
  "Spider Plant",
  "ZZ Plant",
  "Peace Lily"
];

const authorNames = [
  "Plant Lover",
  "Green Thumb",
  "Garden Expert",
  "Flower Power",
  "Leaf Enthusiast",
  "Botany Buff",
  "Nature Nurturer",
  "Petal Pusher",
  "Succulent Specialist"
];

interface User {
  id: number;
  name: string;
  username: string;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

// Generate random likes count between 10 and 500
const getRandomLikes = () => Math.floor(Math.random() * 490) + 10;

// Generate random time for post (e.g., "2 hours ago", "5 minutes ago")
const getRandomTime = () => {
  const units = ["minutes", "hours", "days"];
  const unit = units[Math.floor(Math.random() * units.length)];
  const value = Math.floor(Math.random() * 12) + 1;
  return `${value} ${unit} ago`;
};

const HomeContent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [showShareOptions, setShowShareOptions] = useState<number | null>(null);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    // Initialize random likes for each post
    const initialLikes: { [key: number]: number } = {};
    const initialLiked: { [key: number]: boolean } = {};
    const initialComments: { [key: number]: Comment[] } = {};
    
    plantImages.forEach((_, index) => {
      initialLikes[index] = getRandomLikes();
      initialLiked[index] = false;
      
      // Generate 0-3 random comments for each post
      const commentCount = Math.floor(Math.random() * 4);
      const postComments: Comment[] = [];
      
      for (let i = 0; i < commentCount; i++) {
        postComments.push({
          id: i,
          author: authorNames[Math.floor(Math.random() * authorNames.length)],
          text: `This ${plantNames[index % plantNames.length]} is beautiful! I have one just like it.`,
          timestamp: getRandomTime()
        });
      }
      
      initialComments[index] = postComments;
    });
    
    setLikes(initialLikes);
    setLiked(initialLiked);
    setComments(initialComments);

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users"); // Backend URL
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleLike = (index: number) => {
    setLiked(prev => {
      const newLiked = { ...prev };
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
    
    setLikes(prev => {
      const newLikes = { ...prev };
      newLikes[index] = liked[index] ? newLikes[index] - 1 : newLikes[index] + 1;
      return newLikes;
    });
  };
  
  const handleComment = (index: number) => {
    setActiveCommentSection(activeCommentSection === index ? null : index);
    setShowShareOptions(null);
  };
  
  const handleShare = (index: number) => {
    setShowShareOptions(showShareOptions === index ? null : index);
    setActiveCommentSection(null);
  };
  
  const handleSubmitComment = (index: number) => {
    if (newComment.trim() === "") return;
    
    const newCommentObj: Comment = {
      id: comments[index] ? comments[index].length : 0,
      author: "You",
      text: newComment,
      timestamp: "Just now"
    };
    
    setComments(prev => {
      const newComments = { ...prev };
      newComments[index] = [...(newComments[index] || []), newCommentObj];
      return newComments;
    });
    
    setNewComment("");
  };

  return (
    <div className="home-feed">
      {plantImages.map((plant, index) => (
        <div className="post-card" key={index}>
          <div className="post-header">
            <div className="post-user-info">
              <div className="post-avatar">
                {authorNames[index % authorNames.length].charAt(0)}
              </div>
              <div className="post-meta">
                <div className="post-author">{authorNames[index % authorNames.length]}</div>
                <div className="post-time">{getRandomTime()}</div>
              </div>
            </div>
            <div className="post-options">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <circle cx="8" cy="2" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="8" cy="14" r="1.5" />
              </svg>
            </div>
          </div>
          
          <div className="post-content">
            <div className="post-caption">
              Just added this beautiful {plantNames[index % plantNames.length]} to my collection! 🌿
            </div>
            <div className="post-image-container">
              <img src={plant} alt={`Plant ${index + 1}`} className="post-image" />
            </div>
          </div>
          
          <div className="post-stats">
            <div className="likes-count">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
              {likes[index]} Likes
            </div>
            <div className="comments-count">
              {comments[index] ? comments[index].length : 0} Comments
            </div>
          </div>
          
          <div className="post-actions">
            <button 
              className={`post-action-button ${liked[index] ? 'active' : ''}`} 
              onClick={() => handleLike(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
              {liked[index] ? 'Liked' : 'Like'}
            </button>
            <button 
              className={`post-action-button ${activeCommentSection === index ? 'active' : ''}`}
              onClick={() => handleComment(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
              </svg>
              Comment
            </button>
            <button 
              className={`post-action-button ${showShareOptions === index ? 'active' : ''}`}
              onClick={() => handleShare(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
              </svg>
              Share
            </button>
          </div>
          
          {activeCommentSection === index && (
            <div className="comment-section">
              <div className="comment-input-container">
                <div className="comment-avatar">Y</div>
                <div className="comment-input-wrapper">
                  <input
                    type="text"
                    className="comment-input"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment(index)}
                  />
                  <button 
                    className="comment-submit-button"
                    onClick={() => handleSubmitComment(index)}
                    aria-label="Submit comment"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {comments[index] && comments[index].length > 0 && (
                <div className="comments-list">
                  {comments[index].map((comment) => (
                    <div className="comment-item" key={comment.id}>
                      <div className="comment-avatar">
                        {comment.author.charAt(0)}
                      </div>
                      <div className="comment-content">
                        <div className="comment-author">{comment.author}</div>
                        <div className="comment-text">{comment.text}</div>
                        <div className="comment-time">{comment.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {showShareOptions === index && (
            <div className="share-options">
              <button className="share-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                </svg>
                Share to YouTube
              </button>
              <button className="share-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#1877F2" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                Share to Facebook
              </button>
              <button className="share-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#1DA1F2" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
                Share to Twitter
              </button>
              <button className="share-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#25D366" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Share via WhatsApp
              </button>
              <button className="share-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                </svg>
                Copy Link
              </button>
            </div>
          )}
        </div>
      ))}
      
      {users.length > 0 && (
        <div className="users-section">
          <h2>Users List</h2>
          <ul className="users-list">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <div className="user-avatar">{user.name.charAt(0)}</div>
                <div className="user-details">
                  <div className="user-name">{user.name}</div>
                  <div className="user-username">@{user.username}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomeContent;
