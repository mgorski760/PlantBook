import React, { useEffect, useState } from "react";
import plant2 from './assets/Plant2.png';
import plant7 from './assets/Plant7.png';
import plant8 from './assets/Plant8.png';
import "./Homepage.css"; 

const plantImages = [plant2, plant7, plant8];

const PostContent: React.FC = () => {
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

  if (loading) {
    return <div>Loading posts...</div>;  // You can replace this with a spinner or another loading indicator
  }

  return (
    <div>
      {posts.length === 0 ? (
        <div>No posts available.</div>
      ) : (
        <div>
          <button className="button"> <h3>Create Post</h3></button> 
          <ul className="post-list item-list">
            {posts.map((post) => (
              <li className="items" key={post.id}>
                <button className="button">
                  <div className="post-details">
                    <ul>
                      <li className="items">Username: {post.username}</li>
                      <li className="items">Description: {post.description}</li>
                      <li className="items">Comment</li>
                      <li className="items">Like</li>
                      <li className="items">Share</li>
                    </ul>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostContent;
