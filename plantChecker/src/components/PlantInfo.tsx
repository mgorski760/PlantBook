import React from 'react';
import { PlantData } from '../App';
import './PlantInfo.css';

interface PlantInfoProps {
  plantData: PlantData;
}

const PlantInfo: React.FC<PlantInfoProps> = ({ plantData }) => {
  if (!plantData) return null;
  
  return (
    <div className="plant-info-container">
      <h2 className="identification-title">Identification Results</h2>
      <div className="cards-container">

        {/* Image Card */}
        <div className="info-card image-card">
          <div className="image-container">
            <img 
              src={plantData.imageUrl} 
              alt={plantData.name} 
              className="plant-image" 
            />
          </div>
          <h3 className="plant-name">{plantData.name}</h3>
        </div>

        {/* Water Needs Card */}
        <div className="info-card">
          <h4 className="card-header">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14c2.761 0 5-2.239 5-5s-5-8-5-8-5 5.239-5 8 2.239 5 5 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
            <span>Water</span>
          </h4>
          <div className="content-container">
            <div className="water-info">
              {plantData.waterNeeds.length > 100 
                ? plantData.waterNeeds.substring(0, 100) + '...' 
                : plantData.waterNeeds}
            </div>
          </div>
        </div>

        {/* Benefits Card */}
        <div className="info-card">
          <h4 className="card-header">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
            <span>Benefits</span>
          </h4>
          <div className="content-container">
            <div className="benefits-container">
              {Array.isArray(plantData.benefits) && plantData.benefits.map((benefit, index) => (
                <span key={index} className="benefit-tag">
                  {benefit.length > 25 ? benefit.substring(0, 25) + '...' : benefit}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Care Instructions Card */}
        <div className="info-card">
          <h4 className="card-header">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
            <span>Care</span>
          </h4>
          <div className="content-container">
            <div className="care-info">
              {plantData.careInstructions.length > 150 
                ? plantData.careInstructions.substring(0, 150) + '...' 
                : plantData.careInstructions}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlantInfo; 