import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { PlantData } from '../App';
import DecryptedText from './DecryptedText';
import GradientText from './GradientText';
import SplitText from './SplitText';
import { animated, useSpring } from '@react-spring/web';

interface PlantScannerProps {
  setPlantData: React.Dispatch<React.SetStateAction<PlantData>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const NumberBadge = ({ number }: { number: number }) => {
  const props = useSpring({
    from: { opacity: 0, scale: 0.8, borderColor: 'rgba(34, 197, 94, 0)' },
    to: { opacity: 1, scale: 1, borderColor: 'rgba(34, 197, 94, 0.8)' },
    delay: 300 + number * 200,
    config: { tension: 200, friction: 15 }
  });

  return (
    <div className="mr-3 flex-shrink-0">
      <animated.div 
        style={{
          opacity: props.opacity,
          borderColor: props.borderColor,
          transform: props.scale.to(s => `scale(${s})`)
        }}
        className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-900 text-white border border-green-500"
      >
        {number}
      </animated.div>
    </div>
  );
};

const PlantScanner: React.FC<PlantScannerProps> = ({ 
  setPlantData, 
  isLoading, 
  setIsLoading,
  error,
  setError
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
      // Convert image to base64
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
        
        // Just check if we have any API key at all
        const hasApiKey = apiKey && apiKey.trim() !== "";
        
        console.log('API Key Check:', hasApiKey ? 'API key is present' : 'No API key found');
        
        // Try to make the API call with whatever key we have
        try {
          // Plant.id API call
          console.log('Making Plant.id API call...');
          
          const data = {
            api_key: apiKey,
            images: [base64Image],
            modifiers: ["crops_fast", "similar_images"],
            plant_language: "en",
            plant_details: ["common_names", "url", "wiki_description", "taxonomy", "synonyms"]
          };
          
          console.log('API Request prepared with key: ' + (apiKey ? '(key present)' : '(no key)'));
          
          const response = await axios.post('https://api.plant.id/v2/identify', data);
          console.log('API Response success, status:', response.status);
          
          if (response.data && response.data.suggestions && response.data.suggestions.length > 0) {
            console.log('Plant identified:', response.data.suggestions[0].plant_name);
            const plantResult = response.data.suggestions[0];
            
            // Determine water needs based on plant type or taxonomy
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
            
            // Extract benefits from wiki description
            const benefits = [];
            const wikiText = plantResult.plant_details?.wiki_description?.value || '';
            
            if (wikiText.toLowerCase().includes('medicinal')) benefits.push("Medicinal properties");
            if (wikiText.toLowerCase().includes('air')) benefits.push("Air purification");
            if (wikiText.toLowerCase().includes('ornamental')) benefits.push("Ornamental value");
            if (benefits.length === 0) benefits.push("Adds greenery to your space");
            
            // Determine care instructions based on wiki description
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
            
            console.log('Setting plant data:', plantData);
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
            
            // Use mock data if API fails
            console.log('API call failed, using mock data as fallback');
            
            const mockPlantData: PlantData = {
              name: "Mock Plant Data (API Failed)",
              waterNeeds: "Medium - Water when top inch of soil is dry",
              benefits: [
                "Air purification", 
                "Adds aesthetic value", 
                "Improves mood"
              ],
              careInstructions: "This is mock data shown because the API call failed. Check console for details on the error.",
              imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b"
            };
            
            setPlantData(mockPlantData);
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
    <div className="relative bg-black bg-opacity-70 p-6 rounded-lg shadow-md backdrop-blur-sm overflow-hidden">
      <div className="relative z-10">
        <div className="mb-10 flex justify-center">
          <SplitText 
            text="Plant Scanner" 
            className="text-4xl font-black text-white tracking-wider uppercase"
            delay={80}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            textAlign="center"
          />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-center">
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="bg-transparent hover:opacity-90 py-3 px-6 rounded-lg transition-colors flex items-center shadow-md"
            >
              <svg className="w-5 h-5 mr-2 text-white" fill="white" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <GradientText 
                colors={["#22c55e", "#10b981", "#22c55e"]} 
                animationSpeed={6} 
                showBorder={true}
                className="py-2 px-4 text-lg font-bold"
              >
                Upload Plant Image
              </GradientText>
            </button>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
            aria-label="Upload plant image"
          />
        </div>
        
        {previewUrl && (
          <div className="mb-6 flex justify-center">
            <div className="border-2 border-green-300 rounded-lg overflow-hidden shadow-md w-64 h-64">
              <img 
                src={previewUrl} 
                alt="Selected plant" 
                className="w-full h-full object-cover bg-black/10" 
              />
            </div>
          </div>
        )}
        
        {selectedImage && (
          <div className="flex justify-center">
            <button 
              onClick={identifyPlant} 
              disabled={isLoading} 
              className={`
                ${isLoading ? 'bg-gray-400' : 'bg-transparent'} 
                hover:opacity-90 py-4 px-8 rounded-lg transition-colors flex items-center shadow-md
              `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center text-white">
                  <svg className="animate-spin -ml-1 mr-2 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-xl">Identifying Plant...</span>
                </span>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-3 text-white" fill="white" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <GradientText 
                    colors={["#22c55e", "#10b981", "#22c55e"]} 
                    animationSpeed={6} 
                    showBorder={true}
                    className="py-2 px-5 text-xl font-bold"
                  >
                    Identify Plant
                  </GradientText>
                </>
              )}
            </button>
          </div>
        )}
        
        {error && (
          <div className="mt-4 bg-red-900 bg-opacity-50 text-red-200 p-3 rounded-lg shadow-sm">
            {error}
          </div>
        )}
        
        <div className="mt-16 text-white" style={{color: 'white'}}>
          <div className="mb-8 flex justify-center">
            <SplitText 
              text="How it works:" 
              className="font-bold text-xl text-white tracking-wide"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,20px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              textAlign="center"
            />
          </div>
          <ol className="list-none space-y-5 text-white mt-6" style={{color: 'white'}}>
            <li className="flex items-start text-white" style={{color: 'white'}}>
              <NumberBadge number={1} />
              <div className="text-white" style={{color: 'white'}}>
                <DecryptedText 
                  text="Upload a photo of a plant" 
                  animateOn="view"
                  sequential={true}
                  speed={15}
                  className="text-white font-medium font-mono tracking-wide"
                  encryptedClassName="text-green-500 font-mono tracking-wide opacity-90"
                  maxIterations={8}
                  parentClassName="text-white"
                />
              </div>
            </li>
            <li className="flex items-start text-white" style={{color: 'white'}}>
              <NumberBadge number={2} />
              <div className="text-white" style={{color: 'white'}}>
                <DecryptedText 
                  text="Our system will analyze the image and identify the plant species" 
                  animateOn="view"
                  sequential={true}
                  speed={15}
                  className="text-white font-medium font-mono tracking-wide"
                  encryptedClassName="text-green-500 font-mono tracking-wide opacity-90"
                  maxIterations={8}
                  revealDirection="center"
                  parentClassName="text-white"
                />
              </div>
            </li>
            <li className="flex items-start text-white" style={{color: 'white'}}>
              <NumberBadge number={3} />
              <div className="text-white" style={{color: 'white'}}>
                <DecryptedText 
                  text="Get detailed information about the plant and care instructions" 
                  animateOn="view"
                  sequential={true}
                  speed={15}
                  className="text-white font-medium font-mono tracking-wide"
                  encryptedClassName="text-green-500 font-mono tracking-wide opacity-90"
                  maxIterations={8}
                  revealDirection="end"
                  parentClassName="text-white"
                />
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PlantScanner; 