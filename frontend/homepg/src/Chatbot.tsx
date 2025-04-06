import React from "react";
import plant2 from './assets/Plant2.png';
import plant7 from './assets/Plant7.png';
import plant8 from './assets/Plant8.png';
import "./Homepage.css"; 

const plantImages = [plant2, plant7, plant8];

const UserContent: React.FC = () => {
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
    </div>
  );
};

export default UserContent;
