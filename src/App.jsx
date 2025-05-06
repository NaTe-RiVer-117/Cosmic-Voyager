import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CelestialGuide from './sections/CelestialGuide';
import LandingPage from './sections/landingPage';
import LoadingOverlay from './LoadingOverlay';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle initial app loading
  useEffect(() => {
    // Check if all resources are loaded
    const handleLoading = () => {
      if (document.readyState === 'complete') {
        // Add a small delay for smoother experience
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    
    // Check if document is already loaded
    if (document.readyState === 'complete') {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      // Add event listener for when resources are loaded
      window.addEventListener('load', handleLoading);
      
      // Fallback in case load event doesn't trigger
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      
      // Cleanup
      return () => window.removeEventListener('load', handleLoading);
    }
  }, []);
  
  return (
    <>
      {/* Loading overlay with AnimatePresence for smooth exit */}
      <AnimatePresence>
        {isLoading && <LoadingOverlay onLoadComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/celestial-guide" element={<CelestialGuide />} />
      </Routes>
    </>
  );
}

export default App;