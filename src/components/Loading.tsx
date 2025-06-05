// LoadingScreen.tsx
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-32 h-32">
        <div className="absolute w-full h-full animate-spin-slow">
          <div className="absolute w-full h-full bg-blue-500 opacity-70 rounded-full"></div>
          <div className="absolute w-full h-full bg-red-500 opacity-70 rounded-full transform rotate-45"></div>
          <div className="absolute w-full h-full bg-green-500 opacity-70 rounded-full transform rotate-90"></div>
        </div>
      </div>
      <h1 className="absolute text-xl font-bold text-gray-700">Loading...</h1>
    </div>
  );
};

export default LoadingScreen;
