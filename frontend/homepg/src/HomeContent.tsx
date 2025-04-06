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

interface User {
    id: number;
    name: string;
    username: string;
  }


const HomeContent: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); 

  useEffect(() => {
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

  return (
    <div>
      <ul className="plant-list item-list">
        {plantImages.map((plant, index) => (
          <li className="items" key={index}>
            <button className="button">
              <img src={plant} alt={`Plant ${index + 1}`} />
              <ul>
                <li className="items">Succulent</li>
                <li className="items">Post by: Imaginary Wonderwoman</li>
                <li className="items">Comment</li>
                <li className="items">Like</li>
                <li className="items">Share</li>
              </ul>
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.username})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeContent;
