
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Add these
import CelestialGuide from './sections/CelestialGuide';
import LandingPage from './sections/landingPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/celestial-guide" element={<CelestialGuide />} />
    </Routes>
  );
}

export default App;