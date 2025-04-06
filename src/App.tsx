import { useState } from 'react'
import PlantScanner from './components/PlantScanner'
import PlantInfo from './components/PlantInfo'
import Header from './components/Header'
import Footer from './components/Footer'
import Waves from './components/Waves'
import GradientText from './components/GradientText'

export type PlantData = {
  name: string;
  waterNeeds: string;
  benefits: string[];
  careInstructions: string;
  imageUrl: string;
} | null;

function App() {
  const [plantData, setPlantData] = useState<PlantData>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col relative bg-black text-white">
      {/* Waves background */}
      <Waves
        lineColor="rgba(22, 163, 74, 0.7)"
        backgroundColor="black"
        waveSpeedX={0.022}
        waveSpeedY={0.010}
        waveAmpX={30}
        waveAmpY={16}
        xGap={10}
        yGap={22}
        className="z-0"
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen text-white" style={{color: 'white'}}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {!plantData ? (
              <PlantScanner 
                setPlantData={setPlantData} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
                error={error}
                setError={setError}
              />
            ) : (
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => setPlantData(null)} 
                  className="max-w-md mx-auto mb-0 px-4 py-2 bg-transparent hover:opacity-90 text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <GradientText 
                    colors={["#22c55e", "#10b981", "#22c55e"]} 
                    animationSpeed={6} 
                    showBorder={true}
                    className="py-1 px-3 text-sm font-medium"
                  >
                    Scan Another Plant
                  </GradientText>
                </button>
                <PlantInfo plantData={plantData} />
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
