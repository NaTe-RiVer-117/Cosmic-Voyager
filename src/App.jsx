import React, { useState } from 'react';
import StarCanvas from './components/StarCanvas';

function App() {
  const [activeConstellation, setActiveConstellation] = useState(null);
  
  const constellations = [
    { name: "Orion", meaning: "The Hunter - Symbolizing strength and adventure" },
    { name: "Ursa Major", meaning: "The Great Bear - Representing guidance and protection" },
    { name: "Lyra", meaning: "The Lyre - Embodiment of music and creativity" },
    { name: "Cassiopeia", meaning: "The Queen - Signifying wisdom and leadership" }
  ];

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {/* <StarCanvas /> */}
      </div>

      {/* Cosmic Interface */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 animate-pulse">
          Celestial Guide
        </h1>
        
        {/* Constellation Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-4xl">
          {constellations.map((constellation) => (
            <button
              key={constellation.name}
              onClick={() => setActiveConstellation(constellation)}
              className={`p-4 rounded-lg backdrop-blur-md border-2 transition-all duration-300 ${
                activeConstellation?.name === constellation.name
                  ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                  : 'border-white/30 hover:border-amber-200/50 hover:bg-white/5'
              }`}
            >
              <span className="text-xl font-medium text-white">{constellation.name}</span>
            </button>
          ))}
        </div>

        {/* Constellation Display */}
        {activeConstellation && (
          <div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-lg bg-black/30 border border-white/20 shadow-xl animate-fadeIn">
            <h2 className="text-3xl font-bold mb-2 text-amber-300">{activeConstellation.name}</h2>
            <p className="text-xl text-white/80">{activeConstellation.meaning}</p>
            <div className="mt-4 h-1 bg-gradient-to-r from-amber-400 to-transparent w-full"></div>
            <p className="mt-4 text-white/60">
              Look for this constellation in the night sky above you. 
              What personal meaning does it hold for your journey?
            </p>
          </div>
        )}

        {/* Cosmic Footer */}
        <div className="absolute bottom-6 text-white/50 text-sm">
          "We are all made of star-stuff" — Carl Sagan
        </div>
      </div>
    </div>
  );
}

export default App;