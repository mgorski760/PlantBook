import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-transparent text-white shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg 
            className="w-8 h-8 mr-2 drop-shadow-md" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 2L9 7L4 9L4 15L9 17L12 22L15 17L20 15L20 9L15 7L12 2Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <h1 className="text-2xl font-bold drop-shadow-sm">Plant Scanner</h1>
        </div>
      </div>
    </header>
  );
};

export default Header; 