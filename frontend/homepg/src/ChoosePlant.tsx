import React from "react";
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

const ChoosePlant: React.FC = () => {
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

export default ChoosePlant;
