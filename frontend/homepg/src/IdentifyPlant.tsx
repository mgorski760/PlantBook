import React, { useState } from "react";
import "./Homepage.css";
import axios from 'axios';
import { useRef } from 'react';

interface PlantData {
  name: string;
  waterNeeds: string;
  benefits: string[];
  careInstructions: string;
  imageUrl: string;
}

const IdentifyPlant: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const identifyPlant = async () => {
    if (!selectedImage) {
      setError('Please select or capture an image first');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(',')[1];
        
        if (!base64Image) {
          setError('Failed to process image');
          setIsLoading(false);
          return;
        }
        
        const apiKey = import.meta.env.VITE_PLANT_ID_API_KEY;
        
        if (!apiKey) {
          console.error('API key is missing');
          setError('API key is not configured. Please check your environment variables.');
          setIsLoading(false);
          return;
        }
        
        console.log('Using API key:', apiKey.substring(0, 5) + '...');
        
        try {
          const data = {
            api_key: apiKey,
            images: [base64Image],
            modifiers: ["crops_fast", "similar_images"],
            plant_language: "en",
            plant_details: ["common_names", "url", "wiki_description", "taxonomy", "synonyms"]
          };
          
          console.log('Making API request...');
          const response = await axios.post('https://api.plant.id/v2/identify', data);
          console.log('API Response:', response.status);
          
          if (response.data && response.data.suggestions && response.data.suggestions.length > 0) {
            const plantResult = response.data.suggestions[0];
            console.log('Plant identified:', plantResult.plant_name);
            
            let waterNeeds = "Medium - Water when top inch of soil is dry";
            if (plantResult.plant_details && plantResult.plant_details.wiki_description && 
                plantResult.plant_details.wiki_description.value) {
              const wikiText = plantResult.plant_details.wiki_description.value.toLowerCase();
              if (wikiText.includes('drought')) {
                waterNeeds = "Low - Water sparingly, tolerates drought";
              } else if (wikiText.includes('moist')) {
                waterNeeds = "High - Keep soil consistently moist";
              }
            }
            
            const benefits = [];
            const wikiText = plantResult.plant_details?.wiki_description?.value || '';
            
            if (wikiText.toLowerCase().includes('medicinal')) benefits.push("Medicinal properties");
            if (wikiText.toLowerCase().includes('air')) benefits.push("Air purification");
            if (wikiText.toLowerCase().includes('ornamental')) benefits.push("Ornamental value");
            if (benefits.length === 0) benefits.push("Adds greenery to your space");
            
            let careInstructions = "Place in appropriate light conditions and water regularly.";
            if (wikiText) {
              const sentences = wikiText.split('.');
              for (const sentence of sentences) {
                if (sentence.toLowerCase().includes('grow') || 
                    sentence.toLowerCase().includes('cultivat') || 
                    sentence.toLowerCase().includes('care')) {
                  careInstructions = sentence + '.';
                  break;
                }
              }
            }
            
            const plantData = {
              name: plantResult.plant_name,
              waterNeeds: waterNeeds,
              benefits: benefits,
              careInstructions: careInstructions,
              imageUrl: plantResult.similar_images?.[0]?.url || 
                        "https://images.unsplash.com/photo-1614594975525-e45190c55d0b"
            };
            
            setPlantData(plantData);
          } else {
            console.error('No suggestions found in API response:', response.data);
            setError('No plant matches found. Please try with a clearer image.');
          }
        } catch (apiError: any) {
          console.error('Plant.id API Error:', apiError);
          
          if (apiError.response) {
            console.error('API response error data:', apiError.response.data);
            console.error('API response status:', apiError.response.status);
            
            if (apiError.response.status === 401) {
              setError('Invalid API key. Please check your configuration.');
            } else if (apiError.response.status === 429) {
              setError('API rate limit exceeded. Please try again later.');
            } else {
              setError(`API Error: ${apiError.response.data.message || 'Failed to identify plant'}`);
            }
          } else if (apiError.request) {
            console.error('API request made but no response received');
            setError('No response from plant identification service. Please check your connection.');
          } else {
            console.error('Error setting up API request:', apiError.message);
            setError(`Error: ${apiError.message}`);
          }
        }
        
        setIsLoading(false);
      };
      
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        setError('Failed to read image file');
        setIsLoading(false);
      };
      
    } catch (error: any) {
      console.error('Overall error in identification process:', error);
      setError(`Error: ${error.message || 'Failed to identify plant'}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="identify-plant-container">
      <h3 className="identify-title">Send Picture to identify your plant</h3>
      
      <div className="upload-section">
        <button 
          onClick={() => fileInputRef.current?.click()} 
          className="upload-button"
        >
          <svg className="upload-icon" fill="white" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Plant Image
        </button>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden-input" 
          aria-label="Upload plant image"
        />
      </div>
      
      {previewUrl && (
        <div className="preview-section">
          <div className="image-preview">
            <img 
              src={previewUrl} 
              alt="Selected plant" 
              className="preview-image" 
            />
          </div>
        </div>
      )}
      
      {selectedImage && (
        <div className="identify-section">
          <button 
            onClick={identifyPlant} 
            disabled={isLoading} 
            className={`identify-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <span className="loading-text">
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Identifying Plant...
              </span>
            ) : (
              <>
                <svg className="search-icon" fill="white" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Identify Plant
              </>
            )}
          </button>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {plantData && (
        <div className="plant-info">
          <h4 className="plant-name">{plantData.name}</h4>
          <div className="info-section">
            <h5>Water Needs:</h5>
            <p>{plantData.waterNeeds}</p>
          </div>
          <div className="info-section">
            <h5>Benefits:</h5>
            <ul>
              {plantData.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="info-section">
            <h5>Care Instructions:</h5>
            <p>{plantData.careInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentifyPlant;
