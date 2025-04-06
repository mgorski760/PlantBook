import React, { useEffect, useState } from "react";
import plant2 from './assets/Plant2.png';
import plant7 from './assets/Plant7.png';
import plant8 from './assets/Plant8.png';
import "./Homepage.css"; 

const plantImages = [plant2, plant7, plant8];

const UserContent: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch posts from the Flask backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/posts");
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log("Fetched posts:", data); // Log the data to ensure it's correct
        setPosts(data);  // No need to access a specific property since it's already an array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to run only once on mount
  return (
    <div>
      {loading ? (
        <div>Loading posts...</div>
      ) : posts.length === 0 ? (
        <div>No posts available.</div>
      ) : (
        <div>
          <Modal />
        </div>
      )}
    </div>
  );
};

const Modal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className="postbutton" onClick={openModal}>Create Post</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>

            <div className="info">
              <div className="picture">Add Picture</div>
              <div className="items">Add Description</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContent;
